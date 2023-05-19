import { createSlice } from "@reduxjs/toolkit";

export const chatSlice = createSlice({
    name: "chat",
    initialState: {
        sender : "",
        receiver: "",
    },

    reducers: {
        chatSelected: (state,action) => {
            state.sender = action.payload.sender;
            state.receiver = action.payload.receiver;
        },
    }
})

export const { chatSelected } = chatSlice.actions;
export default chatSlice.reducer;