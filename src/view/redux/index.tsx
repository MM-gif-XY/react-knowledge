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
