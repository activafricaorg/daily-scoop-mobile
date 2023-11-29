import { createStore } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import countryReducer from '../store/reducers/country';
import AsyncStorage from "@react-native-async-storage/async-storage";

const STORAGE_KEY = 'countryData';
const persistedReducer = persistReducer({ key: STORAGE_KEY, storage: AsyncStorage }, countryReducer) as typeof countryReducer
let store = createStore(persistedReducer);

export default store;
export const persistor = persistStore(store);