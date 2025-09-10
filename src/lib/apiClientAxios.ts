// src/api/apiClient.ts
import axios, { type AxiosRequestConfig } from "axios";


function getToken() {
  return localStorage.getItem("access_token");
}

function logoutAndRedirect() {
  localStorage.removeItem("access_token");
  localStorage.removeItem("refresh_token");
  window.location.href = "/login";
}


const apiClient = axios.create({
  baseURL: "",
  headers: {
    Accept: "application/json",
  },
});


apiClient.interceptors.request.use(
  (config) => {
    const token = getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    if (
      config.data &&
      !config.headers["Content-Type"]
    ) {
      config.headers["Content-Type"] = "application/json";
    }
    return config;
  },
  (error) => Promise.reject(error)
);

//  Interceptor to handle 401
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      logoutAndRedirect();
    }
    return Promise.reject(error);
  }
);

//  Generic API function
export async function apiAxiosFetchRequest<T>(
  path: string,
  options: AxiosRequestConfig = {}
): Promise<T> {
  const response = await apiClient.request<T>({
    url: path,
    ...options,
  });
  return response.data;
}

export default apiClient;
