import React, { useRef, useEffect } from 'react'
import Demo from './demo'

export default function Index() {
  const demoref = useRef()
  useEffect(() => {
    console.log(demoref.current);
  }, [])

  return (
    <div>
      <h1>useImperativeHandle</h1>
      <Demo ref={demoref} />
    </div>
  )
}
