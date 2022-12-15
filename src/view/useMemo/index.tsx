import React, { useState, useMemo } from 'react'

const results = (a: number, b: number) => {
  console.log(1);
  return a + b;
}

export default function Index() {
  const [count, setCount] = useState(1)

  //原本在调用results函数的时候只调用的了一次，但是在改变count状态的时候页面重新渲染，再次触发了results函数，这样性能就不好了
  //useMemo是用来缓存函数返回的结果，与usecallback相似
  const result = useMemo(() => {
    return results(10, 10)
  }, [])
  return (
    <div>
      <h1>useMemo钩子</h1>
      <h3>{count}</h3><h3>{result}</h3>
      <button onClick={() => setCount(count => count + 1)}>点击count递增</button>
    </div>
  )
}
