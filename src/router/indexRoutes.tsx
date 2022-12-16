import React, { lazy } from 'react'
import { BrowserRouter, Route, Router, Switch, Redirect } from 'react-router-dom'

import Lazy_loading from '../view/lazy与Suspense实现懒加载'
import react_loadable from '../view/react-loadable实现懒加载'
import LoadableComponent from '../view/LoadableComponent实现组件懒加载'
import useMemo from '../view/useMemo'
import useImperativeHandle from '../view/useImperativeHandle'
import Effect from '../view/三个Effect的区别'
import useTransition from '../view/useTransition'
import useCallback from '../view/useCallback'
import Promise from '../view/Promise'

export default function IndexRoutes() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path='/Lazy_loading' component={Lazy_loading} />
        <Route path='/react_loadable' component={react_loadable} />
        <Route path='/LoadableComponent' component={LoadableComponent} />
        <Route path='/useMemo' component={useMemo} />
        <Route path='/useImperativeHandle' component={useImperativeHandle} />
        <Route path='/Effect' component={Effect} />
        <Route path='/useTransition' component={useTransition} />
        <Route path='/useCallback' component={useCallback} />
        <Route path='/Promise' component={Promise} />
        <Redirect to='/Promise' />
      </Switch>
    </BrowserRouter>
  )
}
