(function () {
  var paragraph = document.getElementById("content");
  var input = document.getElementById("inputText");

  var minPx = 14;
  var maxPx = 28;
  var stepPx = 2;

  // Load text when pressing Enter
  input.addEventListener("keydown", function (e) {
    if (e.key === "Enter") {
      e.preventDefault();
      paragraph.innerText = input.value;
    }
  });

  function currentSize() {
    return parseFloat(getComputedStyle(paragraph).fontSize);
  }

  function setSize(px) {
    var clamped = Math.min(maxPx, Math.max(minPx, px));
    paragraph.style.fontSize = clamped + "px";
  }

  document.getElementById("larger").addEventListener("click", function () {
    if (currentSize() < maxPx) {
      setSize(currentSize() + stepPx);
    }
  });

  document.getElementById("smaller").addEventListener("click", function () {
    if (currentSize() > minPx) {
      setSize(currentSize() - stepPx);
    }
  });

  // Background color
  document.getElementById("bgColor").addEventListener("input", function (e) {
    paragraph.style.backgroundColor = e.target.value;
  });

  // Text color
  document.getElementById("textColor").addEventListener("input", function (e) {
    paragraph.style.color = e.target.value;
  });

  // Font change
  document.getElementById("fontSelect").addEventListener("change", function (e) {
    paragraph.style.fontFamily = e.target.value;
  });

  // Highlight toggle
  document.getElementById("highlight").addEventListener("click", function () {
    var selection = window.getSelection();

    if (!selection.rangeCount) return;

    var range = selection.getRangeAt(0);

    if (!paragraph.contains(range.commonAncestorContainer)) return;

    var parent = range.commonAncestorContainer.parentNode;

    // If already highlighted → remove
    if (parent && parent.tagName === "MARK") {
      var textNode = document.createTextNode(parent.textContent);
      parent.replaceWith(textNode);
      selection.removeAllRanges();
      return;
    }

    var selectedText = selection.toString();

    if (!selectedText.trim()) return;

    var mark = document.createElement("mark");
    mark.textContent = selectedText;

    range.deleteContents();
    range.insertNode(mark);

    selection.removeAllRanges();
  });

})();
