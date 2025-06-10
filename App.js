const navigateBack = () => {
    if (navigation === 'FormaPagamento') {
      setNavigation('CarrinhoCompras');
    } else if (navigation === 'CarrinhoCompras') {
      setNavigation('ProdutoDetalhes');
    } else if (navigation === 'ProdutoDetalhes') {
      setNavigation('PrecosNoMuro');
    } else if (navigation === 'PrecosNoMuro' || navigation === 'ValidadeAvaria' || navigation === 'PromocaoDesapega') {
      setNavigation('LojaDetalhes');
    } else if (navigation === 'LojaDetalhes') {
      setNavigation('EscolherLocalidade');
    } else if (navigation === 'EscolherLocalidade') {
      setNavigation('VerAnuncios');
    } else if (navigation === 'VerAnuncios') {
      setNavigation('Supermercados');
    } else {
      setNavigation('Home');
    }
  };import React, { useState, useEffect } from 'react';
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
import EscolherLocalidadeScreen from './src/screens/EscolherLocalidadeScreen';
import LojaDetalhesScreen from './src/screens/LojaDetalhesScreen';
import PrecosNoMuroScreen from './src/screens/PrecosNoMuroScreen';
import ProdutoDetalhesScreen from './src/screens/ProdutoDetalhesScreen';
import CarrinhoComprasScreen from './src/screens/CarrinhoComprasScreen';
import FormaPagamentoScreen from './src/screens/FormaPagamentoScreen';

