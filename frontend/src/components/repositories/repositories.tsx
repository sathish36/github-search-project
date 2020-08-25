import * as React from 'react';

import './repositories.scss'
import { RepositoryType } from '../../types/repository.types';

const RepoComponent = (props: { repositories: RepositoryType[] }) => {
    const { repositories } = props;

    return (
        <div className="repositories-container">
            {repositories && repositories.length !== 0 &&
                repositories.map((repo: RepositoryType, index: number) => {
                    return (
                        <div className="repo-details" key={index}>
                            <div className="section">
                                <span className="title">Title: </span><span className="value"><a href={repo.html_url} target="blank">{repo.name}</a></span> <br />
                            </div>
                            <div className="section">
                                <span className="title">Owner: </span><span className="value"><a href={repo.owner.html_url} target="blank">{repo.owner.login}</a></span><br />
                                <span><a href={repo.owner.html_url} target="blank"><img src={repo.owner.avatar_url} alt={repo.owner.login} /></a></span>
                            </div>
                            <div className="section">
                                <span className="title">Stars: </span><span className="value bold">{repo.stargazers_count}</span>,
                             <span className="title padding-left-20">Open issues: </span><span className="value bold">{repo.open_issues_count}</span><br />
                            </div>
                            <div className="section description">
                                <span className="title">Description: </span><span className="value">{repo.description}</span><br />
                            </div>
                        </div>
                    )
                })
            }
            {(!repositories || repositories.length === 0) && (
                <div className="no-data">No data found.</div>
            )}
        </div>
    )
}

export { RepoComponent }