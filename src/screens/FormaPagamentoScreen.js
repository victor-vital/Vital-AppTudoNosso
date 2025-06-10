import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  StatusBar,
  SafeAreaView,
  TextInput,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { normalize, wp, hp } from '../utils/responsive';
import { useApp } from '../context/AppContext';

export default function FormaPagamentoScreen({ onBack, onNavigate }) {
  const { setCurrentScreen, timer } = useApp(); // Timer global
  const [pressedButton, setPressedButton] = useState(null);
  const [dinheiroValue, setDinheiroValue] = useState('');

  // Removido o timer local - agora usa o global do contexto

  const handleHeaderButtonPress = (buttonName, action) => {
    setPressedButton(buttonName);
    
    setTimeout(() => setPressedButton(null), 200);
    
    action();
  };

  const handleActionButtonPress = (buttonName) => {
    setPressedButton(buttonName);
    
    setTimeout(() => setPressedButton(null), 200);
    
    // Todos os botões voltam para Home conforme padrão
    onNavigate('Home');
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
            onPress={() => handleHeaderButtonPress('header-forward', () => onNavigate && onNavigate('Home'))}
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

          {/* Seção Forma de Pagamento */}
          <View style={styles.paymentSectionContainer}>
            <View style={styles.paymentSection}>
              <Text style={styles.paymentTitle}>FORMA DE PAGAMENTO</Text>
              <TouchableOpacity 
                style={[styles.instructionsButton, pressedButton === 'payment-instructions' && styles.pressedNavButton]}
                onPress={() => handleHeaderButtonPress('payment-instructions', () => onNavigate('Home'))}
              >
                <Text style={styles.instructionsText}>Instruções</Text>
              </TouchableOpacity>
            </View>
          </View>

          <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
            {/* Tabela de Formas de Pagamento */}
            <View style={styles.paymentTableContainer}>
              <View style={styles.paymentTable}>
                {/* Header da Tabela */}
                <View style={styles.tableHeader}>
                  <View style={styles.headerLeft}>
                    <Text style={styles.headerText}>FORMAS DE{'\n'}PAGAMENTO</Text>
                  </View>
                  <View style={styles.headerRight}>
                    <Text style={styles.headerRightText}>CRÉDITO</Text>
                  </View>
                </View>

                {/* Linhas da Tabela */}
                <View style={styles.tableBody}>
                  {/* Pré-entrega */}
                  <View style={styles.tableRow}>
                    <View style={styles.paymentMethodCell}>
                      <Text style={styles.paymentMethodText}>PRÉ-ENTREGA</Text>
                      <TouchableOpacity 
                        style={[styles.okButton, pressedButton === 'pre-entrega' && styles.pressedButton]}
                        onPress={() => handleActionButtonPress('pre-entrega')}
                      >
                        <Text style={styles.okButtonText}>ok</Text>
                      </TouchableOpacity>
                    </View>
                    
                    <View style={styles.creditOptionsContainer}>
                      {/* Linha 1X */}
                      <View style={styles.creditRow}>
                        <Text style={styles.timesText}>1X</Text>
                        <Text style={styles.priceText}>27,34</Text>
                        <TouchableOpacity 
                          style={[styles.okButton, pressedButton === 'credit-1x-1' && styles.pressedButton]}
                          onPress={() => handleActionButtonPress('credit-1x-1')}
                        >
                          <Text style={styles.okButtonText}>ok</Text>
                        </TouchableOpacity>
                      </View>
                      
                      {/* Linha 2X */}
                      <View style={styles.creditRow}>
                        <Text style={styles.timesText}>2X</Text>
                        <Text style={styles.priceTextGreen}>13,67</Text>
                        <TouchableOpacity 
                          style={[styles.okButton, pressedButton === 'credit-2x' && styles.pressedButton]}
                          onPress={() => handleActionButtonPress('credit-2x')}
                        >
                          <Text style={styles.okButtonText}>ok</Text>
                        </TouchableOpacity>
                      </View>
                      
                      {/* Linha 3X */}
                      <View style={styles.creditRow}>
                        <Text style={styles.timesText}>3X</Text>
                        <Text style={styles.priceText}>13,67</Text>
                        <TouchableOpacity 
                          style={[styles.okButton, pressedButton === 'credit-3x' && styles.pressedButton]}
                          onPress={() => handleActionButtonPress('credit-3x')}
                        >
                          <Text style={styles.okButtonText}>ok</Text>
                        </TouchableOpacity>
                      </View>
                    </View>
                  </View>

                  {/* Pós-entrega */}
                  <View style={styles.tableRow}>
                    <View style={styles.paymentMethodCell}>
                      <Text style={styles.paymentMethodText}>PÓS-ENTREGA</Text>
                      <TouchableOpacity 
                        style={[styles.okButtonGreen, pressedButton === 'pos-entrega' && styles.pressedButton]}
                        onPress={() => handleActionButtonPress('pos-entrega')}
                      >
                        <Text style={styles.okButtonText}>ok</Text>
                      </TouchableOpacity>
                    </View>
                    
                    <View style={styles.creditOptionsContainer}>
                      {/* Débito */}
                      <View style={styles.debitRow}>
                        <Text style={styles.debitText}>DÉBITO</Text>
                        <Text style={styles.timesText}>1X</Text>
                        <Text style={styles.priceText}>27,34</Text>
                        <TouchableOpacity 
                          style={[styles.okButton, pressedButton === 'debit' && styles.pressedButton]}
                          onPress={() => handleActionButtonPress('debit')}
                        >
                          <Text style={styles.okButtonText}>ok</Text>
                        </TouchableOpacity>
                      </View>
                      
                      {/* PIX */}
                      <View style={styles.debitRow}>
                        <Text style={styles.debitText}>PIX</Text>
                        <Text style={styles.timesText}>1X</Text>
                        <Text style={styles.priceText}>27,34</Text>
                        <TouchableOpacity 
                          style={[styles.okButton, pressedButton === 'pix' && styles.pressedButton]}
                          onPress={() => handleActionButtonPress('pix')}
                        >
                          <Text style={styles.okButtonText}>ok</Text>
                        </TouchableOpacity>
                      </View>
                      
                      {/* Dinheiro */}
                      <View style={styles.dinheiroRow}>
                        <Text style={styles.debitText}>DINHEIRO</Text>
                        <TextInput
                          style={styles.dinheiroInput}
                          placeholder="(digitar valor)"
                          placeholderTextColor="#ff0000"
                          value={dinheiroValue}
                          onChangeText={setDinheiroValue}
                          keyboardType="numeric"
                        />
                        <TouchableOpacity 
                          style={[styles.okButton, pressedButton === 'dinheiro' && styles.pressedButton]}
                          onPress={() => handleActionButtonPress('dinheiro')}
                        >
                          <Text style={styles.okButtonText}>ok</Text>
                        </TouchableOpacity>
                      </View>
                    </View>
                  </View>
                </View>
              </View>
            </View>

            {/* Botões de Ação */}
            <View style={styles.actionButtonsContainer}>
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

              {/* Enviar Pedido */}
              <TouchableOpacity
                style={[
                  styles.actionButton,
                  pressedButton === 'send-order' && styles.pressedButton
                ]}
                onPress={() => handleActionButtonPress('send-order')}
              >
                <Text style={styles.actionButtonText}>ENVIAR PEDIDO</Text>
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
  paymentSectionContainer: {
    marginHorizontal: wp(3),
    marginBottom: hp(0.8),
  },
  paymentSection: {
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
  paymentTitle: {
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
  paymentTableContainer: {
    marginBottom: hp(1),
  },
  paymentTable: {
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
  tableHeader: {
    flexDirection: 'row',
    borderBottomWidth: 2,
    borderBottomColor: '#000',
  },
  headerLeft: {
    flex: 1,
    paddingVertical: hp(1),
    paddingHorizontal: wp(2),
    borderRightWidth: 2,
    borderRightColor: '#000',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerText: {
    fontSize: normalize(12),
    fontWeight: 'bold',
    textAlign: 'center',
  },
  headerRight: {
    flex: 1,
    paddingVertical: hp(1),
    paddingHorizontal: wp(2),
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerRightText: {
    fontSize: normalize(12),
    fontWeight: 'bold',
  },
  tableBody: {
    flexDirection: 'column',
  },
  tableRow: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#000',
  },
  paymentMethodCell: {
    flex: 1,
    borderRightWidth: 2,
    borderRightColor: '#000',
    paddingVertical: hp(1),
    paddingHorizontal: wp(1),
  },
  paymentMethodText: {
    fontSize: normalize(11),
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: hp(0.5),
  },
  creditOptionsContainer: {
    flex: 1,
  },
  creditRow: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#000',
    alignItems: 'center',
    paddingVertical: hp(0.5),
  },
  debitRow: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#000',
    alignItems: 'center',
    paddingVertical: hp(0.5),
  },
  dinheiroRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: hp(0.5),
  },
  timesText: {
    fontSize: normalize(11),
    fontWeight: 'bold',
    width: wp(8),
    textAlign: 'center',
  },
  priceText: {
    fontSize: normalize(11),
    fontWeight: 'bold',
    flex: 1,
    textAlign: 'center',
  },
  priceTextGreen: {
    fontSize: normalize(11),
    fontWeight: 'bold',
    flex: 1,
    textAlign: 'center',
    backgroundColor: '#90EE90',
    paddingVertical: hp(0.3),
  },
  debitText: {
    fontSize: normalize(10),
    fontWeight: 'bold',
    width: wp(18),
    textAlign: 'center',
  },
  dinheiroInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#000',
    borderRadius: 3,
    paddingHorizontal: wp(1),
    paddingVertical: hp(0.3),
    fontSize: normalize(9),
    fontStyle: 'italic',
    marginHorizontal: wp(1),
    textAlign: 'center',
  },
  okButton: {
    backgroundColor: '#e8e8e8',
    paddingHorizontal: wp(2),
    paddingVertical: hp(0.3),
    borderRadius: 3,
    borderWidth: 1,
    borderColor: '#000',
    marginHorizontal: wp(1),
  },
  okButtonGreen: {
    backgroundColor: '#90EE90',
    paddingHorizontal: wp(2),
    paddingVertical: hp(0.3),
    borderRadius: 3,
    borderWidth: 1,
    borderColor: '#000',
    marginHorizontal: wp(1),
  },
  okButtonText: {
    fontSize: normalize(9),
    fontWeight: 'bold',
    textAlign: 'center',
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