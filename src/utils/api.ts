import { API_ENDPOINT } from "../config/constants";
type DataParams = object;

type RequestMethod = "GET" | "POST" | "PATCH" | "DELETE" | "PUT";
export const request = async (
  endpoint: string,
  method: RequestMethod = "GET",
  data: DataParams = {}
) => {
  let url;
  let payload: string;
  if (method === "GET") {
    const requestParams = data
      ? `?${Object.keys(data)
          .map((key) => `${key}=${data[key as keyof DataParams]}`)
          .join("&")}`
      : "";
    url = `${API_ENDPOINT}${endpoint}${requestParams}`;
    payload = "";
  } else {
    url = `${API_ENDPOINT}${endpoint}`;
    payload = data ? JSON.stringify(data) : "";
  }

  // Token authentication
  const token = localStorage.getItem("authToken");
  const auth = token ? "Bearer " + token : "";
  try {
    const response = await fetch(url, {
      method: method,
      headers: {
        "Content-Type": "application/json",
        Authorization: auth,
      },
      body: method !== "GET" ? payload : null,
    });
    if (response.ok) {
      const json = await response.json();
      return json;
    } else {
      const errorJson = await response.json();
      throw errorJson;
    }
  } catch (error) {
    return error;
  }
};

export const getMatcheList = async () => {
  return await request("matches/", "GET");
};

export const getMatch = async (id: string) => {
  return await request(`matches/${id}`, "GET");
};

export const getArticlesList = async () => {
  return await request("articles/", "GET");
};
