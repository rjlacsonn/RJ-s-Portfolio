// DARK MODE TOGGLE
const themeToggle = document.getElementById("themeToggle");
const body = document.body;
const themeIcon = themeToggle.querySelector("i");

const savedTheme = localStorage.getItem("theme");
if (savedTheme === "dark") {
  body.classList.add("dark-mode");
  themeIcon.classList.remove("ri-moon-clear-line");
  themeIcon.classList.add("ri-sun-line");
}

themeToggle.addEventListener("click", () => {
  body.classList.toggle("dark-mode");

  if (body.classList.contains("dark-mode")) {
    localStorage.setItem("theme", "dark");
    themeIcon.classList.remove("ri-moon-clear-line");
    themeIcon.classList.add("ri-sun-line");
  } else {
    localStorage.setItem("theme", "light");
    themeIcon.classList.remove("ri-sun-line");
    themeIcon.classList.add("ri-moon-clear-line");
  }
});

// MOBILE MENU
const menuToggle = document.getElementById("menuToggle");
const mobileMenu = document.getElementById("mobileMenu");
const menuIcon = menuToggle.querySelector("i");

menuToggle.addEventListener("click", () => {
  mobileMenu.classList.toggle("show");

  if (mobileMenu.classList.contains("show")) {
    menuIcon.classList.remove("ri-menu-3-line");
    menuIcon.classList.add("ri-close-line");
  } else {
    menuIcon.classList.remove("ri-close-line");
    menuIcon.classList.add("ri-menu-3-line");
  }
});

// ACTIVE PAGE HIGHLIGHT
const currentPage = window.location.pathname.split("/").pop() || "index.html";

document.querySelectorAll(".nav-icon").forEach((link) => {
  const href = link.getAttribute("href");
  if (href === currentPage) {
    document.querySelectorAll(".nav-icon").forEach((item) => item.classList.remove("active"));
    link.classList.add("active");
  }
});

document.querySelectorAll(".mobile-link").forEach((link) => {
  const href = link.getAttribute("href");
  if (href === currentPage) {
    document.querySelectorAll(".mobile-link").forEach((item) => item.classList.remove("active"));
    link.classList.add("active");
  }
});

// INQUIRY MODAL
const inquiryModal = document.getElementById("inquiryModal");
const inquiryOverlay = document.getElementById("inquiryOverlay");
const closeModal = document.getElementById("closeModal");
const openInquiryButtons = document.querySelectorAll(".open-inquiry");
const inquiryForm = document.getElementById("inquiryForm");
const submitBtn = document.getElementById("submitBtn");

openInquiryButtons.forEach((button) => {
  button.addEventListener("click", () => {
    inquiryModal.classList.add("show");
    document.body.classList.add("modal-open");
  });
});

function closeInquiryModal() {
  inquiryModal.classList.remove("show");
  document.body.classList.remove("modal-open");
}

closeModal.addEventListener("click", closeInquiryModal);
inquiryOverlay.addEventListener("click", closeInquiryModal);

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && inquiryModal.classList.contains("show")) {
    closeInquiryModal();
  }
});

// EMAILJS FORM SUBMIT
inquiryForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  submitBtn.disabled = true;
  submitBtn.textContent = "Sending...";

  try {
    await emailjs.sendForm(
      "service_pzf9u8v",
      "template_7umtssn",
      inquiryForm
    );

    alert("Your inquiry has been sent successfully!");
    inquiryForm.reset();
    closeInquiryModal();
  } catch (error) {
    console.error("EmailJS Error:", error);
    alert("Failed to send inquiry. Please try again.");
  } finally {
    submitBtn.disabled = false;
    submitBtn.textContent = "Submit";
  }
});

// COPY EMAIL FUNCTION
const copyButtons = document.querySelectorAll(".copy-email");

copyButtons.forEach((button) => {
  button.addEventListener("click", async () => {
    try {
      await navigator.clipboard.writeText("aaron.lacson20@gmail.com");

      const originalText = button.textContent;
      button.textContent = "Copied!";

      setTimeout(() => {
        button.textContent = originalText;
      }, 1500);
    } catch (err) {
      console.error("Copy failed:", err);
      alert("Failed to copy email.");
    }
  });
});

// SCROLL REVEAL FOR PROJECTS
const projectCards = document.querySelectorAll(".project-card");

window.addEventListener("scroll", () => {
  projectCards.forEach((card) => {
    const top = card.getBoundingClientRect().top;

    if (top < window.innerHeight - 50) {
      card.classList.add("show");
    }
  });
});