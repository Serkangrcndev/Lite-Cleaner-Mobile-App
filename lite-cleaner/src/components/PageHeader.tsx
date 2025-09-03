import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { LinearGradient } from 'expo-linear-gradient'
import { BlurView } from 'expo-blur'
import { theme } from '@/theme'

type PageHeaderProps = {
  title: string
  icon: string
  subtitle?: string
  gradient?: string[]
}

export default function PageHeader({ 
  title, 
  icon, 
  subtitle,
  gradient = theme.colors.primaryGradient 
}: PageHeaderProps) {
  return (
    <View style={styles.container}>
      <BlurView intensity={20} tint="dark" style={styles.background}>
        <LinearGradient
          colors={['rgba(0,0,0,0.8)', 'rgba(0,0,0,0.95)']}
          style={styles.gradient}
        >
          <View style={styles.iconContainer}>
            <LinearGradient
              colors={gradient}
              style={styles.iconGradient}
            >
              <Ionicons name={icon as any} size={32} color="#fff" />
            </LinearGradient>
          </View>
          
          <View style={styles.textContainer}>
            <Text style={styles.title}>{title}</Text>
            {subtitle && <Text style={styles.subtitle}>{subtitle}</Text>}
          </View>
        </LinearGradient>
      </BlurView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    margin: 16,
    marginTop: 20,
    marginBottom: 8,
  },
  background: {
    borderRadius: 20,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
    ...theme.shadows.lg,
  },
  gradient: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
  },
  iconContainer: {
    marginRight: 16,
  },
  iconGradient: {
    width: 60,
    height: 60,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    ...theme.shadows.lg,
  },
  textContainer: {
    flex: 1,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: theme.colors.text,
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 14,
    color: theme.colors.muted,
  },
})
