import React from 'react'
import { View, Text, StyleSheet, ScrollView, SafeAreaView } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'
import { BlurView } from 'expo-blur'
import { Ionicons } from '@expo/vector-icons'
import AnimatedPressable from '@/components/AnimatedPressable'
import FadeInView from '@/components/FadeInView'
import ProgressRing from '@/components/ProgressRing'
import { theme } from '@/theme'

export default function OptimizeScreen() {
  const [selected, setSelected] = React.useState<Set<string>>(new Set(['cache', 'background', 'junk']))

  const toggle = (key: string) => {
    setSelected((prev) => {
      const next = new Set(prev)
      next.has(key) ? next.delete(key) : next.add(key)
      return next
    })
  }

  const actions: Array<{ key: string; title: string; desc: string; icon: any }> = [
    { key: 'cache', title: 'Önbellek', desc: 'Geçici dosyaları temizle', icon: 'trash-outline' },
    { key: 'background', title: 'Arka Plan', desc: 'Gereksiz süreçleri durdur', icon: 'pause-circle-outline' },
    { key: 'junk', title: 'Gereksiz', desc: 'APK, log ve temp', icon: 'folder-open-outline' },
    { key: 'network', title: 'Ağ', desc: 'DNS & gecikme optimizasyonu', icon: 'wifi-outline' },
  ]

  const selectedCount = selected.size

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView 
        style={styles.scrollView} 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingTop: 8 }}>
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.titleContainer}>
            <Ionicons name="flash" size={30} color="#fff" style={styles.headerIcon} />
            <Text style={styles.title}>Akıllı Optimize</Text>
          </View>
          <Text style={styles.subtitle}>Cihazınızı optimize etmek için gereken eylemler</Text>
        </View>

        {/* Summary Card */}
        <FadeInView>
          <View style={styles.summaryCard}>
            <BlurView intensity={20} tint="dark" style={styles.cardContent}>
              <View style={styles.summaryLeft}>
                <Text style={styles.summaryTitle}>Hızlı Özet</Text>
                <Text style={styles.summarySubtitle}>
                  Cihazınız için önerilen iyileştirmeler hazır
                </Text>
                <View style={styles.badgeContainer}>
                  <Badge text="+%8 performans" />
                  <Badge text="+1.2 GB alan" />
                  <Badge text="+%5 pil" />
                </View>
              </View>
              <View style={styles.progressContainer}>
                <ProgressRing progress={0.72} size={120} />
                <View style={styles.progressTextContainer}>
                  <Text style={styles.progressText}>72%</Text>
                  <Text style={styles.progressLabel}>
                    Potansiyel Fayda
                  </Text>
                </View>
              </View>
            </BlurView>
          </View>
        </FadeInView>

        {/* Actions */}
        <Text style={styles.sectionTitle}>Optimize Eylemleri</Text>
        <View style={styles.actionsGrid}>
          {actions.map((action, index) => (
            <FadeInView key={action.key} delay={index * 80}>
              <AnimatedPressable 
                onPress={() => toggle(action.key)}
                style={[
                  styles.actionCard,
                  selected.has(action.key) && styles.actionCardSelected
                ]}
              >
                <BlurView intensity={20} tint="dark" style={styles.actionContent}>
                  <View style={[
                    styles.actionIcon,
                    selected.has(action.key) && styles.actionIconSelected
                  ]}>
                    <Ionicons 
                      name={action.icon} 
                      size={24} 
                      color={theme.colors.text} 
                    />
                  </View>
                  <View style={styles.actionTexts}>
                    <Text style={styles.actionTitle}>
                      {action.title}
                    </Text>
                    <Text style={styles.actionDescription}>
                      {action.desc}
                    </Text>
                  </View>
                  {selected.has(action.key) && (
                    <View style={styles.checkmark}>
                      <Ionicons 
                        name="checkmark-circle" 
                        size={20} 
                        color={theme.colors.primary} 
                      />
                    </View>
                  )}
                </BlurView>
              </AnimatedPressable>
            </FadeInView>
          ))}
        </View>

        {/* Apply Button */}
        <AnimatedPressable
          style={[
            styles.applyButton,
            { opacity: selectedCount === 0 ? 0.5 : 1 }
          ]}
          disabled={selectedCount === 0}
        >
          <LinearGradient
            colors={['#00f2fe', '#4facfe']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.gradientButton}
          >
            <Text style={styles.buttonText}>
              Hepsini Uygula ({selectedCount})
            </Text>
          </LinearGradient>
        </AnimatedPressable>
      </ScrollView>
    </SafeAreaView>
  )
}

function Badge({ text }: { text: string }) {
  return (
    <View style={styles.badge}>
      <Text style={styles.badgeText}>{text}</Text>
    </View>
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
  header: {
    padding: 16,
    paddingTop: 8,
    marginBottom: 16,
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
    paddingHorizontal: 4,
  },
  headerIcon: {
    marginRight: 10,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
  },
  subtitle: {
    fontSize: 16,
    color: theme.colors.muted,
    marginBottom: 16,
  },
  summaryCard: {
    marginHorizontal: 16,
    marginBottom: 24,
    borderRadius: theme.radius.lg,
    overflow: 'hidden',
    ...theme.shadows.lg,
  },
  cardContent: {
    padding: 20,
    backgroundColor: theme.colors.glass,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
    flexDirection: 'row',
  },
  summaryLeft: {
    flex: 1,
    marginRight: 16,
  },
  summaryTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: theme.colors.text,
    marginBottom: 4,
  },
  summarySubtitle: {
    fontSize: 14,
    color: theme.colors.muted,
    marginBottom: 16,
  },
  badgeContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  badge: {
    paddingHorizontal: 10,
    paddingVertical: 6,
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderRadius: 999,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
  },
  badgeText: {
    fontSize: 12,
    color: theme.colors.primary,
    fontWeight: '600',
  },
  progressContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  progressTextContainer: {
    position: 'absolute',
    alignItems: 'center',
  },
  progressText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: theme.colors.text,
  },
  progressLabel: {
    fontSize: 10,
    color: theme.colors.muted,
    marginTop: 2,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: theme.colors.text,
    marginBottom: 16,
    paddingHorizontal: 16,
  },
  actionsGrid: {
    paddingHorizontal: 16,
    gap: 12,
    marginBottom: 24,
  },
  actionCard: {
    borderRadius: theme.radius.lg,
    overflow: 'hidden',
    marginBottom: 12,
    ...theme.shadows.sm,
  },
  actionCardSelected: {
    ...theme.shadows.lg,
  },
  actionContent: {
    padding: 16,
    backgroundColor: theme.colors.glass,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
    flexDirection: 'row',
    alignItems: 'center',
  },
  actionIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: 'rgba(255,255,255,0.1)',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  actionIconSelected: {
    backgroundColor: `${theme.colors.primary}30`,
  },
  actionTexts: {
    flex: 1,
  },
  actionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: theme.colors.text,
    marginBottom: 4,
  },
  actionDescription: {
    fontSize: 13,
    color: theme.colors.muted,
    lineHeight: 18,
  },
  checkmark: {
    marginLeft: 12,
  },
  applyButton: {
    marginHorizontal: 16,
    marginBottom: 24,
    borderRadius: theme.radius.lg,
    overflow: 'hidden',
    ...theme.shadows.lg,
  },
  gradientButton: {
    padding: 16,
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '600',
    color: theme.colors.text,
  },
})


