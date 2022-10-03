import api from "../../../services/api";

export const getDays = async (weekId, setLoading, setError, setData) => {
  setLoading(true);

  try {
    const session = JSON.parse(localStorage.getItem("gestao-app-finance"));
    const response = await api.get(`/day?weekId=${weekId}`, {
      headers: { Authorization: `Bearer ${session?.token}` },
    });
    setData(response.data);
    setLoading(false);
  } catch (e) {
    setLoading(false);
    setError(true);
  }
};
