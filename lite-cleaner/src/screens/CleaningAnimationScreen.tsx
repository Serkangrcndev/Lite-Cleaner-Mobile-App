import React, { useEffect } from 'react'
import { View, Text, StyleSheet, SafeAreaView, StatusBar, Dimensions } from 'react-native'
import Animated, { 
  useAnimatedStyle, 
  useSharedValue, 
  withTiming,
  withSequence,
  withDelay,
  withSpring,
  interpolate,
  withRepeat,
  Easing,
  Extrapolate
} from 'react-native-reanimated'
import { LinearGradient } from 'expo-linear-gradient'
import { BlurView } from 'expo-blur'
import { theme } from '@/theme'
import AnimatedPressable from '@/components/AnimatedPressable'

const { width, height } = Dimensions.get('window')

type CleaningType = 'quick-clean' | 'deep-clean'

type CleaningAnimationScreenProps = {
  cleaningType: CleaningType
  onComplete: () => void
}

export default function CleaningAnimationScreen({ 
  cleaningType, 
  onComplete
}: CleaningAnimationScreenProps) {
  // Animation values
  const progress = useSharedValue(0)
  const scoreScale = useSharedValue(0)


  const scanLineY = useSharedValue(-100)
  const scanOpacity = useSharedValue(0)
  const backgroundGlow = useSharedValue(0)
  const cardScale = useSharedValue(0.8)
  const cardOpacity = useSharedValue(0)
  
  // Status items animation
  const statusItemsOpacity = useSharedValue(0)
  const statusItemsTranslateY = useSharedValue(50)

  const config = cleaningType === 'quick-clean' ? {
    title: 'Hızlı Optimizasyon',
    subtitle: 'Sistem performansı artırılıyor...',
    primaryColor: '#00E676',
    secondaryColor: '#00B8D4',
    accentColor: '#0099CC',
    glowColor: '#00E67640',
    duration: 4000,
    statusItems: [
      { title: 'Cache Temizliği', status: 'Beklemede...', icon: '🔄', progress: 0 },
      { title: 'RAM Optimizasyonu', status: 'Tamamlandı', icon: '✅', progress: 100 },
      { title: 'Gereksiz Dosyalar', status: 'Taranıyor...', icon: '🔍', progress: 60 },
      { title: 'Sistem Analizi', status: 'Beklemede...', icon: '⚙️', progress: 0 }
    ]
  } : {
    title: 'Derin Optimizasyon',
    subtitle: 'Kapsamlı sistem analizi yapılıyor...',
    primaryColor: '#FF6B9D',
    secondaryColor: '#FF8E53',
    accentColor: '#FF6B35',
    glowColor: '#FF6B9D40',
    duration: 6000,
    statusItems: [
      { title: 'Güvenlik Taraması', status: 'Tamamlandı', icon: '🛡️', progress: 100 },
      { title: 'Virüs Kontrolü', status: 'Beklemede...', icon: '🔒', progress: 0 },
      { title: 'Kayıt Defteri', status: 'Taranıyor...', icon: '📋', progress: 75 },
      { title: 'Sistem Bütünlüğü', status: 'Beklemede...', icon: '🔧', progress: 0 },
      { title: 'Performans Testi', status: 'Beklemede...', icon: '⚡', progress: 0 }
    ]
  }

  const [currentScore, setCurrentScore] = React.useState(0)
  const [currentStatusIndex, setCurrentStatusIndex] = React.useState(0)
  const [currentStatus, setCurrentStatus] = React.useState(config.statusItems[0])
  const progressRingValue = useSharedValue(0)



  // Animated styles
  const scoreStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scoreScale.value }],
    opacity: scoreScale.value,
  }))





  const scanLineStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: scanLineY.value }],
    opacity: scanOpacity.value,
  }))

  const statusItemsStyle = useAnimatedStyle(() => ({
    opacity: statusItemsOpacity.value,
    transform: [{ translateY: statusItemsTranslateY.value }],
  }))

  const backgroundGlowStyle = useAnimatedStyle(() => ({
    opacity: backgroundGlow.value,
    transform: [{ scale: interpolate(backgroundGlow.value, [0, 1], [0.8, 1.2], Extrapolate.CLAMP) }],
  }))

  const cardStyle = useAnimatedStyle(() => ({
    transform: [{ scale: cardScale.value }],
    opacity: cardOpacity.value,
  }))

  const progressRingStyle = useAnimatedStyle(() => ({
    transform: [{ rotate: `${progressRingValue.value * 360}deg` }],
  }))





  useEffect(() => {
    // Background glow entrance
    backgroundGlow.value = withDelay(200, withTiming(1, { duration: 1500 }))
    
    // Score entrance animation
    scoreScale.value = withDelay(500, withSpring(1, { damping: 15, stiffness: 100 }))
    
    // Progress ring başlangıç değeri
    progressRingValue.value = 0
    

    

    

    

    
    // Scan line animation
    scanLineY.value = withDelay(800, withRepeat(
      withTiming(height + 100, { duration: 4000, easing: Easing.out(Easing.quad) }),
      -1,
      false
    ))
    
    scanOpacity.value = withDelay(800, withRepeat(
      withSequence(
        withTiming(1, { duration: 1500 }),
        withTiming(0.4, { duration: 2500 })
      ),
      -1,
      true
    ))

    // Card entrance
    cardScale.value = withDelay(1000, withSpring(1, { damping: 12, stiffness: 80 }))
    cardOpacity.value = withDelay(1000, withTiming(1, { duration: 800 }))

    // Status items entrance
    statusItemsOpacity.value = withDelay(1200, withTiming(1, { duration: 1000 }))
    statusItemsTranslateY.value = withDelay(1200, withTiming(0, { duration: 1000 }))

    // Score counter animation - 100'e kadar tamamla
    const targetScore = 100
    const scoreInterval = setInterval(() => {
      setCurrentScore(prev => {
        if (prev < targetScore) {
          const newScore = prev + 1
          // Progress ring'i güncelle
          progressRingValue.value = withTiming(newScore / 100, {
            duration: 100,
            easing: Easing.out(Easing.quad)
          })
          return newScore
        }
        return prev
      })
    }, Math.max(50, config.duration / targetScore)) // Minimum 50ms interval

    // Status updates
    const stepDuration = config.duration / config.statusItems.length
    const statusInterval = setInterval(() => {
      const newIndex = (currentStatusIndex + 1) % config.statusItems.length
      setCurrentStatusIndex(newIndex)
      setCurrentStatus(config.statusItems[newIndex])
    }, stepDuration)

    // Artık otomatik kapanmıyor, kullanıcı butona basınca kapanacak

    return () => {
      clearInterval(scoreInterval)
      clearInterval(statusInterval)
    }
  }, [])

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="transparent" translucent />
      
      {/* Animated Background */}
      <Animated.View style={[StyleSheet.absoluteFillObject, backgroundGlowStyle]}>
        <LinearGradient
          colors={['#0A0E1A', '#1A1F2E', '#0A0E1A']}
          style={StyleSheet.absoluteFillObject}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
        />
        
        {/* Subtle glow overlay */}
        <LinearGradient
          colors={['transparent', config.glowColor, 'transparent']}
          style={styles.glowOverlay}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
        />
      </Animated.View>

      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>{config.title}</Text>
        <Text style={styles.subtitle}>{config.subtitle}</Text>
      </View>

      {/* Main Content */}
      <View style={styles.mainContainer}>
        
        {/* Central Score Circle */}
        <View style={styles.scoreContainer}>
          {/* Background glow ring */}
          <Animated.View style={styles.backgroundRing}>
            <LinearGradient
              colors={[`${config.primaryColor}20`, 'transparent']}
              style={styles.backgroundRingGradient}
            />
          </Animated.View>
          
          {/* Progress Ring - Puan ile dolan */}
          <Animated.View style={[styles.progressRing, progressRingStyle]}>
            <View style={styles.progressRingBackground} />
            <View style={[styles.progressRingFill, { 
              transform: [{ rotate: `${progressRingValue.value * 360}deg` }],
              borderTopColor: config.primaryColor,
              borderRightColor: config.secondaryColor,
            }]} />
          </Animated.View>
          
          {/* Outer Ring - Animasyonsuz */}
          <View style={styles.outerRing}>
            <LinearGradient
              colors={[config.primaryColor, config.secondaryColor, config.accentColor]}
              style={styles.ringGradient}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
            />
          </View>
          
          {/* Inner Circle */}
          <Animated.View style={[styles.innerCircle, scoreStyle]}>
            <LinearGradient
              colors={['rgba(255,255,255,0.98)', 'rgba(255,255,255,0.92)']}
              style={styles.innerGradient}
            >
              {/* Score Container */}
              <View style={styles.scoreContent}>
                <Text style={styles.scoreText}>{currentScore}</Text>
                <Text style={styles.scoreLabel}>puan</Text>
                

              </View>
            </LinearGradient>
          </Animated.View>
        </View>

        {/* Scan Line */}
        <Animated.View style={[styles.scanLine, scanLineStyle]}>
          <LinearGradient
            colors={[
              'transparent',
              `${config.primaryColor}60`,
              config.primaryColor,
              `${config.primaryColor}60`,
              'transparent'
            ]}
            style={styles.scanLineGradient}
          />
        </Animated.View>

        {/* Status Items Card */}
        <Animated.View style={[styles.statusCard, cardStyle]}>
          <BlurView intensity={20} tint="dark" style={styles.statusCardBlur}>
            <View style={styles.statusCardHeader}>
              <Text style={styles.statusCardTitle}>Optimizasyon Durumu</Text>
              <View style={styles.statusCardProgress}>
                <Text style={styles.statusCardProgressText}>
                  {Math.round((currentStatusIndex + 1) / config.statusItems.length * 100)}%
                </Text>
              </View>
            </View>
            
            <Animated.View style={[styles.statusContainer, statusItemsStyle]}>
              {config.statusItems.map((item, index) => (
                <View key={index} style={styles.statusItem}>
                  <View style={styles.statusIconContainer}>
                    <Text style={styles.statusIcon}>{item.icon}</Text>
                  </View>
                  
                  <View style={styles.statusContent}>
                    <Text style={styles.statusTitle}>{item.title}</Text>
                    <Text style={styles.statusText}>{item.status}</Text>
                  </View>
                  
                  <View style={styles.statusIndicator}>
                    {item.status === 'Tamamlandı' ? (
                      <View style={[styles.indicator, styles.completedIndicator]}>
                        <Text style={styles.checkmark}>✓</Text>
                      </View>
                    ) : item.status === 'Taranıyor...' ? (
                      <View style={[styles.indicator, styles.scanningIndicator]}>
                        <View style={styles.scanningDot} />
                      </View>
                    ) : (
                      <View style={[styles.indicator, styles.pendingIndicator]}>
                        <View style={styles.pendingDot} />
                      </View>
                    )}
                  </View>
                </View>
              ))}
            </Animated.View>
          </BlurView>
        </Animated.View>

        {/* Tamam Button */}
        <Animated.View style={[styles.buttonContainer, cardStyle]}>
          <BlurView intensity={20} tint="dark" style={styles.buttonBlur}>
            <AnimatedPressable style={styles.tamamButton} onPress={onComplete}>
              <LinearGradient
                colors={[config.primaryColor, config.secondaryColor]}
                style={styles.buttonGradient}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
              >
                <Text style={styles.buttonText}>Tamam</Text>
              </LinearGradient>
            </AnimatedPressable>
          </BlurView>
        </Animated.View>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0A0E1A',
  },
  header: {
    alignItems: 'center',
    paddingTop: 60,
    paddingBottom: 40,
  },
  title: {
    fontSize: 32,
    fontWeight: '800',
    color: '#FFFFFF',
    marginBottom: 12,
    letterSpacing: 0.8,
    textShadowColor: 'rgba(0,0,0,0.3)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4,
  },
  subtitle: {
    fontSize: 18,
    color: 'rgba(255,255,255,0.8)',
    fontWeight: '500',
    letterSpacing: 0.4,
  },
  mainContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  scoreContainer: {
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 80,
  },
  backgroundRing: {
    position: 'absolute',
    width: 240,
    height: 240,
    borderRadius: 120,
  },
  backgroundRingGradient: {
    width: '100%',
    height: '100%',
    borderRadius: 120,
  },
  progressRing: {
    position: 'absolute',
    width: 200,
    height: 200,
    borderRadius: 100,
    overflow: 'hidden',
  },
  progressRingBackground: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    borderRadius: 100,
    borderWidth: 12,
    borderColor: 'rgba(255,255,255,0.15)',
    backgroundColor: 'transparent',
  },
  progressRingFill: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    borderRadius: 100,
    borderWidth: 12,
    borderColor: 'transparent',
    borderTopColor: '#00E676',
    borderRightColor: '#00B8D4',
    transform: [{ rotate: '-90deg' }], // 12 o'clock'tan başla
  },
  outerRing: {
    width: 220,
    height: 220,
    borderRadius: 110,
    borderWidth: 10,
    borderColor: 'transparent',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.4,
    shadowRadius: 20,
    elevation: 15,
  },
  ringGradient: {
    width: '100%',
    height: '100%',
    borderRadius: 110,
  },
  innerCircle: {
    position: 'absolute',
    width: 160,
    height: 160,
    borderRadius: 80,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.4,
    shadowRadius: 24,
    elevation: 12,
  },
  innerGradient: {
    width: '100%',
    height: '100%',
    borderRadius: 80,
    justifyContent: 'center',
    alignItems: 'center',
  },
  scoreContent: {
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },

  scoreText: {
    fontSize: 56,
    fontWeight: '900',
    color: '#1A1F2E',
    marginBottom: 8,
    letterSpacing: 1,
    textShadowColor: 'rgba(0,0,0,0.1)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
  scoreLabel: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1A1F2E',
    opacity: 0.9,
    letterSpacing: 0.5,
    textShadowColor: 'rgba(0,0,0,0.1)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
  scanLine: {
    position: 'absolute',
    width: width * 0.85,
    height: 4,
    borderRadius: 2,
    left: width * 0.075,
  },
  scanLineGradient: {
    width: '100%',
    height: '100%',
    borderRadius: 2,
  },
  glowOverlay: {
    position: 'absolute',
    width: '100%',
    height: '100%',
  },
  statusCard: {
    width: '100%',
    maxWidth: 420,
    borderRadius: 24,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 20 },
    shadowOpacity: 0.3,
    shadowRadius: 40,
    elevation: 20,
  },
  statusCardBlur: {
    padding: 24,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.15)',
    backgroundColor: 'rgba(255,255,255,0.08)',
  },
  statusCardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255,255,255,0.1)',
  },
  statusCardTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#FFFFFF',
    letterSpacing: 0.5,
  },
  statusCardProgress: {
    backgroundColor: 'rgba(255,255,255,0.1)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
  },
  statusCardProgressText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  statusContainer: {
    width: '100%',
  },
  statusItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.06)',
    borderRadius: 18,
    padding: 20,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.12)',
  },
  statusIconContainer: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: 'rgba(255,255,255,0.12)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 18,
  },
  statusIcon: {
    fontSize: 22,
  },
  statusContent: {
    flex: 1,
  },
  statusTitle: {
    fontSize: 17,
    fontWeight: '600',
    color: '#FFFFFF',
    marginBottom: 6,
    letterSpacing: 0.3,
  },
  statusText: {
    fontSize: 15,
    color: 'rgba(255,255,255,0.7)',
    fontWeight: '400',
    letterSpacing: 0.2,
  },
  statusIndicator: {
    width: 28,
    height: 28,
    justifyContent: 'center',
    alignItems: 'center',
  },
  indicator: {
    width: 24,
    height: 24,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  completedIndicator: {
    backgroundColor: '#00E676',
    shadowColor: '#00E676',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 8,
    elevation: 8,
  },
  checkmark: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: 'bold',
  },
  scanningIndicator: {
    backgroundColor: '#00E676',
    shadowColor: '#00E676',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 8,
    elevation: 8,
  },
  scanningDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#FFFFFF',
  },
  pendingIndicator: {
    backgroundColor: 'rgba(255,255,255,0.15)',
    borderWidth: 2,
    borderColor: 'rgba(255,255,255,0.3)',
  },
  pendingDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: 'rgba(255,255,255,0.6)',
  },
  buttonContainer: {
    width: '100%',
    maxWidth: 420,
    marginTop: 20,
    borderRadius: 24,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 20 },
    shadowOpacity: 0.3,
    shadowRadius: 40,
    elevation: 20,
  },
  buttonBlur: {
    padding: 20,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.15)',
    backgroundColor: 'rgba(255,255,255,0.08)',
  },
  tamamButton: {
    borderRadius: 16,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 16,
    elevation: 12,
  },
  buttonGradient: {
    paddingVertical: 18,
    paddingHorizontal: 32,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    fontSize: 18,
    fontWeight: '700',
    color: '#FFFFFF',
    letterSpacing: 0.5,
    textShadowColor: 'rgba(0,0,0,0.2)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
})