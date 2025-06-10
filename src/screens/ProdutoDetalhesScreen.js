import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  StatusBar,
  SafeAreaView,
  TextInput,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { normalize, wp, hp } from '../utils/responsive';
import { useApp } from '../context/AppContext';

export default function ProdutoDetalhesScreen({ onBack, onNavigate, productData }) {
  const { setCurrentScreen, timer } = useApp(); // Timer global
  const [pressedButton, setPressedButton] = useState(null);
  const [quantity, setQuantity] = useState(1);

  // Dados padrão do produto (Café Pilão) - pode ser passado via props
  const product = productData || {
    name: 'Café em pó, 250 g, Pilão',
    price: 12.34,
    image: 'PILÃO', // Placeholder para imagem
  };

  // Removido o timer local - agora usa o global do contexto

  const handleHeaderButtonPress = (buttonName, action) => {
    setPressedButton(buttonName);
    
    setTimeout(() => setPressedButton(null), 200);
    
    action();
  };

  const handleQuantityChange = (change) => {
    setPressedButton(change > 0 ? 'plus' : 'minus');
    
    setTimeout(() => setPressedButton(null), 200);
    
    setQuantity(prev => Math.max(1, prev + change));
  };

  const handleQuantityInput = (text) => {
    const num = parseInt(text) || 1;
    setQuantity(Math.max(1, num));
  };

  const handleAddToCart = () => {
    setPressedButton('cart');
    
    setTimeout(() => setPressedButton(null), 200);
    
    // Navegar para a tela do carrinho
    onNavigate('CarrinhoCompras');
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
            onPress={() => handleHeaderButtonPress('header-forward', () => onNavigate && onNavigate('CarrinhoCompras'))}
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
              <Text style={styles.storeTitle}>BARATÃO DA CARNE</Text>
              <TouchableOpacity 
                style={[styles.arrowButton, pressedButton === 'store-arrow' && styles.pressedNavButton]}
                onPress={() => handleHeaderButtonPress('store-arrow', () => onNavigate('Home'))}
              >
                <Ionicons name="chevron-down" size={normalize(20)} color="black" />
              </TouchableOpacity>
            </View>
          </View>

          {/* Seção Compras Online */}
          <View style={styles.onlineSectionContainer}>
            <View style={styles.onlineSection}>
              <Text style={styles.onlineTitle}>COMPRAS ON-LINE</Text>
              <TouchableOpacity 
                style={[styles.instructionsButton, pressedButton === 'online-instructions' && styles.pressedNavButton]}
                onPress={() => handleHeaderButtonPress('online-instructions', () => onNavigate('Home'))}
              >
                <Text style={styles.instructionsText}>Instruções</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Seção Preços no Muro */}
          <View style={styles.pricesSectionContainer}>
            <View style={styles.pricesSection}>
              <Text style={styles.pricesTitle}>PREÇOS NO MURO</Text>
              <Text style={styles.pricesDate}>Válido até{'\n'}dia/mês/ano</Text>
            </View>
          </View>

          {/* Nome do Produto */}
          <View style={styles.productNameContainer}>
            <View style={styles.productNameSection}>
              <Text style={styles.productNameText}>{product.name}</Text>
            </View>
          </View>

          {/* Área Principal do Produto */}
          <View style={styles.productMainContainer}>
            <View style={styles.productMainSection}>
              {/* Lado Esquerdo - Informações */}
              <View style={styles.productLeftSide}>
                <View style={styles.infoBox}>
                  <Text style={styles.infoText}>Pagamento{'\n'}pós-entrega</Text>
                </View>
                
                <View style={styles.infoBox}>
                  <Text style={styles.infoText}>Aceitamos{'\n'}qualquer{'\n'}cartão</Text>
                </View>
                
                <View style={styles.infoBox}>
                  <Text style={styles.infoText}>Até{'\n'}3 X</Text>
                </View>
                
                <View style={styles.infoBoxEmpty}>
                </View>
              </View>

              {/* Lado Direito - Imagem do Produto */}
              <View style={styles.productRightSide}>
                <View style={styles.productImageContainer}>
                  <Text style={styles.productImageText}>IMAGEM{'\n'}CAFÉ{'\n'}PILÃO</Text>
                </View>
              </View>
            </View>
          </View>

          {/* Controles de Quantidade e Preço */}
          <View style={styles.controlsContainer}>
            <View style={styles.controlsSection}>
              <TouchableOpacity
                style={[
                  styles.quantityButton,
                  pressedButton === 'minus' && styles.pressedButton
                ]}
                onPress={() => handleQuantityChange(-1)}
              >
                <Text style={styles.quantityButtonText}>-</Text>
              </TouchableOpacity>

              <TextInput
                style={styles.quantityInput}
                value={quantity.toString()}
                onChangeText={handleQuantityInput}
                keyboardType="numeric"
                textAlign="center"
              />

              <TouchableOpacity
                style={[
                  styles.quantityButton,
                  pressedButton === 'plus' && styles.pressedButton
                ]}
                onPress={() => handleQuantityChange(1)}
              >
                <Text style={styles.quantityButtonText}>+</Text>
              </TouchableOpacity>

              <Text style={styles.priceText}>{product.price.toFixed(2).replace('.', ',')}</Text>

              <TouchableOpacity
                style={[
                  styles.cartButton,
                  pressedButton === 'cart' && styles.pressedButton
                ]}
                onPress={handleAddToCart}
              >
                <Ionicons name="cart" size={normalize(20)} color="white" />
              </TouchableOpacity>
            </View>
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
              onPress={() => handleHeaderButtonPress('nav-person', () => onNavigate('Home'))}
            >
              <Ionicons name="person" size={normalize(24)} color="black" />
            </TouchableOpacity>
            <TouchableOpacity 
              style={[styles.navButton, pressedButton === 'nav-sorteio' && styles.pressedNavButton]}
              onPress={() => handleHeaderButtonPress('nav-sorteio', () => onNavigate('Home'))}
            >
              <Text style={styles.sortText}>SORTEIO</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={[styles.navButton, pressedButton === 'nav-cpf' && styles.pressedNavButton]}
              onPress={() => handleHeaderButtonPress('nav-cpf', () => onNavigate('Home'))}
            >
              <Text style={styles.cpfText}>CPF</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={[styles.navButton, pressedButton === 'nav-globe' && styles.pressedNavButton]}
              onPress={() => handleHeaderButtonPress('nav-globe', () => onNavigate('Home'))}
            >
              <Ionicons name="globe" size={normalize(24)} color="black" />
            </TouchableOpacity>
            <TouchableOpacity 
              style={[styles.navButton, styles.closeButton, pressedButton === 'nav-close' && styles.pressedNavButton]}
              onPress={() => handleHeaderButtonPress('nav-close', () => onNavigate('Home'))}
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
  storeTitle: {
    fontSize: normalize(16),
    fontWeight: 'bold',
  },
  arrowButton: {
    padding: wp(1),
  },
  onlineSectionContainer: {
    marginHorizontal: wp(3),
    marginBottom: hp(0.8),
  },
  onlineSection: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#90EE90',
    paddingHorizontal: wp(2),
    paddingVertical: hp(1),
    borderRadius: 5,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  onlineTitle: {
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
  pricesSectionContainer: {
    marginHorizontal: wp(3),
    marginBottom: hp(0.8),
  },
  pricesSection: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#fff',
    paddingHorizontal: wp(2),
    paddingVertical: hp(1),
    borderRadius: 5,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    borderWidth: 2,
    borderColor: '#000',
  },
  pricesTitle: {
    fontSize: normalize(14),
    fontWeight: 'bold',
  },
  pricesDate: {
    fontSize: normalize(10),
    textAlign: 'center',
  },
  productNameContainer: {
    marginHorizontal: wp(3),
    marginBottom: hp(0.8),
  },
  productNameSection: {
    backgroundColor: '#fff',
    paddingHorizontal: wp(2),
    paddingVertical: hp(1.5),
    borderRadius: 5,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    alignItems: 'center',
  },
  productNameText: {
    fontSize: normalize(16),
    fontWeight: 'bold',
    textAlign: 'center',
  },
  productMainContainer: {
    marginHorizontal: wp(3),
    marginBottom: hp(0.8),
    flex: 1,
  },
  productMainSection: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 5,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    flex: 1,
  },
  productLeftSide: {
    flex: 1,
    borderRightWidth: 2,
    borderRightColor: '#000',
  },
  infoBox: {
    flex: 1,
    borderBottomWidth: 1,
    borderBottomColor: '#000',
    paddingHorizontal: wp(2),
    paddingVertical: hp(1),
    justifyContent: 'center',
    alignItems: 'center',
  },
  infoBoxEmpty: {
    flex: 1,
    paddingHorizontal: wp(2),
    paddingVertical: hp(1),
  },
  infoText: {
    fontSize: normalize(12),
    textAlign: 'center',
    fontWeight: 'bold',
  },
  productRightSide: {
    flex: 1,
  },
  productImageContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f8f8f8',
    borderTopRightRadius: 5,
    borderBottomRightRadius: 5,
  },
  productImageText: {
    fontSize: normalize(14),
    textAlign: 'center',
    color: '#666',
    fontWeight: 'bold',
  },
  controlsContainer: {
    marginHorizontal: wp(3),
    marginBottom: hp(1),
  },
  controlsSection: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingHorizontal: wp(2),
    paddingVertical: hp(1),
    borderRadius: 5,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    borderWidth: 1,
    borderColor: '#000',
  },
  quantityButton: {
    backgroundColor: '#e8e8e8',
    paddingHorizontal: wp(3),
    paddingVertical: hp(1),
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#000',
    minWidth: wp(10),
    alignItems: 'center',
  },
  quantityButtonText: {
    fontSize: normalize(18),
    fontWeight: 'bold',
  },
  quantityInput: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#000',
    borderRadius: 5,
    paddingHorizontal: wp(2),
    paddingVertical: hp(1),
    marginHorizontal: wp(2),
    minWidth: wp(12),
    fontSize: normalize(16),
    fontWeight: 'bold',
  },
  priceText: {
    fontSize: normalize(18),
    fontWeight: 'bold',
    marginHorizontal: wp(3),
    flex: 1,
    textAlign: 'center',
    color: '#ff0000',
  },
  cartButton: {
    backgroundColor: '#ff6600',
    paddingHorizontal: wp(4),
    paddingVertical: hp(1),
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: wp(12),
    // Removido destaque - botão normal
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