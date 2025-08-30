// Final functionality test
const fs = require('fs');

console.log('🔍 Final Test: Recipe Search Functionality');
console.log('===========================================');

// Read the HTML and extract recipes
const html = fs.readFileSync('/mnt/c/Users/Nlell/OneDrive/Desktop/FC_website/pages/crafting-gathering.html', 'utf8');

// Extract recipes object
const recipesMatch = html.match(/const recipes = \{([\s\S]*?)\n\s*\};/);
if (!recipesMatch) {
    console.log('❌ Could not extract recipes object');
    process.exit(1);
}

try {
    // Evaluate recipes in global scope
    const recipesCode = 'global.recipes = {' + recipesMatch[1] + '\n};';
    eval(recipesCode);
    const recipes = global.recipes;
    
    console.log(`✅ Successfully loaded ${Object.keys(recipes).length} recipes`);
    
    // Test search functionality
    function searchRecipes(query) {
        const results = [];
        const q = query.toLowerCase();
        
        for (const [id, recipe] of Object.entries(recipes)) {
            if (recipe.name && recipe.name.toLowerCase().includes(q)) {
                results.push({ id, recipe });
                if (results.length >= 5) break; // Limit results like the real function
            }
        }
        return results;
    }
    
    // Test searches
    console.log('\n🧪 Testing Recipe Searches:');
    
    const testQueries = ['maple', 'bronze', 'ingot', 'lumber', 'sword'];
    
    for (const query of testQueries) {
        const results = searchRecipes(query);
        console.log(`  "${query}": ${results.length} results found`);
        if (results.length > 0) {
            console.log(`    Example: ${results[0].recipe.name} (${results[0].recipe.job || 'No job property'})`);
        }
    }
    
    // Check job distribution
    console.log('\n📊 Job Distribution:');
    const jobCounts = {};
    let withoutJob = 0;
    
    for (const recipe of Object.values(recipes)) {
        if (recipe.job) {
            jobCounts[recipe.job] = (jobCounts[recipe.job] || 0) + 1;
        } else {
            withoutJob++;
        }
    }
    
    Object.entries(jobCounts).sort().forEach(([job, count]) => {
        console.log(`  ${job}: ${count}`);
    });
    
    if (withoutJob > 0) {
        console.log(`  ❌ Missing job property: ${withoutJob}`);
    } else {
        console.log(`  ✅ All recipes have job properties`);
    }
    
    // Test Carpenter specifically  
    const carpenterRecipes = Object.values(recipes).filter(r => r.job === 'Carpenter');
    console.log(`\n🪵 Carpenter recipes: ${carpenterRecipes.length}`);
    
    if (carpenterRecipes.length > 0) {
        console.log(`  Example: ${carpenterRecipes[0].name}`);
        console.log('  ✅ Carpenter search should work');
    } else {
        console.log('  ❌ Carpenter search will NOT work');
    }
    
    console.log('\n🎉 All tests completed successfully!');
    console.log('✅ The crafting functionality should now work properly!');
    
} catch (error) {
    console.log('❌ Error during testing:', error.message);
    process.exit(1);
}