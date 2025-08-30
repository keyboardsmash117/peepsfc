// Complete FFXIV Recipe Database Loader
// Loads ALL crafting recipes from multiple sources

class CompleteRecipeLoader {
    constructor() {
        this.recipes = {};
        this.loading = false;
        this.loaded = false;
        this.sources = {
            // Multiple recipe data sources for maximum coverage
            garlandtools: 'https://www.garlandtools.org/db/doc/recipe/en/3/',
            universalis_recipes: 'https://universalis.app/api/recipe/',
            // Local comprehensive database 
            local: '/js/recipe-backup.json',
            // Fallback comprehensive dataset
            github_recipes: 'https://raw.githubusercontent.com/xivapi/ffxiv-datamining/master/csv/Recipe.csv'
        };
        this.totalRecipes = 0;
        this.loadedRecipes = 0;
    }

    // Initialize and load all recipes
    async initialize() {
        if (this.loading || this.loaded) {
            return this.recipes;
        }

        this.loading = true;
        console.log('🔄 Loading complete FFXIV recipe database...');

        try {
            // Load comprehensive offline database first (most reliable)
            await this.loadComprehensiveRecipes();
            
            // Merge with existing hardcoded recipes
            await this.mergeExistingRecipes();
            
        } catch (error) {
            console.error('❌ Failed to load recipe database:', error);
            await this.loadFallbackRecipes();
        }

        
        this.loading = false;
        this.loaded = true;
        
        console.log(`✅ Loaded ${Object.keys(this.recipes).length} total recipes`);
        return this.recipes;
    }

    // Load comprehensive offline recipe database (most reliable)
    async loadComprehensiveRecipes() {
        try {
            // Check for authentic XIVAPI data first (highest priority)
            if (window.XIVAPI_MASS_RECIPES) {
                this.recipes = { ...this.recipes, ...window.XIVAPI_MASS_RECIPES };
                console.log(`🎯 Loaded ${Object.keys(window.XIVAPI_MASS_RECIPES).length} AUTHENTIC XIVAPI recipes`);
            }
            
            // Then check for complete FFXIV database (8000+ recipes)
            if (window.COMPLETE_FFXIV_RECIPES) {
                this.recipes = { ...this.recipes, ...window.COMPLETE_FFXIV_RECIPES };
                console.log(`🚀 Loaded ${Object.keys(window.COMPLETE_FFXIV_RECIPES).length} COMPLETE FFXIV recipes`);
            }
            
            // Fallback to smaller comprehensive database
            if (window.COMPREHENSIVE_RECIPES) {
                this.recipes = { ...this.recipes, ...window.COMPREHENSIVE_RECIPES };
                console.log(`🗂️ Loaded ${Object.keys(window.COMPREHENSIVE_RECIPES).length} comprehensive recipes`);
            }
            
            const totalRecipes = Object.keys(this.recipes).length;
            if (totalRecipes === 0) {
                console.warn('⚠️ No comprehensive recipe databases found - using hardcoded recipes only');
            } else {
                console.log(`✅ Total recipes available: ${totalRecipes}`);
            }
        } catch (error) {
            console.warn('⚠️ Could not load comprehensive recipes:', error);
        }
    }

    // Load from external APIs as supplemental data
    async loadFromExternalSources() {
        // Disabled for now due to API reliability issues
        console.log('⚠️ External API loading disabled - using offline database only');
        return;
    }

    // Process XIVAPI recipe data into our format
    processXivApiRecipe(apiRecipe) {
        const jobMapping = {
            0: 'Carpenter',
            1: 'Blacksmith', 
            2: 'Armorer',
            3: 'Goldsmith',
            4: 'Leatherworker',
            5: 'Weaver',
            6: 'Alchemist',
            7: 'Culinarian'
        };

        const materials = [];
        
        // Process up to 10 possible ingredients (XIVAPI format)
        for (let i = 0; i < 10; i++) {
            const ingredient = apiRecipe[`ItemIngredient${i}`];
            const amount = apiRecipe[`AmountIngredient${i}`];
            
            if (ingredient && ingredient.Name && amount > 0) {
                materials.push({
                    name: ingredient.Name,
                    quantity: amount
                });
            }
        }

        return {
            id: `recipe-${apiRecipe.ID}`,
            name: apiRecipe.ItemResult?.Name || `Recipe ${apiRecipe.ID}`,
            level: apiRecipe.RecipeLevelTable?.ClassJobLevel || 1,
            job: jobMapping[apiRecipe.CraftTypeTargetID] || 'Unknown',
            materials: materials,
            yields: apiRecipe.AmountResult || 1,
            difficulty: apiRecipe.DifficultyFactor || 1,
            quality: apiRecipe.QualityFactor || 1,
            durability: apiRecipe.DurabilityFactor || 1,
            expansion: this.getExpansionFromLevel(apiRecipe.RecipeLevelTable?.ClassJobLevel || 1),
            source: 'xivapi'
        };
    }

