import { Text, TouchableOpacity, ActivityIndicator, View } from 'react-native';
import React from 'react';
import styles from './styles';

export const AppButton = ({
  title,
  loading = false,
  loadingText = 'Please wait...',
  loaderColor = '#fff',
  onTouch,
  style,
  disabled = false,
  buttonStyle = {}, // default to object to allow merging
  textStyle,
  buttonColor = '#FF6B35', // default color
  disabledColor = '#FFCBB3',
  loadingColor, // optional override when loading
  ...props
}) => {
  const finalButtonColor =
    loading && loadingColor
      ? loadingColor
      : disabled
      ? disabledColor
      : buttonColor;

  return (
    <TouchableOpacity
      style={[
        styles.button,
        { backgroundColor: finalButtonColor },
        buttonStyle,
        (disabled || loading) && styles.disabled,
      ]}
      onPress={onTouch}
      disabled={disabled || loading}
      {...props}
    >
      {loading ? (
        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
          <ActivityIndicator size="small" color={loaderColor} style={{ marginRight: 8 }} />
          <Text style={[styles.buttonText, textStyle]}>{loadingText}</Text>
        </View>
      ) : (
        <Text style={[styles.buttonText, textStyle]}>{title}</Text>
      )}
    </TouchableOpacity>
  );
};

export default AppButton;
