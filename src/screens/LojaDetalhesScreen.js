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

export default function LojaDetalhesScreen({ onBack, onNavigate }) {
  const { setCurrentScreen, timer } = useApp(); // Timer global
  const [pressedButton, setPressedButton] = useState(null);

  // Removido o timer local - agora usa o global do contexto

  const handleButtonPress = (buttonName) => {
    setPressedButton(buttonName);
    
    setTimeout(() => setPressedButton(null), 200);
    
    // Navegar para telas específicas das promoções
    if (buttonName === 'PREÇOS NO MURO') {
      onNavigate('PrecosNoMuro');
    } else if (buttonName === 'VALIDADE/AVARIA') {
      onNavigate('ValidadeAvaria');
    } else if (buttonName === 'PROMOÇÃO DESAPEGA') {
      onNavigate('PromocaoDesapega');
    } else {
      // Todos os outros botões voltam para Home
      onNavigate('Home');
    }
  };

  const handleHeaderButtonPress = (buttonName, action) => {
    setPressedButton(buttonName);
    
    setTimeout(() => setPressedButton(null), 200);
    
    action();
  };

  const handleWhatsAppResponse = (buttonName, response) => {
    setPressedButton(buttonName);
    
    setTimeout(() => setPressedButton(null), 200);
    
    // Botões WhatsApp também voltam para Home
    onNavigate('Home');
  };

  const getButtonStyle = (baseStyle, buttonName) => {
    return [
      baseStyle,
      pressedButton === buttonName && styles.pressedButton
    ];
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
            onPress={() => handleHeaderButtonPress('header-forward', () => onNavigate && onNavigate('PrecosNoMuro'))}
            style={[styles.headerButton, pressedButton === 'header-forward' && styles.pressedNavButton]}
          >
            <Ionicons name="arrow-forward" size={normalize(20)} color="#ff0000" />
          </TouchableOpacity>
        </View>

        {/* Conteúdo principal com fundo azul claro */}
        <View style={styles.blueBackground}>
          {/* Seção da Loja */}
          <View style={styles.storeSectionContainer}>
            <View style={styles.storeSection}>
              <View style={styles.logoSection}>
                <Text style={styles.logoText}>LOGO</Text>
              </View>
              <View style={styles.storeInfo}>
                <Text style={styles.storeTitle}>BARATÃO DA CARNE</Text>
                <Text style={styles.storeLocation}>TORQUATO/SANTOS DUMONT</Text>
              </View>
              <TouchableOpacity 
                style={[styles.arrowButton, pressedButton === 'store-arrow' && styles.pressedNavButton]}
                onPress={() => handleHeaderButtonPress('store-arrow', () => Alert.alert('Seta', 'Função em desenvolvimento'))}
              >
                <Ionicons name="chevron-up" size={normalize(20)} color="black" />
              </TouchableOpacity>
            </View>
          </View>

          <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
            {/* Grid de Botões Principais */}
            <View style={styles.gridContainer}>
              <View style={styles.gridRow}>
                <TouchableOpacity
                  style={getButtonStyle(styles.gridButton, 'ROTA GPS')}
                  onPress={() => handleButtonPress('ROTA GPS')}
                >
                  <Text style={styles.gridButtonText}>ROTA{'\n'}GPS</Text>
                </TouchableOpacity>
                
                <TouchableOpacity
                  style={getButtonStyle(styles.gridButton, 'ENDEREÇO')}
                  onPress={() => handleButtonPress('ENDEREÇO')}
                >
                  <Text style={styles.gridButtonText}>ENDEREÇO</Text>
                </TouchableOpacity>
                
                <TouchableOpacity
                  style={getButtonStyle(styles.gridButton, 'CÂMERAS')}
                  onPress={() => handleButtonPress('CÂMERAS')}
                >
                  <Text style={styles.gridButtonText}>CÂMERAS</Text>
                </TouchableOpacity>
                
                <TouchableOpacity
                  style={getButtonStyle(styles.gridButton, 'FALE CONOSCO')}
                  onPress={() => handleButtonPress('FALE CONOSCO')}
                >
                  <Text style={styles.gridButtonText}>FALE{'\n'}CONOSCO</Text>
                </TouchableOpacity>
              </View>
              
              <View style={styles.gridRow}>
                <TouchableOpacity
                  style={getButtonStyle(styles.gridButton, 'FRETE')}
                  onPress={() => handleButtonPress('FRETE')}
                >
                  <Text style={styles.gridButtonText}>FRETE</Text>
                </TouchableOpacity>
                
                <TouchableOpacity
                  style={getButtonStyle(styles.gridButton, 'HORÁRIO DE TRABALHO')}
                  onPress={() => handleButtonPress('HORÁRIO DE TRABALHO')}
                >
                  <Text style={styles.gridButtonText}>HORÁRIO DE{'\n'}TRABALHO</Text>
                </TouchableOpacity>
                
                <TouchableOpacity
                  style={getButtonStyle(styles.gridButton, 'CARTÃO DA LOJA')}
                  onPress={() => handleButtonPress('CARTÃO DA LOJA')}
                >
                  <Text style={styles.gridButtonText}>CARTÃO{'\n'}DA LOJA</Text>
                </TouchableOpacity>
                
                <TouchableOpacity
                  style={getButtonStyle(styles.gridButton, 'LISTA DE VÍDEO')}
                  onPress={() => handleButtonPress('LISTA DE VÍDEO')}
                >
                  <Text style={styles.gridButtonText}>LISTA{'\n'}DE VÍDEO</Text>
                  <Text style={styles.gridButtonSubtext}>(30 min)</Text>
                </TouchableOpacity>
              </View>
              
              <View style={styles.gridRow}>
                <TouchableOpacity
                  style={getButtonStyle(styles.gridButton, 'VÍDEOS')}
                  onPress={() => handleButtonPress('VÍDEOS')}
                >
                  <Text style={styles.gridButtonText}>VÍDEOS</Text>
                </TouchableOpacity>
                
                <TouchableOpacity
                  style={getButtonStyle(styles.gridButton, 'VAGAS DE EMPREGO')}
                  onPress={() => handleButtonPress('VAGAS DE EMPREGO')}
                >
                  <Text style={styles.gridButtonText}>VAGAS DE{'\n'}EMPREGO</Text>
                </TouchableOpacity>
                
                <TouchableOpacity
                  style={getButtonStyle(styles.gridButton, 'CÓDIGO DE BARRAS')}
                  onPress={() => handleButtonPress('CÓDIGO DE BARRAS')}
                >
                  <Text style={styles.gridButtonText}>CÓDIGO{'\n'}DE BARRAS</Text>
                </TouchableOpacity>
                
                <View style={styles.supportContainer}>
                  <TouchableOpacity 
                    style={[styles.supportButton, pressedButton === 'support' && styles.pressedButton]}
                    onPress={() => handleButtonPress('SUPORTE')}
                  >
                    <Ionicons name="phone-portrait" size={normalize(20)} color="black" />
                    <Text style={styles.supportText}>Posso ajudar?</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>

            {/* Compras Online */}
            <View style={styles.sectionContainer}>
              <View style={styles.sectionHeader}>
                <Text style={styles.sectionTitle}>COMPRAS ON-LINE</Text>
                <TouchableOpacity 
                  style={[styles.instructionsButton, pressedButton === 'compras-instructions' && styles.pressedNavButton]}
                  onPress={() => handleHeaderButtonPress('compras-instructions', () => Alert.alert('Instruções', 'Função em desenvolvimento'))}
                >
                  <Text style={styles.instructionsText}>Instruções</Text>
                </TouchableOpacity>
              </View>
            </View>

            {/* Preços no Muro - Botão Clicável */}
            <View style={styles.promoContainer}>
              <TouchableOpacity
                style={getButtonStyle(styles.promoButton, 'PREÇOS NO MURO')}
                onPress={() => handleButtonPress('PREÇOS NO MURO')}
              >
                <View style={styles.promoHeader}>
                  <Text style={styles.promoTitle}>PREÇOS NO MURO</Text>
                  <Text style={styles.promoDate}>Válido até{'\n'}dia/mês/ano</Text>
                </View>
              </TouchableOpacity>
              <View style={styles.whatsappContainer}>
                <Text style={styles.whatsappText}>Receber este anúncio via WhatsApp?</Text>
                <TouchableOpacity
                  style={getButtonStyle(styles.whatsappButton, 'whatsapp-nao-1')}
                  onPress={() => handleWhatsAppResponse('whatsapp-nao-1', 'Não')}
                >
                  <Text style={styles.whatsappButtonText}>Não</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={getButtonStyle(styles.whatsappButtonYes, 'whatsapp-sim-1')}
                  onPress={() => handleWhatsAppResponse('whatsapp-sim-1', 'Sim')}
                >
                  <Text style={styles.whatsappButtonTextYes}>Sim</Text>
                </TouchableOpacity>
              </View>
            </View>

            {/* Validade/Avaria - Botão Clicável */}
            <View style={styles.promoContainer}>
              <TouchableOpacity
                style={getButtonStyle(styles.promoButton, 'VALIDADE/AVARIA')}
                onPress={() => handleButtonPress('VALIDADE/AVARIA')}
              >
                <View style={styles.promoHeader}>
                  <Text style={styles.promoTitle}>VALIDADE/AVARIA</Text>
                  <Text style={styles.promoDate}>Válido até{'\n'}___/___/___</Text>
                </View>
              </TouchableOpacity>
              <View style={styles.whatsappContainer}>
                <Text style={styles.whatsappText}>Receber este anúncio via WhatsApp?</Text>
                <TouchableOpacity
                  style={getButtonStyle(styles.whatsappButton, 'whatsapp-nao-2')}
                  onPress={() => handleWhatsAppResponse('whatsapp-nao-2', 'Não')}
                >
                  <Text style={styles.whatsappButtonText}>Não</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={getButtonStyle(styles.whatsappButtonYes, 'whatsapp-sim-2')}
                  onPress={() => handleWhatsAppResponse('whatsapp-sim-2', 'Sim')}
                >
                  <Text style={styles.whatsappButtonTextYes}>Sim</Text>
                </TouchableOpacity>
              </View>
            </View>

            {/* Promoção Desapega - Botão Clicável */}
            <View style={styles.promoContainer}>
              <TouchableOpacity
                style={getButtonStyle(styles.promoButton, 'PROMOÇÃO DESAPEGA')}
                onPress={() => handleButtonPress('PROMOÇÃO DESAPEGA')}
              >
                <View style={styles.promoHeader}>
                  <Text style={styles.promoTitle}>PROMOÇÃO DESAPEGA</Text>
                  <Text style={styles.promoDate}>Válido até{'\n'}___/___/___</Text>
                </View>
              </TouchableOpacity>
              <View style={styles.whatsappContainer}>
                <Text style={styles.whatsappText}>Receber este anúncio via WhatsApp?</Text>
                <TouchableOpacity
                  style={getButtonStyle(styles.whatsappButton, 'whatsapp-nao-3')}
                  onPress={() => handleWhatsAppResponse('whatsapp-nao-3', 'Não')}
                >
                  <Text style={styles.whatsappButtonText}>Não</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={getButtonStyle(styles.whatsappButtonYes, 'whatsapp-sim-3')}
                  onPress={() => handleWhatsAppResponse('whatsapp-sim-3', 'Sim')}
                >
                  <Text style={styles.whatsappButtonTextYes}>Sim</Text>
                </TouchableOpacity>
              </View>
            </View>

            {/* Aplicativo da Loja */}
            <View style={styles.appContainer}>
              <Text style={styles.appTitle}>APLICATIVO DA LOJA</Text>
            </View>
          </ScrollView>
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
  storeSectionContainer: {
    marginHorizontal: wp(3),
    marginBottom: hp(0.8),
  },
  storeSection: {
    flexDirection: 'row',
    alignItems: 'center',
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
  logoSection: {
    backgroundColor: '#fff',
    paddingHorizontal: wp(2),
    paddingVertical: hp(1),
    borderRadius: 3,
    marginRight: wp(2),
    borderWidth: 1,
    borderColor: '#000',
  },
  logoText: {
    fontSize: normalize(12),
    fontWeight: 'bold',
  },
  storeInfo: {
    flex: 1,
    alignItems: 'center',
  },
  storeTitle: {
    fontSize: normalize(14),
    fontWeight: 'bold',
  },
  storeLocation: {
    fontSize: normalize(12),
  },
  arrowButton: {
    padding: wp(1),
  },
  content: {
    flex: 1,
    paddingHorizontal: wp(3),
  },
  gridContainer: {
    marginBottom: hp(1),
  },
  gridRow: {
    flexDirection: 'row',
    marginBottom: hp(0.8),
  },
  gridButton: {
    flex: 1,
    backgroundColor: '#fff',
    paddingVertical: hp(1.5),
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: wp(1),
    borderRadius: 5,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    borderWidth: 1,
    borderColor: '#000',
    minHeight: hp(6),
  },
  gridButtonText: {
    fontSize: normalize(10),
    fontWeight: 'bold',
    textAlign: 'center',
  },
  gridButtonSubtext: {
    fontSize: normalize(8),
    color: '#ff0000',
    fontStyle: 'italic',
    marginTop: hp(0.2),
  },
  supportContainer: {
    flex: 1,
    backgroundColor: '#fff',
    paddingVertical: hp(0.5),
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: wp(1),
    borderRadius: 5,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    borderWidth: 1,
    borderColor: '#000',
    minHeight: hp(6),
  },
  supportButton: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: hp(0.5),
  },
  supportText: {
    fontSize: normalize(8),
    color: '#ff0000',
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: hp(0.3),
  },
  sectionContainer: {
    marginBottom: hp(0.8),
  },
  sectionHeader: {
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
  sectionTitle: {
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
    fontSize: normalize(10),
    fontStyle: 'italic',
  },
  promoContainer: {
    marginBottom: hp(0.8),
  },
  promoButton: {
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
  },
  promoHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#fff',
    paddingHorizontal: wp(2),
    paddingVertical: hp(1),
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    borderBottomWidth: 1,
    borderBottomColor: '#000',
  },
  promoTitle: {
    fontSize: normalize(14),
    fontWeight: 'bold',
  },
  promoDate: {
    fontSize: normalize(10),
    textAlign: 'center',
  },
  whatsappContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingHorizontal: wp(2),
    paddingVertical: hp(1),
    borderBottomLeftRadius: 5,
    borderBottomRightRadius: 5,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  whatsappText: {
    flex: 1,
    fontSize: normalize(12),
    marginRight: wp(2),
  },
  whatsappButton: {
    backgroundColor: '#e8e8e8',
    paddingHorizontal: wp(2),
    paddingVertical: hp(0.5),
    borderRadius: 3,
    marginRight: wp(1),
    borderWidth: 1,
    borderColor: '#000',
  },
  whatsappButtonText: {
    fontSize: normalize(12),
    fontWeight: 'bold',
  },
  whatsappButtonYes: {
    backgroundColor: '#25D366',
    paddingHorizontal: wp(2),
    paddingVertical: hp(0.5),
    borderRadius: 3,
    borderWidth: 1,
    borderColor: '#000',
  },
  whatsappButtonTextYes: {
    fontSize: normalize(12),
    fontWeight: 'bold',
    color: '#fff',
  },
  appContainer: {
    backgroundColor: '#fff',
    paddingVertical: hp(2),
    alignItems: 'center',
    borderRadius: 5,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    marginBottom: hp(1),
  },
  appTitle: {
    fontSize: normalize(16),
    fontWeight: 'bold',
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