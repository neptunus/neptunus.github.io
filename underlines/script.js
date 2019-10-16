document.addEventListener('DOMContentLoaded', function(event) {
  Array.from(document.getElementsByClassName('underline-animated')).forEach(function attachDataText(link) {
    link.dataset.text = link.innerText
  });
});
