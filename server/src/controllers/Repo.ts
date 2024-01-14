import { Request, Response } from "express";

// POST /api/repos/create
const createRepo = async (req: Request, res: Response) => {
  const { repoName, description, privateRepo } = req.body;
  const { authorization } = req.headers;

  if (!authorization) {
    const error = 'Auth token not provided';
    return res.status(400).json({ error });
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
        .json({ error: data.error });
    }

    res.json({ ...data, message: 'Repo created' });
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
    return res.status(400).json({ error });
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
        .json({ error: data.error });
    }

    res.json({ ...data, message: 'Repo updated' });
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ error: error.message });
    }
  }
}

//POST /api/repos/issues/create/:owner/:repo
const createIssue = async (req: Request, res: Response) => {
  const { owner, repo } = req.params;
  const { authorization } = req.headers;

  if (!authorization) {
    const error = 'Auth token not provided';
    return res.status(400).json({ error });
  }

  const token = authorization.split(' ')[1];

  const url = `https://api.github.com/repos/${owner}/${repo}/issues`;

  const issueData = {
    title: req.body.title,
    body: req.body.body,
    // assignees: req.body.assignees || [],
    // milestone: req.body.milestone || null,
    labels: req.body.labels || [],
  };

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(issueData),
    });

    if (response.ok) {
      const createdIssue = await response.json();
      res.json(createdIssue);
    } else {
      const errorResponse = await response.json();
      res.status(response.status).json({ error: errorResponse });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

// PATCH /api/repos/issues/update/:owner/:repo
const updateIssue = async (req: Request, res: Response) => {
  const { owner, repo, issue_number } = req.params;
  const { authorization } = req.headers;

  if (!authorization) {
    const error = 'Auth token not provided';
    return res.status(400).json({ error });
  }

  const token = authorization.split(' ')[1];

  const url = `https://api.github.com/repos/${owner}/${repo}/issues/${issue_number}`;

  const issueData = {
    title: req.body.title,
    body: req.body.body,
    // assignees: req.body.assignees || [],
    // milestone: req.body.milestone || null,
    state: req.body.state || "open", // can be open or closed
    labels: req.body.labels || [],
  };

  try {
    const response = await fetch(url, {
      method: 'PATCH',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(issueData),
    });

    if (response.ok) {
      const createdIssue = await response.json();
      res.json(createdIssue);
    } else {
      const errorResponse = await response.json();
      res.status(response.status).json({ error: errorResponse });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

// PUT /api/repos/issues/lock/:owner/:repo/:issue_number
const lockIssue = async (req: Request, res: Response) => {
  const { owner, repo, issue_number } = req.params;
  const { authorization } = req.headers;

  if (!authorization) {
    const error = 'Auth token not provided';
    return res.status(400).json({ error });
  }

  const token = authorization.split(' ')[1];

  const url = `https://api.github.com/repos/${owner}/${repo}/issues/${issue_number}/lock`;

  const lockData = {
    lock_reason: req.body.lock_reason || 'resolved', // Default to 'resolved' Can be one of: off-topic, too heated, resolved, spam 
  };

  try {
    const response = await fetch(url, {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(lockData),
    });

    if (response.status === 204) {
      res.status(204).send();
    } else {
      const errorResponse = await response.json();
      res.status(response.status).json({ error: errorResponse });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

// DELETE /api/repos/issues/unlock/:owner/:repo/:issue_number
const unLockIssue = async (req: Request, res: Response) => {
  const { owner, repo, issue_number } = req.params;
  const { authorization } = req.headers;

  if (!authorization) {
    const error = 'Auth token not provided';
    return res.status(400).json({ error });
  }

  const token = authorization.split(' ')[1];

  const url = `https://api.github.com/repos/${owner}/${repo}/issues/${issue_number}/lock`;

  try {
    const response = await fetch(url, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });

    if (response.status === 204) {
      res.status(204).send();
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
    return res.status(400).json({ error });
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
        .json({ error: data.error });
    }

    res.json({ ...data, message: 'Repo deleted' });
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ error: error.message });
    }
  }
}

// POST /api/repos/branch/create/:owner/:repo
const createBranch = async (req: Request, res: Response) => {
  const { owner, repo } = req.params;
  const { authorization } = req.headers;

  if (!authorization) {
    const error = 'Auth token not provided';
    return res.status(400).json({ error });
  }

  const token = authorization.split(' ')[1];

  try {
    // Get the default branch (e.g. 'main' or 'master')
    const defaultBranchUrl = `https://api.github.com/repos/${owner}/${repo}/git/refs`;
    const defaultBranchResponse = await fetch(defaultBranchUrl, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const branchData = await defaultBranchResponse.json();

    if (!defaultBranchResponse.ok) {
      return res
        .status(defaultBranchResponse.status)
        .json({ error: branchData.error });
    }

    // Create a new branch based on the default branch
    const url = `https://api.github.com/repos/${owner}/${repo}/git/refs`;
    const branchConfig = {
      ref: `refs/heads/${req.body.branchName}`,
      sha: branchData[0].object.sha,
    }

    const githubResponse = await fetch(url, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(branchConfig),
    });

    const data = await githubResponse.json();

    if (!githubResponse.ok) {
      return res
        .status(githubResponse.status)
        .json({ error: data.error });
    }

    res.json({ ...data, message: 'Branch Created' });
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ error: error.message });
    }
  }
}

// PUT /api/repos/merge/:owner/:repo/:pullNumber
const mergePullReq = async (req: Request, res: Response) => {
  const { owner, repo, pullNumber } = req.params;
  const { commitTitle, commitMessage } = req.body;
  const { authorization } = req.headers;

  if (!authorization) {
    const error = 'Auth token not provided';
    return res.status(400).json({ error });
  }

  const token = authorization.split(' ')[1];

  try {
    const url = `https://api.github.com/repos/${owner}/${repo}/pulls/${pullNumber}/merge`;
    const pullReqData = {
      commit_title: commitTitle,
      commit_message: commitMessage,
    }

    const githubResponse = await fetch(url, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(pullReqData),
    });

    const data = await githubResponse.json();

    if (!githubResponse.ok) {
      return res
        .status(githubResponse.status)
        .json({ error: data.error });
    }

    res.json({ ...data, message: `Pull Request ${pullNumber} merged` });
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ error: error.message });
    }
  }
}

export {
  createRepo,
  updateRepo,
  deleteRepo,
  createBranch,
  mergePullReq,
  createIssue,
  updateIssue,
  lockIssue,
  unLockIssue,
}
