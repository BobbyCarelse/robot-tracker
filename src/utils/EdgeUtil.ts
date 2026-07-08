const EDGE_STORAGE_KEY = "EDGE_OF_WORLD";

export const getEdgePointsStorage = () => {
  let store = sessionStorage.getItem(EDGE_STORAGE_KEY);

  let arrayOfData: { x: number; y: number }[] = [];

  if (store === null) {
    arrayOfData = [];
  } else {
    arrayOfData = JSON.parse(store) as { x: number; y: number }[];
  }

  return arrayOfData;
};

export const storeEdgePoint = (x: number, y: number) => {
  const storage = getEdgePointsStorage();

  sessionStorage.setItem(
    EDGE_STORAGE_KEY,
    JSON.stringify([...storage, { x, y }]),
  );
};
