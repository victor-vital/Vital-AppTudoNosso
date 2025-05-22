import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  StatusBar,
  SafeAreaView,
  FlatList,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { normalize, wp, hp } from '../utils/responsive';
import { useApp } from '../context/AppContext';

const supermarkets = [
  { id: 1, name: 'ATACK', units: 7, logo: 'LOGOTIPO' },
  { id: 2, name: 'ATACADÃO', units: 0, logo: 'LOGOTIPO' },
  { id: 3, name: 'BARATÃO DA CARNE', units: 9, logo: 'LOGOTIPO', highlighted: true },
  { id: 4, name: 'CARREFOUR', units: 9, logo: 'LOGOTIPO' },
  { id: 5, name: 'COEMA', units: 4, logo: 'LOGOTIPO' },
  { id: 6, name: 'DB', units: 38, logo: 'LOGOTIPO' },
  { id: 7, name: 'NOVA ERA', units: 12, logo: 'LOGOTIPO' },
  { id: 8, name: 'NOVO TEMPO', units: 14, logo: 'LOGOTIPO' },
  { id: 9, name: 'RODRIGUES', units: 14, logo: 'LOGOTIPO' },
  { id: 10, name: '', units: null, logo: 'LOGOTIPO' },
  { id: 11, name: '', units: null, logo: 'LOGOTIPO' },
  { id: 12, name: '', units: null, logo: 'LOGOTIPO' },
  { id: 13, name: '', units: null, logo: 'LOGOTIPO' },
  { id: 14, name: '', units: null, logo: 'LOGOTIPO' },
  { id: 15, name: '', units: null, logo: 'LOGOTIPO' },
];

export default function VerAnunciosScreen({ onBack, onNavigate }) {
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

  const handleSupermarketPress = (supermarket) => {
    setPressedButton(supermarket.id);
    
    setTimeout(() => setPressedButton(null), 200);
    
    if (supermarket.name) {
      Alert.alert('Supermercado', `Você clicou em: ${supermarket.name}`);
    }
  };

  const handleHeaderButtonPress = (buttonName, action) => {
    setPressedButton(buttonName);
    
    setTimeout(() => setPressedButton(null), 200);
    
    action();
  };

  const renderSupermarketItem = ({ item }) => {
    const rowStyle = [
      styles.tableRow,
      item.highlighted && styles.highlightedRow,
      pressedButton === item.id && styles.pressedButton,
      item.id % 2 === 0 ? styles.evenRow : styles.oddRow,
    ];

    return (
      <View style={styles.itemContainer}>
        <TouchableOpacity 
          style={rowStyle}
          onPress={() => handleSupermarketPress(item)}
        >
          <View style={styles.logoCell}>
            <Text style={styles.logoText}>{item.logo}</Text>
          </View>
          <View style={styles.supermarketName}>
            <Text style={styles.nameText}>{item.name}</Text>
          </View>
          <View style={styles.unitsCell}>
            <Text style={styles.unitsText}>
              {item.units !== null ? item.units : ''}
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#f5f5f5" translucent={false} />
      
      <SafeAreaView style={styles.safeArea}>
        {/* Header sem faixa vermelha */}
        <View style={styles.header}>
          <TouchableOpacity 
            onPress={() => handleHeaderButtonPress('header-back', onBack)}
            style={[styles.headerButton, pressedButton === 'header-back' && styles.pressedNavButton]}
          >
            <Ionicons name="arrow-back" size={normalize(20)} color="#ff0000" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>NOSSO GUIA DE COMPRAS</Text>
          <TouchableOpacity 
            onPress={() => handleHeaderButtonPress('header-forward', () => onNavigate && onNavigate('Home'))}
            style={[styles.headerButton, pressedButton === 'header-forward' && styles.pressedNavButton]}
          >
            <Ionicons name="arrow-forward" size={normalize(20)} color="#ff0000" />
          </TouchableOpacity>
        </View>

        {/* Conteúdo principal com fundo azul claro */}
        <View style={styles.blueBackground}>
          {/* Seção Ver Anúncios */}
          <View style={styles.viewAdsSectionContainer}>
            <View style={styles.viewAdsSection}>
              <Text style={styles.viewAdsTitle}>VER ANÚNCIOS</Text>
              <TouchableOpacity 
                style={[styles.instructionsButton, pressedButton === 'view-instructions' && styles.pressedNavButton]}
                onPress={() => handleHeaderButtonPress('view-instructions', () => Alert.alert('Instruções', 'Função em desenvolvimento'))}
              >
                <Text style={styles.instructionsText}>Instruções</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Cabeçalho da tabela */}
          <View style={styles.tableHeaderContainer}>
            <View style={styles.tableHeader}>
              <Text style={styles.tableHeaderText}>NOMES DE SUPERMERCADOS</Text>
              <View style={styles.countBox}>
                <Text style={styles.countText}>121</Text>
              </View>
            </View>
          </View>

          {/* Lista de Supermercados */}
          <View style={styles.listContainer}>
            <FlatList
              data={supermarkets}
              renderItem={renderSupermarketItem}
              keyExtractor={item => item.id.toString()}
              style={styles.list}
              showsVerticalScrollIndicator={false}
            />
          </View>
        </View>

        {/* Bottom Navigation */}
        <View style={styles.bottomNav}>
          <Text style={styles.timer}>{timer}</Text>
          <View style={styles.navIcons}>
            <TouchableOpacity 
              style={[styles.navButton, pressedButton === 'nav-home' && styles.pressedNavButton]}
              onPress={() => handleHeaderButtonPress('nav-home', () => onNavigate && onNavigate('Home'))}
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
    backgroundColor: '#f5f5f5',
  },
  // Header sem fundo vermelho
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
  viewAdsSectionContainer: {
    marginHorizontal: wp(3),
    marginBottom: hp(0.8),
  },
  viewAdsSection: {
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
  viewAdsTitle: {
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
  tableHeaderContainer: {
    marginHorizontal: wp(3),
    marginBottom: hp(0.8),
  },
  tableHeader: {
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
  tableHeaderText: {
    fontSize: normalize(14),
    fontWeight: 'bold',
  },
  countBox: {
    backgroundColor: '#fff',
    paddingHorizontal: wp(3),
    paddingVertical: hp(0.5),
    borderWidth: 1,
    borderColor: '#000',
    borderRadius: 3,
  },
  countText: {
    fontSize: normalize(14),
    fontWeight: 'bold',
  },
  listContainer: {
    flex: 1,
    marginHorizontal: wp(3),
  },
  list: {
    flex: 1,
  },
  itemContainer: {
    marginBottom: hp(0.8),
  },
  tableRow: {
    flexDirection: 'row',
    borderRadius: 5,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  evenRow: {
    backgroundColor: '#f5f5f5',
  },
  oddRow: {
    backgroundColor: '#fff',
  },
  highlightedRow: {
    backgroundColor: '#fff3cd',
  },
  logoCell: {
    flex: 1.5,
    padding: hp(1),
    borderRightWidth: 1,
    borderRightColor: '#000',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoText: {
    fontSize: normalize(10),
    textAlign: 'center',
  },
  supermarketName: {
    flex: 3,
    padding: hp(1),
    borderRightWidth: 1,
    borderRightColor: '#000',
    justifyContent: 'center',
  },
  nameText: {
    fontSize: normalize(14),
    fontWeight: 'bold',
    textAlign: 'center',
  },
  unitsCell: {
    flex: 1,
    padding: hp(1),
    alignItems: 'center',
    justifyContent: 'center',
  },
  unitsText: {
    fontSize: normalize(14),
    fontWeight: 'bold',
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