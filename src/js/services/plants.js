import { API_BASE_URL } from '../constants.js'

const getPlants = async (filters = '') => {
  const response = await fetch(`${API_BASE_URL}/plants?${filters}`, {
    headers: {
      'Content-Type': 'application/json',
    },
  });

  return response.json();
}

export { getPlants };