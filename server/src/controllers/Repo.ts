import { Request, Response } from "express";

 // DELETE /api/repos/:owner/:repo
const deleteRepo = async (req: Request, res: Response) => {
  const { owner, repo } = req.params;
  const { authorization } = req.headers;

  if (!authorization) {
        const error = 'Auth token not provided';
        return res.status(400).send({ error });
    }

  const token = authorization.split(' ')[1];

  try {
    const url = `https://api.github.com/repos/${owner}/${repo}`;
    const githubResponse = await fetch(url, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (githubResponse.ok) {
      res.json({ done: true });
    } else {
      const errorResponse = await githubResponse.json();
      res.status(githubResponse.status).json({ error: errorResponse });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}
