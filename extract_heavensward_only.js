const fs = require('fs');
const { JSDOM } = require('jsdom');

console.log('🔍 EXTRACTING HEAVENSWARD LEVE DATA ONLY');
console.log('========================================');

try {
    const html = fs.readFileSync('/mnt/c/Users/Nlell/OneDrive/Desktop/FC_website/Tradecraft Leves - Final Fantasy XIV Online Wiki - FFXIV _ FF14 Online Community Wiki and Guide.html', 'utf8');
    
    const dom = new JSDOM(html);
    const document = dom.window.document;
    
    const heavenswardData = {
        crp: [],  // Carpenter only for now
    };
    
    // Find all Heavensward sections for Carpenter
    const heavenswardHeaders = Array.from(document.querySelectorAll('h3')).filter(h3 => 
        h3.textContent.trim() === 'Heavensward'
    );
    
    console.log(`Found ${heavenswardHeaders.length} Heavensward sections`);
    
    // Process the first Heavensward section (Carpenter)
    if (heavenswardHeaders.length > 0) {
        const firstHeavenswardSection = heavenswardHeaders[0];
        
        // Find the table following this header
        let tableElement = firstHeavenswardSection.nextElementSibling;
        while (tableElement && tableElement.tagName !== 'TABLE') {
            tableElement = tableElement.nextElementSibling;
        }
        
        if (tableElement && tableElement.tagName === 'TABLE') {
            console.log('Found Heavensward table for Carpenter');
            
            const rows = tableElement.querySelectorAll('tbody tr');
            console.log(`Found ${rows.length} rows (including header)`);
            
            // Check header structure
            const headerCells = rows[0].querySelectorAll('th');
            console.log(`Header has ${headerCells.length} columns:`);
            headerCells.forEach((cell, index) => {
                console.log(`  ${index}: ${cell.textContent.trim()}`);
            });
            
            // Process data rows (skip header row 0)
            for (let i = 1; i < rows.length; i++) {
                const cells = rows[i].querySelectorAll('td');
                
                if (cells.length >= 11) {
                    // Expected 11-column format:
                    // 0: Guildleve, 1: Category, 2: Level, 3: NPC, 4: Zone, 5: Coordinates, 6: Objective Location, 7: EXP, 8: Gil, 9: Items Needed, 10: Objective
                    
                    const leveQuest = {
                        name: cells[0].textContent.trim(),
                        category: cells[1].textContent.trim(),
                        level: parseInt(cells[2].textContent.trim()),
                        startNPC: cells[3].textContent.trim(),
                        zone: cells[4].textContent.trim(),
                        coordinates: cells[5].textContent.trim(),
                        objectiveLocation: cells[6].textContent.trim(),
                        exp: parseInt(cells[7].textContent.replace(/[^0-9]/g, '')) || 0,
                        gil: parseInt(cells[8].textContent.replace(/[^0-9]/g, '')) || 0,
                        item: cells[9].textContent.trim(),
                        objective: cells[10].textContent.trim()
                    };
                    
                    // Clean up the item field (remove HTML artifacts)
                    leveQuest.item = leveQuest.item.replace(/\s+/g, ' ').trim();
                    
                    heavenswardData.crp.push(leveQuest);
                    
                    console.log(`Added: ${leveQuest.name} (Level ${leveQuest.level}, ${leveQuest.exp.toLocaleString()} EXP, ${leveQuest.gil} gil)`);
                } else {
                    console.log(`Row ${i} has only ${cells.length} columns, skipping`);
                }
            }
        } else {
            console.log('❌ Could not find table for Heavensward');
        }
    }
    
    console.log(`\n📊 EXTRACTION COMPLETE:`);
    console.log(`Carpenter Heavensward quests: ${heavenswardData.crp.length}`);
    
    if (heavenswardData.crp.length > 0) {
        console.log(`\n📋 SAMPLE QUEST:`);
        const sample = heavenswardData.crp[0];
        console.log(`Name: ${sample.name}`);
        console.log(`Category: ${sample.category}`);
        console.log(`Level: ${sample.level}`);
        console.log(`Start NPC: ${sample.startNPC}`);
        console.log(`Zone: ${sample.zone}`);
        console.log(`Coordinates: ${sample.coordinates}`);
        console.log(`EXP: ${sample.exp.toLocaleString()}`);
        console.log(`Gil: ${sample.gil}`);
        console.log(`Item: ${sample.item}`);
        console.log(`Objective: ${sample.objective}`);
        
        // Save the data
        fs.writeFileSync('/mnt/c/Users/Nlell/OneDrive/Desktop/FC_website/heavensward_carpenter_data.json', JSON.stringify(heavenswardData, null, 2));
        console.log('\n✅ Saved to heavensward_carpenter_data.json');
    }
    
} catch (error) {
    console.error('❌ Error:', error.message);
}