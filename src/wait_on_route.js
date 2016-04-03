'use strict'

import { findRenderedComponentWithType } from 'react-addons-test-utils'
import { Router } from 'react-router'

import { getRoute } from '~/end_to_end/helpers/essentials'

export function waitToBeOnRoute (app, targetRoute, trigger) {
  if (typeof trigger !== 'function') {
    throw new Error('The trigger should be a function that will trigger the route change')
  }

  const promise = waitingForRoutingPromiseFactory(app, targetRoute)

  trigger()

  return promise
}

function waitingForRoutingPromiseFactory (app, targetRoute) {
  return new Promise(function (resolve, reject) {
    const router = getRouter(app)
    listenOnComponentDidUpdate(router, () => {
      if (getRoute().toString() === targetRoute) {
        resolve()
      }
    })
  })
}

function getRouter (app) {
  return findRenderedComponentWithType(app, Router)
}
