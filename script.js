(function () {
  var paragraph = document.getElementById("content");
  var input = document.getElementById("inputText");

  var minPx = 14;
  var maxPx = 32;
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

  // Font color
  document.getElementById("textColor").addEventListener("input", function (e) {
    paragraph.style.color = e.target.value;
  });

  // Highlight selected text
  document.getElementById("highlight").addEventListener("click", function () {
    var selection = window.getSelection();

    if (!selection.rangeCount) return;

    var range = selection.getRangeAt(0);

    if (!paragraph.contains(range.commonAncestorContainer)) return;

    var mark = document.createElement("mark");

    try {
      range.surroundContents(mark);
    } catch (e) {
      alert("Please select a smaller portion of text to highlight.");
    }

    selection.removeAllRanges();
  });

  // Summary (first 2 sentences)
  document.getElementById("summary").addEventListener("click", function () {
    var text = paragraph.innerText;
    var sentences = text.split(".");
    var summary = sentences.slice(0, 2).join(".");
    document.getElementById("summaryBox").innerText = summary;
  });

})();
