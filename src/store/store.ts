import { configureStore } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import notesReducer from './slices/notes.slice';
import currentNoteReducer from './slices/currentNote.slice';
import pagesReducer from './slices/pages.slice';

const store = configureStore({
  reducer: {
    currentNote: currentNoteReducer,
    notes: notesReducer,
    pages: pagesReducer,
  },
});

export default store;

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
