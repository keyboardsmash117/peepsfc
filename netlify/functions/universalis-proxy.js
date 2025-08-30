exports.handler = async (event, context) => {
  // Handle CORS preflight
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Allow-Methods': 'GET, POST, OPTIONS'
      },
      body: ''
    };
  }

  // Only allow GET requests
  if (event.httpMethod !== 'GET') {
    return {
      statusCode: 405,
      headers: {
        'Access-Control-Allow-Origin': '*'
      },
      body: JSON.stringify({ error: 'Method not allowed' })
    };
  }

  try {
    const { world, itemId, type = 'current' } = event.queryStringParameters || {};
    
    if (!world || !itemId) {
      return {
        statusCode: 400,
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ 
          error: 'Missing required parameters: world and itemId' 
        })
      };
    }

    // Build Universalis API URL
    const baseUrl = 'https://universalis.app/api/v2';
    let apiUrl;
    
    if (type === 'history') {
      apiUrl = `${baseUrl}/history/${world}/${itemId}`;
    } else {
      apiUrl = `${baseUrl}/${world}/${itemId}`;
    }

    console.log(`Fetching: ${apiUrl}`);

    // Fetch data from Universalis API
    const response = await fetch(apiUrl, {
      headers: {
        'User-Agent': 'Peeps-FC-Website/1.0 (https://peepsfcffxiv.netlify.app)'
      }
    });

    if (!response.ok) {
      throw new Error(`Universalis API error: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();

    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json',
        'Cache-Control': 'public, max-age=300' // Cache for 5 minutes
      },
      body: JSON.stringify(data)
    };

  } catch (error) {
    console.error('Universalis proxy error:', error);
    
    return {
      statusCode: 500,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ 
        error: 'Failed to fetch market data',
        details: error.message 
      })
    };
  }
};