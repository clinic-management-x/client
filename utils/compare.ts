export const areTwoObjectsEqual = (objectA: any, objectB: any) => {
  const objAKeys = Object.keys(objectA).sort();
  const objBKeys = Object.keys(objectB).sort();
  if (objAKeys.length !== objBKeys.length) {
    return false;
  }
  console.log("keys", objAKeys, objBKeys);
  const a = objAKeys.map((key, index) => {
    const objValueA = objectA[key];
    const objValueB = objectB[objBKeys[index]];
    if (typeof objValueA === "object") {
      const data = areTwoObjectsEqual(objValueA, objValueB);
      console.log("DATA", data);
      return data;
    } else {
      return objValueA === objValueB;
    }
  });
  console.log("a", a);
};
