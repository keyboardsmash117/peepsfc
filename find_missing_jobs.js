const fs = require('fs');

const html = fs.readFileSync('/mnt/c/Users/Nlell/OneDrive/Desktop/FC_website/pages/crafting-gathering.html', 'utf8');
const recipesMatch = html.match(/const recipes = \{([\s\S]*?)\n\s*\};/);

const recipesCode = 'global.recipes = {' + recipesMatch[1] + '\n};';
eval(recipesCode);
const recipes = global.recipes;

console.log('RECIPES MISSING JOB PROPERTIES:');
console.log('===============================');

let count = 0;
for (const [id, recipe] of Object.entries(recipes)) {
    if (!recipe.job) {
        count++;
        console.log(`${count}. ID: '${id}' - Name: '${recipe.name}' - Level: ${recipe.level}`);
    }
}

console.log(`\nTotal missing: ${count}`);

// Also show which sections they come from
console.log('\nBy Recipe Section:');
const lines = html.split('\n');
for (const [id, recipe] of Object.entries(recipes)) {
    if (!recipe.job) {
        // Find the line number
        const searchStr = `'${id}': {`;
        const lineIndex = lines.findIndex(line => line.includes(searchStr));
        if (lineIndex !== -1) {
            // Look backwards for the job comment
            for (let i = lineIndex; i >= Math.max(0, lineIndex - 10); i--) {
                if (lines[i].includes('// Level') && lines[i].includes('Recipes')) {
                    console.log(`  ${recipe.name} -> ${lines[i].trim()}`);
                    break;
                }
            }
        }
    }
}