    // Validate if recipe data is complete
    isValidRecipe(recipe) {
        return recipe && 
               recipe.ItemResult && 
               recipe.ItemResult.Name && 
               recipe.CraftTypeTargetID !== null &&
               recipe.RecipeLevelTable &&
               recipe.RecipeLevelTable.ClassJobLevel > 0;
    }

    // Get expansion based on level ranges
    getExpansionFromLevel(level) {
        if (level <= 50) return 'A Realm Reborn';
        if (level <= 60) return 'Heavensward';
        if (level <= 70) return 'Stormblood'; 
        if (level <= 80) return 'Shadowbringers';
        if (level <= 90) return 'Endwalker';
        return 'Dawntrail';
    }

    // Fallback recipe loading when comprehensive database fails
    async loadFallbackRecipes() {
        try {
            // Use existing hardcoded recipes as last resort
            if (window.recipes && Object.keys(window.recipes).length > 0) {
                this.recipes = { ...this.recipes, ...window.recipes };
                console.log(`📦 Loaded ${Object.keys(window.recipes).length} fallback recipes`);
                return;
            }

            // If no recipes at all, create minimal set
            this.recipes = {
                'emergency-recipe': {
                    name: 'Emergency Recipe Placeholder',
                    level: 1,
                    job: 'Carpenter',
                    materials: [{ name: 'Unknown Material', quantity: 1 }],
                    yields: 1
                }
            };
            console.log('⚠️ Using emergency fallback recipes');
        } catch (error) {
            console.error('❌ Complete failure to load any recipes:', error);
        }
    }

    // Merge with existing hardcoded recipes
    async mergeExistingRecipes() {
        if (window.recipes) {
            const existingCount = Object.keys(this.recipes).length;
            this.recipes = { ...window.recipes, ...this.recipes }; // External takes precedence
            const newCount = Object.keys(this.recipes).length;
            console.log(`🔀 Merged recipes: ${newCount} total (${newCount - existingCount} new from API)`);
        }
    }

    // Search recipes by name, job, or level
    searchRecipes(query) {
        const lowercaseQuery = query.toLowerCase();
        const results = [];
        
        for (const [id, recipe] of Object.entries(this.recipes)) {
            const searchableText = `${recipe.name} ${recipe.job} ${recipe.level}`.toLowerCase();
            
            if (searchableText.includes(lowercaseQuery)) {
                results.push({
                    id: id,
                    recipe: recipe,
                    relevance: this.calculateRelevance(lowercaseQuery, recipe)
                });
            }
        }
        
        // Sort by relevance (name matches first, then job, then level)
        return results.sort((a, b) => b.relevance - a.relevance).slice(0, 50); // Limit results
    }

    // Calculate search relevance score
    calculateRelevance(query, recipe) {
        let score = 0;
        const name = recipe.name.toLowerCase();
        const job = recipe.job.toLowerCase();
        
        // Exact name match gets highest score
        if (name === query) score += 1000;
        else if (name.startsWith(query)) score += 500;
        else if (name.includes(query)) score += 100;
        
        // Job match
        if (job.includes(query)) score += 50;
        
        // Recent expansions get slight boost
        if (recipe.level > 80) score += 10;
        
        return score;
    }

    // Get recipes by job class
    getRecipesByJob(jobName) {
        return Object.entries(this.recipes)
            .filter(([id, recipe]) => recipe.job === jobName)
            .map(([id, recipe]) => ({ id, recipe }));
    }

    // Get recipes by level range
    getRecipesByLevel(minLevel, maxLevel) {
        return Object.entries(this.recipes)
            .filter(([id, recipe]) => recipe.level >= minLevel && recipe.level <= maxLevel)
            .map(([id, recipe]) => ({ id, recipe }));
    }

    // Get recipe statistics
    getStatistics() {
        const jobs = {};
        const levels = { min: 999, max: 0 };
        const expansions = {};
        
        for (const recipe of Object.values(this.recipes)) {
            jobs[recipe.job] = (jobs[recipe.job] || 0) + 1;
            levels.min = Math.min(levels.min, recipe.level);
            levels.max = Math.max(levels.max, recipe.level);
            expansions[recipe.expansion || 'Unknown'] = (expansions[recipe.expansion || 'Unknown'] || 0) + 1;
        }
        
        return {
            totalRecipes: Object.keys(this.recipes).length,
            jobCounts: jobs,
            levelRange: levels,
            expansionCounts: expansions
        };
    }

    // Utility delay function
    delay(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    // Get all recipes
    getAllRecipes() {
        return this.recipes;
    }

    // Check if recipes are loaded
    isLoaded() {
        return this.loaded;
    }
}

// Create global instance
window.CompleteRecipeLoader = new CompleteRecipeLoader();

// Auto-initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        window.CompleteRecipeLoader.initialize();
    });
} else {
    window.CompleteRecipeLoader.initialize();
}

console.log('Complete Recipe Loader initialized! 🎯');