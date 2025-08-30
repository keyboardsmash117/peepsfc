const fs = require('fs');
const { JSDOM } = require('jsdom');

console.log('🔍 EXTRACTING ALL EXPANSION LEVE DATA WITH CORRECT MAPPING');
console.log('=========================================================');

try {
    const html = fs.readFileSync('/mnt/c/Users/Nlell/OneDrive/Desktop/FC_website/Tradecraft Leves - Final Fantasy XIV Online Wiki - FFXIV _ FF14 Online Community Wiki and Guide.html', 'utf8');
    
    const dom = new JSDOM(html);
    const document = dom.window.document;
    
    const expansionData = {
        crp: { Heavensward: [], Stormblood: [], Shadowbringers: [], Endwalker: [], Dawntrail: [] },
        bsm: { Heavensward: [], Stormblood: [], Shadowbringers: [], Endwalker: [], Dawntrail: [] },
        arm: { Heavensward: [], Stormblood: [], Shadowbringers: [], Endwalker: [], Dawntrail: [] },
        gsm: { Heavensward: [], Stormblood: [], Shadowbringers: [], Endwalker: [], Dawntrail: [] },
        ltw: { Heavensward: [], Stormblood: [], Shadowbringers: [], Endwalker: [], Dawntrail: [] },
        wvr: { Heavensward: [], Stormblood: [], Shadowbringers: [], Endwalker: [], Dawntrail: [] },
        alc: { Heavensward: [], Stormblood: [], Shadowbringers: [], Endwalker: [], Dawntrail: [] },
        cul: { Heavensward: [], Stormblood: [], Shadowbringers: [], Endwalker: [], Dawntrail: [] }
    };
    
    const jobMapping = {
        'Carpenter': 'crp',
        'Blacksmith': 'bsm', 
        'Armorer': 'arm',
        'Goldsmith': 'gsm',
        'Leatherworker': 'ltw',
        'Weaver': 'wvr',
        'Alchemist': 'alc',
        'Culinarian': 'cul'
    };
    
    const expansions = ['Heavensward', 'Stormblood', 'Shadowbringers', 'Endwalker', 'Dawntrail'];
    
    // Process each job
    for (const [jobName, jobCode] of Object.entries(jobMapping)) {
        console.log(`\n=== PROCESSING ${jobName.toUpperCase()} ===`);
        
        // Find the job header
        const jobHeader = Array.from(document.querySelectorAll('h2')).find(h2 => 
            h2.textContent.trim() === jobName
        );
        
        if (!jobHeader) {
            console.log(`❌ Could not find ${jobName} section`);
            continue;
        }
        
        // Find all expansion sections under this job
        let currentElement = jobHeader.nextElementSibling;
        
        while (currentElement && currentElement.tagName !== 'H2') {
            if (currentElement.tagName === 'H3') {
                const expansionName = currentElement.textContent.trim();
                
                if (expansions.includes(expansionName)) {
                    console.log(`  📋 Processing ${expansionName}...`);
                    
                    // Find the table following this expansion header
                    let tableElement = currentElement.nextElementSibling;
                    while (tableElement && tableElement.tagName !== 'TABLE' && tableElement.tagName !== 'H3' && tableElement.tagName !== 'H2') {
                        tableElement = tableElement.nextElementSibling;
                    }
                    
                    if (tableElement && tableElement.tagName === 'TABLE') {
                        const rows = tableElement.querySelectorAll('tbody tr');
                        
                        if (rows.length > 0) {
                            // Check header to determine table format
                            const headerCells = rows[0].querySelectorAll('th');
                            const columnCount = headerCells.length;
                            console.log(`    Table has ${columnCount} columns`);
                            
                            // Process data rows
                            for (let i = 1; i < rows.length; i++) {
                                const cells = rows[i].querySelectorAll('td');
                                
                                if (cells.length >= columnCount - 1) { // Allow for slight variations
                                    let leveQuest;
                                    
                                    if (columnCount === 11) {
                                        // 11-column format: Guildleve|Category|Level|NPC|Zone|Coordinates|Objective Location|EXP|Gil|Items Needed|Objective
                                        leveQuest = {
                                            name: cells[0].textContent.trim(),
                                            category: cells[1].textContent.trim(),
                                            level: parseInt(cells[2].textContent.trim()),
                                            startNPC: cells[3].textContent.trim(),
                                            zone: cells[4].textContent.trim(),
                                            coordinates: cells[5].textContent.trim(),
                                            turnInNPC: cells[6].textContent.trim(),
                                            exp: parseInt(cells[7].textContent.replace(/[^0-9]/g, '')) || 0,
                                            gil: parseInt(cells[8].textContent.replace(/[^0-9]/g, '')) || 0,
                                            item: cells[9].textContent.trim(),
                                            objective: cells[10].textContent.trim()
                                        };
                                    } else if (columnCount === 10) {
                                        // 10-column format: Levequest|Category|Level|NPC|Zone|Coordinates|EXP|Gil|Items Needed|Objective  
                                        leveQuest = {
                                            name: cells[0].textContent.trim(),
                                            category: cells[1].textContent.trim(),
                                            level: parseInt(cells[2].textContent.trim()),
                                            startNPC: cells[3].textContent.trim(),
                                            zone: cells[4].textContent.trim(),
                                            coordinates: cells[5].textContent.trim(),
                                            turnInNPC: cells[4].textContent.trim(), // Use zone as turnInNPC
                                            exp: parseInt(cells[6].textContent.replace(/[^0-9]/g, '')) || 0,
                                            gil: parseInt(cells[7].textContent.replace(/[^0-9]/g, '')) || 0,
                                            item: cells[8].textContent.trim(),
                                            objective: cells[9].textContent.trim()
                                        };
                                    } else {
                                        console.log(`    ⚠️  Skipping row with ${cells.length} cells (expected ${columnCount})`);
                                        continue;
                                    }
                                    
                                    // Clean up item field
                                    leveQuest.item = leveQuest.item.replace(/\s+/g, ' ').trim();
                                    
                                    // Remove HTML links and clean names
                                    Object.keys(leveQuest).forEach(key => {
                                        if (typeof leveQuest[key] === 'string') {
                                            leveQuest[key] = leveQuest[key].replace(/<[^>]*>/g, '').replace(/\s+/g, ' ').trim();
                                        }
                                    });
                                    
                                    expansionData[jobCode][expansionName].push(leveQuest);
                                }
                            }
                            
                            console.log(`    ✅ Added ${expansionData[jobCode][expansionName].length} leve quests`);
                        }
                    } else {
                        console.log(`    ❌ No table found for ${expansionName}`);
                    }
                }
            }
            currentElement = currentElement.nextElementSibling;
        }
    }
    
    // Summary and save
    console.log('\n📊 EXTRACTION SUMMARY:');
    console.log('======================');
    
    let totalQuests = 0;
    for (const [jobCode, expansions] of Object.entries(expansionData)) {
        const jobTotal = Object.values(expansions).reduce((sum, quests) => sum + quests.length, 0);
        totalQuests += jobTotal;
        console.log(`${jobCode.toUpperCase()}: ${jobTotal} quests`);
        
        Object.keys(expansions).forEach(exp => {
            if (expansions[exp].length > 0) {
                console.log(`  ${exp}: ${expansions[exp].length} quests`);
            }
        });
    }
    
    console.log(`\nTOTAL EXPANSION QUESTS: ${totalQuests}`);
    
    // Save the data
    fs.writeFileSync('/mnt/c/Users/Nlell/OneDrive/Desktop/FC_website/all_expansion_data_correct.json', JSON.stringify(expansionData, null, 2));
    console.log('\n✅ Saved to all_expansion_data_correct.json');
    
} catch (error) {
    console.error('❌ Error:', error.message);
    console.log(error.stack);
}