import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {TabNavigator} from './TabNavigator';
import {useEffect} from 'react';
import WelcomeScreen from '../screens/welcome/WelcomeScreen';
import Login from '../screens/login/Login';
import HomeScreen from '../screens/home/HomeScreen';
import AddFoodItemScreen from '../screens/addFoodItem/AddFoodItemScreen';
import OrderManagementScreen from '../screens/orderManagement/OrderManagement';
import MenuManagement from '../screens/menuManagement/MenuManagement';
import {SafeAreaView} from 'react-native';
const Stack = createNativeStackNavigator();

export const AppNavigator = () => {
  return (
    <SafeAreaView style={{flex: 1}}>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName={'WelcomeScreen'}
          screenOptions={{
            headerStyle: {
              backgroundColor: '#000',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
          }}>
          <Stack.Screen
            name="WelcomeScreen"
            component={WelcomeScreen}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="LoginScreen"
            component={Login}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="HomeScreen"
            component={TabNavigator}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="MenuManagement"
            component={MenuManagement}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="AddNewItemScreen"
            component={AddFoodItemScreen}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="OrderManagementScreen"
            component={OrderManagementScreen}
            options={{headerShown: false}}
          />

          {/* <Stack.Screen name="Demo Screen2" component={DemoScreen2}  options={({ route }) => ({
            title:  'Mob Tracking', // Dynamic title
          })} /> */}
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaView>
  );
};
