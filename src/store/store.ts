import { configureStore } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import notesReducer from './slices/notes.slice';
import currentNoteReducer from './slices/currentNote.slice';
import pageReducer from './slices/page.slice';
import breakpointReducer from './slices/breakpoint.slice';

const store = configureStore({
  reducer: {
    currentNote: currentNoteReducer,
    notes: notesReducer,
    page: pageReducer,
    breakpoint: breakpointReducer,
  },
});

export default store;

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
