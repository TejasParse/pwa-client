import React from 'react'

const WordClone = () => {

    const documentURL = 'https://docs.google.com/document/d/1AkV8gC_z81pgVvropf2CyBXrYiifD7OysvIRTLHtQio/edit?usp=sharing';

    return (
        <div>
            <div>
                <iframe src={documentURL} width="100%" height="600px" />
            </div>
        </div>
    )
}

export default WordClone