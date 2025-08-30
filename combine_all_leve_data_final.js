const fs = require('fs');

console.log('🔧 COMBINING ALL LEVE DATA (LEVEL RANGES + CORRECTED EXPANSIONS)');
console.log('================================================================');

try {
    // Read the original level range data (1-5, 5-10, etc.)
    const originalData = JSON.parse(fs.readFileSync('/mnt/c/Users/Nlell/OneDrive/Desktop/FC_website/real_leve_data.json', 'utf8'));
    
    // Read the corrected expansion data
    const expansionData = JSON.parse(fs.readFileSync('/mnt/c/Users/Nlell/OneDrive/Desktop/FC_website/all_expansion_data_correct.json', 'utf8'));
    
    console.log('✅ Loaded original level range data');
    console.log('✅ Loaded corrected expansion data');
    
    // Create final combined dataset
    const finalData = {};
    
    Object.keys(originalData).forEach(jobCode => {
        finalData[jobCode] = {};
        
        // First, add all the level ranges (1-5, 5-10, etc.)
        Object.keys(originalData[jobCode]).forEach(range => {
            if (range.includes('-')) { // Level ranges like "1-5", "5-10"
                finalData[jobCode][range] = originalData[jobCode][range];
            }
        });
        
        // Then, add the corrected expansion data
        if (expansionData[jobCode]) {
            Object.keys(expansionData[jobCode]).forEach(expansion => {
                if (expansionData[jobCode][expansion].length > 0) {
                    finalData[jobCode][expansion] = expansionData[jobCode][expansion];
                }
            });
        }
    });
    
    // Summary
    console.log('\\n📊 FINAL COMBINED DATA:');
    console.log('========================');
    
    let totalQuests = 0;
    Object.keys(finalData).forEach(jobCode => {
        const jobTotal = Object.values(finalData[jobCode]).reduce((sum, quests) => sum + quests.length, 0);
        totalQuests += jobTotal;
        console.log(`${jobCode.toUpperCase()}: ${jobTotal} quests across ${Object.keys(finalData[jobCode]).length} ranges`);
        
        // Show breakdown
        const levelRanges = Object.keys(finalData[jobCode]).filter(k => k.includes('-'));
        const expansionRanges = Object.keys(finalData[jobCode]).filter(k => !k.includes('-'));
        
        if (levelRanges.length > 0) {
            const levelTotal = levelRanges.reduce((sum, range) => sum + finalData[jobCode][range].length, 0);
            console.log(`  Level ranges (1-50): ${levelTotal} quests`);
        }
        
        if (expansionRanges.length > 0) {
            const expTotal = expansionRanges.reduce((sum, exp) => sum + finalData[jobCode][exp].length, 0);
            console.log(`  Expansions (50+): ${expTotal} quests`);
        }
    });
    
    console.log(`\\nGRAND TOTAL: ${totalQuests} leve quests`);
    
    // Verify data quality on a sample
    console.log('\\n🔍 DATA QUALITY CHECK:');
    console.log('======================');
    
    const carpenter = finalData.crp;
    
    // Check level range data
    if (carpenter['1-5'] && carpenter['1-5'].length > 0) {
        const levelSample = carpenter['1-5'][0];
        console.log('Level Range Sample (1-5):');
        console.log(`  ✅ Name: ${levelSample.name}`);
        console.log(`  ✅ EXP: ${levelSample.exp}`);
        console.log(`  ✅ Gil: ${levelSample.gil}`);
        console.log(`  ✅ Start NPC: ${levelSample.startNPC}`);
    }
    
    // Check expansion data  
    if (carpenter.Heavensward && carpenter.Heavensward.length > 0) {
        const expSample = carpenter.Heavensward[0];
        console.log('\\nExpansion Sample (Heavensward):');
        console.log(`  ✅ Name: ${expSample.name}`);
        console.log(`  ✅ EXP: ${expSample.exp}`);
        console.log(`  ✅ Gil: ${expSample.gil}`);
        console.log(`  ✅ Start NPC: ${expSample.startNPC}`);
        console.log(`  ✅ Zone: ${expSample.zone}`);
    }
    
    // Save final data
    fs.writeFileSync('/mnt/c/Users/Nlell/OneDrive/Desktop/FC_website/final_complete_leve_data.json', JSON.stringify(finalData, null, 2));
    console.log('\\n✅ Saved complete dataset to final_complete_leve_data.json');
    
    console.log('\\n🎉 DATA COMBINATION COMPLETE!');
    
} catch (error) {
    console.error('❌ Error:', error.message);
}