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

  const handlereject = () => {
    // 无论传入的数据是什么，返回的实例对象的状态都是失败的，返回的结果是传入成功的对象
    let p = Promise.reject(521)
    console.log(p);
    let p2 = Promise.reject("521")
    console.log(p2);
    let p3 = Promise.reject(new Promise<any>((resolve, reject) => {
      resolve('ok')
    }))
    console.log(p3);
  }

  const handleall = () => {
    let p1 = new Promise<any>((resolve, reject) => {
      resolve('ok')
    })
    let p2 = Promise.resolve('Success')
    let p3 = Promise.resolve('OK')

    const result = Promise.all([p1, p2, p3])
    console.log('result', result)
  }

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
      <button onClick={() => { handleresolve() }}>Promise.resolve方法</button><span>返回一个成功或失败的promise对象</span><br />
      <button onClick={() => { handlereject() }}>Promise.reject方法</button><span>快速的返回的一个失败的promise对象</span><br />
      <button onClick={() => { handleall() }}>Promise.all方法</button><span>返回一个由n个promise对象的数组,数组中的promise对象只要有一个失败最终的结果是失败</span><br />
      <button onClick={() => { handlerace() }}>Promise.race方法</button><span>返回一个由n个promise对象的数组,数组中第一个promise对象返回结果决定最终结果</span><br />
    </div>
  )
}
