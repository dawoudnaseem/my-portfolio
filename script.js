function toggleMenu() {
  const menu = document.querySelector(".menu-links");
  const icon = document.querySelector(".hamburger-icon");
  menu.classList.toggle("open");
  icon.classList.toggle("open");

  function smoothScroll(targetId) {
    const target = document.getElementById(targetId);
    const targetPosition = target.getBoundingClientRect().top + window.scrollY;
    const startPosition = window.scrollY;
    const distance = targetPosition - startPosition;
    const duration = 1000; // Adjust scrolling speed (1000ms = 1s)
    let startTime = null;
  
    function animationStep(currentTime) {
      if (!startTime) startTime = currentTime;
      const elapsedTime = currentTime - startTime;
      const progress = Math.min(elapsedTime / duration, 1); // Normalize progress (0 to 1)
  
      // Custom smooth ease-in-out function
      const easeInOut = progress < 0.5
        ? 4 * progress ** 3
        : 1 - Math.pow(-2 * progress + 2, 3) / 2;
  
      window.scrollTo(0, startPosition + distance * easeInOut);
  
      if (elapsedTime < duration) {
        requestAnimationFrame(animationStep);
      } else {
        window.scrollTo(0, targetPosition); // Ensure it lands exactly on target
      }
    }
  
    requestAnimationFrame(animationStep);
  }
  
  // Attach smooth scrolling to navbar links
  document.querySelectorAll('.nav-links a').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const targetId = this.getAttribute('href').substring(1);
      smoothScroll(targetId);
    });
  });
  
}
