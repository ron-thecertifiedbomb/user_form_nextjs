import React from 'react'

const Title: React.FC <{ message: string }> = ({ message })=> {
  return (
    <h1 className="text-4xl font-bold">
    {message}
  </h1>
 
  )
}

export default Title