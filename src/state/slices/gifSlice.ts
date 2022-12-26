import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IMappedGif } from "../../types";
import { fetchGif } from "../actions/gifs.action";

interface IGifsSlice {
  gifs: IMappedGif[];
  paginationObj: { limit: number; offset: number };
}
const initialState: IGifsSlice = {
  gifs: [],
  paginationObj: { limit: 25, offset: 0 },
};
const gifsSlice = createSlice({
  name: "gifsSlice",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(fetchGif.fulfilled, (state, { payload }) => {});
    builder.addCase(fetchGif.rejected, (state, { payload }) => {
      if (payload) state.gifs = [];
    });
  },
});

export const gifsReducer = gifsSlice.reducer;
