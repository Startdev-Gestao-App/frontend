import api from "../../../services/api";

export const removeUser = async (
  id,
  setLoading,
  setError,
  setSuccess,
  refresh,
  setRemove
) => {
  setLoading(true);

  try {
    const session = JSON.parse(localStorage.getItem("gestao-app-finance"));

    await api.delete(`/user/${id}`, {
      headers: { Authorization: `Bearer ${session?.token}` },
    });
    setLoading(false);
    setSuccess(true);
    refresh();
    setRemove(false);
  } catch (e) {
    setError(true);
  }
};
