import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Text, View } from 'react-native';

// Screens
import LoginScreen from './screens/LoginScreen';
import Dashboard from './screens/Dashboard';
import RouteMap from './screens/RouteMap';
import JobDetails from './screens/JobDetails';
import JobList from './screens/JobList';
import ChatScreen from './screens/ChatScreen';
import DocumentsScreen from './screens/DocumentsScreen';
import SettingsScreen from './screens/SettingsScreen';

// Auth Context
import { AuthProvider, useAuth } from './context/AuthContext';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

// Tab Navigator for authenticated users
function MainTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconText;
          if (route.name === 'Home') iconText = '🏠';
          else if (route.name === 'Map') iconText = '📍';
          else if (route.name === 'Jobs') iconText = '📋';
          else if (route.name === 'Chat') iconText = '💬';
          else if (route.name === 'Settings') iconText = '⚙️';
          
          return <Text style={{ fontSize: size }}>{iconText}</Text>;
        },
        tabBarActiveTintColor: '#16A34A',
        tabBarInactiveTintColor: 'gray',
        headerStyle: {
          backgroundColor: '#16A34A',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      })}
    >
      <Tab.Screen name="Home" component={Dashboard} options={{ title: 'Dashboard' }} />
      <Tab.Screen name="Map" component={RouteMap} options={{ title: 'Route Map' }} />
      <Tab.Screen name="Jobs" component={JobList} options={{ title: 'My Jobs' }} />
      <Tab.Screen name="Chat" component={ChatScreen} options={{ title: 'Dispatch' }} />
      <Tab.Screen name="Settings" component={SettingsScreen} options={{ title: 'Settings' }} />
    </Tab.Navigator>
  );
}

// Main navigation
function AppNavigator() {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#16A34A' }}>
        <Text style={{ color: 'white', fontSize: 24 }}>🚛</Text>
        <Text style={{ color: 'white', marginTop: 10 }}>Loading...</Text>
      </View>
    );
  }

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {!isAuthenticated ? (
        <Stack.Screen name="Login" component={LoginScreen} />
      ) : (
        <>
          <Stack.Screen name="Main" component={MainTabs} />
          <Stack.Screen 
            name="JobDetails" 
            component={JobDetails} 
            options={{ 
              headerShown: true,
              title: 'Load Details',
              headerStyle: { backgroundColor: '#16A34A' },
              headerTintColor: '#fff',
            }}
          />
          <Stack.Screen 
            name="Documents" 
            component={DocumentsScreen}
            options={{ 
              headerShown: true,
              title: 'Documents',
              headerStyle: { backgroundColor: '#16A34A' },
              headerTintColor: '#fff',
            }}
          />
        </>
      )}
    </Stack.Navigator>
  );
}

export default function App() {
  return (
    <SafeAreaProvider>
      <AuthProvider>
        <NavigationContainer>
          <StatusBar style="light" />
          <AppNavigator />
        </NavigationContainer>
      </AuthProvider>
    </SafeAreaProvider>
  );
}
