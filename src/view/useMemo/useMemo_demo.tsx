import React from 'react'

export default function useMemo_demo(props: any) {
  // useMemo是可以来用缓存组件
  console.log('useMemo_demo');
  return (
    <div>useMemo_demo----{props.a + props.b}</div>
  )
}
