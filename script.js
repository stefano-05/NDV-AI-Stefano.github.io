(function () {
  var paragraph = document.getElementById("content");
  var input = document.getElementById("inputText");

  var minPx = 14;
  var maxPx = 28;
  var stepPx = 2;

  // Update displayed text when user types
  input.addEventListener("keydown", function (e) {
  if (e.key === "Enter") {
    e.preventDefault(); // prevents new line
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

  document.getElementById("textColor").addEventListener("input", function (e) {
  paragraph.style.color = e.target.value;
});

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

  // Highlight
  document.getElementById("highlight").addEventListener("click", function () {
    var words = paragraph.innerText.split(" ");
    for (var i = 0; i < words.length; i++) {
      if (i < 5) {
        words[i] = "<mark>" + words[i] + "</mark>";
      }
    }
    paragraph.innerHTML = words.join(" ");
  });

  // Summary
  document.getElementById("summary").addEventListener("click", function () {
    var text = paragraph.innerText;
    var sentences = text.split(".");
    var summary = sentences.slice(0, 2).join(".");
    document.getElementById("summaryBox").innerText = summary;
  });

})();
