import api from "../../../services/api";

export const editUser = async (
  id,
  setLoading,
  setError,
  setSuccess,
  redirect,
  data
) => {
  setLoading(true);

  try {
    const session = JSON.parse(localStorage.getItem("gestao-app-finance"));
    await api.put(`/user/${id}`, data, {
      headers: { Authorization: `Bearer ${session?.token}` },
    });
    setSuccess(true);
    setLoading(false);
    redirect();
  } catch (e) {
    setError(true);
    setLoading(false);
  }
};
