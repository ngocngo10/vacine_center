import React from 'react';
import { CKEditor } from '@ckeditor/ckeditor5-react';
// import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import ClassicEditor from '@ckeditor/ckeditor5-editor-classic/src/classiceditor';
import './index.css';

const TinyMceEditor = ({ contentInform, setContentInform }) => {
  const handleOnChange = (event, editor) => {
    const data = editor.getData();
    console.log({ event, editor, data });
    setContentInform(data);
  };
  return (
    <div className="ckeditor-wrapper">
      <CKEditor
        editor={ClassicEditor}
        data={contentInform}
        config={{
          toolbar: [
            'heading',
            '|',
            'bold',
            'italic',
            'link',
            'bulletedList',
            'numberedList',
            'blockQuote',
            'ckfinder',
            '|',
            'imageTextAlternative',
            'imageUpload',
            'imageStyle:full',
            'imageStyle:side',
            '|',
            'mediaEmbed',
            'insertTable',
            'tableColumn',
            'tableRow',
            'mergeTableCells',
            '|',
            'undo',
            'redo'
          ],

          list: {
            properties: {
              styles: true,
              startIndex: false,
              reversed: true
            }
          },

          toolbar_standard: [
            {
              name: 'stuff',
              items: ['Cut', 'Copy', 'Paste', 'PasteText', 'PasteFromWord', '-', 'Undo', 'Redo']
            },
            { name: 'morestuff', items: ['NumberedList', 'BulletedList'] },

            {
              name: 'basicstyles',
              items: ['Bold', 'Italic', 'Underline', 'Strike', 'Superscript', 'Subscript']
            },
            { name: 'colors', items: ['TextColor'] },
            {
              name: 'paragraph2',
              items: ['JustifyLeft', 'JustiftyCenter', 'JustifyRight', 'Outdent', 'Indent']
            },
            '/',
            { name: 'document', items: ['Source'] }
          ]
        }}
        onReady={(editor) => {
          // You can store the "editor" and use when it is needed.
          console.log('Editor is ready to use!', editor);
        }}
        onChange={handleOnChange}
        onBlur={(event, editor) => {
          console.log('Blur.', editor);
        }}
        onFocus={(event, editor) => {
          console.log('Focus.', editor);
        }}
      />
    </div>
  );
};

export default TinyMceEditor;
