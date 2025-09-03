import React from 'react'
import { View, Text, StyleSheet, Pressable } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { BlurView } from 'expo-blur'
import { theme } from '@/theme'
import { LinearGradient } from 'expo-linear-gradient'
import AnimatedPressable from './AnimatedPressable'

const tabs = [
  { 
    name: 'home', 
    icon: 'home-outline', 
    label: 'Ana Sayfa',
  },
  { 
    name: 'optimize', 
    icon: 'flash-outline', 
    label: 'Optimize',
  },
  { 
    name: 'tools', 
    icon: 'build-outline', 
    label: 'Araçlar',
  },
  { 
    name: 'settings', 
    icon: 'settings-outline', 
    label: 'Ayarlar',
  },
]

export default function BottomTabBar({ 
  currentTab = 'home',
  onTabPress 
}: { 
  currentTab?: string
  onTabPress?: (tabName: string) => void 
}) {
  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['rgba(0,0,0,0.8)', 'rgba(0,0,0,0.95)']}
        style={styles.background}
      >
        <BlurView intensity={30} tint="dark" style={styles.content}>
          {tabs.map((tab) => {
            const isActive = currentTab === tab.name
            return (
              <AnimatedPressable
                key={tab.name}
                onPress={() => onTabPress?.(tab.name)}
                style={styles.tab}
              >
                <View style={[
                  styles.tabContent,
                  isActive && styles.activeTabContent
                ]}>
                  <View style={styles.iconWrapper}>
                    <Ionicons
                      name={tab.icon as any}
                      size={24}
                      color={isActive ? '#fff' : theme.colors.muted}
                      style={styles.icon}
                    />
                    {isActive && (
                      <LinearGradient
                        colors={theme.colors.primaryGradient}
                        style={styles.activeIndicator}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 0 }}
                      />
                    )}
                  </View>
                  <Text 
                    style={[
                      styles.tabLabel,
                      isActive && styles.activeTabLabel
                    ]}
                  >
                    {tab.label}
                  </Text>
                </View>
              </AnimatedPressable>
            )
          })}
        </BlurView>
      </LinearGradient>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
  background: {
    borderTopLeftRadius: theme.radius.xl,
    borderTopRightRadius: theme.radius.xl,
    overflow: 'hidden',
    borderWidth: 1,
    borderBottomWidth: 0,
    borderColor: 'rgba(255,255,255,0.1)',
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    paddingBottom: 20,
    paddingTop: 12,
    backgroundColor: 'transparent',
  },
  tab: {
    flex: 1,
    alignItems: 'center',
  },
  tabContent: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 12,
  },
  activeTabContent: {
    transform: [{ translateY: -2 }],
  },
  iconWrapper: {
    alignItems: 'center',
    position: 'relative',
    paddingBottom: 12,
  },
  icon: {
    marginBottom: 4,
  },
  activeIndicator: {
    position: 'absolute',
    bottom: 0,
    width: 20,
    height: 3,
    borderRadius: 1.5,
  },
  tabLabel: {
    fontSize: 12,
    color: theme.colors.muted,
    textAlign: 'center',
  },
  activeTabLabel: {
    color: '#fff',
    fontWeight: '600',
  }
})
