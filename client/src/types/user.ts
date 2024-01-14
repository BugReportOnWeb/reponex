import { Dispatch, SetStateAction } from "react";

type Actor = {
  id: number;
  login: string;
  display_login: string;
  gravatar_id: string;
  url: string;
  avatar_url: string;
};

type Repo = {
  id: number;
  name: string;
  url: string;
};

type Issue = {
  url: string;
  repository_url: string;
  labels_url: string;
  comments_url: string;
  events_url: string;
  html_url: string;
  id: number;
  node_id: string;
  number: number;
  title: string;
  user: GitHubUser;
  labels: any[]; // labels
  state: string;
  locked: boolean;
  assignee: any; // assignee
  assignees: any[]; // assignees
  milestone: any; // milestone
  comments: number;
  created_at: string;
  updated_at: string;
  closed_at: string | null;
  author_association: string;
  active_lock_reason: string | null;
  body: string;
  reactions: {
    url: string;
    total_count: number;
    '+1': number;
    '-1': number;
    laugh: number;
    hooray: number;
    confused: number;
    heart: number;
    rocket: number;
    eyes: number;
  };
  timeline_url: string;
  performed_via_github_app: string | null;
  state_reason: string | null;
  public: boolean;
  state_created_at: string;
};

type GitHubEvent = {
  id: string;
  type: string;
  actor: Actor;
  repo: Repo;
  payload: {
    action: string;
    issue: Issue;
  };
  public: boolean;
  created_at: string;
};

type GitHubUser = {
  login: string;
  id: number;
  node_id: string;
  avatar_url: string;
  gravatar_id: string;
  url: string;
  html_url: string;
  followers_url: string;
  following_url: string;
  gists_url: string;
  starred_url: string;
  subscriptions_url: string;
  organizations_url: string;
  repos_url: string;
  events_url: string;
  received_events_url: string;
  type: string;
  site_admin: boolean;
  name: string | null;
  company: string | null;
  blog: string;
  location: string;
  email: string | null;
  hireable: boolean | null;
  bio: string;
  twitter_username: string | null;
  public_repos: number;
  public_gists: number;
  followers: number;
  following: number;
  created_at: string;
  updated_at: string;
}

type UserDataProps = {
  userData: GitHubUser;
}

type AuthUserContextType = {
  authUser: string;
  setAuthUser: Dispatch<SetStateAction<string>>;
}

export type { Actor, Repo, GitHubEvent, Issue, GitHubUser, UserDataProps, AuthUserContextType };
