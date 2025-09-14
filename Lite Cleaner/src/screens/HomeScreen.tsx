import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  TouchableOpacity, 
  Dimensions,
  Modal
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { ProgressRing } from '../components/ProgressRing';
import { GradientCard } from '../components/GradientCard';
import { Ionicons } from '@expo/vector-icons';
import Animated, { 
  FadeInUp, 
  FadeInDown,
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withDelay,
  withRepeat,
  withSequence,
  Easing
} from 'react-native-reanimated';

const { width } = Dimensions.get('window');

interface HomeScreenProps {
  navigation?: any;
}

export const HomeScreen: React.FC<HomeScreenProps> = ({ navigation }) => {
  const [ramUsage, setRamUsage] = useState(0);
  const [cpuUsage, setCpuUsage] = useState(0);
  const [batteryLevel, setBatteryLevel] = useState(0);
  const [showAnalysisModal, setShowAnalysisModal] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [showRatingPrompt, setShowRatingPrompt] = useState(false);
  const [buttonGlow, setButtonGlow] = useState(false);
  const glowScale = useSharedValue(1);
  const glowOpacity = useSharedValue(0.3);
  
  // 5 yıldız için animasyon değerleri
  const star1Scale = useSharedValue(1);
  const star2Scale = useSharedValue(1);
  const star3Scale = useSharedValue(1);
  const star4Scale = useSharedValue(1);
  const star5Scale = useSharedValue(1);
  
  const star1Opacity = useSharedValue(0.8);
  const star2Opacity = useSharedValue(0.8);
  const star3Opacity = useSharedValue(0.8);
  const star4Opacity = useSharedValue(0.8);
  const star5Opacity = useSharedValue(0.8);

  useEffect(() => {
    // Simulate loading data with exact values from design
    const timer = setTimeout(() => {
      setRamUsage(45); // Exact value from design
      setCpuUsage(44); // Exact value from design
      setBatteryLevel(66); // Exact value from design
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  // Glow animation effect
  useEffect(() => {
    const startGlowAnimation = () => {
      glowScale.value = withRepeat(
        withSequence(
          withTiming(1.05, { duration: 1500, easing: Easing.inOut(Easing.ease) }),
          withTiming(1, { duration: 1500, easing: Easing.inOut(Easing.ease) })
        ),
        -1,
        false
      );
      
      glowOpacity.value = withRepeat(
        withSequence(
          withTiming(0.6, { duration: 1500, easing: Easing.inOut(Easing.ease) }),
          withTiming(0.3, { duration: 1500, easing: Easing.inOut(Easing.ease) })
        ),
        -1,
        false
      );
    };

    const timer = setTimeout(startGlowAnimation, 2000);
    return () => clearTimeout(timer);
  }, []);

  // 5 yıldız animasyon efekti
  useEffect(() => {
    const startStarAnimations = () => {
      // Her yıldız için farklı gecikme ile animasyon
      const starAnimations = [
        { scale: star1Scale, opacity: star1Opacity, delay: 0 },
        { scale: star2Scale, opacity: star2Opacity, delay: 200 },
        { scale: star3Scale, opacity: star3Opacity, delay: 400 },
        { scale: star4Scale, opacity: star4Opacity, delay: 600 },
        { scale: star5Scale, opacity: star5Opacity, delay: 800 },
      ];

      starAnimations.forEach(({ scale, opacity, delay }) => {
        setTimeout(() => {
          scale.value = withRepeat(
            withSequence(
              withTiming(1.2, { duration: 1000, easing: Easing.inOut(Easing.ease) }),
              withTiming(1, { duration: 1000, easing: Easing.inOut(Easing.ease) })
            ),
            -1,
            false
          );
          
          opacity.value = withRepeat(
            withSequence(
              withTiming(1, { duration: 1000, easing: Easing.inOut(Easing.ease) }),
              withTiming(0.6, { duration: 1000, easing: Easing.inOut(Easing.ease) })
            ),
            -1,
            false
          );
        }, delay);
      });
    };

    const timer = setTimeout(startStarAnimations, 1000);
    return () => clearTimeout(timer);
  }, []);

  const getRandomInt = useCallback((min: number, max: number) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }, []);

  const handleAnalyze = () => {
    setIsAnalyzing(true);
    setShowAnalysisModal(true);
    
    // Simulate analysis process
    const analysisTimer = setTimeout(() => {
      setIsAnalyzing(false);
    }, 2000);

    // Cleanup function
    return () => clearTimeout(analysisTimer);
  };

  const handleRateApp = useCallback(() => {
    // Google Play Store'da uygulamayı aç
    const playStoreUrl = 'https://play.google.com/store/apps/details?id=com.litecleaner.app';
    // React Native'de Linking kullanarak açabilirsiniz
    // Linking.openURL(playStoreUrl);
    console.log('Opening Play Store:', playStoreUrl);
  }, []);

  const handleShowRatingPrompt = useCallback(() => {
    setShowRatingPrompt(true);
  }, []);

  const glowAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: glowScale.value }],
    opacity: glowOpacity.value,
  }));

  // 5 yıldız için animated style'lar
  const star1AnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: star1Scale.value }],
    opacity: star1Opacity.value,
  }));

  const star2AnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: star2Scale.value }],
    opacity: star2Opacity.value,
  }));

  const star3AnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: star3Scale.value }],
    opacity: star3Opacity.value,
  }));

  const star4AnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: star4Scale.value }],
    opacity: star4Opacity.value,
  }));

  const star5AnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: star5Scale.value }],
    opacity: star5Opacity.value,
  }));

  return (
    <SafeAreaView style={styles.container} edges={['bottom']}>
      <ScrollView 
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <Animated.View 
          entering={FadeInUp.delay(100).duration(800)}
          style={styles.header}
        >
          <View style={styles.headerLeft}>
            <View style={styles.iconContainer}>
              <Ionicons name="shield-checkmark" size={24} color="white" />
            </View>
            <View>
              <Text style={styles.headerTitle}>Merhaba!</Text>
              <Text style={styles.headerSubtitle}>Sisteminiz optimize durumda.</Text>
            </View>
          </View>
          <View style={styles.headerRight}>
            <View style={styles.rateButtonContainer}>
              <Animated.View style={[styles.rateButtonGlow, glowAnimatedStyle]} />
              <TouchableOpacity 
                style={styles.rateButton}
                onPress={handleShowRatingPrompt}
                activeOpacity={0.8}
              >
                <LinearGradient
                  colors={['#fbbf24', '#f59e0b', '#d97706']}
                  style={styles.rateButtonGradient}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                >
                  <Ionicons name="star" size={14} color="white" />
                  <Text style={styles.rateButtonText}>Oy Ver</Text>
                </LinearGradient>
              </TouchableOpacity>
            </View>
            <TouchableOpacity onPress={() => navigation?.navigate('Settings')}>
              <Ionicons name="settings-outline" size={24} color="#9ca3af" />
            </TouchableOpacity>
          </View>
        </Animated.View>

        {/* System Stats */}
        <Animated.View 
          entering={FadeInUp.delay(200).duration(800)}
          style={styles.statsContainer}
        >
          <View style={styles.statsRow}>
            <View style={styles.statItem}>
              <ProgressRing
                size={80}
                strokeWidth={3}
                progress={ramUsage}
                color="#60a5fa"
                backgroundColor="#374151"
              >
                <Text style={styles.statPercentage}>{ramUsage}%</Text>
              </ProgressRing>
              <Text style={styles.statLabel}>RAM</Text>
            </View>
            
            <View style={styles.statItem}>
              <ProgressRing
                size={80}
                strokeWidth={3}
                progress={cpuUsage}
                color="#ff8a6b"
                backgroundColor="#374151"
              >
                <Text style={styles.statPercentage}>{cpuUsage}%</Text>
              </ProgressRing>
              <Text style={styles.statLabel}>CPU</Text>
            </View>
            
            <View style={styles.statItem}>
              <ProgressRing
                size={80}
                strokeWidth={3}
                progress={batteryLevel}
                color="#34d399"
                backgroundColor="#374151"
              >
                <Text style={styles.statPercentage}>{batteryLevel}%</Text>
              </ProgressRing>
              <Text style={styles.statLabel}>Pil</Text>
            </View>
          </View>
        </Animated.View>

        {/* Storage Analysis */}
        <Animated.View 
          entering={FadeInUp.delay(300).duration(800)}
          style={styles.storageCard}
        >
          <View style={styles.storageHeader}>
            <Text style={styles.storageTitle}>Depolama Analizi</Text>
            <TouchableOpacity onPress={handleAnalyze}>
              <Text style={styles.analyzeButton}>Analiz Et</Text>
            </TouchableOpacity>
          </View>
          
          <View style={styles.storageContent}>
            <View style={styles.storageInfo}>
              <Text style={styles.storageLabel}>Toplam Alan</Text>
              <Text style={styles.storageValue}>128 GB</Text>
            </View>
            
            <View style={styles.progressBar}>
              <View style={[styles.progressFill, { width: '65%' }]} />
            </View>
            
            <View style={styles.storageDetails}>
              <Text style={styles.storageDetail}>
                Kullanılan: <Text style={styles.storageDetailValue}>83.2 GB</Text>
              </Text>
              <Text style={styles.storageDetail}>
                Boş: <Text style={styles.storageDetailValue}>44.8 GB</Text>
              </Text>
            </View>
          </View>
        </Animated.View>

        {/* Quick Actions */}
        <Animated.View 
          entering={FadeInUp.delay(400).duration(800)}
          style={styles.actionsContainer}
        >
          <Text style={styles.actionsTitle}>Hızlı İşlemler</Text>
          
          <View style={styles.actionsGrid}>
            {/* İlk satır - Yan yana iki kart */}
            <View style={styles.topRow}>
              {/* Çöp Kutusu */}
              <GradientCard
                colors={['#f59e0b', '#d97706']}
                style={styles.halfWidthCard}
                vertical={true}
                onPress={() => navigation?.navigate('TrashCleanAnimation')}
              >
                <Ionicons name="trash-bin" size={28} color="white" />
                <Text style={styles.actionTitle}>Çöp Kutusu</Text>
                <Text style={styles.actionSubtitle}>89 MB</Text>
              </GradientCard>
              
              {/* İndirilenler */}
              <GradientCard
                colors={['#ef4444', '#dc2626']}
                style={styles.halfWidthCard}
                vertical={true}
                onPress={() => navigation?.navigate('DownloadsCleanAnimation')}
              >
                <Ionicons name="download" size={28} color="white" />
                <Text style={styles.actionTitle}>İndirilenler</Text>
                <Text style={styles.actionSubtitle}>128 MB</Text>
              </GradientCard>
            </View>
            
            {/* İkinci satır - Tam genişlik kart */}
            <GradientCard
              colors={['#1e40af', '#06b6d4']}
              style={styles.fullWidthCard}
              vertical={true}
              onPress={() => navigation?.navigate('BatteryHealthAnimation')}
            >
              <Ionicons name="battery-charging" size={28} color="white" />
              <Text style={styles.actionTitle}>Pil Sağlığı</Text>
              <Text style={styles.actionSubtitle}>Pil ömrünü optimize et</Text>
            </GradientCard>
          </View>
        </Animated.View>
      </ScrollView>

      {/* Storage Analysis Modal */}
      <Modal
        visible={showAnalysisModal}
        animationType="slide"
        presentationStyle="pageSheet"
        onRequestClose={() => setShowAnalysisModal(false)}
      >
        <SafeAreaView style={styles.modalContainer}>
          <View style={styles.modalHeader}>
            <TouchableOpacity 
              style={styles.closeButton}
              onPress={() => setShowAnalysisModal(false)}
            >
              <Ionicons name="close" size={24} color="white" />
            </TouchableOpacity>
            <Text style={styles.modalTitle}>Depolama Analizi</Text>
            <View style={styles.placeholder} />
          </View>

          <ScrollView style={styles.modalContent}>
            {isAnalyzing ? (
              <View style={styles.analyzingContainer}>
                <ProgressRing
                  size={120}
                  strokeWidth={6}
                  progress={75}
                  color="#60a5fa"
                  backgroundColor="#374151"
                >
                  <Ionicons name="analytics" size={32} color="#60a5fa" />
                </ProgressRing>
                <Text style={styles.analyzingTitle}>Analiz Ediliyor...</Text>
                <Text style={styles.analyzingDescription}>
                  Depolama alanınız detaylı olarak inceleniyor
                </Text>
              </View>
            ) : (
              <View style={styles.analysisResults}>
                <View style={styles.analysisCard}>
                  <View style={styles.analysisHeader}>
                    <Ionicons name="checkmark-circle" size={24} color="#34d399" />
                    <Text style={styles.analysisTitle}>Analiz Tamamlandı</Text>
                  </View>
                  
                  <View style={styles.storageBreakdown}>
                    <Text style={styles.breakdownTitle}>Depolama Dağılımı</Text>
                    
                    <View style={styles.storageItem}>
                      <View style={styles.storageItemLeft}>
                        <View style={[styles.storageIcon, { backgroundColor: '#ff6b6b' }]}>
                          <Ionicons name="images" size={16} color="white" />
                        </View>
                        <Text style={styles.storageItemName}>Resimler</Text>
                      </View>
                      <View style={styles.storageItemRight}>
                        <Text style={styles.storageItemSize}>24.5 GB</Text>
                        <View style={styles.storageItemBar}>
                          <View style={[styles.storageItemFill, { width: '65%', backgroundColor: '#ff6b6b' }]} />
                        </View>
                      </View>
                    </View>

                    <View style={styles.storageItem}>
                      <View style={styles.storageItemLeft}>
                        <View style={[styles.storageIcon, { backgroundColor: '#4ecdc4' }]}>
                          <Ionicons name="musical-notes" size={16} color="white" />
                        </View>
                        <Text style={styles.storageItemName}>Müzik</Text>
                      </View>
                      <View style={styles.storageItemRight}>
                        <Text style={styles.storageItemSize}>18.2 GB</Text>
                        <View style={styles.storageItemBar}>
                          <View style={[styles.storageItemFill, { width: '48%', backgroundColor: '#4ecdc4' }]} />
                        </View>
                      </View>
                    </View>

                    <View style={styles.storageItem}>
                      <View style={styles.storageItemLeft}>
                        <View style={[styles.storageIcon, { backgroundColor: '#45b7d1' }]}>
                          <Ionicons name="videocam" size={16} color="white" />
                        </View>
                        <Text style={styles.storageItemName}>Videolar</Text>
                      </View>
                      <View style={styles.storageItemRight}>
                        <Text style={styles.storageItemSize}>15.8 GB</Text>
                        <View style={styles.storageItemBar}>
                          <View style={[styles.storageItemFill, { width: '42%', backgroundColor: '#45b7d1' }]} />
                        </View>
                      </View>
                    </View>

                    <View style={styles.storageItem}>
                      <View style={styles.storageItemLeft}>
                        <View style={[styles.storageIcon, { backgroundColor: '#f9ca24' }]}>
                          <Ionicons name="apps" size={16} color="white" />
                        </View>
                        <Text style={styles.storageItemName}>Uygulamalar</Text>
                      </View>
                      <View style={styles.storageItemRight}>
                        <Text style={styles.storageItemSize}>12.3 GB</Text>
                        <View style={styles.storageItemBar}>
                          <View style={[styles.storageItemFill, { width: '33%', backgroundColor: '#f9ca24' }]} />
                        </View>
                      </View>
                    </View>

                    <View style={styles.storageItem}>
                      <View style={styles.storageItemLeft}>
                        <View style={[styles.storageIcon, { backgroundColor: '#6c5ce7' }]}>
                          <Ionicons name="document" size={16} color="white" />
                        </View>
                        <Text style={styles.storageItemName}>Dosyalar</Text>
                      </View>
                      <View style={styles.storageItemRight}>
                        <Text style={styles.storageItemSize}>8.7 GB</Text>
                        <View style={styles.storageItemBar}>
                          <View style={[styles.storageItemFill, { width: '23%', backgroundColor: '#6c5ce7' }]} />
                        </View>
                      </View>
                    </View>

                    <View style={styles.storageItem}>
                      <View style={styles.storageItemLeft}>
                        <View style={[styles.storageIcon, { backgroundColor: '#a29bfe' }]}>
                          <Ionicons name="trash" size={16} color="white" />
                        </View>
                        <Text style={styles.storageItemName}>Önbellek</Text>
                      </View>
                      <View style={styles.storageItemRight}>
                        <Text style={styles.storageItemSize}>3.7 GB</Text>
                        <View style={styles.storageItemBar}>
                          <View style={[styles.storageItemFill, { width: '10%', backgroundColor: '#a29bfe' }]} />
                        </View>
                      </View>
                    </View>
                  </View>

                  <View style={styles.recommendations}>
                    <Text style={styles.recommendationsTitle}>Öneriler</Text>
                    <View style={styles.recommendationItem}>
                      <Ionicons name="bulb" size={16} color="#f59e0b" />
                      <Text style={styles.recommendationText}>
                        Resimlerinizi buluta yükleyerek 15 GB alan kazanabilirsiniz
                      </Text>
                    </View>
                    <View style={styles.recommendationItem}>
                      <Ionicons name="bulb" size={16} color="#f59e0b" />
                      <Text style={styles.recommendationText}>
                        Önbellek dosyalarını temizleyerek 3.7 GB alan kazanabilirsiniz
                      </Text>
                    </View>
                    <View style={styles.recommendationItem}>
                      <Ionicons name="bulb" size={16} color="#f59e0b" />
                      <Text style={styles.recommendationText}>
                        Kullanılmayan uygulamaları kaldırarak 5 GB alan kazanabilirsiniz
                      </Text>
                    </View>
                  </View>
                </View>
              </View>
            )}
          </ScrollView>
        </SafeAreaView>
      </Modal>

      {/* Rating Prompt Modal */}
      <Modal
        visible={showRatingPrompt}
        animationType="fade"
        transparent={true}
        onRequestClose={() => setShowRatingPrompt(false)}
      >
        <View style={styles.ratingModalOverlay}>
          <Animated.View 
            entering={FadeInUp.duration(300)}
            style={styles.ratingModalContainer}
          >
            <View style={styles.ratingModalHeader}>
              <View style={styles.ratingStarsContainer}>
                <Animated.View style={[styles.ratingStarWrapper, star1AnimatedStyle]}>
                  <Ionicons name="star" size={24} color="#fbbf24" />
                </Animated.View>
                <Animated.View style={[styles.ratingStarWrapper, star2AnimatedStyle]}>
                  <Ionicons name="star" size={24} color="#fbbf24" />
                </Animated.View>
                <Animated.View style={[styles.ratingStarWrapper, star3AnimatedStyle]}>
                  <Ionicons name="star" size={24} color="#fbbf24" />
                </Animated.View>
                <Animated.View style={[styles.ratingStarWrapper, star4AnimatedStyle]}>
                  <Ionicons name="star" size={24} color="#fbbf24" />
                </Animated.View>
                <Animated.View style={[styles.ratingStarWrapper, star5AnimatedStyle]}>
                  <Ionicons name="star" size={24} color="#fbbf24" />
                </Animated.View>
              </View>
              <Text style={styles.ratingModalTitle}>Uygulamayı Beğendiniz mi?</Text>
              <Text style={styles.ratingModalSubtitle}>
                Lite Cleaner'ı Google Play Store'da değerlendirin ve diğer kullanıcılara yardımcı olun.
              </Text>
            </View>
            
            <View style={styles.ratingModalActions}>
              <TouchableOpacity 
                style={styles.ratingLaterButton}
                onPress={() => setShowRatingPrompt(false)}
                activeOpacity={0.7}
              >
                <Text style={styles.ratingLaterText}>Daha Sonra</Text>
              </TouchableOpacity>
              
              <TouchableOpacity 
                style={styles.ratingNowButton}
                onPress={() => {
                  setShowRatingPrompt(false);
                  handleRateApp();
                }}
                activeOpacity={0.8}
              >
                <LinearGradient
                  colors={['#fbbf24', '#f59e0b', '#d97706']}
                  style={styles.ratingNowGradient}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                >
                  <View style={styles.ratingNowContent}>
                    <Ionicons name="star" size={14} color="white" />
                    <Text style={styles.ratingNowText}>Şimdi Oy Ver</Text>
                  </View>
                </LinearGradient>
              </TouchableOpacity>
            </View>
          </Animated.View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0d0f1a',
  },
  scrollContent: {
    padding: 16,
    paddingBottom: 120,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  rateButtonContainer: {
    position: 'relative',
  },
  rateButtonGlow: {
    position: 'absolute',
    top: -1,
    left: -1,
    right: -1,
    bottom: -1,
    backgroundColor: '#fbbf24',
    borderRadius: 19,
    shadowColor: '#fbbf24',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.6,
    shadowRadius: 4,
    elevation: 4,
  },
  rateButton: {
    borderRadius: 18,
    overflow: 'hidden',
    shadowColor: '#fbbf24',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
  },
  rateButtonGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 18,
  },
  rateButtonText: {
    color: 'white',
    fontSize: 12,
    fontWeight: '600',
    marginLeft: 4,
    textShadowColor: 'rgba(0, 0, 0, 0.2)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 1,
  },
  iconContainer: {
    backgroundColor: '#2563eb',
    padding: 12,
    borderRadius: 50,
    marginRight: 16,
    shadowColor: '#2563eb',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
  },
  headerSubtitle: {
    fontSize: 14,
    color: '#9ca3af',
  },
  notificationIcon: {
    fontSize: 24,
    color: '#9ca3af',
  },
  statsContainer: {
    backgroundColor: '#1a1c2d',
    padding: 16,
    borderRadius: 16,
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  statItem: {
    alignItems: 'center',
  },
  statPercentage: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
  },
  statLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#d1d5db',
    marginTop: 8,
  },
  storageCard: {
    backgroundColor: '#1a1c2d',
    padding: 24,
    borderRadius: 16,
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  storageHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  storageTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: 'white',
  },
  analyzeButton: {
    fontSize: 14,
    fontWeight: '600',
    color: '#60a5fa',
  },
  storageContent: {
    gap: 16,
  },
  storageInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  storageLabel: {
    fontSize: 14,
    color: '#9ca3af',
  },
  storageValue: {
    fontSize: 16,
    fontWeight: '600',
    color: 'white',
  },
  progressBar: {
    height: 10,
    backgroundColor: '#374151',
    borderRadius: 5,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#3b82f6',
    borderRadius: 5,
  },
  storageDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  storageDetail: {
    fontSize: 14,
    color: '#9ca3af',
  },
  storageDetailValue: {
    color: 'white',
    fontWeight: '600',
  },
  actionsContainer: {
    marginBottom: 24,
  },
  actionsTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: 'white',
    marginBottom: 16,
  },
  actionsGrid: {
    gap: 16,
  },
  topRow: {
    flexDirection: 'row',
    gap: 12,
  },
  halfWidthCard: {
    flex: 1,
    height: 120,
    maxHeight: 120,
    minHeight: 120,
  },
  fullWidthCard: {
    width: '100%',
    minHeight: 120,
  },
  actionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: 'white',
    marginTop: 12,
    marginBottom: 4,
    textAlign: 'center',
  },
  actionSubtitle: {
    fontSize: 12,
    color: 'rgba(255, 255, 255, 0.8)',
    textAlign: 'center',
  },
  modalContainer: {
    flex: 1,
    backgroundColor: '#0d0f1a',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#374151',
  },
  closeButton: {
    padding: 8,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: 'white',
  },
  placeholder: {
    width: 40,
  },
  modalContent: {
    flex: 1,
    padding: 16,
  },
  analyzingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 60,
  },
  analyzingTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: 'white',
    marginTop: 24,
    marginBottom: 8,
  },
  analyzingDescription: {
    fontSize: 14,
    color: '#9ca3af',
    textAlign: 'center',
    paddingHorizontal: 40,
  },
  analysisResults: {
    flex: 1,
  },
  analysisCard: {
    backgroundColor: '#1a1c2d',
    borderRadius: 16,
    padding: 20,
    borderWidth: 1,
    borderColor: '#374151',
  },
  analysisHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
  },
  analysisTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: 'white',
    marginLeft: 12,
  },
  storageBreakdown: {
    marginBottom: 24,
  },
  breakdownTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: 'white',
    marginBottom: 16,
  },
  storageItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  storageItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  storageIcon: {
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  storageItemName: {
    fontSize: 14,
    color: 'white',
    fontWeight: '500',
  },
  storageItemRight: {
    alignItems: 'flex-end',
    minWidth: 80,
  },
  storageItemSize: {
    fontSize: 14,
    fontWeight: '600',
    color: '#60a5fa',
    marginBottom: 4,
  },
  storageItemBar: {
    width: 60,
    height: 4,
    backgroundColor: '#374151',
    borderRadius: 2,
    overflow: 'hidden',
  },
  storageItemFill: {
    height: '100%',
    borderRadius: 2,
  },
  recommendations: {
    borderTopWidth: 1,
    borderTopColor: '#374151',
    paddingTop: 20,
  },
  recommendationsTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: 'white',
    marginBottom: 16,
  },
  recommendationItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  recommendationText: {
    flex: 1,
    fontSize: 14,
    color: '#d1d5db',
    marginLeft: 12,
    lineHeight: 20,
  },
  // Rating Modal Styles
  ratingModalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  ratingModalContainer: {
    backgroundColor: '#1a1a2e',
    borderRadius: 20,
    padding: 24,
    width: '100%',
    maxWidth: 340,
    borderWidth: 1,
    borderColor: '#374151',
  },
  ratingModalHeader: {
    alignItems: 'center',
    marginBottom: 24,
  },
  ratingStarsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
    gap: 8,
  },
  ratingStarWrapper: {
    shadowColor: '#fbbf24',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.8,
    shadowRadius: 6,
    elevation: 6,
  },
  ratingModalTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: 'white',
    textAlign: 'center',
    marginBottom: 8,
  },
  ratingModalSubtitle: {
    fontSize: 14,
    color: '#9ca3af',
    textAlign: 'center',
    lineHeight: 20,
  },
  ratingModalActions: {
    flexDirection: 'row',
    gap: 8,
  },
  ratingLaterButton: {
    flex: 1,
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
    alignItems: 'center',
  },
  ratingLaterText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#9ca3af',
  },
  ratingNowButton: {
    flex: 1,
    borderRadius: 10,
    overflow: 'hidden',
    shadowColor: '#fbbf24',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 4,
  },
  ratingNowGradient: {
    paddingVertical: 10,
    paddingHorizontal: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  ratingNowContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingNowText: {
    fontSize: 14,
    fontWeight: '600',
    color: 'white',
    marginLeft: 4,
    textShadowColor: 'rgba(0, 0, 0, 0.2)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 1,
  },
});
