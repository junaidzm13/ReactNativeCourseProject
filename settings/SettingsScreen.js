import ContactScreen from './ContactScreen';
import SettingsHome from './SettingsHome';
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();

export default function SettingsScreen() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="SettingsHome"
        component={SettingsHome}
        options={{title: 'Settings'}}
    />
      <Stack.Screen
        name="ContactScreen"
        component={ContactScreen}
        options={{title: 'Contact Us'}}
    />
    </Stack.Navigator>
  );
}




