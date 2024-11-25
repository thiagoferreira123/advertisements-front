import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';

import settingsReducer from './settings/settingsSlice';
import layoutReducer from './layout/layoutSlice';
import langReducer from './lang/langSlice';
import authReducer from './auth/authSlice';
import menuReducer from './layout/nav/main-menu/menuSlice';
import notificationReducer from './layout/nav/notifications/notificationSlice';
import scrollspyReducer from './components/scrollspy/scrollspySlice';

import contactsReducer from './views/apps/contacts/contactsSlice';
import mailboxReducer from './views/apps/mailbox/mailboxSlice';
import tasksReducer from './views/apps/tasks/tasksSlice';

import { REDUX_PERSIST_KEY } from './config';

const persistConfig = {
  key: REDUX_PERSIST_KEY,
  storage,
  whitelist: ['menu', 'settings', 'lang'],
  stateReconciler: autoMergeLevel2, // Merge nested state (like objects) deeply
};

const rootReducer = combineReducers({
  settings: settingsReducer,
  layout: layoutReducer,
  lang: langReducer,
  auth: authReducer,
  menu: menuReducer,
  notification: notificationReducer,
  scrollspy: scrollspyReducer,
  contacts: contactsReducer,
  mailbox: mailboxReducer,
  tasks: tasksReducer,
});

const persistedReducer = persistReducer<unknown, unknown>(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({ serializableCheck: false }),
});

const persistedStore = persistStore(store);

export { store, persistedStore };
