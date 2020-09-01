const numberIsInteger = (num: number): boolean => {
  return Number.isInteger(num);
};

const nameIsString = (name: string): boolean => {
  return name.length > 0 && typeof name === 'string';
};

export = { numberIsInteger, nameIsString };