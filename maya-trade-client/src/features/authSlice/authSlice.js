import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";
import auth, { googleAuthProvider } from "../../Firebase/Firebase.config";

const initialState = {
  user: { email: null },
  isLoading: false,
  isError: false,
  error: "",
};

//user registration
export const createUser = createAsyncThunk(
  "auth/createUser",
  async ({ email, password }) => {
    const data = await createUserWithEmailAndPassword(auth, email, password);

    return data?.user?.email;
  }
);

// login user
export const signInUser = createAsyncThunk(
  "auth/signInUser",
  async ({ email, password }) => {
    const data = await signInWithEmailAndPassword(auth, email, password);

    return data?.user?.email;
  }
);

// login user with google account
export const googleSignIn = createAsyncThunk("auth/googleSignIn", async () => {
  const data = await signInWithPopup(auth, googleAuthProvider);

  return data?.user?.email;
});

export const getUser = createAsyncThunk("auth/getUser", async (email) => {
  const res = await fetch(`${process.env.REACT_APP_devURL}user/${email}`);
  const data = await res.json();
  console.log("data", data);
  if (data.success) {
    return data;
  }

  return email;
});

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.user = { email: null };
    },
    setUser: (state, action) => {
      state.user.email = action?.payload;
      state.isLoading = false;
      state.isError = false;
      state.error = "";
    },
    toggleLoading: (state) => {
      state.isLoading = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createUser.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.error = "";
      })
      .addCase(createUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user.email = action?.payload;
        state.isError = false;
        state.error = "";
      })
      .addCase(createUser.rejected, (state, action) => {
        state.isLoading = false;
        state.user = { email: null };
        state.isError = true;
        state.error = action?.error?.message;
      })

      //login user
      .addCase(signInUser.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.error = "";
      })
      .addCase(signInUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user.email = action?.payload;
        state.isError = false;
        state.error = "";
      })
      .addCase(signInUser.rejected, (state, action) => {
        state.isLoading = false;
        state.user = { email: null };
        state.isError = true;
        state.error = action?.error?.message;
      })

      //google sign in
      .addCase(googleSignIn.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.error = "";
      })
      .addCase(googleSignIn.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user.email = action?.payload;
        state.isError = false;
        state.error = "";
      })
      .addCase(googleSignIn.rejected, (state, action) => {
        state.isLoading = false;
        state.user = { email: null };
        state.isError = true;
        state.error = action?.error?.message;
      })

      //get user
      .addCase(getUser.pending, (state) => {
        state.isLoading = false;
        state.isError = false;
        state.error = "";
      })
      .addCase(getUser.fulfilled, (state, action) => {
        state.isLoading = false;
        if (action?.payload?.success) {
          state.user = action.payload.data;
        } else {
          state.user.email = action?.payload;
        }
        state.isError = false;
        state.error = "";
      })
      .addCase(getUser.rejected, (state, action) => {
        state.isLoading = false;
        state.user = { email: null };
        state.isError = true;
        state.error = action?.error?.message;
      });
  },
});

export const { logout, setUser, toggleLoading } = authSlice?.actions;

const authReducer = authSlice.reducer;
export default authReducer;
