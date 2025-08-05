export const getStatusBadgeStyle = status => {
  switch (status?.toLowerCase()) {
    case 'delivered':
      return {
        textColor: '#007F5F',
        backgroundColor: '#DFF5EB',
      };
    case 'pending':
      return {
        textColor: '#FF9F1C',
        backgroundColor: '#FFF3E0',
      };
    case 'cancelled':
      return {
        textColor: '#D62828',
        backgroundColor: '#FDEAEA',
      };
    case 'in-progress':
      return {
        textColor: '#3D5A80',
        backgroundColor: '#E0ECF8',
      };
    case 'preparing':
      return {
        textColor: '#3D5A80',
        backgroundColor: '#E0ECF8',
      };
    case 'out-for-delivery':
      return {
        textColor: '#A469F0',
        backgroundColor: '#F3E8FF',
      };
    case 'activated':
      return {
        textColor: '#007F5F',
        backgroundColor: '#DFF5EB',
      };
    case 'deactivated':
      return {
        textColor: '#D62828',
        backgroundColor: '#FDEAEA',
      };
    case 'manager':
      return {
        textColor: '#1E3A8A', // Navy Blue
        backgroundColor: '#E0E7FF',
      };
    case 'chef':
      return {
        textColor: '#B45309', // Dark Orange
        backgroundColor: '#FFEDD5',
      };
    case 'waiter':
      return {
        textColor: '#047857', // Teal
        backgroundColor: '#D1FAE5',
      };
    case 'cashier':
      return {
        textColor: '#6B21A8', // Purple
        backgroundColor: '#F3E8FF',
      };
    case 'delivery':
      return {
        textColor: '#1D4ED8', // Bright Blue
        backgroundColor: '#DBEAFE',
      };
    case 'cleaner':
      return {
        textColor: '#4B5563', // Gray
        backgroundColor: '#F3F4F6',
      };
    case 'receptionist':
      return {
        textColor: '#7C3AED', // Violet
        backgroundColor: '#EDE9FE',
      };
    case 'inventory clerk':
      return {
        textColor: '#065F46', // Dark Green
        backgroundColor: '#ECFDF5',
      };
    default:
      return {
        textColor: '#555',
        backgroundColor: '#EEE',
      };
  }
};
