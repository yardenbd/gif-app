import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  getGifs,
  saveSearchQueryToLocalStorage,
} from "../../services/api.service";

export const fetchGif = createAsyncThunk(
  "gifsSlice/fetchGif",
  async (value: string, { rejectWithValue }) => {
    try {
      const response = await getGifs(value);
      return response;
    } catch (err) {
      rejectWithValue(err);
    }
  }
);
