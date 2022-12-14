import React, { lazy, Suspense } from 'react'
import { BrowserRouter, Route, Router, Switch, Link } from 'react-router-dom'

const Subpage1 = lazy(() => import('./Subpage1'))
const Subpage2 = lazy(() => import('./Subpage2'))

export default function Lazy_loading() {
  return (
    <div>
      <h1>React内置的路由懒加载方法 lazy和Suspense搭配使用</h1>
      <button><Link to="/Lazy_loading/subpage1">to subpage1</Link></button>
      <button><Link to="/Lazy_loading/subpage2">to subpage2</Link></button>
      <Switch>
        <Suspense fallback={<div>加载中</div>}>
          <Route path="/Lazy_loading/subpage1" component={Subpage1} />
          <Route path="/Lazy_loading/subpage2" component={Subpage2} />
        </Suspense>
      </Switch>
    </div>
  )
}
