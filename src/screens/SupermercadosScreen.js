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
import { normalize, wp, hp } from '../utils/responsive';
import { useApp } from '../context/AppContext';

export default function SupermercadosScreen({ onBack, onNavigate }) {
  const { setCurrentScreen } = useApp();
  const [timer, setTimer] = useState('00:00:00');
  const [seconds, setSeconds] = useState(0);
  const [pressedButton, setPressedButton] = useState(null);

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

  const handleItemPress = (item) => {
    setPressedButton(item);
    
    // Remove o efeito amarelado após 200ms
    setTimeout(() => setPressedButton(null), 200);
    
    if (item === 'VER ANÚNCIOS') {
      onNavigate('VerAnuncios');
    } else {
      Alert.alert('Click', `Você clicou em: ${item}`);
    }
  };

  const handleHeaderButtonPress = (buttonName, action) => {
    setPressedButton(buttonName);
    
    // Remove o efeito amarelado após 200ms
    setTimeout(() => setPressedButton(null), 200);
    
    action();
  };

  const getItemStyle = (baseStyle, itemName) => {
    return [
      baseStyle,
      pressedButton === itemName && styles.pressedButton
    ];
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#f5f5f5" translucent={false} />
      
      <SafeAreaView style={styles.safeArea}>
        {/* Header Principal */}
        <View style={styles.header}>
          <TouchableOpacity 
            onPress={() => handleHeaderButtonPress('back', onBack)}
            style={[styles.headerButton, pressedButton === 'back' && styles.pressedNavButton]}
          >
            <Ionicons name="arrow-back" size={normalize(20)} color="#ff0000" />
          </TouchableOpacity>
          <View style={styles.headerCenter}>
            <Text style={styles.headerTitle}>NOSSO GUIA DE COMPRAS</Text>
          </View>
          <TouchableOpacity 
            onPress={() => handleHeaderButtonPress('forward', () => onNavigate('VerAnuncios'))}
            style={[styles.headerButton, pressedButton === 'forward' && styles.pressedNavButton]}
          >
            <Ionicons name="arrow-forward" size={normalize(20)} color="#ff0000" />
          </TouchableOpacity>
        </View>

        {/* Fundo azul claro para as brechas */}
        <View style={styles.blueBackground}>
          {/* Seção Supermercados */}
          <View style={styles.supermarketSectionContainer}>
            <View style={styles.supermarketSection}>
              <TouchableOpacity 
                onPress={() => handleHeaderButtonPress('section-back', onBack)}
                style={[pressedButton === 'section-back' && styles.pressedNavButton]}
              >
                <Ionicons name="arrow-back" size={normalize(16)} color="black" style={styles.arrowIcon} />
              </TouchableOpacity>
              <Text style={styles.supermarketTitle}>SUPERMERCADOS</Text>
              <TouchableOpacity 
                style={[styles.instructionsButton, pressedButton === 'section-instructions' && styles.pressedNavButton]}
                onPress={() => handleHeaderButtonPress('section-instructions', () => Alert.alert('Instruções', 'Função em desenvolvimento'))}
              >
                <Text style={styles.instructionsText}>Instruções</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Nome do Anunciante */}
          <View style={styles.advertiserNameContainer}>
            <View style={styles.advertiserName}>
              <TouchableOpacity 
                onPress={() => handleHeaderButtonPress('advertiser-back', () => Alert.alert('Voltar', 'Função em desenvolvimento'))}
                style={[pressedButton === 'advertiser-back' && styles.pressedNavButton]}
              >
                <Ionicons name="arrow-back" size={normalize(16)} color="black" style={styles.arrowIcon} />
              </TouchableOpacity>
              <Text style={styles.advertiserText}>NOME DO ANUNCIANTE</Text>
              <TouchableOpacity 
                onPress={() => handleHeaderButtonPress('advertiser-forward', () => Alert.alert('Avançar', 'Função em desenvolvimento'))}
                style={[pressedButton === 'advertiser-forward' && styles.pressedNavButton]}
              >
                <Ionicons name="arrow-forward" size={normalize(16)} color="black" style={styles.arrowIcon} />
              </TouchableOpacity>
            </View>
          </View>

          <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
            {/* Anúncios Grátis */}
            <View style={styles.itemContainer}>
              <TouchableOpacity
                style={getItemStyle(styles.freeAdsItem, 'ANÚNCIOS GRÁTIS')}
                onPress={() => handleItemPress('ANÚNCIOS GRÁTIS')}
              >
                <Text style={styles.itemTitle}>ANÚNCIOS GRÁTIS</Text>
                <Text style={styles.itemSubtitle}>(VÍDEOS/ÁUDIOS)</Text>
                <Text style={styles.itemDescription}>(de supermercados)</Text>
              </TouchableOpacity>
            </View>

            {/* Ver Anúncios */}
            <View style={styles.itemContainer}>
              <TouchableOpacity
                style={getItemStyle(styles.viewAdsItem, 'VER ANÚNCIOS')}
                onPress={() => handleItemPress('VER ANÚNCIOS')}
              >
                <Text style={styles.itemTitle}>VER ANÚNCIOS</Text>
                <Text style={styles.itemDescription}>(de supermercados)</Text>
              </TouchableOpacity>
            </View>

            {/* Quer Anunciar Grátis? */}
            <View style={styles.itemContainer}>
              <TouchableOpacity
                style={getItemStyle(styles.wantToAdvertise, 'QUER ANUNCIAR GRÁTIS?')}
                onPress={() => handleItemPress('QUER ANUNCIAR GRÁTIS?')}
              >
                <Text style={styles.itemTitle}>QUER ANUNCIAR GRÁTIS?</Text>
                <Text style={styles.itemDescriptionItalic}>(cadastre-se aqui)</Text>
              </TouchableOpacity>
            </View>

            {/* Prêmios do Sorteio */}
            <View style={styles.itemContainer}>
              <TouchableOpacity
                style={getItemStyle(styles.prizesItem, 'PRÊMIOS DO SORTEIO')}
                onPress={() => handleItemPress('PRÊMIOS DO SORTEIO')}
              >
                <Text style={styles.itemTitle}>PRÊMIOS DO SORTEIO</Text>
                <Text style={styles.itemDescriptionItalic}>(conhecer)</Text>
              </TouchableOpacity>
            </View>

            {/* Câmeras de Calçada */}
            <View style={styles.itemContainer}>
              <TouchableOpacity
                style={getItemStyle(styles.camerasItem, 'CÂMERAS DE CALÇADA COMPARTILHADAS')}
                onPress={() => handleItemPress('CÂMERAS DE CALÇADA COMPARTILHADAS')}
              >
                <Text style={styles.itemTitle}>CÂMERAS DE CALÇADA COMPARTILHADAS</Text>
                <Text style={styles.itemDescriptionItalic}>(ver imagens)</Text>
              </TouchableOpacity>
            </View>

            {/* Jogos de Apostas */}
            <View style={styles.itemContainer}>
              <TouchableOpacity
                style={getItemStyle(styles.gamesItem, 'JOGOS DE APOSTAS')}
                onPress={() => handleItemPress('JOGOS DE APOSTAS')}
              >
                <Text style={styles.itemTitle}>JOGOS DE APOSTAS</Text>
                <Text style={styles.itemDescriptionRed}>(apostar)</Text>
              </TouchableOpacity>
            </View>

            {/* Vagas de Empregos */}
            <View style={styles.itemContainer}>
              <TouchableOpacity
                style={getItemStyle(styles.jobsItem, 'VAGAS DE EMPREGOS')}
                onPress={() => handleItemPress('VAGAS DE EMPREGOS')}
              >
                <Text style={styles.itemTitle}>VAGAS DE EMPREGOS</Text>
                <Text style={styles.itemDescriptionItalic}>(todas as lojas)</Text>
              </TouchableOpacity>
            </View>

            {/* Caça-Produtos */}
            <View style={styles.itemContainer}>
              <TouchableOpacity
                style={getItemStyle(styles.productHuntItem, 'CAÇA-PRODUTOS')}
                onPress={() => handleItemPress('CAÇA-PRODUTOS')}
              >
                <Text style={styles.itemTitle}>CAÇA-PRODUTOS</Text>
                <Text style={styles.itemDescriptionItalic}>(consulta de mais códigos de supermercados)</Text>
              </TouchableOpacity>
            </View>

            {/* Caça-Serviços */}
            <View style={styles.itemContainer}>
              <TouchableOpacity
                style={getItemStyle(styles.serviceHuntItem, 'CAÇA-SERVIÇOS')}
                onPress={() => handleItemPress('CAÇA-SERVIÇOS')}
              >
                <Text style={styles.itemTitle}>CAÇA-SERVIÇOS</Text>
                <Text style={styles.itemDescriptionItalic}>(por tipo de profissão)</Text>
              </TouchableOpacity>
            </View>

            {/* Disk-Remédio */}
            <View style={styles.itemContainer}>
              <TouchableOpacity
                style={getItemStyle(styles.medicineItem, 'DISK-REMÉDIO')}
                onPress={() => handleItemPress('DISK-REMÉDIO')}
              >
                <Text style={styles.itemTitle}>DISK-REMÉDIO</Text>
                <Text style={styles.itemDescriptionItalic}>(por proximidade)</Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </View>

        {/* Bottom Navigation */}
        <View style={styles.bottomNav}>
          <Text style={styles.timer}>{timer}</Text>
          <View style={styles.navIcons}>
            <TouchableOpacity 
              style={[styles.navButton, pressedButton === 'nav-home' && styles.pressedNavButton]}
              onPress={() => handleHeaderButtonPress('nav-home', () => onNavigate('Home'))}
            >
              <Ionicons name="home" size={normalize(24)} color="black" />
            </TouchableOpacity>
            <TouchableOpacity 
              style={[styles.navButton, pressedButton === 'nav-person' && styles.pressedNavButton]}
              onPress={() => handleHeaderButtonPress('nav-person', () => Alert.alert('Perfil', 'Função em desenvolvimento'))}
            >
              <Ionicons name="person" size={normalize(24)} color="black" />
            </TouchableOpacity>
            <TouchableOpacity 
              style={[styles.navButton, pressedButton === 'nav-sorteio' && styles.pressedNavButton]}
              onPress={() => handleHeaderButtonPress('nav-sorteio', () => Alert.alert('Sorteio', 'Função em desenvolvimento'))}
            >
              <Text style={styles.sortText}>SORTEIO</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={[styles.navButton, pressedButton === 'nav-cpf' && styles.pressedNavButton]}
              onPress={() => handleHeaderButtonPress('nav-cpf', () => Alert.alert('CPF', 'Função em desenvolvimento'))}
            >
              <Text style={styles.cpfText}>CPF</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={[styles.navButton, pressedButton === 'nav-globe' && styles.pressedNavButton]}
              onPress={() => handleHeaderButtonPress('nav-globe', () => Alert.alert('Prêmio', 'Função em desenvolvimento'))}
            >
              <Ionicons name="globe" size={normalize(24)} color="black" />
            </TouchableOpacity>
            <TouchableOpacity 
              style={[styles.navButton, styles.closeButton, pressedButton === 'nav-close' && styles.pressedNavButton]}
              onPress={() => handleHeaderButtonPress('nav-close', () => Alert.alert('Fechar', 'Deseja sair do aplicativo?'))}
            >
              <Text style={styles.closeText}>X</Text>
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    </View>
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
    paddingTop: hp(4), // Adicionado para evitar a invasão da câmera frontal
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
  headerCenter: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
  },
  headerTitle: {
    color: '#ff0000',
    fontSize: normalize(16),
    fontWeight: 'bold',
    fontStyle: 'italic',
    marginRight: wp(2),
  },
  blueBackground: {
    flex: 1,
    backgroundColor: '#b3d9ff',
    paddingTop: hp(1),
  },
  supermarketSectionContainer: {
    marginHorizontal: wp(3),
    marginBottom: hp(0.8),
  },
  supermarketSection: {
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
  supermarketTitle: {
    fontSize: normalize(16),
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
  // Estilos dos itens
  freeAdsItem: {
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
  viewAdsItem: {
    backgroundColor: '#fff',
    paddingVertical: hp(2),
    alignItems: 'center',
    borderRadius: 5,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  wantToAdvertise: {
    backgroundColor: '#e8e8e8',
    paddingVertical: hp(2),
    alignItems: 'center',
    borderRadius: 5,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  prizesItem: {
    backgroundColor: '#fff',
    paddingVertical: hp(2),
    alignItems: 'center',
    borderRadius: 5,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  camerasItem: {
    backgroundColor: '#f5f5f5',
    paddingVertical: hp(2),
    alignItems: 'center',
    borderRadius: 5,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  gamesItem: {
    backgroundColor: '#e8e8e8',
    paddingVertical: hp(2),
    alignItems: 'center',
    borderRadius: 5,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  jobsItem: {
    backgroundColor: '#fff',
    paddingVertical: hp(2),
    alignItems: 'center',
    borderRadius: 5,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  productHuntItem: {
    backgroundColor: '#f5f5f5',
    paddingVertical: hp(2),
    alignItems: 'center',
    borderRadius: 5,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  serviceHuntItem: {
    backgroundColor: '#e8e8e8',
    paddingVertical: hp(2),
    alignItems: 'center',
    borderRadius: 5,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  medicineItem: {
    backgroundColor: '#fff',
    paddingVertical: hp(2),
    alignItems: 'center',
    borderRadius: 5,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  itemTitle: {
    fontSize: normalize(16),
    fontWeight: 'bold',
    textAlign: 'center',
  },
  itemSubtitle: {
    fontSize: normalize(14),
    fontWeight: 'bold',
    textAlign: 'center',
  },
  itemDescription: {
    fontSize: normalize(12),
    textAlign: 'center',
  },
  itemDescriptionItalic: {
    fontSize: normalize(12),
    fontStyle: 'italic',
    textAlign: 'center',
  },
  itemDescriptionRed: {
    fontSize: normalize(12),
    fontStyle: 'italic',
    textAlign: 'center',
    color: '#ff0000',
  },
  // Bottom Navigation
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
  // Estilo para efeito temporário de clique
  pressedButton: {
    backgroundColor: '#ffeaa7',
  },
  // Estilo para efeito temporário de clique nos botões de navegação
  pressedNavButton: {
    backgroundColor: '#ffeaa7',
  },
});