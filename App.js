import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  StatusBar,
  SafeAreaView,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { normalize, wp, hp } from './src/utils/responsive';
import { AppProvider, useApp } from './src/context/AppContext';
import SupermercadosScreen from './src/screens/SupermercadosScreen';
import VerAnunciosScreen from './src/screens/VerAnunciosScreen';

function MainScreen() {
  const {
    clickedItems,
    markAsClicked,
    currentScreen,
    setCurrentScreen,
    downloads,
    views,
  } = useApp();
  
  const [timer, setTimer] = useState('00:00:00');
  const [seconds, setSeconds] = useState(0);
  const [navigation, setNavigation] = useState('Home');

  useEffect(() => {
    const interval = setInterval(() => {
      setSeconds(s => s + 1);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    
    setTimer(
      `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
    );
  }, [seconds]);

  const handleNavigation = (direction) => {
    if (direction === 'direita') {
      // Navegar para frente na sequência: Home → Supermercados → Ver Anúncios
      if (navigation === 'Home') {
        setNavigation('Supermercados');
      } else if (navigation === 'Supermercados') {
        setNavigation('VerAnuncios');
      }
      // Na tela Ver Anúncios, a seta direita não faz nada ou pode voltar ao início
    } else if (direction === 'esquerda') {
      navigateBack();
    }
  };

  const handleItemClick = (item) => {
    markAsClicked(item);
    
    // Navegar para tela de Supermercados
    if (item === 'supermercados') {
      setNavigation('Supermercados');
    } else {
      Alert.alert('Click', `Você clicou em ${item}`);
    }
  };

  const getItemStyle = (item) => {
    return [
      styles[item],
      clickedItems[item] && styles.clickedItem
    ];
  };

  const navigateToScreen = (screen) => {
    setNavigation(screen);
  };

  const navigateBack = () => {
    if (navigation === 'VerAnuncios') {
      setNavigation('Supermercados');
    } else {
      setNavigation('Home');
    }
  };

  // Renderizar a tela apropriada baseado no estado de navegação
  if (navigation === 'Supermercados') {
    return <SupermercadosScreen 
      onBack={() => setNavigation('Home')} 
      onNavigate={navigateToScreen}
    />;
  }

  if (navigation === 'VerAnuncios') {
    return <VerAnunciosScreen 
      onBack={navigateBack} 
      onNavigate={navigateToScreen}
    />;
  }

  // Tela Principal (Home)
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#ccc" />
      
      {/* Barra de notificações simulada */}
      <View style={styles.statusBar}>
        <Text style={styles.statusBarText}>Barra de notificações de celular</Text>
      </View>

      {/* Header Principal - CABEÇALHO */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => handleNavigation('esquerda')}>
          <Ionicons name="arrow-back" size={normalize(20)} color="white" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>NOSSO GUIA DE COMPRAS</Text>
        <TouchableOpacity onPress={() => handleNavigation('direita')}>
          <Ionicons name="arrow-forward" size={normalize(20)} color="white" />
        </TouchableOpacity>
      </View>

      {/* Campo de downloads e visualizações */}
      <View style={styles.locationBar}>
        <View style={styles.locationLeft}>
          <Ionicons name="phone-portrait" size={normalize(24)} color="black" style={styles.phoneIcon} />
          <Text style={styles.locationNumber}>{downloads.toLocaleString('pt-BR')}</Text>
        </View>
        <Text style={styles.locationCity}>MANAUS</Text>
        <View style={styles.locationRight}>
          <Text style={styles.locationNumber}>{views.toLocaleString('pt-BR')}</Text>
          <Ionicons name="eye" size={normalize(20)} color="black" />
        </View>
      </View>

      {/* Tela Inicial com indicador de cliques anteriores */}
      <View style={[
        styles.initialScreen,
        currentScreen === 'TELA INICIAL' && styles.currentScreenActive
      ]}>
        <View style={styles.initialScreenLeft}>
          <TouchableOpacity onPress={() => setCurrentScreen('TELA INICIAL')}>
            <Ionicons name="arrow-back" size={normalize(16)} color="black" style={styles.arrowIcon} />
          </TouchableOpacity>
          <Text style={styles.initialScreenText}>TELA INICIAL</Text>
        </View>
        <TouchableOpacity style={styles.instructionsButton}>
          <Text style={styles.instructionsText}>Instruções</Text>
        </TouchableOpacity>
      </View>

      {/* Nome do Anunciante */}
      <View style={styles.advertiserName}>
        <Ionicons name="arrow-back" size={normalize(16)} color="black" style={styles.arrowIcon} />
        <Text style={styles.advertiserText}>NOME DO ANUNCIANTE</Text>
        <Ionicons name="arrow-forward" size={normalize(16)} color="black" style={styles.arrowIcon} />
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Anúncios Grátis */}
        <TouchableOpacity
          onPress={() => handleItemClick('anunciosGratis')}
          style={getItemStyle('freeAds')}
        >
          <Text style={styles.freeAdsTitle}>ANÚNCIOS GRÁTIS</Text>
          <Text style={styles.freeAdsSubtitle}>(VÍDEOS/ÁUDIOS)</Text>
          <Text style={styles.freeAdsText}>(todos os anunciantes)</Text>
        </TouchableOpacity>

        {/* Supermercados */}
        <TouchableOpacity
          onPress={() => handleItemClick('supermercados')}
          style={getItemStyle('supermarkets')}
        >
          <View style={styles.sectionLeft}>
            <Text style={styles.sectionTitle}>SUPERMERCADOS</Text>
            <Text style={styles.sectionSubtitle}>(anúncios grátis)</Text>
          </View>
          <View style={styles.sectionRight}>
            <Text style={styles.sectionLabel}>Lojas</Text>
            <Text style={styles.sectionNumber}>121</Text>
          </View>
        </TouchableOpacity>

        {/* D+ Lojas */}
        <TouchableOpacity
          onPress={() => handleItemClick('dMaisLojas')}
          style={getItemStyle('dPlusStores')}
        >
          <View style={styles.sectionLeft}>
            <Text style={styles.sectionTitle}>D+ LOJAS</Text>
            <Text style={styles.sectionSubtitle}>(anúncios grátis)</Text>
          </View>
          <View style={styles.sectionRight}>
            <Text style={styles.sectionLabel}>Lojas</Text>
            <Text style={styles.sectionNumber}>0</Text>
          </View>
        </TouchableOpacity>

        {/* Utilidade Pública */}
        <TouchableOpacity
          onPress={() => handleItemClick('utilidadePublica')}
          style={getItemStyle('publicUtility')}
        >
          <View style={styles.sectionLeft}>
            <Text style={styles.sectionTitle}>UTILIDADE PÚBLICA</Text>
            <Text style={styles.sectionSubtitle}>(anúncios grátis)</Text>
          </View>
          <View style={styles.sectionRight}>
            <Text style={styles.sectionLabel}>Lojas</Text>
            <Text style={styles.sectionNumber}>0</Text>
          </View>
        </TouchableOpacity>

        {/* Comércio Nosso */}
        <TouchableOpacity
          onPress={() => handleItemClick('comercioNosso')}
          style={getItemStyle('commerce')}
        >
          <Text style={styles.commerceTitle}>
            COMÉRCIO <Text style={styles.commerceTitleRed}>NOSSO</Text>
          </Text>
        </TouchableOpacity>
      </ScrollView>

      {/* Bottom Navigation - RODAPÉ */}
      <View style={styles.bottomNav}>
        <Text style={styles.timer}>{timer}</Text>
        <View style={styles.navIcons}>
          <TouchableOpacity 
            style={styles.navButton}
            onPress={() => {
              setNavigation('Home');
              setCurrentScreen('TELA INICIAL');
            }}
          >
            <Ionicons name="home" size={normalize(24)} color="black" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.navButton}>
            <Ionicons name="person" size={normalize(24)} color="black" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.navButton}>
            <Text style={styles.sortText}>SORTEIO</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.navButton}>
            <Text style={styles.cpfText}>CPF</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.navButton}>
            <Ionicons name="globe" size={normalize(24)} color="black" />
          </TouchableOpacity>
          <TouchableOpacity style={[styles.navButton, styles.closeButton]}>
            <Text style={styles.closeText}>X</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

export default function App() {
  return (
    <AppProvider>
      <MainScreen />
    </AppProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  statusBar: {
    backgroundColor: '#ccc',
    paddingVertical: hp(0.5),
    alignItems: 'center',
  },
  statusBarText: {
    color: '#000',
    fontSize: normalize(12),
  },
  header: {
    backgroundColor: '#ff0000',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: wp(3),
    paddingVertical: hp(1.2),
  },
  headerTitle: {
    color: 'white',
    fontSize: normalize(18),
    fontWeight: 'bold',
    fontStyle: 'italic',
  },
  locationBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#bbb',
    paddingHorizontal: wp(2),
    paddingVertical: hp(1),
  },
  locationLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  locationCity: {
    fontSize: normalize(16),
    fontWeight: 'bold',
    textAlign: 'center',
    flex: 1,
  },
  locationRight: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    justifyContent: 'flex-end',
  },
  locationNumber: {
    fontSize: normalize(10),
    marginHorizontal: wp(1),
  },
  phoneIcon: {
    marginRight: wp(1),
  },
  initialScreen: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#a8d4a8',
    paddingHorizontal: wp(2),
    paddingVertical: hp(1),
    borderBottomWidth: 2,
    borderBottomColor: '#000',
  },
  currentScreenActive: {
    backgroundColor: '#ffff00',
    borderColor: '#ff0000',
    borderWidth: 2,
  },
  initialScreenLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  initialScreenText: {
    fontSize: normalize(14),
    fontWeight: 'bold',
    marginLeft: wp(1),
  },
  instructionsButton: {
    backgroundColor: '#e8e8ff',
    paddingHorizontal: wp(2),
    paddingVertical: hp(0.5),
    borderRadius: 3,
    borderWidth: 1,
    borderColor: '#888',
  },
  instructionsText: {
    color: '#8b4513',
    fontSize: normalize(12),
    fontStyle: 'italic',
  },
  advertiserName: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#fff',
    paddingHorizontal: wp(2),
    paddingVertical: hp(1.2),
    borderBottomWidth: 2,
    borderBottomColor: '#000',
  },
  advertiserText: {
    fontSize: normalize(14),
    fontWeight: 'bold',
  },
  arrowIcon: {
    marginHorizontal: wp(1),
  },
  content: {
    flex: 1,
  },
  freeAds: {
    backgroundColor: '#ffcc00',
    paddingVertical: hp(2.5),
    alignItems: 'center',
    borderBottomWidth: 2,
    borderBottomColor: '#000',
  },
  freeAdsTitle: {
    fontSize: normalize(18),
    fontWeight: 'bold',
  },
  freeAdsSubtitle: {
    fontSize: normalize(16),
    fontWeight: 'bold',
  },
  freeAdsText: {
    fontSize: normalize(14),
    fontStyle: 'italic',
    marginTop: hp(0.5),
  },
  supermarkets: {
    flexDirection: 'row',
    backgroundColor: '#90ee90',
    paddingVertical: hp(1.5),
    paddingHorizontal: wp(2),
    borderBottomWidth: 2,
    borderBottomColor: '#000',
  },
  dPlusStores: {
    flexDirection: 'row',
    backgroundColor: '#ffb6c1',
    paddingVertical: hp(1.5),
    paddingHorizontal: wp(2),
    borderBottomWidth: 2,
    borderBottomColor: '#000',
  },
  publicUtility: {
    flexDirection: 'row',
    backgroundColor: '#d3d3d3',
    paddingVertical: hp(1.5),
    paddingHorizontal: wp(2),
    borderBottomWidth: 2,
    borderBottomColor: '#000',
  },
  sectionLeft: {
    flex: 3,
  },
  sectionRight: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    borderLeftWidth: 2,
    borderLeftColor: '#000',
    paddingLeft: wp(2),
  },
  sectionTitle: {
    fontSize: normalize(16),
    fontWeight: 'bold',
  },
  sectionSubtitle: {
    fontSize: normalize(12),
    fontStyle: 'italic',
  },
  sectionLabel: {
    fontSize: normalize(12),
  },
  sectionNumber: {
    fontSize: normalize(18),
    fontWeight: 'bold',
  },
  commerce: {
    backgroundColor: '#fff',
    paddingVertical: hp(2.5),
    alignItems: 'center',
    borderBottomWidth: 2,
    borderBottomColor: '#000',
  },
  commerceTitle: {
    fontSize: normalize(18),
    fontWeight: 'bold',
  },
  commerceTitleRed: {
    color: '#ff0000',
  },
  bottomNav: {
    borderTopWidth: 2,
    borderTopColor: '#000',
    backgroundColor: '#f0f0f0',
  },
  timer: {
    backgroundColor: '#ff0000',
    color: 'white',
    textAlign: 'center',
    paddingVertical: hp(0.8),
    fontSize: normalize(16),
    fontWeight: 'bold',
  },
  navIcons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingVertical: hp(1.2),
  },
  navButton: {
    padding: wp(1),
  },
  sortText: {
    fontSize: normalize(12),
    fontWeight: 'bold',
  },
  cpfText: {
    fontSize: normalize(12),
    fontWeight: 'bold',
  },
  closeButton: {
    backgroundColor: '#ff0000',
    paddingHorizontal: wp(3),
    paddingVertical: hp(0.5),
    borderRadius: 3,
  },
  closeText: {
    color: 'white',
    fontSize: normalize(18),
    fontWeight: 'bold',
  },
  // Estilo para itens clicados
  clickedItem: {
    backgroundColor: '#ffff00',
    borderColor: '#ff0000',
    borderWidth: 3,
  },
});