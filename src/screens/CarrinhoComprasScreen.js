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

export default function CarrinhoComprasScreen({ onBack, onNavigate }) {
  const { setCurrentScreen, timer } = useApp(); // Timer global
  const [pressedButton, setPressedButton] = useState(null);

  // Dados do carrinho (exemplo com o café)
  const cartItems = [
    {
      id: 1,
      name: 'Café em pó, 250 g, Pilão',
      quantity: 1,
      unitPrice: 12.34,
      totalPrice: 12.34,
    },
    // Outros itens vazios para demonstrar o layout
    { id: 2, name: '', quantity: 0, unitPrice: 0, totalPrice: 0 },
    { id: 3, name: '', quantity: 0, unitPrice: 0, totalPrice: 0 },
    { id: 4, name: '', quantity: 0, unitPrice: 0, totalPrice: 0 },
    { id: 5, name: '', quantity: 0, unitPrice: 0, totalPrice: 0 },
  ];

  const subtotal = 12.34;
  const total = 27.34; // Incluindo frete

  // Removido o timer local - agora usa o global do contexto

  const handleHeaderButtonPress = (buttonName, action) => {
    setPressedButton(buttonName);
    
    setTimeout(() => setPressedButton(null), 200);
    
    action();
  };

  const handleActionButtonPress = (buttonName) => {
    setPressedButton(buttonName);
    
    setTimeout(() => setPressedButton(null), 200);
    
    // Se for forma de pagamento, navegar para a tela específica
    if (buttonName === 'payment') {
      onNavigate('FormaPagamento');
    } else {
      // Todos os outros botões voltam para Home conforme padrão
      onNavigate('Home');
    }
  };

  const renderCartItem = (item, index) => {
    return (
      <View key={item.id} style={styles.cartItemRow}>
        <View style={styles.itemNumber}>
          <Text style={styles.itemNumberText}>{index + 1}</Text>
        </View>
        
        <View style={styles.itemName}>
          <Text style={styles.itemNameText}>{item.name}</Text>
        </View>
        
        <TouchableOpacity style={styles.quantityButton} disabled>
          <Text style={styles.quantityButtonText}>-</Text>
        </TouchableOpacity>
        
        <View style={styles.quantityDisplay}>
          <Text style={styles.quantityText}>{item.quantity || ''}</Text>
        </View>
        
        <TouchableOpacity style={styles.quantityButton} disabled>
          <Text style={styles.quantityButtonText}>+</Text>
        </TouchableOpacity>
        
        <View style={styles.priceCell}>
          <Text style={styles.priceText}>
            {item.unitPrice > 0 ? item.unitPrice.toFixed(2).replace('.', ',') : ''}
          </Text>
        </View>
        
        <View style={styles.totalCell}>
          <Text style={styles.totalText}>
            {item.totalPrice > 0 ? item.totalPrice.toFixed(2).replace('.', ',') : ''}
          </Text>
        </View>
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
            onPress={() => handleHeaderButtonPress('header-forward', () => onNavigate && onNavigate('FormaPagamento'))}
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

          {/* Seção Carrinho de Compras */}
          <View style={styles.cartSectionContainer}>
            <View style={styles.cartSection}>
              <Text style={styles.cartTitle}>CARRINHO DE COMPRAS</Text>
              <TouchableOpacity 
                style={[styles.instructionsButton, pressedButton === 'cart-instructions' && styles.pressedNavButton]}
                onPress={() => handleHeaderButtonPress('cart-instructions', () => onNavigate('Home'))}
              >
                <Text style={styles.instructionsText}>Instruções</Text>
              </TouchableOpacity>
            </View>
          </View>

          <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
            {/* Tabela do Carrinho */}
            <View style={styles.cartTableContainer}>
              <View style={styles.cartTable}>
                {cartItems.map((item, index) => renderCartItem(item, index))}
              </View>
            </View>

            {/* Subtotal */}
            <View style={styles.subtotalContainer}>
              <View style={styles.subtotalSection}>
                <Text style={styles.subtotalLabel}>SUBTOTAL</Text>
                <Text style={styles.subtotalValue}>{subtotal.toFixed(2).replace('.', ',')}</Text>
              </View>
            </View>

            {/* Tabela de Frete */}
            <View style={styles.shippingTableContainer}>
              <View style={styles.shippingTable}>
                <View style={styles.shippingHeader}>
                  <Text style={styles.shippingHeaderText}>TABELA{'\n'}DE{'\n'}FRETE</Text>
                </View>
                
                <View style={styles.shippingRules}>
                  <View style={styles.shippingRow}>
                    <Text style={styles.shippingLabel}>Até</Text>
                    <Text style={styles.shippingValue}>50,00</Text>
                    <Text style={styles.shippingPrice}>15,00</Text>
                  </View>
                  
                  <View style={styles.shippingRow}>
                    <Text style={styles.shippingRange}>De R$ 50,01 a</Text>
                    <Text style={styles.shippingValue}>100,00</Text>
                    <Text style={styles.shippingPrice}>10,00</Text>
                  </View>
                  
                  <View style={styles.shippingRow}>
                    <Text style={styles.shippingRange}>De R$ 100,01 a</Text>
                    <Text style={styles.shippingValue}>150,00</Text>
                    <Text style={styles.shippingPrice}>5,00</Text>
                  </View>
                  
                  <View style={styles.shippingRow}>
                    <Text style={styles.shippingRange}>Acima de</Text>
                    <Text style={styles.shippingValue}>150,00</Text>
                    <Text style={styles.shippingPrice}>0,00</Text>
                  </View>
                </View>
              </View>
            </View>

            {/* Total */}
            <View style={styles.totalContainer}>
              <View style={styles.totalSection}>
                <Text style={styles.totalLabel}>TOTAL</Text>
                <Text style={styles.totalValue}>{total.toFixed(2).replace('.', ',')}</Text>
              </View>
            </View>

            {/* Botões de Ação */}
            <View style={styles.actionButtonsContainer}>
              {/* Forma de Pagamento */}
              <TouchableOpacity
                style={[
                  styles.actionButton,
                  pressedButton === 'payment' && styles.pressedButton
                ]}
                onPress={() => handleActionButtonPress('payment')}
              >
                <Text style={styles.actionButtonText}>FORMA DE PAGAMENTO</Text>
                <View style={styles.verButton}>
                  <Text style={styles.verButtonText}>ver</Text>
                </View>
              </TouchableOpacity>

              {/* Endereço de Entrega */}
              <TouchableOpacity
                style={[
                  styles.actionButton,
                  pressedButton === 'address' && styles.pressedButton
                ]}
                onPress={() => handleActionButtonPress('address')}
              >
                <Text style={styles.actionButtonText}>ENDEREÇO DE ENTREGA</Text>
                <View style={styles.verButton}>
                  <Text style={styles.verButtonText}>ver</Text>
                </View>
              </TouchableOpacity>

              {/* Brindes Grátis */}
              <TouchableOpacity
                style={[
                  styles.actionButton,
                  pressedButton === 'gifts' && styles.pressedButton
                ]}
                onPress={() => handleActionButtonPress('gifts')}
              >
                <Text style={styles.actionButtonText}>BRINDES GRÁTIS</Text>
                <View style={styles.verButton}>
                  <Text style={styles.verButtonText}>ver</Text>
                </View>
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
  cartSectionContainer: {
    marginHorizontal: wp(3),
    marginBottom: hp(0.8),
  },
  cartSection: {
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
  cartTitle: {
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
  content: {
    flex: 1,
    paddingHorizontal: wp(3),
  },
  cartTableContainer: {
    marginBottom: hp(1),
  },
  cartTable: {
    backgroundColor: '#fff',
    borderRadius: 5,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    borderWidth: 1,
    borderColor: '#000',
  },
  cartItemRow: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#000',
    minHeight: hp(4),
  },
  itemNumber: {
    width: wp(8),
    borderRightWidth: 1,
    borderRightColor: '#000',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: hp(0.5),
  },
  itemNumberText: {
    fontSize: normalize(12),
    fontWeight: 'bold',
  },
  itemName: {
    flex: 1,
    borderRightWidth: 1,
    borderRightColor: '#000',
    paddingHorizontal: wp(1),
    paddingVertical: hp(0.5),
    justifyContent: 'center',
  },
  itemNameText: {
    fontSize: normalize(10),
  },
  quantityButton: {
    width: wp(8),
    borderRightWidth: 1,
    borderRightColor: '#000',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#e8e8e8',
  },
  quantityButtonText: {
    fontSize: normalize(14),
    fontWeight: 'bold',
  },
  quantityDisplay: {
    width: wp(8),
    borderRightWidth: 1,
    borderRightColor: '#000',
    alignItems: 'center',
    justifyContent: 'center',
  },
  quantityText: {
    fontSize: normalize(12),
    fontWeight: 'bold',
  },
  priceCell: {
    width: wp(12),
    borderRightWidth: 1,
    borderRightColor: '#000',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: hp(0.5),
  },
  priceText: {
    fontSize: normalize(10),
    fontWeight: 'bold',
  },
  totalCell: {
    width: wp(12),
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: hp(0.5),
    backgroundColor: '#90EE90',
  },
  totalText: {
    fontSize: normalize(10),
    fontWeight: 'bold',
  },
  subtotalContainer: {
    marginBottom: hp(1),
  },
  subtotalSection: {
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
  },
  subtotalLabel: {
    fontSize: normalize(14),
    fontWeight: 'bold',
  },
  subtotalValue: {
    fontSize: normalize(14),
    fontWeight: 'bold',
    backgroundColor: '#90EE90',
    paddingHorizontal: wp(2),
    paddingVertical: hp(0.5),
    borderRadius: 3,
  },
  shippingTableContainer: {
    marginBottom: hp(1),
  },
  shippingTable: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 5,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    borderWidth: 1,
    borderColor: '#000',
  },
  shippingHeader: {
    width: wp(20),
    borderRightWidth: 1,
    borderRightColor: '#000',
    paddingVertical: hp(2),
    alignItems: 'center',
    justifyContent: 'center',
  },
  shippingHeaderText: {
    fontSize: normalize(12),
    fontWeight: 'bold',
    textAlign: 'center',
  },
  shippingRules: {
    flex: 1,
  },
  shippingRow: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#000',
    minHeight: hp(3),
  },
  shippingLabel: {
    flex: 1,
    fontSize: normalize(11),
    textAlign: 'center',
    alignSelf: 'center',
  },
  shippingRange: {
    flex: 2,
    fontSize: normalize(10),
    textAlign: 'center',
    alignSelf: 'center',
  },
  shippingValue: {
    width: wp(15),
    fontSize: normalize(11),
    textAlign: 'center',
    alignSelf: 'center',
    borderRightWidth: 1,
    borderRightColor: '#000',
    paddingVertical: hp(0.8),
  },
  shippingPrice: {
    width: wp(15),
    fontSize: normalize(11),
    textAlign: 'center',
    alignSelf: 'center',
    backgroundColor: '#90EE90',
    paddingVertical: hp(0.8),
  },
  totalContainer: {
    marginBottom: hp(1),
  },
  totalSection: {
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
  },
  totalLabel: {
    fontSize: normalize(16),
    fontWeight: 'bold',
  },
  totalValue: {
    fontSize: normalize(16),
    fontWeight: 'bold',
    backgroundColor: '#90EE90',
    paddingHorizontal: wp(3),
    paddingVertical: hp(0.5),
    borderRadius: 3,
  },
  actionButtonsContainer: {
    marginBottom: hp(2),
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#fff',
    paddingHorizontal: wp(2),
    paddingVertical: hp(1.5),
    borderRadius: 5,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    marginBottom: hp(1),
  },
  actionButtonText: {
    fontSize: normalize(14),
    fontWeight: 'bold',
    flex: 1,
  },
  verButton: {
    backgroundColor: '#fff',
    paddingHorizontal: wp(2),
    paddingVertical: hp(0.5),
    borderRadius: 3,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  verButtonText: {
    fontSize: normalize(10),
    color: '#ff0000',
    fontStyle: 'italic',
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