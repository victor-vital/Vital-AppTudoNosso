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
    if (item === 'VER ANÚNCIOS') {
      onNavigate('VerAnuncios');
    } else {
      Alert.alert('Click', `Você clicou em: ${item}`);
    }
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
        <TouchableOpacity onPress={() => onNavigate('VerAnuncios')}>
          <Ionicons name="arrow-forward" size={normalize(20)} color="white" />
        </TouchableOpacity>
      </View>

      {/* Seção Supermercados */}
      <View style={styles.supermarketSection}>
        <TouchableOpacity onPress={onBack}>
          <Ionicons name="arrow-back" size={normalize(16)} color="black" style={styles.arrowIcon} />
        </TouchableOpacity>
        <Text style={styles.supermarketTitle}>SUPERMERCADOS</Text>
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
          style={styles.freeAdsItem}
          onPress={() => handleItemPress('ANÚNCIOS GRÁTIS')}
        >
          <Text style={styles.itemTitle}>ANÚNCIOS GRÁTIS</Text>
          <Text style={styles.itemSubtitle}>(VÍDEOS/ÁUDIOS)</Text>
          <Text style={styles.itemDescription}>(de supermercados)</Text>
        </TouchableOpacity>

        {/* Ver Anúncios */}
        <TouchableOpacity
          style={styles.viewAdsItem}
          onPress={() => handleItemPress('VER ANÚNCIOS')}
        >
          <Text style={styles.itemTitle}>VER ANÚNCIOS</Text>
          <Text style={styles.itemDescription}>(de supermercados)</Text>
        </TouchableOpacity>

        {/* Quer Anunciar Grátis? */}
        <TouchableOpacity
          style={styles.wantToAdvertise}
          onPress={() => handleItemPress('QUER ANUNCIAR GRÁTIS?')}
        >
          <Text style={styles.itemTitle}>QUER ANUNCIAR GRÁTIS?</Text>
          <Text style={styles.itemDescriptionItalic}>(cadastre-se aqui)</Text>
        </TouchableOpacity>

        {/* Prêmios do Sorteio */}
        <TouchableOpacity
          style={styles.prizesItem}
          onPress={() => handleItemPress('PRÊMIOS DO SORTEIO')}
        >
          <Text style={styles.itemTitle}>PRÊMIOS DO SORTEIO</Text>
          <Text style={styles.itemDescriptionItalic}>(conhecer)</Text>
        </TouchableOpacity>

        {/* Câmeras de Calçada */}
        <TouchableOpacity
          style={styles.camerasItem}
          onPress={() => handleItemPress('CÂMERAS DE CALÇADA COMPARTILHADAS')}
        >
          <Text style={styles.itemTitle}>CÂMERAS DE CALÇADA COMPARTILHADAS</Text>
          <Text style={styles.itemDescriptionItalic}>(ver imagens)</Text>
        </TouchableOpacity>

        {/* Jogos de Apostas */}
        <TouchableOpacity
          style={styles.gamesItem}
          onPress={() => handleItemPress('JOGOS DE APOSTAS')}
        >
          <Text style={styles.itemTitle}>JOGOS DE APOSTAS</Text>
          <Text style={styles.itemDescriptionRed}>(apostar)</Text>
        </TouchableOpacity>

        {/* Vagas de Empregos */}
        <TouchableOpacity
          style={styles.jobsItem}
          onPress={() => handleItemPress('VAGAS DE EMPREGOS')}
        >
          <Text style={styles.itemTitle}>VAGAS DE EMPREGOS</Text>
          <Text style={styles.itemDescriptionItalic}>(todas as lojas)</Text>
        </TouchableOpacity>

        {/* Caça-Produtos */}
        <TouchableOpacity
          style={styles.productHuntItem}
          onPress={() => handleItemPress('CAÇA-PRODUTOS')}
        >
          <Text style={styles.itemTitle}>CAÇA-PRODUTOS</Text>
          <Text style={styles.itemDescriptionItalic}>(consulta de mais códigos de supermercados)</Text>
        </TouchableOpacity>

        {/* Caça-Serviços */}
        <TouchableOpacity
          style={styles.serviceHuntItem}
          onPress={() => handleItemPress('CAÇA-SERVIÇOS')}
        >
          <Text style={styles.itemTitle}>CAÇA-SERVIÇOS</Text>
          <Text style={styles.itemDescriptionItalic}>(por tipo de profissão)</Text>
        </TouchableOpacity>

        {/* Disk-Remédio */}
        <TouchableOpacity
          style={styles.medicineItem}
          onPress={() => handleItemPress('DISK-REMÉDIO')}
        >
          <Text style={styles.itemTitle}>DISK-REMÉDIO</Text>
          <Text style={styles.itemDescriptionItalic}>(por proximidade)</Text>
        </TouchableOpacity>
      </ScrollView>

      {/* Bottom Navigation */}
      <View style={styles.bottomNav}>
        <Text style={styles.timer}>{timer}</Text>
        <View style={styles.navIcons}>
          <TouchableOpacity 
            style={styles.navButton}
            onPress={() => onNavigate('Home')}
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
  supermarketSection: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#90ee90',
    paddingHorizontal: wp(2),
    paddingVertical: hp(1),
    borderBottomWidth: 2,
    borderBottomColor: '#000',
  },
  supermarketTitle: {
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
  // Estilos dos itens
  freeAdsItem: {
    backgroundColor: '#ffcc00',
    paddingVertical: hp(2),
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#000',
  },
  viewAdsItem: {
    backgroundColor: '#90ee90',
    paddingVertical: hp(2),
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#000',
  },
  wantToAdvertise: {
    backgroundColor: '#90ee90',
    paddingVertical: hp(2),
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#000',
  },
  prizesItem: {
    backgroundColor: '#fff',
    paddingVertical: hp(2),
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#000',
  },
  camerasItem: {
    backgroundColor: '#add8e6',
    paddingVertical: hp(2),
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#000',
  },
  gamesItem: {
    backgroundColor: '#dda0dd',
    paddingVertical: hp(2),
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#000',
  },
  jobsItem: {
    backgroundColor: '#ffb6c1',
    paddingVertical: hp(2),
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#000',
  },
  productHuntItem: {
    backgroundColor: '#ffcc00',
    paddingVertical: hp(2),
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#000',
  },
  serviceHuntItem: {
    backgroundColor: '#90ee90',
    paddingVertical: hp(2),
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#000',
  },
  medicineItem: {
    backgroundColor: '#90ee90',
    paddingVertical: hp(2),
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#000',
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
});