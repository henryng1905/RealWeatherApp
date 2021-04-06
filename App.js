import * as React from 'react';
import { Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from './src/HomeScreen'
import MaterialCommunityIcons  from './node_modules/react-native-vector-icons/MaterialCommunityIcons';
import AboutUs from './src/AboutUs'


const Tab = createBottomTabNavigator();

function MyTabs() {
  return (
    
    <Tab.Navigator tabBarOptions={{ activeTintColor: '#f3b474',  style:{backgroundColor:'#13133a', padding:10}}}>
      <Tab.Screen name="Weather" component={HomeScreen} options={{tabBarIcon:({ color, size }) => (
            <MaterialCommunityIcons name="weather-partly-snowy-rainy" color={color} size={size} />
          )}} />
          <Tab.Screen name="About Us" component={AboutUs} options={{ tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="information-variant" color={color} size={size} />
          ),}} />
    </Tab.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <MyTabs />
    </NavigationContainer>
  );
}
