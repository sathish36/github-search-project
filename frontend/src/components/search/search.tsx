import * as React from 'react';
import logo from './../../images/logo.png';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import * as _ from 'lodash';
import { fetchUsers, fetchRepositories } from '../../store/rootActions';
import { SearchType } from '../../enums';
import './search.scss';
import { UsersComponent } from './../users/users';
import { RepoComponent } from './../repositories/repositories'
import { ISearchProps } from '../../interfaces';

class Search extends React.Component<ISearchProps, { searchText: string, type: SearchType }> {

  constructor(props: ISearchProps) {
    super(props)
    this.state = {
      searchText: '',
      type: SearchType.users
    }

    this.throttleHandleChange = _.debounce(this.throttleHandleChange.bind(this), 500);
    this.onSearch = this.onSearch.bind(this);
  }

  throttleHandleChange() {
    this.fetchData();
  }

  // on user typing in search bar update the state and call the throttle to which calls api for 500 milliseconds 
  // this throttle handles the delay in calling fetchData using debounce  
  public onSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const searchText = e.target.value;
    this.setState({ searchText }, this.throttleHandleChange);
  }

  public fetchData = () => {
    const { searchText, type } = this.state;
    if (searchText.length > 2) {
      const { fetchUserAction, fetchRepositoriesAction, users, repositories } = this.props;
      if (type === SearchType.users) {
        // check if the search text already fetched.
        // if not then trigger the action to fetch data from API
        if (!users || !users[searchText]) {
          fetchUserAction(searchText)
        }
      } else if (type === SearchType.repositories) {
        // check if the search text already fetched.
        // if not then trigger the action to fetch data from API
        if (!repositories || !repositories[searchText]) {
          fetchRepositoriesAction(searchText)
        }
      }
    }
  }

  // on changing the type update the state and fetch the data
  public onTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    let type = SearchType.users;
    if (e.target.value === SearchType.repositories) {
      type = SearchType.repositories
    }
    this.setState({ type }, this.fetchData)
  }

  /**
   * It renders the search bar and list of users/repositories based on the search
   */
  render() {
    const { searchText, type } = this.state;
    const { loading, status, error, users, repositories } = this.props;
    const showUsersData = searchText.length > 2 && type === SearchType.users && users && users[searchText]
    const showReposData = searchText.length > 2 && type === SearchType.repositories && repositories && repositories[searchText]
    return (
      <div className="app-container">
        <header className={`App-header ${(showUsersData || showReposData) ? 'top-header' : 'center-header'}`}>
          <div className="title-bar">
            <div className="logo">
              <img src={logo} alt="GitHub logo" />
            </div>
            <div className="title-details">
              <span className="title">GitHub Searcher</span><br />
              <span className="description">Search users or repositories below</span>
            </div>
          </div>
          <div className="inputs">
            <input className="search-box" onChange={this.onSearch} placeholder="Start type to search..." name="searchText" value={searchText} />
            <select className="entity-type" name="type" onChange={this.onTypeChange} defaultValue="users">
              <option value="users">Users</option>
              <option value="repositories">Repositories</option>
            </select>
          </div>
          {loading && (
            <div className="loading">Loading</div>
          )}
          {!loading && !status && error && (
            <div className="error">{error}</div>
          )}
        </header>
        {!loading && showUsersData && (
          <UsersComponent users={users[searchText]} />
        )}
        {!loading && showReposData && (
          <RepoComponent repositories={repositories[searchText]} />
        )}
      </div>
    );
  }
}

const stateToProps = (state: any) => {
  return {
    loading: state.search.loading,
    status: state.search.status,
    error: state.search.error,
    users: state.search.users,
    repositories: state.search.repositories
  };
};

const dispatchers = (dispatch: Dispatch) => {
  return {
    fetchUserAction: (searchText: string) => dispatch<any>(fetchUsers(searchText)),
    fetchRepositoriesAction: (searchText: string) => dispatch<any>(fetchRepositories(searchText)),
  };
};

const SearchComponent = connect(stateToProps, dispatchers)(Search);

export default SearchComponent;
