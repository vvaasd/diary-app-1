import { createSlice } from '@reduxjs/toolkit';
import { PayloadAction } from '@reduxjs/toolkit';
import { LocalStorageKeysEnum, NoteWithIdType } from '@/types';
import { StorageService } from '@/services';
import { sortNotes } from '@/utils';

export interface INotesState {
  notes: NoteWithIdType[];
}

const initialState: INotesState = {
  notes: StorageService.get(LocalStorageKeysEnum.Notes) || [],
};

const updateLSNotes = (notes: NoteWithIdType[]) => {
  StorageService.set(LocalStorageKeysEnum.Notes, notes);
};

const notesSlice = createSlice({
  name: 'notes',
  initialState,
  reducers: {
    pushNote: (state, action: PayloadAction<NoteWithIdType>) => {
      const newNote: NoteWithIdType = {
        ...action.payload,
        createdAt: new Date().toISOString(),
      };

      const sortedNewNotes = sortNotes([...state.notes, newNote]);
      state.notes = sortedNewNotes;
      updateLSNotes(sortedNewNotes);
    },
  },
});

export const { pushNote } = notesSlice.actions;

export default notesSlice.reducer;
