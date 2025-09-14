import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  Dimensions,
  StatusBar
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { ProgressRing } from '../components/ProgressRing';
import Animated, { 
  FadeInUp,
  FadeInDown,
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withRepeat,
  withSequence,
  withDelay,
  Easing,
  interpolate
} from 'react-native-reanimated';

const { width, height } = Dimensions.get('window');

interface CacheCleanAnimationScreenProps {
  navigation?: any;
}

export const CacheCleanAnimationScreen: React.FC<CacheCleanAnimationScreenProps> = ({ navigation }) => {
  const [progress, setProgress] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  const [cleanedSize, setCleanedSize] = useState('0 MB');

  // Animasyon değerleri
  const cacheScale = useSharedValue(1);
  const progressValue = useSharedValue(0);
  const checkmarkScale = useSharedValue(0);
  const pulseScale = useSharedValue(1);
  const sparkleRotation = useSharedValue(0);

  useEffect(() => {
    // Hızlı temizlik animasyonu (2-3 saniye)
    const cleanupTimer = setTimeout(() => {
      const startAnimations = () => {
        // Cache ikonu animasyonu - pulse efekti
        cacheScale.value = withRepeat(
          withSequence(
            withTiming(1.1, { duration: 400, easing: Easing.out(Easing.quad) }),
            withTiming(1, { duration: 400, easing: Easing.in(Easing.quad) })
          ),
          4,
          false
        );

        // Pulse efekti
        pulseScale.value = withRepeat(
          withSequence(
            withTiming(1.3, { duration: 500, easing: Easing.out(Easing.quad) }),
            withTiming(1, { duration: 500, easing: Easing.in(Easing.quad) })
          ),
          3,
          false
        );

        // Sparkle efekti
        sparkleRotation.value = withRepeat(
          withTiming(360, { duration: 2000, easing: Easing.linear }),
          -1,
          false
        );

        // Progress animasyonu
        progressValue.value = withTiming(100, { duration: 2000, easing: Easing.out(Easing.quad) });
      };

      // Use setTimeout to ensure animations start after render
      setTimeout(startAnimations, 0);

      // Progress güncelleme
      const progressInterval = setInterval(() => {
        setProgress(prev => {
          if (prev >= 100) {
            clearInterval(progressInterval);
            setIsComplete(true);
            setCleanedSize('245 MB');
            
            // Checkmark animasyonu
            checkmarkScale.value = withDelay(500, withTiming(1, { 
              duration: 400, 
              easing: Easing.out(Easing.back(1.5)) 
            }));

            // 2 saniye sonra ana sayfaya dön
            setTimeout(() => {
              navigation?.navigate('Home');
            }, 2000);

            return 100;
          }
          return prev + 2;
        });
      }, 40);

    }, 500);

    return () => clearTimeout(cleanupTimer);
  }, []);

  const cacheAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: cacheScale.value }]
  }));

  const pulseAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: pulseScale.value }],
    opacity: interpolate(pulseScale.value, [1, 1.3], [0.3, 0])
  }));

  const sparkleAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ rotate: `${sparkleRotation.value}deg` }]
  }));

  const checkmarkAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: checkmarkScale.value }]
  }));

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <StatusBar barStyle="light-content" backgroundColor="#0d0f1a" />
      
      <LinearGradient
        colors={['#0d0f1a', '#1a1c2d']}
        style={styles.gradient}
      >
        {/* Header */}
        <Animated.View 
          entering={FadeInDown.delay(100).duration(600)}
          style={styles.header}
        >
          <TouchableOpacity 
            onPress={() => {
              if (navigation && navigation.goBack) {
                navigation.goBack();
              }
            }}
            style={styles.backButton}
          >
            <Ionicons name="arrow-back" size={24} color="white" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Önbellek Temizliği</Text>
          <View style={styles.placeholder} />
        </Animated.View>

        {/* Ana İçerik */}
        <View style={styles.content}>
          {/* Modern İkon Tasarımı */}
          <Animated.View 
            entering={FadeInUp.delay(200).duration(800)}
            style={styles.modernIconContainer}
          >
            {/* Arka plan efektleri */}
            <Animated.View 
              style={[styles.backgroundEffect, pulseAnimatedStyle]}
            >
              <LinearGradient
                colors={['rgba(139, 92, 246, 0.1)', 'rgba(59, 130, 246, 0.05)']}
                style={styles.backgroundGradient}
              />
            </Animated.View>
            
            {/* Ana ikon container */}
            <Animated.View style={[styles.mainIconContainer, cacheAnimatedStyle]}>
              <LinearGradient
                colors={['#8b5cf6', '#3b82f6', '#1d4ed8']}
                style={styles.mainIconGradient}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
              >
                <Ionicons name="trash" size={60} color="white" />
              </LinearGradient>
            </Animated.View>
            
            {/* Floating sparkles */}
            <Animated.View 
              style={[styles.sparkle1, sparkleAnimatedStyle]}
            >
              <Ionicons name="sparkles" size={16} color="#8b5cf6" />
            </Animated.View>
            <Animated.View 
              style={[styles.sparkle2, sparkleAnimatedStyle]}
            >
              <Ionicons name="sparkles" size={12} color="#8b5cf6" />
            </Animated.View>
          </Animated.View>

          {/* Modern Progress */}
          <Animated.View 
            entering={FadeInUp.delay(300).duration(800)}
            style={styles.modernProgressContainer}
          >
            <View style={styles.progressWrapper}>
              <ProgressRing
                size={140}
                strokeWidth={8}
                progress={progress}
                color="#8b5cf6"
                backgroundColor="rgba(55, 65, 81, 0.3)"
              >
                {isComplete ? (
                  <Animated.View style={checkmarkAnimatedStyle}>
                    <View style={styles.checkmarkContainer}>
                      <Ionicons name="checkmark-circle" size={50} color="#8b5cf6" />
                    </View>
                  </Animated.View>
                ) : (
                  <View style={styles.progressContent}>
                    <Text style={styles.progressText}>{progress}%</Text>
                    <Text style={styles.progressLabel}>Tamamlandı</Text>
                  </View>
                )}
              </ProgressRing>
            </View>
          </Animated.View>

          {/* Modern Durum Kartı */}
          <Animated.View 
            entering={FadeInUp.delay(400).duration(800)}
            style={styles.modernStatusCard}
          >
            <LinearGradient
              colors={['rgba(139, 92, 246, 0.1)', 'rgba(59, 130, 246, 0.05)']}
              style={styles.statusGradient}
            >
              <View style={styles.statusHeader}>
                <Ionicons 
                  name={isComplete ? "checkmark-circle" : "refresh"} 
                  size={24} 
                  color="#8b5cf6" 
                />
                <Text style={styles.statusTitle}>
                  {isComplete ? 'Temizlik Tamamlandı!' : 'Önbellek temizleniyor...'}
                </Text>
              </View>
              
              <Text style={styles.statusSubtitle}>
                {isComplete ? `${cleanedSize} alan temizlendi` : 'Uygulama önbellek verileri siliniyor'}
              </Text>
              
              {/* Modern detaylar */}
              {!isComplete && (
                <View style={styles.modernDetailsGrid}>
                  <View style={styles.modernDetailItem}>
                    <View style={styles.detailIconContainer}>
                      <Ionicons name="apps-outline" size={18} color="#8b5cf6" />
                    </View>
                    <Text style={styles.modernDetailText}>Uygulama Önbelleği</Text>
                  </View>
                  <View style={styles.modernDetailItem}>
                    <View style={styles.detailIconContainer}>
                      <Ionicons name="image-outline" size={18} color="#8b5cf6" />
                    </View>
                    <Text style={styles.modernDetailText}>Görsel Önbelleği</Text>
                  </View>
                  <View style={styles.modernDetailItem}>
                    <View style={styles.detailIconContainer}>
                      <Ionicons name="code-outline" size={18} color="#8b5cf6" />
                    </View>
                    <Text style={styles.modernDetailText}>Kod Önbelleği</Text>
                  </View>
                </View>
              )}
            </LinearGradient>
          </Animated.View>

          {/* Modern Sonuç Kartı */}
          {isComplete && (
            <Animated.View 
              entering={FadeInUp.delay(500).duration(600)}
              style={styles.modernResultContainer}
            >
              <LinearGradient
                colors={['rgba(16, 185, 129, 0.1)', 'rgba(5, 150, 105, 0.05)']}
                style={styles.resultGradient}
              >
                <View style={styles.resultHeader}>
                  <Ionicons name="trophy" size={28} color="#10b981" />
                  <Text style={styles.resultTitle}>Temizlik Başarılı!</Text>
                </View>
                <Text style={styles.resultText}>245 MB alan kazanıldı</Text>
                <View style={styles.resultStats}>
                  <View style={styles.statItem}>
                    <Text style={styles.statNumber}>89</Text>
                    <Text style={styles.statLabel}>Uygulama Temizlendi</Text>
                  </View>
                  <View style={styles.statItem}>
                    <Text style={styles.statNumber}>156</Text>
                    <Text style={styles.statLabel}>Önbellek Dosyası</Text>
                  </View>
                </View>
              </LinearGradient>
            </Animated.View>
          )}
        </View>
      </LinearGradient>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0d0f1a',
  },
  gradient: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  backButton: {
    padding: 8,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: 'white',
  },
  placeholder: {
    width: 40,
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
    paddingBottom: 100,
  },
  modernIconContainer: {
    marginBottom: 30,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    width: 200,
    height: 200,
  },
  backgroundEffect: {
    position: 'absolute',
    width: 180,
    height: 180,
    borderRadius: 90,
  },
  backgroundGradient: {
    width: '100%',
    height: '100%',
    borderRadius: 90,
  },
  mainIconContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  mainIconGradient: {
    width: 100,
    height: 100,
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#8b5cf6',
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.5,
    shadowRadius: 24,
    elevation: 24,
  },
  sparkle1: {
    position: 'absolute',
    top: 20,
    right: 20,
  },
  sparkle2: {
    position: 'absolute',
    bottom: 30,
    left: 15,
  },
  modernProgressContainer: {
    marginBottom: 30,
    alignItems: 'center',
  },
  progressWrapper: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  progressContent: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  progressText: {
    fontSize: 28,
    fontWeight: 'bold',
    color: 'white',
  },
  progressLabel: {
    fontSize: 12,
    color: '#9ca3af',
    marginTop: 4,
  },
  checkmarkContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  modernStatusCard: {
    width: '100%',
    marginBottom: 20,
  },
  statusGradient: {
    padding: 20,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: 'rgba(139, 92, 246, 0.2)',
  },
  statusHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  statusTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: 'white',
    marginLeft: 12,
    flex: 1,
  },
  statusSubtitle: {
    fontSize: 14,
    color: '#9ca3af',
    marginBottom: 16,
  },
  modernDetailsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  modernDetailItem: {
    width: '30%',
    alignItems: 'center',
    marginBottom: 12,
  },
  detailIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(139, 92, 246, 0.2)',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  modernDetailText: {
    fontSize: 12,
    color: '#8b5cf6',
    textAlign: 'center',
    fontWeight: '500',
  },
  modernResultContainer: {
    width: '100%',
  },
  resultGradient: {
    padding: 20,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: 'rgba(16, 185, 129, 0.2)',
  },
  resultHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  resultTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: 'white',
    marginLeft: 12,
  },
  resultText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#10b981',
    marginBottom: 16,
  },
  resultStats: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  statItem: {
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#10b981',
  },
  statLabel: {
    fontSize: 12,
    color: '#9ca3af',
    marginTop: 4,
  },
});
