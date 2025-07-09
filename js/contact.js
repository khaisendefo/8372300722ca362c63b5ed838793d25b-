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