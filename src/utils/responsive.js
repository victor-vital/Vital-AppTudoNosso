import { Dimensions, PixelRatio } from 'react-native';

const { width, height } = Dimensions.get('window');

// Função para escalar baseado no tamanho da tela (usando iPhone 6 como base)
const scale = width / 375;

export function normalize(size) {
  const newSize = size * scale;
  return Math.round(PixelRatio.roundToNearestPixel(newSize));
}

export function wp(widthPercent) {
  return (width * widthPercent) / 100;
}

export function hp(heightPercent) {
  return (height * heightPercent) / 100;
}

export const dimensions = {
  width,
  height,
  isSmallDevice: width < 375,
  isTablet: width >= 768,
};