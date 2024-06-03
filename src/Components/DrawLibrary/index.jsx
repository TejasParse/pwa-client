import React from 'react'
import SignatureCanvas from 'react-signature-canvas'

const DrawLibrary = () => {
  return (
    <div className='bg-white'>
      <SignatureCanvas penColor='green'
        backgroundColor='#000000'
        canvasProps={{ width: 500, height: 200, className: 'sigCanvas'}} />
    </div>
  )
}

export default DrawLibrary