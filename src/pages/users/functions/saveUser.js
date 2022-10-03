import api from "../../../services/api";

export const saveUser = async (
  setLoading,
  setSuccess,
  setError,
  redirect,
  data
) => {
  setLoading(true);

  try {
    const session = JSON.parse(localStorage.getItem("gestao-app-finance"));

    await api.post("/user", data, {
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
