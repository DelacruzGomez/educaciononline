import axios from 'axios';

const SUPABASE_URL = process.env.SUPABASE_URL || "https://iuygoavokzrqirwapqve.supabase.co";
const SUPABASE_ANON_KEY = process.env.SUPABASE_ANON_KEY || "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Iml1eWdvYXZva3pycWlyd2FwcXZlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODczMjMwMDcsImV4cCI6MjEwMjg5OTAwN30.ivf-iSXwp84YO9Qp7JTzKoB95wrzLJRHYFfzKmzftys";

export const handler = async function (event, context) {
    if (event.httpMethod !== "POST") {
        return { statusCode: 405, body: "Method Not Allowed" };
    }

    try {
        const body = JSON.parse(event.body || "{}");
        const clientMessages = body.contents || [];

        // 📡 1. LEER EL CATÁLOGO DESDE SUPABASE
        let productosDesdeBD = [];
        try {
            const supabaseResponse = await axios.get(`${SUPABASE_URL}/rest/v1/cursos?select=*`, {
                headers: {
                    'apikey': SUPABASE_ANON_KEY,
                    'Authorization': `Bearer ${SUPABASE_ANON_KEY}`
                },
                timeout: 3000
            });
            productosDesdeBD = supabaseResponse.data || [];
        } catch (supabaseError) {
            productosDesdeBD = [];
        }

        // 🔄 2. CONSTRUCCIÓN DEL CATÁLOGO EN TIEMPO REAL CON RESPALDO CENTRALIZADO
        let tablaPreciosTexto = "";
        let listaCursosTexto = "";

        if (productosDesdeBD && productosDesdeBD.length > 0) {
            productosDesdeBD.forEach(curso => {
                let opcionesYCuotas = "";
                if (Array.isArray(curso.preciosAlternativos)) {
                    opcionesYCuotas = curso.preciosAlternativos.map(p => `   - ${p.label}`).join("\n");
                }

                tablaPreciosTexto += `- ${curso.title}:\n`;
                tablaPreciosTexto += `  * Enlace Principal de Venta: ${curso.url}\n`;
                if (curso.urlDescuento) tablaPreciosTexto += `  * Enlace con Descuento Especial: ${curso.urlDescuento}\n`;
                if (curso.urlMensual) tablaPreciosTexto += `  * Opción Plan Mensual: ${curso.urlMensual}\n`;
                if (opcionesYCuotas) tablaPreciosTexto += `  * Opciones Adicionales / Tarifas:\n${opcionesYCuotas}\n`;
                tablaPreciosTexto += `\n`;

                listaCursosTexto += `- ${curso.title}: Enlace Oficial: ${curso.url}\n`;
            });
        } else {
            // 🛡️ RESPALDO ESTRICTO: Si Supabase se desconecta, el Chatbot usará esta base de datos interna intacta
            tablaPreciosTexto = `
*Desarrollo y Tecnología:*
- **Aprende Cómo Crear Apps de Éxito**: https://go.hotmart.com/N106692793T
- **Apps Rentables (No-Code)**: 
  * Link Principal / Pago Único: https://go.hotmart.com/R106772005H
  * Plan Mensual ($67): https://go.hotmart.com/R106772005H?ap=3997
  * MasterClass Secreta (Los Secretos Appers): https://go.hotmart.com/R106772005H?ap=9c1a
  * ¿QUÉ OFRECE APPS RENTABLES? Mas Info: https://go.hotmart.com/R106772005H?ap=d4d9
  * Pasos para Entender el Negocio: https://go.hotmart.com/R106772005H?ap=ebcb
  * Checkout Directo Pago Único ($297): https://go.hotmart.com/R106772005H?ap=f701
  * Serie Secreta Video #1 (Oferta 6 Días): https://go.hotmart.com/R106772005H?ap=8b6a
  * Serie Secreta Video #2 (Oferta 6 Días): https://go.hotmart.com/R106772005H?ap=1195
  * Serie Secreta Video #3 (Oferta 6 Días): https://go.hotmart.com/R106772005H?ap=8e23
- **Programación Básica + Avanzada**: https://go.hotmart.com/N106772659G
- **Curso de Programación Inicial (Complemento)**: https://go.hotmart.com/P106856562N
- **Programación Web ISE**: 
  * Enlace de Ventas General: https://go.hotmart.com/P106773049T
  * Página Oficial en Hotmart: https://go.hotmart.com/P106773049T?dp=1
  * Página Externa del Programa: https://go.hotmart.com/P106773049T?ap=10b8
  * Checkout Inscripción Rápida: https://go.hotmart.com/P106773049T?ap=4c83
  * Checkout Pago de Contado Total: https://go.hotmart.com/P106773049T?ap=7c17
- **Programación Web y Multiplataforma**: https://go.hotmart.com/Y106855907W
- **Hacking Ético desde Cero**: https://go.hotmart.com/F106792904G
- **Negocios Digitales con IA (Máster)**: https://go.hotmart.com/M106859320X
- **eBook Negocio Digital desde Cero**: https://go.hotmart.com/E106805690P
- **eBook Negocios Digitales (Marketing y Finanzas)**: https://go.hotmart.com/F106858942V

*Oficios:*
- **Reparación de Celulares**: https://go.hotmart.com/O106772582N
- **Diseña y Crea con Resina (PRO)**: 
  * Venta General: https://go.hotmart.com/C106809529R
  * Lanzamiento Oficial ($37): https://go.hotmart.com/C106809529R?ap=1d28
  * Clase Gratuita Día #1: https://go.hotmart.com/C106809529R?ap=3a88
  * Clase Gratuita Día #2: https://go.hotmart.com/C106809529R?ap=8101
  * Tarifa Especial EE.UU. ($37): https://go.hotmart.com/C106809529R?ap=18eb
  * Oferta Flash Limitada ($30): https://go.hotmart.com/C106809529R?ap=8b35
  * Descuento Intermedio ($47): https://go.hotmart.com/C106809529R?ap=b12e
  * Cupón Especial ($55): https://go.hotmart.com/C106809529R?ap=8124
  * Acceso Premium Full (S/ 264): https://go.hotmart.com/C106809529R?ap=93c6
- **Diseña y Crea con Resina (Curso Básico)**: 
  * Venta General Básico: https://go.hotmart.com/S106801999T
  * Opción Principal ($25): https://go.hotmart.com/S106801999T?ap=b65b
  * Oferta Mínima Curso Básico ($20): https://go.hotmart.com/S106801999T?ap=0e44
- **Jabones y Velas Artesanales 2x1**: https://go.hotmart.com/O106861041A
- **Master Barber Pro**: https://go.hotmart.com/G106801786P
- **Toca Piano Fácil desde Cero**: https://go.hotmart.com/A106864024O?dp=1
- **Especialidades Estéticas (Cosmetología + Manicura)**: 
  * Enlace Cosmetología Profesional: https://go.hotmart.com/U106873037M
  * Enlace Manicurista Profesional: https://go.hotmart.com/Q106873316P
  - **Curso de Repostería Vegana Online**:
  * Argumento de Venta: Programa con calificación perfecta de 5.0 estrellas que enseña pastelería saludable de alta calidad. Cuenta con tres niveles de precio ajustables según el cliente: Tarifa Máxima ($45 USD), Acceso Estándar ($35 USD) y Cupón de Entrada ($25 USD).
  * Link Principal ($35 USD): https://go.hotmart.com/C107298005Q?ap=708d
  * Link con Descuento ($25 USD): https://go.hotmart.com/C107298005Q?ap=84aa
  * Enlace Premium Completo ($45 USD): https://go.hotmart.com/C107298005Q?ap=e5fd
  * REGLA DE ENVÍO: Ofrece inicialmente el acceso estándar de $35 USD destacando las lecciones en alta definición. Si el usuario manifiesta que busca la alternativa más económica, entrégale de inmediato el link de descuento de $25 USD (ap=84aa) para asegurar la venta instantánea.


*Salud y Bienestar:*
- **Sistema Yoga Restaurativo**: https://go.hotmart.com/G106772402F
- **Guía Estilo de Vida Saludable**: https://hotmart.com
- **Programa Amor Propio y Autoestima**: https://go.hotmart.com/W106802341H`;

            listaCursosTexto = "Cargando enlaces desde el sistema interno...";
        }

        // 📝 3. SYSTEM PROMPT REESTRUCTURADO PARA CIERRES RÁPIDOS (CORREGIDO)
const systemPrompt = `Eres el vendedor estrella de Portal EducaDG. Tu único objetivo es captar al cliente y enviarle el link de afiliado para que compre sin rodeos.

[CATÁLOGO DE ENLACES OFICIALES]
${tablaPreciosTexto}

[REGLAS CRÍTICAS DE SELECCIÓN DE LINKS]
- Si piden promociones de Resina (PRO), envíales el link alternativo de Oferta Flash Limitada (terminación ap=8b35).
- Si el curso viene desde la base de datos dinámica y tiene múltiples enlaces (Descuento, Mensual o Extra), dale prioridad al enlace de Descuento o Mensual según lo que busque el usuario.
- Entrega siempre el link de forma directa y visible dentro del texto para que el usuario pueda hacer clic sin problemas.

[POLÍTICA DE PRECIO SEGURO]
- Precios base de referencia en Dólares (USD). Si mencionan Perú, usa preferentemente Soles (PEN) según lo indicado en el catálogo. 
- Añade siempre esta frase al dar un link de pago: "Hotmart adaptará el precio exacto a tu moneda local de forma automática al abrir el enlace."

[FILTRO DE SEGURIDAD PARA CURSOS NO CATALOGADOS]
Si piden un curso, oficio o temática que NO esté listada en el catálogo de arriba, TIENES PROHIBIDO inventar precios o enlaces. Responde exactamente: "¡Hola! Sí, contamos con acceso preferencial a ese programa. Permíteme gestionarlo en el sistema central para darte el enlace correcto con tu cupón de descuento activo. En unos minutos te lo envío por aquí para que no pierdas el beneficio. ¡Quédate atento! 🚀"

[REGLA DE ORO DE ESTILO (PROHIBIDA LA VERBOSIDAD)]
- TIENES PROHIBIDO escribir introducciones largas, análisis técnicos o textos de razonamiento interno ("Thinking Process").
- Tus respuestas deben tener un máximo de 2 a 3 líneas o oraciones cortas.
- Ve directo al grano: Saludo corto + Beneficio matador + Enlace de compra completo + Frase de moneda. Nada más.`;

        // 🤖 4. MAPEO DEL HISTORIAL
        const groqMessages = [
            { role: "system", content: systemPrompt }
        ];

        clientMessages.forEach(msg => {
            if (!msg) return;
            let textValue = "";
            if (msg.parts && Array.isArray(msg.parts)) {
                textValue = msg.parts[0]?.text || "";
            } else if (msg.parts && msg.parts.text) {
                textValue = msg.parts.text;
            } else if (typeof msg.text === "string") {
                textValue = msg.text;
            }

            if (!textValue.trim()) return;
            groqMessages.push({
                role: msg.role === 'user' ? 'user' : 'assistant',
                content: textValue
            });
        });

        // 🚀 5. CONSULTA A LA API DE GROQ
        const groqResponse = await axios.post('https://api.groq.com/openai/v1/chat/completions', 
            {
                model: 'qwen/qwen3.6-27b',
                messages: groqMessages,
                temperature: 0.2, // Bajado a 0.2 para evitar respuestas creativas o largas
                reasoning_effort: "none"   // 🔥 REGLA DE ORO: Desactiva por completo el "Thinking Process" de raíz
            },
            {
                headers: {
                    'Authorization': 'Bearer ' + process.env.GROQ_API_KEY,
                    'Content-Type': 'application/json'
                }
            }
        );

        const aiText = groqResponse.data?.choices?.[0]?.message?.content || "Disculpa, no obtuve respuesta.";

        // 📦 6. RETORNO COMPATIBLE
        return {
            statusCode: 200,
            headers: { 
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*"
            },
            body: JSON.stringify({
                candidates: [{
                    content: {
                        parts: [{ text: aiText }]
                    }
                }]
            })
        };

    } catch (error) {
        return {
            statusCode: 500,
            headers: { "Content-Type": "application/json", "Access-Control-Allow-Origin": "*" },
            body: JSON.stringify({ error: error.message })
        };
    }
};
