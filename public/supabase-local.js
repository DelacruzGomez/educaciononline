// Biblioteca Supabase simplificada para entornos locales con restricciones de CDN
(function(global) {
    if (global.supabase) return;
    
    global.supabase = {
        createClient: function(url, key) {
            const defaultHeaders = {
                'apikey': key,
                'Authorization': 'Bearer ' + key,
                'Content-Type': 'application/json'
            };
            
            // Función auxiliar interna para las peticiones HTTP seguras
            async function makeRequest(endpoint, method, body = null) {
                const config = {
                    method: method,
                    headers: defaultHeaders
                };
                if (body) config.body = JSON.stringify(body);
                try {
                    const response = await fetch(url + endpoint, config);
                    if (!response.ok) {
                        const errData = await response.json().catch(() => ({}));
                        throw new Error(errData.message || 'Error en la base de datos');
                    }
                    
                    // 🚀 CORRECCIÓN: Si el servidor responde vacío (No Content) o éxito sin cuerpo, evitamos el crash
                    if (response.status === 204 || response.status === 201) {
                        return { data: null, error: null };
                    }
                    
                    // Validamos si hay texto en la respuesta antes de parsear
                    const text = await response.text();
                    const data = text ? JSON.parse(text) : null;
                    return { data: data, error: null };
                } catch (err) {
                    return { data: null, error: err };
                }
            }


            return {
                auth: {
                    onAuthStateChange: function(callback) {
                        const tokenKey = 'sb-' + url.replace('https://', '').split('.')[0] + '-auth-token';
                        const checkSession = () => {
                            const sessionData = localStorage.getItem(tokenKey);
                            if (sessionData) {
                                try {
                                    const parsed = JSON.parse(sessionData);
                                    if (parsed && parsed.user) {
                                        callback('SIGNED_IN', parsed);
                                        return;
                                    }
                                } catch(e) {}
                            }
                            callback('SIGNED_OUT', null);
                        };
                        
                        // Escucha de eventos de inicio y cierre de sesión local
                        window.addEventListener('storage', (e) => {
                            if (e.key === tokenKey) checkSession();
                        });
                        setTimeout(checkSession, 100);
                        return { data: { subscription: { unsubscribe: () => {} } } };
                    },
                    signInWithPassword: async function(credentials) {
                        const tokenKey = 'sb-' + url.replace('https://', '').split('.')[0] + '-auth-token';
                        const res = await makeRequest('/auth/v1/token?grant_type=password', 'POST', {
                            email: credentials.email,
                            password: credentials.password
                        });
                        if (!res.error && res.data) {
                            localStorage.setItem(tokenKey, JSON.stringify(res.data));
                            window.dispatchEvent(new Event('storage'));
                            return { data: res.data, error: null };
                        }
                        return { data: { user: null, session: null }, error: res.error };
                    },
                    signOut: async function() {
                        const tokenKey = 'sb-' + url.replace('https://', '').split('.')[0] + '-auth-token';
                        localStorage.removeItem(tokenKey);
                        window.dispatchEvent(new Event('storage'));
                        return { error: null };
                    }
                },
                from: function(tableName) {
                    return {
                        upsert: async function(values) {
                            // 🚀 Agregamos de forma segura la regla de combinación para Hotmart/Supabase
                            defaultHeaders['Prefer'] = 'resolution=merge-duplicates';
                            
                            const res = await makeRequest('/rest/v1/' + tableName, 'POST', values);
                            
                            // 🧹 Limpiamos la cabecera para que las siguientes consultas funcionen limpio
                            delete defaultHeaders['Prefer'];
                            return res;
                        }
                    };
                }
            };
        }
    };
})(typeof window !== 'undefined' ? window : this);

