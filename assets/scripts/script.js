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
  buttonEnd = document.querySelector('.btn-sticky-end');

  function scrollTop(el, value) {
    if (value === undefined) {
      return el.pageYOffset;
    } else {
      if (el === window || el.nodeType === 9) {
        el.scrollTo(el.pageXOffset, value);
      } else {
        el.pageYOffset = value;
      }
    }
  }

  function offset(el) {
    box = el.getBoundingClientRect();
    docElem = document.documentElement;
    return {
      top: box.top + window.pageYOffset - docElem.clientTop,
      left: box.left + window.pageXOffset - docElem.clientLeft,
    };
  }

  function outerHeight(el) {
    const style = getComputedStyle(el);

    return el.getBoundingClientRect().height + parseFloat(style.getPropertyValue('marginTop')) + parseFloat(style.getPropertyValue('marginBottom'));
  }

  careersSec = offset(document.querySelector('.btn-sticky-end')).top;

  function setVars() {
    navPos = offset(btn).top;
    navHeight = outerHeight(btn);
    winPos = scrollTop(window);
    winWidth = document.querySelector('body').getBoundingClientRect().width;
    winHeight = document.querySelector('body').getBoundingClientRect().height;
    if (buttonEnd) {
      btnEndSec = offset(buttonEnd).top - 70;
    }

    //   document.querySelector('.clone-btn-sticky').style.display = 'inline-block';

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
  window.addEventListener('resize', setVars);
  // document.querySelector('body').addEventListener('resize', setVars);
  window.addEventListener('scroll', function () {
    setVars();
    if (winPos > 0 && winPos < btnEndSec && winWidth > 992) {
      btn.classList.add('fixed', 'active');
      document.querySelector('.clone-btn-sticky').style.display = 'inline-block';
    } else {
      btn.classList.remove('fixed', 'active');
      document.querySelector('.clone-btn-sticky').style.display = 'none';
    }
  });
});

// **********************
// WOW.js ***************
// **********************

let wowAnime = new WOW({
  mobile: false,
});
wowAnime.init();
