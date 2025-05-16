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
  { id: 2, name: 'ATACADÃO', units: 0, logo: 'LOGOTIPO', dashed: true },
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
    if (supermarket.name) {
      Alert.alert('Supermercado', `Você clicou em: ${supermarket.name}`);
    }
  };

  const renderSupermarketItem = ({ item }) => {
    const rowStyle = [
      styles.tableRow,
      item.highlighted && styles.highlightedRow,
    ];

    const nameStyle = [
      styles.supermarketName,
      item.dashed && styles.dashedBorder,
    ];

    return (
      <TouchableOpacity 
        style={rowStyle}
        onPress={() => handleSupermarketPress(item)}
      >
        <View style={styles.logoCell}>
          <Text style={styles.logoText}>{item.logo}</Text>
        </View>
        <View style={nameStyle}>
          <Text style={styles.nameText}>{item.name}</Text>
        </View>
        <View style={styles.unitsCell}>
          <Text style={styles.unitsText}>
            {item.units !== null ? item.units : ''}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#ccc" />
      
      {/* Barra de notificações simulada */}
      <View style={styles.statusBar}>
        <Text style={styles.statusBarText}>Barra de notificações de celular</Text>
      </View>

      {/* Header Principal */}
      <View style={styles.header}>
        <TouchableOpacity onPress={onBack}>
          <Ionicons name="arrow-back" size={normalize(20)} color="white" />
        </TouchableOpacity>
        <View style={styles.headerCenter}>
          <Text style={styles.headerTitle}>NOSSO GUIA DE COMPRAS</Text>
          <Ionicons name="arrow-down" size={normalize(20)} color="white" />
        </View>
        <TouchableOpacity onPress={() => onNavigate && onNavigate('Home')}>
          <Ionicons name="arrow-forward" size={normalize(20)} color="white" />
        </TouchableOpacity>
      </View>

      {/* Seção Ver Anúncios */}
      <View style={styles.viewAdsSection}>
        <Text style={styles.viewAdsTitle}>VER ANÚNCIOS</Text>
        <TouchableOpacity style={styles.instructionsButton}>
          <Text style={styles.instructionsText}>Instruções</Text>
        </TouchableOpacity>
      </View>

      {/* Cabeçalho da tabela */}
      <View style={styles.tableHeader}>
        <Text style={styles.tableHeaderText}>NOMES DE SUPERMERCADOS</Text>
        <View style={styles.countBox}>
          <Text style={styles.countText}>121</Text>
        </View>
      </View>

      {/* Lista de Supermercados */}
      <FlatList
        data={supermarkets}
        renderItem={renderSupermarketItem}
        keyExtractor={item => item.id.toString()}
        style={styles.list}
        showsVerticalScrollIndicator={false}
      />

      {/* Bottom Navigation */}
      <View style={styles.bottomNav}>
        <Text style={styles.timer}>{timer}</Text>
        <View style={styles.navIcons}>
          <TouchableOpacity 
            style={styles.navButton}
            onPress={() => onNavigate && onNavigate('Home')}
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
  headerCenter: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerTitle: {
    color: 'white',
    fontSize: normalize(18),
    fontWeight: 'bold',
    fontStyle: 'italic',
    marginRight: wp(2),
  },
  viewAdsSection: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#90ee90',
    paddingHorizontal: wp(2),
    paddingVertical: hp(1),
    borderBottomWidth: 2,
    borderBottomColor: '#000',
  },
  viewAdsTitle: {
    fontSize: normalize(16),
    fontWeight: 'bold',
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
  tableHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#e0e0e0',
    paddingHorizontal: wp(2),
    paddingVertical: hp(1),
    borderBottomWidth: 2,
    borderBottomColor: '#000',
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
  },
  countText: {
    fontSize: normalize(14),
    fontWeight: 'bold',
  },
  list: {
    flex: 1,
  },
  tableRow: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#000',
    backgroundColor: '#fff',
  },
  highlightedRow: {
    backgroundColor: '#ffcc00',
  },
  logoCell: {
    flex: 1.5,
    padding: hp(1),
    borderRightWidth: 1,
    borderRightColor: '#000',
    alignItems: 'center',
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
  dashedBorder: {
    borderWidth: 2,
    borderStyle: 'dashed',
    borderColor: '#000',
    margin: 2,
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
});