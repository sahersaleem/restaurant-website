import React, { ReactNode } from 'react'

interface Iprops {
    children:ReactNode
}














const Wrapper = ({children}:Iprops) => {
  return (
    <div className='w-full mx-auto max-w-7xl'>
      {children}
    </div>
  )
}

export default Wrapper
