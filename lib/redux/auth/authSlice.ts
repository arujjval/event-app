import { createSlice } from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';

const authSlice = createSlice({
  name: 'User',
  initialState: {
    token: null,
  },
  reducers: {
    setUser: (state, action) => {
      state.token = action.payload;
    },
    clearUser: (state) => {
      state.token = null;
    },
  },
});

export const { setUser, clearUser } = authSlice.actions;

export const loadUser = () => async (dispatch: (arg0: { payload: any; type: "User/setUser"; }) => void) => {
  const token = await AsyncStorage.getItem('jwtToken');
  if (token) {
    dispatch(setUser(token));
  }
};

export const saveUser = (token: string) => async (dispatch: (arg0: string) => void) => {
  await AsyncStorage.setItem('jwtToken', token);
  dispatch((token));
};

export default authSlice.reducer;