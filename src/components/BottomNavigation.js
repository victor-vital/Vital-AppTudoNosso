import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { normalize, wp, hp } from '../utils/responsive';

export default function BottomNavigation() {
  return (
    <View style={styles.bottomNav}>
      <Text style={styles.timer}>00:00:00</Text>
      <View style={styles.navIcons}>
        <TouchableOpacity style={styles.navButton}>
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
  );
}

const styles = StyleSheet.create({
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
    paddingHorizontal: wp(1),
  },
  navButton: {
    padding: wp(1),
    minWidth: wp(12),
    alignItems: 'center',
  },
  sortText: {
    fontSize: normalize(11),
    fontWeight: 'bold',
    textAlign: 'center',
  },
  cpfText: {
    fontSize: normalize(11),
    fontWeight: 'bold',
  },
  closeButton: {
    backgroundColor: '#ff0000',
    paddingHorizontal: wp(3),
    paddingVertical: hp(0.5),
    borderRadius: 3,
    minWidth: 0,
  },
  closeText: {
    color: 'white',
    fontSize: normalize(16),
    fontWeight: 'bold',
  },
});