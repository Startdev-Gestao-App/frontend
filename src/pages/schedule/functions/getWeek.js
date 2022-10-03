import api from "../../../services/api";

export const getWeek = async (date, setLoading, setError, setData) => {
  setLoading(false);

  try {
    const session = JSON.parse(localStorage.getItem("gestao-app-finance"));
    const response = await api.get(`/week?date=${date}`, {
      headers: { Authorization: `Bearer ${session?.token}` },
    });
    setData(response.data);
    setLoading(false);
  } catch (e) {
    setLoading(false);
    setError(true);
  }
};
