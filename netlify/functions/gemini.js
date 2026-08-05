export async function handler(event, context) {
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

    // Ejecutar llamada utilizando la API global nativa de Node.js estable
    const res = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: payload
    });

    const bodyText = await res.text();

    return {
      statusCode: res.status,
      headers: { 
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*" 
      },
      body: bodyText
    };

  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: err.message })
    };
  }
}
