const APOD_ENDPOINT = "https://api.nasa.gov/planetary/apod";
export const APOD_FIRST_DATE = "1995-06-16";

export function isValidApodDate(date) {
  return /^\d{4}-\d{2}-\d{2}$/.test(date) && !Number.isNaN(Date.parse(`${date}T00:00:00Z`)) &&
    new Date(`${date}T00:00:00Z`).toISOString().slice(0, 10) === date;
}

export async function fetchApod(date, apiKey, signal) {
  if (!isValidApodDate(date)) throw new TypeError("Choose a valid calendar date.");
  const params = new URLSearchParams({ date, api_key: apiKey || "DEMO_KEY" });
  const response = await fetch(`${APOD_ENDPOINT}?${params}`, { signal });
  if (!response.ok) {
    const message = response.status === 429 ? "NASA's shared demo key has reached its rate limit." :
      response.status === 403 ? "NASA rejected this API key. Check it in API settings." :
        `NASA APOD is unavailable (HTTP ${response.status}).`;
    throw new Error(message);
  }
  const data = await response.json();
  if (!data || typeof data.title !== "string" || typeof data.date !== "string" || !isValidApodDate(data.date) || data.date !== date ||
      typeof data.explanation !== "string" || !["image", "video"].includes(data.media_type) ||
      typeof data.url !== "string" || !/^https:\/\//i.test(data.url)) {
    throw new Error("NASA returned an incomplete or unsupported observation.");
  }
  if (/to view this video please enable javascript/i.test(data.explanation)) {
    throw new Error("NASA returned a video-player placeholder instead of an astronomy observation.");
  }
  return {
    title: data.title,
    date: data.date,
    explanation: data.explanation,
    mediaType: data.media_type,
    url: data.url,
    hdUrl: typeof data.hdurl === "string" && /^https:\/\//i.test(data.hdurl) ? data.hdurl : "",
    copyright: typeof data.copyright === "string" ? data.copyright : ""
  };
}
