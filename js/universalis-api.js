// Universalis API Integration for Peeps FC Website
// Provides market board data functionality

class UniversalisAPI {
    constructor() {
        this.baseUrl = 'https://universalis.app/api/v2';
        this.proxyUrl = '/.netlify/functions/universalis-proxy'; // Netlify function proxy
        this.defaultWorld = 'Phoenix'; // Set your default world/server
        this.cache = new Map();
        this.cacheTimeout = 5 * 60 * 1000; // 5 minutes
        this.useProxy = true; // Use proxy by default
    }

    // Enable/disable proxy usage
    setProxyMode(enabled) {
        this.useProxy = enabled;
    }

    // Set the world/server for API calls
    setWorld(world) {
        this.defaultWorld = world;
    }

    // Get current market board data for a single item
    async getCurrentData(itemId, world = null) {
        const targetWorld = world || this.defaultWorld;
        const cacheKey = `${targetWorld}_${itemId}_current`;
        
        // Check cache first
        if (this.cache.has(cacheKey)) {
            const cached = this.cache.get(cacheKey);
            if (Date.now() - cached.timestamp < this.cacheTimeout) {
                return cached.data;
            }
        }

        try {
            let url, response;
            
            if (this.useProxy) {
                // Use Netlify function proxy
                url = `${this.proxyUrl}?world=${encodeURIComponent(targetWorld)}&itemId=${encodeURIComponent(itemId)}&type=current`;
                response = await fetch(url);
            } else {
                // Direct API call (may fail due to CORS)
                url = `${this.baseUrl}/${targetWorld}/${itemId}`;
                response = await fetch(url);
            }
            
            if (!response.ok) {
                const errorData = await response.json().catch(() => ({}));
                throw new Error(`API error (${response.status}): ${errorData.error || response.statusText}`);
            }
            
            const data = await response.json();
            
            // Cache the result
            this.cache.set(cacheKey, {
                data: data,
                timestamp: Date.now()
            });
            
            return data;
        } catch (error) {
            console.error('Error fetching market data:', error);
            
            // If proxy fails, try direct API as fallback
            if (this.useProxy && !error.message.includes('API error')) {
                console.log('Proxy failed, trying direct API call...');
                this.setProxyMode(false);
                try {
                    return await this.getCurrentData(itemId, world);
                } finally {
                    this.setProxyMode(true);
                }
            }
            
            throw error;
        }
    }

    // Get market data for multiple items
    async getMultipleItems(itemIds, world = null) {
        const targetWorld = world || this.defaultWorld;
        const itemIdString = Array.isArray(itemIds) ? itemIds.join(',') : itemIds;
        const cacheKey = `${targetWorld}_${itemIdString}_multi`;
        
        // Check cache first
        if (this.cache.has(cacheKey)) {
            const cached = this.cache.get(cacheKey);
            if (Date.now() - cached.timestamp < this.cacheTimeout) {
                return cached.data;
            }
        }

        try {
            let url, response;
            
            if (this.useProxy) {
                // Use Netlify function proxy
                url = `${this.proxyUrl}?world=${encodeURIComponent(targetWorld)}&itemId=${encodeURIComponent(itemIdString)}&type=current`;
                response = await fetch(url);
            } else {
                // Direct API call (may fail due to CORS)
                url = `${this.baseUrl}/${targetWorld}/${itemIdString}`;
                response = await fetch(url);
            }
            
            if (!response.ok) {
                const errorData = await response.json().catch(() => ({}));
                throw new Error(`API error (${response.status}): ${errorData.error || response.statusText}`);
            }
            
            const data = await response.json();
            
            // Cache the result
            this.cache.set(cacheKey, {
                data: data,
                timestamp: Date.now()
            });
            
            return data;
        } catch (error) {
            console.error('Error fetching multiple items market data:', error);
            throw error;
        }
    }

    // Get historical market data
    async getHistoryData(itemId, world = null) {
        const targetWorld = world || this.defaultWorld;
        
        try {
            let url, response;
            
            if (this.useProxy) {
                // Use Netlify function proxy
                url = `${this.proxyUrl}?world=${encodeURIComponent(targetWorld)}&itemId=${encodeURIComponent(itemId)}&type=history`;
                response = await fetch(url);
            } else {
                // Direct API call (may fail due to CORS)
                url = `${this.baseUrl}/history/${targetWorld}/${itemId}`;
                response = await fetch(url);
            }
            
            if (!response.ok) {
                const errorData = await response.json().catch(() => ({}));
                throw new Error(`API error (${response.status}): ${errorData.error || response.statusText}`);
            }
            
            return await response.json();
        } catch (error) {
            console.error('Error fetching history data:', error);
            throw error;
        }
    }

    // Format price with gil symbol
    formatPrice(price) {
        if (price === null || price === undefined) return 'N/A';
        return new Intl.NumberFormat('en-US').format(price) + ' gil';
    }

    // Get the lowest price from listings
    getLowestPrice(marketData) {
        if (!marketData.listings || marketData.listings.length === 0) {
            return null;
        }
        return Math.min(...marketData.listings.map(listing => listing.pricePerUnit));
    }

