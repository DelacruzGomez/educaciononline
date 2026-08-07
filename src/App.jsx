import { useEffect, useState } from 'react';
import './App.css';

export default function App() {
  const hotmartUrl = 'https://go.hotmart.com/N106692793T'
  const downloadUrl = 'https://educaciononline.netlify.app/gracias.html'
    // 🔥 ESTADO PARA MOSTRAR/OCULTAR EL CHAT
  // ESTADO PARA MOSTRAR/OCULTAR EL CHAT
  const [isChatOpen, setIsChatOpen] = useState(false);
    // 🔥 NUEVO ESTADO: Agrégalo justo aquí abajo
  const [openProductMenu, setOpenProductMenu] = useState(null);

  const toggleMenu = (productId) => {
    setOpenProductMenu(openProductMenu === productId ? null : productId);
  };

   // 🔥 ESCUCHA CUANDO SE ABRE EL CHAT PARA ENVIAR EL MENSAJE DE BIENVENIDA DE FORMA SEGURA
  useEffect(() => {
    if (isChatOpen) {
      // Damos un sutil retraso para asegurar que el iframe esté 100% cargado en el DOM
      const timer = setTimeout(() => {
        const iframe = document.querySelector('iframe[title="Chatbot AI"]');
        if (iframe && iframe.contentWindow) {
          const saludo = "Hola 👋 Soy el asistente virtual de Portal EducaDG. Estoy aquí para ayudarte a encontrar los mejores cursos online y programas ideales para llevar tu talento al siguiente nivel. 🚀 ¿En qué especialización o curso te gustaría recibir información hoy?";
          
          // Enviamos el saludo usando postMessage (Mecanismo ultra seguro y estandarizado)
          iframe.contentWindow.postMessage({ type: 'INIT_CHAT', text: saludo }, '*');
        }
      }, 300); // 300ms es el tiempo perfecto de sincronización

      return () => clearTimeout(timer);
    }
  }, [isChatOpen]);


  // Productos organizados por categoría para estructurar el catálogo
  const recommendedProducts = [
    {
      id: 3210423,
      category: 'desarrollo',
      title: '📱 Aprende Cómo Crear Apps de Éxito Sencillas ¡Sin Programar!',
      description: 'Crea y monetiza aplicaciones móviles exitosas sin saber programar y con cero inversión. Aprende a encontrar nichos rentables, usar plataformas sencillas y dominar el marketing para maximizar tus descargas e ingresos.',
      url: 'https://go.hotmart.com/N106692793T', // Página de ventas / Pago Único info
      buttonText: '🔍 Ver Temario Completo',
      badge: 'Principal',
      image: 'https://static-media.hotmart.com/I3A_hyQNNxcQqzTH9LAZNOJVS8Y=/300x300/smart/filters:format(webp):background_color(white)/hotmart/product_pictures/8d18aa4a-d077-473a-842e-17573c8e2efe/App.png?w=920',
    },
    {
      id: 226810,
      category: 'desarrollo',
      title: '📱 Apps Rentables',
      description: 'El negocio de las aplicaciones ya no es exclusivo de ingenieros. Crea, monetiza tus propias apps móviles sencillas e inicia un negocio digital altamente rentable desde cero.',
      url: 'https://go.hotmart.com/R106772005H', // Página de ventas / Pago Único info
      urlMensual: 'https://go.hotmart.com/R106772005H?ap=3997', // Plan Mensual 67$
      buttonText: '🔍 Ver Temario Completo',
      badge: 'Principal',
      // Se corrigió el enlace doble de la imagen dejando solo el de Hotmart
      image: 'https://e0e8d87628.cbaul-cdnwnd.com/c7911eafbc364cef7af23daf60ec1a7b/200000037-22b6322b67/logo.webp?ph=e0e8d87628https://static-media.hotmart.com/2BK98Fr8qhtsmTNyB-SvsNvoelw=/filters:background_color(white)/hotmart/product_pictures/29d9014c-a295-49c8-bb5f-d851542e1a3a/ecoverappshotmart.png',
      
      // Estructura de opciones extra idéntica a la categoría de oficios
      tieneOpcionesExtra: true,
      clases: [
        { label: '📺 MasterClass Completa: Los Secretos Appers', url: 'https://go.hotmart.com/R106772005H?ap=9c1a' },
        { label: '🎬 Transmisiones en VIVO (Facebook Live)', url: 'https://go.hotmart.com/R106772005H?ap=d4d9' },
        { label: '📝 Pasos para Entender Apps Rentables', url: 'https://go.hotmart.com/R106772005H?ap=ebcb' }
      ],
      preciosAlternativos: [
        { label: '💎 Checkout Directo Pago Único ($297)', url: 'https://go.hotmart.com/R106772005H?ap=f701' },
        { label: '⏱️ Serie Secreta: Video #1 (Oferta 6 Días)', url: 'https://go.hotmart.com/R106772005H?ap=8b6a' },
        { label: '⏱️ Serie Secreta: Video #2 (Oferta 6 Días)', url: 'https://go.hotmart.com/R106772005H?ap=1195' },
        { label: '⏱️ Serie Secreta: Video #3 (Oferta 6 Días)', url: 'https://go.hotmart.com/R106772005H?ap=8e23' }
      ]
    },

    {
      id: 5959234, // Usa un solo número limpio para evitar fallos de sintaxis en el key de React
      category: 'desarrollo',
      title: '⚡ Mega Programación Básica + Avanzada',
      description: 'Domina los fundamentos prácticos de la programación aplicados al sector financiero, bancario y de seguros. Aprende a tu ritmo con 7 unidades claras, casos reales y videos explicativos para impulsar tu negocio o carrera.',
      url: 'https://go.hotmart.com/N106772659G', // Página Principal (Boton Gris)
      buttonText: '💻 Programación Básica + Avanzada',
      badge: 'Útil',
      image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1200&q=80',
      
      // 🔥 Propiedades corregidas para que hagan match con tu JSX
      urlExtra: 'https://go.hotmart.com/P106856562N',
      buttonTextExtra: '🔍 Ver Curso de Programación Inicial',

      // Dejado preparado para la lógica de pestañas desplegables si deseas usarla más adelante
      tieneOpcionesExtra: false, 
      clases: [],
      preciosAlternativos: []
    },

    {
      id: 2373674,
      category: 'desarrollo',
      title: '🚀Curso de Programación Web',
      description: 'Aprende desarrollo web desde cero a tu propio ritmo. Olvídate de carreras largas y obtén una certificación oficial para postular a empleos bien pagados en tecnología.',
      url: 'https://go.hotmart.com/P106773049T', // Página de Ventas General
      buttonText: '🔍 Curso de Programación Web ISE',
      badge: 'Top',
      image: 'https://media.istockphoto.com/id/2228764569/es/foto/desarrolladora-de-software-hispana-codificando-por-la-noche-en-la-oficina.jpg?s=612x612&w=0&k=20&c=Op80u7Twutb1cVdJjxiXnJXeA17FNBSBw6wSPE4Wquc=',
      
      // 🔥 Activación de la misma lógica de pestañas para aprovechar todos los enlaces
      tieneOpcionesExtra: true,
      clases: [
        { label: '📦 Ver Página Oficial del Producto (Hotmart)', url: 'https://go.hotmart.com/P106773049T?dp=1' },
        { label: '🌐 Ver Página Externa del Programa', url: 'https://go.hotmart.com/P106773049T?ap=10b8' }
      ],
      preciosAlternativos: [
        { label: '⚡ Checkout Directo Inscripción Rápida', url: 'https://go.hotmart.com/P106773049T?ap=4c83' },
        { label: '💎 Checkout Directo (Pago de Contado Total)', url: 'https://go.hotmart.com/P106773049T?ap=7c17' }
      ]
    },

    {
      id: 3761463,
      category: 'desarrollo',
      title: '🌐 Curso Programación Web y Multiplataforma',
      description: 'Lleva tu perfil tecnológico al siguiente nivel. Un programa completo diseñado para aprender a programar software seguro, diseñar videojuegos y desarrollar aplicaciones multiplataforma de alta calidad con las herramientas más cotizadas por las empresas.',
      url: 'https://go.hotmart.com/Y106855907W',
      buttonText: '🔍 Ver Curso Ahora',
      badge: 'Top',
      image: 'https://cdn.pixabay.com/photo/2016/09/14/08/26/web-1668927_1280.jpg',
    },
    {  
      id: 3174895,
      category: 'desarrollo',
      title: '🛡️ Introducción Al Hacking Ético desde Cero',
      description: 'Todas las demostraciones que se hacen en el curso podrás realizarlas en tu propio laboratorio. Aprenderás a instalar y configurar el laboratorio utilizando herramientas gratuitas.',
      url: 'https://go.hotmart.com/F106792904G', 
      buttonText: '🔍 Ver Curso Ahora',
      badge: 'Top',
      image: 'https://media.istockphoto.com/id/958989154/photo/ethical-hacking-concept-with-faceless-hooded-male-person.jpg?s=612x612&w=0&k=20&c=UqweFHES7NkxiFVws2Pz6QrswGrGvjYBumuS3zFMBCA=',
    },
    {
      id: 6519747,
      category: 'oficios',
      title: '🔧 Reparación de Celulares',
      description: 'Aprende a reparar dispositivos móviles paso a paso. Un programa completo diseñado para que empieces desde cero, domines el oficio y abras tu propio negocio técnico.',
      url: 'https://go.hotmart.com/O106772582N',
      buttonText: '🔍 Ver Curso ahora',
      badge: 'Nuevo',
      image: 'https://media.istockphoto.com/id/472354914/photo/technician-repairing-a-smarphone.jpg?s=612x612&w=0&k=20&c=XFp654ztifvYUXC8WDOSzZS41LcnIapPYKx1XeuQKC8=',
    },
    {
      id: 1856891,
      category: 'salud',
      title: '🧘‍♀️ Sistema Yoga Restaurativo',
      description: 'Descubre el método terapéutico diseñado para aliviar dolores corporales puntuales, liberar la tensión acumulada y reducir el estrés diario con sesiones de solo 5 minutos, Programa Online – Pago Único – Acceso Disponible Para Siempre',
      url: 'https://go.hotmart.com/G106772402F',
      buttonText: '🔍 Ver Curso Ahora',
      badge: 'Recomendado',
      image: 'https://media.istockphoto.com/id/2236914765/es/foto/mujer-practicando-postura-de-yoga-restaurativo-en-esterilla.jpg?s=612x612&w=0&k=20&c=2yx7Duh5CWSyAO_8pgQovDPd4OK8vjOlG-RsOX_sWw8=',
    },
    {
      id: 3600856,
      category: 'oficios',
      title: '🎨 Diseña y Crea con Resina (PRO)',
      description: 'Aprende desde cero y paso a paso a diseñar accesorios únicos en resina como llaveros, agendas, tazas y joyería. Evita los errores comunes y emprende tu negocio.',
      url: 'https://go.hotmart.com/C106809529R', // Venta General
      urlDescuento: 'https://go.hotmart.com/C106809529R?ap=1d28', // Lanzamiento oficial 37$
      buttonText: '🛒 Ver Curso PRO',
      badge: 'Lanzamiento',
      image: 'https://static-media.hotmart.com/mscv29Nznog7exyHS4UmKm6h1sU=/filters:background_color(white)/hotmart/product_pictures/753d70da-ad49-4a5a-8bcb-c28508249ed1/PORTADACURSO.png',
       // Enlaces adicionales organizados para el menú desplegable
        tieneOpcionesExtra: true,
        clases: [
          { label: '📺 Ver Clase Gratuita Día #1', url: 'https://go.hotmart.com/C106809529R?ap=3a88' },
          { label: '📺 Ver Clase Gratuita Día #2', url: 'https://go.hotmart.com/C106809529R?ap=8101' }
        ],
        preciosAlternativos: [
          { label: '🇺🇸 Tarifa Especial EE.UU. (37$)', url: 'https://go.hotmart.com/C106809529R?ap=18eb' },
          { label: '🔥 Oferta Flash Limitada (30$)', url: 'https://go.hotmart.com/C106809529R?ap=8b35' },
          { label: '🏷️ Descuento Intermedio (47$)', url: 'https://go.hotmart.com/C106809529R?ap=b12e' },
          { label: '📉 Cupón Especial (55$)', url: 'https://go.hotmart.com/C106809529R?ap=8124' },
          { label: '💎 Acceso Premium Full (74$)', url: 'https://go.hotmart.com/C106809529R?ap=93c6' }
        ]
    },
    {
      id: 4436530, // ID del Curso Básico
      category: 'oficios',
      title: '💻 Diseña y Crea con Resina: Curso Básico',
      description: 'Iníciate en el mundo de la resina con los conceptos esenciales. Conoce los materiales, proporciones y técnicas iniciales para tus primeras piezas.',
      url: 'https://go.hotmart.com/S106801999T', // Venta General Básico
      urlDescuento: 'https://go.hotmart.com/S106801999T?ap=b65b', // Opción principal 25$
      buttonText: '🔍 Ver Curso Básico',
      badge: 'Esencial',
      image: 'https://static-media.hotmart.com/mscv29Nznog7exyHS4UmKm6h1sU=/filters:background_color(white)/hotmart/product_pictures/753d70da-ad49-4a5a-8bcb-c28508249ed1/PORTADACURSO.png', // <-- AQUÍ FALTABA LA COMA
      
      // Enlaces adicionales organizados para el menú desplegable
      tieneOpcionesExtra: true,
      clases: [],
      preciosAlternativos: [
        { label: '⚡ Oferta Mínima Curso Básico (20$)', url: 'https://go.hotmart.com/S106801999T?ap=0e44' }
      ]
    },

    {
      id: 8021975,
      category: 'oficios',
      title: '🧼 Curso Jabones y Velas Artesanales 2x1',
      description: 'Curso completo para emprender tu negocio desde casa sin experiencia previa. Aprende el uso de bases orgánicas, aceites esenciales, moldes de silicona, cálculos y presupuestos. Incluye módulos de marca personal, venta en redes sociales y lista de proveedores.',
      url: 'https://go.hotmart.com/O106861041A', // Reemplaza por tu Hotlink real de Hotmart
      buttonText: '🔍 Ver Curso ahora',
      badge: 'Lanzamiento',
      image: 'https://static-media.hotmart.com/iJNxYBkzwOpQsYnv0Y0GStPlTfY=/filters:background_color(white)/hotmart/product_pictures/28657d7d-2074-4aeb-8df2-1c40c6634310/B1A95CA4048041E182927EB2706E8447.png',
    },

        {
      id: 1010993,
      category: 'oficios',
      title: '💈 Master Barber Pro',
      description: 'El programa más completo para convertirte en Barbero Maestro y abrir tu propio negocio. Aprende 21 cortes diferentes, tratamientos, afeitado tradicional y colorimetría de la mano de un bicampeón mundial. Incluye módulos de marketing, contabilidad, habilitación de locales y certificado.',
      url: 'https://go.hotmart.com/G106801786P',
      buttonText: '🔍 Ver Curso Ahora',
      badge: 'Premium',
      image: 'https://plus.unsplash.com/premium_photo-1661645788141-8196a45fb483?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8YmFyYmVyaWF8ZW58MHx8MHx8fDA%3D',
    },
    {
      id: 4817070,
      category: 'salud',
      title: '🌱 Guía Estilo de Vida Saludable',
      description: 'Descubre el método integral para transformar tu estilo de vida, nutrir tu cuerpo y mejorar tu salud mental. Incluye planes de alimentación balanceada, rutinas de ejercicios accesibles en casa y técnicas efectivas de relajación para vivir con máxima energía y equilibrio diario.',
      url: 'https://go.hotmart.com/O106802124X',
      buttonText: '🔍 Ver Curso Ahora',
      badge: 'Bienestar',
      image: 'https://images.unsplash.com/photo-1504732099162-d8c9d5ba3bfd?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDJ8fHxlbnwwfHx8fHw%3D',
    },
    {
      id: 5239873,
      category: 'salud',
      title: '💖 Programa Amor Propio y Autoestima',
      description: 'Inicia un viaje transformador hacia una relación más fuerte y compasiva contigo mismo. Accede a videos diarios de inspiración, metas guiadas y ejercicios prácticos diseñados para silenciar la autocrítica, fortalecer tu confianza y construir una autoestima indestructible día a día.',
      url: 'https://go.hotmart.com/W106802341H',
      buttonText: '🔍 Ver Curso Ahora',
      badge: 'Suscripción',
      image: 'https://images.unsplash.com/photo-1643736547280-6b06661fa835?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fGFtb3IlMjBwcm9waW98ZW58MHx8MHx8fDA%3D',
    }, 
    // Agrega estos dos bloques por separado en tu lista de productos de desarrollo:

    {
      id: 4981864, // Producto 1: Enfocado 100% en la mina de oro de la IA (Curso en Video)
      category: 'desarrollo',
      title: '🤖 Negocios Digitales con Inteligencia Artificial',
      description: 'El máster definitivo en video. Domina Chat GPT, Machine Learning y Big Data para automatizar canales de YouTube, crear influencers artificiales y montar agencias de Copywriting altamente rentables.',
      url: 'https://go.hotmart.com/M106859320X', // Link principal del curso en video
      buttonText: '🔥 Ver Máster con IA Ahora',
      badge: 'Tendencia',
      image: 'https://cdn.pixabay.com/photo/2020/07/08/04/12/work-5382501_1280.jpg',
      
      // Al ser un producto de alto valor con link único, no requiere pestañas de descuento para no abaratarlo
      tieneOpcionesExtra: false,
      clases: [],
      preciosAlternativos: []
    },

    {
      id: 5825945, // Producto 2: El Pack de Emprendimiento Digital (Formatos E-book / Guías)
      category: 'desarrollo',
      title: '📖 CURSO: Negocio Digital desde Cero',
      description: 'Descubre el paso a paso para validar ideas, gestionar tiendas online y vender servicios en redes sociales. Una guía práctica diseñada para jóvenes que buscan libertad financiera sin grandes capitales.',
      url: 'https://go.hotmart.com/E106805690P', // Botón Gris Principal (Negocio Digital)
      buttonText: '📘 Ver Curso: Negocio Digital desde Cero',
      badge: 'Recomendado',
      image: 'https://static-media.hotmart.com/iyA8YmufW6hevRIUpwaMfOm9Y6U=/filters:background_color(white)/hotmart/product_pictures/c062d1ce-3bb8-4ed8-b28f-48290790dd15/LOGO.PNG',
      
      // Usamos el botón verde para el e-book de marketing ya que es un excelente complemento directo
      urlExtra: 'https://go.hotmart.com/F106858942V', // ID 6013027 (Negocios Digitales: Marketing)
      buttonTextExtra: '🔍  Ver Curso: Marketing y Finanzas',

      // Dejamos false el desplegable aquí para que no sature con los mismos enlaces
      tieneOpcionesExtra: false,
      clases: [],
      preciosAlternativos: []
    },

    {
      id: 891198, // Identificador único consecutivo para tu catálogo
      category: 'oficios', // Clasificado en Salud/Bienestar (o cámbialo a 'oficios' según prefieras)
      title: '🎹 Academia de Piano: Toca Piano Fácil desde Cero',
      description: 'Aprende los fundamentos de la música y desarrolla tu sensibilidad artística. Domina posiciones de dedos, formación de acordes, inversiones y círculos armónicos mediante ejercicios prácticos paso a paso para interpretar tus canciones favoritas. ¡Único pago para siempre con certificación oficial y acceso ilimitado!',
      url: 'https://go.hotmart.com/A106864024O?dp=1', // Coloca aquí tu Hotlink de afiliado copiado de Hotmart
      buttonText: '🎹 Ver Curso: Piano desde Cero',
      badge: 'Master Class',
      image: 'https://static-media.hotmart.com/Eu6_dfdjrvVKrQXkBQ5zKrd-rA4=/filters:background_color(white)/hotmart/product_pictures/331e1440-4cd6-4711-9856-12638da5d5ea/MasterSello14.jpg', // Imagen limpia y profesional de teclado/piano
    },
    {
      id: 2988032, // ID de Cosmetología como referencia principal
      category: 'oficios',
      title: '👑 Especialidades Estéticas: Cosmetología + Manicura',
      description: 'Aprende las técnicas más solicitadas del sector de la belleza. Conviértete en profesional de la estética facial o el diseño de uñas con un método paso a paso, sencillo y eficaz. Desarrolla un negocio lucrativo, sólido y sostenible desde la comodidad de tu casa usando solo tu celular.',
      badge: 'Lanzamiento',
      image: 'https://media.istockphoto.com/id/1497806504/es/foto/peluquer%C3%ADa-en-sal%C3%B3n-de-belleza-la-mujer-se-peina-en-el-sal%C3%B3n-de-belleza-moderno-estilista-seca.jpg?s=612x612&w=0&k=20&c=W4gT9tOhXW8WyK7Qz2UEV4PM75v8Pbk2QXmLQnZMM6c=',
      
      // CONFIGURACIÓN DE LOS DOS BOTONES (Tu JSX los pintará con los estilos azul y gris respectivamente)
      urlBoton1: 'https://go.hotmart.com/U106873037M', // ID 2988032 - Cosmetología
      textBoton1: '🧴 Ver Curso: Cosmetología Profesional',
        
      urlBoton2: 'https://go.hotmart.com/Q106873316P', // ID 2925316 - Manicura
      textBoton2: '💅 Ver Curso: Manicurista Profesional',

      // Estructura de compatibilidad para tu catálogo filtrado
      tieneOpcionesExtra: false,
      clases: [],
      preciosAlternativos: []
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
        <article className="feature-card recommended-card" key={product.id} style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
          <img className="card-image" src={product.image} alt={product.title} loading="lazy" />
          <h3>{product.title}</h3>
          <span className="recommended-badge">{product.badge}</span>
          <p>{product.description}</p>
          
          {/* Contenedor flexible de botones */}
          <div className="card-actions" style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', width: '100%', marginTop: 'auto' }}>
            
            {/* CASO A: Botón del plan mensual (Exclusivo de Apps Rentables) */}
            {product.urlMensual && (
              <a 
                className="btn-primary" 
                href={product.urlMensual} 
                target="_blank" 
                rel="noreferrer"
                style={{ width: '100%', padding: '0.75rem', fontSize: '0.95rem', background: 'linear-gradient(to right, #2563eb, #7c3aed)', textDecoration: 'none', borderRadius: '12px', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontWeight: '600', color: 'white' }}
              >
                🚀 Iniciar Plan Mensual ($67)
              </a>
            )}

            {/* CASO B: Botón para el segundo curso alternativo de Programación Desde 0 */}
            {product.urlExtra && (
              <a 
                className="btn-primary" 
                href={product.urlExtra} 
                target="_blank" 
                rel="noreferrer"
                style={{ width: '100%', padding: '0.75rem', fontSize: '0.95rem', background: 'linear-gradient(to right, #10b981, #059669)', textDecoration: 'none', borderRadius: '12px', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontWeight: '600', color: 'white' }}
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
              style={{ width: '100%', padding: '0.75rem', fontSize: '0.9rem', backgroundColor: '#f8fafc', borderColor: '#cbd5e1', color: '#475569', textDecoration: 'none', borderRadius: '12px', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontWeight: '600', border: '2px solid #cbd5e1' }}
            >
              {product.buttonText}
            </a>

            {/* PESTAÑA DESPLEGABLE DINÁMICA PARA APPS RENTABLES (LOGICA IDENTICA A OFICIOS) */}
            {product.tieneOpcionesExtra && (
              <div style={{ width: '100%', marginTop: '0.1rem' }}>
                <button
                  type="button"
                  onClick={() => toggleMenu(product.id)}
                  style={{ width: '100%', padding: '0.5rem', fontSize: '0.8rem', backgroundColor: '#f1f5f9', color: '#1e293b', border: '1px dashed #cbd5e1', borderRadius: '8px', cursor: 'pointer', fontWeight: '600', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.3rem' }}
                >
                  {openProductMenu === product.id ? '🔼 Ocultar contenido y accesos directos' : '🔽 Ver clases gratis y checkout pago único'}
                </button>

                {/* Contenido desplegable */}
                {openProductMenu === product.id && (
                  <div style={{ backgroundColor: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '8px', padding: '0.4rem', marginTop: '0.4rem', display: 'flex', flexDirection: 'column', gap: '0.35rem', textAlign: 'left' }}>
                    
                    {/* Renderizado de Clases / Embudos Gratuitos */}
                    {product.clases && product.clases.length > 0 && (
                      <>
                        <div style={{ fontSize: '0.75rem', fontWeight: '700', color: '#64748b', paddingLeft: '0.2rem', marginTop: '0.1rem' }}>MATERIAL GRATUITO Y CLASES:</div>
                        {product.clases.map((clase, index) => (
                          <a key={index} href={clase.url} target="_blank" rel="noreferrer" style={{ width: '100%', padding: '0.45rem', fontSize: '0.8rem', backgroundColor: '#eff6ff', color: '#2563eb', textDecoration: 'none', borderRadius: '6px', display: 'inline-flex', alignItems: 'center', fontWeight: '500', border: '1px solid #bfdbfe' }}>
                            {clase.label}
                          </a>
                        ))}
                      </>
                    )}

                    {/* Renderizado de Checkouts y Embudos de 6 Días */}
                    {product.preciosAlternativos && product.preciosAlternativos.length > 0 && (
                      <>
                        <div style={{ fontSize: '0.75rem', fontWeight: '700', color: '#64748b', paddingLeft: '0.2rem', marginTop: '0.2rem' }}>MÁS OPCIONES DE ACCESO:</div>
                        {product.preciosAlternativos.map((opcion, index) => (
                          <a key={index} href={opcion.url} target="_blank" rel="noreferrer" style={{ width: '100%', padding: '0.45rem', fontSize: '0.8rem', backgroundColor: '#ffffff', color: '#334155', textDecoration: 'none', borderRadius: '6px', display: 'inline-flex', alignItems: 'center', fontWeight: '500', border: '1px solid #e2e8f0' }}>
                            {opcion.label}
                          </a>
                        ))}
                      </>
                    )}
                  </div>
                )}
              </div>
            )}

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
        <article className="feature-card recommended-card" key={product.id} style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
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
              /* RENDERIZADO POR DEFECTO PARA TODOS LOS DEMÁS PRODUCTOS SEPARADOS (INCLUYE RESINA PRO Y BÁSICO) */
              <>
                {/* BOTÓN DE DESCUENTO (Aparece arriba en verde con máxima prioridad si existe urlDescuento) */}
                {(product.urlDescuento || product.urlMensual) && (
                  <a 
                    className="btn-primary" 
                    href={product.urlDescuento || product.urlMensual} 
                    target="_blank" 
                    rel="noreferrer"
                    style={{ width: '100%', padding: '0.65rem', fontSize: '0.9rem', background: 'linear-gradient(to right, #10b981, #059669)', textDecoration: 'none', borderRadius: '12px', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontWeight: '600', color: 'white' }}
                  >
                    {product.id === 1 ? '🚀 Iniciar Plan Mensual' : `🔥 Inscripción con Oferta (${product.id === 3600856 ? '37$' : '25$'})`}
                  </a>
                )}

                {/* BOTÓN PRINCIPAL / ESTÁNDAR (Página de ventas general al fondo en color gris) */}
                <a 
                  className="btn-secondary" 
                  href={product.url} 
                  target="_blank" 
                  rel="noreferrer"
                  style={(product.urlDescuento || product.urlMensual) ? { width: '100%', padding: '0.65rem', fontSize: '0.85rem', backgroundColor: '#f8fafc', borderColor: '#cbd5e1', color: '#475569', textDecoration: 'none', borderRadius: '12px', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontWeight: '600', border: '2px solid #cbd5e1' } : {}}
                >
                  {product.buttonText}
                </a>

                {/* PESTAÑA DESPLEGABLE DINÁMICA PARA LOS LINKS EXTRAS (REMARKETING, CLASES, USA) */}
                {product.tieneOpcionesExtra && (
                  <div style={{ width: '100%', marginTop: '0.2rem' }}>
                    <button
                      type="button"
                      onClick={() => toggleMenu(product.id)}
                      style={{ width: '100%', padding: '0.5rem', fontSize: '0.8rem', backgroundColor: '#f1f5f9', color: '#1e293b', border: '1px dashed #cbd5e1', borderRadius: '8px', cursor: 'pointer', fontWeight: '600', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.3rem' }}
                    >
                      {openProductMenu === product.id ? '🔼 Ocultar opciones de ahorro' : '🔽 Ver más precios y clases gratis'}
                    </button>

                    {/* Contenido desplegable */}
                    {openProductMenu === product.id && (
                      <div style={{ backgroundColor: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '8px', padding: '0.4rem', marginTop: '0.4rem', display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
                        
                        {/* Renderizado de Clases Gratuitas (si el producto las tiene) */}
                        {product.clases && product.clases.length > 0 && (
                          <>
                            <div style={{ fontSize: '0.75rem', fontWeight: '700', color: '#64748b', paddingLeft: '0.2rem', marginTop: '0.1rem' }}>LECCIONES EN VIVO:</div>
                            {product.clases.map((clase, index) => (
                              <a key={index} href={clase.url} target="_blank" rel="noreferrer" style={{ width: '100%', padding: '0.45rem', fontSize: '0.8rem', backgroundColor: '#eff6ff', color: '#2563eb', textDecoration: 'none', borderRadius: '6px', display: 'inline-flex', alignItems: 'center', fontWeight: '500', border: '1px solid #bfdbfe' }}>
                                {clase.label}
                              </a>
                            ))}
                          </>
                        )}

                        {/* Renderizado de Precios de Descuento Alternativos */}
                        {product.preciosAlternativos && product.preciosAlternativos.length > 0 && (
                          <>
                            <div style={{ fontSize: '0.75rem', fontWeight: '700', color: '#64748b', paddingLeft: '0.2rem', marginTop: '0.2rem' }}>MÁS OPCIONES DE COMPRA:</div>
                            {product.preciosAlternativos.map((opcion, index) => (
                              <a key={index} href={opcion.url} target="_blank" rel="noreferrer" style={{ width: '100%', padding: '0.45rem', fontSize: '0.8rem', backgroundColor: '#ffffff', color: '#334155', textDecoration: 'none', borderRadius: '6px', display: 'inline-flex', alignItems: 'center', fontWeight: '500', border: '1px solid #e2e8f0' }}>
                                {opcion.label}
                              </a>
                            ))}
                          </>
                        )}
                      </div>
                    )}
                  </div>
                )}
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