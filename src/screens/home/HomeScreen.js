import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  RefreshControl,
  TouchableOpacity,
  StatusBar,
  Platform,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import styles from './styles';
import StatusBadge from '../../components/StatusBadge/StatusBadge';
import { SafeAreaView } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';

// const summaryItems = [
//   {
//     icon: 'clock-outline',
//     title: 'Pending Orders',
//     value: '24',
//     color: '#FF6B35',
//   },
//   {
//     icon: 'currency-usd',
//     title: 'Total Revenue',
//     value: '$12,430',
//     color: '#00A896',
//   },
//   { icon: 'star-outline', title: 'Avg Rating', value: '4.5', color: '#F4A261' },
//   { icon: 'food', title: 'Menu Items', value: '32', color: '#3D5A80' },
// ];

// const recentOrders = [
//   {
//     id: 'O-1021',
//     name: 'John Doe',
//     price: '$45.99',
//     time: '2:15 PM',
//     status: 'Delivered',
//   },
//   {
//     id: 'O-1022',
//     name: 'Sarah Lee',
//     price: '$23.50',
//     time: '2:05 PM',
//     status: 'Pending',
//   },
//   {
//     id: 'O-1023',
//     name: 'Mike Tyson',
//     price: '$87.20',
//     time: '1:45 PM',
//     status: 'Cancelled',
//   },
//   {
//     id: 'O-1024',
//     name: 'Herry Port',
//     price: '$22.20',
//     time: '8:45 PM',
//     status: 'out-for-delivery',
//   },
// ];

const quickActions = [
  {
    icon: 'clipboard-list-outline',
    title: 'View Orders',
    route: 'OrderManagementScreen',
  },
  {
    icon: 'silverware-fork-knife',
    title: 'Manage Menu',
    route: 'MenuManagement',
  },
  { icon: 'plus-box-outline', title: 'Add Item', route: 'AddNewItemScreen' },
  { icon: 'chart-bar', title: 'View Analytics', route: 'MenuManagement' },
];

const HomeScreen = ({ navigation }) => {
  const [summaryItems, setSummaryData] = useState([]);

  // Load items on screen mount
  useEffect(() => {
    loadMenuItems();
  }, []);

  const loadMenuItems = async () => {
    try {
      const orderData = await AsyncStorage.getItem('@orderData');
      const menuData = await AsyncStorage.getItem('@food_items');

      const orders = orderData ? JSON.parse(orderData) : [];
      const menuItems = menuData ? JSON.parse(menuData) : [];

      // Filter pending orders
      const pendingOrders = orders.filter(
        order => order?.status?.toLowerCase() === 'pending',
      );

      // Total revenue from delivered orders
      const totalRevenue = orders
        .filter(order => order?.status?.toLowerCase() === 'delivered')
        .reduce((sum, order) => sum + (order?.basePrice || 0), 0);

      // You can also calculate average rating if available

      const summary = [
        {
          icon: 'clock-outline',
          title: 'Pending Orders',
          value: `${pendingOrders.length}`,
          color: '#FF6B35',
        },
        {
          icon: 'currency-usd',
          title: 'Total Revenue',
          value: `$${totalRevenue.toLocaleString()}`,
          color: '#00A896',
        },
        {
          icon: 'star-outline',
          title: 'Avg Rating',
          value: '4.5', // You can compute dynamically if rating data exists
          color: '#F4A261',
        },
        {
          icon: 'food',
          title: 'Menu Items',
          value: `${menuItems.length}`,
          color: '#3D5A80',
        },
      ];

      setSummaryData(summary);
      setRecentOrders(orders); // Still setting recent orders
    } catch (error) {
      console.error('Error loading summary:', error);
    }
  };

  const [refreshing, setRefreshing] = useState(false);
  const [recentOrders, setRecentOrders] = useState([]);

  const onRefresh = () => {
    setRefreshing(true);

    // Simulate data fetch or call your API here
    setTimeout(() => {
      setRefreshing(false);
    }, 1500);
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
        <Text style={styles.sectionTitle}>Overview</Text>
        <View style={styles.cardGrid}>
          {summaryItems.map((item, index) => (
            <View key={index} style={styles.card}>
              <View
                style={[styles.iconCircle, { backgroundColor: item.color }]}
              >
                <Icon name={item.icon} size={22} color="#fff" />
              </View>
              <Text style={styles.cardValue}>{item.value}</Text>
              <Text style={styles.cardTitle}>{item.title}</Text>
            </View>
          ))}
        </View>

        {/* Recent Orders */}
        <Text style={styles.sectionTitle}>Recent Orders</Text>
        {recentOrders.slice(0, 4).map((order, index) => (
          <View key={index} style={styles.orderCard}>
            <View style={styles.orderTop}>
              <Text style={styles.orderName}>{order.name}</Text>
              <StatusBadge status={order.status} />
            </View>
            <Text style={styles.orderDetail}>Order ID: {order.orderId}</Text>
            <Text style={styles.orderDetail}>
              Price: ${order.basePrice} • Time: {order.datetime}
            </Text>
          </View>
        ))}

        {/* Quick Actions */}
        <Text style={styles.sectionTitle}>Quick Actions</Text>
        <View style={styles.quickGrid}>
          {quickActions.map((action, index) => (
            <TouchableOpacity
              key={index}
              style={styles.quickCard}
              onPress={() => {
                navigation.navigate(action.route);
              }}
            >
              <Icon name={action.icon} size={26} color="#FF6B35" />
              <Text style={styles.quickTitle}>{action.title}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default HomeScreen;
