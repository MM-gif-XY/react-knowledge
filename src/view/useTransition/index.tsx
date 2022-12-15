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