const { logger } = require('redux-logger')
const thunkMiddleware = require('redux-thunk').default
const { createStore, applyMiddleware } = require('redux')
const { composeWithDevTools } = require('redux-devtools-extension')
const thunk = require('redux-thunk').default
const rootReducer = require('./rootReducer')
const userReducer = require('./user/reducer')

const store = createStore(
    rootReducer, composeWithDevTools(applyMiddleware(logger, thunk, thunkMiddleware))
)
export default store
