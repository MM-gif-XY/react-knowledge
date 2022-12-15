import React, { useEffect, useLayoutEffect, useInsertionEffect, useState } from 'react'

export default function Index() {

  useEffect(() => {
    console.log('useEffect');
  })
  useLayoutEffect(() => {
    console.log('useLayoutEffect');
  })
  useInsertionEffect(() => {
    console.log('useInsertionEffect');
  })
  return (
    <div>index</div>
  )
}
