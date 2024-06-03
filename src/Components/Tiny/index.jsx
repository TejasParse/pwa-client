import React, { useRef } from 'react'
import { Editor } from '@tinymce/tinymce-react';

const Tiny = () => {

  const [pdfContent, setpdfContent] = useState("");

  const editorRef = useRef(null);
  const log = () => {
    if (editorRef.current) {
      console.log(editorRef.current.getContent());
      setpdfContent(editorRef.current.getContent())
    }
  };

  return (
    <div>
      <Editor
        onInit={(evt, editor) => editorRef.current = editor}
        initialValue="<p>This is the initial content of the editor.</p>"
        tinymceScriptSrc="/tinymce/tinymce.min.js"
        init={{
          height: 500,
          menubar: false,
          plugins: [
            'advlist autolink lists link image charmap print preview anchor',
            'searchreplace visualblocks code fullscreen',
            'insertdatetime media table paste code help wordcount'
          ],
          toolbar: 'undo redo | formatselect | ' +
            'bold italic backcolor | alignleft aligncenter ' +
            'alignright alignjustify | bullist numlist outdent indent | ' +
            'removeformat | help',
          content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
        }}
        apiKey='fuck you'
      />
      <button onClick={log}>Log editor content</button>
    </div>
  )
}

export default Tiny