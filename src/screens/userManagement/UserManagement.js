import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Switch,
  StatusBar,
  Platform,
  Modal,
} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AntIcon from 'react-native-vector-icons/AntDesign';
import FeatherIcon from 'react-native-vector-icons/Feather';
import styles from './styles';
import { SafeAreaView } from 'react-native-safe-area-context';
import AppButton from '../../components/AppButton/AppButton';
import { TextInputBox } from '../../components/TextInputBox/TextInputBox';
import StatusBadge from '../../components/StatusBadge/StatusBadge';
import { Picker } from '@react-native-picker/picker';
import AsyncStorage from '@react-native-async-storage/async-storage';

const UserManagement = () => {
  // Load items on screen mount
  useEffect(() => {
    loadUserData();
  }, []);

  const loadUserData = async () => {
    try {
      const stored = await AsyncStorage.getItem('@user_info');
      const parsed = stored ? JSON.parse(stored) : [];
      setAppName(parsed.applicationName);
      setAdminName(parsed.name);
      setAdminEmail(parsed.email);
    } catch (error) {
      console.error('Error loading food items:', error);
    } finally {
    }
  };
  const [appName, setAppName] = useState('');
  const [adminName, setAdminName] = useState('');
  const [adminEmail, setAdminEmail] = useState('');
  const [adminPhone, setAdminPhone] = useState('');
  const [category, setCategory] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [mandatoryOptions, setMandatoryOptions] = useState([]);
  const [addons, setAddons] = useState([]);
  const [newOption, setNewOption] = useState('');
  const [newAddon, setNewAddon] = useState('');
  const [calories, setCalories] = useState('');
  const [inStock, setInStock] = useState(true);

  //   user management props

  // 1. Define user list at top (below useState)
  const userList = [
    {
      id: '1',
      name: 'John Doe',
      email: 'john@example.com',
      phone: '123-456-7890',
      role: 'Manager',
      status: 'Activated',
    },
    {
      id: '2',
      name: 'Jane Smith',
      email: 'jane@example.com',
      phone: '555-123-4567',
      role: 'Staff',
      status: 'Deactivated',
    },
    {
      id: '3',
      name: 'Ali Khan',
      email: 'ali.khan@example.com',
      phone: '987-654-3210',
      role: 'Staff',
      status: 'Activated',
    },
  ];
  const [users, setUsers] = useState(userList);
  const [isUserModalVisible, setUserModalVisible] = useState(false);
  const [newUser, setNewUser] = useState({
    name: '',
    email: '',
    phone: '',
    role: '',
    status: 'Activated',
  });
  //  add-ons modal prop
  const [isModalVisible, setModalVisible] = useState(false);
  const [selectedOption, setSelectedOption] = useState('1'); // 1 for Mandatory  2 for Add-ons
  const [newOptionName, setNewOptionName] = useState('');
  const [newOptionPrice, setNewOptionPrice] = useState('');
  const addMandatoryOption = () => {
    if (newOption.trim()) {
      setMandatoryOptions([...mandatoryOptions, newOption.trim()]);
      setNewOption('');
    }
  };

  const addAddon = () => {
    if (newAddon.trim()) {
      setAddons([...addons, newAddon.trim()]);
      setNewAddon('');
    }
  };

  const handleSubmit = () => {
    // handle form submit logic
  };

  return (
    <SafeAreaView style={styles.container}>
      {Platform.OS === 'ios' && (
        <View style={{ height: 44, backgroundColor: '#fff' }} />
      )}
      <StatusBar backgroundColor="#fff" barStyle="dark-content" />

      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.header}>
          <Text style={styles.title}>Account Management</Text>
          <Text style={styles.description}>
            Manage your admin profile and application settings
          </Text>
        </View>

        {/* Application Settings */}
        <View style={[styles.shadowView]}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
            }}
          >
            <Ionicons name="settings" size={18} color="#FF6B35" />
            <Text
              style={[
                styles.sectionTitle,
                { marginLeft: 10, marginTop: 0, marginBottom: 0 },
              ]}
            >
              Application Settings
            </Text>
          </View>
          <View style={styles.imageRow}>
            <TextInputBox
              inputContainerStyle={{ flex: 1 }}
              placeholder="Application Name"
              value={appName}
              onChangeText={setImageUrl}
              label={'Application Name'}
              showLeftIcon={false}
              multiline={true}
            />
            <TouchableOpacity style={styles.iconBtn}>
              <AntIcon name="edit" size={24} color="#FF6B35" />
            </TouchableOpacity>
          </View>
        </View>
        {/* Admin Profile */}
        <View style={[styles.shadowView, { marginVertical: 10 }]}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
            }}
          >
            <Ionicons name="settings" size={18} color="#FF6B35" />
            <Text
              style={[
                styles.sectionTitle,
                { marginLeft: 10, marginTop: 0, marginBottom: 0 },
              ]}
            >
              Admin Profile
            </Text>
          </View>
          <View style={styles.imageRow}>
            <TextInputBox
              inputContainerStyle={{ flex: 1 }}
              placeholder="Admin User"
              value={adminName}
              onChangeText={setImageUrl}
              label={'Admin User'}
              leftIcon="person"
            />
            <TouchableOpacity style={styles.iconBtn}>
              <AntIcon name="edit" size={24} color="#FF6B35" />
            </TouchableOpacity>
          </View>
          <View style={styles.imageRow}>
            <TextInputBox
              inputContainerStyle={{ flex: 1 }}
              placeholder="Admin Email"
              value={adminEmail}
              onChangeText={setImageUrl}
              label={'Admin Email'}
              leftIcon="email"
            />
            <TouchableOpacity style={styles.iconBtn}>
              <AntIcon name="edit" size={24} color="#FF6B35" />
            </TouchableOpacity>
          </View>

          <View style={styles.imageRow}>
            <TextInputBox
              inputContainerStyle={{ flex: 1 }}
              placeholder="Admin Phone"
              value={imageUrl}
              onChangeText={setImageUrl}
              label={'Admin Phone'}
              leftIcon="phone"
            />
            <TouchableOpacity style={styles.iconBtn}>
              <AntIcon name="edit" size={24} color="#FF6B35" />
            </TouchableOpacity>
          </View>
        </View>
        {/* User Management */}
        <View style={[styles.shadowView, { marginVertical: 10 }]}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
              }}
            >
              <FeatherIcon name="users" size={18} color="#FF6B35" />
              <Text
                style={[
                  styles.sectionTitle,
                  { marginLeft: 10, marginTop: 0, marginBottom: 0 },
                ]}
              >
                User Management
              </Text>
            </View>
            <TouchableOpacity
              style={styles.iconBtn}
              onPress={() => setUserModalVisible(true)}
            >
              <AntIcon name="pluscircle" size={24} color="#FF6B35" />
            </TouchableOpacity>
          </View>

          {users.map(user => (
            <View key={user.id} style={styles.userCard}>
              <View style={{ flex: 1 }}>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                  }}
                >
                  <Text style={styles.userName}>{user.name}</Text>
                  <StatusBadge status={user.role} />
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                  }}
                >
                  <View>
                    <Text style={styles.userInfo}>{user.email}</Text>
                    <Text style={styles.userInfo}>{user.phone}</Text>
                    <StatusBadge status={user.status} />
                  </View>
                  <View
                    style={{
                      justifyContent: 'space-between',
                      paddingVertical: 4,
                    }}
                  >
                    <TouchableOpacity style={{ justifyContent: 'center' }}>
                      <FeatherIcon name="edit" size={20} color="#FF6B35" />
                    </TouchableOpacity>
                    <TouchableOpacity style={{ justifyContent: 'center' }}>
                      <FeatherIcon name="trash" size={20} color="#FF6B35" />
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </View>
          ))}
        </View>
      </ScrollView>
      <Modal
        animationType="slide"
        transparent={true}
        visible={isUserModalVisible}
        onRequestClose={() => setUserModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>Add New User</Text>
            <TextInput
              style={styles.modalInput}
              placeholder="Full Name"
              value={newUser.name}
              onChangeText={text => setNewUser({ ...newUser, name: text })}
              placeholderTextColor="#888"
              maxLength={50}
            />
            <TextInput
              style={styles.modalInput}
              placeholder="Email"
              value={newUser.email}
              onChangeText={text => setNewUser({ ...newUser, email: text })}
              keyboardType="email-address"
              placeholderTextColor="#888"
              maxLength={50}
            />
            <TextInput
              style={styles.modalInput}
              placeholder="Phone"
              value={newUser.phone}
              onChangeText={text => setNewUser({ ...newUser, phone: text })}
              keyboardType="phone-pad"
              placeholderTextColor="#888"
              maxLength={50}
            />
            <View style={styles.pickerContainer}>
              <Picker
                selectedValue={newUser.role}
                onValueChange={itemValue =>
                  setNewUser({ ...newUser, role: itemValue })
                }
                style={styles.picker}
              >
                <Picker.Item label="Select Role" value="" />
                <Picker.Item label="Manager" value="Manager" />
                <Picker.Item label="Chef" value="Chef" />
                <Picker.Item label="Waiter" value="Waiter" />
                <Picker.Item label="Cashier" value="Cashier" />
                <Picker.Item label="Delivery" value="Delivery" />
                <Picker.Item label="Cleaner" value="Cleaner" />
                <Picker.Item label="Receptionist" value="Receptionist" />
                <Picker.Item label="Inventory Clerk" value="Inventory Clerk" />
              </Picker>
            </View>

            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginBottom: 15,
              }}
            >
              <Text style={{ fontSize: 14 }}>Status: {newUser.status}</Text>
              <Switch
                trackColor={{ false: '#ccc', true: '#4cd137' }}
                thumbColor={newUser.status === 'Activated' ? '#fff' : '#fff'}
                ios_backgroundColor="#ccc"
                onValueChange={val =>
                  setNewUser({
                    ...newUser,
                    status: val ? 'Activated' : 'Deactivated',
                  })
                }
                value={newUser.status === 'Activated'}
              />
            </View>

            <View style={styles.modalActions}>
              <TouchableOpacity
                style={[styles.modalBtn, { backgroundColor: '#ccc' }]}
                onPress={() => setUserModalVisible(false)}
              >
                <Text style={styles.modalBtnText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.modalBtn, { backgroundColor: '#FF6B35' }]}
                onPress={() => {
                  if (
                    newUser.name &&
                    newUser.email &&
                    newUser.phone &&
                    newUser.role
                  ) {
                    setUsers([
                      ...users,
                      { ...newUser, id: Date.now().toString() },
                    ]);
                    setNewUser({
                      name: '',
                      email: '',
                      phone: '',
                      role: '',
                      status: 'Activated',
                    });
                    setUserModalVisible(false);
                  }
                }}
              >
                <Text style={[styles.modalBtnText, { color: '#fff' }]}>
                  Add
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

export default UserManagement;
