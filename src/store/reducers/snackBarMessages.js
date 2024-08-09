import { createSlice } from '@reduxjs/toolkit';

// initial state
const initialState = {
    snackBarMessage: '',
    snackBarMessageType: 'success' // 'error'
};

// ==============================|| SLICE - MENU ||============================== //

const snackBarMessagesSlice = createSlice({
    name: 'snackBarMessages',
    initialState,
    reducers: {
        addSnackBarMessage(state, message) {
            if (state.snackBarMessage === '') {
                state.snackBarMessage = message.payload;
            } else {
                state.snackBarMessage = state.snackBarMessage + '\n' + message.payload;
            }
        },

        changeSnackBarType(state, type) {
            state.snackBarMessageType = type.payload;
        },

        clearSnackBarMessage(state) {
            state.snackBarMessage = '';
            state.snackBarMessageType = 'success';
        }
    }
});

export default snackBarMessagesSlice.reducer;

export const { addSnackBarMessage, clearSnackBarMessage, changeSnackBarType } = snackBarMessagesSlice.actions;
