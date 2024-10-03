import type { ImageInfoType } from './ImageInfoType';

export type NoteType = {
  title: string;
  date: string;
  createdAt: string;
  emojiIndex: number | null;
  description: string;
  tags: string[];
  imageInfo: ImageInfoType;
};

export type NoteWithIdType = NoteType & { id: number };
