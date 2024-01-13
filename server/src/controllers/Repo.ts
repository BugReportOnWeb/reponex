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
        const repoData = {
            name: repoName,
            description,
            private: privateRepo || false
        }

        const githubReponse = await fetch(url, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(repoData)
        });

        const data = await githubReponse.json();

        if (!githubReponse.ok) {
            return res
                .status(githubReponse.status)
                .send({ error: data.error });
        }

        res.send({ ...data, message: 'Repo created' });
    } catch (error) {
        if (error instanceof Error) {
            res.status(500).json({ error: error.message });
        }
    }
}

// PATCH /api/repos/update/:owner/:repo 
const updateRepo = async (req: Request, res: Response) => {
    const { owner, repo } = req.params;
    const { authorization } = req.headers;
    const { name, description, repoPrivate } = req.body;

    if (!authorization) {
        const error = 'Auth token not provided';
        return res.status(400).send({ error });
    }

    const token = authorization.split(' ')[1];

    try {
        const url = `https://api.github.com/repos/${owner}/${repo}`;
        const repoData = { name, description, private: repoPrivate };

        const githubResponse = await fetch(url, {
            method: 'PATCH',
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(repoData)
        });

        const data = await githubResponse.json();

        if (!githubResponse.ok) {
            return res
                .status(githubResponse.status)
                .send({ error: data.error });
        }

        res.send({ ...data, message: 'Repo updated' });
    } catch (error) {
        if (error instanceof Error) {
            res.status(500).send({ error: error.message });
        }
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

        const data = await githubResponse.json();

        if (!githubResponse.ok) {
            return res
                .status(githubResponse.status)
                .send({ error: data.error });
        }

        res.send({ ...data, message: 'Repo deleted' });
    } catch (error) {
        if (error instanceof Error) {
            res.status(500).send({ error: error.message });
        }
    }
}

export {
    deleteRepo,
    createRepo,
    updateRepo,
}
