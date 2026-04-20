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
    setSize(currentSize() + stepPx);
  });

  document.getElementById("smaller").addEventListener("click", function () {
    setSize(currentSize() - stepPx);
  });
})();
