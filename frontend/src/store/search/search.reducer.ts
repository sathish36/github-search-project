import { actions } from "../../consts";

const initialState = {
    loading: false,
    status: false,
    error: null,
    users: {},
    repositories: {}
}

export default function (state = initialState, action: any) {
    switch (action.type) {
        case 'persist/REHYDRATE':
            if(action.payload){
                const {users, repositories} = action.payload;
                return {...state, status:true, users, repositories}
            }
            break;
        case actions.SEARCH_USERS:
            if (action.payload.loading) {
                return { ...state, loading: true, status: false, error: false };
            }
            if (action.payload.status) {
                let { users } = state;
                let _users = {
                    ...users,
                    [action.payload.searchText]: action.payload.users
                }
                return {
                    ...state,
                    loading: false,
                    status: true,
                    users: _users,
                    error: false,
                };
            }
            return {
                ...state,
                loading: false,
                status: false,
                error: action.payload.error,
                users: []
            };
        case actions.SEARCH_REPOSITORIES:
            if (action.payload.loading) {
                return { ...state, loading: true, status: false, error: false };
            }
            if (action.payload.status) {
                const { repositories } = state;
                const _repositories = {
                    ...repositories,
                    [action.payload.searchText]: action.payload.repositories
                }
                return {
                    ...state,
                    loading: false,
                    status: true,
                    repositories: _repositories,
                    error: false,
                };
            }
            return {
                ...state,
                loading: false,
                status: false,
                error: action.payload.error,
                repositories: []
            };
        default:
            return state;
    }
}