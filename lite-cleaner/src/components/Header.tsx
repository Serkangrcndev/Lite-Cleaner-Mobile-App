import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import AnimatedPressable from './AnimatedPressable'
import { LinearGradient } from 'expo-linear-gradient'
import { BlurView } from 'expo-blur'
import { theme } from '@/theme'

type HeaderProps = {
  activeTab: string
  onTabPress: (tabName: string) => void
}

export default function Header({ activeTab, onTabPress }: HeaderProps) {
  const tabs = [
    {
      name: 'quick-clean',
      icon: 'flash-outline',
      label: 'Hızlı Temizlik',
      activeIcon: 'flash',
    },
    {
      name: 'home',
      icon: 'home-outline',
      label: 'Ana Sayfa',
      activeIcon: 'home',
      isCenter: true,
    },
    {
      name: 'deep-clean',
      icon: 'scan-outline',
      label: 'Derin Temizlik',
      activeIcon: 'scan',
    },
  ]

  return (
    <View style={styles.container}>
      <BlurView intensity={30} tint="dark" style={styles.background}>
        <LinearGradient
          colors={['rgba(0,0,0,0.8)', 'rgba(0,0,0,0.95)']}
          style={styles.gradient}
        >
          {tabs.map((tab, index) => {
            const isActive = activeTab === tab.name
            const isCenter = tab.isCenter

            if (isCenter) {
              return (
                <AnimatedPressable
                  key={tab.name}
                  onPress={() => onTabPress(tab.name)}
                  style={[styles.centerTab, isActive && styles.centerTabActive]}
                >
                  <LinearGradient
                    colors={isActive ? theme.colors.primaryGradient as any : ['rgba(255,255,255,0.1)', 'rgba(255,255,255,0.05)']}
                    style={styles.centerTabGradient}
                  >
                    <Ionicons
                      name={isActive ? tab.activeIcon : tab.icon as any}
                      size={28}
                      color={isActive ? '#fff' : theme.colors.muted}
                    />
                    <Text style={[styles.centerTabLabel, isActive && styles.centerTabLabelActive]}>
                      {tab.label}
                    </Text>
                  </LinearGradient>
                  {isActive && (
                    <View style={styles.centerTabGlow}>
                      <LinearGradient
                        colors={['rgba(77,124,255,0.3)', 'transparent']}
                        style={styles.glowGradient}
                      />
                    </View>
                  )}
                </AnimatedPressable>
              )
            }

            return (
              <AnimatedPressable
                key={tab.name}
                onPress={() => onTabPress(tab.name)}
                style={[styles.sideTab, isActive && styles.sideTabActive]}
              >
                <View style={styles.sideTabContent}>
                  <Ionicons
                    name={isActive ? tab.activeIcon : tab.icon as any}
                    size={20}
                    color={isActive ? theme.colors.primary : theme.colors.muted}
                  />
                  <Text style={[styles.sideTabLabel, isActive && styles.sideTabLabelActive]}>
                    {tab.label}
                  </Text>
                </View>
                {isActive && (
                  <LinearGradient
                    colors={theme.colors.primaryGradient as any}
                    style={styles.activeIndicator}
                  />
                )}
              </AnimatedPressable>
            )
          })}
        </LinearGradient>
      </BlurView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: 9999, // Daha yüksek z-index
  },
  background: {
    margin: 16,
    marginBottom: 8, // Daha az alt margin
    borderRadius: 24,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
    ...theme.shadows.lg,
  },
  gradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 8,
    paddingVertical: 8,
  },
  sideTab: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 8,
    borderRadius: 16,
    position: 'relative',
  },
  sideTabActive: {
    backgroundColor: 'rgba(77,124,255,0.1)',
  },
  sideTabContent: {
    alignItems: 'center',
    gap: 4,
  },
  sideTabLabel: {
    fontSize: 11,
    color: theme.colors.muted,
    textAlign: 'center',
    fontWeight: '500',
  },
  sideTabLabelActive: {
    color: theme.colors.primary,
    fontWeight: '600',
  },
  activeIndicator: {
    position: 'absolute',
    bottom: 4,
    width: 20,
    height: 2,
    borderRadius: 1,
  },
  centerTab: {
    position: 'relative',
    marginHorizontal: 8,
  },
  centerTabActive: {
    transform: [{ scale: 1.05 }],
  },
  centerTabGradient: {
    width: 80,
    height: 80,
    borderRadius: 40,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 4,
    ...theme.shadows.lg,
  },
  centerTabLabel: {
    fontSize: 10,
    color: theme.colors.muted,
    textAlign: 'center',
    fontWeight: '600',
  },
  centerTabLabelActive: {
    color: '#fff',
    fontWeight: '700',
  },
  centerTabGlow: {
    position: 'absolute',
    top: -10,
    left: -10,
    right: -10,
    bottom: -10,
    borderRadius: 50,
    overflow: 'hidden',
    zIndex: -1,
  },
  glowGradient: {
    width: '100%',
    height: '100%',
    borderRadius: 50,
  },
})
