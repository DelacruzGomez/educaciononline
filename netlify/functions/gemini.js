const https = require('https');

export async function handler(event) {
  if (event.httpMethod !== "POST") {
    return { statusCode: 405, body: "Método no permitido" };
  }

  try {
    const payload = event.body; // Ya viene como string JSON
    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey) {
      throw new Error("Falta la variable de entorno GEMINI_API_KEY en Netlify");
    }

    const url = `https://googleapis.com{apiKey}`;

    // Hacemos la petición usando el módulo nativo HTTPS para evitar depender de fetch en Node
    return new Promise((resolve, reject) => {
      const req = https.request(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Content-Length': Buffer.byteLength(payload)
        }
      }, (res) => {
        let data = '';
        res.on('data', (chunk) => data += chunk);
        res.on('end', () => {
          resolve({
            statusCode: res.statusCode,
            headers: { "Content-Type": "application/json" },
            body: data
          });
        });
      });

      req.on('error', (e) => {
        reject({
          statusCode: 500,
          body: JSON.stringify({ error: e.message })
        });
      });

      req.write(payload);
      req.end();
    });

  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message })
    };
  }
}
