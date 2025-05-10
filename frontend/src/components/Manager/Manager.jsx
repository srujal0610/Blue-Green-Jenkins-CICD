import React from 'react'
import {Nav} from "./index.js"
import {Main} from './index.js'
import { useSelector } from 'react-redux'


function Manager() {

  const user = useSelector(state => state.user.user)

  return (
    <>
        <Nav value1={`active`} userName={user}/>
        <Main/>
    </>
  )
}

export default Manager