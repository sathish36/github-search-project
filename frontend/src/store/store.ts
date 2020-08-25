import { createStore, applyMiddleware } from 'redux';
import { persistStore } from 'redux-persist'

import thunk from 'redux-thunk';
import { rootReducer } from './rootReducer'

const initialState: any = {};
const middleware = [thunk]
const store = createStore(rootReducer, initialState, applyMiddleware(...middleware))
let persistor = persistStore(store)

export { store, persistor }