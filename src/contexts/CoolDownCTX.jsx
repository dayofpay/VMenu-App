import { createContext, useState, useEffect } from 'react';

export const CooldownContext = createContext();

export const CooldownProvider = ({ children }) => {
  const [cooldowns, setCooldowns] = useState({});
  const [remainingTimes, setRemainingTimes] = useState({});
  
  const COOLDOWN_TIME = 60;
  
  useEffect(() => {
    const interval = setInterval(() => {
      const currentTime = Date.now();
      const updatedTimes = {};
      let hasActiveCooldowns = false;
      
      Object.keys(cooldowns).forEach(key => {
        const remainingSeconds = Math.max(0, Math.ceil((cooldowns[key] + (COOLDOWN_TIME * 1000) - currentTime) / 1000));
        if (remainingSeconds > 0) {
          updatedTimes[key] = remainingSeconds;
          hasActiveCooldowns = true;
        }
      });
      
      setRemainingTimes(updatedTimes);
      
      if (!hasActiveCooldowns) {
        clearInterval(interval);
      }
    }, 1000);
    
    return () => clearInterval(interval);
  }, [cooldowns]);
  
  return (
    <CooldownContext.Provider value={{ cooldowns, setCooldowns, remainingTimes,setRemainingTimes }}>
      {children}
    </CooldownContext.Provider>
  );
};