import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { Image } from 'react-native'; // Import Image component

import HomeScreen from '../screens/HomeScreen';
import CarDetailsScreen from '../screens/CarDetailsScreen';
import CustomerDetailsScreen from '../screens/CustomerDetailsScreen';
import TripDetailsScreen from '../screens/TripDetailsScreen';
import ReportDetailsScreen from '../screens/ReportDetailsScreen';

const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();

function HomeStack() {
  return (
    <Stack.Navigator 
      screenOptions={{ 
        headerShown: false,
        cardStyle: { backgroundColor: '#0F0F0F', paddingTop: 20 }
      }}
    >
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="CarDetails" component={CarDetailsScreen} />
      <Stack.Screen name="CustomerDetails" component={CustomerDetailsScreen} />
      <Stack.Screen name="TripDetails" component={TripDetailsScreen} />
      <Stack.Screen name="ReportDetails" component={ReportDetailsScreen} />
    </Stack.Navigator>
  );
}

function CarDetailsStack() {
  return (
    <Stack.Navigator screenOptions={{ 
      headerShown: false,
      cardStyle: { backgroundColor: '#0F0F0F' }
    }}>
      <Stack.Screen name="CarDetailsMain" component={CarDetailsScreen} />
    </Stack.Navigator>
  );
}

function CustomerDetailsStack() {
  return (
    <Stack.Navigator screenOptions={{ 
      headerShown: false,
      cardStyle: { backgroundColor: '#0F0F0F' }
    }}>
      <Stack.Screen name="CustomerDetailsMain" component={CustomerDetailsScreen} />
    </Stack.Navigator>
  );
}

function TripDetailsStack() {
  return (
    <Stack.Navigator screenOptions={{ 
      headerShown: false,
      cardStyle: { backgroundColor: '#0F0F0F' }
    }}>
      <Stack.Screen name="TripDetailsMain" component={TripDetailsScreen} />
    </Stack.Navigator>
  );
}

function ReportDetailsStack() {
  return (
    <Stack.Navigator screenOptions={{ 
      headerShown: false,
      cardStyle: { backgroundColor: '#0F0F0F' }
    }}>
      <Stack.Screen name="ReportDetailsMain" component={ReportDetailsScreen} />
    </Stack.Navigator>
  );
}

// Logo component for the header
const HeaderLogo = () => (
  <Image
    source={require('../assets/logo.jpg')} // Update with your logo path
    style={{
      width: 50,
      height: 50,
      marginRight: 20,
      // resizeMode: 'contain',
      borderRadius:20,
    }}
  />
);

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Drawer.Navigator
        initialRouteName="HomeStack"
        screenOptions={{
          drawerPosition: 'left',
          drawerActiveTintColor: '#FFD700',
          drawerInactiveTintColor: '#999',
          drawerLabelStyle: { 
            marginLeft: 0,
            fontSize: 16,
            fontWeight: '500',
            paddingLeft: 10,
          },
          drawerStyle: {
            backgroundColor: '#0F0F0F',
            width: 280,
          },
          drawerItemStyle: {
            borderRadius: 8,
            marginHorizontal: 10,
            marginVertical: 4,
            paddingLeft: 10,
          },
          drawerActiveBackgroundColor: '#1A1A1A',
          headerStyle: {
            backgroundColor: '#000',
          },
          headerTintColor: '#FFD700',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
          // Add logo to the right side of the header
          headerRight: () => <HeaderLogo />,
        }}
      >
        <Drawer.Screen
          name="HomeStack"
          component={HomeStack}
          options={{
            drawerLabel: 'Home',
            drawerIcon: ({ color }) => (
              <Ionicons name="home" size={20} color={color} style={{ marginRight: 0 }} />
            ),
            headerTitle: 'Menu',
          }}
        />
        <Drawer.Screen
          name="CarDetailsStack"
          component={CarDetailsStack}
          options={{
            drawerLabel: 'Car Details',
            drawerIcon: ({ color }) => (
              <Ionicons name="car" size={22} color={color} style={{ marginRight: 0 }} />
            ),
            headerTitle: 'Car Details',
          }}
        />
        <Drawer.Screen
          name="CustomerDetailsStack"
          component={CustomerDetailsStack}
          options={{
            drawerLabel: 'Customer Details',
            drawerIcon: ({ color }) => (
              <Ionicons name="people" size={22} color={color} style={{ marginRight: 0 }} />
            ),
            headerTitle: 'Customer Details',
          }}
        />
        <Drawer.Screen
          name="TripDetailsStack"
          component={TripDetailsStack}
          options={{
            drawerLabel: 'Trip Details',
            drawerIcon: ({ color }) => (
              <Ionicons name="map" size={22} color={color} style={{ marginRight: 0 }} />
            ),
            headerTitle: 'Trip Details',
          }}
        />
        <Drawer.Screen
          name="ReportDetailsStack"
          component={ReportDetailsStack}
          options={{
            drawerLabel: 'Report Details',
            drawerIcon: ({ color }) => (
              <Ionicons name="document-text" size={22} color={color} style={{ marginRight: 0 }} />
            ),
            headerTitle: 'Report Details',
          }}
        />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}