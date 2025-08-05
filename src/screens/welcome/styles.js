import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollContainer: {
    padding: 24,
    paddingBottom: 40,
  },
  logoContainer: {
    alignItems: 'center',
    marginVertical: 30,
  },
  logoCircle: {
    width: 100,
    height: 100,
    backgroundColor: '#FF6B35',
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  logoText: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
  },
  featureList: {
    marginBottom: 30,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 20,

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

    backgroundColor: '#fff', // Required for shadow to appear on Android
  },
  featureIcon: {
    marginRight: 16,
    marginTop: 4,
  },
  featureContent: {
    flex: 1,
  },
  featureTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000',
    marginBottom: 4,
  },
  featureDescription: {
    fontSize: 14,
    color: '#555',
  },
  button: {
    backgroundColor: '#FF6B35',
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  descritpion: {
    textAlign: 'center',
    color: '#777',
    fontSize: 14,
    marginTop: 6,
  },
});
