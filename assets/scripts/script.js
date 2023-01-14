$(document).ready(function () {
  let winPos,
    winWidth,
    winHeight,
    navPos,
    navHeight,
    careersSec,
    btnEndSec,
    btn = $(".btn-sticky");

  function setVars() {
    navPos = btn.offset().top;
    navHeight = btn.outerHeight(true);

    winPos = $(window).scrollTop();
    winWidth = $(window).width();
    winHeight = $(window).height();

    if ($(".btn-sticky-end").length > 0)
      btnEndSec = $(".btn-sticky-end").offset().top - 70;

    if ($(".our-options").length > 0)
      careersSec = $(".our-options").offset().top;

    if (swiperExists) swiperSec = $("#" + swiperId).offset().top;
  }

  // **********************
  // Preloader ************
  // **********************

  $("html").addClass("loaded");

  setTimeout(function () {
    // Hide preloader
    $(".preloader").css("visibility", "hidden");
    // Gravity
    $(".flying-person-1, .flying-person-2").addClass("flying-person-anime");
    // Update variables
    setVars();
  }, 2000);

  // **********************
  // Sticky Btn ***********
  // **********************

  $('<div class="clone-btn-sticky"></div>')
    .insertBefore(".btn-sticky")
    .css("height", navHeight)
    .hide();

  setVars();
  $(window)
    .on("resize", setVars)
    .on("scroll", function () {
      winPos = $(window).scrollTop();
      if (winPos > 0 && winPos < btnEndSec && winWidth >= 992) {
        btn.addClass("fixed active-btn");
        $(".clone-btn-sticky").show();
        btn.trigger("mouseenter");
      } else {
        $(".clone-btn-sticky").hide();
        btn.removeClass("fixed active-btn");
      }
    })
    .on("beforeunload", function () {
      $("html").removeClass("loaded").remove();
    });

  // **********************
  // Burger Menu **********
  // **********************

  $(".burger").on("click touchstart", function (e) {
    e.preventDefault();
    if ($("body").hasClass("menu-opened")) {
      closeMenu();
    } else {
      openMenu();
    }
  });

  $(".mobile-menu a").on("click", closeMenu);

  function openMenu() {
    $("body").addClass("menu-opened");
    setTimeout(function () {
      $(".mobile-menu ul").fadeIn(300);
    }, 100);
  }

  function closeMenu() {
    $(".mobile-menu ul").fadeOut(300);
    setTimeout(function () {
      $("body").removeClass("menu-opened");
    }, 100);
  }

  // **********************
  // Modal ****************
  // **********************

  let $leaderModal = $(".leader-modal");

  $(".read-bio").on("click touchstart", function (e) {
    let $leaderCard = $(this).parents("figure");

    updateModal($leaderCard);

    openModal($leaderModal, 10);
  });

  function updateModal($leaderCard) {
    let leader = {
      fullname: $leaderCard.find("h5").text(),
      position: $leaderCard.find("h5 + p").text(),
      avatar: $leaderCard.find("figcaption").data("modal-img"),
      info: $leaderCard.find(".info").html(),
      linkedInUrl: $leaderCard.find("figcaption").data("linkedin-url"),
    };

    $leaderModal.find("h1").text(leader.fullname);
    $leaderModal.find(".position").text(leader.position);
    $leaderModal
      .find(".modal-avatar")
      .css("background-image", `url('${leader.avatar}')`)
      .attr("area-label", leader.fullname);
    $leaderModal.find(".info").html(leader.info);
    $leaderModal.find("figcaption a").attr("href", leader.linkedInUrl);
  }

  $(".members figure").on("click", function () {
    if (winWidth < 768) {
      updateModal($(this));
      openModal($leaderModal, 10);
    }
  });

  $(this)
    .on("click touchstart", function (e) {
      if (
        $(e.target).hasClass("leader-modal") ||
        $(e.target).hasClass("icon-cancel")
      ) {
        if ($leaderModal.hasClass("opened")) {
          closeModal($leaderModal, 300);
        }
      }
    })
    .on("keydown touchstart", function (e) {
      if (e.keyCode == 27 && $leaderModal.hasClass("opened")) {
        closeModal($leaderModal, 300);
      }
    });

  function closeModal($modal, ms) {
    $modal.removeClass("opened");
    setTimeout(function () {
      $modal.css("display", "none");
      if (winWidth < 768) {
        $("body").css("overflow", "auto");
      }
    }, ms);
  }

  function openModal($modal, ms) {
    $modal.css("display", "block");
    if (winWidth < 768) {
      $("body").css("overflow", "hidden");
    }
    setTimeout(function () {
      $modal.addClass("opened");
    }, ms);
  }

  // **********************
  // WOW.js ***************
  // **********************

  let wowAnime = new WOW({
    mobile: false,
  });
  wowAnime.init();

  // **********************
  // Isotope **************
  // **********************

  let jobFilters,
    jobSelectMenus,
    jobSelectOptions,
    $jobSearch = $(".vacancies");

  if ($jobSearch.length > 0) {
    jobFilters = {
      department: "all",
      location: "all",
      datetime: "newest",
    };
    jobSelectOptions = {
      department: [],
      location: [],
      datetime: [],
    };
    jobSelectMenus = ["department", "location", "datetime"];

    $jobSearch.isotope({
      itemSelector: ".job",
      layoutMode: "fitRows",
      transitionDuration: winWidth >= 992 ? 300 : 0,
    });

    $(window).on("resize", function () {
      $jobSearch.isotope({
        transitionDuration: winWidth >= 992 ? 300 : 0,
      });
    });

    for (let i = 0; i < 3; i++) {
      $(`select[name=${jobSelectMenus[i]}]`)
        .each(function () {
          let options = jobSelectOptions[this.name];
          $(this)
            .find("option")
            .each(function () {
              options.push(this.value);
            });

          decodeHash(this.name, options);
        })
        .on("change", function () {
          jobFilters[jobSelectMenus[i]] = this.value;
          encodeHash();
          searchJobs();
        });
    }

    searchJobs();

    if (location.hash != "") {
      setTimeout(function () {
        $("html, body").animate({
          scrollTop: careersSec,
        });
      }, 600);
    }
  }

  function decodeHash(filter, options) {
    // Hash filter
    let matches = location.hash.match(new RegExp(`${filter}=([^&]+)`, "i"));
    if (matches != null && matches[1].indexOf(options)) {
      jobFilters[filter] = matches[1];
      $(`select[name=${filter}]`)
        .find(`option[value=${matches[1]}]`)
        .attr("selected", "");
    }
  }

  function encodeHash() {
    let encodedHash = `location=${jobFilters.location}`;
    encodedHash += `&department=${jobFilters.department}`;
    encodedHash += `&datetime=${jobFilters.datetime}`;
    location.hash = encodedHash;
  }

  function searchJobs() {
    $jobSearch.isotope({
      sortBy: "original-order",
      sortAscending: jobFilters.datetime == "newest" ? true : false,
      filter: function () {
        let $this = $(this),
          fitsDepartment,
          fitsLocation;
        fitsDepartment =
          $this.data("department") == jobFilters.department ||
          jobFilters.department == "all";
        fitsLocation =
          $this.data("location") == jobFilters.location ||
          jobFilters.location == "all";
        return fitsDepartment && fitsLocation;
      },
    });

    // Check results
    if ($jobSearch.data("isotope").filteredItems.length > 0) {
      $(".job-not-found").hide();
      $(".benefits").show();
    } else {
      $(".job-not-found").show();
      $(".benefits").hide();
    }
  }

  // Job post click event
  $(".job").on("click", function () {
    let jobUrl = $(this).children("a").attr("href");
    window.location.href = jobUrl;
  });

  // **********************
  // Swiper ***************
  // **********************

  let swipersAll = ["homeSwiper", "aboutSwiper", "worksSwiper"],
    swiperId,
    swiperSec,
    swiperExists = false,
    swiperInView = false,
    swiper;

  for (let i = 0; i < swipersAll.length; i++) {
    if ($("#" + swipersAll[i]).length > 0) {
      swiperExists = true;
      swiperId = swipersAll[i];
    }
  }

  if (swiperExists) {
    swiper = new Swiper("#" + swiperId, {
      initialSlide: 2,
      slidesPerView: "auto",
      centeredSlides: true,
      loop: true,
      loopedSlides: $(".swiper-slide").length,
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
        el: ".swiper-dots",
        bulletClass: "swiper-dot",
        bulletActiveClass: "active",
        modifierClass: "swiper-dot-",
        renderBullet: function (index, className) {
          let bulletNum = index++ < 10 ? "0" + index++ : index++;
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

    $(window).on("scroll", function () {
      // Return to initial slide for the first time
      if (swiperExists && !swiperInView && winPos > swiperSec - winHeight) {
        swiperInView = true;
        swiper.slideTo(0);
      }
    });

    swiper.on("slideChangeTransitionStart", function () {
      $(".swiper-dot.active").siblings().removeClass("tick-tack");
      $(".swiper-dot.active").addClass("tick-tack");

      if (swiper.isEnd) $(".swiper-start").addClass("active");
      else $(".swiper-start").removeClass("active");
    });

    let lastSlideId = swiper.slides.length - 1;

    $(".swiper-nav-arrow").on("click touchstart", function () {
      let $arrow = $(this),
        prevSlideId,
        nextSlideId,
        parentSlideId;

      parentSlideId = $arrow.parent(".swiper-slide").index();
      (prevSlideId =
        swiper.realIndex == 0 ? lastSlideId : swiper.realIndex - 1),
        (nextSlideId =
          swiper.realIndex == lastSlideId ? 0 : swiper.realIndex + 1);

      switch ($arrow.data("to")) {
        default:
        case "start":
          swiper.slideTo(0);
          break;
        case "prev":
          swiper.slideTo(prevSlideId);
          break;
        case "next":
          swiper.slideTo(nextSlideId);
          break;
        case "slide":
          swiper.slideTo(parentSlideId);
          break;
      }
    });
  }

  // Video On Hover

  let imgVidWrap = $(".swiper-photo-video");

  imgVidWrap
    .on("mouseover", function () {
      let video = $(this).find("video")[0];
      if (video) {
        $(this).addClass("hover");
        video.pause();
        video.currentTime = 0;
        video.play();
      }
    })
    .on("mouseout", function () {
      if ($(this).hasClass("hover")) {
        $(this).removeClass("hover");
      }
    });

  // Jquery Validator
  $.validate({});

  // Partner Form
  // Contact Form

  $(function () {
    var form,
      partForm = $("#partner-form"),
      contactForm = $("#contact-form");

    if (partForm.length > 0) {
      form = partForm;
    } else if (contactForm.length > 0) {
      form = contactForm;
    }

    var formMessages = $("#form-messages");
    $(form).submit(function (e) {
      e.preventDefault();
      var formData = $(form).serialize();
      $.ajax({
        type: "POST",
        data: formData,
      })
        .done(function (response) {
          form.fadeOut();
          form.prev().fadeOut();
          $(formMessages).fadeIn();
          setTimeout(function () {
            var pos = $(formMessages).offset().top;
            window.scrollTo(0, pos - 100);
          }, 1000);
        })
        .fail(function (data) {
          $(formMessages).removeClass("success");
          $(formMessages).addClass("error");

          if (data.responseText !== "") {
            $(formMessages).text(data.responseText);
          } else {
            $(formMessages).text(
              "Oops! An error occured and your message could not be sent."
            );
          }
        });
    });
  });

  // **********************
  //  File Upload Input ***
  // **********************

  $(function () {
    var form = $("#job-form");
    var formMessages = $("#form-messages");
    $(form).submit(function (e) {
      e.preventDefault();
      var formData = new FormData($(this)[0]);
      $.ajax({
        type: "POST",
        data: formData,
        async: false,
        cache: false,
        contentType: false,
        enctype: "multipart/form-data",
        processData: false,
      })
        .done(function (response) {
          form.fadeOut();
          form.prev().fadeOut();
          $(formMessages).fadeIn();
          setTimeout(function () {
            var pos = $(formMessages).offset().top;
            window.scrollTo(0, pos - 100);
          }, 1000);
        })
        .fail(function (data) {
          $(formMessages).removeClass("success");
          $(formMessages).addClass("error");

          if (data.responseText !== "") {
            $(formMessages).text(data.responseText);
          } else {
            $(formMessages).text(
              "Oops! An error occured and your message could not be sent."
            );
          }
        });
    });
  });

  // **********************
  //  File Upload Input ***
  // **********************

  let inputs = document.querySelectorAll(".fileInputs");

  for (var i = 0; i < inputs.length; i++) {
    var self = inputs[i];
    self.addEventListener("change", updateImageDisplay);
  }

  function updateImageDisplay() {
    let preview = this.nextElementSibling;
    while (preview.firstChild) {
      preview.removeChild(preview.firstChild);
    }

    var curFiles = this.files;
    if (curFiles.length === 0) {
      var para = document.createElement("p");
      para.textContent = "Attach the file";
      preview.appendChild(para);
    } else {
      var div = document.createElement("div");
      preview.appendChild(div);
      for (var i = 0; i < curFiles.length; i++) {
        var span = document.createElement("span");
        span.classList.add("cover-l-btn", "icon-attach");
        var closeIcon = document.createElement("span");
        closeIcon.classList.add("icon-cancel");

        var para = document.createElement("p");
        span.appendChild(para);
        span.appendChild(closeIcon);
        if (validFileType(curFiles[i])) {
          para.innerHTML = `${curFiles[i].name}`;
          div.appendChild(span);

          var iconCancel = document.querySelectorAll(".icon-cancel");

          for (var i = 0; i < iconCancel.length; i++) {
            iconCancel[i].addEventListener("click", function (e) {
              let thisPreview = this.parentNode.parentNode.parentNode;
              thisPreview.innerHTML = "";
              thisPreview.textContent = "Attach the file";
              e.preventDefault();
            });
          }
        } else {
          para.innerHTML = `${curFiles[i].name} <span class="error">This is not a valid file type! Update your selection.</span>`;
          div.appendChild(para);
        }
      }
    }
  }

  let fileTypes = [
    "application/pdf",
    "application/msword",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  ];

  function validFileType(file) {
    for (var i = 0; i < fileTypes.length; i++) {
      if (file.type === fileTypes[i]) {
        return true;
      }
    }
    return false;
  }

  function returnFileSize(number) {
    if (number < 1024) {
      return number + "bytes";
    } else if (number >= 1024 && number < 1048576) {
      return (number / 1024).toFixed(1) + "kb";
    } else if (number >= 1048576) {
      return (number / 1048576).toFixed(1) + "mb";
    }
  }
});

// **********************
//  Offices Maps ********
// **********************

function initMap() {
  if (document.querySelector(".offices-map")) {
    var styleArray = [
        {
          featureType: "all",
          elementType: "labels",
          stylers: [
            {
              visibility: "off",
            },
          ],
        },
        {
          featureType: "poi",
          elementType: "geometry.fill",
          stylers: [
            {
              color: "#f18c7d",
            },
          ],
        },
        {
          featureType: "poi.park",
          elementType: "geometry.fill",
          stylers: [
            {
              color: "#a6e233",
            },
          ],
        },
        {
          featureType: "road",
          elementType: "geometry.fill",
          stylers: [
            {
              visibility: "on",
            },
            {
              color: "#fac625",
            },
          ],
        },
        {
          featureType: "road.highway",
          elementType: "geometry.fill",
          stylers: [
            {
              visibility: "on",
            },
            {
              color: "#ff7700",
            },
          ],
        },
        {
          featureType: "road.highway",
          elementType: "labels",
          stylers: [
            {
              visibility: "on",
            },
          ],
        },
        {
          featureType: "road.arterial",
          elementType: "labels.text",
          stylers: [
            {
              visibility: "on",
            },
          ],
        },
        {
          featureType: "road.local",
          elementType: "labels.text",
          stylers: [
            {
              visibility: "on",
            },
          ],
        },
        {
          featureType: "transit",
          elementType: "geometry.fill",
          stylers: [
            {
              color: "#ffc200",
            },
          ],
        },
        {
          featureType: "water",
          elementType: "geometry.fill",
          stylers: [
            {
              color: "#007ecc",
            },
          ],
        },
      ],
      officeArray = [],
      officeIndex = 0,
      markerIcon = {
        url: $("#google-maps").data("marker-icon"),
        scaledSize: new google.maps.Size(64, 64),
      },
      $officeMap = $(".offices-map"),
      $officeBtn = $(".offices-map .btn"),
      $officeBtnActive = $(".offices-map .btn.active"),
      $officeAddress = $(".offices-address"),
      $officeSelect = $(".offices-map select");

    $officeBtn.each(function () {
      var position = $(this).data("position").split(",");
      officeArray.push({
        title: $(this).find(".text").text(),
        latLng: new google.maps.LatLng(
          parseFloat(position[0]),
          parseFloat(position[1])
        ),
        marker: null,
      });
    });

    var map = new google.maps.Map(document.getElementById("google-maps"), {
      center: officeArray[officeIndex].latLng,
      styles: styleArray,
      scrollwheel: false,
      zoom: 14,
      mapTypeControl: false,
      streetViewControl: false,
      rotateControl: false,
      fullscreenControl: false,
    });

    for (var i = 0; i < officeArray.length; i++) {
      officeArray[i].marker = new google.maps.Marker({
        position: officeArray[i].latLng,
        animation: google.maps.Animation.DROP,
        map: map,
        icon: markerIcon,
        title: officeArray[i].title,
      });
    }

    map.addListener("zoom_changed", function () {
      map.panTo(officeArray[officeIndex].marker.getPosition());
    });

    $officeAddress.html($officeBtnActive.data("address"));

    $officeBtn.on("click", function (e) {
      e.preventDefault();
      $officeBtnActive = $(this);
      $officeBtnActive.addClass("active");
      $officeBtnActive.siblings().removeClass("active");
      // Select menu sync
      $officeSelect.val($officeBtnActive.data("value"));
      // Address box sync
      $officeAddress.html($officeBtnActive.data("address"));
      // Marker sync
      officeIndex = $officeBtnActive.index();
      map.setCenter(officeArray[officeIndex].latLng);
      officeArray[officeIndex].marker.setAnimation(google.maps.Animation.DROP);
    });

    $officeSelect.on("change", function () {
      // Button sync
      $officeMap.find(`.btn[data-value=${this.value}]`).trigger("click");
    });
  }
}
