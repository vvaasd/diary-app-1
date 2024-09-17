import type { ImageInfoType } from './ImageInfoType';

export type NoteType = {
  title: string;
  date: string;
  emojiIndex: number | null;
  description: string;
  tags: string[];
  imageInfo: ImageInfoType;
};
