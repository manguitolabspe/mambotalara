import { useState, useEffect } from 'react';

export function useStoreStatus() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const check = () => {
      const p = new Date();
      const n = p.toLocaleTimeString('en-US', { timeZone: 'America/Lima', hour12: false });
      const [h, m] = n.split(':').map(Number);
      const d = p.getDay();
      
      let open = false;
      if (d >= 1 && d <= 4) { // Lunes a Jueves: 12:00 a 23:00
        if (h >= 12 && h < 23) open = true;
      } else if (d === 5 || d === 6) { // Viernes a Sabado: 12:00 a 00:00
        if (h >= 12) open = true;
      } else if (d === 0) { // Domingo: 11:00 a 23:00
        if (h >= 11 && h < 23) open = true;
      }
      setIsOpen(open);
    };
    
    check();
    const interval = setInterval(check, 60000);
    return () => clearInterval(interval);
  }, []);

  return isOpen;
}
