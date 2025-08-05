import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  mainContainer: {
    marginTop: 10,
  },
  labelBox: {
    flexDirection: 'row',
  },
  label: {
    fontSize: 14,
    fontWeight: '500',
    color: '#000',
    marginRight: 4,
  },
  textInputContainer: {
    borderWidth: 1,
    borderColor: '#A1A1A1',
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderRadius:10,
    marginTop:6
  },
  textInputBox: {
    height: 50,
    paddingVertical: 10,
    fontSize: 14,
    marginTop: 0,
    color: '#000',
    flex: 6,
  },
  errorText: {
    color: 'red',
    fontSize: 12,
    marginTop: 4,
  },
});
