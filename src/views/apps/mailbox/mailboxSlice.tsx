import { createSlice } from '@reduxjs/toolkit';
import { SERVICE_URL } from '/src/config';
import axios from 'axios';

const initialState = {
  mailbox: [],
  loading: false,
  showSettings: { folder: 'inbox', starred: 'All', important: 'All', tags: 'All' },
  selectedItems: [],
  viewingMail: null,
};

const mailboxSlice = createSlice({
  name: 'mailbox',
  initialState,
  reducers: {
    receiveService(state, action) {
      const { mailbox, loading } = action.payload;
      state.mailbox = mailbox;
      state.loading = loading;
    },
    setLoading(state, action) {
      state.loading = action.payload;
    },
    toggleSelectMail(state, action) {
      const item = action.payload;
      if (state.selectedItems.find((x) => x.id === item.id)) {
        state.selectedItems = state.selectedItems.filter((x) => x.id !== item.id);
      } else {
        state.selectedItems = [item, ...state.selectedItems];
      }
    },
    setSelectedMails(state, action) {
      state.selectedItems = action.payload;
    },
    setViewingMail(state, action) {
      state.viewingMail = action.payload;
    },
    setShowSettings(state, action) {
      state.showSettings = action.payload;
    },
  },
});
const { setLoading, receiveService } = mailboxSlice.actions;

export const { toggleSelectMail, setSelectedMails, setViewingMail, setShowSettings } = mailboxSlice.actions;

export const getMailbox = () => async (dispatch) => {
  dispatch(setLoading(true));
  const response = await axios.get(`${SERVICE_URL}/ferramentas/mailbox`);
  const mailbox = response.data;
  dispatch(receiveService({ mailbox, loading: false }));
};

export const createMail =
  ({ item }) =>
  async (dispatch) => {
    dispatch(setLoading(true));
    const response = await axios.post(`${SERVICE_URL}/ferramentas/mailbox`, { item });
    const mailbox = response.data;
    dispatch(receiveService({ mailbox, loading: false }));
  };

export const updateMail =
  ({ item }) =>
  async (dispatch) => {
    dispatch(setLoading(true));
    const response = await axios.put(`${SERVICE_URL}/ferramentas/mailbox`, { item });
    const mailbox = response.data;
    dispatch(receiveService({ mailbox, loading: false }));
  };
export const deleteMail =
  ({ ids }) =>
  async (dispatch) => {
    const response = await axios.delete(`${SERVICE_URL}/ferramentas/mailbox`, { ids });
    const mailbox = response.data;
    dispatch(receiveService({ mailbox, loading: false }));
  };

const mailboxReducer = mailboxSlice.reducer;

export default mailboxReducer;
