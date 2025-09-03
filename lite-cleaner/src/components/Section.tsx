import React from 'react'
import { View, Text, StyleSheet, TextStyle, ViewStyle } from 'react-native'
import { theme } from '@/theme'

type Props = {
  title: string
  subtitle?: string
  right?: React.ReactNode
  children?: React.ReactNode
  titleStyle?: TextStyle
  subtitleStyle?: TextStyle
  style?: ViewStyle
}

export default function Section({ 
  title, 
  subtitle, 
  right, 
  children,
  titleStyle,
  subtitleStyle,
  style
}: Props) {
  return (
    <View style={[styles.container, style]}>
      <View style={styles.header}>
        <View>
          <Text style={[styles.title, titleStyle]}>{title}</Text>
          {subtitle ? (
            <Text style={[styles.subtitle, subtitleStyle]}>{subtitle}</Text>
          ) : null}
        </View>
        {right}
      </View>
      {children}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    marginBottom: theme.spacing['2xl'],
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    marginBottom: theme.spacing.lg,
  },
  title: {
    color: theme.colors.text,
    fontSize: 20,
    fontWeight: '600',
    letterSpacing: 0.5,
  },
  subtitle: {
    color: theme.colors.muted,
    fontSize: 14,
    marginTop: 4,
  },
})


