import { configureStore, combineReducers } from "@reduxjs/toolkit";
import serviceBoyAuthSlice from "../slice/serviceBoyAuth.slice";
import vendorAuthSlice from '../slice/vendorAuth.slice'
import adminAuthSlice from '../slice/adminAuth.slice'
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { Role } from "@/types/enum.type";

const persistConfig = {
  key: "root",
  storage,
  whitelist: [Role.SERVICE_BOY,Role.VENDOR,Role.ADMIN],
};

const rootReducer = combineReducers({
  serviceBoy: serviceBoyAuthSlice,
  vendor: vendorAuthSlice,
  admin: adminAuthSlice
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [
          "persist/PERSIST",
          "persist/REHYDRATE",
          "persist/PAUSE",
          "persist/PURGE",
          "persist/FLUSH",
          "persist/REGISTER",
        ],
      },
    }),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
