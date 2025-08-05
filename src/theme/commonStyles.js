import colors from './colors';
import fonts from './fonts';
import metrics from './metrics';

import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  centeredContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.background,
  },
  input: {
    borderWidth: 1,
    borderColor: colors.text,
    borderRadius: metrics.borderRadius,
    padding: metrics.padding,
    fontSize: fonts.sizes.medium,
  },
  screenPadding: {
    paddingHorizontal: metrics.screenPadding,
  },
});
