## lazy与Suspense实现组件懒加载
React在原生中要使用lazy和Suspense组件进行路由组件的懒加载
```jsx
import React, { lazy, Suspense } from 'react'
import { BrowserRouter, Route, Router, Switch, Link } from 'react-router-dom'

//导入路由的方法
const Subpage1 = lazy(() => import('./Subpage1'))
const Subpage2 = lazy(() => import('./Subpage2'))

export default function Lazy_loading() {
  return (
    <div>
      <h1>React内置的路由懒加载方法 lazy和Suspense搭配使用</h1> 
      {/*点击实现跳转的方法*/}
      <button><Link to="/Lazy_loading/subpage1">to subpage1</Link></button> 
      <button><Link to="/Lazy_loading/subpage2">to subpage2</Link></button>
      <Switch>
        <Suspense fallback={<div>加载中</div>}>
        {/*页面展示的位置，需要使用Suspense包裹路由*/}
          <Route path="/Lazy_loading/subpage1" component={Subpage1} />
          <Route path="/Lazy_loading/subpage2" component={Subpage2} />
        </Suspense>
      </Switch>
    </div>
  )
}
```



## LoadableComponent实现组件懒加载

***第一种方法（搭配路由进行懒加载）***

```jsx
import React, { useState } from 'react'
import { Route, Switch, Link } from 'react-router-dom'
import loadable from '@loadable/component'

//导入组件的方法
const one = loadable(() => import('./one'))
const two = loadable(() => import('./two'))
// const AsyncPage = loadable((props: any) => import(`./${props.page}`), {
//   cacheKey: props => props.page,
// })

export default function Index() {
  const [page, setPage] = useState("one")
  return (
    <div>
      <h1>LoadableComponent实现组件懒加载</h1>
      {/*点击实现跳转的方法*/}
      <button onClick={() => setPage('one')}><Link to='/LoadableComponent/one'>one</Link></button>
      <button onClick={() => setPage('two')}><Link to='/LoadableComponent/two'>two</Link></button>
      {/* {page && <AsyncPage page={page} />} */}
      <Switch>
        {/*页面展示的位置*/}
        <Route path='/LoadableComponent/one' component={one} />
        <Route path='/LoadableComponent/two' component={two} />
      </Switch>
    </div>
  )
}

```



***第二种方法（搭配useState实现懒加载）***

```jsx
import React, { useState } from 'react'
import { Route, Switch, Link } from 'react-router-dom'
import loadable from '@loadable/component'

// const one = loadable(() => import('./one'))
// const two = loadable(() => import('./two'))
const AsyncPage = loadable((props: any) => import(`./${props.page}`), {
  cacheKey: props => props.page,
}) //导入组件的方法

export default function Index() {
  const [page, setPage] = useState("one")
  return (
    <div>
      <h1>LoadableComponent实现组件懒加载</h1>
      {/*点击实现跳转的方法*/}
      <button onClick={() => setPage('one')}><Link to='/LoadableComponent/one'>one</Link></button>
      <button onClick={() => setPage('two')}><Link to='/LoadableComponent/two'>two</Link></button>
      {page && <AsyncPage page={page} />} {/*页面展示内容，搭配useState实现修改状态后改变页面*/}
      {/* <Switch>
        <Route path='/LoadableComponent/one' component={one} />
        <Route path='/LoadableComponent/two' component={two} />
      </Switch> */}
    </div>
  )
}

```

***该库没有内置的方式解决（加载页面一闪的问题）和（加载时间很长后展示错误的问题），需要使用其他的库配合使用***

## React-loadable实现组件懒加载

```jsx
import React from 'react'
import { Route, Switch, Link } from 'react-router-dom'
import Loadable from 'react-loadable';

// 这是实现当在加载页面的使用出现网络慢展示的页面
function Loading() {
  return <div>loading....</div>
}


//下面是导入需要懒加载的页面的方法
const Subpage_1 = Loadable({
  loader() {
    return import('./Subpage_1');
  }, //导入页面
  loading: Loading, //配置网络慢展示的页面
  delay: 500,//设置延迟加载：就是当网络不是很快和很慢的使用使用，加载的页面会出现一闪的效果，这也用户体验不好，设置这时间就是让在500ms内都是加载的页面
});
const Subpage_2 = Loadable({
  loader() {
    return import('./Subpage_2');
  },
  loading: Loading
});


export default function react_loadable_loading() {
  return (
    <div>
      <h1>react_loadable实现懒加载</h1>
      <button><Link to='/react_loadable/supage_1'>supage_1</Link></button>
      <button><Link to='/react_loadable/supage_2'>supage_2</Link></button>
      <Switch>
        <Route path='/react_loadable/supage_1' component={Subpage_1} />
        <Route path='/react_loadable/supage_2' component={Subpage_2} />
      </Switch>
    </div>
  )
}
```

***React-loadable由于后面不在进行更新了，当在较新的React使用这个库的使用出现报错***

