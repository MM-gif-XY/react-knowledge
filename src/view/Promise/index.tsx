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
          resolve(n) //触发之后可以将promise对象的状态设置为成功
        } else {
          reject(n) //触发之后可以将promise对象的状态设置为失败
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
