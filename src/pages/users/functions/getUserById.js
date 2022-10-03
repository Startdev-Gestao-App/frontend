import api from "../../../services/api";

export const getUserById = async (id, setLoading, setError, setValue) => {
  setLoading(true);

  try {
    const session = JSON.parse(localStorage.getItem("gestao-app-finance"));
    const response = await api.get(`/user/${id}`, {
      headers: { Authorization: `Bearer ${session?.token}` },
    });
    setLoading(false);
    if (response.data) {
      setValue("name", response.data.name);
      setValue("email", response.data.email);
      setValue("password", "123456");
    } else {
      throw new Error("Não foi possível realizar a operação");
    }
  } catch (e) {
    setLoading(false);
    setError(true);
  }
};
