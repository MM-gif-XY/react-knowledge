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

**对应的文件夹中drawio文件需要在vscode中安装Draw.io Integration插件（待理解）**

```jsx
//useEffect,useLayoutEffect在React18后相关的执行时期微乎其微，在React18后useEffect处于动态的，可以说是没有准确的执行时期
//useInsertionEffect的执行时期是在state改变后与Dom改变前执行的，主要是为了解决一些样式的注入问题

import React, { useEffect, useLayoutEffect, useInsertionEffect } from 'react'

export default function Index() {
  useEffect(() => {
    console.log('useEffect'); //打印两次
  })
  useLayoutEffect(() => {
    console.log('useLayoutEffect'); //打印两次
  })
  useInsertionEffect(() => {
    console.log('useInsertionEffect'); //打印一次
  })
  return (
    <div>index</div>
  )
}

```

## useTransition

**useTransition**

```jsx
import React, { useTransition, useState } from 'react'

export default function Index() {
  const [isPending, startTransition] = useTransition() //isPending是一个布尔值，startTransition函数 isPending值是跟着startTransition执行进度变化
  const [count, setCount] = useState(0)
  const [counts, setCounts] = useState(0)
  const handle = () => {
    setCount(count + 1)
    startTransition(() => {  //useTransition是跟原本直接使用startTransition一样，但是使用useTransition有两个返回值进行判断
      setCounts(counts + 1)
    })
  }
  return (
    <div>
      {count} {!isPending && counts}
      <button onClick={() => { handle() }}>+</button>
    </div>
  )
}

//startTransition功能就是让在一个函数中修改状态时，等startTransition包裹外的useState执行完之后在执行包裹内的useState
//（简单理解就是对useState进行优先级）

//useTransition中的startTransition与原本startTransition一样的功能
```

## useCallback

```jsx
// 父组件
import React, { useState, useCallback } from 'react'
import Demo from './demo'

export default function Index() {
  console.log("index");

  const [count, setcount] = useState(0)
  const handled = useCallback(() => {
    setcount(count => count + 1)
  }, []) //第二个参数必须
  return (
    <div>
      {count}
      <h1>index</h1>
      <button onClick={() => { handled() }}>+</button>
      <h1>demo</h1>
      <Demo handled={handled} />
    </div>
  )
}

// 在index组件中实现点击 + 对count进行加法，在index中将handled方法传递给demo组件，让demo组件也可以对父组件中的count进行加法
// 但是在点击index中的+的时候会重新渲染index组件和demo组件，这样性能就出现问题，（useCallback解决）
// useCallback是用来包裹在子组件调用父组件中的方法，当在父组件或子组件中触发父组件的方法都不会重新渲染子组件，提高性能

//注意点：useCallback(()=>{},[]) 后面的数组必须填上，子组件在导出的时候必须使用React.memo包裹

//子组件
import React from 'react'

function demo(props: any) {
  console.log("demo");
  return (
    <div>
      <button onClick={props.handled}>+</button>
    </div>
  )
}

export default React.memo(demo)
```

## Promise

**Promise:Promise是一个构造函数，promise对象用来封装一个异步操作并可以获取成功或失败的结果值**

```jsx
//什么是回调地狱问题(异步操作中存在多个连续的异步操作)，而promise是支持链式调用，解决回调地狱问题
asyncFunction1(opt,(...args1)=>{
    asyncFunction2(opt,(...args2)=>{
        asyncFunction3(opt,(...args3)=>{
            asyncFunction4(opt,(...args4)=>{})
        })
    })
})
```

```jsx
import React from 'react'

function rand(m: any, n: any) {
  return Math.ceil(Math.random() * (n - m + 1)) + m - 1;
}

export default function index() {
  const handle = () => {
    //没有使用promise实现
    /*     setTimeout(() => {
          let n = rand(1, 100);
          if (n <= 30) {
            alert('恭喜中奖')
          } else {
            alert('再接再厉')
          }
        }, 1000) */
    // promise实现上面相同的效果 resolve解决 reject拒绝 都是函数类型的数据
    const p = new Promise<number>((resolve, reject) => {
      setTimeout(() => {
        let n = rand(1, 100);
        if (n <= 30) {
          resolve(n) //触发之后可以将promise对象的状态设置为成功 可以将异步操作的参数传递给成功的回调中
        } else {
          reject(n) //触发之后可以将promise对象的状态设置为失败 可以将异步操作的参数传递给失败的回调中
        }
      }, 1000)
    })
    // 第一个是成功时候的回调，第二个是失败的回调
    p.then((value) => {
      alert('恭喜----' + value)
    }, (value) => {
      alert('再接再厉----' + value)
    })

  }
  return (
    <div>
      <h1>Promise</h1>
      <button onClick={() => { handle() }}>点击抽奖</button>
    </div>
  )
}
```

#### Promise状态与结果值

```jsx
Promise {
   <pending>}
   [[Prototype]]: Promise
   [[PromiseState]]: "rejected"
   [[PromiseResult]]: 43 
            
PromiseState实例对象中的状态：三种状态
    pending 未决定
	resolved 成功
	rejected 失败
        
PromiseResult实例对象中的结果值：保存对象中成功或者失败的结果
   resolved与rejected可以修改PromiseResult的值
```

#### Promise的实例对象API

**then与catchAPI**

