import { Suspense } from 'react'

import React from 'react'
import Reset_password from './_components/Reset_Password'

const page = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Reset_password/>
    </Suspense>
  )
}

export default page
