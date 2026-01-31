import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api',
  headers: {
    'Content-Type': 'application/json',
  }
});

// Add TMA Auth Interceptor
api.interceptors.request.use((config) => {
  const tg = (window as any).Telegram?.WebApp;
  const initData = tg?.initData ;

  // V2 Fix: Ensure we NEVER send 'tma undefined'
  if (initData && initData !== 'undefined' && initData !== '') {
    config.headers.Authorization = `tma ${initData}`;
  } else {
    // If we reach here in a Mini App, something is wrong with the launch context
    console.error('Telegram initData is invalid or missing.');
  }
  return config;
});

export interface CreateOrderPayload {
  fullName: string;
  phoneNumber: string;
  city: string;
  instagramHandle?: string;
  orderType: string;
  occasion: string;
  fabricPreference: string;
  eventDate: string;
  preferredDeliveryDate: string;
  measurements: {
    bust: number;
    waist: number;
    hips: number;
    shoulderWidth: number;
    dressLength: number;
    armLength: number;
    height: number;
  };
  bodyConcerns: string;
  colorPreference: string;
  termsAccepted: boolean;
  revisionPolicyAccepted: boolean;
}

export const orderService = {
  createOrder: async (data: CreateOrderPayload, photo?: File) => {
    const formData = new FormData();
    formData.append('fullName', data.fullName);
    formData.append('phoneNumber', data.phoneNumber);
    formData.append('city', data.city);
    formData.append('instagramHandle', data.instagramHandle || '');
    formData.append('measurements', JSON.stringify(data.measurements));
    
    // Append flat fields
    formData.append('orderType', data.orderType);
    formData.append('occasion', data.occasion);
    formData.append('fabricPreference', data.fabricPreference);
    formData.append('eventDate', data.eventDate);
    formData.append('preferredDeliveryDate', data.preferredDeliveryDate);
    formData.append('bodyConcerns', data.bodyConcerns);
    formData.append('colorPreference', data.colorPreference);
    formData.append('termsAccepted', String(data.termsAccepted));
    formData.append('revisionPolicyAccepted', String(data.revisionPolicyAccepted));

    if (photo) {
      formData.append('inspirationPhoto', photo);
    }

    const response = await api.post('/orders', formData);
    return response.data;
  },
  
  getMyOrders: async () => {
    const response = await api.get('/orders/my-orders');
    return response.data;
  },

  getOrderById: async (id: string) => {
    const response = await api.get(`/orders/${id}`);
    return response.data;
  }
};

export const userService = {
  getProfile: async () => {
    const response = await api.get('/users/me');
    return response.data;
  }
};

export const collectionService = {
  getCollections: async () => {
    const response = await api.get('/collections');
    return response.data;
  }
};

export default api;
