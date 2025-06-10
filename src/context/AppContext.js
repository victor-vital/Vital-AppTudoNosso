import React, { createContext, useContext, useState, useEffect } from 'react';

const AppContext = createContext();

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};

export const AppProvider = ({ children }) => {
  const [clickedItems, setClickedItems] = useState({});
  const [currentScreen, setCurrentScreen] = useState('TELA INICIAL');
  const [downloads] = useState(123456789);
  const [views] = useState(987654321);
  
  // Timer global e contínuo
  const [timer, setTimer] = useState('00:00:00');
  const [seconds, setSeconds] = useState(0);

  // Inicia o timer quando o app é aberto e nunca para
  useEffect(() => {
    const interval = setInterval(() => {
      setSeconds(s => s + 1);
    }, 1000);

    // Cleanup - só vai parar quando o app for fechado
    return () => clearInterval(interval);
  }, []); // Array vazio garante que só executa uma vez

  // Atualiza o formato do timer sempre que os segundos mudam
  useEffect(() => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    
    setTimer(
      `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
    );
  }, [seconds]);

  const markAsClicked = (item) => {
    setClickedItems(prev => ({
      ...prev,
      [item]: true
    }));
  };

  const value = {
    clickedItems,
    markAsClicked,
    currentScreen,
    setCurrentScreen,
    downloads,
    views,
    timer, // Timer global
    seconds, // Segundos para debug se necessário
  };

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
};