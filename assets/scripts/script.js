const ready = (callback) => {
  if (document.readyState != 'loading') callback();
  else document.addEventListener('DOMContentLoaded', callback);
};

ready(() => {
  let winPos,
    winWidth,
    winHeight,
    navPos,
    navHeight,
    careersSec,
    btnEndSec,
    btn = document.querySelector('.btn-sticky');

  let rect = document.querySelector('body').getBoundingClientRect();

  var offset = {
    top: rect.top + window.scrollY,
    left: rect.left + window.scrollX,
  };

  function setVars() {
    navPos = btn.offset;
    // navHeight = btn.outerHeight(true);
    // winPos = document.body.scrollTop;
    winWidth = document.body.offsetWidth;
    winHeight = document.body.offsetHeight;
    let buttonEnd = document.querySelector('.btn-sticky-end');
    console.log(winPos);

    // if (document.querySelector('.our-options').length > 0) careersSec = $('.our-options').offset.top;

    // if (swiperExists) swiperSec = $('#' + swiperId).offset().top;
  }

  // **********************
  // Preloader ************
  // **********************

  // $('html').addClass('loaded');

  setTimeout(function () {
    // Hide preloader
    document.querySelector('.preloader').style.visibility = 'hidden';

    // $('.flying-person-1, .flying-person-2').addClass('flying-person-anime');
    // Update variables
    setVars();
  }, 2000);

  // **********************
  // Sticky Button ************
  // **********************

  setVars();

  let button = document.body.querySelector('.btn-sticky');

  window.addEventListener('scroll', stickButton);

  function stickButton() {
    if (winPos > 0 && winPos < buttonEnd.offsetHeight && winWidth >= 992) {
      button.classList.add('fixed', 'active');
      document.querySelector('.clone-btn-sticky').style.display = 'inline-block';
    } else {
      button.classList.remove('fixed', 'active');
    }
    // button.trigger('mouseenter');

    // $('.clone-btn-sticky').hide();
  }
});

// **********************
// WOW.js ***************
// **********************

let wowAnime = new WOW({
  mobile: false,
});
wowAnime.init();
