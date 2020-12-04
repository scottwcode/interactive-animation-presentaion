window.addEventListener('DOMContentLoaded', function(e) {
  var presentation = document.querySelector('hp-presentation');

  presentation.onclick = handlePresentationClick;
  presentation.addEventListener('animationend', handleAnimationEnd, false);
});

function handlePresentationClick(e) {
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

    next.querySelectorAll('.match').forEach(function (el) {
      setTimeout(function() { el.classList.remove('match'); }, 0);
    });
    var aa= parseInt(next.getAttribute('data-autoadvance'));

    // If aa not is not a number
    if(!isNaN(aa)) {
      setTimeout(function (e) {
        handlePresentationClick(e);
      }, aa)
    }
  }
}

function handleAnimationEnd(e) {
  var slide = e.target.closest('hp-slide');
  var aa = slide.getAttribute('data-autoadvance');

  if (aa == 'animationend' && slide.classList.contains('active')) {
    handlePresentationClick(e);
  }
}