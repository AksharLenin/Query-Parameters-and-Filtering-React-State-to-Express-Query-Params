import apiClient from "./apiClient";

export async function getThreads(filters) {
  const response = await apiClient.get("/api/threads", {
    params: filters,
  });

  return response.data;
}
