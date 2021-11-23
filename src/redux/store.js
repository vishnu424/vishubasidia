import {createStore, applyMiddleware, compose} from 'redux'

import thunk from 'redux-thunk'
import logger from 'redux-logger'

import {topicReducer} from './reducers/topicReducer'

const store = createStore(topicReducer, compose(applyMiddleware(thunk, logger)))

store.subscribe(() => {})

export default store
