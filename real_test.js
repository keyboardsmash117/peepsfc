// REAL TEST - Check actual functionality without browser
const http = require('http');

console.log('🔍 REAL FUNCTIONALITY TEST');
console.log('===========================');

// Test 1: Can we load the page?
http.get('http://localhost:8080/pages/crafting-gathering.html', (res) => {
    let html = '';
    res.on('data', (chunk) => html += chunk);
    res.on('end', () => {
        console.log(`✅ Page loads (Status: ${res.statusCode})`);
        
        // Test 2: Check JavaScript syntax
        const scriptMatch = html.match(/<script>([\s\S]*?)<\/script>/);
        if (scriptMatch) {
            try {
                new Function(scriptMatch[1]);
                console.log('✅ JavaScript syntax is valid');
            } catch (e) {
                console.log('❌ JavaScript syntax error:', e.message);
                return;
            }
        }
        
        // Test 3: Check if required elements exist
        const requiredElements = [
            'id="recipe-search"',
            'id="leve-level"', 
            'id="calculate-btn"',
            'id="leve-search-btn"'
        ];
        
        const missingElements = requiredElements.filter(elem => !html.includes(elem));
        if (missingElements.length === 0) {
            console.log('✅ All required HTML elements present');
        } else {
            console.log('❌ Missing elements:', missingElements);
        }
        
        // Test 4: Check level range options
        const levelRanges = ['1-5', '10-15', '20-25', '30-35', '40-45'];
        const missingRanges = levelRanges.filter(range => !html.includes(`value="${range}"`));
        if (missingRanges.length === 0) {
            console.log('✅ Proper level ranges in HTML');
        } else {
            console.log('❌ Missing level ranges:', missingRanges);
        }
        
        // Test 5: Check zone data exists
        if (html.includes('zone') && html.includes('Gridania') && html.includes('Tierney')) {
            console.log('✅ Zone and NPC data present in HTML');
        } else {
            console.log('❌ Zone/NPC data missing');
        }
        
        // Test 6: Check recipes object
        if (html.includes('const recipes = {') && html.includes('job:')) {
            console.log('✅ Recipe data with job properties exists');
        } else {
            console.log('❌ Recipe data missing or malformed');
        }
        
        // Test 7: Check API proxy fallback
        if (html.includes('corsproxy.io') && html.includes('proxyUrls')) {
            console.log('✅ API proxy fallback system present');
        } else {
            console.log('❌ API proxy system missing');
        }
        
        // Test 8: Actually execute the JavaScript in a sandbox
        console.log('\n🧪 Testing JavaScript execution...');
        
        // Mock DOM for testing
        const mockGlobal = {
            document: {
                getElementById: (id) => ({
                    addEventListener: () => console.log(`✅ Event listener attached to ${id}`),
                    value: '',
                    style: { display: 'block' },
                    innerHTML: ''
                }),
                addEventListener: () => console.log('✅ Document event listener attached'),
                querySelectorAll: () => []
            },
            alert: (msg) => console.log(`Alert: ${msg}`),
            console: console,
            fetch: async () => ({ json: async () => ({}) })
        };
        
        try {
            // Execute in controlled environment
            const vm = require('vm');
            const sandbox = { ...mockGlobal };
            vm.createContext(sandbox);
            
            const jsCode = scriptMatch[1];
            vm.runInContext(jsCode, sandbox, { timeout: 5000 });
            console.log('✅ JavaScript executes without errors');
            
        } catch (e) {
            console.log('❌ JavaScript execution failed:', e.message);
        }
        
        console.log('\n🎯 HONEST ASSESSMENT:');
        console.log('The page structure exists and JavaScript compiles, but');
        console.log('I cannot guarantee it works in an actual browser without');
        console.log('proper browser testing with user interactions.');
    });
}).on('error', (e) => {
    console.log('❌ Failed to load page:', e.message);
});