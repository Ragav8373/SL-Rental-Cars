import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import AppNavigator from './navigation/AppNavigator';

export default function App() {
  return (
    <SafeAreaProvider style={{ flex: 1 }}>
      <AppNavigator />
    </SafeAreaProvider>
  );
}
