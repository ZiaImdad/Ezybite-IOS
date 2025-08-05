import {
  Alert,
  Platform,
  ScrollView,
  StatusBar,
  Text,
  TouchableOpacity,
  useColorScheme,
  View,
} from 'react-native';
import React, { useEffect, useRef, useState } from 'react';
import styles from './styles';
import MaterialComIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import MIcon from 'react-native-vector-icons/MaterialIcons';
// import ProgressBar from '../../components/ProgressBar/ProgressBar';
import AsyncStorage from '@react-native-async-storage/async-storage';
// import {loginDriver} from '../../services/driverService';
// import {isValidEmail} from '../../utils/validation';
import { SafeAreaView } from 'react-native-safe-area-context';
import AppButton from '../../components/AppButton/AppButton';
import { Checkbox } from 'react-native-paper';

import { TextInputBox } from '../../components/TextInputBox/TextInputBox';

const Login = ({ navigation }) => {
  const isDarkMode = useColorScheme() === 'dark';
  const isFirstRender = useRef(true);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState('unchecked');

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false; // Skip validation on initial load
      return;
    }
    validateForm();
  }, [email, password]);

  const [errors, setErrors] = useState({});
  const [isFormValid, setIsFormValid] = useState(false);

  const [touchedFields, setTouchedFields] = useState({
    email: false,
    password: false,
  });

  const handleFieldTouched = field => {
    setTouchedFields(prev => ({
      ...prev,
      [field]: true,
    }));
  };
  const validateForm = () => {
    // const newErrors = {};
    // if (!email) newErrors.email = 'Email is required';
    // else if (!isValidEmail(email)) newErrors.email = 'Invalid email format';
    // if (!password.trim()) newErrors.password = 'Password is required';
    // setErrors(newErrors);
    // setIsFormValid(Object.keys(newErrors).length === 0);
  };
  const handleGoBack = () => {
    navigation.navigate('Landing Screen');
  };
  const orderLists = [
    {
      orderId: 'EZ0323',
      status: 'out-for-delivery',
      phone: '+1 234-567-8900',
      location: '123 Main St, City, State 12345',
      datetime: '15/01/2024, 15:30:30',
      menuId: 'item_001',
      name: 'Deluxe Veggie Pizza',
      description:
        'Loaded with fresh veggies, mozzarella, and house-made sauce.',
      basePrice: 250,
      discountPrice: 12,
      category: 'Pizza',
      mandatoryOptions: [
        {
          sectionName: 'Choose Size',
          required: true,
          options: [{ name: 'Medium', price: 0, count: 1 }],
        },
        {
          sectionName: 'Choose Crust',
          required: true,
          options: [{ name: 'Regular', price: 0, count: 1 }],
        },
        {
          sectionName: 'Choose Sauce',
          required: true,
          options: [{ name: 'Tomato Basil', price: 0, count: 1 }],
        },
      ],
      addons: [
        { name: 'Extra Cheese', price: 3, count: 1 },
        { name: 'Paneer Cubes', price: 8, count: 1 },
      ],
      totalExtraPrice: 11,
    },
    {
      orderId: 'EZ0327',
      status: 'Delivered',
      phone: '+1 666-777-8888',
      location: '987 Maple Dr, Springfield, IL 62704',
      datetime: '25/01/2024, 13:55:20',
      menuId: 'item_005',
      name: 'Cheesy Garlic Bread',
      description:
        'Fresh baked bread topped with garlic butter and mozzarella cheese.',
      basePrice: 120,
      discountPrice: 10,
      category: 'Sides',
      mandatoryOptions: [
        {
          sectionName: 'Choose Cheese Type',
          required: true,
          options: [{ name: 'Mozzarella', price: 0, count: 1 }],
        },
      ],
      addons: [
        { name: 'Extra Garlic Butter', price: 15, count: 1 },
        { name: 'Chili Flakes', price: 5, count: 2 },
      ],
      totalExtraPrice: 25,
    },
    {
      orderId: 'EZ0326',
      status: 'out-for-delivery',
      phone: '+1 444-333-2211',
      location: '321 Sunset Blvd, Los Angeles, CA 90028',
      datetime: '22/01/2024, 17:10:00',
      menuId: 'item_004',
      name: 'Peri Peri Chicken Wrap',
      description:
        'Spicy grilled chicken wrapped with lettuce, onions, and peri peri sauce.',
      basePrice: 150,
      discountPrice: 14,
      category: 'Wrap',
      mandatoryOptions: [
        {
          sectionName: 'Choose Spice Level',
          required: true,
          options: [{ name: 'Medium Spice', price: 0, count: 1 }],
        },
        {
          sectionName: 'Choose Bread Type',
          required: true,
          options: [{ name: 'Whole Wheat', price: 10, count: 2 }], // 1 included, 1 extra
        },
      ],
      addons: [
        { name: 'Extra Mayo', price: 10, count: 1 },
        { name: 'Grilled Veggies', price: 20, count: 2 },
      ],
      totalExtraPrice: 60,
    },
    {
      orderId: 'EZ0325',
      status: 'Cancelled',
      phone: '+1 555-111-2233',
      location: '789 Pine Rd, Metro City, CA 94016',
      datetime: '20/01/2024, 18:15:45',
      menuId: 'item_003',
      name: 'Classic Margherita Pizza',
      description: 'Fresh mozzarella, tomatoes, and basil on a thin crust.',
      basePrice: 200,
      discountPrice: 18,
      category: 'Pizza',
      mandatoryOptions: [
        {
          sectionName: 'Choose Size',
          required: true,
          options: [{ name: 'Large', price: 7, count: 2 }],
        },
        {
          sectionName: 'Choose Crust',
          required: true,
          options: [{ name: 'Thin Crust', price: 0, count: 1 }],
        },
      ],
      addons: [
        { name: 'Black Olives', price: 15, count: 1 },
        { name: 'Jalapeños', price: 15, count: 1 },
      ],
      totalExtraPrice: 30,
    },
    {
      orderId: 'EZ0324',
      status: 'Preparing',
      phone: '+1 987-654-3210',
      location: '456 Oak Ave, Townville, TX 75001',
      datetime: '18/01/2024, 12:45:00',
      menuId: 'item_002',
      name: 'Spicy Chicken Burger',
      description:
        'Grilled spicy chicken patty with lettuce, tomato, and chipotle mayo.',
      basePrice: 180,
      discountPrice: 16,
      category: 'Burger',
      mandatoryOptions: [
        {
          sectionName: 'Choose Bun',
          required: true,
          options: [{ name: 'Whole Wheat', price: 0, count: 1 }],
        },
        {
          sectionName: 'Choose Spice Level',
          required: true,
          options: [{ name: 'Hot', price: 0, count: 1 }],
        },
      ],
      addons: [
        { name: 'Bacon Strips', price: 25, count: 1 },
        { name: 'Cheddar Cheese', price: 20, count: 1 },
      ],
      totalExtraPrice: 55,
    },
    {
      orderId: 'EZ0328',
      status: 'pending',
      phone: '+1 222-888-9999',
      location: '45 King St, Dallas, TX 75201',
      datetime: '27/01/2024, 19:20:00',
      menuId: 'item_006',
      name: 'Smash Beef Burger',
      description:
        'Smash-style beef patty with cheddar, grilled onions, and tangy sauce.',
      basePrice: 200,
      discountPrice: 18,
      category: 'Smash Burger',
      mandatoryOptions: [
        {
          sectionName: 'Choose Bun Type',
          required: true,
          options: [{ name: 'Potato Bun', price: 0, count: 1 }],
        },
        {
          sectionName: 'Add Extra Patty',
          required: true,
          options: [{ name: 'Beef Patty', price: 50, count: 2 }], // 1 included, 1 extra
        },
      ],
      addons: [
        { name: 'Crispy Onions', price: 15, count: 1 },
        { name: 'Chipotle Mayo', price: 10, count: 1 },
      ],
      totalExtraPrice: 75,
    },
    {
      orderId: 'EZ0329',
      status: 'Preparing',
      phone: '+1 999-444-2222',
      location: '101 River Ave, Miami, FL 33101',
      datetime: '28/01/2024, 14:05:45',
      menuId: 'item_007',
      name: 'Double Patty Beef Burger',
      description:
        'Two juicy beef patties stacked with lettuce, tomato, and special sauce.',
      basePrice: 260,
      discountPrice: 24,
      category: 'Double Patty Burger',
      mandatoryOptions: [
        {
          sectionName: 'Choose Cheese',
          required: true,
          options: [{ name: 'American Cheese', price: 20, count: 2 }], // 1 included, 1 extra
        },
        {
          sectionName: 'Choose Bun',
          required: true,
          options: [{ name: 'Sesame Seed Bun', price: 0, count: 1 }],
        },
      ],
      addons: [
        { name: 'Bacon', price: 25, count: 1 },
        { name: 'Pickles', price: 10, count: 2 },
      ],
      totalExtraPrice: 65,
    },
    {
      orderId: 'EZ0330',
      status: 'pending',
      phone: '+1 777-333-1111',
      location: '555 Olive Rd, San Diego, CA 92101',
      datetime: '30/01/2024, 20:30:10',
      menuId: 'item_008',
      name: 'Creamy Alfredo Pasta',
      description:
        'Penne pasta tossed in rich Alfredo sauce with herbs and parmesan.',
      basePrice: 220,
      discountPrice: 2,
      category: 'Pasta',
      mandatoryOptions: [
        {
          sectionName: 'Choose Pasta Type',
          required: true,
          options: [{ name: 'Penne', price: 0, count: 1 }],
        },
        {
          sectionName: 'Add Protein',
          required: true,
          options: [{ name: 'Grilled Chicken', price: 40, count: 2 }], // 1 included, 1 extra
        },
      ],
      addons: [
        { name: 'Parmesan Cheese', price: 15, count: 1 },
        { name: 'Garlic Bread Side', price: 30, count: 1 },
      ],
      totalExtraPrice: 85,
    },
    {
      orderId: 'EZ0331',
      status: 'Cancelled',
      phone: '+1 321-654-0987',
      location: '888 Pearl St, Austin, TX 78701',
      datetime: '01/02/2024, 16:10:45',
      menuId: 'item_009',
      name: 'Chocolate Lava Cake',
      description:
        'Warm chocolate cake with gooey molten center, served with toppings.',
      basePrice: 140,
      discountPrice: 13,
      category: 'Desserts',
      mandatoryOptions: [
        {
          sectionName: 'Choose Topping',
          required: true,
          options: [{ name: 'Vanilla Ice Cream', price: 0, count: 1 }],
        },
      ],
      addons: [
        { name: 'Choco Chips', price: 10, count: 2 },
        { name: 'Whipped Cream', price: 15, count: 1 },
      ],
      totalExtraPrice: 35,
    },
    {
      orderId: 'EZ0332',
      status: 'Preparing',
      phone: '+1 111-222-3333',
      location: '246 Elm St, Chicago, IL 60601',
      datetime: '02/02/2024, 12:25:00',
      menuId: 'item_010',
      name: 'BBQ Chicken Pizza',
      description:
        'Tangy BBQ sauce base, grilled chicken, onions, and mozzarella.',
      basePrice: 270,
      discountPrice: 25,
      category: 'Pizza',
      mandatoryOptions: [
        {
          sectionName: 'Choose Size',
          required: true,
          options: [{ name: 'Large', price: 70, count: 1 }],
        },
        {
          sectionName: 'Choose Crust',
          required: true,
          options: [{ name: 'Cheese Burst', price: 30, count: 2 }], // 1 included, 1 extra
        },
      ],
      addons: [
        { name: 'Sweet Corn', price: 20, count: 1 },
        { name: 'BBQ Drizzle', price: 10, count: 1 },
      ],
      totalExtraPrice: 60,
    },
    {
      orderId: 'EZ0333',
      status: 'Delivered',
      phone: '+1 888-000-1234',
      location: '789 Birch Ave, Seattle, WA 98101',
      datetime: '03/02/2024, 14:50:30',
      menuId: 'item_011',
      name: 'Spicy Paneer Pizza',
      description:
        'Paneer cubes, jalapeños, red pepper, and spicy tomato base.',
      basePrice: 240,
      discountPrice: 220,
      category: 'Pizza',
      mandatoryOptions: [
        {
          sectionName: 'Choose Size',
          required: true,
          options: [{ name: 'Medium', price: 50, count: 1 }],
        },
        {
          sectionName: 'Choose Crust',
          required: true,
          options: [{ name: 'Thin Crust', price: 0, count: 1 }],
        },
      ],
      addons: [
        { name: 'Extra Paneer', price: 35, count: 1 },
        { name: 'Chili Flakes', price: 5, count: 2 },
      ],
      totalExtraPrice: 45,
    },
    {
      orderId: 'EZ0334',
      status: 'Pending',
      phone: '+1 444-555-6666',
      location: '123 Cherry Lane, Newark, NJ 07102',
      datetime: '04/02/2024, 18:40:00',
      menuId: 'item_012',
      name: 'Tandoori Chicken Pizza',
      description:
        'Spicy tandoori chicken, red onions, and bell peppers with Indian spices.',
      basePrice: 260,
      discountPrice: 240,
      category: 'Pizza',
      mandatoryOptions: [
        {
          sectionName: 'Choose Size',
          required: true,
          options: [{ name: 'Medium', price: 50, count: 1 }],
        },
        {
          sectionName: 'Choose Crust',
          required: true,
          options: [{ name: 'Stuffed Crust', price: 40, count: 2 }], // 1 included, 1 extra
        },
      ],
      addons: [
        { name: 'Mint Mayo Drizzle', price: 10, count: 1 },
        { name: 'Extra Onions', price: 10, count: 1 },
      ],
      totalExtraPrice: 60,
    },
    {
      orderId: 'EZ0335',
      status: 'Delivered',
      phone: '+1 777-222-0000',
      location: '456 Lakeview Rd, Orlando, FL 32801',
      datetime: '05/02/2024, 13:15:30',
      menuId: 'item_013',
      name: 'Classic Beef Burger',
      description:
        'Juicy beef patty, lettuce, tomato, pickles, and mayo in a sesame bun.',
      basePrice: 190,
      discountPrice: 17,
      category: 'Burger',
      mandatoryOptions: [
        {
          sectionName: 'Choose Cheese',
          required: true,
          options: [{ name: 'Cheddar', price: 15, count: 2 }], // 1 included, 1 extra
        },
      ],
      addons: [
        { name: 'Grilled Mushrooms', price: 20, count: 1 },
        { name: 'Bacon', price: 25, count: 1 },
      ],
      totalExtraPrice: 60,
    },
    {
      orderId: 'EZ0336',
      status: 'pending',
      phone: '+1 123-987-4560',
      location: '789 Sunset Blvd, Denver, CO 80203',
      datetime: '06/02/2024, 20:00:00',
      menuId: 'item_014',
      name: 'Pink Sauce Pasta',
      description:
        'A creamy mix of white and red sauces with your choice of pasta.',
      basePrice: 230,
      discountPrice: 10,
      category: 'Pasta',
      mandatoryOptions: [
        {
          sectionName: 'Choose Pasta Type',
          required: true,
          options: [{ name: 'Fusilli', price: 0, count: 1 }],
        },
        {
          sectionName: 'Add Veggies',
          required: true,
          options: [{ name: 'Broccoli', price: 15, count: 2 }], // 1 included, 1 extra
        },
      ],
      addons: [
        { name: 'Extra Cheese', price: 30, count: 1 },
        { name: 'Chili Flakes', price: 5, count: 1 },
      ],
      totalExtraPrice: 50,
    },
  ];
  const menuList = [
    {
      menuId: 'item_001',
      name: 'Pink Sauce Pasta',
      description:
        'A creamy mix of white and red sauces with your choice of pasta.',
      basePrice: 230,
      discountPrice: 210,
      category: 'Pasta',
      image: '',
      mandatoryOptions: [
        {
          sectionName: 'Choose Pasta Type',
          required: true,
          options: [
            { name: 'Penne', price: 0 },
            { name: 'Fusilli', price: 10 },
          ],
        },
        {
          sectionName: 'Add Veggies',
          required: true,
          options: [
            { name: 'Broccoli', price: 15 },
            { name: 'Olives', price: 10 },
          ],
        },
      ],
      addons: [
        { name: 'Extra Cheese', price: 30 },
        { name: 'Chili Flakes', price: 5 },
      ],
      inStock: true,
    },
    {
      menuId: 'item_002',
      name: 'Margherita Pizza',
      description:
        'Classic cheese pizza with a rich tomato base and mozzarella.',
      basePrice: 299,
      discountPrice: 279,
      category: 'Pizza',
      image: require('../../assets/fooditems/unnamed.jpg'),
      mandatoryOptions: [
        {
          sectionName: 'Choose Size',
          required: true,
          options: [
            { name: 'Regular', price: 0 },
            { name: 'Medium', price: 50 },
            { name: 'Large', price: 90 },
          ],
        },
      ],
      addons: [
        { name: 'Stuffed Crust', price: 40 },
        { name: 'Extra Cheese', price: 25 },
      ],
      inStock: true,
    },
    {
      menuId: 'item_003',
      name: 'Veggie Burger',
      description:
        'A hearty veggie patty served with lettuce, tomato and sauces.',
      basePrice: 180,
      discountPrice: 160,
      category: 'Burgers',
      image: '',
      mandatoryOptions: [
        {
          sectionName: 'Choose Bun',
          required: true,
          options: [
            { name: 'Regular Bun', price: 0 },
            { name: 'Multigrain Bun', price: 15 },
          ],
        },
      ],
      addons: [
        { name: 'Extra Patty', price: 40 },
        { name: 'Cheese Slice', price: 20 },
      ],
      inStock: false,
    },
    {
      menuId: 'item_004',
      name: 'Farmhouse Pizza',
      description:
        'Loaded with onions, capsicum, mushrooms, and tomatoes on a cheesy base.',
      basePrice: 350,
      discountPrice: 330,
      category: 'Pizza',
      image: '',
      mandatoryOptions: [
        {
          sectionName: 'Choose Size',
          required: true,
          options: [
            { name: 'Regular', price: 0 },
            { name: 'Medium', price: 60 },
            { name: 'Large', price: 100 },
          ],
        },
      ],
      addons: [
        { name: 'Extra Veggies', price: 25 },
        { name: 'Cheese Burst', price: 50 },
      ],
      inStock: true,
    },
    {
      menuId: 'item_005',
      name: 'Pepper Paneer Pizza',
      description: 'Paneer cubes with spicy red paprika and green capsicum.',
      basePrice: 370,
      discountPrice: 345,
      category: 'Pizza',
      image: '',
      mandatoryOptions: [
        {
          sectionName: 'Choose Crust',
          required: true,
          options: [
            { name: 'Classic Hand Tossed', price: 0 },
            { name: 'Cheese Burst', price: 50 },
          ],
        },
      ],
      addons: [
        { name: 'Extra Paneer', price: 35 },
        { name: 'Jalapenos', price: 15 },
      ],
      inStock: true,
    },
  ];
  const handleSkip = () => {
    navigation.navigate('Create Account Screen');
  };
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    console.log(email, password);

    if (email === 'ezybiteadmin@gmail.com' && password === 'admin06') {
      setLoading(true);

      try {
        // Store user details
        const userDetails = {
          name: 'Ezybite Admin',
          email: email,
          password: password,
          applicationName: 'Ezybite',
          rememberMe: rememberMe == 'checked' ? true : false,
        };
        await AsyncStorage.setItem('@user_info', JSON.stringify(userDetails));

        // Seed order data if empty
        const orderData = await AsyncStorage.getItem('@orderData');
        const orderParsed = orderData ? JSON.parse(orderData) : [];

        if (!orderParsed || orderParsed.length < 1) {
          await AsyncStorage.setItem('@orderData', JSON.stringify(orderLists));
        }

        // Seed menu data if empty
        const menuData = await AsyncStorage.getItem('@food_items');
        const menuParsed = menuData ? JSON.parse(menuData) : [];

        if (!menuParsed || menuParsed.length < 1) {
          await AsyncStorage.setItem('@food_items', JSON.stringify(menuList));
        }

        setLoading(false);
        navigation.replace('HomeScreen'); // Use `replace` to prevent going back to login
      } catch (err) {
        console.error(err);
        setLoading(false);
        Alert.alert('Error', 'Something went wrong.');
      }
    } else {
      Alert.alert('Failed', 'Invalid Credentials');
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
      {Platform.OS === 'ios' && (
        <View style={{ height: 44, backgroundColor: '#fff' }} />
      )}
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor="#fff"
      />
      <ScrollView
        contentContainerStyle={{
          flexGrow: 1,
          paddingBottom: 20,
        }}
        keyboardShouldPersistTaps="handled"
      >
        {/* <ProgressBar
          steps={2}
          currentStep={1}
          leftButtonTitle="Create an account"
          onGoBack={handleGoBack}
          onSkip={handleSkip}
        /> */}
        <View style={{ padding: 24 }}>
          <View style={{ alignItems: 'center', marginVertical: 40 }}>
            <View
              style={{
                borderRadius: 100,
                justifyContent: 'center',
                alignItems: 'center',
                width: 100,
                height: 100,
                backgroundColor: '#FF6B35',
                marginBottom: 10,
              }}
            >
              <MIcon name="fastfood" size={50} color="#fff" />
            </View>
            <Text style={styles.title}>Ezybite</Text>
          </View>
          <View
            style={{
              padding: 24,
              borderWidth: 0.6,
              borderColor: '#A1A1A1',
              borderRadius: 20,

              // iOS Shadow
              shadowColor: '#000',
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.2,
              shadowRadius: 4,

              // Android Shadow
              elevation: 3,

              backgroundColor: '#fff', // Required for shadow to appear on Android
            }}
          >
            <View style={{ marginBottom: 20 }}>
              <Text style={styles.title}>Welcome Back!</Text>
            </View>
            <TextInputBox
              label={'Username'}
              showHelpIcon={false}
              placeholder="Enter your username"
              value={email}
              onChangeText={setEmail}
              maxLength={50}
              leftIcon="person"
              onFocus={() => handleFieldTouched('email')}
              error={touchedFields.email && errors.email}
            />
            <TextInputBox
              label={'Password'}
              showHelpIcon={false}
              placeholder="Enter your password"
              secureTextEntry={true}
              value={password}
              leftIcon="lock"
              onChangeText={setPassword}
              maxLength={50}
              onFocus={() => handleFieldTouched('password')}
              error={touchedFields.password && errors.password}
            />
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginVertical: 10,
              }}
            >
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Checkbox
                  status={rememberMe}
                  onPress={() => {
                    setRememberMe(
                      rememberMe == 'checked' ? 'unchecked' : 'checked',
                    );
                  }}
                />
                <Text style={styles.description}>Remember me</Text>
              </View>

              <TouchableOpacity
                onPress={() => navigation.navigate('Forgot Password Screen')}
              >
                <Text
                  style={[
                    styles.description,
                    { color: '#FF6B35', fontWeight: '500' },
                  ]}
                >
                  Forgot Password?
                </Text>
              </TouchableOpacity>
            </View>
            <AppButton
              title={'Sign In'}
              buttonStyle={{}}
              onTouch={handleLogin}
              loading={loading}
              loadingColor={'#FFCBB3'}
            />
          </View>
          <View
            style={{
              marginVertical: 10,
              padding: 10,
              borderWidth: 0.6,
              borderColor: '#A1A1A1',
              borderRadius: 20,

              // iOS Shadow
              shadowColor: '#000',
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.2,
              shadowRadius: 4,

              // Android Shadow
              elevation: 3,

              backgroundColor: '#fff', // Required for shadow to appear on Android

              alignItems: 'center',
            }}
          >
            <Text style={{ fontSize: 16, fontWeight: 'bold' }}>
              Demo Credentials
            </Text>
            <Text>Email: ezybiteadmin@gmail.com</Text>
            <Text>Password: admin06</Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Login;
