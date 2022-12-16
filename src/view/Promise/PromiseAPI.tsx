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
