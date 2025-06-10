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

const products = [
  {
    id: 1,
    name: 'Açúcar refinado, 1 kg, União',
    number: '1/40',
    price: 4.34,
    quantity: 1,
    highlighted: false,
  },
  {
    id: 2,
    name: 'Arroz, tipo 1, 1 kg, Faccio',
    number: '2/40',
    price: 4.34,
    quantity: 1,
    highlighted: false,
  },
  {
    id: 3,
    name: 'Feijão tipo 1, 1 kg, Kicaldo',
    number: '3/40',
    price: 4.34,
    quantity: 1,
    highlighted: false,
  },
  {
    id: 4,
    name: 'Café em pó, 250 g, Pilão',
    number: '4/40',
    price: 12.34,
    quantity: 1,
    highlighted: false, // Removido o destaque
  },
];

export default function PrecosNoMuroScreen({ onBack, onNavigate }) {
  const { setCurrentScreen, timer } = useApp(); // Timer global
  const [pressedButton, setPressedButton] = useState(null);
  const [productQuantities, setProductQuantities] = useState({});

  // Removido o timer local - agora usa o global do contexto

  const handleHeaderButtonPress = (buttonName, action) => {
    setPressedButton(buttonName);
    
    setTimeout(() => setPressedButton(null), 200);
    
    action();
  };

  const handleQuantityChange = (productId, change) => {
    setPressedButton(`${productId}-${change > 0 ? 'plus' : 'minus'}`);
    
    setTimeout(() => setPressedButton(null), 200);
    
    setProductQuantities(prev => {
      const currentQty = prev[productId] || 1;
      const newQty = Math.max(1, currentQty + change);
      return { ...prev, [productId]: newQty };
    });
  };

  const handleProductClick = (product) => {
    setPressedButton(`product-${product.id}`);
    
    setTimeout(() => setPressedButton(null), 200);
    
    // Navegar para tela de detalhes do produto
    onNavigate('ProdutoDetalhes', product);
  };

  const getQuantity = (productId) => {
    return productQuantities[productId] || 1;
  };

  const handleAddToCart = (productId) => {
    setPressedButton(`cart-${productId}`);
    
    setTimeout(() => setPressedButton(null), 200);
    
    Alert.alert('Carrinho', 'Produto adicionado ao carrinho!');
  };

  const renderProduct = (product, isLeft = true) => {
    const containerStyle = [
      styles.productContainer,
      product.highlighted && styles.highlightedProduct,
      !isLeft && styles.rightProduct,
      pressedButton === `product-${product.id}` && styles.pressedButton
    ];

    return (
      <TouchableOpacity 
        style={containerStyle} 
        key={product.id}
        onPress={() => handleProductClick(product)}
      >
        {/* Cabeçalho do produto */}
        <View style={styles.productHeader}>
          <Text style={styles.productName}>{product.name}</Text>
          <Text style={styles.productNumber}>Nº {product.number}</Text>
        </View>

        {/* Área de inserções */}
        <View style={styles.insertionsContainer}>
          <View style={styles.insertionsLeft}>
            {[1, 2, 3, 4].map(num => (
              <View key={num} style={styles.insertionItem}>
                <Text style={styles.insertionText}>Inserção {num}</Text>
              </View>
            ))}
          </View>
          
          <View style={styles.productImageContainer}>
            <Text style={styles.productImagePlaceholder}>IMAGEM{'\n'}PRODUTO</Text>
          </View>
        </View>

        {/* Controles de quantidade e preço */}
        <View style={styles.productControls}>
          <TouchableOpacity
            style={[
              styles.quantityButton,
              pressedButton === `${product.id}-minus` && styles.pressedButton
            ]}
            onPress={() => handleQuantityChange(product.id, -1)}
          >
            <Text style={styles.quantityButtonText}>-</Text>
          </TouchableOpacity>

          <Text style={styles.quantityText}>{getQuantity(product.id)}</Text>

          <TouchableOpacity
            style={[
              styles.quantityButton,
              pressedButton === `${product.id}-plus` && styles.pressedButton
            ]}
            onPress={() => handleQuantityChange(product.id, 1)}
          >
            <Text style={styles.quantityButtonText}>+</Text>
          </TouchableOpacity>

          <Text style={styles.priceText}>{product.price.toFixed(2).replace('.', ',')}</Text>

          <TouchableOpacity
            style={[
              styles.cartButton,
              pressedButton === `cart-${product.id}` && styles.pressedButton
            ]}
            onPress={() => handleAddToCart(product.id)}
          >
            <Ionicons name="cart" size={normalize(16)} color="white" />
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
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
            onPress={() => handleHeaderButtonPress('header-forward', () => onNavigate && onNavigate('ProdutoDetalhes'))}
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

          <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
            {/* Grid de Produtos */}
            <View style={styles.productsGrid}>
              {/* Primeira linha */}
              <View style={styles.productRow}>
                {renderProduct(products[0], true)}
                {renderProduct(products[1], false)}
              </View>

              {/* Segunda linha */}
              <View style={styles.productRow}>
                {renderProduct(products[2], true)}
                {renderProduct(products[3], false)}
              </View>
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
  content: {
    flex: 1,
    paddingHorizontal: wp(3),
  },
  productsGrid: {
    flex: 1,
  },
  productRow: {
    flexDirection: 'row',
    marginBottom: hp(1),
  },
  productContainer: {
    flex: 1,
    backgroundColor: '#fff',
    borderRadius: 5,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    marginRight: wp(1),
    borderWidth: 1,
    borderColor: '#000',
  },
  rightProduct: {
    marginRight: 0,
    marginLeft: wp(1),
  },
  highlightedProduct: {
    backgroundColor: '#fff3cd',
    borderColor: '#ff0000',
    borderWidth: 3,
  },
  productHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: wp(1),
    paddingVertical: hp(0.5),
    borderBottomWidth: 1,
    borderBottomColor: '#000',
  },
  productName: {
    fontSize: normalize(8),
    fontWeight: 'bold',
    flex: 1,
    marginRight: wp(1),
  },
  productNumber: {
    fontSize: normalize(8),
    fontWeight: 'bold',
  },
  insertionsContainer: {
    flexDirection: 'row',
    height: hp(12),
  },
  insertionsLeft: {
    flex: 1,
    borderRightWidth: 1,
    borderRightColor: '#000',
  },
  insertionItem: {
    flex: 1,
    borderBottomWidth: 1,
    borderBottomColor: '#000',
    paddingHorizontal: wp(0.5),
    paddingVertical: hp(0.3),
    justifyContent: 'center',
  },
  insertionText: {
    fontSize: normalize(7),
  },
  productImageContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f8f8f8',
  },
  productImagePlaceholder: {
    fontSize: normalize(8),
    textAlign: 'center',
    color: '#666',
  },
  productControls: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: wp(0.5),
    paddingVertical: hp(0.5),
    borderTopWidth: 1,
    borderTopColor: '#000',
  },
  quantityButton: {
    backgroundColor: '#e8e8e8',
    paddingHorizontal: wp(1.5),
    paddingVertical: hp(0.3),
    borderRadius: 3,
    borderWidth: 1,
    borderColor: '#000',
    minWidth: wp(6),
    alignItems: 'center',
  },
  quantityButtonText: {
    fontSize: normalize(12),
    fontWeight: 'bold',
  },
  quantityText: {
    fontSize: normalize(12),
    fontWeight: 'bold',
    marginHorizontal: wp(1),
    minWidth: wp(4),
    textAlign: 'center',
  },
  priceText: {
    fontSize: normalize(12),
    fontWeight: 'bold',
    marginHorizontal: wp(1),
    flex: 1,
    textAlign: 'center',
  },
  cartButton: {
    backgroundColor: '#ff6600',
    paddingHorizontal: wp(1.5),
    paddingVertical: hp(0.3),
    borderRadius: 3,
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: wp(6),
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