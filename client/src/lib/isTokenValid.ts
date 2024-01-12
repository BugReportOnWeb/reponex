export const isTokenValid = async () => {
  const token = localStorage.getItem("token");


  const server = import.meta.env.VITE_SERVER;

  try {
    const response = await fetch(`${server}/api/users/me`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (response.ok) {
      const data = await response.json();
      return { valid: true, username: data.username };
    }
    return { valid: false };
  } catch (error) {
    console.error(error);
    return { valid: false };
  }
};
