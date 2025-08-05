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
  searchFilterContainer: {
    flexDirection: 'row',
    marginBottom: 16,
    alignItems: 'center',
  },
  searchBox: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#f1f1f1',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 4,
    marginRight: 10,
    alignItems: 'center',
    height: 50,
  },
  searchInput: {
    marginLeft: 8,
    fontSize: 14,
    color: '#000',
    flex: 1,
  },
  quickFilters: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 20,
  },
  filterTag: {
    flexDirection: 'row',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    marginRight: 8,
    marginBottom: 10,
    alignItems: 'center',
  },
  filterText: {
    fontSize: 13,
    marginLeft: 6,
    fontWeight: '500',
  },
  listHeader: {
    marginBottom: 10,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#444',
  },
  foodCard: {
    flexDirection: 'row',
    backgroundColor: '#f9f9f9',
    borderRadius: 12,
    padding: 12,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOpacity: 0.03,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  foodImage: {
    width: 90,
    height: 90,
    borderRadius: 10,
    marginRight: 12,
  },
  foodInfo: {
    flex: 1,
  },
  foodName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000',
  },
  foodCategory: {
    fontSize: 12,
    color: '#888',
    marginVertical: 2,
  },
  foodPrice: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#FF6B35',
  },
  foodDescription: {
    fontSize: 13,
    color: '#555',
    marginVertical: 4,
  },
  stockStatus: {
    fontSize: 12,
    fontWeight: '500',
    marginBottom: 6,
  },
  editButton: {
    flexDirection: 'row',
    backgroundColor: '#FF6B35',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 6,
    alignItems: 'center',
    alignSelf: 'flex-start',
  },
  editText: {
    fontSize: 12,
    color: '#fff',
    marginLeft: 4,
  },
  dropdownPicker: {
    backgroundColor: '#f1f1f1',
    borderRadius: 8,
    marginBottom: 16,
    overflow: 'hidden',
  },
  dropdownList: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    marginTop: 8,
    marginRight: 0,
    elevation: 4,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 3 },
  },

  dropdownItem: {
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderBottomWidth: 0.5,
    borderBottomColor: '#eee',
  },

  dropdownItemText: {
    color: '#333',
    fontSize: 14,
  },

  dropdown: {
    flexDirection: 'row',
    backgroundColor: '#FF6B35',
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: 'center',
    alignSelf: 'flex-start',
    height:50
  },

  dropdownText: {
    color: '#fff',
    marginHorizontal: 6,
    fontSize: 14,
    fontWeight: '500',
  },
});
