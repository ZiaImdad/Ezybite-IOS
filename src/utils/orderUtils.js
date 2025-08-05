export const getOrderButtonStates = (status) => {
  const normalizedStatus = status.toLowerCase();

  const isFinal = normalizedStatus === 'cancelled' || normalizedStatus === 'delivered';
  const isPending = normalizedStatus === 'pending';

  return {
    showButtons: !isFinal,
    confirmEnabled: isPending,
    cancelEnabled: isPending,
  };
};
