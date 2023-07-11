import { configureStore } from "@reduxjs/toolkit";
import user from "./UserSlice"; // Import the named export

const store = configureStore({
  reducer: {
    user, // Use the reducer from the named export
  },
});

export default store;
