import { NoteType } from '@/types';

const mapNotesToUniqueTags = (notes: NoteType[]): string[] => {
  const tags = notes.flatMap((note) => note.tags);
  return [...new Set(tags)];
};

const getTagsFromNotes = (
  notes: NoteType[],
  text: string,
  exceptionTags: string[] = [],
): string[] => {
  const tags = mapNotesToUniqueTags(notes);

  const lowerCaseText = text.toLowerCase();
  const lowerCaseExceptionTags = exceptionTags.map((tag) => tag.toLowerCase());

  return tags.filter((tag) => {
    const lowerCaseTag = tag.toLowerCase();
    return (
      lowerCaseTag.indexOf(lowerCaseText) !== -1 &&
      !lowerCaseExceptionTags.includes(lowerCaseTag)
    );
  });
};

export default getTagsFromNotes;
