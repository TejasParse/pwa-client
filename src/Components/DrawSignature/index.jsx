// SignaturePad.js

import React, { useRef, useState } from 'react';

const SignaturePad = () => {
  const canvasRef = useRef(null);
  const [isDrawing, setIsDrawing] = useState(false);

  const startDrawing = (event) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const context = canvas.getContext('2d');
    const { offsetX, offsetY } = event.nativeEvent;

    context.beginPath();
    context.moveTo(offsetX, offsetY);
    setIsDrawing(true);
  };

  const draw = (event) => {
    if (!isDrawing) return;
    const canvas = canvasRef.current;
    if (!canvas) return;

    const context = canvas.getContext('2d');
    const { offsetX, offsetY } = event.nativeEvent;

    context.lineTo(offsetX, offsetY);
    context.stroke();

    context.strokeStyle = '#faf3fc';
  };

  const endDrawing = () => {
    setIsDrawing(false);
  };

  const clearSignature = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const context = canvas.getContext('2d');
    context.clearRect(0, 0, canvas.width, canvas.height);
  };

  const saveSignature = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const dataURL = canvas.toDataURL(); 
    const base64 = dataURL.split(',')[1];
    const byteString = atob(base64);
    const byteStringLength = byteString.length;
    const imageBuffer = new ArrayBuffer(byteStringLength);
    const imageBufferView = new Uint8Array(imageBuffer);

    // Convert byte string to array buffer
    for (let i = 0; i < byteStringLength; i++) {
      imageBufferView[i] = byteString.charCodeAt(i);
    }

    console.log(imageBuffer, "Yo");
  };

  return (
    <div>
      <div >

        <canvas
          ref={canvasRef}
          width={400}
          height={200}
          style={{ cursor: "url(/pen.svg), auto", border: '1px solid black' }}
          onMouseDown={startDrawing}
          onMouseMove={draw}
          onMouseUp={endDrawing}
          onMouseOut={endDrawing}
        />
      </div>
      <br />
      <button onClick={clearSignature}>Clear Signature</button>
      <button onClick={saveSignature}>Save Signature</button>
    </div>
  );
};

export default SignaturePad;
