export type GitHubIssue = {
    url: string;
    repository_url: string;
    id: number;
    node_id: string;
    number: 13;
    title: string;
    user: {
        login: string;
        id: number;
        node_id: string;
        avatar_url: string;
        url: string;
        type: string;
        site_admin: boolean;
    };
    state: string;
    locked: boolean;
    assignee: string;
    assignees: string[];
    comments: number;
    created_at: Date;
    updated_at: Date;
    closed_at: Date;
    pull_request: {
        url: string;
    };
    score: number;
};
