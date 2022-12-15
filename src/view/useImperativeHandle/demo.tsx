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