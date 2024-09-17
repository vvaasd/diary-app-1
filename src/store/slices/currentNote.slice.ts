import { createSlice } from '@reduxjs/toolkit';
import { StorageService } from '@/services';
import type { PayloadAction } from '@reduxjs/toolkit';
import { NoteType, ELocalStorageKeys, ImageInfoType } from '@/types';
import { EMPTY_NOTE } from '@/constants';

export interface ICurrentNoteState {
  currentNote: NoteType;
}

const initialState: ICurrentNoteState = {
  currentNote: StorageService.get(ELocalStorageKeys.CurrentNote) || EMPTY_NOTE,
};

const updateLSCurrentNote = (note: NoteType) => {
  StorageService.set(ELocalStorageKeys.CurrentNote, note);
};

const currentNoteSlice = createSlice({
  name: 'currentNote',
  initialState,
  reducers: {
    setCurrentNote: (state, action: PayloadAction<NoteType>) => {
      state.currentNote = action.payload;
      updateLSCurrentNote(state.currentNote);
    },
    resetCurrentNote: (state) => {
      state.currentNote = EMPTY_NOTE;
      updateLSCurrentNote(state.currentNote);
    },
    setTitle: (state, action: PayloadAction<string>) => {
      if (state.currentNote) {
        state.currentNote.title = action.payload;
      }
      updateLSCurrentNote(state.currentNote);
    },
    setTextArea: (state, action: PayloadAction<string>) => {
      if (state.currentNote) {
        state.currentNote.description = action.payload;
      }
      updateLSCurrentNote(state.currentNote);
    },
    setDate: (state, action: PayloadAction<string>) => {
      if (state.currentNote) {
        state.currentNote.date = action.payload;
      }
      updateLSCurrentNote(state.currentNote);
    },
    setEmojiIndex: (state, action: PayloadAction<number | null>) => {
      if (state.currentNote) {
        state.currentNote.emojiIndex = action.payload;
      }
      updateLSCurrentNote(state.currentNote);
    },
    setTags: (state, action: PayloadAction<string[]>) => {
      if (state.currentNote) {
        state.currentNote.tags = action.payload;
      }
      updateLSCurrentNote(state.currentNote);
    },
    setImageInfo: (state, action: PayloadAction<ImageInfoType>) => {
      if (state.currentNote) {
        state.currentNote.imageInfo = action.payload;
      }
      updateLSCurrentNote(state.currentNote);
    },
  },
});

export const {
  setCurrentNote,
  resetCurrentNote,
  setTitle,
  setTextArea,
  setDate,
  setEmojiIndex,
  setTags,
  setImageInfo,
} = currentNoteSlice.actions;

export default currentNoteSlice.reducer;
