// Quick test to validate recipe data structure
const fs = require('fs');

// Read the HTML file
const html = fs.readFileSync('/mnt/c/Users/Nlell/OneDrive/Desktop/FC_website/pages/crafting-gathering.html', 'utf8');

// Extract the recipes object
const recipesMatch = html.match(/const recipes = \{([\s\S]*?)\n\s*\};/);
if (!recipesMatch) {
    console.log('❌ Could not find recipes object');
    process.exit(1);
}

// Try to evaluate the recipes object
try {
    const recipesCode = 'const recipes = {' + recipesMatch[1] + '\n};';
    eval(recipesCode);
    
    // Count recipes by job
    const jobCounts = {};
    let totalRecipes = 0;
    let recipesWithJob = 0;
    
    for (const [id, recipe] of Object.entries(recipes)) {
        totalRecipes++;
        if (recipe.job) {
            recipesWithJob++;
            jobCounts[recipe.job] = (jobCounts[recipe.job] || 0) + 1;
        } else {
            console.log(`❌ Recipe missing job: ${id} - ${recipe.name}`);
        }
    }
    
    console.log(`✅ Total recipes: ${totalRecipes}`);
    console.log(`✅ Recipes with job property: ${recipesWithJob}`);
    console.log('📊 Job breakdown:');
    Object.entries(jobCounts).sort().forEach(([job, count]) => {
        console.log(`   ${job}: ${count}`);
    });
    
    // Test searching for carpenter recipes
    const carpenterRecipes = Object.entries(recipes).filter(([id, recipe]) => 
        recipe.job === 'Carpenter'
    );
    console.log(`🔨 Carpenter recipes found: ${carpenterRecipes.length}`);
    
    if (carpenterRecipes.length > 0) {
        console.log('✅ Recipe search should work for Carpenter');
    } else {
        console.log('❌ Recipe search will NOT work for Carpenter');
    }
    
} catch (error) {
    console.log('❌ JavaScript syntax error in recipes object:', error.message);
    process.exit(1);
}