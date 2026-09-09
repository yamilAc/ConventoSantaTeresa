import { createContext, useContext, useEffect, useState, useCallback } from 'react';

const SettingsContext = createContext(null);

export function SettingsProvider({ children }) {
  const [mantenimiento, setMantenimiento] = useState(false);
  const [whatsapp, setWhatsapp] = useState('');
  const [loaded, setLoaded] = useState(false);

  const refresh = useCallback(async () => {
    try {
      const res = await fetch('/api/settings');
      const data = await res.json();
      setMantenimiento(!!data.mantenimiento);
      setWhatsapp(data.whatsapp || '');
    } catch {
      // si falla, asumimos que el sitio está disponible normalmente
      setMantenimiento(false);
    } finally {
      setLoaded(true);
    }
  }, []);

  useEffect(() => { refresh(); }, [refresh]);

  return (
    <SettingsContext.Provider value={{ mantenimiento, setMantenimiento, whatsapp, setWhatsapp, loaded, refresh }}>
      {children}
    </SettingsContext.Provider>
  );
}

export function useSettings() {
  return useContext(SettingsContext);
}
