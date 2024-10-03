const generateId = (exceptions: number[]): number => {
  const id = Math.random();

  if (exceptions.includes(id)) {
    return generateId(exceptions);
  }

  return id;
};

export default generateId;
