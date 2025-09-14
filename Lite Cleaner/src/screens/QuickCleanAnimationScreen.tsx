import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  Dimensions,
  StatusBar,
  ScrollView
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

interface CleanupStep {
  id: string;
  name: string;
  description: string;
  icon: string;
  color: string;
  completed: boolean;
  size: string;
}

interface QuickCleanAnimationScreenProps {
  navigation?: any;
}

export const QuickCleanAnimationScreen: React.FC<QuickCleanAnimationScreenProps> = ({ navigation }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [progress, setProgress] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  const [cleanedSize, setCleanedSize] = useState('0 MB');
  const [totalSteps] = useState(4);

  const cleanupSteps: CleanupStep[] = [
    {
      id: '1',
      name: 'Önbellek Temizliği',
      description: 'Uygulama önbellek verileri temizleniyor...',
      icon: 'trash',
      color: '#ff6b6b',
      completed: false,
      size: '245 MB'
    },
    {
      id: '2',
      name: 'Geçici Dosyalar',
      description: 'Sistem geçici dosyaları siliniyor...',
      icon: 'document',
      color: '#4ecdc4',
      completed: false, 
      size: '128 MB'
    },
    {
      id: '3',
      name: 'Çöp Kutusu',
      description: 'Çöp kutusundaki dosyalar temizleniyor...',
      icon: 'trash-bin',
      color: '#f093fb',
      completed: false,
      size: '89 MB'
    },
    {
      id: '4',
      name: 'İndirilenler',
      description: 'Gereksiz indirilen dosyalar siliniyor...',
      icon: 'download',
      color: '#4facfe',
      completed: false,
      size: '156 MB'
    }
  ];

  // Animasyon değerleri
  const pulseScale = useSharedValue(1);
  const rotateValue = useSharedValue(0);
  const sparkleOpacity = useSharedValue(0);
  const stepProgress = useSharedValue(0);

  useEffect(() => {
    const startAnimations = () => {
      // Pulse animasyonu
      pulseScale.value = withRepeat(
        withSequence(
          withTiming(1.15, { duration: 1000, easing: Easing.inOut(Easing.ease) }),
          withTiming(1, { duration: 1000, easing: Easing.inOut(Easing.ease) })
        ),
        -1
      );

      // Sparkle animasyonu
      sparkleOpacity.value = withRepeat(
        withSequence(
          withTiming(1, { duration: 800, easing: Easing.out(Easing.quad) }),
          withTiming(0, { duration: 800, easing: Easing.in(Easing.quad) })
        ),
        -1
      );
    };

    // Use setTimeout to ensure animations start after render
    const timer = setTimeout(startAnimations, 0);

    // Adım adım temizlik animasyonu
    const cleanupTimer = setTimeout(() => {
      const stepInterval = setInterval(() => {
        setCurrentStep(prev => {
          if (prev >= totalSteps - 1) {
            clearInterval(stepInterval);
            setIsComplete(true);
            setCleanedSize('618 MB');
            
            // 3 saniye sonra ana sayfaya dön
            setTimeout(() => {
              navigation?.navigate('Home');
            }, 3000);

            return totalSteps - 1;
          }
          return prev + 1;
        });
      }, 1500);

      // Progress animasyonu
      const progressInterval = setInterval(() => {
        setProgress(prev => {
          if (prev >= 100) {
            clearInterval(progressInterval);
            return 100;
          }
          return prev + 1;
        });
      }, 60);

    }, 1000);

    return () => {
      clearTimeout(timer);
      clearTimeout(cleanupTimer);
    };
  }, []);

  const pulseAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: pulseScale.value }]
  }));

  const sparkleAnimatedStyle = useAnimatedStyle(() => ({
    opacity: sparkleOpacity.value
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
          <Text style={styles.headerTitle}>Hızlı Temizlik</Text>
          <View style={styles.placeholder} />
        </Animated.View>

        {/* Ana İçerik */}
        <ScrollView 
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {/* Progress Ring */}
          <Animated.View 
            entering={FadeInUp.delay(200).duration(800)}
            style={styles.progressContainer}
          >
            <Animated.View style={pulseAnimatedStyle}>
              <ProgressRing
                size={120}
                strokeWidth={6}
                progress={progress}
                color="#60a5fa"
                backgroundColor="#374151"
              >
                <Text style={styles.progressText}>{progress}%</Text>
              </ProgressRing>
            </Animated.View>
          </Animated.View>

          {/* Temizlik Adımları */}
          <Animated.View 
            entering={FadeInUp.delay(300).duration(800)}
            style={styles.stepsContainer}
          >
            <Text style={styles.stepsTitle}>Temizlik Adımları</Text>
            
            {cleanupSteps.map((step, index) => (
              <Animated.View
                key={step.id}
                entering={FadeInUp.delay(400 + index * 100).duration(600)}
                style={[
                  styles.stepItem,
                  index <= currentStep && styles.stepItemActive
                ]}
              >
                <View style={styles.stepIconContainer}>
                  <Ionicons 
                    name={step.icon as any} 
                    size={24} 
                    color={index <= currentStep ? step.color : '#6b7280'} 
                  />
                </View>
                
                <View style={styles.stepContent}>
                  <Text style={[
                    styles.stepName,
                    index <= currentStep && styles.stepNameActive
                  ]}>
                    {step.name}
                  </Text>
                  <Text style={styles.stepDescription}>
                    {step.description}
                  </Text>
                  <Text style={styles.stepSize}>{step.size}</Text>
                </View>
                
                {index <= currentStep && (
                  <Animated.View style={sparkleAnimatedStyle}>
                    <Ionicons name="checkmark-circle" size={24} color={step.color} />
                  </Animated.View>
                )}
              </Animated.View>
            ))}
          </Animated.View>

          {/* Sonuç */}
          {isComplete && (
            <Animated.View 
              entering={FadeInUp.delay(500).duration(600)}
              style={styles.resultContainer}
            >
              <LinearGradient
                colors={['rgba(16, 185, 129, 0.1)', 'rgba(5, 150, 105, 0.05)']}
                style={styles.resultGradient}
              >
                <View style={styles.resultHeader}>
                  <Ionicons name="trophy" size={28} color="#10b981" />
                  <Text style={styles.resultTitle}>Temizlik Tamamlandı!</Text>
                </View>
                <Text style={styles.resultText}>{cleanedSize} alan kazanıldı</Text>
                <View style={styles.resultStats}>
                  <View style={styles.statItem}>
                    <Text style={styles.statNumber}>4</Text>
                    <Text style={styles.statLabel}>Kategori Temizlendi</Text>
                  </View>
                  <View style={styles.statItem}>
                    <Text style={styles.statNumber}>618</Text>
                    <Text style={styles.statLabel}>MB Alan Kazanıldı</Text>
                  </View>
                </View>
              </LinearGradient>
            </Animated.View>
          )}
        </ScrollView>
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
  scrollContent: {
    padding: 20,
    paddingBottom: 120,
  },
  progressContainer: {
    alignItems: 'center',
    marginBottom: 40,
  },
  progressText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
  },
  stepsContainer: {
    marginBottom: 30,
  },
  stepsTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: 'white',
    marginBottom: 20,
    textAlign: 'center',
  },
  stepItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(55, 65, 81, 0.3)',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: 'rgba(55, 65, 81, 0.5)',
  },
  stepItemActive: {
    backgroundColor: 'rgba(59, 130, 246, 0.1)',
    borderColor: 'rgba(59, 130, 246, 0.3)',
  },
  stepIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: 'rgba(55, 65, 81, 0.5)',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  stepContent: {
    flex: 1,
  },
  stepName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#9ca3af',
    marginBottom: 4,
  },
  stepNameActive: {
    color: 'white',
  },
  stepDescription: {
    fontSize: 14,
    color: '#6b7280',
    marginBottom: 4,
  },
  stepSize: {
    fontSize: 12,
    color: '#60a5fa',
    fontWeight: '600',
  },
  resultContainer: {
    marginTop: 20,
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
