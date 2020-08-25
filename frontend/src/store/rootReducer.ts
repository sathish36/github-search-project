import { combineReducers } from 'redux';

import { persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage' // defaults to localStorage for web

import SearchReducer from './search/search.reducer'

/**
 * Configuration to persist the fetched users & repositories data
 * excluding the common keys from storage
 */
const searchPersistConfig = {
    key: 'search',
    storage,
    blacklist: ['loading', 'status', 'error']
}

const rootReducer = combineReducers({
    search: persistReducer(searchPersistConfig as any, SearchReducer as any)
})

export { rootReducer }