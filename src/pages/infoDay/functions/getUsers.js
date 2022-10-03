import api from "../../../services/api";

export const getUsers = async (skip, take, setLoading, setData, setError) => {
  setLoading(true);

  try {
    const session = JSON.parse(localStorage.getItem("gestao-app-finance"));

    const response = await api.get(`/user?skip=${skip}&take=${take}`, {
      headers: { Authorization: `Bearer ${session?.token}` },
    });
    setData(response.data?.users);
    setLoading(false);
  } catch (e) {
    setError(true);
    setLoading(false);
  }
};
