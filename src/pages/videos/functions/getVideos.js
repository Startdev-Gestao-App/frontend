import api from "../../../services/api";

export const getVideos = async (
  setLoading,
  setData,
  setError,
  skip,
  take,
  id
) => {
  setLoading(true);

  try {
    const session = JSON.parse(localStorage.getItem("gestao-app-finance"));
    const response = await api.get(
      `/video/${id}/category?skip=${skip}&take=${take}`,
      {
        headers: { Authorization: `Bearer ${session?.token}` },
      }
    );
    setData(response.data);
    setLoading(false);
  } catch (e) {
    setLoading(false);
    setError(true);
  }
};