    // Get the average price from recent sales
    getAveragePrice(marketData, days = 7) {
        if (!marketData.recentHistory || marketData.recentHistory.length === 0) {
            return null;
        }

        const cutoffTime = Date.now() - (days * 24 * 60 * 60 * 1000);
        const recentSales = marketData.recentHistory.filter(sale => 
            sale.timestamp * 1000 > cutoffTime
        );

        if (recentSales.length === 0) return null;

        const total = recentSales.reduce((sum, sale) => sum + sale.pricePerUnit, 0);
        return Math.round(total / recentSales.length);
    }

    // Create market board display HTML
    createMarketDisplay(itemName, marketData, options = {}) {
        const {
            showHistory = true,
            showListings = true,
            maxListings = 5,
            containerClass = 'market-display'
        } = options;

        const lowestPrice = this.getLowestPrice(marketData);
        const averagePrice = this.getAveragePrice(marketData);

        let html = `
            <div class="${containerClass}" data-item="${itemName}">
                <div class="market-header">
                    <h3 class="item-name">${itemName}</h3>
                    <div class="last-updated">Updated: ${new Date(marketData.lastUploadTime).toLocaleString()}</div>
                </div>
                
                <div class="price-summary">
                    <div class="price-stat">
                        <span class="label">Lowest Price:</span>
                        <span class="value">${lowestPrice ? this.formatPrice(lowestPrice) : 'N/A'}</span>
                    </div>
                    <div class="price-stat">
                        <span class="label">Average (7d):</span>
                        <span class="value">${averagePrice ? this.formatPrice(averagePrice) : 'N/A'}</span>
                    </div>
                </div>
        `;

        if (showListings && marketData.listings && marketData.listings.length > 0) {
            html += `
                <div class="current-listings">
                    <h4>Current Listings</h4>
                    <div class="listings-table">
                        <div class="table-header">
                            <span>Price</span>
                            <span>Quantity</span>
                            <span>World</span>
                            <span>Retainer</span>
                        </div>
            `;

            marketData.listings
                .slice(0, maxListings)
                .forEach(listing => {
                    html += `
                        <div class="listing-row">
                            <span class="price">${this.formatPrice(listing.pricePerUnit)}</span>
                            <span class="quantity">${listing.quantity}</span>
                            <span class="world">${listing.worldName || 'Unknown'}</span>
                            <span class="retainer">${listing.retainerName}</span>
                        </div>
                    `;
                });

            html += `
                    </div>
                </div>
            `;
        }

        html += `</div>`;
        return html;
    }

    // Clear cache
    clearCache() {
        this.cache.clear();
    }

    // Get cache info for debugging
    getCacheInfo() {
        return {
            size: this.cache.size,
            keys: Array.from(this.cache.keys())
        };
    }
}

// Create global instance
window.UniversalisAPI = new UniversalisAPI();

// Popular FFXIV items with their IDs for easy reference
window.FFXIVItems = {
    // Crafting Materials - Popular items for crafting
    'Dark Matter Cluster': 5594,
    'Thavnairian Onion': 8166,
    'Grade 8 Dark Matter': 33916,
    'Darksteel Ore': 5132,
    'Titanium Ore': 12537,
    'Rarefied Raw Onyx': 36057,
    'Integral Lumber': 27713,
    'Lignum Vitae Log': 27781,
    'Grade 7 Dark Matter': 17837,
    'Grade 6 Dark Matter': 10386,
    'Blacksmith\'s Coal': 5333,
    'Ferberite': 12900,
    'Raw Petalite': 19937,
    'Rarefied Lignum Vitae Log': 36054,
    
    // Popular Consumables
    'Smoked Chicken': 4698,
    'Grade 6 Tincture of Strength': 27838,
    'Super-Ether': 23167,
    'Hi-Ether': 1042,
    'Cordial': 6141,
    'Hi-Cordial': 12669,
    
    // Food Items
    'Twilight Popoto Salad': 27864,
    'Carrot Pudding': 4692,
    'Buttons in a Blanket': 27860,
    
    // Housing Items
    'Riviera Armchair': 13202,
    'White Mage Weapon Rack': 28976,
    'Glade Bookshelf': 6371,
    
    // Crystals and Clusters
    'Fire Cluster': 2589,
    'Water Cluster': 2590,
    'Earth Cluster': 2591,
    'Lightning Cluster': 2592,
    'Ice Cluster': 2593,
    'Wind Cluster': 2594,
    'Fire Crystal': 2,
    'Water Crystal': 3,
    'Earth Crystal': 4,
    'Lightning Crystal': 5,
    'Ice Crystal': 6,
    'Wind Crystal': 7,
    
    // Popular Gear (examples)
    'Exarchic Coat of Fending': 30115,
    'Exarchic Coat of Maiming': 30116,
    'Chondrite Ingot': 31754,
    'Rarefied Chondrite': 36063,
    
    // Add more items as needed
};

// Utility function to search for item IDs by name
window.findItemId = function(itemName) {
    const lowerName = itemName.toLowerCase();
    for (const [name, id] of Object.entries(window.FFXIVItems)) {
        if (name.toLowerCase().includes(lowerName)) {
            return { name, id };
        }
    }
    return null;
};

console.log('Universalis API integration loaded successfully! 🌟');
console.log('Use window.UniversalisAPI to access market data functionality.');