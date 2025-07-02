document.addEventListener("DOMContentLoaded", function () {
  const modal = document.querySelector(".modal");
  const modalOverlay = document.querySelector(".modal__overlay");
  const modalWindow = document.querySelector(".modal__window");
  const closeButton = document.querySelector(".modal__close");
  const openButtons = document.querySelectorAll(".open-modal");

  function openModal() {
    modal.classList.add("modal--active");
    document.body.style.overflow = "hidden";
  }

  function closeModal() {
    modal.classList.remove("modal--active");
    document.body.style.overflow = "";
  }

  openButtons.forEach((button) => {
    button.addEventListener("click", openModal);
  });

  closeButton.addEventListener("click", closeModal);

  modalOverlay.addEventListener("click", function (e) {
    if (!modalWindow.contains(e.target)) {
      closeModal();
    }
  });

  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && modal.classList.contains("modal--active")) {
      closeModal();
    }
  });

  const modalShown = sessionStorage.getItem("modalShown");
  if (!modalShown) {
    setTimeout(() => {
      openModal();
      sessionStorage.setItem("modalShown", "true");
    }, 10000);
  }
});

$(window).on("load", function () {
  $("#compare1, #compare2").twentytwenty({
    default_offset_pct: 0.5,
    orientation: "horizontal",
    before_label: "До",
    after_label: "После",
    no_overlay: false,
    move_with_handle_only: true,
    click_to_move: false,
  });
});

const gallerySlider = () => {
  const splide = new Splide(".sale__slider", {
    perPage: 3,
    perMove: 1,
    gap: "15px",
    autoplay: true,
    interval: 2500,
    pauseOnHover: true,
    pagination: false,
    arrows: false,

    breakpoints: {
      1000: {
        perPage: 2,
      },
      800: {
        gap: "10px",
      },
      700: {
        perPage: 1.5,
      },
      500: {
        perPage: 1
      }
    },
  });

  splide.mount();

  const prevButton = document.querySelector(".sale__slider-nav-arrow--prev");
  const nextButton = document.querySelector(".sale__slider-nav-arrow--next");

  prevButton.addEventListener("click", () => splide.go("<"));
  nextButton.addEventListener("click", () => splide.go(">"));

  updateArrowState();

  splide.on("move", updateArrowState);
  splide.on("updated", updateArrowState);

  function updateArrowState() {
    if (splide.index === 0) {
      prevButton.classList.add("sale__slider-nav-arrow--is-disabled");
    } else {
      prevButton.classList.remove("sale__slider-nav-arrow--is-disabled");
    }

    const lastSlideIndex = splide.Components.Controller.getEnd();

    if (splide.index === lastSlideIndex) {
      nextButton.classList.add("sale__slider-nav-arrow--is-disabled");
    } else {
      nextButton.classList.remove("sale__slider-nav-arrow--is-disabled");
    }
  }
};

gallerySlider();

const processSlider = () => {
  const splide = new Splide(".process__slider", {
    perPage: 1,
    perMove: 1,
    gap: "15px",
    autoplay: true,
    interval: 2500,
    pauseOnHover: true,
    pagination: false,
    arrows: false,
  });

  splide.mount();

  const processPrevButton = document.querySelector(
    ".process__slider-nav-arrow--prev"
  );
  const processNextButton = document.querySelector(
    ".process__slider-nav-arrow--next"
  );

  processPrevButton.addEventListener("click", () => splide.go("<"));
  processNextButton.addEventListener("click", () => splide.go(">"));

  updateArrowState();

  splide.on("move", updateArrowState);
  splide.on("updated", updateArrowState);

  function updateArrowState() {
    if (splide.index === 0) {
      processPrevButton.classList.add("process__slider-nav-arrow--is-disabled");
    } else {
      processPrevButton.classList.remove(
        "process__slider-nav-arrow--is-disabled"
      );
    }

    const lastSlideIndex = splide.Components.Controller.getEnd();

    if (splide.index === lastSlideIndex) {
      processNextButton.classList.add("process__slider-nav-arrow--is-disabled");
    } else {
      processNextButton.classList.remove(
        "process__slider-nav-arrow--is-disabled"
      );
    }
  }

  const paginationButtons = document.querySelectorAll(
    ".process__pagination-button"
  );

  paginationButtons.forEach((button, index) => {
    button.addEventListener("click", () => {
      splide.go(index); 
    });
  });

  function updateCustomPagination() {
    paginationButtons.forEach((button, index) => {
      if (index === splide.index) {
        button.classList.add("is-active");
      } else {
        button.classList.remove("is-active");
      }
    });
  }

  splide.on("mounted move", updateCustomPagination);
};

