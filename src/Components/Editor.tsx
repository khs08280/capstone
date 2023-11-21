import React, { Component, useEffect, useState } from "react";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import styled from "styled-components";
import { EditorState, ContentState, convertFromHTML } from "draft-js";

const MyBlock = styled.div`
  .wrapper-class {
    width: 100%;
    margin: 0 auto;
    margin-bottom: 4rem;
    border: 0.125rem solid #7d92e9;
    border-radius: 0.625rem;
    padding: 0.625rem;
  }
  .editor {
    height: 400px !important;
    border: 0.063rem solid #dadce0 !important;
    padding: 0.313rem !important;
    border-radius: 0.125rem !important;
  }
`;

interface MyEditorProps {
  content?: any;
  onContentChange: (content: any) => void;
}
function MyEditor({ content, onContentChange }: MyEditorProps) {
  const [editorState, setEditorState] = useState(EditorState.createEmpty());

  const onEditorStateChange = (editorState) => {
    setEditorState(editorState);

    const content = editorState.getCurrentContent().getPlainText();
    onContentChange(content);
  };

  return (
    <MyBlock>
      <Editor
        defaultEditorState={content}
        wrapperClassName="wrapper-class"
        editorClassName="editor"
        toolbarClassName="toolbar-class"
        toolbar={{
          list: { inDropdown: true },
          textAlign: { inDropdown: true },
          link: { inDropdown: true },
          history: { inDropdown: false },
        }}
        placeholder="내용을 작성해주세요."
        localization={{
          locale: "ko",
        }}
        editorState={editorState}
        onEditorStateChange={onEditorStateChange}
      />
    </MyBlock>
  );
}

export default MyEditor;
