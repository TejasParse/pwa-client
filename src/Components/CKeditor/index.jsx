import React, { useState } from 'react'

import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

const CKEditor1 = () => {

  const [data, setdata] = useState('')

  return (
    <div>
      <div>
        <h2>Using CKEditor&nbsp;5 build in React</h2>
        <CKEditor
          editor={ClassicEditor}
          data={data}
          onReady={editor => {
            // You can store the "editor" and use when it is needed.
            console.log('Editor is ready to use!', editor);
          }}
          config={{
            toolbar: [
              'undo', 'redo',
              '|', 'heading',
              '|', 'bold', 'italic',
              '|', 'blockQuote', 'codeBlock',
              '|', 'bulletedList', 'numberedList', 'todoList', 'outdent', 'indent'
            ]
          }}
          onChange={(event, editor) => {
            console.log(event, editor);
            const texto = editor.getData();
            console.log(texto, "New Text");
          }}
          onBlur={(event, editor) => {
            // console.log('Blur.', editor);
          }}
          onFocus={(event, editor) => {
            // console.log('Focus.', editor);
          }}
        />
      </div>
    </div>
  )
}

export default CKEditor1