import React, { useState } from 'react'
import { Route, Switch, Link } from 'react-router-dom'
import loadable from '@loadable/component'

// const one = loadable(() => import('./one'))
// const two = loadable(() => import('./two'))
const AsyncPage = loadable((props: any) => import(`./${props.page}`), {
  cacheKey: props => props.page,
})

export default function Index() {
  const [page, setPage] = useState("one")
  return (
    <div>
      <h1>LoadableComponent实现组件懒加载</h1>
      <button onClick={() => setPage('one')}><Link to='/LoadableComponent/one'>one</Link></button>
      <button onClick={() => setPage('two')}><Link to='/LoadableComponent/two'>two</Link></button>
      {page && <AsyncPage page={page} />}
      {/* <Switch>
        <Route path='/LoadableComponent/one' component={one} />
        <Route path='/LoadableComponent/two' component={two} />
      </Switch> */}
    </div>
  )
}
