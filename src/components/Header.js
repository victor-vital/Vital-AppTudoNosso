import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { normalize, wp, hp } from '../utils/responsive';

export default function Header() {
  return (
    <View style={styles.header}>
      <Ionicons name="arrow-back" size={normalize(20)} color="white" />
      <Text style={styles.headerTitle}>NOSSO GUIA DE COMPRAS</Text>
      <Ionicons name="arrow-forward" size={normalize(20)} color="white" />
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: '#ff0000',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: wp(3),
    paddingVertical: hp(1.2),
  },
  headerTitle: {
    color: 'white',
    fontSize: normalize(18),
    fontWeight: 'bold',
    fontStyle: 'italic',
    maxWidth: wp(70),
    textAlign: 'center',
  },
});