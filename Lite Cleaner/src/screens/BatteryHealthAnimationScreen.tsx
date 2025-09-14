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

interface BatteryStep {
  id: string;
  name: string;
  description: string;
  icon: string;
  color: string;
  progress: number;
  completed: boolean;
  improvement: string;
}

interface BatteryHealthAnimationScreenProps {
  navigation?: any;
}

export const BatteryHealthAnimationScreen: React.FC<BatteryHealthAnimationScreenProps> = ({ navigation }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [overallProgress, setOverallProgress] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  const [batteryHealth, setBatteryHealth] = useState(66);
  const [optimizedHealth, setOptimizedHealth] = useState(66);
  const [estimatedImprovement, setEstimatedImprovement] = useState('0 saat');
  const [batterySteps, setBatterySteps] = useState<BatteryStep[]>([
    {
      id: '1',
      name: 'Arka Plan Uygulamaları',
      description: 'Gereksiz arka plan uygulamaları kapatılıyor...',
      icon: 'apps',
      color: '#06b6d4',
      progress: 0,
      completed: false,
      improvement: '+2 saat'
    },
    {
      id: '2',
      name: 'Pil Kullanımı Analizi',
      description: 'Pil kullanımı analiz ediliyor...',
      icon: 'analytics',
      color: '#3b82f6',
      progress: 0,
      completed: false,
      improvement: '+1.5 saat'
    },
    {
      id: '3',
      name: 'Ekran Parlaklığı',
      description: 'Ekran parlaklığı optimize ediliyor...',
      icon: 'sunny',
      color: '#f59e0b',
      progress: 0,
      completed: false,
      improvement: '+3 saat'
    },
    {
      id: '4',
      name: 'Wi-Fi ve Bluetooth',
      description: 'Kablosuz bağlantılar optimize ediliyor...',
      icon: 'wifi',
      color: '#8b5cf6',
      progress: 0,
      completed: false,
      improvement: '+1 saat'
    },
    {
      id: '5',
      name: 'Sistem Optimizasyonu',
      description: 'Sistem performansı optimize ediliyor...',
      icon: 'settings',
      color: '#10b981',
      progress: 0,
      completed: false,
      improvement: '+2.5 saat'
    }
  ]);


  // Animasyon değerleri
  const rotateValue = useSharedValue(0);
  const energyFlow = useSharedValue(0);

  useEffect(() => {
    const startAnimations = () => {
      // Rotate animasyonu
      rotateValue.value = withRepeat(
        withTiming(360, { duration: 4000, easing: Easing.linear }),
        -1
      );

      // Energy flow animasyonu
      energyFlow.value = withRepeat(
        withTiming(1, { duration: 1500, easing: Easing.inOut(Easing.ease) }),
        -1
      );
    };

    // Use setTimeout to ensure animations start after render
    const timer = setTimeout(startAnimations, 0);

    // Pil optimizasyonu işlemi simülasyonu
    startBatteryOptimization();

    return () => clearTimeout(timer);
  }, []);

  const startBatteryOptimization = () => {
    let stepIndex = 0;
    let currentProgress = 0;
    let totalImprovement = 0;

    const processStep = () => {
      if (stepIndex < 5) { // 5 adım var
        setCurrentStep(stepIndex);
        
        // Her adım için 2.5 saniye
        const stepInterval = setInterval(() => {
          currentProgress += 1.2;
          const stepProgress = Math.min(currentProgress, 100);
          
          // Adım ilerlemesini güncelle
          setBatterySteps(prev => prev.map((step, index) => 
            index === stepIndex ? { ...step, progress: stepProgress } : step
          ));
          
          // Genel ilerleme
          const overall = ((stepIndex * 100) + stepProgress) / 5; // 5 adım var
          setOverallProgress(overall);
          
          // Pil sağlığını artır
          const healthIncrease = (stepProgress / 100) * 2;
          setOptimizedHealth(66 + (stepIndex * 2) + healthIncrease);
          
          if (currentProgress >= 100) {
            clearInterval(stepInterval);
            totalImprovement += parseFloat(batterySteps[stepIndex].improvement.replace('+', '').replace(' saat', ''));
            setEstimatedImprovement(`+${totalImprovement.toFixed(1)} saat`);
            stepIndex++;
            currentProgress = 0;
            setTimeout(processStep, 600);
          }
        }, 25);
      } else {
        // Tamamlandı - tüm adımları tamamlandı olarak işaretle
        setBatterySteps(prev => prev.map(step => ({ ...step, completed: true, progress: 100 })));
        setIsComplete(true);
        setOptimizedHealth(85);
        setEstimatedImprovement('+10 saat');
      }
    };

    processStep();
  };

  const animatedRotateStyle = useAnimatedStyle(() => ({
    transform: [{ rotate: `${rotateValue.value}deg` }],
  }));

  const animatedEnergyFlowStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: energyFlow.value * 100 }],
  }));

  const handleComplete = () => {
    if (navigation) {
      navigation.navigate('Home');
    }
  };

  const handleClose = () => {
    if (navigation) {
      navigation.navigate('Home');
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
        <Text style={styles.headerTitle}>Pil Sağlığı</Text>
        <View style={styles.placeholder} />
      </Animated.View>

      {/* Main Content */}
      <ScrollView 
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.content}>
        {/* Battery Progress Ring */}
        <Animated.View 
          entering={FadeInUp.delay(400).duration(800)}
          style={styles.progressContainer}
        >
          <View style={styles.progressWrapper}>
            <ProgressRing
              size={200}
              strokeWidth={8}
              progress={overallProgress}
              color="#06b6d4"
              backgroundColor="#374151"
            >
              <View style={styles.progressContent}>
                {!isComplete ? (
                  <>
                    <Ionicons name="battery-charging" size={40} color="#06b6d4" style={styles.staticIcon} />
                    <Text style={styles.progressText}>{Math.round(overallProgress)}%</Text>
                  </>
                ) : (
                  <>
                    <Ionicons name="checkmark-circle" size={40} color="#34d399" />
                    <Text style={styles.completeText}>Optimize Edildi!</Text>
                  </>
                )}
              </View>
            </ProgressRing>
          </View>
        </Animated.View>

        {/* Battery Health Display */}
        <Animated.View 
          entering={FadeInUp.delay(600).duration(800)}
          style={styles.batteryHealthContainer}
        >
          <View style={styles.batteryHealthCard}>
            <Text style={styles.batteryHealthTitle}>Pil Sağlığı</Text>
            <View style={styles.batteryHealthRow}>
              <View style={styles.batteryHealthItem}>
                <Text style={styles.batteryHealthLabel}>Önceki:</Text>
                <Text style={styles.batteryHealthValue}>{batteryHealth}%</Text>
              </View>
              <View style={styles.batteryHealthItem}>
                <Text style={styles.batteryHealthLabel}>Şimdi:</Text>
                <Text style={[styles.batteryHealthValue, { color: '#06b6d4' }]}>
                  {Math.round(optimizedHealth)}%
                </Text>
              </View>
            </View>
            <View style={styles.improvementContainer}>
              <Text style={styles.improvementLabel}>Tahmini İyileşme:</Text>
              <Text style={styles.improvementValue}>{estimatedImprovement}</Text>
            </View>
          </View>
        </Animated.View>

        {/* Status Text */}
        <Animated.View 
          entering={FadeInUp.delay(800).duration(800)}
          style={styles.statusContainer}
        >
          {!isComplete ? (
            <>
              <Text style={styles.statusTitle}>
                {batterySteps[currentStep]?.name || 'Hazırlanıyor...'}
              </Text>
              <Text style={styles.statusDescription}>
                {batterySteps[currentStep]?.description || 'Sistem hazırlanıyor...'}
              </Text>
            </>
          ) : (
            <>
              <Text style={styles.completeTitle}>Optimizasyon Tamamlandı!</Text>
              <Text style={styles.completeDescription}>
                Pil ömrünüz başarıyla optimize edildi
              </Text>
            </>
          )}
        </Animated.View>

        {/* Battery Steps */}
        <Animated.View 
          entering={FadeInUp.delay(1000).duration(800)}
          style={styles.stepsContainer}
        >
          {batterySteps.map((step, index) => (
            <Animated.View
              key={step.id}
              entering={FadeInUp.delay(1200 + index * 100).duration(600)}
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
                        { width: `${step.progress}%` }
                      ]} />
                    </View>
                  )}
                </View>
              </View>
              <View style={styles.stepRight}>
                {step.completed || index < currentStep ? (
                  <View style={styles.completedStepRight}>
                    <Ionicons name="checkmark-circle" size={20} color="#34d399" />
                    <Text style={styles.improvementText}>{step.improvement}</Text>
                  </View>
                ) : index === currentStep ? (
                  <View style={styles.loadingIcon}>
                    <Ionicons name="refresh" size={24} color="#06b6d4" />
                  </View>
                ) : (
                  <View style={styles.pendingIcon} />
                )}
              </View>
            </Animated.View>
          ))}
        </Animated.View>

        {/* Battery Optimization Effects */}
        <Animated.View style={[styles.optimizationTool1, animatedEnergyFlowStyle]}>
          <Ionicons name="settings" size={16} color="#06b6d4" />
        </Animated.View>
        <Animated.View style={[styles.optimizationTool2, animatedEnergyFlowStyle]}>
          <Ionicons name="speedometer" size={12} color="#3b82f6" />
        </Animated.View>
        <Animated.View style={[styles.optimizationTool3, animatedEnergyFlowStyle]}>
          <Ionicons name="shield-checkmark" size={14} color="#8b5cf6" />
        </Animated.View>

        {/* Energy Particles */}
        <Animated.View style={[styles.energyParticle1, animatedEnergyFlowStyle]}>
          <View style={styles.energyParticle} />
        </Animated.View>
        <Animated.View style={[styles.energyParticle2, animatedEnergyFlowStyle]}>
          <View style={styles.energyParticle} />
        </Animated.View>
        <Animated.View style={[styles.energyParticle3, animatedEnergyFlowStyle]}>
          <View style={styles.energyParticle} />
        </Animated.View>

        </View>
      </ScrollView>

      {/* Complete Button */}
      {isComplete && (
        <Animated.View 
          entering={FadeInUp.delay(1400).duration(800)}
          style={styles.buttonContainer}
        >
          <TouchableOpacity style={styles.completeButton} onPress={handleComplete}>
            <LinearGradient
              colors={['#06b6d4', '#3b82f6']}
              style={styles.completeButtonGradient}
            >
              <Ionicons name="battery-charging" size={24} color="white" />
              <Text style={styles.completeButtonText}>Optimizasyonu Uygula</Text>
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
    minHeight: height * 0.8,
  },
  progressContainer: {
    alignItems: 'center',
    marginBottom: 20,
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
  batteryHealthContainer: {
    marginBottom: 20,
  },
  batteryHealthCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    padding: 20,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  batteryHealthTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: 'white',
    textAlign: 'center',
    marginBottom: 16,
  },
  batteryHealthRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 16,
  },
  batteryHealthItem: {
    alignItems: 'center',
  },
  batteryHealthLabel: {
    fontSize: 14,
    color: '#9ca3af',
    marginBottom: 4,
  },
  batteryHealthValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
  },
  improvementContainer: {
    alignItems: 'center',
  },
  improvementLabel: {
    fontSize: 14,
    color: '#9ca3af',
    marginBottom: 4,
  },
  improvementValue: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#06b6d4',
  },
  statusContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  statusTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 8,
    textAlign: 'center',
  },
  statusDescription: {
    fontSize: 14,
    color: '#9ca3af',
    textAlign: 'center',
  },
  completeTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 8,
    textAlign: 'center',
  },
  completeDescription: {
    fontSize: 16,
    color: '#9ca3af',
    textAlign: 'center',
  },
  stepsContainer: {
    marginBottom: 20,
  },
  stepItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    padding: 16,
    borderRadius: 12,
    marginBottom: 8,
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
    backgroundColor: '#06b6d4',
    borderRadius: 2,
  },
  stepRight: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  completedStepRight: {
    alignItems: 'center',
  },
  improvementText: {
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
  optimizationTool1: {
    position: 'absolute',
    top: height * 0.2,
    left: 20,
  },
  optimizationTool2: {
    position: 'absolute',
    top: height * 0.4,
    right: 30,
  },
  optimizationTool3: {
    position: 'absolute',
    top: height * 0.6,
    left: 40,
  },
  energyParticle1: {
    position: 'absolute',
    top: height * 0.3,
    right: 50,
  },
  energyParticle2: {
    position: 'absolute',
    top: height * 0.5,
    left: 60,
  },
  energyParticle3: {
    position: 'absolute',
    top: height * 0.7,
    right: 40,
  },
  energyParticle: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: 'rgba(6, 182, 212, 0.4)',
    borderWidth: 1,
    borderColor: 'rgba(6, 182, 212, 0.6)',
  },
  buttonContainer: {
    paddingHorizontal: 20,
    paddingBottom: 100, // Navigation bar için daha fazla boşluk
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
