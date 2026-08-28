import { useEffect, useState } from 'react';
// 📦 Importamos el cliente oficial local que instalamos desde tu terminal
import { createClient } from '@supabase/supabase-js';
import './App.css';

// ⚙️ Credenciales de tu proyecto de Supabase
const SUPABASE_URL = "https://iuygoavokzrqirwapqve.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Iml1eWdvYXZva3pycWlyd2FwcXZlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODczMjMwMDcsImV4cCI6MjEwMjg5OTAwN30.ivf-iSXwp84YO9Qp7JTzKoB95wrzLJRHYFfzKmzftys";

const supabaseClient = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

export default function App() {
  const hotmartUrl = 'https://go.hotmart.com/N106692793T';
  const downloadUrl = 'https://educaciononline.netlify.app/gracias.html';
  
  // ESTADOS DEL COMPONENTE
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [openProductMenu, setOpenProductMenu] = useState(null);
  
  // 🔥 NUEVO ESTADO: Aquí se guardarán los productos dinámicos de la BD
  const [recommendedProducts, setRecommendedProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // 📡 LLAMADA A SUPABASE AL CARGAR EL COMPONENTE
  useEffect(() => {
    async function obtenerProductosBD() {
      try {
        const { data, error } = await supabaseClient
          .from('cursos')
          .select('*');

        if (error) throw error;

        // Si hay datos, actualizamos el catálogo en tiempo real
        if (data) {
          setRecommendedProducts(data);
        }
      } catch (err) {
        console.error("Error cargando productos desde Supabase:", err.message);
      } finally {
        setLoading(false);
      }
    }

    obtenerProductosBD();
  }, []);

  const toggleMenu = (productId) => {
    setOpenProductMenu(openProductMenu === productId ? null : productId);
  };

  // ESCUCHA CUANDO SE ABRE EL CHAT PARA ENVIAR EL MENSAJE DE BIENVENIDA
  // 🚀 ESCUCHA OPTIMIZADA: Envía el saludo exacto al cargarse el iframe sin demoras ni cuelgues
  useEffect(() => {
    if (isChatOpen) {
      const enviarSaludoNativo = () => {
        const iframe = document.querySelector('iframe[title="Chatbot AI"]');
        if (iframe && iframe.contentWindow) {
          const saludo = "Hola 👋 Soy el asistente virtual de Portal EducaDG. Estoy aquí para ayudarte a encontrar los mejores cursos online y programas ideales para llevar tu talento al siguiente nivel. 🚀 ¿En qué especialización o curso te gustaría recibir información hoy?";
          
          // Enviamos el saludo usando el canal seguro postMessage
          iframe.contentWindow.postMessage({ type: 'INIT_CHAT', text: saludo }, '*');
        }
      };

      // Buscamos el iframe de forma inmediata en el DOM
      const iframe = document.querySelector('iframe[title="Chatbot AI"]');
      
      if (iframe) {
        // Si el iframe ya está en el DOM pero aún carga internamente, esperamos su evento onload
        iframe.onload = enviarSaludoNativo;
        
        // Ejecución de respaldo por si el navegador ya lo tenía pre-renderizado en caché
        enviarSaludoNativo();
      }
    }
  }, [isChatOpen]);


  // Si está cargando los datos de Supabase, puedes mostrar un pequeño indicador opcional
if (loading) {
  return (
    <div className="loading-screen_neon">
      <div className="neon-spinner-container">
        {/* SVG compacto con puntos de tamaño progresivo real */}
        <svg className="neon-svg-ring" viewBox="0 0 100 100">
          <g className="neon-dots-group">
            {/* Puntos que crecen progresivamente en tamaño (Radio 'r' de menor a mayor) y opacidad */}
            <circle cx="50" cy="10" r="0.8" opacity="0.10" />
            <circle cx="70" cy="15" r="1.1" opacity="0.15" />
            <circle cx="85" cy="30" r="1.4" opacity="0.22" />
            <circle cx="90" cy="50" r="1.8" opacity="0.30" />
            <circle cx="85" cy="70" r="2.2" opacity="0.40" />
            <circle cx="70" cy="85" r="2.6" opacity="0.52" />
            <circle cx="50" cy="90" r="3.1" opacity="0.65" />
            <circle cx="30" cy="85" r="3.6" opacity="0.78" />
            <circle cx="15" cy="70" r="4.2" opacity="0.90" />
            <circle cx="10" cy="50" r="4.8" opacity="1.00" />
          </g>
        </svg>
        {/* Texto central adaptado al nuevo tamaño pequeño */}
        <span className="neon-loading-text-center">LOADING</span>
      </div>
      
      {/* Mensajes inferiores institucionales */}
      <h2 className="loading-text_neon">Cargando catálogo oficial de Portal EducaDG</h2>
      <p className="loading-subtext_neon">Por favor, espera un momento...</p>
    </div>
  );
}

  // A partir de aquí sigue el bloque de tu return() con el diseño de tus tarjetas tradicionales...


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
 
<section id="productos-recomendados" className="features-section recommended-section" style={{ padding: '2rem 1rem', fontFamily: 'sans-serif' }}>
  <div className="section-title" style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}>
    {/* 1. Título e introducción */}
    <h2 style={{ fontSize: '1.8rem', color: '#1f007d', marginBottom: '1rem', fontWeight: 'bold' }}>
      🎓 Catálogo de Especializaciones Profesionales
    </h2>
    <p style={{ color: '#666', lineHeight: '1.6', fontSize: '1rem', marginBottom: '1.5rem' }}>
      Domina los oficios más lucrativos y demandados del mercado actual. Elige tu curso, estudia a tu propio ritmo y obtén tu certificación internacional. Empieza a construir tu futuro hoy mismo.
    </p>
    {/* 2. Badge/Etiqueta estilizada para la garantía */}
    <div style={{
      display: 'inline-flex',
      alignItems: 'center',
      gap: '8px',
      backgroundColor: '#06095f',
      border: '1px solid #400386',
      color: '#ffffff',
      padding: '6px 16px',
      borderRadius: '9999px',
      fontSize: '0.85rem',
      fontWeight: '600',
      marginTop: '0.5rem',
      boxShadow: '0 1px 2px rgba(0,0,0,0.05)'
    }}>
      <span>"Tu inversión está 100% protegida con nuestra garantía de satisfacción."</span>
    </div>
   {/* 3. Cuadro destacado para la propuesta de valor (Optimizado para Conversión) */}
<div style={{
  backgroundColor: '#f0fdf4', // 🟢 Fondo verde sutil (Asociado a éxito, avance y seguridad)
  border: '1px solid #16a34a', // Borde verde esmeralda profesional
  borderRadius: '12px',
  padding: '1.25rem',
  margin: '1.5rem auto',
  maxWidth: '650px',
  boxShadow: '0 2px 8px rgba(22,163,74,0.08)',
  display: 'flex',
  alignItems: 'center',
  gap: '12px',
  textAlign: 'left'
}}>
  {/* 💡 Cambiamos la prohibición por el foco del descubridor/curador experto */}
  <span style={{ fontSize: '1.5rem', backgroundColor: '#dcfce7', padding: '6px 10px', borderRadius: '8px' }}>💡</span>
  <p style={{ margin: 0, color: '#166534', fontSize: '0.95rem', lineHeight: '1.5' }}>
    <strong style={{ color: '#14532d' }}>En Portal EducaDG no seleccionamos cursos al azar:</strong> Los auditamos y organizamos por afinidad temática. Nuestro objetivo es garantizar que pases de un <em>"quiero aprender"</em> a <em>"este es el programa exacto que se ajusta a mi nivel, mi presupuesto y mi país"</em> con total seguridad.
  </p>
</div>


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
          {product.badge && <span className="recommended-badge">{product.badge}</span>}
          <p>{product.description}</p>
          
          {/* Contenedor flexible de botones (Diseño Original Intacto) */}
<div className="card-actions" style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', width: '100%', marginTop: 'auto' }}>
  
  {/* 🚀 BOTÓN 1: PLAN MENSUAL (Gradiente Azul/Morado) */}
  {product.urlMensual && (
    <a 
      className="btn-primary" 
      href={product.urlMensual} 
      target="_blank" 
      rel="noreferrer"
      style={{ width: '100%', padding: '0.75rem', fontSize: '0.95rem', background: 'linear-gradient(to right, #2563eb, #7c3aed)', textDecoration: 'none', borderRadius: '12px', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontWeight: '600', color: 'white' }}
    >
      {product.buttonTextMensual || '🚀 Iniciar Plan Mensual'}
    </a>
  )}

  {/* 🏷️ BOTÓN 2: DESCUENTO / PROGRAMACIÓN INICIAL (Añade este bloque para corregir el error) */}
  {product.urlDescuento && (
    <a 
      className="btn-discount" 
      href={product.urlDescuento} 
      target="_blank" 
      rel="noreferrer"
      style={{ width: '100%', padding: '0.75rem', fontSize: '0.95rem', background: 'linear-gradient(to right, #10b981, #059669)', textDecoration: 'none', borderRadius: '12px', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontWeight: '600', color: 'white' }}
    >
      {product.buttonTextDescuento || '🔍 Ver Curso con Descuento'}
    </a>
  )}

  {/* 💻 BOTÓN 3: PRINCIPAL / ESTÁNDAR DE LA TARJETA */}
  <a 
    className="btn-secondary" 
    href={product.url} 
    target="_blank" 
    rel="noreferrer"
    style={{ width: '100%', padding: '0.75rem', fontSize: '0.9rem', backgroundColor: '#f8fafc', borderColor: '#cbd5e1', color: '#475569', textDecoration: 'none', borderRadius: '12px', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontWeight: '600', border: '2px solid #cbd5e1' }}
  >
    {product.buttonText || '🔍 Ver Temario Completo'}
            </a>

            {/* PESTAÑA DESPLEGABLE DINÁMICA PARA APPS RENTABLES / DESARROLLO */}
            {product.tieneOpcionesExtra && (
              <div style={{ width: '100%', marginTop: '0.1rem' }}>
                <button
                  type="button"
                  onClick={() => toggleMenu(product.id)}
                  style={{ width: '100%', padding: '0.5rem', fontSize: '0.8rem', backgroundColor: '#f1f5f9', color: '#1e293b', border: '1px dashed #cbd5e1', borderRadius: '8px', cursor: 'pointer', fontWeight: '600', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.3rem' }}
                >
                  {openProductMenu === product.id ? '🔼 Ocultar contenido y accesos directos' : '🔽 Ver clases gratis y checkout pago único'}
                </button>

                {/* Contenido desplegable (Diseño Original con Texto en Negrita Corregido) */}
                {openProductMenu === product.id && (
                  <div style={{ backgroundColor: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '8px', padding: '0.4rem', marginTop: '0.4rem', display: 'flex', flexDirection: 'column', gap: '0.35rem', textAlign: 'left' }}>
                    
                    {/* Renderizado de Clases / Embudos Gratuitos */}
                    {product.clases && product.clases.length > 0 && (
                      <>
                        <div style={{ fontSize: '0.75rem', fontWeight: '700', color: '#64748b', paddingLeft: '0.2rem', marginTop: '0.1rem' }}>MATERIAL GRATUITO Y CLASES:</div>
                        {product.clases.map((clase, index) => (
                          <a 
                            key={index} 
                            href={clase.url} 
                            target="_blank" 
                            rel="noreferrer" 
                            style={{ width: '100%', padding: '0.45rem', fontSize: '0.8rem', backgroundColor: '#eff6ff', color: '#2563eb', textDecoration: 'none', borderRadius: '6px', display: 'inline-flex', alignItems: 'center', fontWeight: '700', border: '1px solid #bfdbfe' }}
                          >
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
                          <a 
                            key={index} 
                            href={opcion.url} 
                            target="_blank" 
                            rel="noreferrer" 
                            style={{ width: '100%', padding: '0.45rem', fontSize: '0.8rem', backgroundColor: '#ffffff', color: '#334155', textDecoration: 'none', borderRadius: '6px', display: 'inline-flex', alignItems: 'center', fontWeight: '700', border: '1px solid #e2e8f0' }}
                          >
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
  {/* BOTÓN DE DESCUENTO O MENSUAL (100% Dinámico desde tu formulario de Supabase) */}
  {(product.urlDescuento || product.urlMensual) && (
    <a 
      className="btn-primary" 
      href={product.urlDescuento || product.urlMensual} 
      target="_blank" 
      rel="noreferrer"
      style={{ width: '100%', padding: '0.65rem', fontSize: '0.9rem', background: 'linear-gradient(to right, #10b981, #059669)', textDecoration: 'none', borderRadius: '12px', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontWeight: '600', color: 'white' }}
    >
      {/* 🚀 CORRECCIÓN: Si hay texto de descuento guardado, usa ese; si es mensual usa el mensual, de lo contrario un texto de respaldo */}
      {product.urlDescuento 
        ? (product.buttonTextDescuento || '🔥 Inscripción Lanzamiento') 
        : (product.buttonTextMensual || '🚀 Iniciar Plan Mensual')
      }
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
                              <a key={index} href={clase.url} target="_blank" rel="noreferrer" style={{ width: '100%', padding: '0.45rem', fontSize: '0.8rem', backgroundColor: '#eff6ff', color: '#2563eb', textDecoration: 'none', borderRadius: '6px', display: 'inline-flex', alignItems: 'center', fontWeight: '700', border: '1px solid #bfdbfe' }}>
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
                              <a key={index} href={opcion.url} target="_blank" rel="noreferrer" style={{ width: '100%', padding: '0.45rem', fontSize: '0.8rem', backgroundColor: '#ffffff', color: '#334155', textDecoration: 'none', borderRadius: '6px', display: 'inline-flex', alignItems: 'center', fontWeight: '700', border: '1px solid #e2e8f0' }}>
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
  <h3 className="category-title">🩺 Salud y Bienestar</h3>
  <div className="features-grid catalog-grid">
    {recommendedProducts
      .filter((product) => product.category === 'salud')
      .map((product) => (
        <article className="feature-card recommended-card" key={product.id} style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
          <img className="card-image" src={product.image} alt={product.title} loading="lazy" />
          <h3>{product.title}</h3>
          <span className="recommended-badge">{product.badge}</span>
          <p>{product.description}</p>
          
          {/* Contenedor dinámico de botones flexible para Salud */}
          <div className="card-actions" style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem', width: '100%', marginTop: 'auto' }}>
            
            {/* CONDICIONAL EXCLUSIVA PARA EL COMBO ELITE CON DOS BOTONES */}
            {product.urlBoton1 && product.urlBoton2 ? (
              <>
                {/* Botón 1 (Estilo Azul Destacado) */}
                <a 
                  className="btn-secondary" 
                  href={product.urlBoton1} 
                  target="_blank" 
                  rel="noreferrer"
                  style={{ width: '100%', padding: '0.65rem', fontSize: '0.85rem', backgroundColor: '#ffffff', color: '#1d4ed8', borderColor: '#3b82f6', textDecoration: 'none', borderRadius: '12px', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontWeight: '600', border: '2px solid #3b82f6' }}
                >
                  {product.textBoton1}
                </a>

                {/* Botón 2 (Estilo Gris Estandár) */}
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
              /* RENDERIZADO POR DEFECTO PARA TODOS LOS DEMÁS PRODUCTOS SEPARADOS */
              <>
                {/* BOTÓN DE DESCUENTO O MENSUAL (100% Dinámico desde tu formulario) */}
                {(product.urlDescuento || product.urlMensual) && (
                  <a 
                    className="btn-primary" 
                    href={product.urlDescuento || product.urlMensual} 
                    target="_blank" 
                    rel="noreferrer"
                    style={{ width: '100%', padding: '0.65rem', fontSize: '0.9rem', background: 'linear-gradient(to right, #10b981, #059669)', textDecoration: 'none', borderRadius: '12px', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontWeight: '600', color: 'white' }}
                  >
                    {product.urlDescuento 
                      ? (product.buttonTextDescuento || '🔥 Inscripción Lanzamiento') 
                      : (product.buttonTextMensual || '🚀 Iniciar Plan Mensual')
                    }
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

                {/* PESTAÑA DESPLEGABLE DINÁMICA PARA LOS LINKS EXTRAS (REMARKETING, CLASES) */}
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
                        
                        {/* Renderizado de Clases Gratuitas */}
                        {product.clases && product.clases.length > 0 && (
                          <>
                            <div style={{ fontSize: '0.75rem', fontWeight: '700', color: '#64748b', paddingLeft: '0.2rem', marginTop: '0.1rem' }}>RECURSOS GRATUITOS:</div>
                            {product.clases.map((clase, index) => (
                              <a key={index} href={clase.url} target="_blank" rel="noreferrer" style={{ width: '100%', padding: '0.45rem', fontSize: '0.8rem', backgroundColor: '#eff6ff', color: '#2563eb', textDecoration: 'none', borderRadius: '6px', display: 'inline-flex', alignItems: 'center', fontWeight: '700', border: '1px solid #bfdbfe' }}>
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
                              <a key={index} href={opcion.url} target="_blank" rel="noreferrer" style={{ width: '100%', padding: '0.45rem', fontSize: '0.8rem', backgroundColor: '#ffffff', color: '#334155', textDecoration: 'none', borderRadius: '6px', display: 'inline-flex', alignItems: 'center', fontWeight: '700', border: '1px solid #e2e8f0' }}>
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
</section> {/* Cierre de #productos-recomendados */}


      {/* Sección: Preguntas Frecuentes estilo Dos Columnas */}
      <section id="faq" className="faq-section">
        <div className="faq-container">
          
          {/* Columna Izquierda: Títulos y Contacto */}
          <div className="faq-sidebar">
            <span className="faq-tag">PREGUNTAS FRECUENTES</span>
            <h2 className="faq-title">Antes de explorar el catálogo</h2>
            <p className="faq-text">
              Si te queda alguna duda, escríbenos a{' '}
              <a href="mailto:portaleducadg@gmail.com" className="faq-email">portaleducadg@gmail.com</a>
              {' '}o visita nuestras redes sociales:
            </p>
            
            {/* Iconos de Redes Sociales */}
            <div className="faq-socials">
              <a href="https://web.facebook.com/portaleducadg" target="_blank" rel="noreferrer" aria-label="Facebook" className="social-icon face">
                <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
                <span className="social-name">Facebook</span>
              </a>
              
              <a href="https://www.instagram.com/portaleducadg" target="_blank" rel="noreferrer" aria-label="Instagram" className="social-icon inst">
                <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.051.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
                <span className="social-name">Instagram</span>
              </a>
              
              <a href="https://www.tiktok.com/@educadg" target="_blank" rel="noreferrer" aria-label="TikTok" className="social-icon tiktok">
                <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor"><path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .74.1v-3.5a6.33 6.33 0 0 0-4.34 1.5 6.34 6.34 0 0 0-1.9 4.78 6.34 6.34 0 0 0 6.34 6.35 6.35 6.35 0 0 0 6.35-6.35V7.95a11.23 11.23 0 0 0 6.63 2.19v-3.4a7.86 7.86 0 0 1-3.71-2.05z"/></svg>
                <span className="social-name">TikTok</span>
              </a>
              {/* Canal de WhatsApp Corregido */}
              <a href="https://whatsapp.com/channel/0029VbDLItMEKyZ8AGixbT3L" target="_blank" rel="noreferrer" aria-label="WhatsApp" className="social-icon whats">
                <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
                  <path d="M12.011 2c-5.514 0-9.99 4.477-9.99 9.99 0 1.76.456 3.415 1.256 4.869L2 22l5.314-1.395c1.393.762 2.976 1.196 4.664 1.196 5.517 0 9.991-4.473 9.991-9.99S17.528 2 12.011 2zm5.836 14.129c-.242.678-1.215 1.24-1.946 1.314-.492.05-1.133.079-3.277-.812-2.736-1.139-4.46-3.92-4.597-4.103-.135-.183-1.127-1.493-1.127-2.843 0-1.35.705-2.014.957-2.292.25-.278.56-.353.748-.353.187 0 .375.004.55.016.183.012.43-.07.671.507.242.583.824 2.011.896 2.158.07.146.117.316.019.511-.097.195-.148.316-.296.488-.148.176-.312.406-.44.547-.152.152-.312.32-.132.628.18.312.8 1.343 1.742 2.183.181.161.434.354.721.508 1.196.634 1.838.745 2.146.852.4.137.64.043.832-.15.226-.226.856-.995 1.085-1.342.226-.347.456-.289.77-.175.312.113 1.98.933 2.32 1.101.34.168.567.246.652.391.086.145.086.832-.156 1.511z"/>
                </svg>
                <span className="social-name">Canal WhatsApp</span>
              </a>

            </div>


          </div>

          {/* Columna Derecha: El Bloque de Acordeones */}
          <div className="faq-content-box">
            <details className="faq-item">
              <summary className="faq-question">¿Qué es exactamente Portal EducaDG?</summary>
              <div className="faq-answer">
                <p>Somos una plataforma que recopila y recomienda los mejores cursos digitales y programas interactivos del mercado, ayudándote a encontrar la formación ideal para tu crecimiento personal y profesional.</p>
                <p>Reunimos cursos en español que viven en distintas plataformas de infoproductos y los organizamos por grandes temáticas para que sea más fácil comparar opciones antes de comprar.</p>
              </div>
            </details>

            <details className="faq-item">
              <summary className="faq-question">¿Cuesta algo usar Portal EducaDG?</summary>
              <div className="faq-answer">
                <p>No, el acceso y uso de nuestro catálogo de recomendaciones es completamente gratuito para todos los usuarios.</p>
                <p>Sólo pagas cuando decides matricularte en un curso concreto, y el pago se hace directamente al proveedor a través del enlace que mostramos en cada ficha.</p>
              </div>
            </details>

            <details className="faq-item">
              <summary className="faq-question">¿Puedo confiar en la compra? ¿Hay garantía?</summary>
              <div className="faq-answer">
                <p>Absolutamente. Todos los productos recomendados se procesan a través de Hotmart, una plataforma líder y segura a nivel mundial que cuenta con garantía de devolución (generalmente de 7 a 15 días) si el producto no cumple tus expectativas.</p>
                <p>La compra la haces en el sitio del proveedor, no en Portal EdicaDG</p>
              </div>
            </details>

            <details className="faq-item">
              <summary className="faq-question">¿Con qué frecuencia actualizan el catálogo?</summary>
              <div className="faq-answer">
                <p>Actualizamos nuestro catálogo de manera constante, evaluando nuevos cursos y herramientas para asegurar que siempre tengas acceso a las opciones más cotizadas y actualizadas.</p>
                <p>Eliminamos los que pierden soporte y añadimos nuevos lanzamientos que encajan con nuestras rutas</p>
              </div>
            </details>

            <details className="faq-item">
              <summary className="faq-question">¿Puedo sugerir un curso o tengo una consulta?</summary>
              <div className="faq-answer">
                  <p>¡Por supuesto! Nos encanta escuchar a nuestra comunidad. Puedes escribirnos directamente a nuestro correo oficial{' '}
                  <a href="mailto:portaleducadg@gmail.com" className="faq-email">portaleducadg@gmail.com</a> o contactarnos a través de nuestras redes sociales.
                </p>
                <p style={{ marginTop: '8px' }}>Leemos cada mensaje de inmediato y, si el curso que sugieres cumple con nuestros estándares, lo priorizamos para darte una respuesta pronta. Te enviaremos el enlace de acceso directo al curso en cuestión de minutos para que no pierdas tiempo y puedas asegurar tu cupo de inmediato. ¡Quédate atento a tus mensajes!</p>
                </div>
            </details>
          </div>

        </div>
      </section>


 

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


{/* 🖥️ VENTANA FLOTANTE DEL CHAT (MODAL CON IFRAME COREGIDO Y RESPONSIVO) */}
{isChatOpen && (
  <div style={{
    position: 'fixed',
    bottom: '95px', // Se posiciona justo encima del botón
    right: '25px',
    width: '380px', // Ancho ideal para computadoras
    maxWidth: 'calc(100vw - 50px)', // 👈 CLAVE 1: En celulares se encoge dejando 25px libres a cada lado
    height: '500px', // Altura perfecta para PC
    maxHeight: '70vh', // 👈 CLAVE 2: En celulares limita la altura para que el teclado de Android no lo tape
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
      justifyContent: 'space-between'
    }}>
      <span style={{ fontWeight: '600', fontSize: '14px' }}>🤖 Consultor Portal EducaDG</span>
      {/* Botón para cerrar la ventana del chat */}
      <button 
        onClick={() => setIsChatOpen(false)}
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
      style={{ width: '100%', height: 'calc(100% - 45px)', border: 'none' }}
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