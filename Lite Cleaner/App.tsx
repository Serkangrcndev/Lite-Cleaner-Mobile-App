import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { View, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { HomeScreen } from './src/screens/HomeScreen';
import { SettingsScreen } from './src/screens/SettingsScreen';
import { DeepCleanScreen } from './src/screens/DeepCleanScreen';
import DeepCleanSettingsScreen from './src/screens/DeepCleanSettingsScreen';
import { QuickCleanScreen } from './src/screens/QuickCleanScreen';
import { QuickCleanAnimationScreen } from './src/screens/QuickCleanAnimationScreen';
import { DeepCleanAnimationScreen } from './src/screens/DeepCleanAnimationScreen';
import { DeepCleanProcessScreen } from './src/screens/DeepCleanProcessScreen';
import { BatteryHealthAnimationScreen } from './src/screens/BatteryHealthAnimationScreen';
import { TrashCleanAnimationScreen } from './src/screens/TrashCleanAnimationScreen';
import { DownloadsCleanAnimationScreen } from './src/screens/DownloadsCleanAnimationScreen';
import { CacheCleanAnimationScreen } from './src/screens/CacheCleanAnimationScreen';
import { TempFilesCleanAnimationScreen } from './src/screens/TempFilesCleanAnimationScreen';
import { ScanHistoryScreen } from './src/screens/ScanHistoryScreen';
import { CustomNavigationBar } from './src/components/CustomNavigationBar';

const Stack = createStackNavigator();

export default function App() {
  const [activeTab, setActiveTab] = useState<'quick' | 'home' | 'deep'>('home');
  const [currentScreen, setCurrentScreen] = useState<string>('Home');

  const renderCurrentScreen = () => {
    switch (activeTab) {
      case 'quick':
        if (currentScreen === 'QuickCleanAnimation') {
          return <QuickCleanAnimationScreen navigation={{ navigate: (screen: string) => {
            if (screen === 'Home') {
              setActiveTab('home');
              setCurrentScreen('Home');
            }
          }}} />;
        } else if (currentScreen === 'CacheCleanAnimation') {
          return <CacheCleanAnimationScreen navigation={{ navigate: (screen: string) => {
            if (screen === 'Home') {
              setActiveTab('home');
              setCurrentScreen('Home');
            }
          }}} />;
        } else if (currentScreen === 'TempFilesCleanAnimation') {
          return <TempFilesCleanAnimationScreen navigation={{ navigate: (screen: string) => {
            if (screen === 'Home') {
              setActiveTab('home');
              setCurrentScreen('Home');
            }
          }}} />;
        }
        return <QuickCleanScreen navigation={{ navigate: (screen: string) => {
          if (screen === 'QuickCleanAnimation') {
            setCurrentScreen('QuickCleanAnimation');
          } else if (screen === 'CacheCleanAnimation') {
            setCurrentScreen('CacheCleanAnimation');
          } else if (screen === 'TempFilesCleanAnimation') {
            setCurrentScreen('TempFilesCleanAnimation');
          }
        }}} />;
      case 'home':
        return (
          <NavigationContainer independent={true}>
            <Stack.Navigator
              screenOptions={{
                headerShown: false,
                cardStyle: { backgroundColor: '#0d0f1a' },
              }}
            >
              <Stack.Screen name="Home" component={HomeScreen} />
              <Stack.Screen name="Settings" component={SettingsScreen} />
              <Stack.Screen name="QuickCleanAnimation" component={QuickCleanAnimationScreen} />
              <Stack.Screen name="DeepCleanAnimation" component={DeepCleanAnimationScreen} />
              <Stack.Screen name="BatteryHealthAnimation" component={BatteryHealthAnimationScreen} />
              <Stack.Screen name="TrashCleanAnimation" component={TrashCleanAnimationScreen} />
              <Stack.Screen name="DownloadsCleanAnimation" component={DownloadsCleanAnimationScreen} />
              <Stack.Screen name="CacheCleanAnimation" component={CacheCleanAnimationScreen} />
              <Stack.Screen name="TempFilesCleanAnimation" component={TempFilesCleanAnimationScreen} />
            </Stack.Navigator>
          </NavigationContainer>
        );
      case 'deep':
        return (
          <NavigationContainer independent={true}>
            <Stack.Navigator
              screenOptions={{
                headerShown: false,
                cardStyle: { backgroundColor: '#0d0f1a' },
              }}
            >
              <Stack.Screen name="DeepClean" component={DeepCleanScreen} />
              <Stack.Screen name="DeepCleanSettings" component={DeepCleanSettingsScreen} />
              <Stack.Screen name="DeepCleanAnimation" component={DeepCleanAnimationScreen} />
              <Stack.Screen name="DeepCleanProcess" component={DeepCleanProcessScreen} />
              <Stack.Screen name="ScanHistory" component={ScanHistoryScreen} />
            </Stack.Navigator>
          </NavigationContainer>
        );
      default:
        return <HomeScreen />;
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      <SafeAreaView style={styles.safeArea} edges={['top']}>
        {renderCurrentScreen()}
      </SafeAreaView>
      <CustomNavigationBar 
        activeTab={activeTab} 
        onTabPress={setActiveTab} 
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0d0f1a',
  },
  safeArea: {
    flex: 1,
  },
});

