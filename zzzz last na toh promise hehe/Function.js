document.addEventListener("DOMContentLoaded", () => {
  const navLinks = document.querySelectorAll("nav a");
  const nav =
    document.querySelector("nav.navbar") || document.querySelector("nav");
  const onScroll = () => {
    if (!nav) return;
    const threshold = 20;
    if (window.scrollY > threshold) {
      nav.classList.add("scrolled");
    } else {
      nav.classList.remove("scrolled");
    }
  };
  onScroll();
  window.addEventListener("scroll", onScroll);

  navLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      const href = this.getAttribute("href");
      if (href.startsWith("#")) {
        e.preventDefault();

        const targetSection = document.querySelector(href);
        if (targetSection) {
          targetSection.scrollIntoView({
            behavior: "smooth",
          });
        }
        navLinks.forEach((l) => l.classList.remove("active"));
        this.classList.add("active");
      }
    });
  });
  (() => {
    const AUTO_MS = 4000;
    const carousel = document.getElementById("carousel");
    const slides = Array.from(carousel.querySelectorAll(".slide"));
    const prevBtn = document.getElementById("prevBtn");
    const nextBtn = document.getElementById("nextBtn");
    const dotsWrap = document.getElementById("dots");
    slides.forEach((_, i) => {
      const d = document.createElement("span");
      d.className = "dot" + (i === 0 ? " active" : "");
      const f = document.createElement("span");
      f.className = "fill";
      d.appendChild(f);
      dotsWrap.appendChild(d);
    });
    const dots = Array.from(dotsWrap.querySelectorAll(".dot"));
    let current = 0;
    let timer = null;
    function centerSlide(index, animate = true) {
      const viewport = document.querySelector(".carousel-viewport");
      const vpRect = viewport.getBoundingClientRect();
      const slideEl = slides[index];
      const slideRect = slideEl.getBoundingClientRect();
      const carouselRect = carousel.getBoundingClientRect();
      const slideOffsetLeft = slideRect.left - carouselRect.left;
      const desiredTranslate =
        slideOffsetLeft - (vpRect.width - slideRect.width) / 2;
      if (!animate) carousel.style.transition = "none";
      carousel.style.transform = `translateX(${-desiredTranslate}px)`;
      if (!animate) {
        void carousel.offsetWidth;
        carousel.style.transition = "";
      }
    }
    function update(index) {
      slides.forEach((s) => s.classList.remove("active"));
      slides[index].classList.add("active");

      dots.forEach((dot, i) => {
        dot.classList.toggle("active", i === index);
        const fill = dot.querySelector(".fill");
        fill.style.transition = "none";
        fill.style.width = "0%";
        void fill.offsetWidth;
        fill.style.transition = `width ${AUTO_MS}ms linear`;
        if (i === index) {
          setTimeout(() => (fill.style.width = "100%"), 50);
        }
      });
      centerSlide(index);
    }
    function next() {
      current = (current + 1) % slides.length;
      update(current);
    }
    function prev() {
      current = (current - 1 + slides.length) % slides.length;
      update(current);
    }

    nextBtn.addEventListener("click", () => {
      next();
      restartTimer();
    });
    prevBtn.addEventListener("click", () => {
      prev();
      restartTimer();
    });
    dots.forEach((dot, i) =>
      dot.addEventListener("click", () => {
        current = i;
        update(current);
        restartTimer();
      })
    );
    const wrap = document.querySelector(".carousel-wrap");
    wrap.addEventListener("mouseenter", () => pauseTimer());
    wrap.addEventListener("mouseleave", () => startTimer());

    function startTimer() {
      pauseTimer();
      timer = setInterval(() => next(), AUTO_MS);
      const activeFill = dots[current].querySelector(".fill");
      activeFill.style.transition = `width ${AUTO_MS}ms linear`;
      activeFill.style.width = "100%";
    }
    function pauseTimer() {
      clearInterval(timer);
      timer = null;
      dots.forEach((dot) => {
        const fill = dot.querySelector(".fill");
        const computed = window.getComputedStyle(fill).width;
        fill.style.transition = "none";
        fill.style.width = computed;
      });
    }
    function restartTimer() {
      pauseTimer();
      setTimeout(startTimer, 800);
    }
    slides.forEach((slide) => {
      slide.addEventListener("mouseenter", () =>
        slide.classList.add("hovering")
      );
      slide.addEventListener("mouseleave", () =>
        slide.classList.remove("hovering")
      );
    });
    update(current);
    setTimeout(() => centerSlide(current, false), 80);
    startTimer();
    window.addEventListener("resize", () =>
      setTimeout(() => centerSlide(current, false), 100)
    );
  })();
});


//Subjects
 const currentPage = window.location.pathname.split("/").pop().toLowerCase();
  const navLinks = document.querySelectorAll(".filter-tabs a");

  navLinks.forEach(link => {
    const href = link.getAttribute("href").toLowerCase();
    if (currentPage === "" && href.includes("gallery.html")) {
      link.classList.add("active");
    } else if (currentPage === href) {
      link.classList.add("active");
    }
  });

/*--Gallery zoom modal--*/