processSlider();

// faq accordion
const faqAccordion = () => {
  const faqItems = document.querySelectorAll(".faq__accordion-item");

  faqItems.forEach(function (item) {
    const top = item.querySelector(".faq__accordion-top");
    const body = item.querySelector(".faq__accordion-body");
    const icon = item.querySelector(".faq__accordion-icon svg");

    top.addEventListener("click", function () {
      // Закрываем все остальные активные элементы
      faqItems.forEach(function (otherItem) {
        const otherBody = otherItem.querySelector(".faq__accordion-body");
        const otherIcon = otherItem.querySelector(".faq__accordion-icon svg");

        if (otherItem !== item && otherBody.classList.contains("active")) {
          otherBody.classList.remove("active");
          otherBody.style.maxHeight = "0";
          if (otherIcon) {
            otherIcon.style.transform = "rotate(0deg)";
          }
        }
      });

      // Переключаем активность текущего элемента
      if (body.classList.contains("active")) {
        body.classList.remove("active");
        body.style.maxHeight = "0";
        if (icon) {
          icon.style.transform = "rotate(0deg)";
        }
      } else {
        body.classList.add("active");
        body.style.maxHeight = body.scrollHeight + "px";
        if (icon) {
          icon.style.transform = "rotate(180deg)";
        }
      }
    });
  });
};
faqAccordion();


const toggleMenu = () => {
  document.addEventListener('DOMContentLoaded', function () {
    const toggleButton = document.querySelector('.burger');
    const nav = document.querySelector('.mobile-menu');
    const closeButton = document.querySelector('.mobile-menu__close'); // Кнопка закрытия
    const buttonToClose = document.querySelector('.mobile-menu__button'); // Новая кнопка для закрытия меню
    const overlay = document.querySelector('.mobile-menu__overlay');
    const body = document.body;

    function closeNav() {
      toggleButton.classList.remove('active');
      nav.classList.remove('active');
      overlay.classList.remove('active');
      body.classList.remove('no-scroll');
    }

    toggleButton.addEventListener('click', function () {
      const isActive = toggleButton.classList.toggle('active');
      nav.classList.toggle('active');
      overlay.classList.toggle('active');
      if (isActive) {
        body.classList.add('no-scroll');
      } else {
        body.classList.remove('no-scroll');
      }
    });

    document.addEventListener('click', function(event) {
      if (!nav.contains(event.target) && !toggleButton.contains(event.target) && !overlay.contains(event.target) && !buttonToClose.contains(event.target)) {
        closeNav();
      }
    });

    overlay.addEventListener('click', closeNav);

    closeButton.addEventListener('click', closeNav); // Закрытие при клике на кнопку close

    buttonToClose.addEventListener('click', closeNav); // Закрытие при клике на mobile-menu__button

    document.addEventListener('keydown', function(event) {
      if (event.key === 'Escape' && nav.classList.contains('active')) {
        closeNav();
      }
    });
  });
};
toggleMenu();

const mobileMenuAccordion = () => {
  document.addEventListener('DOMContentLoaded', function () {
    const submenuSwitches = document.querySelectorAll('.mobile-menu__submenu-switch');

    submenuSwitches.forEach(function (switchElement) {
      switchElement.addEventListener('click', function (event) {
        // Получаем иконку и дропдаун
        const icon = switchElement.querySelector('.mobile-menu__submenu-switch-icon');
        const dropdown = switchElement.nextElementSibling;

        // Закрываем все остальные подменю
        submenuSwitches.forEach(function (otherSwitch) {
          const otherDropdown = otherSwitch.nextElementSibling;
          const otherIcon = otherSwitch.querySelector('.mobile-menu__submenu-switch-icon');
          
          if (otherSwitch !== switchElement) {
            // Убираем классы active у других подменю и их иконок
            if (otherDropdown && otherDropdown.classList.contains('active')) {
              otherDropdown.classList.remove('active');
              otherDropdown.style.maxHeight = '0';
            }
            if (otherIcon && otherIcon.classList.contains('active')) {
              otherIcon.classList.remove('active');
            }
          }
        });

        // Переключаем активность текущего подменю
        if (dropdown) {
          if (dropdown.classList.contains('active')) {
            dropdown.classList.remove('active');
            dropdown.style.maxHeight = '0';
          } else {
            dropdown.classList.add('active');
            dropdown.style.maxHeight = dropdown.scrollHeight + 'px';
          }
        }

        // Переключаем активность иконки
        if (icon) {
          if (icon.classList.contains('active')) {
            icon.classList.remove('active');
          } else {
            icon.classList.add('active');
          }
        }
      });
    });
  });
};

mobileMenuAccordion();