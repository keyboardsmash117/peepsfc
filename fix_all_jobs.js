const fs = require('fs');

// Read the HTML file
let html = fs.readFileSync('/mnt/c/Users/Nlell/OneDrive/Desktop/FC_website/pages/crafting-gathering.html', 'utf8');

// Map of recipe names to their jobs (based on materials and context)
const jobMappings = {
    // Carpenter items
    'Larboard Hull Component': 'Carpenter',
    'Bladder Component': 'Carpenter', 
    'Hull Interior Component': 'Carpenter',
    'Maple Clogs': 'Carpenter',
    'Starboard Hull Component': 'Carpenter',
    'Bladder Lining Component': 'Carpenter',
    'Bone Harpoon': 'Carpenter',
    'Round Shield': 'Carpenter',
    'Maple Shortbow': 'Carpenter',
    'Maple Cane': 'Carpenter',
    'Maple Longbow': 'Carpenter',
    'Maple Crook': 'Carpenter',
    'Maple Fishing Rod': 'Carpenter',
    'Plumed Maple Shortbow': 'Carpenter',
    'Ash Shortbow': 'Carpenter',
    'Elm Lumber': 'Carpenter',
    'Glade Lancet Window': 'Carpenter',
    'Oasis Oblong Window': 'Carpenter',
    'Oasis Wooden Awning': 'Carpenter',
    'Elm Fishing Rod': 'Carpenter',
    'Riviera Bay Window': 'Carpenter',
    'Iron Spear': 'Carpenter',
    'Glade Cottage Wall (Wood)': 'Carpenter',
    'Lalafellin Step Stool': 'Carpenter',
    'Oriental Round Table': 'Carpenter',
    'Yew Lumber': 'Carpenter',
    'Glade Rounded Window': 'Carpenter',
    'Riviera Cottage Wall (Wood)': 'Carpenter',
    'Riviera Partition Door': 'Carpenter',
    'Yew Radical': 'Carpenter',
    'Yew Crook': 'Carpenter',
    'Elm Velocity Bow': 'Carpenter',
    'Glade Lantern': 'Carpenter',
    'Walnut Lumber': 'Carpenter',
    'Funguar Chair': 'Carpenter',
    'Oasis Cupboard': 'Carpenter',
    'Walnut Interior Wall': 'Carpenter',
    'Yew Fishing Rod': 'Carpenter',
    'Glade Bathtub': 'Carpenter',
    'Tier 1 Aquarium': 'Carpenter',
    'Cedar Longbow': 'Carpenter',
    'Glade Roundpole Fence': 'Carpenter',
    'Holy Cedar Lumber': 'Carpenter',
    'Holy Cedar Composite Bow': 'Carpenter',
    'Dark Chestnut Lumber': 'Carpenter',
    'Dark Chestnut Longbow': 'Carpenter',
    'Cassia Lumber': 'Carpenter',
    'Birch Lumber': 'Carpenter',
    'Adamantite Spear': 'Carpenter',
    'Larch Lumber': 'Carpenter',
    'Pine Lumber': 'Carpenter',
    'Doman Iron Lance': 'Carpenter',
    'Hingan Bed': 'Carpenter',
    'Larch Bracelets': 'Carpenter',
    'Miracle Apple Lumber': 'Carpenter',
    'White Ash Lumber': 'Carpenter',
    'Sandteak Lumber': 'Carpenter',
    'Bluespirit Cane': 'Carpenter',
    'Riviera House Roof (Stone)': 'Carpenter',
    'Cedar Fishing Rod': 'Carpenter',
    'Alpine Chair': 'Carpenter',
    'Hallowed Chestnut Composite Bow': 'Carpenter',
    'Hallowed Chestnut Fishing Rod': 'Carpenter',
    'Applewood Longbow': 'Carpenter',
    'Applewood Spear': 'Carpenter',
    'Applewood Cane': 'Carpenter',
    'Bluespirit Spear': 'Carpenter',
    'White Oak Fishing Rod': 'Carpenter',
    'White Oak Grinding Wheel': 'Carpenter',
    'White Oak Spinning Wheel': 'Carpenter',
    'Sandteak Cane': 'Carpenter',
    'Sandteak Longbow': 'Carpenter',
    'Ceiba Lumber': 'Carpenter',
    'Ceiba Crook': 'Carpenter',
    'Acacia Lumber': 'Carpenter',
    'Acacia Bracelet': 'Carpenter',
    'Decorative Hingan Door': 'Carpenter',
    'Dark Mahogany Lumber': 'Carpenter',
    'Dark Mahogany Cane': 'Carpenter',
    'Integral Lumber': 'Carpenter',
    
    // Blacksmith items
    'Titanium Ingot': 'Blacksmith',
    'Darksteel Ingot': 'Blacksmith',
    'High Mythrite Ingot': 'Blacksmith',
    
    // Alchemist items  
    'Grade 8 Dark Matter': 'Alchemist',
    
    // Weaver items
    'Twinsilk': 'Weaver'
};

console.log('Fixing missing job properties...');

let fixedCount = 0;

// For each recipe that needs a job property
for (const [itemName, jobName] of Object.entries(jobMappings)) {
    // Find the pattern: name: 'ItemName', level: X, materials: [
    // and replace with: name: 'ItemName', level: X, job: 'JobName', materials: [
    
    const namePattern = new RegExp(`name: '${itemName.replace(/[.*+?^${}()|[\\]\\\\]/g, '\\\\$&')}',\\s*\\n\\s*level: (\\d+|undefined),\\s*\\n\\s*materials: \\[`, 'g');
    
    const replacement = `name: '${itemName}',\n                level: $1,\n                job: '${jobName}',\n                materials: [`;
    
    if (html.match(namePattern)) {
        html = html.replace(namePattern, replacement);
        fixedCount++;
        console.log(`✅ Fixed: ${itemName} -> ${jobName}`);
    } else {
        console.log(`❌ Not found: ${itemName}`);
    }
}

// Also handle cases where level is undefined
for (const [itemName, jobName] of Object.entries(jobMappings)) {
    const namePattern = new RegExp(`name: '${itemName.replace(/[.*+?^${}()|[\\]\\\\]/g, '\\\\$&')}',\\s*\\n\\s*materials: \\[`, 'g');
    
    const replacement = `name: '${itemName}',\n                job: '${jobName}',\n                materials: [`;
    
    if (html.match(namePattern)) {
        html = html.replace(namePattern, replacement);
        fixedCount++;
        console.log(`✅ Fixed (no level): ${itemName} -> ${jobName}`);
    }
}

console.log(`\\nFixed ${fixedCount} job properties`);

// Write the updated file
fs.writeFileSync('/mnt/c/Users/Nlell/OneDrive/Desktop/FC_website/pages/crafting-gathering.html', html);

console.log('✅ File updated successfully!');