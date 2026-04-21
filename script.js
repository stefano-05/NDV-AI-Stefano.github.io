(function () {
  var paragraph = document.getElementById("content");
  var minPx = 14;
  var maxPx = 28;
  var stepPx = 2;

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

  // Background color changer
  document.getElementById("bgColor").addEventListener("input", function (e) {
    paragraph.style.backgroundColor = e.target.value;
  });

  // Text-to-speech
  document.getElementById("read").addEventListener("click", function () {
    var speech = new SpeechSynthesisUtterance(paragraph.innerText);
    speech.rate = 0.9;
    window.speechSynthesis.speak(speech);
  });

  // Highlight first few words
  document.getElementById("highlight").addEventListener("click", function () {
    var words = paragraph.innerText.split(" ");
    for (var i = 0; i < words.length; i++) {
      if (i < 5) {
        words[i] = "<mark>" + words[i] + "</mark>";
      }
    }
    paragraph.innerHTML = words.join(" ");
  });

  // Simple summary (first 2 sentences)
  document.getElementById("summary").addEventListener("click", function () {
    var sentences = paragraph.innerText.split(".");
    var summary = sentences.slice(0, 2).join(".");
    document.getElementById("summaryBox").innerText = summary;
  });

})();
