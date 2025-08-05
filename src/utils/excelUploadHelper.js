// import DocumentPicker from 'react-native-document-picker';
// import XLSX from 'xlsx';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import { Alert } from 'react-native';

// export const handleExcelUpload = async () => {
//   try {
//     const res = await DocumentPicker.pickSingle({
//       type: [DocumentPicker.types.allFiles],
//     });

//     const fileUri = res.uri;

//     const response = await fetch(fileUri);
//     const data = await response.arrayBuffer();

//     const workbook = XLSX.read(data, { type: 'array' });
//     const sheetName = workbook.SheetNames[0];
//     const sheet = workbook.Sheets[sheetName];
//     const jsonData = XLSX.utils.sheet_to_json(sheet);

//     if (!jsonData.length) {
//       Alert.alert('Invalid File', 'Excel file is empty or incorrect format.');
//       return;
//     }

//     // Get existing items
//     const existing = await AsyncStorage.getItem('@food_items');
//     const existingItems = existing ? JSON.parse(existing) : [];

//     // Convert Excel rows to valid food item structure
//     const newItems = jsonData.map((row, index) => ({
//       menuId: `item_${String(existingItems.length + index + 1).padStart(3, '0')}`,
//       name: row['name'] || '',
//       description: row['description'] || '',
//       basePrice: parseFloat(row['basePrice'] || 0),
//       discountPrice: parseFloat(row['discountPrice'] || row['basePrice'] || 0),
//       category: row['category'] || '',
//       imageUrl: row['imageUrl'] || '',
//       mandatoryOptions: JSON.parse(row['mandatoryOptions'] || '[]'), // must be JSON string
//       addons: JSON.parse(row['addons'] || '[]'), // must be JSON string
//       inStock: row['inStock'] === 'true' || row['inStock'] === true,
//     }));

//     const updatedList = [...existingItems, ...newItems];

//     await AsyncStorage.setItem('@food_items', JSON.stringify(updatedList));

//     Alert.alert('Success', `${newItems.length} items uploaded successfully!`);
//   } catch (err) {
//     if (DocumentPicker.isCancel(err)) {
//       console.log('User cancelled file picker');
//     } else {
//       console.error('Error uploading Excel:', err);
//       Alert.alert('Error', 'Failed to upload Excel file.');
//     }
//   }
// };
