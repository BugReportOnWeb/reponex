const deleteRepo = async (owner: string, repo: string, token: string) => {
  const server = import.meta.env.VITE_SERVER;
  try {
    const url = `${server}/api/repos/delete/${owner}/${repo}`;
    const res = await fetch(url, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (res.ok) {
      return { done: true };
    } else {
      const errorResponse = await res.json();
      return { error: errorResponse };
    }
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export { deleteRepo };
