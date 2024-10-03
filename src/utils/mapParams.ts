const mapParams = (paramsObject: { [key: string]: string }): string => {
  let stringParams: string = '';
  Object.keys(paramsObject).forEach((paramKey) => {
    const paramValue = paramsObject[paramKey];

    if (paramValue) {
      const separator = stringParams === '' ? '?' : '&';
      const newParam = separator + paramKey + '=' + paramValue;
      stringParams += newParam;
    }
  });

  return stringParams;
};

export default mapParams;
