import React from 'react'
import { SpinnerDotted } from 'spinners-react'

const Loader = () => {
  return (
    <div className='flex items-center justify-center h-screen'>
        <SpinnerDotted size={81} thickness={180} speed={120} color="rgba(80, 68, 229, 1)" />
    </div>
  )
}

export default Loader
