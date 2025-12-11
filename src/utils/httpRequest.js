import axios from "axios";
import Cookies from "js-cookie";

const httpRequest = axios.create({
  baseURL: "https://api01.f8team.dev/api",
});

httpRequest.interceptors.request.use((config) => {
  const accessToken = Cookies.get("access_token");
  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }
  return config;
});

axios.interceptors.response.use((response) => {
  return response.data;
});

let isRefreshing = false;

let queueJobs = [];

async function sendRefreshToken(config, refreshToken) {
  isRefreshing = true;

  const response = await axios.post(`${config.baseURL}/auth/refresh-token`, {
    refresh_token: refreshToken,
  });

  const { access_token, refresh_token } = response.data;

  Cookies.set("access_token", access_token);
  Cookies.set("refresh_token", refresh_token);
}

httpRequest.interceptors.response.use(
  (response) => response.data,

  async (error) => {
    const refreshToken = Cookies.get("refresh_token");

    if (error.status === 401 && refreshToken) {
      const original = error.config;

      try {
        if (!isRefreshing) {
          await sendRefreshToken(original, refreshToken);

          queueJobs.forEach((job) => job.resolve());
        } else {
          await new Promise((resolve, reject) => {
            queueJobs.push({ resolve, reject });
          });
        }

        return await httpRequest.request(original);
      } catch (error) {
        queueJobs.forEach((job) => job.reject());
        window.location.href = "/login";
        return Promise.reject(error);
      } finally {
        isRefreshing = false;
        queueJobs = [];
      }
    }
    return Promise.reject(error);
  },
);

export default httpRequest;
