import { NoteWithIdType } from '@/types';

const sortNotes = (notes: NoteWithIdType[]): NoteWithIdType[] => {
  return notes.sort((a, b) => {
    const aDateTime = new Date(a.date).getTime();
    const bDateTime = new Date(b.date).getTime();

    if (aDateTime > bDateTime) return -1;
    if (aDateTime < bDateTime) return 1;

    // при равных date сортировка по createdAt
    const aCreatedAtTime = new Date(a.createdAt).getTime();
    const bCreatedAtTime = new Date(b.createdAt).getTime();

    if (aCreatedAtTime > bCreatedAtTime) return -1;
    if (aCreatedAtTime < bCreatedAtTime) return 1;

    return 0;
  });
};

export default sortNotes;
