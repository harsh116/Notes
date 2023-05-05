export function pasteHtmlAtCaret(html, sel = null, range = null) {
  console.log("html: ", html);

  var sel, range;
  if (window.getSelection) {
    // IE9 and non-IE
    if (sel === null) sel = window.getSelection();
    if (sel.getRangeAt && sel.rangeCount) {
      // get selected area details
      if (range === null) range = sel.getRangeAt(0);

      console.log("range: ", range);

      //deleting the selected region
      range.deleteContents();

      // Range.createContextualFragment() would be useful here but is
      // non-standard and not supported in all browsers (IE9, for one)
      var el = document.createElement("div");
      el.innerHTML = html;

      // offscreen dom tree creation as inserted between instead of last
      var frag = document.createDocumentFragment(),
        node,
        lastNode;

      //   extract elements from div container and appending it to document fragment
      while ((node = el.firstChild)) {
        lastNode = frag.appendChild(node);
      }

      range.insertNode(frag);

      // Preserve the selection
      if (lastNode) {
        range = range.cloneRange();

        // to unselect and push caret to last
        range.setStartAfter(lastNode);
        range.collapse(true);

        // if not removed then cursor wont be at last
        sel.removeAllRanges();
        sel.addRange(range);
      }
    }
  } else if (document.selection && document.selection.type != "Control") {
    // IE < 9
    document.selection.createRange().pasteHTML(html);
  }
}
