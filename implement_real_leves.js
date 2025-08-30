const fs = require('fs');

console.log('🔧 IMPLEMENTING REAL LEVE QUEST DATA');
console.log('====================================');

// Read the extracted leve data
const leveData = JSON.parse(fs.readFileSync('/mnt/c/Users/Nlell/OneDrive/Desktop/FC_website/real_leve_data.json', 'utf8'));

// Read the current HTML file
let html = fs.readFileSync('/mnt/c/Users/Nlell/OneDrive/Desktop/FC_website/pages/crafting-gathering.html', 'utf8');

console.log('✅ Loaded real leve quest data');
console.log('✅ Loaded current HTML file');

// Replace the leveData object in the JavaScript
const newLeveDataString = `const leveData = ${JSON.stringify(leveData, null, 12)};`;

// Find and replace the existing leveData
const leveDataRegex = /const leveData = \{[\s\S]*?\n\s*\};/;

if (html.match(leveDataRegex)) {
    html = html.replace(leveDataRegex, newLeveDataString);
    console.log('✅ Updated leveData object with real data');
} else {
    console.log('❌ Could not find leveData object to replace');
}

// Update the HTML select options to match the real level ranges
const levelRanges = ['1-5', '5-10', '10-15', '15-20', '20-25', '25-30', '30-35', '35-40', '40-45', '45-50', 'Heavensward', 'Stormblood', 'Shadowbringers', 'Endwalker', 'Dawntrail'];

const newSelectOptions = `<select id="leve-level" style="padding: 0.5rem; border-radius: 5px; background: rgba(26, 26, 26, 0.9); color: #ffffff; border: 2px solid #fca5a5; width: 100%;">
                                    <option value="">Select level range...</option>
${levelRanges.map(range => `                                    <option value="${range}">${range}</option>`).join('\\n')}
                                </select>`;

const selectOptionsRegex = /<select id="leve-level"[^>]*>[\s\S]*?<\/select>/;
if (html.match(selectOptionsRegex)) {
    html = html.replace(selectOptionsRegex, newSelectOptions);
    console.log('✅ Updated HTML select options');
} else {
    console.log('❌ Could not find select element to replace');
}

// Update the leve results table headers to include zone and NPC properly
const newTableHeaders = `html += '<thead><tr style="background: rgba(252, 165, 165, 0.2);"><th style="padding: 0.5rem; border: 1px solid #fca5a5;">Leve Quest</th><th style="padding: 0.5rem; border: 1px solid #fca5a5;">Category</th><th style="padding: 0.5rem; border: 1px solid #fca5a5;">Level</th><th style="padding: 0.5rem; border: 1px solid #fca5a5;">Start NPC</th><th style="padding: 0.5rem; border: 1px solid #fca5a5;">Turn-in NPC</th><th style="padding: 0.5rem; border: 1px solid #fca5a5;">EXP</th><th style="padding: 0.5rem; border: 1px solid #fca5a5;">Gil</th><th style="padding: 0.5rem; border: 1px solid #fca5a5;">Item Needed</th></tr></thead>';`;

// Find and replace the table headers
const tableHeaderRegex = /html \+= '<thead><tr[^>]*>[\s\S]*?<\/tr><\/thead>';/;
if (html.match(tableHeaderRegex)) {
    html = html.replace(tableHeaderRegex, newTableHeaders);
    console.log('✅ Updated table headers');
}

// Update the table row generation to match the new data structure
const newTableRowGeneration = `leves.forEach((leve, index) => {
                        const bgColor = index % 2 === 0 ? 'rgba(26, 26, 26, 0.8)' : 'rgba(45, 45, 45, 0.8)';
                        
                        html += \`<tr style="background: \${bgColor};">\`;
                        html += \`<td style="padding: 0.5rem; border: 1px solid #fca5a5; color: #ffffff;">\${leve.name}</td>\`;
                        html += \`<td style="padding: 0.5rem; border: 1px solid #fca5a5; color: #c4b5fd;">\${leve.category}</td>\`;
                        html += \`<td style="padding: 0.5rem; border: 1px solid #fca5a5; color: #fbbf24;">Level \${leve.level}</td>\`;
                        html += \`<td style="padding: 0.5rem; border: 1px solid #fca5a5; color: #a7f3d0;">\${leve.startNPC}</td>\`;
                        html += \`<td style="padding: 0.5rem; border: 1px solid #fca5a5; color: #a7f3d0;">\${leve.turnInNPC}</td>\`;
                        html += \`<td style="padding: 0.5rem; border: 1px solid #fca5a5; color: #a7f3d0;">\${leve.exp.toLocaleString()}</td>\`;
                        html += \`<td style="padding: 0.5rem; border: 1px solid #fca5a5; color: #fbbf24;">\${leve.gil.toLocaleString()} gil</td>\`;
                        html += \`<td style="padding: 0.5rem; border: 1px solid #fca5a5; color: #ffffff;">\${leve.item}</td>\`;
                        html += '</tr>';
                    });`;

// Find and replace the table row generation
const tableRowRegex = /leves\.forEach\(\(leve, index\) => \{[\s\S]*?\}\);/;
if (html.match(tableRowRegex)) {
    html = html.replace(tableRowRegex, newTableRowGeneration);
    console.log('✅ Updated table row generation');
}

// Write the updated file
fs.writeFileSync('/mnt/c/Users/Nlell/OneDrive/Desktop/FC_website/pages/crafting-gathering.html', html);
console.log('✅ Updated crafting-gathering.html with real leve quest data');

console.log('\\n🎉 Implementation complete!');
console.log('📋 Level ranges now available:');
levelRanges.forEach(range => console.log(`  - ${range}`));

console.log('\\n📊 Total leve quests per class:');
Object.entries(leveData).forEach(([jobCode, ranges]) => {
    const total = Object.values(ranges).reduce((sum, leves) => sum + leves.length, 0);
    console.log(`  ${jobCode.toUpperCase()}: ${total} leve quests`);
});