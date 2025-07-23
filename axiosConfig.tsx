import axios from "axios";
import useTokenStore from '@/stores/tokenStore';

const axiosConfig = axios.create({
    baseURL: process.env.EXPO_PUBLIC_API,
    headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' }
});

axiosConfig.interceptors.request.use(config => {
    const favToken = useTokenStore.getState().favToken;
    if (favToken) {
        config.headers.Authorization = `Bearer ${favToken}`;
    }
    return config;
});

export default axiosConfig;