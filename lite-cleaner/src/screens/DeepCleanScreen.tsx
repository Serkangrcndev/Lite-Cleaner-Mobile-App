import React from 'react'
import { View, Text, StyleSheet, StatusBar, SafeAreaView, ScrollView } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import Animated, { useSharedValue, useAnimatedStyle, withTiming } from 'react-native-reanimated'
import AnimatedPressable from '@/components/AnimatedPressable'
import FadeInView from '@/components/FadeInView'
import PageHeader from '@/components/PageHeader'

import { LinearGradient } from 'expo-linear-gradient'
import { BlurView } from 'expo-blur'
import { theme } from '@/theme'

type DeepCleanScreenProps = {
  onTabPress?: (tabName: string) => void
  activeTab?: string
}

export default function DeepCleanScreen({ onTabPress, activeTab = 'deep-clean' }: DeepCleanScreenProps) {
  const [scanning, setScanning] = React.useState(false)
  const [cleaning, setCleaning] = React.useState(false)
  const [progress, setProgress] = React.useState(0)
  
  // Animated progress value
  const animatedProgress = useSharedValue(0)
  
  // Animated progress style
  const progressStyle = useAnimatedStyle(() => ({
    width: `${animatedProgress.value}%`,
  }))
  
  const glowStyle = useAnimatedStyle(() => ({
    width: `${animatedProgress.value}%`,
  }))

  const startScan = () => {
    setScanning(true)
    setProgress(0)
    animatedProgress.value = 0
    
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval)
          setScanning(false)
          return 100
        }
        const newProgress = prev + 10
        animatedProgress.value = withTiming(newProgress, { duration: 200 })
        return newProgress
      })
    }, 200)
  }

  const startCleaning = () => {
    setCleaning(true)
    setProgress(0)
    animatedProgress.value = 0
    
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval)
          setCleaning(false)
          return 100
        }
        const newProgress = prev + 8
        animatedProgress.value = withTiming(newProgress, { duration: 300 })
        return newProgress
      })
    }, 300)
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />
      
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Page Header */}
        <PageHeader 
          title="Derin Temizlik" 
          icon="scan" 
          subtitle="Kapsamlı sistem taraması"
          gradient={theme.colors.secondaryGradient}
        />

        {/* Scan Status */}
        <BlurView intensity={20} tint="dark" style={styles.statusCard}>
          <View style={styles.statusHeader}>
            <Text style={styles.statusTitle}>Sistem Taraması</Text>
            <View style={styles.statusBadge}>
              <Text style={styles.statusBadgeText}>
                {scanning ? 'Taranıyor...' : 'Hazır'}
              </Text>
            </View>
          </View>

          {(scanning || cleaning) && (
            <FadeInView delay={0}>
              <View style={styles.progressContainer}>
                <View style={styles.progressBar}>
                  <Animated.View 
                    style={[
                      styles.progressFill,
                      progressStyle
                    ]}
                  >
                    <LinearGradient
                      colors={scanning ? theme.colors.primaryGradient : ['#FFD700', '#FFA500', '#FF6347']}
                      style={styles.progressGradient}
                    />
                  </Animated.View>
                  {/* Progress bar glow effect */}
                  <Animated.View 
                    style={[
                      styles.progressGlow, 
                      glowStyle
                    ]} 
                  />
                  {/* Animated progress particles */}
                  <Animated.View style={styles.progressParticles}>
                    {[...Array(5)].map((_, i) => (
                      <Animated.View
                        key={i}
                        style={[
                          styles.progressParticle,
                          {
                            left: `${(i * 20) + (progress * 0.8)}%`,
                            backgroundColor: scanning ? '#4F46E5' : '#FFD700'
                          }
                        ]}
                      />
                    ))}
                  </Animated.View>
                </View>
                <View style={styles.progressInfo}>
                  <Text style={styles.progressText}>{progress}%</Text>
                  <Text style={styles.progressStatus}>
                    {scanning ? 'Taranıyor...' : 'Temizleniyor...'}
                  </Text>
                </View>
              </View>
            </FadeInView>
          )}

          <View style={styles.scanStats}>
            <View style={styles.statItem}>
              <Ionicons name="trash-outline" size={24} color={theme.colors.primary} />
              <Text style={styles.statValue}>8.7 GB</Text>
              <Text style={styles.statLabel}>Gereksiz Dosyalar</Text>
            </View>
            <View style={styles.statItem}>
              <Ionicons name="folder-outline" size={24} color={theme.colors.secondary} />
              <Text style={styles.statValue}>1,234</Text>
              <Text style={styles.statLabel}>Dosya Sayısı</Text>
            </View>
          </View>
        </BlurView>

        {/* Action Buttons */}
        <View style={styles.actionsSection}>
          <AnimatedPressable 
            onPress={startScan} 
            style={[styles.actionButton, scanning && styles.actionButtonDisabled]}
            disabled={scanning}
          >
            <LinearGradient
              colors={scanning ? ['#666', '#888'] : theme.colors.primaryGradient}
              style={styles.actionGradient}
            >
              <Ionicons 
                name={scanning ? "hourglass-outline" : "scan-outline"} 
                size={24} 
                color="#fff" 
              />
              <Text style={styles.actionText}>
                {scanning ? 'Taranıyor...' : 'Taramayı Başlat'}
              </Text>
            </LinearGradient>
          </AnimatedPressable>

          <AnimatedPressable 
            onPress={startCleaning}
            style={[styles.actionButton, cleaning && styles.actionButtonDisabled]}
            disabled={cleaning}
          >
            <LinearGradient
              colors={cleaning ? ['#666', '#888'] : theme.colors.secondaryGradient}
              style={styles.actionGradient}
            >
              <Ionicons 
                name={cleaning ? "hourglass-outline" : "trash"} 
                size={24} 
                color="#fff" 
              />
              <Text style={styles.actionText}>
                {cleaning ? 'Temizleniyor...' : 'Temizliği Başlat'}
              </Text>
            </LinearGradient>
          </AnimatedPressable>
        </View>

        {/* Scan Results */}
        <View style={styles.resultsSection}>
          <Text style={styles.sectionTitle}>Tarama Sonuçları</Text>
          
          <FadeInView delay={100}>
            <View style={styles.resultCard}>
              <View style={styles.resultHeader}>
                <Ionicons name="document-outline" size={20} color={theme.colors.primary} />
                <Text style={styles.resultTitle}>Önbellek Dosyaları</Text>
                <Text style={styles.resultSize}>3.2 GB</Text>
              </View>
              <Text style={styles.resultDescription}>
                Uygulama önbellekleri ve geçici dosyalar
              </Text>
            </View>
          </FadeInView>

          <FadeInView delay={200}>
            <View style={styles.resultCard}>
              <View style={styles.resultHeader}>
                <Ionicons name="download-outline" size={20} color={theme.colors.secondary} />
                <Text style={styles.resultTitle}>İndirilen Dosyalar</Text>
                <Text style={styles.resultSize}>2.1 GB</Text>
              </View>
              <Text style={styles.resultDescription}>
                Kullanılmayan indirilen dosyalar
              </Text>
            </View>
          </FadeInView>

          <FadeInView delay={300}>
            <View style={styles.resultCard}>
              <View style={styles.resultHeader}>
                <Ionicons name="images-outline" size={20} color={theme.colors.accent} />
                <Text style={styles.resultTitle}>Gereksiz Medya</Text>
                <Text style={styles.resultSize}>1.8 GB</Text>
              </View>
              <Text style={styles.resultDescription}>
                Duplicate ve gereksiz fotoğraf/video dosyaları
              </Text>
            </View>
          </FadeInView>
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
    backgroundColor: theme.colors.primary,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
  },
  statusBadgeText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '600',
  },
  progressContainer: {
    marginBottom: 20,
  },
  progressBar: {
    height: 12,
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderRadius: 6,
    overflow: 'hidden',
    marginBottom: 12,
    position: 'relative',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.2)',
  },
  progressFill: {
    height: '100%',
    borderRadius: 6,
    overflow: 'hidden',
    position: 'relative',
  },
  progressGradient: {
    height: '100%',
    width: '100%',
    borderRadius: 6,
  },
  progressGlow: {
    position: 'absolute',
    height: '100%',
    borderRadius: 6,
    backgroundColor: 'rgba(255, 215, 0, 0.3)',
    shadowColor: '#FFD700',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.8,
    shadowRadius: 8,
    elevation: 6,
  },
  progressParticles: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    top: 0,
    left: 0,
  },
  progressParticle: {
    position: 'absolute',
    width: 4,
    height: 4,
    borderRadius: 2,
    top: '50%',
    marginTop: -2,
    shadowColor: '#FFD700',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 3,
  },
  progressInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  progressText: {
    color: theme.colors.text,
    fontSize: 18,
    fontWeight: '700',
  },
  progressStatus: {
    color: theme.colors.muted,
    fontSize: 14,
    fontWeight: '500',
  },
  scanStats: {
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
    gap: 12,
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
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12,
  },
  actionText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#fff',
  },
  resultsSection: {
    padding: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: theme.colors.text,
    marginBottom: 16,
  },
  resultCard: {
    backgroundColor: theme.colors.glass,
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
  },
  resultHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  resultTitle: {
    flex: 1,
    fontSize: 16,
    fontWeight: '600',
    color: theme.colors.text,
    marginLeft: 12,
  },
  resultSize: {
    fontSize: 16,
    fontWeight: '600',
    color: theme.colors.primary,
  },
  resultDescription: {
    fontSize: 14,
    color: theme.colors.muted,
    marginLeft: 36,
  },
})
