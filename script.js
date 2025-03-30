function toggleMenu() {
  const menu = document.querySelector(".menu-links");
  const icon = document.querySelector(".hamburger-icon");
  menu.classList.toggle("open");
  icon.classList.toggle("open");
}

function smoothScroll(targetId) {
  const target = document.getElementById(targetId);
  if (!target) return; // Prevent errors if the element is missing

  const targetPosition = target.getBoundingClientRect().top + window.scrollY;
  const startPosition = window.scrollY;
  const distance = targetPosition - startPosition;
  const duration = 250; // Fastest scroll speed (300ms = 0.3s)
  let startTime = null;

  function animationStep(currentTime) {
      if (!startTime) startTime = currentTime;
      const elapsedTime = currentTime - startTime;
      const progress = Math.min(elapsedTime / duration, 1); // Normalize progress (0 to 1)

      // Faster start, snappier end
      const easeInOut = progress < 0.5
          ? 2 * progress ** 3
          : 1 - Math.pow(-2 * progress + 2, 3) / 2;

      window.scrollTo(0, startPosition + distance * easeInOut);

      if (elapsedTime < duration) {
          requestAnimationFrame(animationStep);
      } else {
          window.scrollTo(0, targetPosition); // Ensure exact landing position
      }
  }

  // 🚀 Force repaint to prevent browser lag
  requestAnimationFrame(() => {
      requestAnimationFrame(animationStep);
  });
}


  
// Attach smooth scrolling to navbar links
document.querySelectorAll('.nav-links a').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
      e.preventDefault();
      e.stopPropagation(); // 🔥 Prevent event bubbling delays

      const targetId = this.getAttribute('href').substring(1);

      // 🚀 Ensure immediate execution
      setTimeout(() => {
          smoothScroll(targetId);
      }, 0);
  }, { passive: false }); // 🔥 Ensures event is fully processed
});



document.addEventListener("DOMContentLoaded", function () {
  document.querySelectorAll(".project-card").forEach((project) => {
    project.addEventListener("click", function () {
      const projectTitle = this.querySelector(".project-title").innerText;
      const projectPage = projectTitle.toLowerCase().replace(/\s+/g, "-") + ".html";
      window.location.href = projectPage;
    });
  });
});

document.addEventListener("DOMContentLoaded", () => {
  const cursorWrapper = document.getElementById("custom-cursor-wrapper");
  const cursorText = document.getElementById("cursorTextPath");
  const clickableTags = ["A", "BUTTON", "IMG", "INPUT", "TEXTAREA"];

  document.addEventListener("mousemove", (e) => {
    cursorWrapper.style.top = `${e.clientY}px`;
    cursorWrapper.style.left = `${e.clientX}px`;
  });

  document.addEventListener("mouseover", (e) => {
    const tag = e.target.tagName;
    const isClickableTag = clickableTags.includes(tag);
    const isClickableProjectCard = e.target.closest(".project-card");

    if (isClickableProjectCard) {
      cursorText.textContent = "🗿 Click If You're Sigma 🗿";
      cursorWrapper.classList.add("hovering");
    } else {
      cursorText.textContent = "S C R O L L ✯ S C R O L L ✯ ";
      cursorWrapper.classList.remove("hovering");
    }
  });

  document.addEventListener("click", () => {
    const ripple = document.createElement("div");
    ripple.className = "ripple";
    cursorWrapper.appendChild(ripple);
    setTimeout(() => ripple.remove(), 400);
  });
});

/* Autoshow Animation */

document.addEventListener("DOMContentLoaded", () => {
  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target); // Optional: animation only once
      }
    });
  }, {
    threshold: 0.1
  });

  document.querySelectorAll('.autoshow').forEach(el => {
    observer.observe(el);
  });
});






  
