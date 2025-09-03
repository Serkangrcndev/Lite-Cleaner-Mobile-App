import React from 'react'
import { BlurView } from 'expo-blur'
import { theme } from '../theme'
import { StyleSheet } from 'react-native'

export default function GlassCard({ 
  children, 
  intensity = 25, 
  tint = 'dark' as const, 
  className,
  style 
}: { 
  children: React.ReactNode
  intensity?: number
  tint?: 'light' | 'dark' | 'default'
  className?: string
  style?: any
}) {
  return (
    <BlurView 
      intensity={intensity} 
      tint={tint} 
      style={[styles.container, style]}
      className={`rounded-[${theme.radius['2xl']}px] border border-white/5 backdrop-blur-xl ${className ?? ''}`}
    >
      {children}
    </BlurView>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.glass,
    ...theme.shadows.lg,
  },
})
