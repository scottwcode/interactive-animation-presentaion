
window.addEventListener('DOMContentLoaded', function(e) {
  document.querySelector('hp-presentation').onclick = handlePresentationClick;
})

function handlePresentationClick(e) {
  // alert('clicked');
  var current = document.querySelector('hp-slide.active');
  var next = current.nextElementSibling;

  // Guard code to make sure next element is a slide. Will keep
  // next'ing until the element is a slide (vs a div or other element).
  while (next && next.tagName != 'HP-SLIDE') {
    next = next.nextElementSibling;
  }

  if (next) {
    current.classList.remove('active')
    next.classList.add('active');

    var aa= parseInt(next.getAttribute('data-autoadvance'));

    // If aa not is not a number
    if(!isNaN(aa)) {
      setTimeout(function (e) {
        handlePresentationClick(e);
      }, aa)
    }
  }
}