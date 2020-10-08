export const fetchAll = (key) => {
  return JSON.parse(localStorage.getItem(key));
};

export const updateAll = (key, data) => {
  localStorage.setItem(key, JSON.stringify(data));
  return fetchAll(key);
};