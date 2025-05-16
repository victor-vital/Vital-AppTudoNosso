import React, { createContext, useState, useContext } from 'react';

const AppContext = createContext();

export function AppProvider({ children }) {
  const [clickedItems, setClickedItems] = useState({
    anunciosGratis: false,
    supermercados: false,
    dMaisLojas: false,
    utilidadePublica: false,
    comercioNosso: false,
  });

  const [currentScreen, setCurrentScreen] = useState('TELA INICIAL');
  const [downloads, setDownloads] = useState(123456);
  const [views, setViews] = useState(123456789);

  const markAsClicked = (item) => {
    setClickedItems(prev => ({ ...prev, [item]: true }));
  };

  return (
    <AppContext.Provider value={{
      clickedItems,
      markAsClicked,
      currentScreen,
      setCurrentScreen,
      downloads,
      views,
    }}>
      {children}
    </AppContext.Provider>
  );
}

export const useApp = () => useContext(AppContext);