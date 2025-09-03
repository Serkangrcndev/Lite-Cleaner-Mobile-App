import React from 'react'
import { View, Text, StyleSheet, StatusBar, SafeAreaView, ScrollView } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import AnimatedPressable from '@/components/AnimatedPressable'
import FadeInView from '@/components/FadeInView'
import PageHeader from '@/components/PageHeader'

import { LinearGradient } from 'expo-linear-gradient'
import { BlurView } from 'expo-blur'
import { theme } from '@/theme'

type QuickCleanScreenProps = {
  onTabPress?: (tabName: string) => void
  activeTab?: string
}

export default function QuickCleanScreen({ onTabPress, activeTab = 'quick-clean' }: QuickCleanScreenProps) {
  const [cleaning, setCleaning] = React.useState(false)
  const [progress, setProgress] = React.useState(0)

  const startQuickClean = () => {
    setCleaning(true)
    setProgress(0)
    
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval)
          setCleaning(false)
          return 100
        }
        return prev + 15
      })
    }, 150)
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />
      
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Page Header */}
        <PageHeader 
          title="Hızlı Temizlik" 
          icon="flash" 
          subtitle="Hızlı ve etkili temizlik"
          gradient={theme.colors.accentGradient}
        />

        {/* Quick Clean Status */}
        <BlurView intensity={20} tint="dark" style={styles.statusCard}>
          <View style={styles.statusHeader}>
            <Text style={styles.statusTitle}>Hızlı Temizlik</Text>
            <View style={styles.statusBadge}>
              <Text style={styles.statusBadgeText}>
                {cleaning ? 'Temizleniyor...' : '2.5 GB'}
              </Text>
            </View>
          </View>

          {cleaning && (
            <FadeInView delay={0}>
              <View style={styles.progressContainer}>
                <View style={styles.progressBar}>
                  <LinearGradient
                    colors={theme.colors.accentGradient}
                    style={[styles.progressFill, { width: `${progress}%` }]}
                  />
                </View>
                <Text style={styles.progressText}>{progress}%</Text>
              </View>
            </FadeInView>
          )}

          <View style={styles.cleanStats}>
            <View style={styles.statItem}>
              <Ionicons name="trash-outline" size={24} color={theme.colors.accent} />
              <Text style={styles.statValue}>2.5 GB</Text>
              <Text style={styles.statLabel}>Temizlenecek</Text>
            </View>
            <View style={styles.statItem}>
              <Ionicons name="time-outline" size={24} color={theme.colors.secondary} />
              <Text style={styles.statValue}>~30s</Text>
              <Text style={styles.statLabel}>Tahmini Süre</Text>
            </View>
          </View>
        </BlurView>

        {/* Quick Clean Button */}
        <View style={styles.actionsSection}>
          <AnimatedPressable 
            onPress={startQuickClean} 
            style={[styles.actionButton, cleaning && styles.actionButtonDisabled]}
            disabled={cleaning}
          >
            <LinearGradient
              colors={cleaning ? ['#666', '#888'] : theme.colors.accentGradient}
              style={styles.actionGradient}
            >
              <Ionicons 
                name={cleaning ? "hourglass-outline" : "flash"} 
                size={28} 
                color="#fff" 
              />
              <Text style={styles.actionText}>
                {cleaning ? 'Temizleniyor...' : 'Hızlı Temizliği Başlat'}
              </Text>
            </LinearGradient>
          </AnimatedPressable>
        </View>

        {/* What Will Be Cleaned */}
        <View style={styles.cleanupSection}>
          <Text style={styles.sectionTitle}>Temizlenecek Öğeler</Text>
          
          <FadeInView delay={100}>
            <View style={styles.cleanupCard}>
              <View style={styles.cleanupHeader}>
                <Ionicons name="browsers-outline" size={20} color={theme.colors.primary} />
                <Text style={styles.cleanupTitle}>Tarayıcı Önbelleği</Text>
                <Text style={styles.cleanupSize}>1.2 GB</Text>
              </View>
              <Text style={styles.cleanupDescription}>
                Chrome, Safari ve diğer tarayıcı önbellekleri
              </Text>
            </View>
          </FadeInView>

          <FadeInView delay={200}>
            <View style={styles.cleanupCard}>
              <View style={styles.cleanupHeader}>
                <Ionicons name="apps-outline" size={20} color={theme.colors.secondary} />
                <Text style={styles.cleanupTitle}>Uygulama Önbelleği</Text>
                <Text style={styles.cleanupSize}>0.8 GB</Text>
              </View>
              <Text style={styles.cleanupDescription}>
                Yüklü uygulamaların geçici dosyaları
              </Text>
            </View>
          </FadeInView>

          <FadeInView delay={300}>
            <View style={styles.cleanupCard}>
              <View style={styles.cleanupHeader}>
                <Ionicons name="document-outline" size={20} color={theme.colors.accent} />
                <Text style={styles.cleanupTitle}>Geçici Dosyalar</Text>
                <Text style={styles.cleanupSize}>0.5 GB</Text>
              </View>
              <Text style={styles.cleanupDescription}>
                Sistem geçici dosyaları ve loglar
              </Text>
            </View>
          </FadeInView>
        </View>

        {/* Benefits */}
        <View style={styles.benefitsSection}>
          <Text style={styles.sectionTitle}>Faydalar</Text>
          
          <View style={styles.benefitsGrid}>
            <FadeInView style={styles.benefitsRow} delay={400}>
              <View style={styles.benefitCard}>
                <Ionicons name="speedometer-outline" size={24} color={theme.colors.primary} />
                <Text style={styles.benefitTitle}>Daha Hızlı</Text>
                <Text style={styles.benefitDescription}>
                  Sistem performansı artar
                </Text>
              </View>
            </FadeInView>

            <FadeInView style={styles.benefitsRow} delay={500}>
              <View style={styles.benefitCard}>
                <Ionicons name="shield-checkmark-outline" size={24} color={theme.colors.secondary} />
                <Text style={styles.benefitTitle}>Güvenli</Text>
                <Text style={styles.benefitDescription}>
                  Sadece güvenli dosyalar silinir
                </Text>
              </View>
            </FadeInView>

            <FadeInView style={styles.benefitsRow} delay={600}>
              <View style={styles.benefitCard}>
                <Ionicons name="battery-charging-outline" size={24} color={theme.colors.accent} />
                <Text style={styles.benefitTitle}>Pil Tasarrufu</Text>
                <Text style={styles.benefitDescription}>
                  Daha uzun pil ömrü
                </Text>
              </View>
            </FadeInView>

            <FadeInView style={styles.benefitsRow} delay={700}>
              <View style={styles.benefitCard}>
                <Ionicons name="save-outline" size={24} color={theme.colors.primary} />
                <Text style={styles.benefitTitle}>Depolama</Text>
                <Text style={styles.benefitDescription}>
                  Daha fazla boş alan
                </Text>
              </View>
            </FadeInView>
          </View>
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
    padding: 20,
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
  statusBadge: {
    backgroundColor: theme.colors.accent,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
  },
  statusBadgeText: {
    color: '#000',
    fontSize: 12,
    fontWeight: '600',
  },
  progressContainer: {
    marginBottom: 20,
  },
  progressBar: {
    height: 8,
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderRadius: 4,
    overflow: 'hidden',
    marginBottom: 8,
  },
  progressFill: {
    height: '100%',
    borderRadius: 4,
  },
  progressText: {
    color: theme.colors.text,
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
  },
  cleanStats: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  statItem: {
    alignItems: 'center',
  },
  statValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: theme.colors.text,
    marginTop: 8,
  },
  statLabel: {
    fontSize: 12,
    color: theme.colors.muted,
    marginTop: 4,
  },
  actionsSection: {
    padding: 16,
  },
  actionButton: {
    borderRadius: 16,
    overflow: 'hidden',
    ...theme.shadows.lg,
  },
  actionButtonDisabled: {
    opacity: 0.6,
  },
  actionGradient: {
    padding: 24,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 16,
  },
  actionText: {
    fontSize: 20,
    fontWeight: '600',
    color: '#fff',
    marginTop: 8,
  },
  actionSubtitle: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.8)',
    marginTop: 4,
  },
  cleanupSection: {
    padding: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: theme.colors.text,
    marginBottom: 16,
  },
  cleanupCard: {
    backgroundColor: theme.colors.glass,
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
  },
  cleanupHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  cleanupTitle: {
    flex: 1,
    fontSize: 16,
    fontWeight: '600',
    color: theme.colors.text,
    marginLeft: 12,
  },
  cleanupSize: {
    fontSize: 16,
    fontWeight: '600',
    color: theme.colors.accent,
  },
  cleanupDescription: {
    fontSize: 14,
    color: theme.colors.muted,
    marginLeft: 36,
  },
  benefitsSection: {
    padding: 16,
  },
  benefitsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    justifyContent: 'space-between',
  },
  benefitsRow: {
    width: '48%',
    marginBottom: 12,
  },
  benefitCard: {
    flex: 1,
    backgroundColor: theme.colors.glass,
    borderRadius: 16,
    padding: 16,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
    minHeight: 120,
  },
  benefitTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: theme.colors.text,
    marginTop: 12,
    marginBottom: 4,
  },
  benefitDescription: {
    fontSize: 12,
    color: theme.colors.muted,
    textAlign: 'center',
    paddingHorizontal: 4,
  },
})
