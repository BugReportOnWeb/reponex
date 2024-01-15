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
    name: string;
    company: null | string;
    blog: string;
    location: string;
    email: null | string;
    hireable: null | boolean;
    bio: string;
    twitter_username: null | string;
    public_repos: number;
    public_gists: number;
    followers: number;
    following: number;
    created_at: string;
    updated_at: string;
};

type GitHubRepo = {
    id: number;
    node_id: string;
    name: string;
    full_name: string;
    owner: {
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
    };
    private: boolean;
    html_url: string;
    description: string;
    fork: boolean;
    url: string;
    archive_url: string;
    assignees_url: string;
    blobs_url: string;
    branches_url: string;
    collaborators_url: string;
    comments_url: string;
    commits_url: string;
    compare_url: string;
    contents_url: string;
    contributors_url: string;
    deployments_url: string;
    downloads_url: string;
    events_url: string;
    forks_url: string;
    git_commits_url: string;
    git_refs_url: string;
    git_tags_url: string;
    git_url: string;
    issue_comment_url: string;
    issue_events_url: string;
    issues_url: string;
    keys_url: string;
    labels_url: string;
    languages_url: string;
    merges_url: string;
    milestones_url: string;
    notifications_url: string;
    pulls_url: string;
    releases_url: string;
    ssh_url: string;
    stargazers_url: string;
    statuses_url: string;
    subscribers_url: string;
    subscription_url: string;
    tags_url: string;
    teams_url: string;
    trees_url: string;
    clone_url: string;
    mirror_url: string;
    hooks_url: string;
    svn_url: string;
    homepage: string;
    language: string | null;
    forks_count: number;
    stargazers_count: number;
    watchers_count: number;
    size: number;
    default_branch: string;
    open_issues_count: number;
    is_template: boolean;
    topics: string[];
    has_issues: boolean;
    has_projects: boolean;
    has_wiki: boolean;
    has_pages: boolean;
    has_downloads: boolean;
    has_discussions: boolean;
    archived: boolean;
    disabled: boolean;
    visibility: string;
    pushed_at: string;
    created_at: string;
    updated_at: string;
    permissions: {
        admin: boolean;
        push: boolean;
        pull: boolean;
    };
    security_and_analysis: {
        advanced_security: {
            status: string;
        };
        secret_scanning: {
            status: string;
        };
        secret_scanning_push_protection: {
            status: string;
        };
    };
};

type GitHubEvent = {
    id: string;
    type: string;
    actor: {
        id: number;
        login: string;
        display_login: string;
        gravatar_id: string;
        url: string;
        avatar_url: string;
    };
    repo: {
        id: number;
        name: string;
        url: string;
    };
    payload: {
        number: number | null;
        pull_request: any | null; // string ? number
        forkee: any | null; // string ? number
        master_branch: string | null;
        ref_type: string | null;
        repository_id: number;
        action: string | null;
        push_id: number;
        size: number;
        distinct_size: number;
        ref: string;
        head: string;
        before: string;
        commits: string[]; // commits
        public: boolean;
        issue: {
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
            user: {
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
            };
            labels: string[];
            state: string;
            locked: boolean;
            assignee: string | null;
            assignees: string[];
            milestone: string | null;
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
                "+1": number;
                "-1": number;
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
        };
    };
    public: boolean;
    created_at: string;
};

type FilterRepo = {
    name: string;
    url: string;
    description?: string;
    language?: string;
    watchers_count: number;
    stargazers_count: number;
    forks_count: number;
    open_issues_count: number
}

export type { GitHubUser, GitHubRepo, GitHubEvent, FilterRepo };