```jsx
react_devtools_backend.js:4012 Warning: Legacy context API has been detected within a strict-mode tree.
The old API will be supported in all 16.x releases, but applications using it should migrate to the new version.
Please update the following components: LoadableComponent
```

## useMome

```jsx
import React, { useState, useMemo } from 'react'


export default function Index() {
  const [count, setCount] = useState(1)
  let a = 10
  let b = 10
  if (count % 10 === 0) {
    a = 100
  }
  const results = (a: number, b: number) => {
    console.log(1);
    return a + b;
  }
  //原本在调用results函数的时候只调用的了一次，但是在改变count状态的时候页面重新渲染，再次触发了results函数，这样性能就不好了
  //useMemo是用来缓存函数返回的结果，与usecallback相似
  const result = useMemo(() => {
    return results(a, b)
  }, [a, b]) //数组是填写依赖项的，当调用函数的依赖发生了改变要重新调用函数,当a或者b的值发生了改变重新调用函数
  return (
    <div>
      <h1>useMemo钩子</h1>
      <h3>{count}</h3>
      <h3>{result}</h3>
      <button onClick={() => setCount(count => count + 1)}>点击count递增</button>
    </div>
  )
}

```

**useMome缓存组件**

```jsx
import React, { useState, useMemo } from 'react'
import UseMemodemo from './useMemo_demo'

export default function Index() {
  const [count, setCount] = useState(1)
  let a = 10
  let b = 10
  if (count % 10 === 0) {
    a = 100
  }
  // const results = (a: number, b: number) => {
  //   console.log(1);
  //   return a + b;
  // }
  //原本在调用results函数的时候只调用的了一次，但是在改变count状态的时候页面重新渲染，再次触发了results函数，这样性能就不好了
  //useMemo是用来缓存函数返回的结果，与usecallback相似
  const result = useMemo(() => {
    return <UseMemodemo a={a} b={b} /> //useMome缓存组件的写法
  }, [a, b]) //数组是填写依赖项的，当调用函数的依赖发生了改变要重新调用函数,当a或者b的值发生了改变重新调用函数
  return (
    <div>
      <h1>useMemo钩子</h1>
      <h3>{count}</h3>
      <h3>{result}</h3>

      <button onClick={() => setCount(count => count + 1)}>点击count递增</button>
    </div>
  )
}

//子组件
import React from 'react'

export default function useMemo_demo(props: any) {
  // useMemo是可以来用缓存组件
  console.log('useMemo_demo');
  return (
    <div>useMemo_demo----{props.a + props.b}</div>
  )
}

```

## React中父组件获取子组件的方法或数据

**使用React.forwardRef包裹子组件----下面的方法会直接将子组件的dom元素给父组件操作**

```jsx
//父组件
import React, { useRef, useEffect } from 'react'
import Demo from './demo'

export default function Index() {
  const demoref = useRef()
  useEffect(() => {
    console.log(demoref.current);
  }, [])

  return (
    <div>
      <h1>useImperativeHandle</h1>
      <Demo ref={demoref} />
    </div>
  )
}
//子组件
import React, { useRef } from 'react'

//下面的ref参数必须
function Demo(props: any, ref: any) {
  {/* 当要在父组件中获取子组件的元素的时候，子组件要使用React.forwardRef包裹整个组件，并要在参数中写上ref参数 */ }
  const inputref = useRef<HTMLInputElement>(null)
  const handle = () => {
    console.log((inputref.current as any).value);
  }
  return (
    <div >
      <h1 ref={ref}>demo</h1>
      <input type="text" ref={inputref} />
      <button onClick={() => { handle() }}>获取input的值</button>
    </div>
  )
}

export default React.forwardRef(Demo)
```

**React.forwardRef包裹子组件并搭配useImperativeHandle钩子使用---由子组件限制父组件操作dom元素或方法**

```jsx
// 父组件
import React, { useRef, useEffect } from 'react'
import Demo from './demo'

export default function Index() {
  const demoref = useRef()
  useEffect(() => {
    console.log(demoref.current);
  }, [])

  return (
    <div>
      <h1>useImperativeHandle</h1>
      <Demo ref={demoref} />
    </div>
  )
}

//子组件
import React, { useRef, useImperativeHandle } from 'react'

function Demo(props: any, ref: any) {
  {/* 当要在父组件中获取子组件的元素的时候，子组件要使用React.forwardRef包裹整个组件，并要在参数中写上ref参数 */ }
  const inputref = useRef<HTMLInputElement>(null)
  useImperativeHandle(ref, () => {
    return handle //将handle方法返回给父组件使用
  }) //useImperativeHandle可以用来将ref返回给父组件中的值进行限制，不能由父组件直接操作子组件的dom
  const handle = () => {
    console.log((inputref.current as any).value);
  }
  return (
    <div >
      <h1>demo</h1>
      <input type="text" ref={inputref} />
      <button onClick={() => { handle() }}>获取input的值</button>
    </div>
  )
}

export default React.forwardRef(Demo)
```

## useEffect, useLayoutEffect, useInsertionEffect区别

