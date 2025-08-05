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
  Alert,
} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FeatherIcon from 'react-native-vector-icons/Feather';
import { launchImageLibrary } from 'react-native-image-picker';
import AntIcon from 'react-native-vector-icons/AntDesign';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import styles from './styles';
import { SafeAreaView } from 'react-native-safe-area-context';
import AppButton from '../../components/AppButton/AppButton';
import { TextInputBox } from '../../components/TextInputBox/TextInputBox';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AddFoodItemScreen = ({ navigation, route }) => {
  const [name, setName] = useState('');
  const [desc, setDesc] = useState('');
  const [price, setPrice] = useState('');
  const [discountPrice, setDiscountPrice] = useState('');
  const [category, setCategory] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [mandatoryOptions, setMandatoryOptions] = useState([]);
  const [addons, setAddons] = useState([]);
  const [selectedAddonIndex, setSelectedAddonIndex] = useState('');
  const [inStock, setInStock] = useState(true);
  const [newOption, setNewOption] = useState({
    sectionName: '',
    required: true,
    options: [],
  });

  const [tempOption, setTempOption] = useState({ name: '', price: '' });
  const resetAddonForm = () => {
    setNewOptionName('');
    setNewOptionPrice('');
    setSelectedAddonIndex(null);
  };
  useEffect(() => {
    if (route?.params?.item) {
      const item = route.params.item;
      console.log(item);
      setName(item.name || '');
      setDesc(item.description || '');
      setPrice(item.basePrice?.toString() || '');
      setDiscountPrice(item.discountPrice?.toString() || '');
      setCategory(item.category || '');
      setImageUrl(item.image || '');
      setMandatoryOptions(item.mandatoryOptions || []);
      setAddons(item.addons || []);
      setInStock(item.inStock ?? true);

      // Store the item for update later
      setEditingItemId(item.menuId);
    }
  }, [route?.params?.item]);

  const [editingItemId, setEditingItemId] = useState(null);

  //  add-ons modal prop
  const [isAddOnsModalVisible, setAddOnsModalVisible] = useState(false);
  const [isMandatoryModalVisible, setMandatoryModalVisible] = useState(false);
  const [newOptionName, setNewOptionName] = useState('');
  const [newOptionPrice, setNewOptionPrice] = useState('');
  const handleSubmit = async () => {
    console.log('stock', inStock);
    if (!name || !price || !category) {
      Alert.alert('Missing Fields', 'Please fill required fields.');
      return;
    }

    try {
      const existing = await AsyncStorage.getItem('@food_items');
      const items = existing ? JSON.parse(existing) : [];

      const updatedItem = {
        menuId:
          editingItemId || `item_${String(items.length + 1).padStart(3, '0')}`,
        name,
        description: desc,
        basePrice: parseFloat(price),
        discountPrice: parseFloat(discountPrice || price),
        category,
        image: imageUrl,
        mandatoryOptions,
        addons,
        inStock,
      };

      let updatedItems;
      if (editingItemId) {
        // Replace existing item
        updatedItems = items.map(item =>
          item.menuId === editingItemId ? updatedItem : item,
        );
      } else {
        // New item
        updatedItems = [...items, updatedItem];
      }

      await AsyncStorage.setItem('@food_items', JSON.stringify(updatedItems));
      navigation.goBack();

      resetForm();
    } catch (err) {
      console.error(err);
      Alert.alert('Error', 'Failed to save item.');
    }
  };

  const resetForm = () => {
    setName('');
    setDesc('');
    setPrice('');
    setDiscountPrice('');
    setCategory('');
    setImageUrl('');
    setMandatoryOptions([]);
    setAddons([]);
    setInStock(true);
  };
  const handleImagePick = () => {
    const options = {
      mediaType: 'photo',
      maxWidth: 800,
      maxHeight: 800,
      quality: 0.8,
      selectionLimit: 1,
    };

    launchImageLibrary(options, response => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.errorCode) {
        console.log('ImagePicker Error: ', response.errorMessage);
      } else if (response.assets && response.assets.length > 0) {
        const pickedImage = response.assets[0];
        console.log('Picked image:', pickedImage.uri);
        setImageUrl(pickedImage.uri); // ✅ set to your state
      }
    });
  };
  // Track which section index is being edited. `null` means adding new
  const [editingIndex, setEditingIndex] = useState(null);
  // 👇 Function to delete section by index
  const onDeleteSection = sectionIndex => {
    setMandatoryOptions(prevOptions =>
      prevOptions.filter((_, index) => index !== sectionIndex),
    );
  };
  const onEditSection = index => {
    const section = mandatoryOptions[index];
    setNewOption(section); // populate modal with existing data
    setEditingIndex(index);
    setMandatoryModalVisible(true);
  };

  return (
    <SafeAreaView style={styles.container}>
      {Platform.OS === 'ios' && (
        <View style={{ height: 44, backgroundColor: '#fff' }} />
      )}
      <StatusBar backgroundColor="#fff" barStyle="dark-content" />

      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.header}>
          <Text style={styles.title}>Add New Food Item</Text>
          <Text style={styles.description}>
            Create a new menu item with options and add-ons.
          </Text>
        </View>

        {/* Basic Info */}
        <View style={[styles.shadowView]}>
          <Text style={[styles.sectionTitle, { marginTop: 10 }]}>
            Basic Information
          </Text>
          <TextInputBox
            placeholder="Name"
            value={name}
            onChangeText={setName}
            label={'Food Name'}
            showLeftIcon={false}
          />
          <TextInputBox
            placeholder="Description"
            value={desc}
            onChangeText={setDesc}
            label={'Description'}
            showLeftIcon={false}
            multiline={true}
            maxLength={200}
          />
          <View
            style={{ flexDirection: 'row', justifyContent: 'space-between' }}
          >
            <TextInputBox
              inputContainerStyle={{ width: '49%' }}
              placeholder="Price"
              keyboardType="numeric"
              value={price}
              onChangeText={setPrice}
              label={'Price'}
              showLeftIcon={false}
              multiline={true}
            />
            <TextInputBox
              inputContainerStyle={{ width: '49%' }}
              placeholder="Discount Price"
              keyboardType="numeric"
              value={discountPrice}
              onChangeText={setDiscountPrice}
              label={'Discount Price'}
              showLeftIcon={false}
              multiline={true}
            />
          </View>
          <TextInputBox
            placeholder="Category (e.g. Pizza)"
            value={category}
            onChangeText={setCategory}
            label={'Category'}
            showLeftIcon={false}
            multiline={true}
          />

          <View style={styles.imageRow}>
            <TextInputBox
              inputContainerStyle={{ flex: 1 }}
              placeholder="Image URL"
              value={imageUrl}
              onChangeText={setImageUrl}
              label={'Food Image'}
              showLeftIcon={false}
              multiline={true}
            />
            <TouchableOpacity style={styles.iconBtn} onPress={handleImagePick}>
              <Icon name="image-plus" size={24} color="#6E7580" />
            </TouchableOpacity>
          </View>
        </View>
        {/* Mandatory Options */}
        <View style={[styles.shadowView, { marginVertical: 20 }]}>
          <View style={styles.addonHeaderRow}>
            <Text
              style={[styles.sectionTitle, { marginTop: 0, marginBottom: 0 }]}
            >
              Mandatory Options
            </Text>
            <TouchableOpacity
              onPress={() => {
                setMandatoryModalVisible(true);
              }}
              style={styles.addBtnRight}
            >
              <Icon name="plus" size={18} color="#FF6B35" />
              <Text style={styles.addBtnText}>Add Option</Text>
            </TouchableOpacity>
          </View>

          {mandatoryOptions.length === 0 ? (
            <Text style={{ color: '#888', marginTop: 10, textAlign: 'center' }}>
              No options added yet.
            </Text>
          ) : (
            mandatoryOptions.map((section, sectionIndex) => (
              <View key={sectionIndex} style={{ marginBottom: 15 }}>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    marginBottom: 5,
                  }}
                >
                  <Text style={{ fontWeight: '600', fontSize: 16 }}>
                    {section.sectionName}{' '}
                    {section.required && (
                      <Text style={{ color: '#D62828' }}>(Required)</Text>
                    )}
                  </Text>

                  <View style={{ flexDirection: 'row' }}>
                    {/* Edit Section */}
                    <TouchableOpacity
                      onPress={() => onEditSection(sectionIndex)}
                      style={{ marginRight: 15 }}
                    >
                      <FeatherIcon name="edit-2" size={20} color="#FF6B35" />
                    </TouchableOpacity>
                    {/* Delete Section */}
                    <TouchableOpacity
                      onPress={() => onDeleteSection(sectionIndex)}
                    >
                      <FeatherIcon name="trash-2" size={20} color="#D62828" />
                    </TouchableOpacity>
                  </View>
                </View>

                {section.options?.map((opt, optionIndex) => (
                  <View
                    key={optionIndex}
                    style={{
                      paddingVertical: 6,
                      paddingHorizontal: 12,
                      backgroundColor: '#F2F2F2',
                      borderRadius: 6,
                      marginBottom: 6,
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                    }}
                  >
                    <Text style={{ color: '#333' }}>{opt.name}</Text>
                    <View
                      style={{ flexDirection: 'row', alignItems: 'center' }}
                    >
                      <Text style={{ color: '#777', marginRight: 15 }}>
                        ${opt.price}
                      </Text>
                    </View>
                  </View>
                ))}
              </View>
            ))
          )}
        </View>

        {/* Add-ons */}
        <View style={styles.shadowView}>
          <View style={styles.addonHeaderRow}>
            <Text
              style={[styles.sectionTitle, { marginTop: 0, marginBottom: 0 }]}
            >
              Add-ons
            </Text>
            <TouchableOpacity
              onPress={() => {
                setAddOnsModalVisible(true);
              }}
              style={styles.addBtnRight}
            >
              <Icon name="plus" size={18} color="#FF6B35" />
              <Text style={styles.addBtnText}>Add Option</Text>
            </TouchableOpacity>
          </View>

          {/* Add-ons List */}
          {addons.length === 0 ? (
            <Text style={{ color: '#888', marginTop: 10, textAlign: 'center' }}>
              No options added yet.
            </Text>
          ) : (
            addons.map((addon, index) => (
              <View
                key={index}
                style={[
                  styles.tag,
                  {
                    flexDirection: 'row',
                    alignItems: 'center',
                    backgroundColor: '#F2F2F2',
                  },
                ]}
              >
                <Text style={{ color: '#333', flex: 1 }}>
                  {addon.name} (${addon.price})
                </Text>
                <TouchableOpacity
                  onPress={() => {
                    // Edit logic (optional)
                    // e.g. set selected addon for editing and open modal
                    setSelectedAddonIndex(index);
                    setNewOptionName(addon.name);
                    setNewOptionPrice(addon.price.toString());
                    setAddOnsModalVisible(true);
                  }}
                  style={{ marginRight: 8 }}
                >
                  <AntIcon name="edit" size={18} color="#FF6B35" />
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    setAddons(prev => prev.filter((_, i) => i !== index));
                  }}
                >
                  <AntIcon name="delete" size={18} color="#D62828" />
                </TouchableOpacity>
              </View>
            ))
          )}
        </View>

        <View style={[styles.switchRow, { marginBottom: 0 }]}>
          <Text style={styles.label}>In Stock</Text>
          <Switch value={inStock} onValueChange={setInStock} />
        </View>
        <AppButton
          onTouch={handleSubmit}
          title={editingItemId ? 'Update Item' : 'Save Item'}
        />
      </ScrollView>
      <Modal
        animationType="slide"
        transparent={true}
        visible={isMandatoryModalVisible}
        onRequestClose={() => setMandatoryModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>
              {editingIndex !== null
                ? 'Edit Mandatory Section'
                : 'Add Mandatory Section'}
            </Text>

            {/* Section Name Input */}
            <TextInput
              style={styles.modalInput}
              placeholder="Section Name (e.g. Choose Size)"
              value={newOption.sectionName}
              onChangeText={text =>
                setNewOption(prev => ({ ...prev, sectionName: text }))
              }
            />

            {/* Required Toggle */}
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginBottom: 12,
              }}
            >
              <Text>Is Required?</Text>
              <Switch
                value={newOption.required}
                onValueChange={val =>
                  setNewOption(prev => ({ ...prev, required: val }))
                }
              />
            </View>

            {/* Add Option Input */}
            <View style={{ flexDirection: 'row', marginBottom: 10 }}>
              <TextInput
                style={[styles.modalInput, { flex: 1, marginRight: 8 }]}
                placeholder="Option Name"
                value={tempOption.name}
                onChangeText={text =>
                  setTempOption(prev => ({ ...prev, name: text }))
                }
              />
              <TextInput
                style={[styles.modalInput, { width: 80 }]}
                placeholder="$"
                keyboardType="numeric"
                value={tempOption.price}
                onChangeText={text =>
                  setTempOption(prev => ({ ...prev, price: text }))
                }
              />
              <TouchableOpacity
                style={[styles.iconBtn, { marginLeft: 8 }]}
                onPress={() => {
                  if (tempOption.name && tempOption.price) {
                    setNewOption(prev => ({
                      ...prev,
                      options: [...(prev.options || []), tempOption],
                    }));
                    setTempOption({ name: '', price: '' });
                  }
                }}
              >
                <AntIcon name="pluscircle" size={22} color="#FF6B35" />
              </TouchableOpacity>
            </View>

            {/* List of Options */}
            {newOption.options?.map((opt, idx) => (
              <View
                key={idx}
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  paddingVertical: 6,
                  borderBottomWidth: 1,
                  borderColor: '#eee',
                }}
              >
                <Text style={{ fontSize: 14 }}>{opt.name}</Text>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <Text
                    style={{ fontSize: 14, fontWeight: '600', marginRight: 15 }}
                  >
                    ${opt.price}
                  </Text>
                  <TouchableOpacity
                    onPress={() => {
                      setNewOption(prev => ({
                        ...prev,
                        options: prev.options.filter((_, i) => i !== idx),
                      }));
                    }}
                  >
                    <AntIcon name="closecircle" size={20} color="#D62828" />
                  </TouchableOpacity>
                </View>
              </View>
            ))}

            {/* Modal Actions */}
            <View style={styles.modalActions}>
              <TouchableOpacity
                style={[styles.modalBtn, { backgroundColor: '#ccc' }]}
                onPress={() => setMandatoryModalVisible(false)}
              >
                <Text style={styles.modalBtnText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.modalBtn, { backgroundColor: '#FF6B35' }]}
                onPress={() => {
                  if (
                    newOption.sectionName.trim() &&
                    newOption.options &&
                    newOption.options.length > 0
                  ) {
                    if (editingIndex !== null) {
                      // Editing existing section - update it
                      setMandatoryOptions(prev =>
                        prev.map((item, idx) =>
                          idx === editingIndex ? newOption : item,
                        ),
                      );
                    } else {
                      // Adding new section
                      setMandatoryOptions(prev => [...prev, newOption]);
                    }

                    // Reset modal state
                    setNewOption({
                      sectionName: '',
                      required: true,
                      options: [],
                    });
                    setTempOption({ name: '', price: '' });
                    setEditingIndex(null);
                    setMandatoryModalVisible(false);
                  }
                }}
              >
                <Text style={[styles.modalBtnText, { color: '#fff' }]}>
                  {editingIndex !== null ? 'Update' : 'Add'}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
      {/* add-ons modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={isAddOnsModalVisible}
        onRequestClose={() => {
          setAddOnsModalVisible(false);
          resetAddonForm();
        }}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>
              {selectedAddonIndex !== null ? 'Edit Add-on' : 'Add Add-on'}
            </Text>

            <TextInput
              style={styles.modalInput}
              placeholder="Add-on Name"
              value={newOptionName}
              onChangeText={setNewOptionName}
            />
            <TextInput
              style={styles.modalInput}
              placeholder="Price"
              value={newOptionPrice}
              onChangeText={setNewOptionPrice}
              keyboardType="numeric"
            />

            <View style={styles.modalActions}>
              <TouchableOpacity
                style={[styles.modalBtn, { backgroundColor: '#ccc' }]}
                onPress={() => {
                  setAddOnsModalVisible(false);
                  resetAddonForm();
                }}
              >
                <Text style={styles.modalBtnText}>Cancel</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.modalBtn, { backgroundColor: '#FF6B35' }]}
                onPress={() => {
                  if (!newOptionName.trim() || !newOptionPrice.trim()) {
                    // You can add alert or toast for empty validation here
                    return;
                  }

                  const updatedAddon = {
                    name: newOptionName.trim(),
                    price: parseFloat(newOptionPrice),
                  };

                  if (selectedAddonIndex !== null) {
                    // Edit mode - update existing add-on
                    setAddons(prev => {
                      const copy = [...prev];
                      copy[selectedAddonIndex] = updatedAddon;
                      return copy;
                    });
                  } else {
                    // Add mode - add new add-on
                    setAddons(prev => [...prev, updatedAddon]);
                  }

                  resetAddonForm();
                  setAddOnsModalVisible(false);
                }}
              >
                <Text style={[styles.modalBtnText, { color: '#fff' }]}>
                  {selectedAddonIndex !== null ? 'Update' : 'Add'}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

export default AddFoodItemScreen;
