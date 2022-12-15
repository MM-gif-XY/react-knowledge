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
