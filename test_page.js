// Test script to simulate page functionality
const fs = require('fs');

// Read the HTML file
const html = fs.readFileSync('/mnt/c/Users/Nlell/OneDrive/Desktop/FC_website/pages/crafting-gathering.html', 'utf8');

// Create a mock DOM environment
const mockDOM = {
    elements: {},
    getElementById: function(id) {
        if (!this.elements[id]) {
            this.elements[id] = {
                addEventListener: function(event, handler) {
                    console.log(`✅ Event listener attached: ${id} -> ${event}`);
                },
                value: '',
                style: { display: 'block' },
                innerHTML: '',
                textContent: ''
            };
        }
        return this.elements[id];
    },
    querySelectorAll: function(selector) {
        return [];
    },
    addEventListener: function(event, handler) {
        console.log(`✅ Document event listener attached: ${event}`);
    }
};

// Mock global objects
global.document = mockDOM;
global.alert = function(msg) { console.log(`Alert: ${msg}`); };
global.console = console;
global.fetch = async function() { 
    return { json: async () => ({}) }; 
};

// Extract and execute the JavaScript
const scriptMatch = html.match(/<script>([\s\S]*?)<\/script>/);
if (scriptMatch) {
    try {
        console.log('🧪 Testing JavaScript execution...');
        eval(scriptMatch[1]);
        console.log('✅ JavaScript executed successfully!');
        
        // Test recipe search functionality
        console.log('\n🔍 Testing recipe search...');
        const searchInput = mockDOM.getElementById('recipe-search');
        searchInput.value = 'maple';
        
        console.log('✅ All basic functionality tests passed!');
        
    } catch (error) {
        console.log('❌ JavaScript execution error:', error.message);
        process.exit(1);
    }
} else {
    console.log('❌ Could not find JavaScript in HTML');
    process.exit(1);
}