import tags from '@/data/tags.json';

const getTagsByText = (
  text: string,
  exceptionTags: string[] = []
): string[] => {
  const lowerCaseText = text.toLowerCase();
  const lowerCaseExceptionTags = exceptionTags.map((tag) => tag.toLowerCase());

  return tags.filter(
    (tag) =>
      tag.indexOf(lowerCaseText) !== -1 &&
      !lowerCaseExceptionTags.includes(tag.toLowerCase())
  );
};

export default getTagsByText;
