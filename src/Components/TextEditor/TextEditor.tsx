/* eslint-disable no-template-curly-in-string */
import React, { useRef, useState } from "react";
import { Controlled as CodeMirrorReact } from "react-codemirror2";
import "codemirror/lib/codemirror.css";
import "codemirror/theme/material.css";
import "codemirror/mode/javascript/javascript";
import "codemirror/mode/shell/shell";
import "codemirror/mode/yaml/yaml";
import "codemirror/addon/hint/show-hint";
import "codemirror/addon/hint/javascript-hint";
import "codemirror/addon/search/searchcursor";
import "codemirror/addon/fold/foldgutter.css";
import "codemirror/addon/fold/foldcode.js";
import "codemirror/addon/fold/foldgutter.js";
import "codemirror/addon/fold/brace-fold.js";
import "codemirror/addon/fold/indent-fold.js";
import "codemirror/addon/fold/comment-fold.js";
import "codemirror/addon/comment/comment.js";
import "codemirror-rego/mode";
import "./autorefresh.ext.js";
// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module '@car... Remove this comment to see the full error message
import { Undo20, Redo20, Copy20, Cut20, Paste20, ArrowUp16, ArrowDown16 } from "@carbon/icons-react";
// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module '@boo... Remove this comment to see the full error message
import { Toolbar, ToolbarItem, Search, Button } from "@boomerang-io/carbon-addons-boomerang-react";
import "./styles.scss";

const languageParams = { mode: "rego" };

type Props = {
    onChange: (...args: any[]) => any;
    value: string;
};

