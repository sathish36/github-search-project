export type GitHubRepositoryType = {
    id: number;
    name: string;
    full_name: string;
    owner: {
        login: string;
        id: number;
        avatar_url: string;
        url: string;
        html_url: string;
    };
    html_url: string;
    description: string;
    url: string;
    git_url: string;
    clone_url: string;
    stargazers_count: number;
    watchers_count: number;
    open_issues_count: number;
};
