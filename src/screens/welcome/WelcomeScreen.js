import React from 'react';
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Platform,
  StatusBar,
} from 'react-native';
import styles from './styles';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'; // for feature icons
import MIcon from 'react-native-vector-icons/MaterialIcons'; // for app logo

const features = [
  {
    icon: 'silverware-fork-knife',
    title: 'Menu Management',
    description: 'Easily update food items, set categories, manage mandatory options and add-ons.',
    color: '#FF6B35',
  },
  {
    icon: 'truck-delivery-outline',
    title: 'Order Tracking',
    description: 'Track orders from kitchen to customer with real-time status.',
    color: '#00A896',
  },
  {
    icon: 'message-text-outline',
    title: 'Review Management',
    description: 'Monitor customer feedback and rating to improve your service.',
    color: '#3D5A80',
  },
  {
    icon: 'chart-bar',
    title: 'Analytics Management',
    description: 'Visualize sales, trends, and performance metrics easily.',
    color: '#F4A261',
  },
];

const WelcomeScreen = ({navigation}) => {
  return (
    <SafeAreaView style={styles.container}>
      {Platform.OS === 'ios' && (
        <View style={{ height: 44, backgroundColor: '#fff' }} />
      )}
      <StatusBar backgroundColor="#fff" barStyle="dark-content" />

      <View style={{ flex: 1, padding: 24 }}>
        {/* Scrollable content */}
        <ScrollView
          contentContainerStyle={{ paddingBottom: 20 }}
          showsVerticalScrollIndicator={false}
        >
          {/* App Logo */}
          <View style={styles.logoContainer}>
            <View style={styles.logoCircle}>
              <MIcon name="fastfood" size={50} color="#fff" />
            </View>
            <Text style={styles.logoText}>Ezybite</Text>
            <Text style={styles.descritpion}>
              Manage your restaurant with ease
            </Text>
          </View>

          {/* Feature list */}
          <View style={styles.featureList}>
            {features.map((feature, index) => (
              <View key={index} style={styles.featureItem}>
                <Icon
                  name={feature.icon}
                  size={30}
                  color={feature.color}
                  style={styles.featureIcon}
                />
                <View style={styles.featureContent}>
                  <Text style={styles.featureTitle}>{feature.title}</Text>
                  <Text style={styles.featureDescription}>
                    {feature.description}
                  </Text>
                </View>
              </View>
            ))}
          </View>
        </ScrollView>

        {/* Fixed bottom section */}
        <View style={{ paddingTop: 10 }}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate('LoginScreen')}
          >
            <Text style={styles.buttonText}>Get Started</Text>
          </TouchableOpacity>
          <Text style={styles.descritpion}>
            Start managing your restaurant today
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default WelcomeScreen;
