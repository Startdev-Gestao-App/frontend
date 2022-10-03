import api from "../../../services/api";

export const getInfoDay = async (id, setData, setLoading, setError) => {
  setLoading(true);

  try {
    const session = JSON.parse(localStorage.getItem("gestao-app-finance"));
    const response = await api.get(`/day/${id}`, {
      headers: { Authorization: `Bearer ${session?.token}` },
    });
    setData(response?.data);
    setLoading(false);
  } catch (e) {
    setError(true);
    setLoading(false);
  }
};
