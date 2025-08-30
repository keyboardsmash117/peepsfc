const fs = require('fs');
const { JSDOM } = require('jsdom');

console.log('🔍 EXTRACTING REAL LEVE QUEST DATA FROM WIKI');
console.log('==============================================');

try {
    // Read the downloaded HTML file
    const html = fs.readFileSync('/mnt/c/Users/Nlell/OneDrive/Desktop/FC_website/Tradecraft Leves - Final Fantasy XIV Online Wiki - FFXIV _ FF14 Online Community Wiki and Guide.html', 'utf8');
    
    const dom = new JSDOM(html);
    const document = dom.window.document;
    
    const leveData = {
        crp: {},  // Carpenter
        bsm: {},  // Blacksmith
        arm: {},  // Armorer
        gsm: {},  // Goldsmith
        ltw: {},  // Leatherworker
        wvr: {},  // Weaver
        alc: {},  // Alchemist
        cul: {}   // Culinarian
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
    
    // Process each crafting job
    for (const [jobName, jobCode] of Object.entries(jobMapping)) {
        console.log(`\\nProcessing ${jobName}...`);
        
        // Find the job section
        const jobHeader = Array.from(document.querySelectorAll('h2')).find(h2 => 
            h2.textContent.trim() === jobName
        );
        
        if (!jobHeader) {
            console.log(`❌ Could not find ${jobName} section`);
            continue;
        }
        
        // Find all expansion subsections under this job
        let currentElement = jobHeader.nextElementSibling;
        
        while (currentElement && currentElement.tagName !== 'H2') {
            if (currentElement.tagName === 'H3') {
                const expansionName = currentElement.textContent.trim();
                console.log(`  Found expansion: ${expansionName}`);
                
                // Find the table following this expansion header
                let tableElement = currentElement.nextElementSibling;
                while (tableElement && tableElement.tagName !== 'TABLE' && tableElement.tagName !== 'H3' && tableElement.tagName !== 'H2') {
                    tableElement = tableElement.nextElementSibling;
                }
                
                if (tableElement && tableElement.tagName === 'TABLE') {
                    const rows = tableElement.querySelectorAll('tbody tr');
                    const expansionLeves = [];
                    
                    for (let i = 1; i < rows.length; i++) { // Skip header row
                        const cells = rows[i].querySelectorAll('td');
                        if (cells.length >= 9) {
                            const leveQuest = {
                                name: cells[0].textContent.trim(),
                                category: cells[1].textContent.trim(),
                                level: parseInt(cells[2].textContent.trim()),
                                startNPC: cells[3].textContent.trim(),
                                turnInNPC: cells[4].textContent.trim(),
                                exp: parseInt(cells[5].textContent.replace(/[^0-9]/g, '')),
                                gil: parseInt(cells[6].textContent.replace(/[^0-9]/g, '')),
                                item: cells[7].textContent.trim(),
                                objective: cells[8].textContent.trim()
                            };
                            
                            expansionLeves.push(leveQuest);
                        }
                    }
                    
                    if (expansionLeves.length > 0) {
                        leveData[jobCode][expansionName] = expansionLeves;
                        console.log(`    Added ${expansionLeves.length} leve quests`);
                    }
                }
            }
            currentElement = currentElement.nextElementSibling;
        }
    }
    
    // Reorganize by 5-level ranges for 1-50, then expansions for 50+
    const reorganizedData = {};
    
    for (const [jobCode, expansions] of Object.entries(leveData)) {
        reorganizedData[jobCode] = {};
        
        // Collect all leve quests for this job
        const allLeves = [];
        for (const [expansion, leves] of Object.entries(expansions)) {
            allLeves.push(...leves);
        }
        
        // Sort by level
        allLeves.sort((a, b) => a.level - b.level);
        
        // Group by 5-level ranges for 1-50
        const levelRanges = ['1-5', '5-10', '10-15', '15-20', '20-25', '25-30', '30-35', '35-40', '40-45', '45-50'];
        
        for (const range of levelRanges) {
            const [min, max] = range.split('-').map(Number);
            const rangeMatch = range === '1-5' ? 
                allLeves.filter(leve => leve.level >= min && leve.level < max) :
                allLeves.filter(leve => leve.level >= min && leve.level < max);
            
            if (rangeMatch.length > 0) {
                reorganizedData[jobCode][range] = rangeMatch;
            }
        }
        
        // Add 50+ content by expansion
        const highLevelLeves = allLeves.filter(leve => leve.level >= 50);
        const expansionGroups = {};
        
        for (const leve of highLevelLeves) {
            let expansion = 'A Realm Reborn';
            if (leve.level >= 50 && leve.level < 60) expansion = 'Heavensward';
            else if (leve.level >= 60 && leve.level < 70) expansion = 'Stormblood';
            else if (leve.level >= 70 && leve.level < 80) expansion = 'Shadowbringers';
            else if (leve.level >= 80 && leve.level < 90) expansion = 'Endwalker';
            else if (leve.level >= 90) expansion = 'Dawntrail';
            
            if (!expansionGroups[expansion]) expansionGroups[expansion] = [];
            expansionGroups[expansion].push(leve);
        }
        
        Object.assign(reorganizedData[jobCode], expansionGroups);
    }
    
    // Output the structured data
    console.log('\\n📊 REORGANIZED DATA SUMMARY:');
    for (const [jobCode, ranges] of Object.entries(reorganizedData)) {
        const totalLeves = Object.values(ranges).reduce((sum, leves) => sum + leves.length, 0);
        console.log(`${jobCode.toUpperCase()}: ${totalLeves} leve quests across ${Object.keys(ranges).length} ranges`);
        Object.keys(ranges).forEach(range => {
            console.log(`  ${range}: ${ranges[range].length} quests`);
        });
    }
    
    // Save the reorganized data
    fs.writeFileSync('/mnt/c/Users/Nlell/OneDrive/Desktop/FC_website/real_leve_data.json', JSON.stringify(reorganizedData, null, 2));
    console.log('\\n✅ Real leve quest data saved to real_leve_data.json');
    
} catch (error) {
    console.error('❌ Error extracting leve data:', error.message);
    console.log('\\n💡 Install jsdom if needed: npm install jsdom');
}