// @ts-expect-error ts-migrate(2552) FIXME: Cannot find name 'props'. Did you mean 'Props'?
const TextEditorView =props: Props => {
  // @ts-expect-error ts-migrate(2552) FIXME: Cannot find name 'props'. Did you mean 'Props'?
  const { setCodeMirroEditor, value } = props;

  const editor = useRef(null);
  const [doc, setDoc] = useState();
  const [searchText, setSearchText] = useState("");
  const [clipboard, setClipboard] = useState("");

  const undo = () => {
    // @ts-expect-error ts-migrate(2532) FIXME: Object is possibly 'undefined'.
    doc.undo();
  };

  const redo = () => {
    // @ts-expect-error ts-migrate(2532) FIXME: Object is possibly 'undefined'.
    doc.redo();
  };

  const cut = () => {
    // @ts-expect-error ts-migrate(2532) FIXME: Object is possibly 'undefined'.
    setClipboard(doc.getSelection());
    // @ts-expect-error ts-migrate(2532) FIXME: Object is possibly 'undefined'.
    doc.replaceSelection("");
  };

  const copy = () => {
    // @ts-expect-error ts-migrate(2532) FIXME: Object is possibly 'undefined'.
    setClipboard(doc.getSelection());
  };

  const paste = () => {
    // @ts-expect-error ts-migrate(2532) FIXME: Object is possibly 'undefined'.
    doc.replaceSelection(clipboard);
  };

  // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'e' implicitly has an 'any' type.
  const handleKeyPress = e => {
    if (e.key === "Enter") {
      findNext();
    }
  };

  // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'e' implicitly has an 'any' type.
  const handleSearchText = e => {
    const { value } = e.target;
    setSearchText(value);
  };

  const findNext = () => {
    // @ts-expect-error ts-migrate(2532) FIXME: Object is possibly 'undefined'.
    const cursor = doc.getSearchCursor(searchText, doc.getCursor());
    if (cursor.findNext()) {
      // @ts-expect-error ts-migrate(2532) FIXME: Object is possibly 'undefined'.
      doc.setCursor(cursor.to());
      // @ts-expect-error ts-migrate(2532) FIXME: Object is possibly 'undefined'.
      doc.setSelection(cursor.from(), cursor.to());
    }
    // @ts-expect-error ts-migrate(2531) FIXME: Object is possibly 'null'.
    editor.current.focus();
  };

  const findPrevious = () => {
    // @ts-expect-error ts-migrate(2532) FIXME: Object is possibly 'undefined'.
    const cursor = doc.getSearchCursor(searchText, doc.getCursor("start"));
    if (cursor.findPrevious()) {
      // @ts-expect-error ts-migrate(2532) FIXME: Object is possibly 'undefined'.
      doc.setCursor(cursor.to());
      // @ts-expect-error ts-migrate(2532) FIXME: Object is possibly 'undefined'.
      doc.setSelection(cursor.from(), cursor.to());
    }
    // @ts-expect-error ts-migrate(2531) FIXME: Object is possibly 'null'.
    editor.current.focus();
  };

  // const languageOptions = languages.map(language => ({ id: language.id, text: language.text }));

  // const onChangeLanguage = language => {
  //   setLanguageParams(languages.find(value => value.id === language.selectedItem.id).params);
  // };

  // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'cm' implicitly has an 'any' type.
  const foldCode = cm => {
    cm.foldCode(cm.getCursor());
  };

  // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'cm' implicitly has an 'any' type.
  const toggleComment = cm => {
    cm.toggleComment();
  };

  // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'cm' implicitly has an 'any' type.
  const blockComment = cm => {
    // @ts-expect-error ts-migrate(2532) FIXME: Object is possibly 'undefined'.
    if (doc.somethingSelected()) {
      // @ts-expect-error ts-migrate(2532) FIXME: Object is possibly 'undefined'.
      const selPosition = doc.listSelections();
      if (!cm.uncomment(selPosition[0].head, selPosition[0].anchor, { fullLines: false })) {
        cm.blockComment(selPosition[0].head, selPosition[0].anchor, { fullLines: false });
      }
    }
  };

  return (
    <div
      style={{
        maxWidth: "80rem",
        maxHeight: "50rem",
        height: "100%",
        width: "100%",
        margin: "auto",
        overflowX: "visible",
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-start"
      }}
    >
      <Toolbar className="b-task-text-area">
        <ToolbarItem>
          <Button
            size="small"
            kind="ghost"
            iconDescription="Undo"
            tooltipPosition="bottom"
            tooltipAlignment="end"
            hasIconOnly
            renderIcon={Undo20}
            onClick={undo}
            className="b-task-text-area__button"
          />
        </ToolbarItem>
        <ToolbarItem>
          <Button
            size="small"
            kind="ghost"
            iconDescription="Redo"
            tooltipPosition="bottom"
            tooltipAlignment="center"
            hasIconOnly
            renderIcon={Redo20}
            onClick={redo}
            className="b-task-text-area__button"
          />
        </ToolbarItem>
        <ToolbarItem>
          <Button
            size="small"
            kind="ghost"
            iconDescription="Copy"
            tooltipPosition="bottom"
            tooltipAlignment="center"
            hasIconOnly
            renderIcon={Copy20}
            onClick={copy}
            className="b-task-text-area__button"
          />
        </ToolbarItem>
        <ToolbarItem>
          <Button
            size="small"
            kind="ghost"
            iconDescription="Cut"
            tooltipPosition="bottom"
            tooltipAlignment="center"
            hasIconOnly
            renderIcon={Cut20}
            onClick={cut}
            className="b-task-text-area__button"
          />
        </ToolbarItem>
        <ToolbarItem>
          <Button
            size="small"
            kind="ghost"
            iconDescription="Paste"
            tooltipPosition="bottom"
            tooltipAlignment="center"
            hasIconOnly
            renderIcon={Paste20}
            onClick={paste}
            className="b-task-text-area__button"
          />
        </ToolbarItem>
        <ToolbarItem>
          <Search
            id="search"
            light={false}
            labelText="Search"
            closeButtonLabelText=""
            placeHolderText="Search"
            onChange={handleSearchText}
            onKeyPress={handleKeyPress}
            size="sm"
          />
        </ToolbarItem>
        <ToolbarItem>
          <Button
            size="small"
            kind="ghost"
            iconDescription="Find previous"
            tooltipPosition="bottom"
            tooltipAlignment="center"
            hasIconOnly
            renderIcon={ArrowUp16}
            onClick={findPrevious}
            className="b-task-text-area__button"
          />
        </ToolbarItem>
        <ToolbarItem>
          <Button
            size="small"
            kind="ghost"
            iconDescription="Find next"
            tooltipPosition="bottom"
            tooltipAlignment="center"
            hasIconOnly
            renderIcon={ArrowDown16}
            onClick={findNext}
            className="b-task-text-area__button"
          />
        </ToolbarItem>
      </Toolbar>

      <CodeMirrorReact
        editorDidMount={cmeditor => {
          editor.current = cmeditor;
          setDoc(cmeditor.getDoc());
          if (setCodeMirroEditor instanceof Function) {
            setCodeMirroEditor(cmeditor);
          }
        }}
        data-testid="text-editor"
        value={value}
        focus={true}
        options={{
          autoRefresh: { force: true },
          extraKeys: {
            "Ctrl-Space": "autocomplete",
            "Ctrl-Q": foldCode,
            "Cmd-/": toggleComment,
            "Shift-Alt-A": blockComment,
            "Shift-Opt-A": blockComment
          },
          foldGutter: true,
          gutters: ["CodeMirrorReact-linenumbers", "CodeMirror-foldgutter"],
          lineNumbers: true,
          lineWrapping: true,
          theme: "material",
          ...languageParams
        }}
        onBeforeChange={(editor, data, value) => {
          props.onChange(value);
        }}
      />
    </div>
  );
};

export default TextEditorView;
