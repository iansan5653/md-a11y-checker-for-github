// @ts-check

"use strict";

import {LintErrorTooltip} from "./components/lint-error-tooltip";
import {LintedMarkdownEditor} from "./components/linted-markdown-editor";
import {observeSelector} from "./utilities/dom/observe-selector";

const rootPortal = document.createElement("div");
document.body.appendChild(rootPortal);

const markdownEditorsSelector =
  "textarea.js-paste-markdown, textarea.CommentBox-input, textarea[aria-label='Markdown value']";

observeSelector(markdownEditorsSelector, (editor) => {
  const {height, width} = editor.getBoundingClientRect();
  // ignore hidden inputs
  if (!(editor instanceof HTMLTextAreaElement) || height < 5 || width < 5)
    return () => {};

  const lintedEditor = new LintedMarkdownEditor(editor, rootPortal);

  return () => lintedEditor.disconnect();
});
