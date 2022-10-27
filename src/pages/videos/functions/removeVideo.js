import api from "../../../services/api";

export const removeVideo = async (
  setLoading,
  setSucces,
  setError,
  id,
  setRemove,
  refresh
) => {
  setLoading(true);

  try {
    const session = JSON.parse(localStorage.getItem("gestao-app-finance"));
    await api.delete(`/video/${id}`, {
      headers: { Authorization: `Bearer ${session?.token}` },
    });
    setLoading(false);
    setSucces(true);
    setRemove(false);
    refresh();
  } catch (e) {
    setLoading(false);
    setError(true);
  }
};