```jsx
import React from 'react'

export default function PromiseAPI() {
  const handlethen = () => {
    let n = 10
    let p = new Promise<number>((resolved, rejected) => {
      //里面就是放置两个回调函数的地方
      if (n == 3) {
        resolved(n)
      } else {
        rejected(n)
      }
    })
    p.then((value) => {
      console.log(value);  //第一个函数是触发上面promise对象中的resolved函数的回调
    }, (value) => {
      console.log(value);  //第二个函数是触发上面promise对象中的rejected函数的回调
    })
  }

  const handlecatch = () => {
    let p = new Promise<number>((resolved, rejected) => {
      rejected('失败')
    })
    p.catch(reason => {  //catchAPI是只能指定失败的回调
      alert(reason)
    })
  }
  return (
    <div>
      <h1>PromiseAPI</h1>
      <span>指定用于成功或者失败的回调，返回一个新的promise对象</span> <br />
      <button onClick={() => { handlethen() }}>thenAPI</button>
      <button onClick={() => { handlecatch() }}>catchAPI</button>
    </div>
  )
}
```

**Promise.resolve方法**

```jsx
import React from 'react'

export default function PromiseFunction() {
  const handleresolve = () => {
    let p = Promise.resolve<number>(521)
    console.log(p);
    // 参数是非Promise类型的对象，则返回的结果为promise对象
    // 参数是Promise对象，则参数的结果决定了resolve的结果
    let po = Promise.resolve<void>(new Promise<any>((resolve, reject) => {
      resolve('ok')
    }))
    console.log(po);

  }
  return (
    <div>
      <h1>PromiseFunction</h1>
      <button onClick={() => { handleresolve() }}>Promise.resolve方法</button>
    </div>
  )
}
```

**Promise.reject方法**

```jsx
import React from 'react'

export default function PromiseFunction() {
  // 无论传入的数据是什么，返回的实例对象的状态都是失败的，返回的结果是传入成功的对象
  const handlereject = () => {
    let p = Promise.reject(521)
    console.log(p);
    let p2 = Promise.reject("521")
    console.log(p2);
    let p3 = Promise.reject(new Promise<any>((resolve, reject) => {
      resolve('ok')
    }))
    console.log(p3);
  }

  
  return (
    <div>
      <h1>PromiseFunction</h1>
      <button onClick={() => { handlereject() }}>Promise.reject方法</button><span>快速的返回的一个失败的promise对象</span><br />
    </div>
  )
}
```

**Promise.all方法**

```jsx
import React from 'react'

export default function PromiseFunction() {
  const handleall = () => {
    let p1 = new Promise<any>((resolve, reject) => {
      resolve('ok')
    })
    let p2 = Promise.resolve('Success')
    let p3 = Promise.resolve('OK')

    const result = Promise.all([p1, p2, p3])
    console.log(result);
  }

  return (
    <div>
      <h1>PromiseFunction</h1>
      <button onClick={() => { handleall() }}>Promise.all方法</button><span>返回一个n个promise对象的数组,数组中的promise对象只要有一个失败最终的结果是失败</span><br />
    </div>
  )
}

```

**Promise.race方法**

```jsx
import React from 'react'

export default function PromiseFunction() {
  const handlerace = () => {
    let p1 = new Promise<any>((resolve, reject) => {
      resolve('ok')
    })
    let p2 = Promise.resolve('Success')
    let p3 = Promise.resolve('OK')

    const result = Promise.race([p1, p2, p3])
    console.log('result', result)
  }

  return (
    <div>
      <h1>PromiseFunction</h1>
      <button onClick={() => { handlerace() }}>Promise.race方法</button><span>返回一个由n个promise对象的数组,数组中第一个promise对象返回结果决定最终结果</span><br />
    </div>
  )
}

```

## redux

![image-20221220155610068](C:\Users\AnyDoorTrip-09\Desktop\react-knowledge\public\image\image-20221220155610068.png)

![image-20221220155924232](C:\Users\AnyDoorTrip-09\Desktop\react-knowledge\public\image\image-20221220155924232.png)

![image-20221220160150276](C:\Users\AnyDoorTrip-09\Desktop\react-knowledge\public\image\image-20221220160150276.png)

![image-20221220162616300](C:\Users\AnyDoorTrip-09\Desktop\react-knowledge\public\image\image-20221220162616300.png)

**页面**

```jsx
import React from 'react'
import { useSelector, useDispatch } from 'react-redux' //获取仓库的状态变量，以及触发仓库的方法
import { actions } from './store/counter' //调用仓库中的方法使用

export default function Index() {
  const counter = useSelector((state) => ((state as any).counter.counter)) //获取创库中的状态变量
  const dispatch = useDispatch()
  const Increment = () => {
    dispatch(actions.increment()) //调用仓库中的方法
  }
  const Decrement = () => {
    dispatch(actions.decrement()) //调用仓库中的方法
  }
  const addBy = () => {
    dispatch(actions.addBy(10)) //调用仓库中的方法
  }
  return (
    <div>
      <div>index</div>
      <div>{counter}</div>
      <button onClick={Increment}>Increment</button>
      <button onClick={Decrement}>Decrement</button>
      <button onClick={addBy}>Add By 10</button>
    </div>
  )
}

```

**配置store**

```jsx
import { configureStore } from '@reduxjs/toolkit' //配置store库
import counterSlice from './counter' // 导入创库

const store = configureStore({
  reducer: {
    counter: counterSlice.reducer  //设置仓库和store的连接
  }
})

export default store;
```

**配置仓库**

```jsx
import { createSlice } from '@reduxjs/toolkit' //初始化仓库使用

const counterSlice = createSlice({
  name: 'counter',
  initialState: { counter: 0 }, //状态变量的初始化
  reducers: {
    increment(state) {  //修改状态变量的方法
      state.counter++;
    },
    decrement(state) { //修改状态变量的方法
      state.counter--;
    },
    addBy(state, action) { //修改状态变量的方法，在页面中传入了值就会到action参数上
      state.counter += action.payload;
    }
  }
})

export const actions = counterSlice.actions;  //导入actions方便页面使用
export default counterSlice;  //导入仓库方便store使用
```

