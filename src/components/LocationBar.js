import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { normalize, wp, hp } from '../utils/responsive';

export default function LocationBar() {
  return (
    <View style={styles.locationBar}>
      <View style={styles.locationLeft}>
        <Ionicons name="phone-portrait" size={normalize(24)} color="black" style={styles.phoneIcon} />
        <Text style={styles.locationNumber}>123.456</Text>
      </View>
      <Text style={styles.locationCity}>MANAUS</Text>
      <View style={styles.locationRight}>
        <Text style={styles.locationNumber}>123.456.789</Text>
        <Ionicons name="eye" size={normalize(20)} color="black" />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  locationBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#bbb',
    paddingHorizontal: wp(2),
    paddingVertical: hp(1),
  },
  locationLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  locationCity: {
    fontSize: normalize(16),
    fontWeight: 'bold',
    textAlign: 'center',
    flex: 1,
  },
  locationRight: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    justifyContent: 'flex-end',
  },
  locationNumber: {
    fontSize: normalize(10),
    marginHorizontal: wp(1),
  },
  phoneIcon: {
    marginRight: wp(1),
  },
});