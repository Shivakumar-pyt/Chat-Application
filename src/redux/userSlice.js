import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
    name: "user",
    initialState: {
        email: "",
        name: "",
    },

    reducers: {
        loggedIn: (state,action) => {
            state.email = action.payload.email;
            state.name = action.payload.name;
        },

        loggedOut: (state) => {
            state.email = "";
            state.name = "";
        }
    }
})

export const { loggedIn, loggedOut } = userSlice.actions;
export default userSlice.reducer;