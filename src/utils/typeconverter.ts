type InputObject = Record<string, unknown>;
type OutputObject<T extends InputObject> = {
  [K in keyof T]: T[K] extends bigint ? string : T[K];
};

export function convertBigIntToString<T extends InputObject>(obj: T): OutputObject<T> {
  const result = {} as OutputObject<T>;

  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      const value = obj[key];
      result[key] =
        typeof value === "bigint"
          ? (value.toString() as OutputObject<T>[typeof key])
          : (value as OutputObject<T>[typeof key]);
    }
  }

  return result;
}
