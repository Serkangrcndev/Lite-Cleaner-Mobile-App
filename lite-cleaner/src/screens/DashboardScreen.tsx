import React from 'react'
import { View, Text, StyleSheet, StatusBar, SafeAreaView, ScrollView } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import ProgressRing from '@/components/ProgressRing'
import AnimatedPressable from '@/components/AnimatedPressable'
import StatCard from '@/components/StatCard'
import FadeInView from '@/components/FadeInView'
import PageHeader from '@/components/PageHeader'

import { LinearGradient } from 'expo-linear-gradient'
import { BlurView } from 'expo-blur'
import { theme } from '@/theme'

type DashboardScreenProps = {
  onTabPress?: (tabName: string) => void
  onNavigateToAnimation?: (animationType: 'quick-clean' | 'deep-clean') => void
  activeTab?: string
}

export default function DashboardScreen({ onTabPress, onNavigateToAnimation, activeTab = 'home' }: DashboardScreenProps) {
  const handleTabPress = (tabName: string) => {
    onTabPress?.(tabName)
  }

  const handleQuickClean = () => {
    onNavigateToAnimation?.('quick-clean')
  }

  const handleDeepClean = () => {
    onNavigateToAnimation?.('deep-clean')
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />
      
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Page Header */}
        <PageHeader 
          title="Ana Sayfa" 
          icon="home" 
          subtitle="Sistem durumunu kontrol edin"
          gradient={theme.colors.primaryGradient}
        />

        {/* System Status Card */}
        <BlurView intensity={20} tint="dark" style={styles.statusCard}>
          <View style={styles.statusHeader}>
            <Text style={styles.statusTitle}>Sistem Durumu</Text>
            <AnimatedPressable onPress={() => {}} style={styles.refreshButton}>
              <Ionicons name="refresh-outline" size={20} color={theme.colors.primary} />
            </AnimatedPressable>
          </View>

          <View style={styles.statusGrid}>
            <View style={styles.statusItem}>
              <View>
                <ProgressRing
                  size={80}
                  strokeWidth={8}
                  progress={0.75}
                  gradientColors={theme.colors.primaryGradient}
                />
                <View style={styles.ringTextWrapper}>
                  <Text style={styles.ringText}>75%</Text>
                </View>
              </View>
              <Text style={styles.statusLabel}>RAM</Text>
            </View>

            <LinearGradient
              colors={theme.colors.primaryGradient as any}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.divider}
            />

            <View style={styles.statusItem}>
              <Text style={styles.statusValue}>45°C</Text>
              <Text style={styles.statusLabel}>CPU</Text>
            </View>

            <LinearGradient
              colors={theme.colors.primaryGradient as any}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.divider}
            />

            <View style={styles.statusItem}>
              <Text style={styles.statusValue}>85%</Text>
              <Text style={styles.statusLabel}>Pil</Text>
            </View>
          </View>
        </BlurView>

        {/* Quick Actions */}
        <View style={styles.actionsSection}>
          <Text style={styles.sectionTitle}>Hızlı İşlemler</Text>
          <View style={styles.actionGrid}>
            <AnimatedPressable style={styles.actionCard} onPress={handleQuickClean}>
              <LinearGradient
                colors={['#4158D0', '#C850C0']}
                style={styles.actionGradient}
              >
                <Ionicons name="flash" size={24} color="#fff" />
                <Text style={styles.actionTitle}>Hızlı Temizle</Text>
                <Text style={styles.actionSubtitle}>2.5 GB</Text>
              </LinearGradient>
            </AnimatedPressable>

            <AnimatedPressable style={styles.actionCard} onPress={handleDeepClean}>
              <LinearGradient
                colors={['#FF4E9E', '#FF6B6B']}
                style={styles.actionGradient}
              >
                <Ionicons name="scan" size={24} color="#fff" />
                <Text style={styles.actionTitle}>Derin Temizlik</Text>
                <Text style={styles.actionSubtitle}>8.7 GB</Text>
              </LinearGradient>
            </AnimatedPressable>
          </View>
        </View>

        {/* Storage Stats */}
        <View style={styles.storageSection}>
          <Text style={styles.sectionTitle}>Depolama Analizi</Text>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={styles.storageScroll}
            contentContainerStyle={styles.storageContent}
          >
            <FadeInView delay={0}>
              <StatCard
                title="Kullanılan"
                value="64GB"
                hint="50% Dolu"
                icon="hardware-chip-outline"
                variant="secondary"
              />
            </FadeInView>
            <FadeInView delay={100}>
              <StatCard
                title="Boş"
                value="64GB"
                hint="50% Boş"
                icon="folder-outline"
                variant="accent"
              />
            </FadeInView>
          </ScrollView>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  scrollView: {
    flex: 1,
    paddingBottom: 120, // Alt menü için daha az padding
  },

  statusCard: {
    margin: 16,
    borderRadius: 20,
    padding: 16,
    backgroundColor: theme.colors.glass,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
  },
  statusHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  statusTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: theme.colors.text,
  },
  refreshButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: theme.colors.glass,
    justifyContent: 'center',
    alignItems: 'center',
  },
  statusGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  statusItem: {
    alignItems: 'center',
    flex: 1,
  },
  ringText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: theme.colors.text,
  },
  statusValue: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 4,
  },
  statusLabel: {
    fontSize: 16,
    color: theme.colors.muted,
    marginTop: 8,
  },
  ringTextWrapper: {
    position: 'absolute',
    width: 80,
    height: 80,
    justifyContent: 'center',
    alignItems: 'center',
  },
  divider: {
    width: 1,
    height: 40,
    marginHorizontal: 16,
  },
  actionsSection: {
    padding: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: theme.colors.text,
    marginBottom: 16,
  },
  actionGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 12,
  },
  actionCard: {
    flex: 1,
    borderRadius: 16,
    overflow: 'hidden',
    ...theme.shadows.lg,
  },
  actionGradient: {
    padding: 20,
    height: 120,
    justifyContent: 'space-between',
  },
  actionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#fff',
    marginTop: 12,
  },
  actionSubtitle: {
    fontSize: 16,
    color: 'rgba(255,255,255,0.8)',
  },
  storageSection: {
    padding: 16,
  },
  storageScroll: {
    marginTop: 8,
  },
  storageContent: {
    paddingRight: 16,
    gap: 12,
  },
})
