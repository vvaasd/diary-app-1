import { createSlice } from '@reduxjs/toolkit';
import { PayloadAction } from '@reduxjs/toolkit';
import { LocalStorageKeysEnum, PagesEnum } from '@/types';
import { StorageService } from '@/services';

export interface IPageState {
  currentPage: PagesEnum;
}

const initialState: IPageState = {
  currentPage:
    StorageService.get(LocalStorageKeysEnum.Page) || PagesEnum.Content,
};

const updateLSPage = (page: PagesEnum) => {
  StorageService.set(LocalStorageKeysEnum.Page, page);
};

const pageSlice = createSlice({
  name: 'page',
  initialState,
  reducers: {
    setCurrnetPage: (state, action: PayloadAction<PagesEnum>) => {
      state.currentPage = action.payload;
      updateLSPage(state.currentPage);
    },
    setAddNotePage: (state) => {
      state.currentPage = PagesEnum.AddNote;
      updateLSPage(state.currentPage);
    },
    setContentPage: (state) => {
      state.currentPage = PagesEnum.Content;
      updateLSPage(state.currentPage);
    },
  },
});

export const { setCurrnetPage, setAddNotePage, setContentPage } =
  pageSlice.actions;

export default pageSlice.reducer;
