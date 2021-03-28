function isValidItemEnum(typeRegister: string, typeEnum: Object) {
  const typeRegisterEnum = typeRegister as typeof typeEnum;

  let isValid = false;
  for (const value of enumKeys(typeEnum)) {
    if (typeEnum[value] === typeRegisterEnum) {
      isValid = true;
      break;
    }
  }

  return isValid;
}

function enumKeys<O extends object, K extends keyof O = keyof O>(obj: O): K[] {
  return Object.keys(obj).filter(k => Number.isNaN(+k)) as K[];
}

export default {
  isValidItemEnum,
};
