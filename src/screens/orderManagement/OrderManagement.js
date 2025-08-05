import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  RefreshControl,
  TouchableOpacity,
  StatusBar,
  Platform,
  Modal,
} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Icon from 'react-native-vector-icons/FontAwesome';
import styles from './styles';
import StatusBadge from '../../components/StatusBadge/StatusBadge';
import { SafeAreaView } from 'react-native-safe-area-context';
import AppButton from '../../components/AppButton/AppButton';
import { Picker } from '@react-native-picker/picker';
import { getOrderButtonStates } from '../../utils/orderUtils';
import AsyncStorage from '@react-native-async-storage/async-storage';

const summaryItems = [
  {
    icon: 'clock-outline',
    title: 'All Orders',
    count: '24',
    color: '#FF6B35',
  },
  {
    icon: 'currency-usd',
    title: 'Pending',
    count: '8',
    color: '#00A896',
  },
  {
    icon: 'clock-outline',
    title: 'cancelled',
    count: '5',
    color: '#FF6B35',
  },
  {
    icon: 'currency-usd',
    title: 'Preparing',
    count: '2',
    color: '#00A896',
  },
  {
    icon: 'star-outline',
    title: 'Out for Delivery',
    count: '4',
    color: '#F4A261',
  },
  { icon: 'food', title: 'Delivered', count: '3', color: '#3D5A80' },
];
const orderLists = [
  {
    orderId: 'EZ0323',
    status: 'out-for-delivery',
    phone: '+1 234-567-8900',
    location: '123 Main St, City, State 12345',
    datetime: '15/01/2024, 15:30:30',
    menuId: 'item_001',
    name: 'Deluxe Veggie Pizza',
    description: 'Loaded with fresh veggies, mozzarella, and house-made sauce.',
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
    description: 'Paneer cubes, jalapeños, red pepper, and spicy tomato base.',
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

const OrderManagementScreen = ({ navigation }) => {
  const [summaryItems, setSummaryItems] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [selectedOrderType, setSelectedOrderType] = useState();
  const [orderData, setOrderData] = useState([]);
  const [filteredOrderData, setFilteredOrderData] = useState([]);
  useEffect(() => {
    const stats = getOrderSummaryStats(orderLists);
    setSummaryItems(stats);
    setSelectedOrderType(stats[0].title);
  }, []);
  useEffect(() => {
    if (selectedOrderType) {
      filterOrders(selectedOrderType);
    }
  }, [selectedOrderType, orderLists]);
  // Load items on screen mount
  useEffect(() => {
    loadOrderData();
  }, []);

  const loadOrderData = async () => {
    try {
      const stored = await AsyncStorage.getItem('@orderData');
      const parsed = stored ? JSON.parse(stored) : [];
      setOrderData(parsed);
    } catch (error) {
      console.error('Error loading food items:', error);
    } finally {
    }
  };
  // Order confirm modal props
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [isModalVisible, setModalVisible] = useState(false);
  const [prepTime, setPrepTime] = useState(null);
  const handleCancelOrder = id => {
    const updated = filteredOrderData.map(order =>
      order.orderId === id ? { ...order, status: 'Cancelled' } : order,
    );
    setFilteredOrderData(updated);
  };

  const handleConfirmClick = order => {
    setSelectedOrder(order);
    setModalVisible(true);
  };

  const handleConfirmOrder = () => {
    const updated = filteredOrderData.map(order =>
      order.orderId === selectedOrder.orderId
        ? { ...order, status: `Preparing (${prepTime})` }
        : order,
    );
    setFilteredOrderData(updated);
    setModalVisible(false);
    setPrepTime(null);
  };

  // receipt modal props
  const [receiptVisible, setReceiptVisible] = useState(false);
  const [selectedReceiptOrder, setSelectedReceiptOrder] = useState(null);

  const preparationTimes = ['15 mins', '30 mins', '45 mins', '60 mins'];
  const onRefresh = () => {
    setRefreshing(true);

    // Simulate data fetch or call your API here
    setTimeout(() => {
      setRefreshing(false);
    }, 1500);
  };
  const changeSelectedOrderType = () => {};
  const getOrderSummaryStats = menuItems => {
    const summary = {
      all: 0,
      pending: 0,
      cancelled: 0,
      preparing: 0,
      delivered: 0,
      outForDelivery: 0,
    };

    for (const item of menuItems) {
      summary.all += 1;

      const status = item.status.toLowerCase();

      if (status === 'pending') summary.pending += 1;
      else if (status === 'cancelled') summary.cancelled += 1;
      else if (status === 'preparing') summary.preparing += 1;
      else if (status === 'delivered') summary.delivered += 1;
      else if (status === 'out-for-delivery') summary.outForDelivery += 1;
    }

    return [
      {
        icon: 'clipboard-list-outline',
        title: 'All Orders',
        count: summary.all.toString(),
        color: '#FF6B35',
      },
      {
        icon: 'timer-sand-empty',
        title: 'Pending',
        count: summary.pending.toString(),
        color: '#00A896',
      },
      {
        icon: 'check-decagram',
        title: 'Cancelled',
        count: summary.cancelled.toString(),
        color: '#3D348B',
      },
      {
        icon: 'chef-hat',
        title: 'Preparing',
        count: summary.preparing.toString(),
        color: '#E07A5F',
      },
      {
        icon: 'truck-delivery',
        title: 'Out for Delivery',
        count: summary.outForDelivery.toString(),
        color: '#F4A261',
      },
      {
        icon: 'check-circle-outline',
        title: 'Delivered',
        count: summary.delivered.toString(),
        color: '#3D5A80',
      },
    ];
  };
  const filterOrders = type => {
    if (type === 'All Orders') {
      setFilteredOrderData(orderLists);
    } else {
      const filtered = orderLists.filter(order => {
        const normalizedStatus = order.status.toLowerCase();
        const normalizedType = type.toLowerCase().replace(/ /g, '-'); // Converts "Out for Delivery" → "out-for-delivery"
        return normalizedStatus === normalizedType;
      });
      setFilteredOrderData(filtered);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {Platform.OS === 'ios' && (
        <View style={{ height: 44, backgroundColor: '#fff' }} />
      )}
      <StatusBar backgroundColor="#fff" barStyle="dark-content" />

      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        {/* Summary Cards */}
        <View style={styles.header}>
          <Text style={styles.title}>Order Management</Text>
          <Text style={styles.description}>
            Track and manage customer orders
          </Text>
        </View>
        <View style={styles.cardGrid}>
          {summaryItems.map((item, index) => {
            const isSelected = selectedOrderType === item.title;
            return (
              <TouchableOpacity
                key={index}
                onPress={() => setSelectedOrderType(item.title)}
                style={[
                  styles.card,
                  isSelected && { backgroundColor: '#FF6B35' }, // selected color
                ]}
              >
                <Text
                  style={[styles.cardValue, isSelected && { color: '#fff' }]}
                >
                  {item.title}
                </Text>
                <Text
                  style={[styles.cardTitle, isSelected && { color: '#fff' }]}
                >
                  ({item.count})
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>

        {/* Recent Orders */}
        <Text style={styles.sectionTitle}>Recent Orders</Text>

        {filteredOrderData.map((order, index) => (
          <View key={index} style={styles.orderCard}>
            {/* Order Header */}
            <View style={styles.orderTop}>
              <View>
                <Text style={styles.orderName}>{order.orderId}</Text>
                <Text style={styles.orderDetail}>{order.datetime}</Text>
              </View>
              <View style={{ alignItems: 'flex-end' }}>
                <Text style={[styles.orderName, { marginBottom: 6 }]}>
                  ${order.basePrice}
                </Text>
                <StatusBadge status={order.status} />
              </View>
            </View>

            {/* Customer Info */}
            <View
              style={{
                backgroundColor: '#F2F3F5',
                padding: 10,
                borderRadius: 10,
                marginVertical: 10,
              }}
            >
              <View style={{ flexDirection: 'row', marginBottom: 6 }}>
                <MaterialCommunityIcons name="phone" size={14} color="#888" />
                <Text style={[styles.orderDetail, { marginLeft: 6 }]}>
                  {order.name} - {order.phone}
                </Text>
              </View>
              <View style={{ flexDirection: 'row' }}>
                <MaterialCommunityIcons
                  name="map-marker"
                  size={14}
                  color="#888"
                />
                <Text style={[styles.orderDetail, { marginLeft: 6 }]}>
                  {order.location}
                </Text>
              </View>
            </View>

            <View style={{ marginBottom: 10 }}>
              {/* Menu Name */}
              <Text style={styles.orderName}>{order.name}</Text>

              {/* Mandatory Options */}
              {order.mandatoryOptions?.map((section, index) => {
                const selectedOption = section.options[0]; // Assuming always 1 selected option
                return (
                  <Text key={`mandatory-${index}`} style={styles.orderDetail}>
                    • {section.sectionName}: {selectedOption.name}{' '}
                    {selectedOption.price > 0
                      ? `($${selectedOption.price})`
                      : ''}
                  </Text>
                );
              })}

              {/* Add-ons */}
              {order.addons?.length > 0 && (
                <Text style={[styles.orderName, { marginTop: 4 }]}>
                  Add-ons:
                </Text>
              )}
              {order.addons?.map((addon, index) => (
                <Text key={`addon-${index}`} style={styles.orderDetail}>
                  • {addon.name} {addon.price > 0 ? `($${addon.price})` : ''}
                </Text>
              ))}
            </View>

            {/* Extra Price */}
            {order.totalExtraPrice ? (
              <View style={{ alignItems: 'flex-end' }}>
                <Text style={styles.orderName}>
                  Extra Price: ${order.totalExtraPrice}
                </Text>
              </View>
            ) : null}
            {order?.status &&
              (() => {
                const { showButtons, confirmEnabled, cancelEnabled } =
                  getOrderButtonStates(order.status);

                return (
                  <View key={order.orderId} style={{ marginBottom: 20 }}>
                    {/* Your order details */}

                    {showButtons && (
                      <View
                        style={{
                          flexDirection: 'row',
                          justifyContent: 'space-between',
                          marginTop: 12,
                        }}
                      >
                        <AppButton
                          title="Confirm Order"
                          onTouch={() => handleConfirmClick(order)}
                          disabled={!confirmEnabled}
                          buttonStyle={{
                            backgroundColor: confirmEnabled
                              ? '#4CAF50'
                              : '#A5D6A7',
                            paddingVertical: 8,
                            paddingHorizontal: 14,
                            borderRadius: 6,
                            width: '60%',
                          }}
                          textStyle={{
                            color: '#fff',
                            fontWeight: '600',
                            fontSize: 14,
                          }}
                        />

                        <AppButton
                          title="Cancel"
                          onTouch={() => handleCancelOrder(order.orderId)}
                          disabled={!cancelEnabled}
                          buttonStyle={{
                            backgroundColor: cancelEnabled
                              ? '#F44336'
                              : '#EF9A9A',
                            paddingVertical: 8,
                            paddingHorizontal: 14,
                            borderRadius: 6,
                            width: '35%',
                          }}
                          textStyle={{
                            color: '#fff',
                            fontWeight: '600',
                            fontSize: 14,
                          }}
                        />
                      </View>
                    )}
                  </View>
                );
              })()}
            <View
              style={{
                marginTop: 8,
              }}
            >
              <TouchableOpacity
                onPress={() => {
                  setSelectedReceiptOrder(order);
                  setReceiptVisible(true);
                }}
                style={{
                  flexDirection: 'row',
                  justifyContent: 'center',
                  alignItems: 'center',
                  paddingVertical: 6,
                  paddingHorizontal: 10,
                  borderRadius: 6,
                  backgroundColor: '#2D9CDB',
                }}
              >
                <Icon name="print" size={14} color="#fff" />
                <Text
                  style={{ color: '#fff', marginLeft: 6, fontWeight: '600' }}
                >
                  Print Receipt
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        ))}
      </ScrollView>
      <Modal
        visible={isModalVisible}
        transparent
        animationType="fade"
        onRequestClose={() => setModalVisible(false)}
      >
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'rgba(0,0,0,0.5)',
          }}
        >
          <View
            style={{
              width: '80%',
              backgroundColor: '#fff',
              padding: 20,
              borderRadius: 10,
            }}
          >
            <Text style={{ fontSize: 16, fontWeight: '600', marginBottom: 10 }}>
              Select Preparation Time
            </Text>
            <Picker
              selectedValue={prepTime}
              onValueChange={itemValue => setPrepTime(itemValue)}
              style={{ height: 50, width: '100%' }}
            >
              <Picker.Item label="Select time..." value={null} />
              {preparationTimes.map((time, index) => (
                <Picker.Item key={index} label={time} value={time} />
              ))}
            </Picker>

            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginTop: 20,
              }}
            >
              <TouchableOpacity
                onPress={handleConfirmOrder}
                disabled={!prepTime}
                style={{
                  padding: 10,
                  borderRadius: 6,
                  width: '45%',
                  backgroundColor: prepTime ? '#4CAF50' : '#aaa',
                }}
              >
                <Text style={{ color: '#fff', textAlign: 'center' }}>
                  Confirm
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => setModalVisible(false)}
                style={{
                  padding: 10,
                  width: '45%',
                  borderRadius: 6,
                  backgroundColor: '#ccc',
                }}
              >
                <Text style={{ textAlign: 'center' }}>Cancel</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
      <Modal
        visible={receiptVisible}
        transparent
        animationType="slide"
        onRequestClose={() => setReceiptVisible(false)}
      >
        <View
          style={{
            flex: 1,
            backgroundColor: 'rgba(0,0,0,0.5)',
            justifyContent: 'center',
            padding: 20,
          }}
        >
          <View
            style={{
              backgroundColor: '#fff',
              borderRadius: 10,
              padding: 20,
              maxHeight: '80%',
            }}
          >
            <ScrollView>
              <Text
                style={{
                  fontSize: 20,
                  fontWeight: '700',
                  textAlign: 'center',
                  marginBottom: 16,
                }}
              >
                Receipt
              </Text>

              {selectedReceiptOrder && (
                <>
                  {/* Order Info */}
                  <Text style={{ fontWeight: '600' }}>
                    Order ID: {selectedReceiptOrder.orderId}
                  </Text>
                  <Text>Date: {selectedReceiptOrder.datetime || 'N/A'}</Text>

                  {/* Customer */}
                  <View style={{ marginVertical: 10 }}>
                    <Text style={{ fontWeight: '600' }}>Customer:</Text>
                    <Text>{selectedReceiptOrder.name}</Text>
                    <Text>{selectedReceiptOrder.phone}</Text>
                    <Text>{selectedReceiptOrder.location}</Text>
                  </View>

                  {/* Items */}
                  <Text style={{ fontWeight: '600', marginBottom: 4 }}>
                    Items:
                  </Text>
                  <Text>• {selectedReceiptOrder.name}</Text>
                  {selectedReceiptOrder.mandatoryOptions?.map(
                    (section, index) => (
                      <Text key={`mand-${index}`}>
                        • {section.sectionName}: {section.options[0].name}{' '}
                        {section.options[0].price > 0
                          ? `(₹${section.options[0].price})`
                          : ''}
                      </Text>
                    ),
                  )}

                  {/* Extras */}
                  {selectedReceiptOrder.addons?.length > 0 && (
                    <>
                      <Text
                        style={{
                          fontWeight: '600',
                          marginTop: 10,
                          marginBottom: 4,
                        }}
                      >
                        Add-ons:
                      </Text>
                      {selectedReceiptOrder.addons.map((addon, index) => (
                        <Text key={`addon-${index}`}>
                          • {addon.name}{' '}
                          {addon.price > 0 ? `(₹${addon.price})` : ''}
                        </Text>
                      ))}
                    </>
                  )}

                  {/* Price Summary */}
                  <View style={{ marginTop: 14 }}>
                    <Text style={{ fontWeight: '600' }}>
                      Base Price: ${selectedReceiptOrder.basePrice}
                    </Text>
                    <Text style={{ fontWeight: '600' }}>
                      Extras: ${selectedReceiptOrder.totalExtraPrice}
                    </Text>
                    <Text style={{ fontWeight: '600' }}>
                      Discount: ${selectedReceiptOrder.discountPrice ?? 0}
                    </Text>
                  </View>

                  <Text
                    style={{ fontWeight: '700', fontSize: 16, marginTop: 8 }}
                  >
                    Total: $
                    {selectedReceiptOrder.basePrice +
                      selectedReceiptOrder?.totalExtraPrice -
                      selectedReceiptOrder?.discountPrice}
                  </Text>
                </>
              )}
            </ScrollView>

            {/* Close Button */}
            <TouchableOpacity
              onPress={() => setReceiptVisible(false)}
              style={{
                backgroundColor: '#FF6B35',
                marginTop: 20,
                padding: 12,
                borderRadius: 6,
              }}
            >
              <Text
                style={{
                  textAlign: 'center',
                  color: '#fff',
                  fontWeight: '600',
                }}
              >
                Close
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

export default OrderManagementScreen;
