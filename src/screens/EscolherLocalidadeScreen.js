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

const localidades = [
  { id: 1, name: 'ALVORADA 1', highlighted: false },
  { id: 2, name: 'ALVORADA 2', highlighted: false },
  { id: 3, name: 'BETÂNIA', highlighted: false },
  { id: 4, name: 'CACHOEIRINHA', highlighted: false },
  { id: 5, name: 'COMPENSA', highlighted: false },
  { id: 6, name: 'TORQUATO/SANTOS SUMONT', highlighted: false },
  { id: 7, name: 'CENTRO', highlighted: false },
  { id: 8, name: 'CIDADE NOVA 1', highlighted: false },
  { id: 9, name: 'CIDADE NOVA 2', highlighted: false },
  { id: 10, name: 'TORQUATO/SANTA ETELVINA', highlighted: false },
  { id: 11, name: 'NOVA CIDADE', highlighted: false },
  { id: 12, name: '', highlighted: false }, // Linhas vazias como na imagem
  { id: 13, name: '', highlighted: false },
  { id: 14, name: '', highlighted: false },
  { id: 15, name: '', highlighted: false },
];

export default function EscolherLocalidadeScreen({ onBack, onNavigate }) {
  const { setCurrentScreen, timer } = useApp(); // Timer global
  const [pressedButton, setPressedButton] = useState(null);

  // Removido o timer local - agora usa o global do contexto

  const handleLocalidadePress = (localidade) => {
    setPressedButton(localidade.id);
    
    setTimeout(() => setPressedButton(null), 200);
    
    if (localidade.name) {
      // Se for TORQUATO/SANTOS SUMONT, navegar para LojaDetalhes
      if (localidade.name === 'TORQUATO/SANTOS SUMONT') {
        onNavigate('LojaDetalhes');
      } else {
        // Todas as outras localidades voltam para Home
        onNavigate('Home');
      }
    }
  };

  const handleHeaderButtonPress = (buttonName, action) => {
    setPressedButton(buttonName);
    
    setTimeout(() => setPressedButton(null), 200);
    
    action();
  };

  const renderLocalidadeItem = ({ item }) => {
    const rowStyle = [
      styles.localidadeRow,
      item.highlighted && styles.highlightedRow,
      pressedButton === item.id && styles.pressedButton,
    ];

    return (
      <View style={styles.itemContainer}>
        <TouchableOpacity 
          style={rowStyle}
          onPress={() => handleLocalidadePress(item)}
        >
          <Text style={styles.localidadeText}>{item.name}</Text>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#f5f5f5" translucent={false} />
      
      <SafeAreaView style={styles.safeArea}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity 
            onPress={() => handleHeaderButtonPress('header-back', onBack)}
            style={[styles.headerButton, pressedButton === 'header-back' && styles.pressedNavButton]}
          >
            <Ionicons name="arrow-back" size={normalize(20)} color="#ff0000" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>NOSSO GUIA DE COMPRAS</Text>
          <TouchableOpacity 
            onPress={() => handleHeaderButtonPress('header-forward', () => onNavigate && onNavigate('LojaDetalhes'))}
            style={[styles.headerButton, pressedButton === 'header-forward' && styles.pressedNavButton]}
          >
            <Ionicons name="arrow-forward" size={normalize(20)} color="#ff0000" />
          </TouchableOpacity>
        </View>

        {/* Conteúdo principal com fundo azul claro */}
        <View style={styles.blueBackground}>
          {/* Seção Baratão da Carne */}
          <View style={styles.supermarketSectionContainer}>
            <View style={styles.supermarketSection}>
              <Text style={styles.supermarketTitle}>BARATÃO DA CARNE</Text>
              <TouchableOpacity 
                style={[styles.instructionsButton, pressedButton === 'section-instructions' && styles.pressedNavButton]}
                onPress={() => handleHeaderButtonPress('section-instructions', () => Alert.alert('Instruções', 'Função em desenvolvimento'))}
              >
                <Text style={styles.instructionsText}>Instruções</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Título - escolher localidade/bairro */}
          <View style={styles.titleContainer}>
            <View style={styles.titleSection}>
              <Text style={styles.titleText}>ESCOLHER LOCALIDADE/BAIRRO</Text>
            </View>
          </View>

          {/* Lista de Localidades */}
          <View style={styles.listContainer}>
            <FlatList
              data={localidades}
              renderItem={renderLocalidadeItem}
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
  titleContainer: {
    marginHorizontal: wp(3),
    marginBottom: hp(0.8),
  },
  titleSection: {
    backgroundColor: '#f5f5f5',
    paddingHorizontal: wp(2),
    paddingVertical: hp(1),
    borderRadius: 5,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    alignItems: 'center',
  },
  titleText: {
    fontSize: normalize(16),
    fontWeight: 'bold',
    fontStyle: 'italic',
    color: '#000',
    textAlign: 'center',
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
  localidadeRow: {
    backgroundColor: '#fff',
    paddingHorizontal: wp(2),
    paddingVertical: hp(1.5),
    borderRadius: 5,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  highlightedRow: {
    backgroundColor: '#fff3cd',
    borderColor: '#ff0000',
    borderWidth: 2,
  },
  localidadeText: {
    fontSize: normalize(14),
    fontWeight: 'bold',
    textAlign: 'left',
    paddingLeft: wp(2),
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