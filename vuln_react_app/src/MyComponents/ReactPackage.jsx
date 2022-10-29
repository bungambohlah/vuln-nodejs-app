import React, { useEffect, useState } from "react";
import { EditorState, convertToRaw } from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import draftToHtml from "draftjs-to-html";
import { Parser as HtmlToReactParser } from "html-to-react";
// import sanitizeHtml from "sanitize-html";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

const htmlToReactParser = new HtmlToReactParser();

export default function ReactPackage() {
  const [editorState, setEditorState] = useState(EditorState.createEmpty());

  useEffect(() => {
    console.log(editorState);
  }, [editorState]);

  return (
    <div>
      <br />
      <div className="container">
        <h2>React XSS</h2>
        <br />
        <p>
          Application is using ReactJS which much packages that you need to
          import and consider about security issues.
        </p>
        <h3 className="card-title">WSYIWYG Editor</h3>
        <Editor
          editorState={editorState}
          onEditorStateChange={setEditorState}
        />
        <br />
        <br />
        <div className="card">
          <div className="card-body">
            <h5 className="card-title">Content:</h5>
            <div id="update">
              <p className="card-text">
                {htmlToReactParser.parse(
                  draftToHtml(convertToRaw(editorState.getCurrentContent()))
                )}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
