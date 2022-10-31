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

  if (document.querySelector('.btn-sticky-end')) {
    buttonEnd = document.querySelector('.btn-sticky-end');
  } else if (document.querySelector('.our-options')) {
    buttonEnd = document.querySelector('.our-options');
  } else return;

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

  function setVars() {
    navPos = offset(btn).top;
    navHeight = outerHeight(btn);
    winPos = scrollTop(window);
    winWidth = document.querySelector('body').getBoundingClientRect().width;
    winHeight = document.querySelector('body').getBoundingClientRect().height;
    if (buttonEnd) {
      btnEndSec = offset(buttonEnd).top - 70;
    }

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

// **********************
// Swiper ***************
// **********************

let swipersAll = ['homeSwiper', 'aboutSwiper', 'worksSwiper'],
  swiperId,
  swiperSec,
  swiperExists = false,
  swiperInView = false,
  swiper,
  winWidth;

for (let i = 0; i < swipersAll.length; i++) {
  if (document.querySelector('#' + swipersAll[i])) {
    swiperExists = true;
    swiperId = swipersAll[i];
  }
}
if (swiperExists) {
  swiper = new Swiper('#' + swiperId, {
    initialSlide: 2,
    slidesPerView: 'auto',
    centeredSlides: true,
    loop: true,
    loopedSlides: document.querySelectorAll('.swiper-slide').length,
    speed: 1000,
    autoplay: {
      delay: 8000,
      waitForTransition: false,
      disableOnInteraction: false,
    },
    simulateTouch: winWidth >= 992 ? false : true,
    // keyboard: true,
    pagination: {
      clickable: true,
      el: '.swiper-dots',
      bulletClass: 'swiper-dot',
      bulletActiveClass: 'active',
      modifierClass: 'swiper-dot-',
      renderBullet: function (index, className) {
        let bulletNum = index++ < 10 ? '0' + index++ : index++;
        return `
          <div class="${className}">
            <span class="number">${bulletNum}</span>
            <svg><circle class="outer" cx="35" cy="35" r="33"/></svg>
            <span class="bullet"></span>
          </div>
        `;
      },
    },
  });

  setTimeout(function () {
    swiper.slideTo(1);
  }, 1000);

  // $(window).on('scroll', function () {
  //   // Return to initial slide for the first time
  //   if (swiperExists && !swiperInView && winPos > swiperSec - winHeight) {
  //     swiperInView = true;
  //     swiper.slideTo(0);
  //   }
  // });

  // swiper.on('slideChangeTransitionStart', function () {
  //   $('.swiper-dot.active').siblings().removeClass('tick-tack');
  //   $('.swiper-dot.active').addClass('tick-tack');

  //   if (swiper.isEnd) $('.swiper-start').addClass('active');
  //   else $('.swiper-start').removeClass('active');
  // });

  let lastSlideId = swiper.slides.length - 1;

  // $('.swiper-nav-arrow').on('click touchstart', function () {
  //   let $arrow = $(this),
  //     prevSlideId,
  //     nextSlideId,
  //     parentSlideId;

  //   parentSlideId = $arrow.parent('.swiper-slide').index();
  //   (prevSlideId = swiper.realIndex == 0 ? lastSlideId : swiper.realIndex - 1), (nextSlideId = swiper.realIndex == lastSlideId ? 0 : swiper.realIndex + 1);

  //   switch ($arrow.data('to')) {
  //     default:
  //     case 'start':
  //       swiper.slideTo(0);
  //       break;
  //     case 'prev':
  //       swiper.slideTo(prevSlideId);
  //       break;
  //     case 'next':
  //       swiper.slideTo(nextSlideId);
  //       break;
  //     case 'slide':
  //       swiper.slideTo(parentSlideId);
  //       break;
  //   }
  // });
}

//  API Integration:

const container = document.querySelector('.vacancies');

async function getEpisode() {
  const response = await fetch('https://swapi.dev/api/films/', {
    method: 'GET',
  });
  const data = await response.json();
  console.log(data);
  return data;
}

async function applyCardInfo(results) {
  let data = await getEpisode();

  container.innerHTML = '';
  data.results.forEach(({ title, producer, episode_id }) => {
    container.innerHTML += `
 <div class="job" data-department="engineering" data-location="dublin">
        <h2>
         <a href="careers-inner.html#current-position-anchor">${title}</a>
      </h2>
        <address>${producer}</address>
        <a href="careers-inner?id=${episode_id}">Apply Now</a>
       </div>`;
  });
}

applyCardInfo();
