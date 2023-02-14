export const getOrderStatus = (status: string | undefined) => {
    switch (status) {
      case 'created':
        return { text: 'Создан', color: 'white' }
      case 'pending':
        return { text: 'Готовится', color: 'white' }
      case 'done':
        return { text: 'Выполнен', color: '#00CCCC' }
      default:
        return { text: status, color: 'white' }
    }
  };