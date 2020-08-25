import * as React from 'react';
import './users.scss'
import { UserDetailsType } from '../../types/user.types';

const UsersComponent = (props: { users: UserDetailsType[] }) => {
    const { users } = props;

    return (
        <div className="users-container">
            {users && users.length !== 0 &&
                users.map((user: UserDetailsType, index: number) => {
                    return (
                        <div className="user-details" key={index}>
                            <div className="section">
                                <a href={user.html_url} target="blank"><img src={user.avatar_url} alt={user.login} /></a><br />
                            </div>
                            <div className="section">
                                <span className="title">Username: </span><span className="value">{user.login}</span><br />
                            </div>
                            <div className="section">
                                <span className="title">Repo's URL: </span><span className="value"><a href={user.repos_url}> click here</a></span><br /><br />
                            </div>
                            <div className="section">
                                <span className="see-more"><a href={user.html_url} target="blank">see more</a> about the user</span>
                            </div>
                        </div>
                    )
                })
            }
            {(!users || users.length === 0) && (
                <div className="no-data">No data found.</div>
            )}
        </div>
    )
}
export { UsersComponent }