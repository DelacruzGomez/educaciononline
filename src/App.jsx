import { useEffect, useState } from 'react';
import './App.css';




export default function App() {
  const hotmartUrl = 'https://go.hotmart.com/N106692793T'
  const downloadUrl = 'https://educaciononline.netlify.app/gracias.html'
    // 🔥 ESTADO PARA MOSTRAR/OCULTAR EL CHAT
  // ESTADO PARA MOSTRAR/OCULTAR EL CHAT
  const [isChatOpen, setIsChatOpen] = useState(false);

  // 🔥 ESCUCHA CUANDO SE ABRE EL CHAT PARA ENVIAR EL MENSAJE DE BIENVENIDA
  useEffect(() => {
    if (isChatOpen) {
      // Damos un microsegundo para que el iframe termine de cargar en el DOM
      setTimeout(() => {
        const iframe = document.querySelector('iframe[title="Chatbot AI"]');
        if (iframe && iframe.contentWindow) {
          // Ejecutamos de forma segura la función addMessage y el push dentro del archivo del bot
          if (typeof iframe.contentWindow.addMessage === 'function') {
            const saludo = "Hola 👋 Soy el asistente virtual de Portal EducaDG. Estoy aquí para ayudarte a encontrar los mejores cursos online y programas ideales para llevar tu talento al siguiente nivel. 🚀 ¿En qué especialización o curso te gustaría recibir información hoy?";
            
            // Inyectamos el saludo visualmente en el área de mensajes del iframe
            iframe.contentWindow.addMessage(saludo, 'model');

            // Guardamos en el historial del iframe si está vacío
            if (iframe.contentWindow.conversationHistory && iframe.contentWindow.conversationHistory.length === 0) {
              iframe.contentWindow.conversationHistory.push({ role: 'model', text: saludo });
            }
          }
        }
      }, 150); // Delay sutil para asegurar sincronización
    }
  }, [isChatOpen]);


  // Productos organizados por categoría para estructurar el catálogo
  const recommendedProducts = [
    {
      id: 1,
      category: 'desarrollo',
      title: '📱 Apps Rentables',
      description: 'El negocio de las aplicaciones ya no es exclusivo de ingenieros. Crea, monetiza tus propias apps móviles sencillas e inicia un negocio digital altamente rentable desde cero.',
      url: 'https://go.hotmart.com/R106772005H', // Link a página de ventas / Pago Único
      urlMensual: 'https://go.hotmart.com/R106772005H?ap=3997', // Hotlink de checkout de $67
      buttonText: '💻 Ver Temario Completo y Pago Único',
      badge: 'Principal',
      image: 'https://e0e8d87628.cbaul-cdnwnd.com/c7911eafbc364cef7af23daf60ec1a7b/200000037-22b6322b67/logo.webp?ph=e0e8d87628https://static-media.hotmart.com/2BK98Fr8qhtsmTNyB-SvsNvoelw=/filters:background_color(white)/hotmart/product_pictures/29d9014c-a295-49c8-bb5f-d851542e1a3a/ecoverappshotmart.png',
    },
    {
      id: 2,
      category: 'desarrollo',
      title: '⚡Mega Programación Básica + Avanzada',
      description: 'Domina los fundamentos prácticos de la programación aplicados al sector financiero, bancario y de seguros. Aprende a tu ritmo con 7 unidades claras, casos reales y videos explicativos para impulsar tu negocio o carrera.',
      url: 'https://go.hotmart.com/N106772659G',
      buttonText: 'Ir al producto',
      badge: 'Útil',
      image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1200&q=80',
    },
    {
      id: 3,
      category: 'desarrollo',
      title: '🚀Curso de Programación Web',
      description: 'Aprende desarrollo web desde cero a tu propio ritmo. Olvídate de carreras largas y obtén una certificación oficial para postular a empleos bien pagados en tecnología.',
      url: 'https://go.hotmart.com/P106773049T', 
      buttonText: '💻 Curso de Programación Web ISE',
      badge: 'Top',
      image: 'https://media.istockphoto.com/id/2228764569/es/foto/desarrolladora-de-software-hispana-codificando-por-la-noche-en-la-oficina.jpg?s=612x612&w=0&k=20&c=Op80u7Twutb1cVdJjxiXnJXeA17FNBSBw6wSPE4Wquc=',  
    },
    {
      id: 4,
      category: 'desarrollo',
      title: '🌐 Curso Programación Web y Multiplataforma',
      description: 'Lleva tu perfil tecnológico al siguiente nivel. Un programa completo diseñado para aprender a programar software seguro, diseñar videojuegos y desarrollar aplicaciones multiplataforma de alta calidad con las herramientas más cotizadas por las empresas.',
      url: 'https://go.hotmart.com/Y106855907W',
      buttonText: 'Ver Curso Ahora',
      badge: 'Top',
      image: 'https://cdn.pixabay.com/photo/2016/09/14/08/26/web-1668927_1280.jpg',
    },
    {  
      id: 5,
      category: 'desarrollo',
      title: '🛡️ Introducción Al Hacking Ético desde Cero',
      description: 'Todas las demostraciones que se hacen en el curso podrás realizarlas en tu propio laboratorio. Aprenderás a instalar y configurar el laboratorio utilizando herramientas gratuitas.',
      url: 'https://go.hotmart.com/F106792904G', 
      buttonText: 'Conocer más',
      badge: 'Top',
      image: 'https://media.istockphoto.com/id/958989154/photo/ethical-hacking-concept-with-faceless-hooded-male-person.jpg?s=612x612&w=0&k=20&c=UqweFHES7NkxiFVws2Pz6QrswGrGvjYBumuS3zFMBCA=',
    },
    {
      id: 6,
      category: 'oficios',
      title: '🔧 Reparación de Celulares',
      description: 'Aprende a reparar dispositivos móviles paso a paso. Un programa completo diseñado para que empieces desde cero, domines el oficio y abras tu propio negocio técnico.',
      url: 'https://go.hotmart.com/O106772582N',
      buttonText: 'Ver ahora',
      badge: 'Nuevo',
      image: 'https://media.istockphoto.com/id/472354914/photo/technician-repairing-a-smarphone.jpg?s=612x612&w=0&k=20&c=XFp654ztifvYUXC8WDOSzZS41LcnIapPYKx1XeuQKC8=',
    },
    {
      id: 7,
      category: 'salud',
      title: '🧘‍♀️ Sistema Yoga Restaurativo',
      description: 'Descubre el método terapéutico diseñado para aliviar dolores corporales puntuales, liberar la tensión acumulada y reducir el estrés diario con sesiones de solo 5 minutos.',
      url: 'https://go.hotmart.com/G106772402F',
      buttonText: 'Abrir enlace',
      badge: 'Recomendado',
      image: 'https://media.istockphoto.com/id/2236914765/es/foto/mujer-practicando-postura-de-yoga-restaurativo-en-esterilla.jpg?s=612x612&w=0&k=20&c=2yx7Duh5CWSyAO_8pgQovDPd4OK8vjOlG-RsOX_sWw8=',
    },
    {
      id: 8,
      category: 'oficios',
      title: '🎨 Diseña y Crea con Resina',
      description: 'Aprende desde cero y paso a paso a diseñar accesorios únicos en resina como llaveros, agendas, tazas y joyería. Evita los errores comunes, accede a una lista de proveedores locales y emprende tu propio negocio creativo a tu propio ritmo con acceso ilimitado.',
      url: 'https://go.hotmart.com/C106809529R', // Link 1: Página de Ventas General
      urlDescuento: 'https://go.hotmart.com/C106809529R?ap=1d28', // Link 2: Oferta Especial de Lanzamiento
      urlTemario: 'https://go.hotmart.com/S106801999T', // Link 3: Temario Completo Alternativo
      buttonText: '🛒 Ver Curso PRO',
      badge: 'Lanzamiento',
      image: 'https://static-media.hotmart.com/mscv29Nznog7exyHS4UmKm6h1sU=/filters:background_color(white)/hotmart/product_pictures/753d70da-ad49-4a5a-8bcb-c28508249ed1/PORTADACURSO.png',
    },
    {
      id: 9,
      category: 'oficios',
      title: '🧼 Curso Jabones y Velas Artesanales 2x1',
      description: 'Curso completo para emprender tu negocio desde casa sin experiencia previa. Aprende el uso de bases orgánicas, aceites esenciales, moldes de silicona, cálculos y presupuestos. Incluye módulos de marca personal, venta en redes sociales y lista de proveedores.',
      url: 'https://go.hotmart.com/O106861041A', // Reemplaza por tu Hotlink real de Hotmart
      buttonText: 'Ver ahora',
      badge: 'Lanzamiento',
      image: 'https://static-media.hotmart.com/iJNxYBkzwOpQsYnv0Y0GStPlTfY=/filters:background_color(white)/hotmart/product_pictures/28657d7d-2074-4aeb-8df2-1c40c6634310/B1A95CA4048041E182927EB2706E8447.png',
    },

        {
      id: 10,
      category: 'oficios',
      title: '💈 Master Barber Pro',
      description: 'El programa más completo para convertirte en Barbero Maestro y abrir tu propio negocio. Aprende 21 cortes diferentes, tratamientos, afeitado tradicional y colorimetría de la mano de un bicampeón mundial. Incluye módulos de marketing, contabilidad, habilitación de locales y certificado.',
      url: 'https://go.hotmart.com/G106801786P',
      buttonText: 'Ver ahora',
      badge: 'Premium',
      image: 'https://plus.unsplash.com/premium_photo-1661645788141-8196a45fb483?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8YmFyYmVyaWF8ZW58MHx8MHx8fDA%3D',
    },
    {
      id: 11,
      category: 'salud',
      title: '🌱 Guía Estilo de Vida Saludable',
      description: 'Descubre el método integral para transformar tu estilo de vida, nutrir tu cuerpo y mejorar tu salud mental. Incluye planes de alimentación balanceada, rutinas de ejercicios accesibles en casa y técnicas efectivas de relajación para vivir con máxima energía y equilibrio diario.',
      url: 'https://go.hotmart.com/O106802124X',
      buttonText: 'Ver ahora',
      badge: 'Bienestar',
      image: 'https://images.unsplash.com/photo-1504732099162-d8c9d5ba3bfd?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDJ8fHxlbnwwfHx8fHw%3D',
    },
    {
      id: 12,
      category: 'salud',
      title: '💖 Programa Amor Propio y Autoestima',
      description: 'Inicia un viaje transformador hacia una relación más fuerte y compasiva contigo mismo. Accede a videos diarios de inspiración, metas guiadas y ejercicios prácticos diseñados para silenciar la autocrítica, fortalecer tu confianza y construir una autoestima indestructible día a día.',
      url: 'https://go.hotmart.com/W106802341H',
      buttonText: 'Ver ahora',
      badge: 'Suscripción',
      image: 'https://images.unsplash.com/photo-1643736547280-6b06661fa835?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fGFtb3IlMjBwcm9waW98ZW58MHx8MHx8fDA%3D',
    }, 
    {
      id: 13,
      category: 'desarrollo',
      title: '📖 eBook: Negocio Digital',
      description: 'Descubre el paso a paso para emprender por internet sin salir de casa ni invertir grandes capitales. Este libro digital te enseña a validar tus ideas, elegir tu producto, atraer clientes calificados y automatizar tus ventas constantes, ideal para principiantes sin experiencia previa.',
      url: 'https://go.hotmart.com/E106805690P',
      buttonText: '📘 Ver eBook: Negocio Digital desde Cero',
      badge: 'Ebook',
      image: 'https://static-media.hotmart.com/iyA8YmufW6hevRIUpwaMfOm9Y6U=/filters:background_color(white)/hotmart/product_pictures/c062d1ce-3bb8-4ed8-b28f-48290790dd15/LOGO.PNG',
      // CONFIGURACIÓN DEL SEGUNDO BOTÓN INDEPENDIENTE
      urlExtra: 'https://go.hotmart.com/F106858942V', // Reemplaza por tu Hotlink de este nuevo eBook de Marketing
      buttonTextExtra: '📙 Ver eBook: Negocios Digitales (Marketing y Finanzas)'
      
    },
    {
      id: 14, 
      category: 'desarrollo',
      title: '🤖 Negocios Digitales con Inteligencia Artificial',
      description: 'Descubre cómo automatizar YouTube, crear influencers artificiales y montar agencias de Copywriting utilizando Chat GPT, Machine Learning y Big Data. El máster definitivo en video para crear modelos de negocio rentables y escalables desde cero.',
      url: 'https://go.hotmart.com/M106859320X', // Reemplaza aquí por tu Hotlink real de Hotmart que apunte a la página de ventas
      buttonText: '🔥 Ver Máster con IA Ahora',
      badge: 'Tendencia',
      image: 'https://cdn.pixabay.com/photo/2020/07/08/04/12/work-5382501_1280.jpg', // Una imagen moderna e impactante que sugiera IA/Tecnología
    },
    {
      id: 15, // Identificador único consecutivo para tu catálogo
      category: 'oficios', // Clasificado en Salud/Bienestar (o cámbialo a 'oficios' según prefieras)
      title: '🎹 Toca Piano Fácil desde Cero',
      description: 'Aprende los fundamentos de la música y desarrolla tu sensibilidad artística. Domina posiciones de dedos, formación de acordes, inversiones y círculos armónicos mediante ejercicios prácticos paso a paso para interpretar tus canciones favoritas. ¡Único pago para siempre con certificación oficial y acceso ilimitado!',
      url: 'https://go.hotmart.com/A106864024O?dp=1', // Coloca aquí tu Hotlink de afiliado copiado de Hotmart
      buttonText: 'Ver ahora',
      badge: 'Master Class',
      image: 'https://static-media.hotmart.com/Eu6_dfdjrvVKrQXkBQ5zKrd-rA4=/filters:background_color(white)/hotmart/product_pictures/331e1440-4cd6-4711-9856-12638da5d5ea/MasterSello14.jpg', // Imagen limpia y profesional de teclado/piano
    },
    {
    id: 16,
    category: 'oficios',
    title: '👑 Combo Elite: Cosmetología Profesional + Manicura',
    description: 'Accede a las dos especialidades más lucrativas del mundo de la estética. Conviértete en experta en cosmetología facial y diseño de uñas profesional con este paquete doble de capacitación total.',
    urlBoton1: 'https://go.hotmart.com/U106873037M', // Tu link de Cosmetología
    textBoton1: '🧴 Ver Curso Cosmetología PRO',
      
    // CONFIGURACIÓN DEL SEGUNDO BOTÓN
    urlBoton2: 'https://go.hotmart.com/Q106873316P', // Tu link de Manicura
    textBoton2: '💅 Ver Curso Manicura',
    badge: 'Oferta 2x1',
    image: 'https://media.istockphoto.com/id/1497806504/es/foto/peluquer%C3%ADa-en-sal%C3%B3n-de-belleza-la-mujer-se-peina-en-el-sal%C3%B3n-de-belleza-moderno-estilista-seca.jpg?s=612x612&w=0&k=20&c=W4gT9tOhXW8WyK7Qz2UEV4PM75v8Pbk2QXmLQnZMM6c=',
  },

  ];

  return ( 
    <div className="page-container">
      <header className="hero-section">
        <div className="hero-content">
          <span className="badge">⭐ Educación Online de Alta Calidad</span>
          <h1>
            Aprende habilidades de alto valor <span className="highlight">desde casa</span>
          </h1>
          <p className="lead">
            Accede a los mejores programas prácticos, 100% online y con certificación internacional para transformar tu vida profesional, tu salud y tus finanzas. ¡Elige tu curso e inicia hoy mismo!
          </p>

          <div className="hero-actions">
            <a className="btn-primary" href={hotmartUrl} target="_blank" rel="noreferrer">
              🔥 Aprender a Crear Apps Ahora
            </a>
            <a className="btn-secondary" href="#productos-recomendados">
              🛒 Más Cursos y Productos
            </a>
          </div>

          <div className="hero-trust">
            <span>✨ Cursos Certificados</span>
            <span>⚡ Aprendizaje Rápido</span>
            <span>💼 Sin Conocimientos Previos</span>
          </div>
        </div>

        {/* Tarjeta de descarga optimizada sin campos de formulario */}
        <aside className="capture-card" id="formulario">
          <div className="card-header">
            <h3>🎁 ¡Regalo Exclusivo!</h3>
            <p>Obtén nuestra guía rápida en PDF y descubre el ecosistema No-Code hoy mismo.
              Aprende Cómo Crear Apps de Éxito y Sencillas ¡Sin Programar!
            </p>
          </div>

          <div className="capture-form" style={{ marginTop: '1.5rem', marginBottom: '1.5rem' }}>
            <a 
              href={downloadUrl} 
              className="btn-submit" 
              style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
            >
              📥 Descargar Guía Gratis
            </a>
          </div>

          <div className="card-footer">
            <p>🔒 Acceso inmediato sin registros pesados.</p>
          </div>
        </aside>
      </header>
      
{/* 
      <section className="video-section">
        <div className="section-title">
          <h2>Descubre el potencial del No-Code en 5 minutos</h2>
          <p>Echa un vistazo a la explicación detallada y descubre por qué esta es la habilidad más demandada del mercado.</p>
        </div>
      </section>

      <section className="cta-container-section">
        <div className="features-grid">
*/}          
          {/* Columna 1 */}
          {/* 
          <article className="feature-card">
            <div className="icon-box">🥇</div>
            <h3>¿Qué vas a lograr?</h3>
            <ul>
              <li>Construir aplicaciones funcionales sin tocar una sola línea de código.</li>
              <li>Validar tus ideas de negocio en tiempo récord y con bajo presupuesto.</li>
              <li>Dominar las plataformas No-Code más populares del mercado actual.</li>
              <li>Ahorrar miles de dólares en agencias o desarrolladores externos.</li>
            </ul>
          </article>
*/}
          {/* Columna 2 */}
 {/* 
          <article className="feature-card">
            <div className="icon-box">🏆</div>
            <h3>¿Este curso es para ti?</h3>
            <ul>
              <li><strong>Emprendedores</strong> que buscan crear un Producto Mínimo Viable (MVP).</li>
              <li><strong>Creativos y Diseñadores</strong> que quieren materializar sus ideas interactivas.</li>
              <li><strong>Principiantes absolutos</strong> curiosos por la tecnología digital.</li>
              <li>Profesionales que quieren agregar una habilidad altamente rentable a su perfil.</li>
            </ul>
          </article>
Columna 2 */}
          {/* Columna 3 */}
 {/* 
          <div className="cta-purple-card">
            <h2>¿Listo para dar el siguiente paso en tu carrera digital?</h2>
            <p>"Aprende las habilidades más demandadas y obtén tu certificación internacional."</p>
            <a href={hotmartUrl} target="_blank" rel="noreferrer" className="cta-button" style={{ textDecoration: 'none' }}>
              🔥 Acceder al Curso Completo Aquí
            </a>
          </div>

        </div>
      </section>
      Columna 3 */}

      <section id="productos-recomendados" className="features-section recommended-section">
        <div className="section-title">
          <h2>🎓 Catálogo de Especializaciones Profesionales</h2>
          <p>
            Domina los oficios más lucrativos y demandados del mercado actual. Elige tu curso, estudia a tu propio ritmo y obtén tu certificación internacional. Empieza a construir tu futuro hoy mismo.
          </p>
          <h5 style={{ marginTop: '0.5rem', fontWeight: 'bold' }}>
            "Tu inversión está 100% protegida con nuestra garantía de satisfacción."
          </h5>
        </div>


        {/* Categoría: Desarrollo y Negocios Digitales */}
        <div className="category-block">
          <h3 className="category-title">🚀 Desarrollo y Negocios Digitales</h3>
          <div className="features-grid catalog-grid">
            {recommendedProducts
              .filter((product) => product.category === 'desarrollo')
              .map((product) => (
                <article className="feature-card recommended-card" key={product.id}>
                  <img className="card-image" src={product.image} alt={product.title} loading="lazy" />
                  <h3>{product.title}</h3>
                  <span className="recommended-badge">{product.badge}</span>
                  <p>{product.description}</p>
                  
                  {/* Contenedor flexible de botones */}
<div className="card-actions" style={{ display: 'flex', flexDirection: 'column', gap                  : '0.5rem', width: '100%', marginTop: 'auto' }}>
                    
                    {/* CASO A: Botón del plan mensual (Exclusivo de Apps Rentables) */}
                    {product.urlMensual && (
                      <a 
                        className="btn-primary" 
                        href={product.urlMensual} 
                        target="_blank" 
                        rel="noreferrer"
                        style={{ width: '100%', padding: '0.75rem', fontSize: '0.95rem', background: 'linear-gradient(to right, #2563eb, #7c3aed)' }}
                      >
                        🚀 Iniciar Plan Mensual
                      </a>
                    )}

                    {/* CASO B: Botón para el segundo curso alternativo de Programación Desde 0 */}
                    {product.urlExtra && (
                      <a 
                        className="btn-primary" 
                        href={product.urlExtra} 
                        target="_blank" 
                        rel="noreferrer"
                        style={{ width: '100%', padding: '0.75rem', fontSize: '0.95rem', background: 'linear-gradient(to right, #10b981, #059669)' }}
                      >
                        {product.buttonTextExtra}
                      </a>
                    )}

                    {/* Botón Principal/Estándar de la tarjeta */}
                    <a 
                      className="btn-secondary" 
                      href={product.url} 
                      target="_blank" 
                      rel="noreferrer"
                      style={(product.urlMensual || product.urlExtra) ? { width: '100%', padding: '0.75rem', fontSize: '0.9rem', backgroundColor: '#f8fafc', borderColor: '#cbd5e1' } : {}}
                    >
                      {product.buttonText}
                    </a>
                  </div>

                </article>
              ))}
          </div>
        </div>



        {/* Categoría: Oficios */}
        <div className="category-block">
          <h3 className="category-title">🔧 Oficios y Emprendimiento</h3>
          <div className="features-grid catalog-grid">
            {recommendedProducts
              .filter((product) => product.category === 'oficios')
              .map((product) => (
                <article className="feature-card recommended-card" key={product.id}>
                  <img className="card-image" src={product.image} alt={product.title} loading="lazy" />
                  <h3>{product.title}</h3>
                  <span className="recommended-badge">{product.badge}</span>
                  <p>{product.description}</p>
                  
                  {/* Contenedor dinámico de botones flexible para Oficios */}
                  <div className="card-actions" style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem', width: '100%', marginTop: 'auto' }}>
                    
                    {/* CONDICIONAL EXCLUSIVA PARA EL COMBO ELITE CON DOS BOTONES */}
                    {product.urlBoton1 && product.urlBoton2 ? (
                      <>
                        {/* Botón 1: Cosmetología (Estilo Azul Destacado) */}
                        <a 
                          className="btn-secondary" 
                          href={product.urlBoton1} 
                          target="_blank" 
                          rel="noreferrer"
                          style={{ width: '100%', padding: '0.65rem', fontSize: '0.85rem', backgroundColor: '#ffffff', color: '#1d4ed8', borderColor: '#3b82f6', textDecoration: 'none', borderRadius: '12px', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontWeight: '600', border: '2px solid #3b82f6' }}
                        >
                          {product.textBoton1}
                        </a>

                        {/* Botón 2: Manicura (Estilo Gris Estándar) */}
                        <a 
                          className="btn-secondary" 
                          href={product.urlBoton2} 
                          target="_blank" 
                          rel="noreferrer"
                          style={{ width: '100%', padding: '0.65rem', fontSize: '0.85rem', backgroundColor: '#f8fafc', borderColor: '#cbd5e1', color: '#475569', textDecoration: 'none', borderRadius: '12px', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontWeight: '600', border: '2px solid #cbd5e1' }}
                        >
                          {product.textBoton2}
                        </a>
                      </>
                    ) : (
                      /* RENDERIZADO POR DEFECTO PARA TODOS LOS DEMÁS PRODUCTOS */
                      <>
                        {/* BOTÓN DE DESCUENTO (Aparece arriba en verde con máxima prioridad) */}
                        {(product.urlDescuento || product.urlMensual) && (
                          <a 
                            className="btn-primary" 
                            href={product.urlDescuento || product.urlMensual} 
                            target="_blank" 
                            rel="noreferrer"
                            style={{ width: '100%', padding: '0.65rem', fontSize: '0.9rem', background: 'linear-gradient(to right, #10b981, #059669)', textDecoration: 'none', borderRadius: '12px', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontWeight: '600', color: 'white' }}
                          >
                            {product.id === 1 ? '🚀 Iniciar Plan Mensual' : '🔥 Inscripción con Oferta'}
                          </a>
                        )}

                        {/* BOTÓN DEL TEMARIO EXTRA (Exclusivo de Resina, destaca en azul) */}
                        {product.urlTemario && (
                          <a 
                            className="btn-secondary" 
                            href={product.urlTemario} 
                            target="_blank" 
                            rel="noreferrer"
                            style={{ width: '100%', padding: '0.65rem', fontSize: '0.85rem', backgroundColor: '#ffffff', color: '#1d4ed8', borderColor: '#3b82f6', textDecoration: 'none', borderRadius: '12px', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontWeight: '600', border: '2px solid #3b82f6' }}
                          >
                            💻 Ver Curso Básico
                          </a>
                        )}

                        {/* BOTÓN PRINCIPAL / ESTÁNDAR (Página de ventas general al fondo) */}
                        <a 
                          className="btn-secondary" 
                          href={product.url} 
                          target="_blank" 
                          rel="noreferrer"
                          style={(product.urlDescuento || product.urlMensual || product.urlTemario) ? { width: '100%', padding: '0.65rem', fontSize: '0.85rem', backgroundColor: '#f8fafc', borderColor: '#cbd5e1', color: '#475569', textDecoration: 'none', borderRadius: '12px', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontWeight: '600', border: '2px solid #cbd5e1' } : {}}
                        >
                          {product.buttonText}
                        </a>
                      </>
                    )}
                  </div>

                </article>
              ))}
          </div>
        </div>


        {/* Categoría: Salud */}
        <div className="category-block">
          <h3 className="category-title">🧘 Salud y Bienestar</h3>
          <div className="features-grid catalog-grid">
            {recommendedProducts
              .filter((product) => product.category === 'salud')
              .map((product) => (
                <article className="feature-card recommended-card" key={product.id}>
                  <img className="card-image" src={product.image} alt={product.title} loading="lazy" />
                  <h3>{product.title}</h3>
                  <span className="recommended-badge">{product.badge}</span>
                  <p>{product.description}</p>
                  <a className="btn-secondary" href={product.url} target="_blank" rel="noreferrer">
                    {product.buttonText}
                  </a>
                </article>
              ))}
          </div>
        </div>
 </section> {/* Cierre de #productos-recomendados */}

      {/* 💬 BOTÓN FLOTANTE ESTILO WIDGET DE CHAT (REEMPLAZO) */}
      <button 
        onClick={() => setIsChatOpen(!isChatOpen)} // 🔥 Si está cerrado lo abre, si está abierto lo cierra
        style={{
          position: 'fixed',
          bottom: '25px',
          right: '25px',
          backgroundColor: '#5742fa', // El color violeta/azul oficial de tu captura
          color: '#ffffff',
          width: '60px', // Dimensiones circulares idénticas
          height: '60px',
          borderRadius: '50%', // Lo hace un círculo perfecto
          boxShadow: '0px 4px 16px rgba(0, 0, 0, 0.25)',
          zIndex: 9999,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          border: 'none',
          cursor: 'pointer',
          transition: 'all 0.2s ease',
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = 'scale(1.08)'; // Efecto sutil de crecimiento
          e.currentTarget.style.backgroundColor = '#432ef5'; // Oscurece levemente
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = 'scale(1)';
          e.currentTarget.style.backgroundColor = '#5742fa';
        }}
      >
        {/* Icono de mensaje idéntico al de tu captura */}
        <svg 
          width="28" 
          height="28" 
          viewBox="0 0 24 24" 
          fill="none" 
          stroke="currentColor" 
          strokeWidth="2.5" 
          strokeLinecap="round" 
          strokeLinejoin="round"
        >
          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
        </svg>
      </button>


      {/* 🖥️ VENTANA FLOTANTE DEL CHAT (MODAL CON IFRAME) */}
      {isChatOpen && (
        <div style={{
          position: 'fixed',
          bottom: '90px', // Se posiciona justo encima del botón
          right: '25px',
          width: '380px', // Ancho ideal para un chat de soporte en web
          height: '500px', // Altura perfecta para que sea cómodo de usar
          backgroundColor: '#ffffff',
          borderRadius: '12px',
          boxShadow: '0px 10px 25px rgba(0, 0, 0, 0.25)',
          zIndex: 10000,
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
          border: '1px solid #e2e8f0'
        }}>
          {/* Barra superior de la ventana del chat */}
          <div style={{
            backgroundColor: '#1e293b',
            color: '#ffffff',
            padding: '12px 16px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between' // 🔥 Dejamos solo la propiedad válida
          }}>

            <span style={{ fontWeight: '600', fontSize: '14px' }}>🤖 Consultor Portal EducaDG</span>
            {/* Botón para cerrar la ventana del chat */}
            <button 
              onClick={() => setIsChatOpen(false)} // 🔥 Cierra la ventana
              style={{
                background: 'none',
                border: 'none',
                color: '#ffffff',
                fontSize: '18px',
                cursor: 'pointer',
                padding: '0 5px'
              }}
            >
              ✕
            </button>
          </div>

{/* Carga dinámicamente tu bot dentro de la landing page */}
<iframe 
  src="/chat/asistente.html" 
  style={{ width: '100%', height: 'calc(100% - 45px)', border: 'none' }} // 🔥 Ajuste de altura limpia
  title="Chatbot AI"
/>

        </div>
      )}

      {/* PIE DE PÁGINA LEGAL Y DE AUTORIDAD */}
      <footer className="catalog-footer" style={{ marginTop: '4rem', padding: '2rem 0', borderTop: '1px solid var(--border)', fontSize: '0.8rem', color: 'var(--gray)', textAlign: 'center', lineHeight: '1.6' }}>
        <p style={{ fontWeight: '600', marginBottom: '1rem', color: 'var(--dark)' }}>
          © 2026 Portal EducaDG. Todos los derechos reservados.
        </p>
        <p style={{ marginBottom: '1rem', maxWidth: '800px', marginInline: 'auto' }}>
          Este sitio web no forma parte de la plataforma de Facebook, Meta Platforms, Inc., TikTok o Google. Además, este sitio NO está respaldado por estas corporaciones de ninguna manera. Las marcas comerciales y logotipos son propiedad de sus respectivos dueños.
        </p>
        <p style={{ maxWidth: '800px', marginInline: 'auto', fontStyle: 'italic' }}>
          “Los productos y servicios educativos disponibles en este catálogo son comercializados y distribuidos de manera tecnológica a través de la plataforma Hotmart. La plataforma Hotmart no realiza un control editorial previo de los productos vendidos, ni evalúa el tecnicismo o la experiencia de quienes los elaboran. La existencia de un producto y su adquisición a través de la plataforma no puede ser considerada como garantía de calidad de contenido o resultado, bajo ninguna circunstancia. Al adquirirlo, el comprador declara conocer esta información. Los términos de uso y políticas de Hotmart pueden ser consultados directamente en su sitio oficial.”
        </p>
      </footer>

    </div>
  )
}