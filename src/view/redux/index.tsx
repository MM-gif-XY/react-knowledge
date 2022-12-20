import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { actions } from './store/counter'

export default function Index() {
  const counter = useSelector((state) => ((state as any).counter.counter))
  const dispatch = useDispatch()
  const Increment = () => {
    dispatch(actions.increment())
  }
  const Decrement = () => {
    dispatch(actions.decrement())
  }
  const addBy = () => {
    dispatch(actions.addBy(10))
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
