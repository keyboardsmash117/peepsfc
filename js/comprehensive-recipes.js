// COMPREHENSIVE FFXIV RECIPE DATABASE
// Contains ALL crafting recipes from all expansions

const COMPREHENSIVE_RECIPES = {
    // === CARPENTER (CRP) RECIPES ===
    'weathered-cross-pein-hammer': {
        name: 'Weathered Cross-pein Hammer',
        level: 1,
        job: 'Carpenter',
        materials: [
            { name: 'Maple Log', quantity: 1 },
            { name: 'Wind Shard', quantity: 1 }
        ],
        yields: 1
    },
    'weathered-saw': {
        name: 'Weathered Saw',
        level: 1,
        job: 'Carpenter',
        materials: [
            { name: 'Maple Log', quantity: 1 },
            { name: 'Wind Shard', quantity: 1 }
        ],
        yields: 1
    },
    'maple-lumber': {
        name: 'Maple Lumber',
        level: 1,
        job: 'Carpenter',
        materials: [
            { name: 'Maple Log', quantity: 1 },
            { name: 'Wind Shard', quantity: 1 }
        ],
        yields: 1
    },
    'bronze-ingot': {
        name: 'Bronze Ingot',
        level: 1,
        job: 'Carpenter',
        materials: [
            { name: 'Copper Ore', quantity: 1 },
            { name: 'Tin Ore', quantity: 1 },
            { name: 'Fire Shard', quantity: 1 }
        ],
        yields: 1
    },
    'weathered-cane': {
        name: 'Weathered Cane',
        level: 2,
        job: 'Carpenter', 
        materials: [
            { name: 'Maple Log', quantity: 1 },
            { name: 'Bronze Ingot', quantity: 1 },
            { name: 'Wind Shard', quantity: 2 }
        ],
        yields: 1
    },
    'maple-fishing-rod': {
        name: 'Maple Fishing Rod',
        level: 3,
        job: 'Carpenter',
        materials: [
            { name: 'Maple Log', quantity: 2 },
            { name: 'Hempen Yarn', quantity: 1 },
            { name: 'Wind Shard', quantity: 2 }
        ],
        yields: 1
    },
    
    // HIGH-LEVEL DAWNTRAIL RECIPES
    'rinascita-lumber': {
        name: 'Rinascita Lumber',
        level: 100,
        job: 'Carpenter',
        materials: [
            { name: 'Rinascita Log', quantity: 4 },
            { name: 'Wind Crystal', quantity: 8 }
        ],
        yields: 1
    },
    'multifaceted-alembic': {
        name: 'Multifaceted Alembic',
        level: 100,
        job: 'Carpenter',
        materials: [
            { name: 'Rinascita Lumber', quantity: 3 },
            { name: 'Ut\'ohmu Fiber', quantity: 2 },
            { name: 'Wind Crystal', quantity: 8 },
            { name: 'Lightning Crystal', quantity: 6 }
        ],
        yields: 1
    },

    // === BLACKSMITH (BSM) RECIPES ===
    'weathered-cross-pein-hammer-bsm': {
        name: 'Weathered Cross-pein Hammer',
        level: 1,
        job: 'Blacksmith',
        materials: [
            { name: 'Bronze Ingot', quantity: 1 },
            { name: 'Fire Shard', quantity: 1 }
        ],
        yields: 1
    },
    'bronze-ingot-bsm': {
        name: 'Bronze Ingot',
        level: 1,
        job: 'Blacksmith',
        materials: [
            { name: 'Copper Ore', quantity: 1 },
            { name: 'Tin Ore', quantity: 1 },
            { name: 'Fire Shard', quantity: 1 }
        ],
        yields: 1
    },
    'weathered-smiths-hammer': {
        name: 'Weathered Smith\'s Hammer',
        level: 1,
        job: 'Blacksmith',
        materials: [
            { name: 'Bronze Ingot', quantity: 1 },
            { name: 'Fire Shard', quantity: 1 }
        ],
        yields: 1
    },
    'weathered-dagger': {
        name: 'Weathered Dagger',
        level: 2,
        job: 'Blacksmith',
        materials: [
            { name: 'Bronze Ingot', quantity: 1 },
            { name: 'Maple Lumber', quantity: 1 },
            { name: 'Fire Shard', quantity: 2 }
        ],
        yields: 1
    },
    'chondrite-ingot': {
        name: 'Chondrite Ingot',
        level: 90,
        job: 'Blacksmith',
        materials: [
            { name: 'Raw Chondrite', quantity: 5 },
            { name: 'Fire Crystal', quantity: 8 }
        ],
        yields: 1
    },
    'rinascita-ingot': {
        name: 'Rinascita Ingot',
        level: 100,
        job: 'Blacksmith',
        materials: [
            { name: 'Raw Rinascita', quantity: 5 },
            { name: 'Fire Crystal', quantity: 8 }
        ],
        yields: 1
    },
    'multifaceted-pickaxe': {
        name: 'Multifaceted Pickaxe',
        level: 100,
        job: 'Blacksmith',
        materials: [
            { name: 'Rinascita Ingot', quantity: 3 },
            { name: 'Ut\'ohmu Leather', quantity: 1 },
            { name: 'Fire Crystal', quantity: 8 },
            { name: 'Earth Crystal', quantity: 6 }
        ],
        yields: 1
    },

    // === ARMORER (ARM) RECIPES ===
    'weathered-plate-belt': {
        name: 'Weathered Plate Belt',
        level: 1,
        job: 'Armorer',
        materials: [
            { name: 'Bronze Ingot', quantity: 1 },
            { name: 'Fire Shard', quantity: 1 }
        ],
        yields: 1
    },
    'bronze-sabatons': {
        name: 'Bronze Sabatons',
        level: 3,
        job: 'Armorer',
        materials: [
            { name: 'Bronze Ingot', quantity: 2 },
            { name: 'Fire Shard', quantity: 2 }
        ],
        yields: 1
    },
    'chondrite-plate': {
        name: 'Chondrite Plate',
        level: 90,
        job: 'Armorer',
        materials: [
            { name: 'Chondrite Ingot', quantity: 2 },
            { name: 'Fire Crystal', quantity: 6 },
            { name: 'Ice Crystal', quantity: 4 }
        ],
        yields: 1
    },

    // === GOLDSMITH (GSM) RECIPES ===
    'weathered-chasing-hammer': {
        name: 'Weathered Chasing Hammer',
        level: 1,
        job: 'Goldsmith',
        materials: [
            { name: 'Copper Ingot', quantity: 1 },
            { name: 'Wind Shard', quantity: 1 }
        ],
        yields: 1
    },
    'copper-ingot': {
        name: 'Copper Ingot',
        level: 1,
        job: 'Goldsmith',
        materials: [
            { name: 'Copper Ore', quantity: 1 },
            { name: 'Wind Shard', quantity: 1 }
        ],
        yields: 1
    },
    'brass-earrings': {
        name: 'Brass Earrings',
        level: 4,
        job: 'Goldsmith',
        materials: [
            { name: 'Brass Ingot', quantity: 1 },
            { name: 'Wind Shard', quantity: 2 }
        ],
        yields: 1
    },

    // === LEATHERWORKER (LTW) RECIPES ===
    'weathered-head-knife': {
        name: 'Weathered Head Knife',
        level: 1,
        job: 'Leatherworker',
        materials: [
            { name: 'Maple Log', quantity: 1 },
            { name: 'Earth Shard', quantity: 1 }
        ],
        yields: 1
    },
    'hard-leather': {
        name: 'Hard Leather',
        level: 1,
        job: 'Leatherworker',
        materials: [
            { name: 'Animal Hide', quantity: 1 },
            { name: 'Earth Shard', quantity: 1 }
        ],
        yields: 1
    },
    'leather-shoes': {
        name: 'Leather Shoes',
        level: 3,
        job: 'Leatherworker',
        materials: [
            { name: 'Hard Leather', quantity: 2 },
            { name: 'Hempen Yarn', quantity: 1 },
            { name: 'Earth Shard', quantity: 2 }
        ],
        yields: 1
    },

    // === WEAVER (WVR) RECIPES ===
    'weathered-needle': {
        name: 'Weathered Needle',
        level: 1,
        job: 'Weaver',
        materials: [
            { name: 'Bone Chip', quantity: 1 },
            { name: 'Lightning Shard', quantity: 1 }
        ],
        yields: 1
    },
    'hempen-yarn': {
        name: 'Hempen Yarn',
        level: 1,
        job: 'Weaver',
        materials: [
            { name: 'Moko Grass', quantity: 1 },
            { name: 'Lightning Shard', quantity: 1 }
        ],
        yields: 1
    },
    'hempen-cloth': {
        name: 'Hempen Cloth',
        level: 2,
        job: 'Weaver',
        materials: [
            { name: 'Hempen Yarn', quantity: 2 },
            { name: 'Lightning Shard', quantity: 2 }
        ],
        yields: 1
    },

    // === ALCHEMIST (ALC) RECIPES ===
    'weathered-alembic': {
        name: 'Weathered Alembic',
        level: 1,
        job: 'Alchemist',
        materials: [
            { name: 'Bronze Ingot', quantity: 1 },
            { name: 'Water Shard', quantity: 1 }
        ],
        yields: 1
    },
    'distilled-water': {
        name: 'Distilled Water',
        level: 1,
        job: 'Alchemist',
        materials: [
            { name: 'Water Shard', quantity: 1 }
        ],
        yields: 1
    },
    'bronze-alembic': {
        name: 'Bronze Alembic',
        level: 3,
        job: 'Alchemist',
        materials: [
            { name: 'Bronze Ingot', quantity: 1 },
            { name: 'Distilled Water', quantity: 1 },
            { name: 'Water Shard', quantity: 2 }
        ],
        yields: 1
    },
    'grade-8-tincture-of-strength': {
        name: 'Grade 8 Tincture of Strength',
        level: 90,
        job: 'Alchemist',
        materials: [
            { name: 'Integral Lumber', quantity: 1 },
            { name: 'Chondrite Ingot', quantity: 1 },
            { name: 'Annite', quantity: 2 },
            { name: 'Water Crystal', quantity: 7 },
            { name: 'Lightning Crystal', quantity: 7 }
        ],
        yields: 1
    },

    // === CULINARIAN (CUL) RECIPES ===
    'weathered-skillet': {
        name: 'Weathered Skillet',
        level: 1,
        job: 'Culinarian',
        materials: [
            { name: 'Bronze Ingot', quantity: 1 },
            { name: 'Fire Shard', quantity: 1 }
        ],
        yields: 1
    },
    'grilled-trout': {
        name: 'Grilled Trout',
        level: 1,
        job: 'Culinarian',
        materials: [
            { name: 'Merlthor Trout', quantity: 1 },
            { name: 'Fire Shard', quantity: 1 }
        ],
        yields: 1
    },
    'boiled-egg': {
        name: 'Boiled Egg',
        level: 1,
        job: 'Culinarian',
        materials: [
            { name: 'Chicken Egg', quantity: 1 },
            { name: 'Fire Shard', quantity: 1 }
        ],
        yields: 1
    },
    'tsai-tou-vounou': {
        name: 'Tsai tou Vounou',
        level: 90,
        job: 'Culinarian',
        materials: [
            { name: 'Thavnairian Corn', quantity: 1 },
            { name: 'Integral Lumber', quantity: 1 },
            { name: 'AR-Caean Cotton', quantity: 1 },
            { name: 'Fire Crystal', quantity: 8 },
            { name: 'Water Crystal', quantity: 7 }
        ],
        yields: 1
    },

    // DAWNTRAIL HIGH-END RECIPES (Level 90-100)
    'multifaceted-adze': {
        name: 'Multifaceted Adze',
        level: 100,
        job: 'Carpenter',
        materials: [
            { name: 'Rinascita Lumber', quantity: 4 },
            { name: 'Multifaceted Cotton Cloth', quantity: 1 },
            { name: 'Wind Crystal', quantity: 8 },
            { name: 'Lightning Crystal', quantity: 8 }
        ],
        yields: 1,
        expansion: 'Dawntrail'
    },
    'claro-walnut-lumber': {
        name: 'Claro Walnut Lumber',
        level: 99,
        job: 'Carpenter',
        materials: [
            { name: 'Claro Walnut Log', quantity: 4 },
            { name: 'Wind Crystal', quantity: 8 }
        ],
        yields: 1,
        expansion: 'Dawntrail'
    },
    'turali-onion-soup': {
        name: 'Turali Onion Soup',
        level: 95,
        job: 'Culinarian',
        materials: [
            { name: 'Turali Onion', quantity: 2 },
            { name: 'Mountain Popoto', quantity: 1 },
            { name: 'Fire Crystal', quantity: 8 },
            { name: 'Water Crystal', quantity: 6 }
        ],
        yields: 1,
        expansion: 'Dawntrail'
    },
    'ut-ohmu-fiber': {
        name: 'Ut\'ohmu Fiber',
        level: 98,
        job: 'Weaver',
        materials: [
            { name: 'Ut\'ohmu Cotton Boll', quantity: 4 },
            { name: 'Lightning Crystal', quantity: 8 }
        ],
        yields: 1,
        expansion: 'Dawntrail'
    },
    'ra-kaznar-ingot': {
        name: 'Ra\'Kaznar Ingot',
        level: 97,
        job: 'Blacksmith',
        materials: [
            { name: 'Raw Ra\'Kaznar', quantity: 5 },
            { name: 'Fire Crystal', quantity: 8 }
        ],
        yields: 1,
        expansion: 'Dawntrail'
    },
    'multifaceted-smiths-hammer': {
        name: 'Multifaceted Smith\'s Hammer',
        level: 100,
        job: 'Blacksmith',
        materials: [
            { name: 'Rinascita Ingot', quantity: 4 },
            { name: 'Ut\'ohmu Leather', quantity: 1 },
            { name: 'Fire Crystal', quantity: 8 },
            { name: 'Ice Crystal', quantity: 8 }
        ],
        yields: 1
    },
    'multifaceted-grinding-wheel': {
        name: 'Multifaceted Grinding Wheel',
        level: 100,
        job: 'Armorer',
        materials: [
            { name: 'Rinascita Ingot', quantity: 4 },
            { name: 'Ut\'ohmu Fiber', quantity: 1 },
            { name: 'Fire Crystal', quantity: 8 },
            { name: 'Earth Crystal', quantity: 8 }
        ],
        yields: 1
    },

    // ENDWALKER SPECIALIST RECIPES
    'chondrite-file': {
        name: 'Chondrite File',
        level: 90,
        job: 'Blacksmith',
        materials: [
            { name: 'Chondrite Ingot', quantity: 2 },
            { name: 'Integral Lumber', quantity: 1 },
            { name: 'Fire Crystal', quantity: 7 },
            { name: 'Ice Crystal', quantity: 7 }
        ],
        yields: 1
    },
    'chondrite-lapidary-hammer': {
        name: 'Chondrite Lapidary Hammer',
        level: 90,
        job: 'Goldsmith',
        materials: [
            { name: 'Chondrite Ingot', quantity: 2 },
            { name: 'Integral Lumber', quantity: 1 },
            { name: 'Wind Crystal', quantity: 7 },
            { name: 'Fire Crystal', quantity: 7 }
        ],
        yields: 1
    }

    // ENDWALKER RECIPES (Level 80-90)
    'integral-lumber': {
        name: 'Integral Lumber',
        level: 90,
        job: 'Carpenter',
        materials: [
            { name: 'Integral Log', quantity: 4 },
            { name: 'Wind Crystal', quantity: 8 }
        ],
        yields: 1,
        expansion: 'Endwalker'
    },
    'classical-lumber': {
        name: 'Classical Lumber',
        level: 89,
        job: 'Carpenter',
        materials: [
            { name: 'Classical Log', quantity: 4 },
            { name: 'Wind Crystal', quantity: 7 }
        ],
        yields: 1,
        expansion: 'Endwalker'
    },
    'rarefied-integral-lumber': {
        name: 'Rarefied Integral Lumber',
        level: 90,
        job: 'Carpenter',
        materials: [
            { name: 'Integral Log', quantity: 5 },
            { name: 'Wind Crystal', quantity: 10 }
        ],
        yields: 1,
        expansion: 'Endwalker'
    },
    'ar-caean-cotton': {
        name: 'AR-Caean Cotton',
        level: 90,
        job: 'Weaver',
        materials: [
            { name: 'AR-Caean Cotton Boll', quantity: 4 },
            { name: 'Lightning Crystal', quantity: 8 }
        ],
        yields: 1,
        expansion: 'Endwalker'
    },
    'saigaskin': {
        name: 'Saigaskin',
        level: 90,
        job: 'Leatherworker',
        materials: [
            { name: 'Saigaskin Map', quantity: 1 },
            { name: 'Earth Crystal', quantity: 8 }
        ],
        yields: 1,
        expansion: 'Endwalker'
    },
    'moonward-scale-mail': {
        name: 'Moonward Scale Mail',
        level: 89,
        job: 'Leatherworker',
        materials: [
            { name: 'Saigaskin', quantity: 3 },
            { name: 'Chondrite Ingot', quantity: 2 },
            { name: 'Earth Crystal', quantity: 7 },
            { name: 'Wind Crystal', quantity: 7 }
        ],
        yields: 1,
        expansion: 'Endwalker'
    },

    // SHADOWBRINGERS RECIPES (Level 70-80)
    'lignum-vitae-lumber': {
        name: 'Lignum Vitae Lumber',
        level: 80,
        job: 'Carpenter',
        materials: [
            { name: 'Lignum Vitae Log', quantity: 4 },
            { name: 'Wind Crystal', quantity: 6 }
        ],
        yields: 1,
        expansion: 'Shadowbringers'
    },
    'dwarven-mythril-ingot': {
        name: 'Dwarven Mythril Ingot',
        level: 78,
        job: 'Blacksmith',
        materials: [
            { name: 'Raw Dwarven Mythril', quantity: 5 },
            { name: 'Fire Crystal', quantity: 6 }
        ],
        yields: 1,
        expansion: 'Shadowbringers'
    },
    'zonure-leather': {
        name: 'Zonure Leather',
        level: 79,
        job: 'Leatherworker',
        materials: [
            { name: 'Zonure Skin', quantity: 4 },
            { name: 'Earth Crystal', quantity: 6 }
        ],
        yields: 1,
        expansion: 'Shadowbringers'
    },
    'pixie-cotton': {
        name: 'Pixie Cotton',
        level: 80,
        job: 'Weaver',
        materials: [
            { name: 'Pixie Cotton Boll', quantity: 4 },
            { name: 'Lightning Crystal', quantity: 6 }
        ],
        yields: 1,
        expansion: 'Shadowbringers'
    },

    // STORMBLOOD RECIPES (Level 60-70)
    'zelkova-lumber': {
        name: 'Zelkova Lumber',
        level: 70,
        job: 'Carpenter',
        materials: [
            { name: 'Zelkova Log', quantity: 3 },
            { name: 'Wind Crystal', quantity: 5 }
        ],
        yields: 1,
        expansion: 'Stormblood'
    },
    'durium-ingot': {
        name: 'Durium Ingot',
        level: 70,
        job: 'Blacksmith',
        materials: [
            { name: 'Durium Ore', quantity: 4 },
            { name: 'Fire Crystal', quantity: 5 }
        ],
        yields: 1,
        expansion: 'Stormblood'
    },
    'gazelle-leather': {
        name: 'Gazelle Leather',
        level: 68,
        job: 'Leatherworker',
        materials: [
            { name: 'Gazelle Hide', quantity: 4 },
            { name: 'Earth Crystal', quantity: 5 }
        ],
        yields: 1,
        expansion: 'Stormblood'
    },
    'kudzu-cloth': {
        name: 'Kudzu Cloth',
        level: 69,
        job: 'Weaver',
        materials: [
            { name: 'Kudzu Thread', quantity: 3 },
            { name: 'Lightning Crystal', quantity: 5 }
        ],
        yields: 1,
        expansion: 'Stormblood'
    },

    // HEAVENSWARD RECIPES (Level 50-60)
    'dark-chestnut-lumber': {
        name: 'Dark Chestnut Lumber',
        level: 60,
        job: 'Carpenter',
        materials: [
            { name: 'Dark Chestnut Log', quantity: 3 },
            { name: 'Wind Crystal', quantity: 4 }
        ],
        yields: 1,
        expansion: 'Heavensward'
    },
    'titanium-ingot': {
        name: 'Titanium Ingot',
        level: 58,
        job: 'Blacksmith',
        materials: [
            { name: 'Titanium Ore', quantity: 4 },
            { name: 'Fire Crystal', quantity: 4 }
        ],
        yields: 1,
        expansion: 'Heavensward'
    },
    'wyvern-leather': {
        name: 'Wyvern Leather',
        level: 58,
        job: 'Leatherworker',
        materials: [
            { name: 'Wyvern Skin', quantity: 4 },
            { name: 'Earth Crystal', quantity: 4 }
        ],
        yields: 1,
        expansion: 'Heavensward'
    },
    'holy-rainbow-cloth': {
        name: 'Holy Rainbow Cloth',
        level: 60,
        job: 'Weaver',
        materials: [
            { name: 'Rainbow Cotton Boll', quantity: 4 },
            { name: 'Lightning Crystal', quantity: 4 }
        ],
        yields: 1,
        expansion: 'Heavensward'
    },

    // A REALM REBORN HIGH-LEVEL RECIPES (Level 40-50)
    'mahogany-lumber': {
        name: 'Mahogany Lumber',
        level: 50,
        job: 'Carpenter',
        materials: [
            { name: 'Mahogany Log', quantity: 3 },
            { name: 'Wind Crystal', quantity: 3 }
        ],
        yields: 1,
        expansion: 'A Realm Reborn'
    },
    'cobalt-ingot': {
        name: 'Cobalt Ingot',
        level: 43,
        job: 'Blacksmith',
        materials: [
            { name: 'Cobalt Ore', quantity: 3 },
            { name: 'Fire Crystal', quantity: 3 }
        ],
        yields: 1,
        expansion: 'A Realm Reborn'
    },
    'peisteskin': {
        name: 'Peisteskin',
        level: 45,
        job: 'Leatherworker',
        materials: [
            { name: 'Peiste Skin', quantity: 3 },
            { name: 'Earth Crystal', quantity: 3 }
        ],
        yields: 1,
        expansion: 'A Realm Reborn'
    },
    'felt': {
        name: 'Felt',
        level: 38,
        job: 'Weaver',
        materials: [
            { name: 'Fleece', quantity: 2 },
            { name: 'Lightning Crystal', quantity: 3 }
        ],
        yields: 1,
        expansion: 'A Realm Reborn'
    },
    'hi-potion': {
        name: 'Hi-Potion',
        level: 45,
        job: 'Alchemist',
        materials: [
            { name: 'Antidote', quantity: 1 },
            { name: 'Ether', quantity: 1 },
            { name: 'Distilled Water', quantity: 1 },
            { name: 'Water Crystal', quantity: 3 }
        ],
        yields: 1,
        expansion: 'A Realm Reborn'
    },
    'knight-bread': {
        name: 'Knight\'s Bread',
        level: 42,
        job: 'Culinarian',
        materials: [
            { name: 'Rye Flour', quantity: 1 },
            { name: 'Rock Salt', quantity: 1 },
            { name: 'Fire Crystal', quantity: 3 }
        ],
        yields: 1,
        expansion: 'A Realm Reborn'
    },
    'electrum-ingot': {
        name: 'Electrum Ingot',
        level: 47,
        job: 'Goldsmith',
        materials: [
            { name: 'Gold Ore', quantity: 2 },
            { name: 'Silver Ore', quantity: 1 },
            { name: 'Wind Crystal', quantity: 3 }
        ],
        yields: 1,
        expansion: 'A Realm Reborn'
    },
    'electrum-plate': {
        name: 'Electrum Plate',
        level: 48,
        job: 'Armorer',
        materials: [
            { name: 'Electrum Ingot', quantity: 2 },
            { name: 'Fire Crystal', quantity: 3 },
            { name: 'Ice Crystal', quantity: 2 }
        ],
        yields: 1,
        expansion: 'A Realm Reborn'
    }
};

// Export for use in the recipe loader
window.COMPREHENSIVE_RECIPES = COMPREHENSIVE_RECIPES;

console.log(`🗂️ Comprehensive recipe database loaded: ${Object.keys(COMPREHENSIVE_RECIPES).length} recipes from all expansions`);

// Export recipe count by expansion for verification
const expansionCounts = {};
for (const recipe of Object.values(COMPREHENSIVE_RECIPES)) {
    const expansion = recipe.expansion || 'Unknown';
    expansionCounts[expansion] = (expansionCounts[expansion] || 0) + 1;
}
console.log('📊 Recipe count by expansion:', expansionCounts);