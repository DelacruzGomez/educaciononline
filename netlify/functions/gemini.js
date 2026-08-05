const https = require('https');

exports.handler = async function(event, context) {
  // Validar método de red
  if (event.httpMethod !== "POST") {
    return { 
      statusCode: 405, 
      body: "Método no permitido" 
    };
  }

  try {
    const payload = event.body;
    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey) {
      return {
        statusCode: 500,
        body: JSON.stringify({ error: "Falta la variable GEMINI_API_KEY en Netlify" })
      };
    }

    const url = `https://googleapis.com{apiKey}`;

    // Ejecutar llamada mediante módulo nativo HTTPS
    return new Promise((resolve) => {
      const options = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Content-Length': Buffer.byteLength(payload)
        }
      };

      const req = https.request(url, options, (res) => {
        let body = '';
        res.on('data', (chunk) => { body += chunk; });
        res.on('end', () => {
          resolve({
            statusCode: res.statusCode,
            headers: { 
              "Content-Type": "application/json",
              "Access-Control-Allow-Origin": "*" 
            },
            body: body
          });
        });
      });

      req.on('error', (error) => {
        resolve({
          statusCode: 500,
          body: JSON.stringify({ error: error.message })
        });
      });

      req.write(payload);
      req.end();
    });

  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: err.message })
    };
  }
};
