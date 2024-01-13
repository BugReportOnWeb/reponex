import { Request, Response } from "express";

// POST /api/repos/create
const createRepo = async (req: Request, res: Response) => {
  const { repoName, description, privateRepo } = req.body;
  const { authorization } = req.headers;

  if (!authorization) {
    const error = 'Auth token not provided';
    return res.status(400).send({ error });
  }

  const token = authorization.split(' ')[1];

  try {
    const url = 'https://api.github.com/user/repos';
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: repoName,
        description: description,
        private: privateRepo || false,
      }),
    });

    if (response.ok) {
      const createdRepo = await response.json();
      res.json(createdRepo);
    } else {
      const errorResponse = await response.json();
      res.status(response.status).json({ error: errorResponse });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

// PATCH /api/repos/update/:owner/:repo 
const updateRepo = async (req: Request, res: Response) => {
  const { owner, repo } = req.params;
  const { authorization } = req.headers;

  if (!authorization) {
    const error = 'Auth token not provided';
    return res.status(400).send({ error });
  }

  const token = authorization.split(' ')[1];

  try {
    const url = `https://api.github.com/repos/${owner}/${repo}`;
    const response = await fetch(url, {
      method: 'PATCH',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: req.body.name,
        description: req.body.description,
        private: req.body.private,
      }),
    });

    if (response.ok) {
      const updatedRepo = await response.json();
      res.json(updatedRepo);
    } else {
      const errorResponse = await response.json();
      res.status(response.status).json({ error: errorResponse });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

// DELETE /api/repos/delete/:owner/:repo
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

export {
  deleteRepo,
  createRepo,
  updateRepo,
}
