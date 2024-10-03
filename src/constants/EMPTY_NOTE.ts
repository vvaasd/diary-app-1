import { DateService } from '@/services';
import { NoteType } from '@/types';
import { DEFAULT_IMAGE_INFO } from '@/constants';

export const EMPTY_NOTE: NoteType = {
  title: '',
  date: DateService.getDateString(),
  createdAt: new Date().toISOString(),
  emojiIndex: null,
  description: '',
  tags: [],
  imageInfo: DEFAULT_IMAGE_INFO,
};
