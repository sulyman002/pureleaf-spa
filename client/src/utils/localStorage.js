

// set item to localStorage
export const setItem = (key, value) => {
  try {
    const serialized = JSON.stringify(value);
    localStorage.setItem(key, serialized);
  } catch (error) {
    console.error("Error saving to localStorage", error);
  }
};

// Get item from localStorage
export const getItem = (key) => {
  try {
    const serialized = localStorage.getItem(key);
    return serialized ? JSON.parse(serialized) : null;
  } catch (error) {
    console.error("Error reading from localStorage", error);
    return null;
  }
};

// Remove a specific item
export const removeItem = (key) => {
  try {
    localStorage.removeItem(key);
  } catch (error) {
    console.error("Error removing from localStorage", error);
  }
};

// Clear everything
export const clearStorage = () => {
  try {
    localStorage.clear();
  } catch (error) {
    console.error("Error clearing localStorage", error);
  }
};
