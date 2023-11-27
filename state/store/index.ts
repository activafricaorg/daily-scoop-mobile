import { createStore } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import countryReducer from '../store/reducers/country';
import AsyncStorage from "@react-native-async-storage/async-storage";

const persistedReducer = persistReducer({ key: 'root', storage: AsyncStorage }, countryReducer) as typeof countryReducer
let store = createStore(persistedReducer);

export default store;
export const persistor = persistStore(store);
export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>