import React, { useState } from 'react'

import { pdfjs, Document, Page } from 'react-pdf';

import 'react-pdf/dist/Page/AnnotationLayer.css';
import 'react-pdf/dist/Page/TextLayer.css';

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
    'pdfjs-dist/build/pdf.worker.min.js',
    import.meta.url,
).toString();


import Draggable, { DraggableCore } from 'react-draggable';

const DraggingComponents = () => {

    const [numPages, setNumPages] = useState();
    const [pageNumber, setPageNumber] = useState(1);

    const [change, setchange] = useState([])

    const addDraggable = () => (

        setchange(prev => [
            ...prev,
            {
                text: "New Text"
            }
        ])

    )


    function onDocumentLoadSuccess({ numPages }) {
        setNumPages(numPages);
    }

    const handleStart = (event, data) => {
        console.log('Drag start:', data);
    };

    const handleDrag = (event, data) => {
        console.log('Dragging:', data);
    };

    const handleStop = (event, data) => {
        console.log('Drag stop:', data);
    };

    return (
        <div>
            <div style={{ maxWidth: "600px", position: 'relative' }} id='pdfBox' className='mb-10 mt-10'>

                {
                    change.map((elm, index) => (
                        <Draggable
                            key={index}
                            handle=".handle"
                            defaultPosition={{ x: 0, y: 0 }}
                            position={null}
                            grid={[1, 1]}
                            scale={1}
                            onStart={handleStart}
                            onDrag={handleDrag}
                            onStop={handleStop}
                            bounds="#pdfBox"
                        >
                            <div className='handle' style={{ width: "300px", position: "absolute", zIndex: '1000' }}>
                                <div></div>
                            </div>
                        </Draggable>
                    ))
                }

                <Document file="https://7even-sports.s3.eu-central-1.amazonaws.com/725e608d-9671-4561-b8cb-6ef0f3202785-DBMS_LabTest-01_S20200010209.pdf" onLoadSuccess={onDocumentLoadSuccess}>
                    <Page pageNumber={pageNumber} width={600} renderAnnotationLayer={false} renderTextLayer={false} renderForms={false} />
                </Document>


            </div>


            <div>
                <button className='btn btn-primary' onClick={addDraggable}>Click Me</button>
            </div>


            {/* <Draggable>
                <div>I can now be moved around!</div>
            </Draggable> */}
        </div>
    )
}

export default DraggingComponents