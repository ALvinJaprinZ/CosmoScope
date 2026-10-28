const STORAGE_KEY = "cosmoscope.preferences.v1";

function readPreferences() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return { favorites: [], apiKey: "" };
    const parsed = JSON.parse(raw);
    return {
      favorites: Array.isArray(parsed.favorites) ? parsed.favorites.filter((id) => typeof id === "string") : [],
      apiKey: typeof parsed.apiKey === "string" ? parsed.apiKey : ""
    };
  } catch (error) {
    console.warn("COSMOSCOPE could not read local preferences.", error);
    return { favorites: [], apiKey: "" };
  }
}

let preferences = readPreferences();

function persist() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(preferences));
    return true;
  } catch (error) {
    console.warn("COSMOSCOPE could not save local preferences.", error);
    return false;
  }
}

export function getFavorites() {
  return [...preferences.favorites];
}

export function toggleFavorite(id) {
  const saved = preferences.favorites.includes(id);
  preferences = {
    ...preferences,
    favorites: saved ? preferences.favorites.filter((item) => item !== id) : [...preferences.favorites, id]
  };
  return { saved: !saved, persisted: persist() };
}

export function getApiKey() {
  return preferences.apiKey;
}

export function setApiKey(apiKey) {
  preferences = { ...preferences, apiKey };
  return persist();
}

export function clearApiKey() {
  preferences = { ...preferences, apiKey: "" };
  return persist();
}
