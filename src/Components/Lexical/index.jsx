// ConvertToPdf.js

import React, { useState, useRef } from 'react';
import mammoth from 'mammoth';
// import html2pdf from 'html2pdf.js';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

import { Editor } from '@tinymce/tinymce-react';

const ConvertToPdf = () => {
    const [docxContent, setDocxContent] = useState(null);

    const [htmlContent, setHtmlContent] = useState("");

    const handleDocxUpload = async (e) => {
        const file = e.target.files[0];
        const content = await readFileAsync(file);
        setDocxContent(content);
    };

    const readFileAsync = (file) => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = (event) => {
                resolve(event.target.result);
            };
            reader.onerror = (error) => reject(error);
            reader.readAsArrayBuffer(file);
        });
    };

    const convertToPdf = () => {
        if (docxContent) {
            mammoth.convertToHtml({ arrayBuffer: docxContent })
                .then((result) => {
                    const html = result.value;
                    const convertedHtml = `
            <!DOCTYPE html>
            <html lang="en">
              <head>
                <meta charset="UTF-8">
                <title>Document</title>
              </head>
              <body>
                ${html}
              </body>
            </html>
          `;

                    //   console.log(convertedHtml, "Converted to HTML bc");
                    setHtmlContent(html)

                    //   html2pdf().from(convertedHtml).save();
                })
                .catch((error) => {
                    console.error('Error converting DOCX to HTML:', error);
                });
        }
    };

    const editorRef = useRef(null);
  const log = () => {
    if (editorRef.current) {
      console.log(editorRef.current.getContent());
    }
  };

    return (
        <div>
            <input type="file" onChange={handleDocxUpload} />
            <button onClick={convertToPdf}>Convert to PDF</button>

            <div className='mt-4'>
                <h2>Using CKEditor&nbsp;5 build in React</h2>
                <CKEditor
                    editor={ClassicEditor}
                    data={htmlContent}
                    onReady={editor => {
                        // You can store the "editor" and use when it is needed.
                        console.log('Editor is ready to use!', editor);
                    }}
                    onChange={(event) => {

                        console.log(event);
                    }}
                    onBlur={(event, editor) => {
                        console.log('Blur.', editor);
                    }}
                    onFocus={(event, editor) => {
                        console.log('Focus.', editor);
                    }}
                />
            </div>
            <div className='mt-5'>
                <h2>Using TinyMCE&nbsp;5 build in React</h2>
                <div>
                    <Editor
                        onInit={(evt, editor) => editorRef.current = editor}
                        initialValue={htmlContent}
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
      
                    />
                    <button onClick={log}>Log editor content</button>
                </div>
            </div>
        </div>
    );
};

export default ConvertToPdf;
