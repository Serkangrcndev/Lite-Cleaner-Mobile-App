import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import DashboardScreen from './src/screens/DashboardScreen';
import QuickCleanScreen from './src/screens/QuickCleanScreen';
import DeepCleanScreen from './src/screens/DeepCleanScreen';
import CleaningAnimationScreen from './src/screens/CleaningAnimationScreen';
import Header from './src/components/Header';
import { View } from 'react-native';

type CleaningType = 'quick-clean' | 'deep-clean';

export default function App() {
  const [activeTab, setActiveTab] = React.useState('home');
  const [showAnimation, setShowAnimation] = React.useState(false);
  const [animationType, setAnimationType] = React.useState<CleaningType>('quick-clean');

  const handleNavigateToAnimation = (type: CleaningType) => {
    setAnimationType(type);
    setShowAnimation(true);
  };

  const handleAnimationComplete = () => {
    setShowAnimation(false);
    // Temizlik tamamlandıktan sonra Dashboard'a dön
    setActiveTab('home');
  };

  if (showAnimation) {
    return (
      <SafeAreaProvider>
        <StatusBar style="light" />
        <CleaningAnimationScreen
          cleaningType={animationType}
          onComplete={handleAnimationComplete}
        />
      </SafeAreaProvider>
    );
  }

  const renderScreen = () => {
    switch (activeTab) {
      case 'home':
        return (
          <DashboardScreen 
            activeTab={activeTab} 
            onTabPress={setActiveTab}
            onNavigateToAnimation={handleNavigateToAnimation}
          />
        );
      case 'quick-clean':
        return <QuickCleanScreen activeTab={activeTab} onTabPress={setActiveTab} />;
      case 'deep-clean':
        return <DeepCleanScreen activeTab={activeTab} onTabPress={setActiveTab} />;
      default:
        return (
          <DashboardScreen 
            activeTab={activeTab} 
            onTabPress={setActiveTab}
            onNavigateToAnimation={handleNavigateToAnimation}
          />
        );
    }
  };

  return (
    <SafeAreaProvider>
      <StatusBar style="light" />
      <View style={{ flex: 1, backgroundColor: '#050B18' }}>
        {renderScreen()}
        <Header activeTab={activeTab} onTabPress={setActiveTab} />
      </View>
    </SafeAreaProvider>
  );
}
