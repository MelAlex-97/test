$(function () {

  const $accordionHeadings = $(".assay__panel-heading"),
    $accordionBox = $(".assay__accordion-box"),
    $bringingHeading = $(".bringing__heading-btn"),
    $sectionBringing = $(".slider__item"),
    $menuBtn = $(".header__btn"),
    $menuLink = $(".header__menu-link"),
    $menuList = $(".header__menu-items");

  //slider
  const slider = document.querySelector(".slider-container")
  let mySwiper;

  function mobileSlider() {
    if (window.innerWidth <= 768 && slider.dataset.mobile == "false") {
      mySwiper = new Swiper(slider, {
        slidesPerView: "auto",
        spaceBetween: 30,
        slideClass: "slider__item",
        pagination: {
          el: ".swiper-pagination",
          clickable: true,
        }
      });

      $(".swiper-pagination").removeClass("none");

      slider.dataset.mobile = "true";
    }

    if (window.innerWidth >= 768) {
      slider.dataset.mobile = "false";
      if (slider.classList.contains("swiper-container-initialized")) {
        mySwiper.destroy();
        $(".swiper-pagination").addClass("none");
      }
    }
  }

  mobileSlider()

  window.addEventListener("resize", () => {
    mobileSlider();
  });

  //open first section accordion
  $accordionBox.eq(0).css("display", "block");

  //main
  function init() {
    $accordionHeadings.on("click", openSectionAccordion);
    $bringingHeading.on("click", openSectionBringing);
    $menuBtn.on("click", toggleMenu);
    $menuLink.on("click", toggleMenu);
  };

  function toggleMenu() {
    $menuList.fadeToggle("slow");
    $(".header__btn-item").toggleClass("header__btn--active");
  };

  function openSectionAccordion() {
    $(this).toggleClass("assay__panel--active").next().slideToggle();
    $accordionHeadings.not(this).removeClass("assay__panel--active").next().slideUp();
  };

  function openSectionBringing() {
    //Change heading bringing
    $(this).addClass("bringing__heading--active");
    $bringingHeading.not(this).removeClass("bringing__heading--active");

    //Change section bringing
    let titleSection = $(this).data("title");

    $(".slider__item").each(function () {
      if (titleSection === $(this).data("section")) {
        $(this).addClass("slider__item--visible");
        $sectionBringing.not(this).removeClass("slider__item--visible");
      };
    });
  };

  init();

});
