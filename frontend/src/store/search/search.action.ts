import { Dispatch } from 'redux';

import { SearchType } from '../../enums';
import { axiosInstance } from '../../utils';
import { actions } from '../../consts';

/**
 * Fetches the repositories from the API
 * 
 * @param searchText - this is the string that will be passed to the API
 */
export const fetchRepositories = (searchText: string) => {
    return async (dispatch: Dispatch) => {
        dispatch({ payload: { loading: true, status: false }, type: actions.SEARCH_REPOSITORIES });
        try {
            const result = await axiosInstance.post(`/api/search`, {
                type: SearchType.repositories,
                searchText
            });
            if (result.status === 200) {
                return dispatch({ payload: { loading: false, status: true, searchText, repositories: result.data.repositories }, type: actions.SEARCH_REPOSITORIES });
            }
            return dispatch({ payload: { loading: false, status: false }, type: actions.SEARCH_REPOSITORIES });
        } catch (err) {
            const { data } = err && err.response ? err.response : { data: { message: 'Error in fetching repositories' } };
            return dispatch({ payload: { loading: false, status: false, error: data.message }, type: actions.SEARCH_REPOSITORIES });
        }
    };
}

/**
 * Fetches the users from the API
 * 
 * @param searchText - this is the string that will be passed to the API
 */
export const fetchUsers = (searchText: string) => {
    return async (dispatch: Dispatch) => {
        dispatch({ payload: { loading: true, status: false }, type: actions.SEARCH_USERS });
        try {
            const result = await axiosInstance.post(`/api/search`, {
                type: SearchType.users,
                searchText
            });
            if (result.status === 200) {
                return dispatch({ payload: { loading: false, status: true, searchText, users: result.data.users }, type: actions.SEARCH_USERS });
            }
            return dispatch({ payload: { loading: false, status: false }, type: actions.SEARCH_USERS });
        } catch (err) {
            const { data } = err && err.response ? err.response : { data: { message: 'Error in fetching users' } };
            return dispatch({ payload: { loading: false, status: false, error: data.message }, type: actions.SEARCH_USERS });
        }
    };
};