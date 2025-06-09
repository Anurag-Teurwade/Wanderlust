// Simple preloader hide with fallback
window.addEventListener("load", function () {
  document.body.classList.add("loaded");
  document.body.classList.remove("preload");

  setTimeout(() => {
    const preloader = document.getElementById("preloader");
    if (preloader) preloader.remove();
  }, 500);
});

// Fallback in case load event fails
setTimeout(function () {
  if (!document.body.classList.contains("loaded")) {
    document.body.classList.add("loaded");
    document.body.classList.remove("preload");
    const preloader = document.getElementById("preloader");
    if (preloader) preloader.remove();
  }
}, 3000);

// Rest of your existing script.js code remains the same
(() => {
  "use strict";

  // Form validation
  const forms = document.querySelectorAll(".needs-validation");
  Array.from(forms).forEach((form) => {
    form.addEventListener(
      "submit",
      (event) => {
        if (!form.checkValidity()) {
          event.preventDefault();
          event.stopPropagation();
        }
        form.classList.add("was-validated");
      },
      false
    );
  });

  // Scroll buttons
  const scrollBtns = {
    left: document.querySelector(".scroll-btn-left"),
    right: document.querySelector(".scroll-btn-right"),
    container: document.querySelector(".filter-width"),
  };

  const checkScroll = () => {
    if (!scrollBtns.container) return;
    const { scrollLeft, scrollWidth, clientWidth } = scrollBtns.container;
    scrollBtns.left?.classList.toggle("hidden", scrollLeft <= 0);
    scrollBtns.right?.classList.toggle(
      "hidden",
      scrollLeft >= scrollWidth - clientWidth - 5
    );
  };

  // Initialize scroll buttons after load
  window.addEventListener("load", checkScroll);
  window.addEventListener("resize", checkScroll);
  scrollBtns.container?.addEventListener("scroll", checkScroll);
  scrollBtns.right?.addEventListener("click", () =>
    scrollBtns.container.scrollBy({ left: 200, behavior: "smooth" })
  );
  scrollBtns.left?.addEventListener("click", () =>
    scrollBtns.container.scrollBy({ left: -200, behavior: "smooth" })
  );

  // Tax switch
  const taxSwitch = document.getElementById("taxSwitch");
  const taxText = document.querySelector(".tax-text");

  const updateTaxDisplay = () => {
    if (!taxSwitch || !taxText) return;

    const isChecked = taxSwitch.checked;
    taxText.textContent = isChecked ? "Hide total price" : "Show total price";

    document.querySelectorAll(".tax-info").forEach((el) => {
      if (isChecked) {
        el.style.display = "block";
      } else {
        el.style.animation = "fadeIn 0.2s ease reverse";
        setTimeout(() => {
          el.style.display = "none";
          el.style.animation = "";
        }, 200);
      }
    });
  };

  taxSwitch?.addEventListener("change", updateTaxDisplay);
  document.addEventListener("DOMContentLoaded", updateTaxDisplay);
})();



//Contact Host


document.addEventListener('DOMContentLoaded', function() {
  const contactBtn = document.getElementById('contactHostBtn');
  const contactForm = document.getElementById('hostContactForm');
  const cancelBtn = document.getElementById('cancelContact');
  const successAlert = document.getElementById('contactSuccess');

  contactBtn.addEventListener('click', function() {
    contactBtn.classList.add('d-none');
    contactForm.classList.remove('d-none');
  });

  cancelBtn.addEventListener('click', function() {
    contactForm.classList.add('d-none');
    contactBtn.classList.remove('d-none');
  });

  contactForm.querySelector('form').addEventListener('submit', function(e) {
    e.preventDefault();
    contactForm.classList.add('d-none');
    successAlert.classList.remove('d-none');
    
    // In a real implementation, you would:
    // 1. Collect form data
    // 2. Send to server via fetch/axios
    // 3. Handle response/errors
    // 4. Reset form after success
  });
});



//Review Edit

  function toggleEdit(reviewId) {
    const display = document.getElementById(`reviewDisplay-${reviewId}`);
    const form = document.getElementById(`reviewEditForm-${reviewId}`);
    if (display && form) {
      const isVisible = form.style.display === 'block';
      form.style.display = isVisible ? 'none' : 'block';
      display.style.display = isVisible ? 'block' : 'none';
    }
  }