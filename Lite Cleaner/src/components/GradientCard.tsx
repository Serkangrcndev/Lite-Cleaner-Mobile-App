import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ViewStyle } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

interface GradientCardProps {
  colors: [string, string, ...string[]];
  children: React.ReactNode;
  style?: ViewStyle;
  onPress?: () => void;
  vertical?: boolean;
  completed?: boolean;
}

export const GradientCard: React.FC<GradientCardProps> = ({
  colors,
  children,
  style,
  onPress,
  vertical = false,
  completed = false,
}) => {
  const gradientStyle = vertical ? styles.verticalGradient : styles.gradient;
  const finalColors = completed ? ['#34d399', '#10b981'] as [string, string] : colors;
  
  
  if (onPress) {
    return (
      <TouchableOpacity style={[styles.container, style]} onPress={onPress}>
        <LinearGradient
          colors={finalColors}
          start={{ x: 0, y: 0 }}
          end={vertical ? { x: 0, y: 1 } : { x: 1, y: 0 }}
          style={gradientStyle}
        >
          {children}
        </LinearGradient>
      </TouchableOpacity>
    );
  }

  return (
    <View style={[styles.container, style]}>
      <LinearGradient
        colors={finalColors}
        start={{ x: 0, y: 0 }}
        end={vertical ? { x: 0, y: 1 } : { x: 1, y: 0 }}
        style={gradientStyle}
      >
        {children}
      </LinearGradient>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  gradient: {
    padding: 16,
    borderRadius: 16,
    flexDirection: 'row',
    alignItems: 'center',
  },
  verticalGradient: {
    padding: 16,
    borderRadius: 16,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 120,
    height: 120,
  },
});
