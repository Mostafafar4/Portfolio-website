let toggleButton = document.querySelector("#theme-toggle-button");

toggleButton.addEventListener("click", function () {
  document.documentElement.classList.toggle("dark");
});

// Portfolio Filters
let filterButtons = document.querySelectorAll("#portfolio-filters button");
let portfolioItems = document.querySelectorAll(
  "#portfolio-grid .portfolio-item"
);

for (let i = 0; i < filterButtons.length; i++) {
  filterButtons[i].addEventListener("click", function () {
    console.log("hiii", filterButtons[i]);
    // 1. Reset active classes
    for (let j = 0; j < filterButtons.length; j++) {
      filterButtons[j].classList.remove("active");
    }
    // Add active class to the one we just clicked
    this.classList.add("active");

    // 2. Get the filter value from the clicked button
    let filterValue = this.getAttribute("data-filter");

    // 3. Loop through items and filter (Now inside the click event!)
    for (let k = 0; k < portfolioItems.length; k++) {
      let itemCategory = portfolioItems[k].getAttribute("data-category");

      if (filterValue === "all" || itemCategory === filterValue) {
        portfolioItems[k].style.display = "block";
      } else {
        portfolioItems[k].style.display = "none";
      }
    }

    console.log("Filtering by:", filterValue);
  });
}

// Carousel

let nextCarouselBtn = document.querySelector("#next-testimonial");
let prevCarouselBtn = document.querySelector("#prev-testimonial");
let allCarouselCards = Array.from(
  document.querySelectorAll("#testimonials-carousel .testimonial-card")
);
let carouselContainer = document.querySelector("#testimonials-carousel");
let carouselIndicators = document.querySelectorAll(".carousel-indicator");

let currentIndex = 0; // Initialize to 0

for (let i = 0; i < allCarouselCards.length; i++) {
  allCarouselCards[i].addEventListener("click", function (e) {
    let clickedcard = allCarouselCards[i].getAttribute("data-index");
    console.log(clickedcard);

    currentIndex = allCarouselCards.indexOf(e.target);

    console.log(currentIndex);
  });
}

nextCarouselBtn.addEventListener("click", nextcard);
function nextcard() {
  if (currentIndex < allCarouselCards.length - 1) {
    currentIndex += allCarouselCards[i].getAttribute("data-index");
    console.log("it works");
  } else {
    currentIndex = 0;
    console.log("reset to 0");
  }
}

prevCarouselBtn.addEventListener("click", prevcard);
function prevcard() {
  if (currentIndex > 0) {
    currentIndex--;
    console.log("previous works");
  } else {
    currentIndex = allCarouselCards.length - 1;
    console.log("reset to last");
  }
}

// side bar

let gearBtn = document.querySelector("#settings-toggle");
let sideBar = document.querySelector("#settings-sidebar");
let closeBtn = document.querySelector("#close-settings");
let isSidebarOpen = false;

gearBtn.addEventListener("click", function () {
  openSidebar();
});

closeBtn.addEventListener("click", function () {
  closeSidebar();
});

function openSidebar() {
  isSidebarOpen = true;
  sideBar.classList.remove("translate-x-full");
  sideBar.setAttribute("aria-hidden", "false");
  gearBtn.setAttribute("aria-expanded", "true");
  gearBtn.classList.add("gear-in-sidebar");
}

function closeSidebar() {
  isSidebarOpen = false;
  sideBar.classList.add("translate-x-full");
  sideBar.setAttribute("aria-hidden", "true");
  gearBtn.setAttribute("aria-expanded", "false");
  gearBtn.classList.remove("gear-in-sidebar");
}

// change fonts

let allFontsType = Array.from(document.querySelectorAll("#font-type button"));
let body = document.body;

for (let i = 0; i < allFontsType.length; i++) {
  allFontsType[i].addEventListener("click", function (e) {
    let selectedFont = e.currentTarget.getAttribute("data-font");

    // Reset all buttons: remove active class and set aria-checked to false
    for (let j = 0; j < allFontsType.length; j++) {
      allFontsType[j].classList.remove("active");
      allFontsType[j].setAttribute("aria-checked", "false");
    }

    // Set the clicked button as active and checked
    e.currentTarget.classList.add("active");
    e.currentTarget.setAttribute("aria-checked", "true");

    // Change the body's font class
    body.classList.remove("font-alexandria", "font-tajawal", "font-cairo");
    body.classList.add("font-" + selectedFont);

    // Store the selected font in localStorage
    localStorage.setItem("selectedFont", selectedFont);
  });
}

let resetBtn = document.querySelector("#reset-settings");
let tajwalFont = document.querySelector("#tajwal");

resetBtn.addEventListener("click", function () {
  resetSettings();
  closeSidebar();
});

function resetSettings() {
  for (let i = 0; i < allFontsType.length; i++) {
    allFontsType[i].classList.remove("active");
    allFontsType[i].setAttribute("aria-checked", "false");
  }
  tajwalFont.setAttribute("aria-checked", "true");
  tajwalFont.classList.add("active");
  body.classList.remove("font-alexandria", "font-tajawal", "font-cairo");
  body.classList.add("font-tajawal");

  // Clear the saved font from localStorage
  localStorage.removeItem("selectedFont");
}

// Scroll Spy
let navLinks = document.querySelectorAll(".nav-links a");
let sections = document.querySelectorAll("section[id]");

function updateActiveNavLink() {
  let scrollPosition = window.scrollY + 100; // Offset 

  for (let i = 0; i < sections.length; i++) {
    let section = sections[i];
    let sectionTop = section.offsetTop;
    let sectionHeight = section.offsetHeight;
    let sectionId = section.getAttribute("id");

    if (
      scrollPosition >= sectionTop &&
      scrollPosition < sectionTop + sectionHeight
    ) {
      // Remove active class from all nav links
      for (let j = 0; j < navLinks.length; j++) {
        navLinks[j].classList.remove("active");
      }

      // Add active class to the current section's nav link
      let activeLink = document.querySelector(
        `.nav-links a[href="#${sectionId}"]`
      );
      if (activeLink) {
        activeLink.classList.add("active");
      }
    }
  }
}

// Add scroll event listener
window.addEventListener("scroll", updateActiveNavLink);
updateActiveNavLink();

//Scroll to top

let scrollToTopBtn = document.querySelector("#scroll-to-top");

window.addEventListener("scroll", function () {
  if (window.scrollY > 300) {
    scrollToTopBtn.classList.remove("opacity-0", "invisible");
  } else {
    scrollToTopBtn.classList.add("opacity-0", "invisible");
  }
});

scrollToTopBtn.addEventListener("click", function () {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
});
