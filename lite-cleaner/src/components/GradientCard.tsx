import React from 'react'
import { LinearGradient } from 'expo-linear-gradient'
import { StyleSheet, ViewProps } from 'react-native'
import { theme } from '../theme'

type Props = ViewProps & {
  children: React.ReactNode
  variant?: 'primary' | 'secondary' | 'accent'
}

export default function GradientCard({ children, style, variant = 'primary', ...rest }: Props) {
  const gradientColors = {
    primary: [theme.colors.cardGradientStart, theme.colors.cardGradientEnd] as const,
    secondary: [theme.colors.secondary, theme.colors.primary] as const,
    accent: [theme.colors.accent, theme.colors.primary] as const
  }

  return (
    <LinearGradient
      colors={gradientColors[variant]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={[styles.container, style]}
      className={`rounded-[${theme.radius.xl}px] p-${theme.spacing.lg}px border border-white/5`}
      {...rest}
    >
      {children}
    </LinearGradient>
  )
}

const styles = StyleSheet.create({
  container: {
    ...theme.shadows.lg,
    backgroundColor: theme.colors.card,
  }
})


