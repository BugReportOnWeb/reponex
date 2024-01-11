export const isTokenValid = async () => {
  const token = localStorage.getItem("token");


  const server = import.meta.env.VITE_SERVER;

  try {
    const response = await fetch(`${server}/api/users/validate`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const data = response.ok ? { valid: true } : { valid: false };
    return data;
  } catch (error) {
    console.error(error);
    return { valid: false };
  }
};
