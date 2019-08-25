window.onload = function() {
  document.getElementById("click").addEventListener("click", function() {
      var elem = document.getElementById("click")
      if (elem.innerHTML === "Amazement Awaits") {
        elem.innerHTML = "Amazing isn't it";
      } else {
        elem.innerHTML = "Amazement Awaits";
      }
  });
}
