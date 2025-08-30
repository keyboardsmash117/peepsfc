// ACTUAL TEST - not just assumptions
const puppeteer = require('puppeteer');

(async () => {
    console.log('🔍 ACTUAL FUNCTIONALITY TEST');
    console.log('============================');
    
    let browser;
    try {
        // Launch browser
        browser = await puppeteer.launch({ headless: true });
        const page = await browser.newPage();
        
        // Navigate to page
        await page.goto('http://localhost:8080/pages/crafting-gathering.html', { 
            waitUntil: 'networkidle0',
            timeout: 10000 
        });
        
        console.log('✅ Page loaded successfully');
        
        // Test 1: Check if recipe search input exists and works
        const recipeSearchExists = await page.$('#recipe-search');
        if (recipeSearchExists) {
            console.log('✅ Recipe search input exists');
            
            // Type in search box
            await page.type('#recipe-search', 'maple');
            await page.waitForTimeout(1000);
            
            // Check if suggestions appear
            const suggestions = await page.$('#recipe-suggestions');
            const suggestionsVisible = suggestions ? await page.evaluate(el => {
                return window.getComputedStyle(el).display !== 'none';
            }, suggestions) : false;
            
            if (suggestionsVisible) {
                console.log('✅ Recipe search suggestions working');
            } else {
                console.log('❌ Recipe search suggestions NOT working');
            }
        } else {
            console.log('❌ Recipe search input missing');
        }
        
        // Test 2: Check leve quest level options
        const leveSelect = await page.$('#leve-level');
        if (leveSelect) {
            console.log('✅ Leve level select exists');
            
            const options = await page.evaluate(() => {
                const select = document.getElementById('leve-level');
                return Array.from(select.options).map(option => option.value).filter(v => v);
            });
            
            console.log('📋 Leve level options:', options);
            
            if (options.includes('1-5') && options.includes('10-15') && options.includes('20-25')) {
                console.log('✅ Proper level ranges present');
            } else {
                console.log('❌ Level ranges incorrect:', options);
            }
        } else {
            console.log('❌ Leve level select missing');
        }
        
        // Test 3: Check if JavaScript has errors
        const jsErrors = [];
        page.on('console', msg => {
            if (msg.type() === 'error') {
                jsErrors.push(msg.text());
            }
        });
        
        page.on('pageerror', error => {
            jsErrors.push(error.message);
        });
        
        // Wait a bit for any errors to surface
        await page.waitForTimeout(2000);
        
        if (jsErrors.length === 0) {
            console.log('✅ No JavaScript errors detected');
        } else {
            console.log('❌ JavaScript errors found:');
            jsErrors.forEach(error => console.log('  -', error));
        }
        
        // Test 4: Try to trigger leve quest search
        const leveClassSelect = await page.$('#leve-class');
        const leveSearchBtn = await page.$('#leve-search-btn');
        
        if (leveClassSelect && leveSearchBtn) {
            console.log('✅ Leve quest elements exist');
            
            try {
                await page.select('#leve-class', 'crp');
                await page.select('#leve-level', '1-5');
                await page.click('#leve-search-btn');
                
                await page.waitForTimeout(1000);
                
                const results = await page.$('#leve-results');
                if (results) {
                    const resultsVisible = await page.evaluate(el => {
                        return window.getComputedStyle(el).display !== 'none';
                    }, results);
                    
                    if (resultsVisible) {
                        console.log('✅ Leve quest search working');
                        
                        // Check if zone data is shown
                        const tableContent = await page.evaluate(() => {
                            const table = document.querySelector('#leve-results table');
                            return table ? table.innerHTML : '';
                        });
                        
                        if (tableContent.includes('Zone') && tableContent.includes('NPC')) {
                            console.log('✅ Zone and NPC columns present');
                        } else {
                            console.log('❌ Zone/NPC columns missing');
                        }
                        
                        if (tableContent.includes('Gridania') || tableContent.includes('Tierney')) {
                            console.log('✅ Zone/NPC data populated');
                        } else {
                            console.log('❌ Zone/NPC data missing');
                        }
                    } else {
                        console.log('❌ Leve quest results not visible');
                    }
                } else {
                    console.log('❌ Leve quest results element missing');
                }
            } catch (e) {
                console.log('❌ Leve quest search failed:', e.message);
            }
        } else {
            console.log('❌ Leve quest elements missing');
        }
        
        console.log('\n🎯 FINAL VERDICT:');
        if (jsErrors.length === 0) {
            console.log('✅ Page loads without JavaScript errors');
        } else {
            console.log('❌ Page has JavaScript errors - NOT working properly');
        }
        
    } catch (error) {
        console.log('❌ Test failed:', error.message);
    } finally {
        if (browser) {
            await browser.close();
        }
    }
})();