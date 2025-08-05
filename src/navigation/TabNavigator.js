import {
  View,
} from 'react-native';
import IcoIcon from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/FontAwesome';
import FIcon from 'react-native-vector-icons/Feather';
import HomeScreen from '../screens/home/HomeScreen';
import OrderManagementScreen from '../screens/orderManagement/OrderManagement';
import MenuManagement from '../screens/menuManagement/MenuManagement';
import UserManagement from '../screens/userManagement/UserManagement';

const Tab = createBottomTabNavigator();
export const TabNavigator = () => {
  return (
    <View style={{ flex: 1 }}>
      <Tab.Navigator
        screenOptions={{
          headerShown: false,
          tabBarInactiveTintColor: 'black',
          tabBarActiveTintColor: '#FF6B35', // Updated active color
          tabBarLabelStyle: {
            fontSize: 12,
            marginBottom: 4,
          },
          tabBarStyle: {
            position:'absolute',
            borderTopColor: 'rgba(0, 0, 0, .2)',
            height: 70,
            paddingBottom: 10,
          },
        }}
      >
        <Tab.Screen
          name="HomeScreen"
          component={HomeScreen}
          options={{
            tabBarLabel: 'Home',
            tabBarIcon: ({ color, size, focused }) => (
              <IcoIcon
                name="home-outline"
                color={color}
                size={size}
              />
            ),
          }}
        />
        <Tab.Screen
          name="OrderManagementScreen"
          component={OrderManagementScreen}
          options={{
            tabBarLabel: 'Orders',
            tabBarIcon: ({ color, size, focused }) => (
              <MaterialCommunityIcons
                name={focused ? 'clipboard-list' : 'clipboard-list-outline'}
                color={color}
                size={size}
              />
            ),
          }}
        />
        <Tab.Screen
          name="MenuManagement"
          component={MenuManagement}
          options={{
            tabBarLabel: 'Menu',
            tabBarIcon: ({ color, size, focused }) => (
              <MaterialCommunityIcons
                name={focused ? 'food' : 'food-outline'}
                color={color}
                size={size}
              />
            ),
          }}
        />
        <Tab.Screen
          name="UserManagementScreen"
          component={UserManagement}
          options={{
            tabBarLabel: 'Account',
            tabBarIcon: ({ color, size, focused }) => (
              <IcoIcon
                name="person-outline"
                color={color}
                size={size}
              />
            ),
          }}
        />
      </Tab.Navigator>
    </View>
  );
};