function MainScreen() {
  const {
    clickedItems,
    markAsClicked,
    currentScreen,
    setCurrentScreen,
    downloads,
    views,
    timer, // Timer global do contexto
  } = useApp();
  
  const [navigation, setNavigation] = useState('Home');
  const [pressedButton, setPressedButton] = useState(null);
  const [pressedNavButton, setPressedNavButton] = useState(null);

  // Removido o timer local - agora usa o global do contexto

  const handleNavigation = (direction) => {
    if (direction === 'direita') {
      if (navigation === 'Home') {
        setNavigation('Supermercados');
      } else if (navigation === 'Supermercados') {
        setNavigation('VerAnuncios');
      } else if (navigation === 'VerAnuncios') {
        setNavigation('EscolherLocalidade');
      } else if (navigation === 'EscolherLocalidade') {
        setNavigation('LojaDetalhes');
      } else if (navigation === 'LojaDetalhes') {
        setNavigation('PrecosNoMuro');
      } else if (navigation === 'PrecosNoMuro') {
        setNavigation('ProdutoDetalhes');
      } else if (navigation === 'ProdutoDetalhes') {
        setNavigation('CarrinhoCompras');
      } else if (navigation === 'CarrinhoCompras') {
        setNavigation('FormaPagamento');
      }
    } else if (direction === 'esquerda') {
      navigateBack();
    }
  };

  const handleItemClick = (item) => {
    markAsClicked(item);
    setPressedButton(item);
    
    setTimeout(() => setPressedButton(null), 200);
    
    if (item === 'supermercados') {
      setNavigation('Supermercados');
    } else {
      // Todos os outros botões voltam para Home (já está em Home, só mostra feedback)
      Alert.alert('Navegação', 'Você já está na tela inicial');
    }
  };

  const handleNavButtonPress = (buttonName, action) => {
    setPressedNavButton(buttonName);
    
    setTimeout(() => setPressedNavButton(null), 200);
    
    action();
  };

  const handleHeaderButtonPress = (buttonName, action) => {
    setPressedNavButton(buttonName);
    
    setTimeout(() => setPressedNavButton(null), 200);
    
    action();
  };

  const getItemStyle = (item) => {
    return [
      styles[item],
      clickedItems[item] && styles.clickedItem,
      pressedButton === item && styles.pressedButton
    ];
  };

  const getNavButtonStyle = (buttonName) => {
    return [
      styles.navButton,
      pressedNavButton === buttonName && styles.pressedNavButton
    ];
  };

  const navigateToScreen = (screen) => {
    setNavigation(screen);
  };

  const navigateBack = () => {
    if (navigation === 'ProdutoDetalhes') {
      setNavigation('PrecosNoMuro');
    } else if (navigation === 'PrecosNoMuro' || navigation === 'ValidadeAvaria' || navigation === 'PromocaoDesapega') {
      setNavigation('LojaDetalhes');
    } else if (navigation === 'LojaDetalhes') {
      setNavigation('EscolherLocalidade');
    } else if (navigation === 'EscolherLocalidade') {
      setNavigation('VerAnuncios');
    } else if (navigation === 'VerAnuncios') {
      setNavigation('Supermercados');
    } else {
      setNavigation('Home');
    }
  };

  // Renderizar a tela apropriada baseado no estado de navegação
  if (navigation === 'Supermercados') {
    return (
      <SupermercadosScreen 
        onBack={() => setNavigation('Home')} 
        onNavigate={navigateToScreen}
      />
    );
  }

  if (navigation === 'VerAnuncios') {
    return (
      <VerAnunciosScreen 
        onBack={navigateBack} 
        onNavigate={navigateToScreen}
      />
    );
  }

  if (navigation === 'EscolherLocalidade') {
    return (
      <EscolherLocalidadeScreen 
        onBack={navigateBack} 
        onNavigate={navigateToScreen}
      />
    );
  }

  if (navigation === 'LojaDetalhes') {
    return (
      <LojaDetalhesScreen 
        onBack={navigateBack} 
        onNavigate={navigateToScreen}
      />
    );
  }

  // Tela de Preços no Muro
  if (navigation === 'PrecosNoMuro') {
    return (
      <PrecosNoMuroScreen 
        onBack={navigateBack} 
        onNavigate={navigateToScreen}
      />
    );
  }

  // Tela de Detalhes do Produto
  if (navigation === 'ProdutoDetalhes') {
    return (
      <ProdutoDetalhesScreen 
        onBack={navigateBack} 
        onNavigate={navigateToScreen}
      />
    );
  }

  // Tela do Carrinho de Compras
  if (navigation === 'CarrinhoCompras') {
    return (
      <CarrinhoComprasScreen 
        onBack={navigateBack} 
        onNavigate={navigateToScreen}
      />
    );
  }

  // Tela de Forma de Pagamento
  if (navigation === 'FormaPagamento') {
    return (
      <FormaPagamentoScreen 
        onBack={navigateBack} 
        onNavigate={navigateToScreen}
      />
    );
  }

  // Placeholder para as outras telas de promoção
  if (navigation === 'ValidadeAvaria') {
    return (
      <View style={styles.container}>
        <Text>Tela Validade/Avaria - Em desenvolvimento</Text>
        <TouchableOpacity onPress={navigateBack}>
          <Text>Voltar</Text>
        </TouchableOpacity>
      </View>
    );
  }

  if (navigation === 'PromocaoDesapega') {
    return (
      <View style={styles.container}>
        <Text>Tela Promoção Desapega - Em desenvolvimento</Text>
        <TouchableOpacity onPress={navigateBack}>
          <Text>Voltar</Text>
        </TouchableOpacity>
      </View>
    );
  }

  // Tela Principal (Home)
  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#f5f5f5" translucent={false} />
      
      <SafeAreaView style={styles.safeArea}>
        {/* Header Principal - CABEÇALHO */}
        <View style={styles.header}>
          <TouchableOpacity 
            onPress={() => handleHeaderButtonPress('header-back', () => handleNavigation('esquerda'))}
            style={[styles.headerButton, pressedNavButton === 'header-back' && styles.pressedNavButton]}
          >
            <Ionicons name="arrow-back" size={normalize(20)} color="#ff0000" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>NOSSO GUIA DE COMPRAS</Text>
          <TouchableOpacity 
            onPress={() => handleHeaderButtonPress('header-forward', () => handleNavigation('direita'))}
            style={[styles.headerButton, pressedNavButton === 'header-forward' && styles.pressedNavButton]}
          >
            <Ionicons name="arrow-forward" size={normalize(20)} color="#ff0000" />
          </TouchableOpacity>
        </View>

        {/* Fundo azul claro para as brechas */}
        <View style={styles.blueBackground}>
          {/* Campo de downloads e visualizações */}
          <View style={styles.locationBarContainer}>
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
          </View>

          {/* Tela Inicial - SEM SETA */}
          <View style={styles.initialScreenContainer}>
            <View style={[
              styles.initialScreen,
              currentScreen === 'TELA INICIAL' && styles.currentScreenActive
            ]}>
              <View style={styles.initialScreenLeft}>
                <Text style={styles.initialScreenText}>TELA INICIAL</Text>
              </View>
              <TouchableOpacity style={styles.instructionsButton}>
                <Text style={styles.instructionsText}>Instruções</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Nome do Anunciante */}
          <View style={styles.advertiserNameContainer}>
            <View style={styles.advertiserName}>
              <Ionicons name="arrow-back" size={normalize(16)} color="black" style={styles.arrowIcon} />
              <Text style={styles.advertiserText}>NOME DO ANUNCIANTE</Text>
              <Ionicons name="arrow-forward" size={normalize(16)} color="black" style={styles.arrowIcon} />
            </View>
          </View>

          <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
            {/* Anúncios Grátis */}
            <View style={styles.itemContainer}>
              <TouchableOpacity
                onPress={() => handleItemClick('anunciosGratis')}
                style={getItemStyle('freeAds')}
              >
                <Text style={styles.freeAdsTitle}>ANÚNCIOS GRÁTIS</Text>
                <Text style={styles.freeAdsSubtitle}>(VÍDEOS/ÁUDIOS)</Text>
                <Text style={styles.freeAdsText}>(todos os anunciantes)</Text>
              </TouchableOpacity>
            </View>

            {/* Supermercados */}
            <View style={styles.itemContainer}>
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
            </View>

            {/* D+ Lojas */}
            <View style={styles.itemContainer}>
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
            </View>

            {/* Utilidade Pública */}
            <View style={styles.itemContainer}>
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
            </View>

            {/* Comércio Nosso */}
            <View style={styles.itemContainer}>
              <TouchableOpacity
                onPress={() => handleItemClick('comercioNosso')}
                style={getItemStyle('commerce')}
              >
                <Text style={styles.commerceTitle}>
                  COMÉRCIO <Text style={styles.commerceTitleRed}>NOSSO</Text>
                </Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </View>

        {/* Bottom Navigation - RODAPÉ */}
        <View style={styles.bottomNav}>
          <Text style={styles.timer}>{timer}</Text>
          <View style={styles.navIcons}>
            <TouchableOpacity 
              style={getNavButtonStyle('home')}
              onPress={() => handleNavButtonPress('home', () => {
                setNavigation('Home');
                setCurrentScreen('TELA INICIAL');
              })}
            >
              <Ionicons name="home" size={normalize(24)} color="black" />
            </TouchableOpacity>
            <TouchableOpacity 
              style={getNavButtonStyle('person')}
              onPress={() => handleNavButtonPress('person', () => Alert.alert('Perfil', 'Função em desenvolvimento'))}
            >
              <Ionicons name="person" size={normalize(24)} color="black" />
            </TouchableOpacity>
            <TouchableOpacity 
              style={getNavButtonStyle('sorteio')}
              onPress={() => handleNavButtonPress('sorteio', () => Alert.alert('Sorteio', 'Função em desenvolvimento'))}
            >
              <Text style={styles.sortText}>SORTEIO</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={getNavButtonStyle('cpf')}
              onPress={() => handleNavButtonPress('cpf', () => Alert.alert('CPF', 'Função em desenvolvimento'))}
            >
              <Text style={styles.cpfText}>CPF</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={getNavButtonStyle('globe')}
              onPress={() => handleNavButtonPress('globe', () => Alert.alert('Prêmio', 'Função em desenvolvimento'))}
            >
              <Ionicons name="globe" size={normalize(24)} color="black" />
            </TouchableOpacity>
            <TouchableOpacity 
              style={[getNavButtonStyle('close'), styles.closeButton]}
              onPress={() => handleNavButtonPress('close', () => Alert.alert('Fechar', 'Deseja sair do aplicativo?'))}
            >
              <Text style={styles.closeText}>X</Text>
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    </View>
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
    backgroundColor: '#f5f5f5',
  },
  safeArea: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    backgroundColor: '#f5f5f5',
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    paddingHorizontal: wp(3),
    paddingVertical: hp(2.5),
    paddingTop: hp(4),
    marginBottom: hp(0.5),
    borderBottomWidth: 2,
    borderBottomColor: '#000',
  },
  headerButton: {
    padding: wp(2),
    borderRadius: 5,
    minWidth: wp(10),
    minHeight: hp(4),
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitle: {
    color: '#ff0000',
    fontSize: normalize(16),
    fontWeight: 'bold',
    fontStyle: 'italic',
    textAlign: 'center',
    flex: 1,
    marginHorizontal: wp(2),
  },
  blueBackground: {
    flex: 1,
    backgroundColor: '#b3d9ff',
    paddingTop: hp(1),
  },
  locationBarContainer: {
    marginHorizontal: wp(3),
    marginBottom: hp(0.8),
  },
  locationBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#e8e8e8',
    paddingHorizontal: wp(2),
    paddingVertical: hp(1),
    borderRadius: 5,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
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
  initialScreenContainer: {
    marginHorizontal: wp(3),
    marginBottom: hp(0.8),
  },
  initialScreen: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#f5f5f5',
    paddingHorizontal: wp(2),
    paddingVertical: hp(1),
    borderRadius: 5,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  currentScreenActive: {
    backgroundColor: '#fff3cd',
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
  },
  instructionsButton: {
    backgroundColor: '#fff',
    paddingHorizontal: wp(2),
    paddingVertical: hp(0.5),
    borderRadius: 3,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  instructionsText: {
    color: '#666',
    fontSize: normalize(12),
    fontStyle: 'italic',
  },
  advertiserNameContainer: {
    marginHorizontal: wp(3),
    marginBottom: hp(0.8),
  },
  advertiserName: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#fff',
    paddingHorizontal: wp(2),
    paddingVertical: hp(1.2),
    borderRadius: 5,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
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
    paddingHorizontal: wp(3),
  },
  itemContainer: {
    marginBottom: hp(0.8),
  },
  freeAds: {
    backgroundColor: '#f5f5f5',
    paddingVertical: hp(18),
    alignItems: 'center',
    borderRadius: 5,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
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
    backgroundColor: '#fff',
    paddingVertical: hp(1.5),
    paddingHorizontal: wp(2),
    borderRadius: 5,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  dPlusStores: {
    flexDirection: 'row',
    backgroundColor: '#e8e8e8',
    paddingVertical: hp(1.5),
    paddingHorizontal: wp(2),
    borderRadius: 5,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  publicUtility: {
    flexDirection: 'row',
    backgroundColor: '#f5f5f5',
    paddingVertical: hp(1.5),
    paddingHorizontal: wp(2),
    borderRadius: 5,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
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
    borderRadius: 5,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
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
    padding: wp(2),
    borderRadius: 5,
    minWidth: wp(12),
    alignItems: 'center',
  },
  sortText: {
    fontSize: normalize(11),
    fontWeight: 'bold',
  },
  cpfText: {
    fontSize: normalize(11),
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
    fontSize: normalize(16),
    fontWeight: 'bold',
  },
  clickedItem: {
    backgroundColor: '#fff3cd',
    borderColor: '#ff0000',
    borderWidth: 3,
  },
  pressedButton: {
    backgroundColor: '#ffeaa7',
  },
  pressedNavButton: {
    backgroundColor: '#ffeaa7',
  },
});