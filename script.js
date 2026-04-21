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

  // Improved smart summary
  document.getElementById("summary").addEventListener("click", function () {
    var text = paragraph.innerText;

    if (!text.trim()) {
      document.getElementById("summaryBox").innerText = "No text to summarize.";
      return;
    }

    // Split into sentences
    var sentences = text.match(/[^\.!\?]+[\.!\?]+/g);
    if (!sentences) {
      document.getElementById("summaryBox").innerText = text;
      return;
    }

    // Get words
    var words = text.toLowerCase().match(/\w+/g);

    // Common words to ignore
    var stopWords = [
      "the", "is", "in", "and", "to", "a", "of", "that", "it",
      "on", "for", "with", "as", "was", "were", "this"
    ];

    var wordFreq = {};

    words.forEach(function (word) {
      if (!stopWords.includes(word)) {
        wordFreq[word] = (wordFreq[word] || 0) + 1;
      }
    });

    // Score sentences
    var sentenceScores = sentences.map(function (sentence) {
      var score = 0;
      var sentenceWords = sentence.toLowerCase().match(/\w+/g);

      sentenceWords.forEach(function (word) {
        if (wordFreq[word]) {
          score += wordFreq[word];
        }
      });

      return { sentence: sentence, score: score };
    });

    // Sort by importance
    sentenceScores.sort(function (a, b) {
      return b.score - a.score;
    });

    // Take top 2 sentences
    var summary = sentenceScores
      .slice(0, 2)
      .map(function (item) {
        return item.sentence.trim();
      })
      .join(" ");

    document.getElementById("summaryBox").innerText = summary;
  });

})();
