import React from 'react'
import ReactQuill from 'react-quill';
import styled from 'styled-components'

import LinearProgress from '@material-ui/core/LinearProgress'
import 'react-quill/dist/quill.snow.css'

const EditorStyled = styled.div`
  font-size: 1rem;
  flex-grow: 1;

  overflow: auto;
`

const modules = {
  syntax: true,
  toolbar: [
    [{ 'header': [1, 2, 3, false] }],
    ['bold', 'italic', 'underline','strike', 'blockquote'],
    [{'list': 'ordered'}, {'list': 'bullet'}, {'indent': '-1'}, {'indent': '+1'}],
    ['link', 'image'],
    ['code-block'],
    ['clean']
  ],
}

const formats = [
  'header',
  'bold', 'italic', 'underline', 'strike', 'blockquote',
  'list', 'bullet', 'indent',
  'link', 'image',
  'code-block'
]

const Editor = ({ text, saveEnabled, setSaveEnabled, loaded, savedEntry }) => {
  const onChange = (content, delta, source, editor) => {
    if (JSON.stringify(editor.getContents()) === savedEntry) {
      if (saveEnabled)
        setSaveEnabled(false)
    } else {
      if (!saveEnabled)
        setSaveEnabled(true)
    }
  }

  return (
    <>
    {loaded ? <></> : <LinearProgress color="secondary"/> }
    <ReactQuill readOnly={!loaded} theme="snow" ref={text} onChange={onChange} modules={modules} formats={formats}>
      <EditorStyled />
    </ReactQuill>
    </>
  )
}

export default Editor