import React, { useState, useCallback, useEffect } from 'react'
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