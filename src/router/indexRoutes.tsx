import React, { lazy } from 'react'
import { BrowserRouter, Route, Router, Switch, Redirect } from 'react-router-dom'

import Lazy_loading from '../view/lazy与Suspense实现懒加载'
import react_loadable from '../view/react-loadable实现懒加载'
import LoadableComponent from '../view/LoadableComponent实现组件懒加载'
import useMemo from '../view/useMemo'

export default function IndexRoutes() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path='/Lazy_loading' component={Lazy_loading} />
        <Route path='/react_loadable' component={react_loadable} />
        <Route path='/LoadableComponent' component={LoadableComponent} />
        <Route path='/useMemo' component={useMemo} />
        <Redirect to='/useMemo' />
      </Switch>
    </BrowserRouter>
  )
}
