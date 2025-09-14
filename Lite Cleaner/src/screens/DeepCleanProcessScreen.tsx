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

interface CleaningStep {
  id: string;
  name: string;
  description: string;
  icon: string;
  color: string;
  completed: boolean;
  size: string;
}

interface DeepCleanProcessScreenProps {
  navigation?: any;
}

export const DeepCleanProcessScreen: React.FC<DeepCleanProcessScreenProps> = ({ navigation }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [progress, setProgress] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  const [cleanedSize, setCleanedSize] = useState('0 MB');
  const [totalSteps] = useState(6);

  const [cleaningSteps, setCleaningSteps] = useState<CleaningStep[]>([
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
      name: 'Duplikat Dosyalar',
      description: 'Duplikat dosyalar tespit ediliyor ve siliniyor...',
      icon: 'copy',
      color: '#45b7d1',
      completed: false,
      size: '1.2 GB'
    },
    {
      id: '4',
      name: 'Büyük Dosyalar',
      description: 'Kullanılmayan büyük dosyalar temizleniyor...',
      icon: 'folder',
      color: '#f9ca24',
      completed: false,
      size: '856 MB'
    },
    {
      id: '5',
      name: 'Eski Yedekler',
      description: 'Eski sistem yedekleri temizleniyor...',
      icon: 'archive',
      color: '#6c5ce7',
      completed: false,
      size: '2.1 GB'
    },
    {
      id: '6',
      name: 'Log Dosyaları',
      description: 'Sistem log kayıtları temizleniyor...',
      icon: 'list',
      color: '#a29bfe',
      completed: false,
      size: '67 MB'
    }
  ]);

  // Animasyon değerleri
  const rotateValue = useSharedValue(0);
  const sweepOpacity = useSharedValue(0);
  const stepProgress = useSharedValue(0);

  useEffect(() => {
    const startAnimations = () => {
      if (!isComplete) {
        // Rotate animasyonu
        rotateValue.value = withRepeat(
          withTiming(360, { duration: 3000, easing: Easing.linear }),
          -1
        );

        // Sweep animasyonu
        sweepOpacity.value = withRepeat(
          withSequence(
            withDelay(200, withTiming(1, { duration: 500 })),
            withTiming(0, { duration: 500 })
          ),
          -1
        );
      } else {
        // İşlem tamamlandığında animasyonları durdur
        rotateValue.value = withTiming(0);
        sweepOpacity.value = withTiming(0);
      }
    };

    // Use setTimeout to ensure animations start after render
    const timer = setTimeout(startAnimations, 0);

    // Temizlik işlemi simülasyonu
    startCleaningProcess();

    return () => clearTimeout(timer);
  }, [isComplete]);

  const startCleaningProcess = () => {
    let stepIndex = 0;
    let currentProgress = 0;
    let totalCleaned = 0;

    const processStep = () => {
      if (stepIndex < totalSteps) {
        setCurrentStep(stepIndex);
        
        // Her adım için 3 saniye
        const stepInterval = setInterval(() => {
          currentProgress += 1.2;
          const stepProgressValue = Math.min(currentProgress, 100);
          
          // Adım progress'ini güncelle
          stepProgress.value = withTiming(stepProgressValue, { duration: 100 });
          
          // Genel progress hesapla - daha yumuşak artış
          const stepProgressPercent = stepProgressValue / 100;
          const overallProgress = ((stepIndex + stepProgressPercent) / totalSteps) * 100;
          setProgress(overallProgress);
          
          if (currentProgress >= 100) {
            clearInterval(stepInterval);
            
            // Adımı tamamlandı olarak işaretle
            const currentStepData = cleaningSteps[stepIndex];
            if (currentStepData && currentStepData.size) {
              const stepSize = parseFloat(currentStepData.size.replace(/[^\d.]/g, ''));
              totalCleaned += stepSize;
              setCleanedSize(`${totalCleaned.toFixed(1)} GB`);
              
              // Adımı tamamlandı olarak işaretle
              setCleaningSteps(prev => prev.map((step, index) => 
                index === stepIndex ? { ...step, completed: true } : step
              ));
            }
            
            stepIndex++;
            currentProgress = 0;
            setTimeout(processStep, 800);
          }
        }, 30);
      } else {
        // Tamamlandı - tüm adımları tamamlandı olarak işaretle
        setCleaningSteps(prev => prev.map(step => ({ ...step, completed: true })));
        setIsComplete(true);
        setProgress(100);
        setCleanedSize('4.6 GB');
      }
    };

    processStep();
  };

  const animatedRotateStyle = useAnimatedStyle(() => ({
    transform: [{ rotate: `${rotateValue.value}deg` }],
  }));

  const animatedSweepStyle = useAnimatedStyle(() => ({
    opacity: sweepOpacity.value,
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
                size={180}
                strokeWidth={8}
                progress={progress}
                color="#8b5cf6"
                backgroundColor="#374151"
              >
                  <View style={styles.progressContent}>
                    {!isComplete ? (
                      <>
                        <Animated.View style={[styles.rotatingIcon, animatedRotateStyle]}>
                          <Ionicons name="brush" size={48} color="#8b5cf6" />
                        </Animated.View>
                        <Text style={styles.progressText}>{Math.round(progress)}%</Text>
                        <Text style={styles.progressSubtext}>Temizleniyor</Text>
                      </>
                    ) : (
                      <>
                        <Ionicons name="checkmark-circle" size={48} color="#34d399" />
                        <Text style={styles.completeText}>Tamamlandı!</Text>
                        <Text style={styles.completeSubtext}>{cleanedSize} temizlendi</Text>
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
                  {cleaningSteps[currentStep]?.name || 'Hazırlanıyor...'}
                </Text>
                <Text style={styles.statusDescription}>
                  {cleaningSteps[currentStep]?.description || 'Sistem hazırlanıyor...'}
                </Text>
                <View style={styles.currentStepInfo}>
                  <Text style={styles.stepCounter}>
                    {currentStep + 1} / {totalSteps}
                  </Text>
                  <Text style={styles.stepSize}>
                    {cleaningSteps[currentStep]?.size || '0 MB'}
                  </Text>
                </View>
              </>
            ) : (
              <>
                <Text style={styles.completeTitle}>Derin Temizlik Tamamlandı!</Text>
                <Text style={styles.completeDescription}>
                  Sisteminiz derinlemesine temizlendi
                </Text>
                <View style={styles.finalStatsContainer}>
                  <View style={styles.finalStatItem}>
                    <Text style={styles.finalStatLabel}>Temizlenen Alan:</Text>
                    <Text style={styles.finalStatValue}>{cleanedSize}</Text>
                  </View>
                  <View style={styles.finalStatItem}>
                    <Text style={styles.finalStatLabel}>İşlem Süresi:</Text>
                    <Text style={styles.finalStatValue}>~18 saniye</Text>
                  </View>
                </View>
              </>
            )}
          </Animated.View>

          {/* Steps List */}
          <Animated.View 
            entering={FadeInUp.delay(800).duration(800)}
            style={styles.stepsContainer}
          >
            {cleaningSteps.map((step, index) => (
              <Animated.View
                key={step.id}
                entering={FadeInUp.delay(1000 + index * 100).duration(600)}
                style={styles.stepItem}
              >
                <View style={styles.stepLeft}>
                  <View style={[
                    styles.stepIcon,
                    { backgroundColor: step.color },
                    (step.completed || index < currentStep) && styles.completedStepIcon,
                    index === currentStep && !step.completed && styles.currentStepIcon
                  ]}>
                    <Ionicons 
                      name={step.icon as any} 
                      size={22} 
                      color="white" 
                    />
                  </View>
                  <View style={styles.stepInfo}>
                    <Text style={[
                      styles.stepName,
                      (step.completed || index < currentStep) && styles.completedStepName,
                      index === currentStep && !step.completed && styles.currentStepName
                    ]}>
                      {step.name}
                    </Text>
                    <Text style={styles.stepDescription}>
                      {step.description}
                    </Text>
                    <Text style={[
                      styles.stepSize,
                      (step.completed || index < currentStep) && styles.completedStepSize
                    ]}>
                      {step.size}
                    </Text>
                  </View>
                </View>
                <View style={styles.stepRight}>
                  {step.completed || index < currentStep ? (
                    <View style={styles.completedStepRight}>
                      <Ionicons name="checkmark-circle" size={24} color="#34d399" />
                      <Text style={styles.completedText}>Tamamlandı</Text>
                    </View>
                  ) : index === currentStep ? (
                    <Animated.View style={[styles.loadingIcon, animatedRotateStyle]}>
                      <Ionicons name="brush" size={24} color="#8b5cf6" />
                    </Animated.View>
                  ) : (
                    <View style={styles.pendingIcon} />
                  )}
                </View>
              </Animated.View>
            ))}
          </Animated.View>

          {/* Cleaning Effects */}
          <Animated.View style={[styles.sweep1, animatedSweepStyle]}>
            <Ionicons name="brush" size={28} color="#8b5cf6" />
          </Animated.View>
          <Animated.View style={[styles.sweep2, animatedSweepStyle]}>
            <Ionicons name="trash" size={24} color="#3b82f6" />
          </Animated.View>
          <Animated.View style={[styles.sweep3, animatedSweepStyle]}>
            <Ionicons name="water" size={26} color="#06b6d4" />
          </Animated.View>
          <Animated.View style={[styles.sweep4, animatedSweepStyle]}>
            <Ionicons name="sparkles" size={22} color="#f9ca24" />
          </Animated.View>
          
          {/* Cleaning Bubbles */}
          <Animated.View style={[styles.bubble1, animatedSweepStyle]}>
            <View style={styles.cleaningBubble} />
          </Animated.View>
          <Animated.View style={[styles.bubble2, animatedSweepStyle]}>
            <View style={styles.cleaningBubble} />
          </Animated.View>
          <Animated.View style={[styles.bubble3, animatedSweepStyle]}>
            <View style={styles.cleaningBubble} />
          </Animated.View>
        </View>
      </ScrollView>

      {/* Complete Button */}
      {isComplete && (
        <Animated.View 
          entering={FadeInUp.delay(300).duration(600)}
          style={styles.buttonContainer}
        >
          <TouchableOpacity style={styles.completeButton} onPress={handleComplete}>
            <LinearGradient
              colors={['#34d399', '#10b981']}
              style={styles.completeButtonGradient}
            >
              <Ionicons name="checkmark-circle" size={24} color="white" />
              <Text style={styles.completeButtonText}>Temizlik Tamamlandı</Text>
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
    paddingBottom: 200, // Buton için daha fazla boşluk
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
    justifyContent: 'center',
    minHeight: height - 200,
  },
  progressContainer: {
    alignItems: 'center',
    marginBottom: 40,
  },
  progressWrapper: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  progressContent: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  rotatingIcon: {
    marginBottom: 8,
  },
  progressText: {
    fontSize: 28,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 4,
  },
  progressSubtext: {
    fontSize: 14,
    color: '#8b5cf6',
    fontWeight: '500',
  },
  completeText: {
    fontSize: 20,
    fontWeight: '600',
    color: '#34d399',
    marginBottom: 4,
  },
  completeSubtext: {
    fontSize: 14,
    color: '#34d399',
    fontWeight: '500',
  },
  statusContainer: {
    alignItems: 'center',
    marginBottom: 40,
  },
  statusTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 8,
    textAlign: 'center',
  },
  statusDescription: {
    fontSize: 16,
    color: '#9ca3af',
    textAlign: 'center',
    marginBottom: 16,
  },
  currentStepInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 20,
  },
  stepCounter: {
    fontSize: 14,
    color: '#8b5cf6',
    fontWeight: '600',
    backgroundColor: 'rgba(139, 92, 246, 0.1)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
  },
  stepSize: {
    fontSize: 14,
    color: '#3b82f6',
    fontWeight: '600',
  },
  completedStepSize: {
    color: '#34d399',
  },
  completeTitle: {
    fontSize: 28,
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
    flexDirection: 'row',
    gap: 20,
  },
  finalStatItem: {
    alignItems: 'center',
  },
  finalStatLabel: {
    fontSize: 12,
    color: '#9ca3af',
    marginBottom: 4,
  },
  finalStatValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#34d399',
  },
  stepsContainer: {
    marginBottom: 40,
  },
  stepItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    padding: 18,
    borderRadius: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  stepLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  stepIcon: {
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  completedStepIcon: {
    backgroundColor: '#34d399',
  },
  currentStepIcon: {
    backgroundColor: '#8b5cf6',
    shadowColor: '#8b5cf6',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.5,
    shadowRadius: 8,
    elevation: 8,
  },
  stepInfo: {
    flex: 1,
  },
  stepName: {
    fontSize: 16,
    fontWeight: '600',
    color: 'white',
    marginBottom: 4,
  },
  completedStepName: {
    color: '#34d399',
  },
  currentStepName: {
    color: '#8b5cf6',
  },
  stepDescription: {
    fontSize: 12,
    color: '#9ca3af',
    marginBottom: 6,
  },
  stepRight: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  completedStepRight: {
    alignItems: 'center',
  },
  completedText: {
    fontSize: 10,
    color: '#34d399',
    fontWeight: '600',
    marginTop: 2,
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
  sweep1: {
    position: 'absolute',
    top: height * 0.15,
    right: 30,
  },
  sweep2: {
    position: 'absolute',
    top: height * 0.3,
    left: 20,
  },
  sweep3: {
    position: 'absolute',
    top: height * 0.5,
    right: 50,
  },
  sweep4: {
    position: 'absolute',
    top: height * 0.7,
    left: 40,
  },
  bubble1: {
    position: 'absolute',
    top: height * 0.25,
    left: 50,
  },
  bubble2: {
    position: 'absolute',
    top: height * 0.45,
    right: 30,
  },
  bubble3: {
    position: 'absolute',
    top: height * 0.65,
    left: 30,
  },
  cleaningBubble: {
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: 'rgba(139, 92, 246, 0.3)',
    borderWidth: 1,
    borderColor: 'rgba(139, 92, 246, 0.5)',
  },
  buttonContainer: {
    paddingHorizontal: 20,
    paddingBottom: 100, // Navigation bar için daha fazla boşluk
    paddingTop: 20,
    backgroundColor: '#0d0f1a',
    borderTopWidth: 1,
    borderTopColor: 'rgba(255, 255, 255, 0.1)',
  },
  completeButton: {
    borderRadius: 16,
    overflow: 'hidden',
  },
  completeButtonGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 18,
    paddingHorizontal: 32,
  },
  completeButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: '600',
    marginLeft: 8,
  },
});
