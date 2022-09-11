const BASE_URL = "https://api.themoviedb.org/3/";
const API_KEY = "?api_key=39ffbea466a8f2ab13a1ecd58abc3257";
const PAGE = "&page=";
const DISCOVER =
  "&watch_region=US&&without_genres=16&with_watch_monetization_types=flatrate";

const GETRandom = async (type, pageNum) => {
  const res = await fetch(
    BASE_URL + type + API_KEY + PAGE + pageNum + DISCOVER
  );
  return await res.json();
};

const GETGenres = async (type, genCode) => {
  const res = await fetch(BASE_URL + type + API_KEY + genCode);
  return await res.json();
};

const GET = async (type, specific, ext = "") => {
  const res = await fetch(BASE_URL + type + "/" + specific + API_KEY + ext);
  return await res.json();
};

export { GET, GETRandom, GETGenres };
