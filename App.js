import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import ExchangeRatesScreen from './exchange-rate/ExchangeRatesScreen';
import CalculatorScreen from './calculator/CalculatorScreen'
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import SettingsStack from './settings/SettingsScreen';
import {Provider} from 'react-redux';
import store from './redux/store';
import Ionicons from 'react-native-vector-icons/Ionicons';


const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <Provider store={store}>
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen
          name="ExchangeRateScreen"
          component={ExchangeRatesScreen}
          options={
            {
              title: 'Exchange Rates',
              tabBarIcon: ({focused, color, size}) => setTabBarIcon(focused, color, size, 'analytics'),
              tabBarActiveTintColor: 'tomato',
              tabBarInactiveTintColor: 'gray',
            }
          }
          
        />
        <Tab.Screen
          name="CalculatorScreen"
          component={CalculatorScreen}
          options={
            {
              title: 'Calculator',
              tabBarIcon: ({focused, color, size}) => setTabBarIcon(focused, color, size, 'calculator'),
              tabBarActiveTintColor: 'tomato',
              tabBarInactiveTintColor: 'gray',
            }
          }
        />
        <Tab.Screen
          name="SettingsStack"
          component={SettingsStack}
          options={
            {
              title: 'Settings',
              tabBarIcon: ({focused, color, size}) => setTabBarIcon(focused, color, size, 'settings'),
              tabBarActiveTintColor: 'tomato',
              tabBarInactiveTintColor: 'gray',
              headerShown: false
            }
          }
          />
      </Tab.Navigator>
    </NavigationContainer>
    </Provider>
  );
}

function setTabBarIcon(focused, color, size, icon) {
  let iconName = focused?icon:icon+'-outline';
  return <Ionicons name={iconName} size={size} color={color} />;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
