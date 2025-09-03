import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { theme } from '@/theme'
import { LinearGradient } from 'expo-linear-gradient'

type Props = {
  title: string
  value: string
  hint?: string
  icon?: string
  variant?: 'primary' | 'secondary' | 'accent'
}

export default function StatCard({ title, value, hint, icon, variant = 'primary' }: Props) {
  const gradientColors = {
    primary: [theme.colors.primary, theme.colors.primary + '80'] as const,
    secondary: [theme.colors.secondary, theme.colors.secondary + '80'] as const,
    accent: [theme.colors.accent, theme.colors.accent + '80'] as const,
  }

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={gradientColors[variant]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.iconContainer}
      >
        {icon && <Ionicons name={icon as any} size={20} color="#fff" />}
      </LinearGradient>
      
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.value}>{value}</Text>
      {hint && <Text style={styles.hint}>{hint}</Text>}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.glass,
    borderRadius: theme.radius.xl,
    padding: theme.spacing.lg,
    width: 180,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
    ...theme.shadows.sm,
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: theme.radius.lg,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: theme.spacing.md,
  },
  title: {
    color: theme.colors.muted,
    fontSize: 12,
    textTransform: 'uppercase',
    letterSpacing: 1,
    marginBottom: theme.spacing.sm,
  },
  value: {
    color: theme.colors.text,
    fontSize: 28,
    fontWeight: '600',
  },
  hint: {
    color: theme.colors.muted,
    fontSize: 12,
    marginTop: 4,
  },
})


