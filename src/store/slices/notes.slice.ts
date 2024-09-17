import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { ELocalStorageKeys, type NoteType } from '@/types';
import { StorageService } from '@/services';

export interface INotesState {
  notes: NoteType[];
}

const initialState: INotesState = {
  notes: StorageService.get(ELocalStorageKeys.Notes) || [],
};

const updateLSNotes = (notes: NoteType[]) => {
  StorageService.set(ELocalStorageKeys.Notes, notes);
};

const notesSlice = createSlice({
  name: 'notes',
  initialState,
  reducers: {
    pushNote: (state, action: PayloadAction<NoteType>) => {
      state.notes = [...state.notes, action.payload];
      updateLSNotes(state.notes);
    },
  },
});

export const { pushNote } = notesSlice.actions;

export default notesSlice.reducer;
