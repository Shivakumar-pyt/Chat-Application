import { createSlice } from "@reduxjs/toolkit";

export const messageSlice = createSlice({
    name: "message",
    initialState: {
        message: "",
        sender: "",
        receiver: "",
        current_time: "",
    },

    reducers: {
        currentMessage: (state,action) => {
            state.message = action.payload.message;
            state.sender = action.payload.sender;
            state.receiver = action.payload.receiver;
            state.current_time = action.payload.time;
        }
    }
})

export const { currentMessage } = messageSlice.actions;
export default messageSlice.reducer;