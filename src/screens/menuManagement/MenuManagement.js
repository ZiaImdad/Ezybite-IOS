import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Image,
  Keyboard,
  TouchableWithoutFeedback,
  StatusBar,
  Platform,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import styles from './styles';
import { SafeAreaView } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';
const categoryData = [
  { name: 'Burger', count: 5, color: '#FFB703', icon: 'hamburger' },
  { name: 'Pizza', count: 3, color: '#FB8500', icon: 'pizza' },
  { name: 'Drinks', count: 7, color: '#219EBC', icon: 'cup-water' },
  { name: 'Snacks', count: 4, color: '#8ECAE6', icon: 'food-apple' },
];

const foodItems = [
  {
    id: 1,
    name: 'Cheese Burger',
    image: '',
    category: 'Burger',
    price: '$8.99',
    description: 'A juicy grilled beef patty with cheese and fresh veggies.',
    stock: true,
    calories: 720,
    nutrition: { protein: '25g', carbs: '48g', fat: '40g' },
  },
  {
    id: 2,
    name: 'Veggie Pizza',
    image: '',
    category: 'Pizza',
    price: '$11.50',
    description: 'Thin crust pizza with fresh vegetables and mozzarella.',
    stock: false,
    calories: 630,
    nutrition: { protein: '18g', carbs: '70g', fat: '22g' },
  },
  {
    id: 3,
    name: 'Grilled Chicken Wrap',
    image: '',
    category: 'Wraps',
    price: '$7.50',
    description: 'Whole wheat wrap filled with grilled chicken and greens.',
    stock: true,
    calories: 550,
    nutrition: { protein: '30g', carbs: '35g', fat: '20g' },
  },
  {
    id: 4,
    name: 'Crispy French Fries',
    image: '',
    category: 'Snacks',
    price: '$3.50',
    description: 'Golden and crispy potato fries served with ketchup.',
    stock: true,
    calories: 400,
    nutrition: { protein: '4g', carbs: '50g', fat: '22g' },
  },
  {
    id: 5,
    name: 'Chocolate Milkshake',
    image: '',
    category: 'Drinks',
    price: '$4.75',
    description: 'Thick chocolate milkshake topped with whipped cream.',
    stock: true,
    calories: 520,
    nutrition: { protein: '8g', carbs: '60g', fat: '25g' },
  },
  {
    id: 6,
    name: 'Margherita Pizza',
    image: '',
    category: 'Pizza',
    price: '$10.00',
    description: 'Classic margherita with tomato, basil, and mozzarella.',
    stock: true,
    calories: 600,
    nutrition: { protein: '20g', carbs: '65g', fat: '18g' },
  },
  {
    id: 7,
    name: 'Spicy Chicken Wings',
    image: '',
    category: 'Snacks',
    price: '$7.99',
    description: 'Hot and spicy wings served with ranch dip.',
    stock: false,
    calories: 750,
    nutrition: { protein: '28g', carbs: '10g', fat: '60g' },
  },
  {
    id: 8,
    name: 'Fresh Orange Juice',
    image: '',
    category: 'Drinks',
    price: '$3.99',
    description: 'Cold-pressed fresh orange juice without added sugar.',
    stock: true,
    calories: 120,
    nutrition: { protein: '2g', carbs: '26g', fat: '0g' },
  },
  {
    id: 9,
    name: 'Double Beef Burger',
    image:'',
    category: 'Burger',
    price: '$10.99',
    description: 'Two grilled beef patties, double cheese, and sauces.',
    stock: true,
    calories: 880,
    nutrition: { protein: '35g', carbs: '45g', fat: '55g' },
  },
  {
    id: 10,
    name: 'Caesar Salad',
    image: '',
    category: 'Salad',
    price: '$6.50',
    description: 'Romaine lettuce, parmesan, croutons, and Caesar dressing.',
    stock: true,
    calories: 350,
    nutrition: { protein: '10g', carbs: '15g', fat: '28g' },
  },
  {
    id: 11,
    name: 'Brownie Sundae',
    image: '',
    category: 'Desserts',
    price: '$5.25',
    description:
      'Warm brownie topped with vanilla ice cream and chocolate sauce.',
    stock: true,
    calories: 620,
    nutrition: { protein: '6g', carbs: '75g', fat: '30g' },
  },
  {
    id: 12,
    name: 'Falafel Wrap',
    image: '',
    category: 'Wraps',
    price: '$6.75',
    description:
      'Crispy falafel with tahini sauce and fresh veggies in a wrap.',
    stock: true,
    calories: 480,
    nutrition: { protein: '14g', carbs: '40g', fat: '22g' },
  },
];

