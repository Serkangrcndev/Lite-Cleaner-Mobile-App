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
  Easing
} from 'react-native-reanimated';

const { width, height } = Dimensions.get('window');

interface ScanStep {
  id: string;
  name: string;
  description: string;
  icon: string;
  color: string;
  progress: number;
  completed: boolean;
}

interface DeepCleanAnimationScreenProps {
  navigation?: any;
}

export const DeepCleanAnimationScreen: React.FC<DeepCleanAnimationScreenProps> = ({ navigation }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [overallProgress, setOverallProgress] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  const [scannedSize, setScannedSize] = useState('0 MB');
  const [foundItems, setFoundItems] = useState(0);
  const [scanSteps, setScanSteps] = useState<ScanStep[]>([
    {
      id: '1',
      name: 'Sistem Analizi',
      description: 'Sistem dosyaları analiz ediliyor...',
      icon: 'analytics',
      color: '#8b5cf6',
      progress: 0,
      completed: false
    },
    {
      id: '2',
      name: 'Önbellek Tarama',
      description: 'Önbellek dosyaları taranıyor...',
      icon: 'search',
      color: '#3b82f6',
      progress: 0,
      completed: false
    },
    {
      id: '3',
      name: 'Duplikat Tespit',
      description: 'Duplikat dosyalar tespit ediliyor...',
      icon: 'copy',
      color: '#06b6d4',
      progress: 0,
      completed: false
    },
    {
      id: '4',
      name: 'Büyük Dosya Analizi',
      description: 'Büyük dosyalar analiz ediliyor...',
      icon: 'folder',
      color: '#f59e0b',
      progress: 0,
      completed: false
    },
    {
      id: '5',
      name: 'Güvenlik Kontrolü',
      description: 'Güvenlik taraması yapılıyor...',
      icon: 'shield-checkmark',
      color: '#10b981',
      progress: 0,
      completed: false
    }
  ]);

  // Animasyon değerleri
  const rotateValue = useSharedValue(0);
  const waveOpacity = useSharedValue(0);
  const scanLinePosition = useSharedValue(0);

  useEffect(() => {
    const startAnimations = () => {
      // Rotate animasyonu
      rotateValue.value = withRepeat(
        withTiming(360, { duration: 3000, easing: Easing.linear }),
        -1
      );

      // Wave animasyonu
      waveOpacity.value = withRepeat(
        withSequence(
          withTiming(1, { duration: 800 }),
          withTiming(0, { duration: 800 })
        ),
        -1
      );

      // Scan line animasyonu
      scanLinePosition.value = withRepeat(
        withTiming(1, { duration: 2000, easing: Easing.inOut(Easing.ease) }),
        -1
      );
    };

    // Use setTimeout to ensure animations start after render
    const timer = setTimeout(startAnimations, 0);

    // Tarama işlemi simülasyonu
    startScanProcess();

    return () => clearTimeout(timer);
  }, []);

  const startScanProcess = () => {
    let stepIndex = 0;
    let currentProgress = 0;

    const processStep = () => {
      if (stepIndex < 5) { // 5 adım var
        setCurrentStep(stepIndex);
        
        // Her adım için 3 saniye
        const stepInterval = setInterval(() => {
          currentProgress += 1.5;
          const stepProgress = Math.min(currentProgress, 100);
          
          // Genel ilerleme
          const overall = ((stepIndex * 100) + stepProgress) / 5; // 5 adım var
          setOverallProgress(overall);
          
          if (currentProgress >= 100) {
            clearInterval(stepInterval);
            stepIndex++;
            currentProgress = 0;
            setFoundItems(prev => prev + Math.floor(Math.random() * 50) + 20);
            setTimeout(processStep, 800);
          }
        }, 30);
      } else {
         // Tamamlandı - tüm adımları tamamlandı olarak işaretle
         setScanSteps(prev => prev.map(step => ({ ...step, completed: true, progress: 100 })));
         setCurrentStep(4); // Son adımı da tamamlandı olarak işaretle
         setIsComplete(true);
         setScannedSize('2.4 GB');
         setFoundItems(247);
      }
    };

    processStep();
  };


  const animatedRotateStyle = useAnimatedStyle(() => ({
    transform: [{ rotate: `${rotateValue.value}deg` }],
  }));

  const animatedWaveStyle = useAnimatedStyle(() => ({
    opacity: waveOpacity.value,
  }));

  const animatedScanLineStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: scanLinePosition.value * 200 }],
  }));

  const handleComplete = () => {
    if (navigation) {
      navigation.navigate('DeepClean');
    }
  };

  const handleClose = () => {
    if (navigation) {
      navigation.navigate('DeepClean');
    }
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <StatusBar barStyle="light-content" backgroundColor="#0d0f1a" />
      
      {/* Background Gradient */}
      <LinearGradient
        colors={['#0d0f1a', '#1a1c2d', '#0d0f1a']}
        style={styles.backgroundGradient}
      />

      {/* Header */}
      <Animated.View 
        entering={FadeInDown.delay(200).duration(800)}
        style={styles.header}
      >
        <TouchableOpacity style={styles.backButton} onPress={handleClose}>
          <Ionicons name="close" size={24} color="white" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Derin Temizlik</Text>
        <View style={styles.placeholder} />
      </Animated.View>

      {/* Main Content */}
      <ScrollView 
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.content}>
        {/* Progress Ring */}
        <Animated.View 
          entering={FadeInUp.delay(400).duration(800)}
          style={styles.progressContainer}
        >
          <View style={styles.progressWrapper}>
            <ProgressRing
              size={160}
              strokeWidth={6}
              progress={overallProgress}
              color="#8b5cf6"
              backgroundColor="#374151"
            >
              <View style={styles.progressContent}>
                {!isComplete ? (
                  <>
                    <Ionicons name="brush" size={40} color="#8b5cf6" style={styles.staticIcon} />
                    <Text style={styles.progressText}>{Math.round(overallProgress)}%</Text>
                  </>
                ) : (
                  <>
                    <Ionicons name="checkmark-circle" size={40} color="#34d399" />
                    <Text style={styles.completeText}>Tamamlandı!</Text>
                  </>
                )}
              </View>
            </ProgressRing>
          </View>
        </Animated.View>

        {/* Status Text */}
        <Animated.View 
          entering={FadeInUp.delay(600).duration(800)}
          style={styles.statusContainer}
        >
          {!isComplete ? (
            <>
              <Text style={styles.statusTitle}>
                {scanSteps[currentStep]?.name || 'Hazırlanıyor...'}
              </Text>
              <Text style={styles.statusDescription}>
                {scanSteps[currentStep]?.description || 'Sistem hazırlanıyor...'}
              </Text>
              <View style={styles.statsContainer}>
                <View style={styles.statItem}>
                  <Text style={styles.statLabel}>Bulunan Öğe:</Text>
                  <Text style={styles.statValue}>{foundItems}</Text>
                </View>
                <View style={styles.statItem}>
                  <Text style={styles.statLabel}>Taranan Alan:</Text>
                  <Text style={styles.statValue}>{scannedSize}</Text>
                </View>
              </View>
            </>
          ) : (
            <>
              <Text style={styles.completeTitle}>Tarama Tamamlandı!</Text>
              <Text style={styles.completeDescription}>
                Sistem derinlemesine tarandı
              </Text>
              <View style={styles.finalStatsContainer}>
                <View style={styles.finalStatItem}>
                  <Text style={styles.finalStatLabel}>Toplam Bulunan:</Text>
                  <Text style={styles.finalStatValue}>{foundItems} öğe</Text>
                </View>
                <View style={styles.finalStatItem}>
                  <Text style={styles.finalStatLabel}>Temizlenebilir Alan:</Text>
                  <Text style={styles.finalStatValue}>{scannedSize}</Text>
                </View>
              </View>
            </>
          )}
        </Animated.View>

        {/* Scan Steps */}
        <Animated.View 
          entering={FadeInUp.delay(800).duration(800)}
          style={styles.stepsContainer}
        >
          {scanSteps.map((step, index) => (
            <Animated.View
              key={step.id}
              entering={FadeInUp.delay(1000 + index * 100).duration(600)}
              style={styles.stepItem}
            >
              <View style={styles.stepLeft}>
                <View style={[
                  styles.stepIcon,
                  { backgroundColor: step.color },
                  (step.completed || index < currentStep) && styles.completedStepIcon
                ]}>
                  <Ionicons 
                    name={step.icon as any} 
                    size={20} 
                    color="white" 
                  />
                </View>
                <View style={styles.stepInfo}>
                  <Text style={[
                    styles.stepName,
                    (step.completed || index < currentStep) && styles.completedStepName
                  ]}>
                    {step.name}
                  </Text>
                  <Text style={styles.stepDescription}>
                    {step.description}
                  </Text>
                  {index === currentStep && !step.completed && (
                    <View style={styles.stepProgressBar}>
                      <View style={[
                        styles.stepProgressFill,
                        { width: `${Math.min(overallProgress * 5 - (index * 100), 100)}%` }
                      ]} />
                    </View>
                  )}
                </View>
              </View>
              <View style={styles.stepRight}>
                {step.completed || index < currentStep ? (
                  <Ionicons name="checkmark-circle" size={24} color="#34d399" />
                ) : index === currentStep ? (
                  <View style={styles.loadingIcon}>
                    <Ionicons name="refresh" size={24} color="#8b5cf6" />
                  </View>
                ) : (
                  <View style={styles.pendingIcon} />
                )}
              </View>
            </Animated.View>
          ))}
        </Animated.View>

        {/* Cleaning Tools Effects */}
        <Animated.View style={[styles.cleaningTool1, animatedWaveStyle]}>
          <Ionicons name="brush" size={28} color="#8b5cf6" />
        </Animated.View>
        <Animated.View style={[styles.cleaningTool2, animatedWaveStyle]}>
          <Ionicons name="trash" size={24} color="#3b82f6" />
        </Animated.View>
        <Animated.View style={[styles.cleaningTool3, animatedWaveStyle]}>
          <Ionicons name="water" size={26} color="#06b6d4" />
        </Animated.View>

        {/* Cleaning Particles */}
        <Animated.View style={[styles.particle1, animatedWaveStyle]}>
          <View style={styles.cleaningParticle} />
        </Animated.View>
        <Animated.View style={[styles.particle2, animatedWaveStyle]}>
          <View style={styles.cleaningParticle} />
        </Animated.View>
        <Animated.View style={[styles.particle3, animatedWaveStyle]}>
          <View style={styles.cleaningParticle} />
        </Animated.View>

        {/* Scan Line */}
        <Animated.View style={[styles.scanLine, animatedScanLineStyle]} />
        </View>
      </ScrollView>

      {/* Complete Button */}
      {isComplete && (
        <Animated.View 
          entering={FadeInUp.delay(1200).duration(800)}
          style={styles.buttonContainer}
        >
          <TouchableOpacity style={styles.completeButton} onPress={handleComplete}>
            <LinearGradient
              colors={['#8b5cf6', '#3b82f6']}
              style={styles.completeButtonGradient}
            >
              <Ionicons name="arrow-forward" size={24} color="white" />
              <Text style={styles.completeButtonText}>Temizliği Başlat</Text>
            </LinearGradient>
          </TouchableOpacity>
        </Animated.View>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0d0f1a',
  },
  backgroundGradient: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
    zIndex: 10,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    alignItems: 'center',
    justifyContent: 'center',
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
    flexGrow: 1,
    paddingBottom: 120, // Navigation bar için daha fazla boşluk
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
    justifyContent: 'center',
    minHeight: height - 200,
  },
  progressContainer: {
    alignItems: 'center',
    marginBottom: 30,
  },
  progressWrapper: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  progressContent: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  staticIcon: {
    marginBottom: 8,
  },
  progressText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
  },
  completeText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#34d399',
  },
  statusContainer: {
    alignItems: 'center',
    marginBottom: 30,
  },
  statusTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 8,
    textAlign: 'center',
  },
  statusDescription: {
    fontSize: 14,
    color: '#9ca3af',
    textAlign: 'center',
    marginBottom: 16,
  },
  statsContainer: {
    flexDirection: 'row',
    gap: 20,
  },
  statItem: {
    alignItems: 'center',
  },
  statLabel: {
    fontSize: 12,
    color: '#9ca3af',
    marginBottom: 4,
  },
  statValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#8b5cf6',
  },
  completeTitle: {
    fontSize: 26,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 8,
    textAlign: 'center',
  },
  completeDescription: {
    fontSize: 16,
    color: '#9ca3af',
    textAlign: 'center',
    marginBottom: 20,
  },
  finalStatsContainer: {
    gap: 12,
  },
  finalStatItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  finalStatLabel: {
    fontSize: 16,
    color: '#9ca3af',
    marginRight: 8,
  },
  finalStatValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#34d399',
  },
  stepsContainer: {
    marginBottom: 30,
  },
  stepItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    padding: 16,
    borderRadius: 12,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  stepLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  stepIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  completedStepIcon: {
    backgroundColor: '#34d399',
  },
  stepInfo: {
    flex: 1,
  },
  stepName: {
    fontSize: 14,
    fontWeight: '600',
    color: 'white',
    marginBottom: 4,
  },
  completedStepName: {
    color: '#34d399',
  },
  stepDescription: {
    fontSize: 11,
    color: '#9ca3af',
    marginBottom: 6,
  },
  stepProgressBar: {
    height: 3,
    backgroundColor: '#374151',
    borderRadius: 2,
    overflow: 'hidden',
  },
  stepProgressFill: {
    height: '100%',
    backgroundColor: '#8b5cf6',
    borderRadius: 2,
  },
  stepRight: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  loadingIcon: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  pendingIcon: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#374151',
  },
  cleaningTool1: {
    position: 'absolute',
    top: height * 0.15,
    right: 20,
  },
  cleaningTool2: {
    position: 'absolute',
    top: height * 0.35,
    left: 30,
  },
  cleaningTool3: {
    position: 'absolute',
    top: height * 0.55,
    right: 40,
  },
  particle1: {
    position: 'absolute',
    top: height * 0.25,
    left: 50,
  },
  particle2: {
    position: 'absolute',
    top: height * 0.45,
    right: 60,
  },
  particle3: {
    position: 'absolute',
    top: height * 0.65,
    left: 40,
  },
  cleaningParticle: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: 'rgba(139, 92, 246, 0.4)',
    borderWidth: 1,
    borderColor: 'rgba(139, 92, 246, 0.6)',
  },
  scanLine: {
    position: 'absolute',
    left: 0,
    right: 0,
    height: 2,
    backgroundColor: '#8b5cf6',
    opacity: 0.6,
  },
  buttonContainer: {
    paddingHorizontal: 20,
    paddingBottom: 120, // Navigation bar için daha fazla boşluk
    paddingTop: 20,
  },
  completeButton: {
    borderRadius: 16,
    overflow: 'hidden',
  },
  completeButtonGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    paddingHorizontal: 32,
  },
  completeButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: '600',
    marginLeft: 8,
  },
});