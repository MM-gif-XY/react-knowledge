import React from 'react'

function demo(props: any) {
  console.log("demo");
  return (
    <div>
      <button onClick={props.handled}>+</button>
    </div>
  )
}

export default React.memo(demo)
