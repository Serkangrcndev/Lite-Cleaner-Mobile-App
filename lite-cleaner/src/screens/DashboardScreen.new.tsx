import React from 'react'
import { View, Text, StyleSheet, StatusBar, SafeAreaView, ScrollView } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import ProgressRing from '@/components/ProgressRing'
import AnimatedPressable from '@/components/AnimatedPressable'
import StatCard from '@/components/StatCard'
import FadeInView from '@/components/FadeInView'
import { LinearGradient } from 'expo-linear-gradient'
import { BlurView } from 'expo-blur'
import { theme } from '@/theme'

export default function DashboardScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Header Section */}
        <View style={styles.header}>
          <Text style={styles.greeting}>Hoşgeldin</Text>
          <AnimatedPressable onPress={() => {}} style={styles.settingsButton}>
            <Ionicons name="settings-outline" size={24} color={theme.colors.text} />
          </AnimatedPressable>
        </View>

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
              <ProgressRing
                size={80}
                strokeWidth={8}
                progress={75}
                gradientColors={theme.colors.primaryGradient}
              >
                <Text style={styles.ringText}>75%</Text>
              </ProgressRing>
              <Text style={styles.statusLabel}>RAM</Text>
            </View>

            <LinearGradient
              colors={theme.colors.primaryGradient}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.divider}
            />

            <View style={styles.statusItem}>
              <Text style={styles.statusValue}>45°C</Text>
              <Text style={styles.statusLabel}>CPU</Text>
            </View>

            <LinearGradient
              colors={['#6C72CB', '#CB69C1']}
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
            <AnimatedPressable style={styles.actionCard}>
              <LinearGradient
                colors={['#6C72CB', '#CB69C1']}
                style={styles.actionGradient}
              >
                <Ionicons name="flash" size={24} color={theme.colors.white} />
                <Text style={styles.actionTitle}>Hızlı Temizle</Text>
                <Text style={styles.actionSubtitle}>2.5 GB</Text>
              </LinearGradient>
            </AnimatedPressable>

            <AnimatedPressable style={styles.actionCard}>
              <LinearGradient
                colors={['#4158D0', '#C850C0']}
                style={styles.actionGradient}
              >
                <Ionicons name="scan" size={24} color={theme.colors.white} />
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
          >
            <FadeInView delay={0}>
              <StatCard
                title="Toplam"
                value="128GB"
                icon="save"
                percent={100}
              />
            </FadeInView>
            <FadeInView delay={100}>
              <StatCard
                title="Kullanılan"
                value="64GB"
                icon="hardware-chip"
                percent={50}
              />
            </FadeInView>
            <FadeInView delay={200}>
              <StatCard
                title="Boş"
                value="64GB"
                icon="folder"
                percent={50}
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
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    paddingTop: 8,
  },
  greeting: {
    fontSize: 28,
    fontWeight: 'bold',
    color: theme.colors.white,
  },
  settingsButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255,255,255,0.1)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  statusCard: {
    margin: 16,
    borderRadius: 20,
    padding: 16,
    backgroundColor: 'rgba(255,255,255,0.05)',
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
    color: theme.colors.white,
  },
  refreshButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: 'rgba(255,255,255,0.1)',
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
    color: theme.colors.white,
  },
  statusValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: theme.colors.white,
    marginBottom: 4,
  },
  statusLabel: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.6)',
    marginTop: 8,
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
    color: theme.colors.white,
    marginBottom: 16,
  },
  actionGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  actionCard: {
    flex: 1,
    marginHorizontal: 8,
    borderRadius: 16,
    overflow: 'hidden',
  },
  actionGradient: {
    padding: 16,
    height: 120,
    justifyContent: 'space-between',
  },
  actionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: theme.colors.white,
    marginTop: 12,
  },
  actionSubtitle: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.8)',
  },
  storageSection: {
    padding: 16,
  },
  storageScroll: {
    marginTop: 8,
  },
})
