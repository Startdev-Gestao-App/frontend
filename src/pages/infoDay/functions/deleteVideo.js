import api from "../../../services/api";

export const deleteVideo = async (
  id,
  setLoading,
  setSuccess,
  setError,
  refrash
) => {
  setLoading(true);

  try {
    const session = JSON.parse(localStorage.getItem("gestao-app-finance"));
    await api.delete(`/video/${id}`, {
      headers: { Authorization: `Bearer ${session?.token}` },
    });
    setLoading(false);
    setSuccess(true);
    refrash();
  } catch (e) {
    setLoading(false);
    setError(true);
  }
};
