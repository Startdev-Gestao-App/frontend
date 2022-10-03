import api from "../../../services/api";

export const createWeek = async (
  data,
  setLoading,
  setSuccess,
  setError,
  close
) => {
  setLoading(true);

  try {
    const session = JSON.parse(localStorage.getItem("gestao-app-finance"));
    await api.post("/week", data, {
      headers: { Authorization: `Bearer ${session?.token}` },
    });
    setLoading(false);
    setSuccess(true);
    close();
  } catch (e) {
    setLoading(false);
    setError(true);
  }
};
