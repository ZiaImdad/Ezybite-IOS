import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollContainer: {
    padding: 20,
    paddingBottom: 40,
  },
  header: {
    marginBottom: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: '700',
    color: '#333',
  },
  description: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
  },
  heading: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#FF6B35',
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginTop: 20,
    marginBottom: 8,
    color: '#333',
  },
  input: {
    borderWidth: 1,
    borderColor: '#A1A1A1',
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
    backgroundColor: '#F9F9F9',
  },
  imageRow: {
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
  iconBtn: {
    backgroundColor: '#F2F3F5',
    flexDirection: 'row',
    padding: 14,
    borderRadius: 10,
    marginLeft: 10,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    marginBottom: 10,
  },
  tag: {
    backgroundColor: '#FFEDD5',
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: 12,
    marginRight: 8,
    marginBottom: 5,
    color: '#333',
    alignSelf: 'flex-start',
  },
  switchRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 30,
  },
  label: {
    fontSize: 15,
    color: '#333',
  },
  submitBtn: {
    backgroundColor: '#FF6B35',
    padding: 14,
    borderRadius: 10,
    alignItems: 'center',
  },
  submitText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  // modal style
  addonHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10
  },

  addBtnRight: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF1E6',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 8,
  },

  addBtnText: {
    color: '#FF6B35',
    fontWeight: '600',
    marginLeft: 6,
    fontSize: 12,
  },

  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.3)',
  },

  modalContainer: {
    width: '85%',
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
    elevation: 5,
  },

  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 12,
    color: '#333',
  },

  modalInput: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 10,
    marginBottom: 12,
  },

  modalActions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: 10,
  },

  modalBtn: {
    paddingVertical: 10,
    paddingHorizontal: 18,
    borderRadius: 8,
  },

  modalBtnText: {
    fontSize: 14,
    fontWeight: '600',
  },
  // shadow view
  shadowView: {
    padding: 10,
    borderWidth: 0.4,
    borderColor: '#A1A1A1',
    borderRadius: 10,
    // iOS Shadow
    shadowColor: '#A1A1A1',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,

    // Android Shadow
    elevation: 3,

    backgroundColor: '#fff',
  },
});