const MenuManagement = ({ navigation }) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('All Categories');
  const [menuItems, setMenuItems] = useState([]);
  const [loading, setLoading] = useState(true);

  // Load items on screen mount
  useEffect(() => {
    loadMenuItems();
  }, []);

  const loadMenuItems = async () => {
    try {
      const stored = await AsyncStorage.getItem('@food_items');
      const parsed = stored ? JSON.parse(stored) : [];
      console.log('menu', parsed);
      setMenuItems(parsed);
    } catch (error) {
      console.error('Error loading food items:', error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <SafeAreaView style={styles.container}>
        {Platform.OS === 'ios' && (
              <View style={{ height: 44, backgroundColor: '#fff' }} />
            )}
            <StatusBar backgroundColor="#fff" barStyle="dark-content" />
      
      <TouchableWithoutFeedback
        onPress={() => {
          Keyboard.dismiss(); // Close keyboard
          setShowDropdown(false); // Close dropdown
        }}
      >
          <ScrollView contentContainerStyle={styles.scrollContainer}>
            <View style={styles.header}>
              <Text style={styles.title}>Menu Management</Text>
              <Text style={styles.description}>
                View, edit and organize your restaurant's menu items.
              </Text>
            </View>

            {/* Search & Filter */}
            <View style={styles.searchFilterContainer}>
              <View style={styles.searchBox}>
                <Icon name="magnify" size={20} color="#888" />
                <TextInput
                  style={styles.searchInput}
                  placeholder="Search food items..."
                  placeholderTextColor="#aaa"
                />
              </View>

              <TouchableOpacity
                style={styles.dropdown}
                onPress={() => setShowDropdown(!showDropdown)}
              >
                <Icon name="filter-variant" size={18} color="#fff" />
                <Text style={styles.dropdownText}>{selectedCategory}</Text>
                <Icon name="chevron-down" size={18} color="#fff" />
              </TouchableOpacity>
            </View>
            {showDropdown && (
              <View style={styles.dropdownList}>
                {['All Categories', 'Burger', 'Pizza', 'Drinks', 'Snacks'].map(
                  (cat, i) => (
                    <TouchableOpacity
                      key={i}
                      style={styles.dropdownItem}
                      onPress={() => {
                        setSelectedCategory(cat);
                        setShowDropdown(false);
                      }}
                    >
                      <Text style={styles.dropdownItemText}>{cat}</Text>
                    </TouchableOpacity>
                  ),
                )}
              </View>
            )}

            {/* Quick Filters */}
            <View style={styles.quickFilters}>
              {categoryData.map((item, index) => (
                <TouchableOpacity
                  key={index}
                  style={[
                    styles.filterTag,
                    { backgroundColor: item.color + '22' },
                  ]} // transparent background
                >
                  <Icon name={item.icon} size={16} color={item.color} />
                  <Text style={[styles.filterText, { color: item.color }]}>
                    {item.name} ({item.count})
                  </Text>
                </TouchableOpacity>
              ))}
            </View>

            {/* Food List Header */}
            <View style={styles.listHeader}>
              <Text style={styles.sectionTitle}>
                All Items ({foodItems.length})
              </Text>
            </View>

            {/* Food List */}
            {menuItems.map(item => (
              <View key={item.menuId} style={styles.foodCard}>
                <Image source={item.image} style={styles.foodImage} />
                <View style={styles.foodInfo}>
                  <Text style={styles.foodName}>{item.name}</Text>
                  <Text style={styles.foodCategory}>{item.category}</Text>
                  <Text style={styles.foodPrice}>${item.basePrice}</Text>
                  <Text style={styles.foodDescription}>{item.description}</Text>
                  <Text
                    style={[
                      styles.stockStatus,
                      { color: item.inStock ? '#00A896' : '#E63946' },
                    ]}
                  >
                    {item.inStock ? 'In Stock' : 'Out of Stock'}
                  </Text>
                  <TouchableOpacity
                    style={styles.editButton}
                    onPress={() => {
                      navigation.navigate('AddNewItemScreen', {
                        item: item,
                      });
                    }}
                  >
                    <Icon name="pencil" size={16} color="#fff" />
                    <Text style={styles.editText}>Edit</Text>
                  </TouchableOpacity>
                </View>
              </View>
            ))}
          </ScrollView>
      </TouchableWithoutFeedback>
    </SafeAreaView>
  );
};

export default MenuManagement;
