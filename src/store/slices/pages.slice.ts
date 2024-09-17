import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { ELocalStorageKeys, EPages } from '@/types';
import { StorageService } from '@/services';

export interface IPagesState {
  currentPage: EPages;
}

const initialState: IPagesState = {
  currentPage: StorageService.get(ELocalStorageKeys.Page) || EPages.Content,
};

const updateLSPages = (page: EPages) => {
  StorageService.set(ELocalStorageKeys.Page, page);
};

const pagesSlice = createSlice({
  name: 'pages',
  initialState,
  reducers: {
    setCurrnetPage: (state, action: PayloadAction<EPages>) => {
      state.currentPage = action.payload;
      updateLSPages(state.currentPage);
    },
    setAddNotePage: (state) => {
      state.currentPage = EPages.AddNote;
      updateLSPages(state.currentPage);
    },
    setContentPage: (state) => {
      state.currentPage = EPages.Content;
      updateLSPages(state.currentPage);
    },
  },
});

export const { setCurrnetPage, setAddNotePage, setContentPage } =
  pagesSlice.actions;

export default pagesSlice.reducer;
