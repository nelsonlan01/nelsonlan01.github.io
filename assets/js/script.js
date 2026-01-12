'use strict';



// element toggle function
const elementToggleFunc = function (elem) { elem.classList.toggle("active"); }



// sidebar variables
const sidebar = document.querySelector("[data-sidebar]");
const sidebarBtn = document.querySelector("[data-sidebar-btn]");

// sidebar toggle functionality for mobile
sidebarBtn.addEventListener("click", function () { elementToggleFunc(sidebar); });



// testimonials variables
const testimonialsItem = document.querySelectorAll("[data-testimonials-item]");
const modalContainer = document.querySelector("[data-modal-container]");
const modalCloseBtn = document.querySelector("[data-modal-close-btn]");
const overlay = document.querySelector("[data-overlay]");

// modal variable
const modalImg = document.querySelector("[data-modal-img]");
const modalTitle = document.querySelector("[data-modal-title]");
const modalText = document.querySelector("[data-modal-text]");

// modal toggle function
const testimonialsModalFunc = function () {
  modalContainer.classList.toggle("active");
  overlay.classList.toggle("active");
}

// add click event to all modal items
for (let i = 0; i < testimonialsItem.length; i++) {

  testimonialsItem[i].addEventListener("click", function () {

    modalImg.src = this.querySelector("[data-testimonials-avatar]").src;
    modalImg.alt = this.querySelector("[data-testimonials-avatar]").alt;
    modalTitle.innerHTML = this.querySelector("[data-testimonials-title]").innerHTML;
    modalText.innerHTML = this.querySelector("[data-testimonials-text]").innerHTML;

    testimonialsModalFunc();

  });

}

// add click event to modal close button
modalCloseBtn.addEventListener("click", testimonialsModalFunc);
overlay.addEventListener("click", testimonialsModalFunc);



// custom select variables
const select = document.querySelector("[data-select]");
const selectItems = document.querySelectorAll("[data-select-item]");
const selectValue = document.querySelector("[data-selecct-value]");
const filterBtn = document.querySelectorAll("[data-filter-btn]");

select.addEventListener("click", function () { elementToggleFunc(this); });

// add event in all select items
for (let i = 0; i < selectItems.length; i++) {
  selectItems[i].addEventListener("click", function () {

    let selectedValue = this.innerText.toLowerCase();
    selectValue.innerText = this.innerText;
    elementToggleFunc(select);
    filterFunc(selectedValue);

  });
}

// filter variables
const filterItems = document.querySelectorAll("[data-filter-item]");

const filterFunc = function (selectedValue) {

  for (let i = 0; i < filterItems.length; i++) {
    const itemCategories = filterItems[i].dataset.category;

    if (selectedValue === "all" || itemCategories.includes(selectedValue)) {
      filterItems[i].classList.add("active");
    } else {
      filterItems[i].classList.remove("active");
    }
  }
}

// add event in all filter button items for large screen
let lastClickedBtn = filterBtn[0];

for (let i = 0; i < filterBtn.length; i++) {

  filterBtn[i].addEventListener("click", function () {

    let selectedValue = this.innerText.toLowerCase();
    selectValue.innerText = this.innerText;
    filterFunc(selectedValue);

    lastClickedBtn.classList.remove("active");
    this.classList.add("active");
    lastClickedBtn = this;

  });

}



// contact form variables
const form = document.querySelector("[data-form]");
const formInputs = document.querySelectorAll("[data-form-input]");
const formBtn = document.querySelector("[data-form-btn]");

// add event to all form input field
for (let i = 0; i < formInputs.length; i++) {
  formInputs[i].addEventListener("input", function () {

    // check form validation
    if (form.checkValidity()) {
      formBtn.removeAttribute("disabled");
    } else {
      formBtn.setAttribute("disabled", "");
    }

  });
}



// page navigation variables
const navigationLinks = document.querySelectorAll("[data-nav-link]");
const pages = document.querySelectorAll("[data-page]");

// add event to all nav link
for (let i = 0; i < navigationLinks.length; i++) {
  navigationLinks[i].addEventListener("click", function () {
	// when going back to portfolio, deactivate project pages
	if (this.innerHTML.toLowerCase() === "portfolio") {
	  document.querySelectorAll('article[data-page^="project"]').forEach(p => {
		p.classList.remove("active");
	  });
	}

    for (let i = 0; i < pages.length; i++) {
      if (this.innerHTML.toLowerCase() === pages[i].dataset.page) {
        pages[i].classList.add("active");
        navigationLinks[i].classList.add("active");
        window.scrollTo(0, 0);
      } else {
        pages[i].classList.remove("active");
        navigationLinks[i].classList.remove("active");
      }
    }

  });
}

// =============================
// Portfolio Filter Logic
// =============================
document.addEventListener("DOMContentLoaded", () => {

  const filterButtons = document.querySelectorAll("[data-filter-btn]");
  const projectItems = document.querySelectorAll("[data-filter-item]");
  const selectItems = document.querySelectorAll("[data-select-item]");

  // Function to filter portfolio items
  function filterPortfolio(key) {
    projectItems.forEach(item => {
      const categories = item.dataset.category.split(",").map(c => c.trim());
      if (key === "all" || categories.includes(key)) {
        item.style.display = "block";
      } else {
        item.style.display = "none";
      }
    });
  }

  // --------------------
  // Dropdown select items
  // --------------------
  selectItems.forEach(btn => {
    btn.addEventListener("click", () => {
      const selectedText = btn.textContent.trim();

      // Map button text to data-category keys
      const keyMap = {
        "All": "all",
        "Project Owner": "project-owner",
        "Game Designer / Architect": "game-design-architect",
        "Game Dev.": "game-dev",
        "Game Art & Assets Creation": "game-art-assets",
        "LiveOps": "liveops",
        "Localisation": "localisation",
        "Multimedia Producing": "multimedia-producing",
        "Global / Local Events": "events"
      };

      const key = keyMap[selectedText] || "all";
      filterPortfolio(key);
    });
  });

  // --------------------
  // Top filter buttons
  // --------------------
  filterButtons.forEach(btn => {
    btn.addEventListener("click", () => {
      const key = btn.dataset.filterBtn;
      filterPortfolio(key);
    });
  });

});



// SPA deep-link opening (Project pages)
document.querySelectorAll("[data-open-project]").forEach(link => {
  link.addEventListener("click", e => {
    e.preventDefault();

    const targetPage = link.dataset.openProject;

    // deactivate all pages
    document.querySelectorAll("article[data-page]").forEach(page => {
      page.classList.remove("active");
    });

    // deactivate navbar
    document.querySelectorAll("[data-nav-link]").forEach(btn => {
      btn.classList.remove("active");
    });

    // activate target page
    const page = document.querySelector(`article[data-page="${targetPage}"]`);
    const navBtn = [...document.querySelectorAll("[data-nav-link]")]
      .find(btn => btn.textContent.toLowerCase() === targetPage);

    if (page) page.classList.add("active");
    if (navBtn) navBtn.classList.add("active");

    window.scrollTo({ top: 0, behavior: "smooth" });
  });
});







