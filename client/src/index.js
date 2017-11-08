import React from 'react'
import ReactDOM from 'react-dom'
import { Route } from 'react-router'
import thunkMiddleware from 'redux-thunk'
import App from './App'
import registerServiceWorker from './utils/registerServiceWorker'
import './index.css'
import { createStore, applyMiddleware, compose } from 'redux'
import reducers from './reducers'
import { Provider } from 'react-redux'
import createHistory from 'history/createBrowserHistory'
import { ConnectedRouter, routerMiddleware } from 'react-router-redux'
import { fetchPostsIfNeeded } from './actions'

const history = createHistory()

const logger = store => next => action => {
  console.group(action.type)
  console.info('dispatching', action)
  let result = next(action)
  console.log('next state', store.getState())
  console.groupEnd(action.type)
  return result
}

const middleware = routerMiddleware(history, logger)

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

const store = createStore(
  reducers,
  composeEnhancers(
    applyMiddleware(
      middleware,
      thunkMiddleware
    )
  )
)

store.dispatch(fetchPostsIfNeeded())

ReactDOM.render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <Route path='/' component={App} />
    </ConnectedRouter>
  </Provider>,
  document.getElementById('root')
)

registerServiceWorker()
