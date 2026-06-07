import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { Text, View } from 'react-native';
import { COLORS } from '../constants/theme';
import HomeScreen from '../screens/HomeScreen';
import SearchScreen from '../screens/SearchScreen';
import ExploreScreen from '../screens/ExploreScreen';
import MovieDetailScreen from '../screens/MovieDetailScreen';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const TabIcon = ({ label, emoji, focused }) => (
  <View style={{ alignItems: 'center' }}>
    <Text style={{ fontSize: 18 }}>{emoji}</Text>
    <Text style={{
      fontSize: 10, color: focused ? COLORS.primary : COLORS.textMuted,
      marginTop: 2, fontWeight: focused ? '700' : '400',
    }}>{label}</Text>
  </View>
);

function HomeTabs() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: COLORS.surface,
          borderTopColor: COLORS.border,
          height: 70, paddingBottom: 10,
        },
        tabBarShowLabel: false,
      }}
    >
      <Tab.Screen
        name="Home" component={HomeScreen}
        options={{ tabBarIcon: ({ focused }) => <TabIcon label="Home" emoji="🎬" focused={focused} /> }}
      />
      <Tab.Screen
        name="Search" component={SearchScreen}
        options={{ tabBarIcon: ({ focused }) => <TabIcon label="Search" emoji="🔍" focused={focused} /> }}
      />
      <Tab.Screen
        name="Explore" component={ExploreScreen}
        options={{ tabBarIcon: ({ focused }) => <TabIcon label="Explore" emoji="🌟" focused={focused} /> }}
      />
    </Tab.Navigator>
  );
}

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Main" component={HomeTabs} />
        <Stack.Screen
          name="MovieDetail"
          component={MovieDetailScreen}
          options={{ presentation: 'card', animationEnabled: true }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}