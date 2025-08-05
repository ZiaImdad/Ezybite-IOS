import React, { useState } from 'react';
import { View, TextInput, Text, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import styles from './styles';
export const TextInputBox = ({
  label,
  placeholder,
  value,
  onChangeText,
  onFocus,
  secureTextEntry,
  keyboardType,
  showHelpIcon,
  maxLength = 50,
  onHelpPress,
  inputContainerStyle,
  inputBoxStyle,
  error,
  editable = true,
  showLeftIcon = true,
  leftIcon = '',
}) => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const showError = !!error;
  const isPasswordField = secureTextEntry;

  return (
    <View style={[styles.mainContainer, inputContainerStyle]}>
      {label && (
        <View style={styles.labelBox}>
          <Text style={styles.label}>{label}</Text>
          {showHelpIcon && (
            <TouchableOpacity onPress={onHelpPress}>
              <Icon name="help-outline" size={20} color="#000" />
            </TouchableOpacity>
          )}
        </View>
      )}
      <View style={styles.textInputContainer}>
        {showLeftIcon && (
          <Icon
            name={leftIcon}
            size={20}
            color="#000"
            style={{ marginHorizontal: 10 }}
          />
        )}

        <TextInput
          value={value}
          placeholder={placeholder}
          onChangeText={onChangeText}
          onFocus={onFocus}
          maxLength={maxLength}
          secureTextEntry={isPasswordField && !isPasswordVisible}
          keyboardType={keyboardType}
          editable={editable}
          placeholderTextColor="#888"
          style={[
            styles.textInputBox,
            inputBoxStyle,
            !showLeftIcon && { paddingLeft: 14 },
            showError && { borderColor: 'red' },
            !editable && { opacity: 0.6 },
          ]}
        />

        {isPasswordField && (
          <TouchableOpacity
            onPress={() => setIsPasswordVisible(prev => !prev)}
            style={{ paddingHorizontal: 10 }}
          >
            <Icon
              name={isPasswordVisible ? 'visibility' : 'visibility-off'}
              size={20}
              color="#000"
            />
          </TouchableOpacity>
        )}
      </View>

      {showError && <Text style={styles.errorText}>{error}</Text>}
    </View>
  );
};
