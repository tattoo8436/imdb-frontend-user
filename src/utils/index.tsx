export const getCurrentAccount: any = () => {
  return JSON.parse(localStorage.getItem("account") ?? "{}");
};

export const BASE_URL_API = "https://imdb-service-production.up.railway.app/api";
