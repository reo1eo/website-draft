document.addEventListener("DOMContentLoaded", () => {
  // ===== Navigation Buttons =====
  const navButtons = {
    "all-btn": "gallery.html",
    "purposive-btn": "Purposive.html",
    "pathfit-btn": "Pathfit.html",
    "nstp-btn": "Nstp.html",
    "feur-btn": "Feur.html",
  };

  Object.entries(navButtons).forEach(([id, page]) => {
    const button = document.getElementById(id);
    if (button) button.addEventListener("click", () => window.location.href = page);
  });

  // ===== Gallery & Modal =====
  const galleryGrid = document.querySelector(".gallery-grid");
  const modal = document.getElementById("imageModal");
  const modalContent = document.querySelector(".modal-content");
  const closeBtn = document.querySelector(".close");
  const prevBtn = document.querySelector(".prev");
  const nextBtn = document.querySelector(".next");

  let galleryItems = Array.from(document.querySelectorAll(".gallery-item"));
  let currentIndex = 0;

  // ===== Load gallery items dynamically for gallery.html =====
  if (window.location.pathname.endsWith("gallery.html")) {
    const subjects = ["Purposive", "Pathfit", "Nstp", "Feur"];
    subjects.forEach(async (subject) => {
      try {
        const res = await fetch(`${subject}.html`);
        const html = await res.text();
        const parser = new DOMParser();
        const doc = parser.parseFromString(html, "text/html");
        const items = doc.querySelectorAll(".gallery-item");
        items.forEach(item => galleryGrid.appendChild(item.cloneNode(true)));

        galleryItems = Array.from(document.querySelectorAll(".gallery-item"));
      } catch (err) {
        console.error(`Failed to load ${subject}:`, err);
      }
    });
  }

  // ===== Modal functions for full-screen images & videos with zoom =====
  const openModal = (item) => {
    galleryItems = Array.from(document.querySelectorAll(".gallery-item"));
    currentIndex = galleryItems.indexOf(item);

    modalContent.querySelectorAll("img, video").forEach(el => el.remove());

    const img = item.querySelector("img");
    const video = item.querySelector("video");

    if (img) {
      const modalImg = document.createElement("img");
      modalImg.src = img.src;
      modalImg.style.width = "100vw";
      modalImg.style.height = "100vh";
      modalImg.style.objectFit = "contain";
      modalImg.style.transition = "transform 0.6s ease"; // smooth zoom
      modalImg.style.transform = "scale(1.1)"; // auto zoom
      modalContent.appendChild(modalImg);
    } else if (video) {
      const modalVideo = document.createElement("video");
      modalVideo.src = video.src;
      modalVideo.controls = true;
      modalVideo.autoplay = true;
      modalVideo.muted = false;
      modalVideo.volume = 1;
      modalVideo.style.width = "100vw";
      modalVideo.style.height = "100vh";
      modalVideo.style.objectFit = "contain";
      modalContent.appendChild(modalVideo);
    }

    modal.classList.add("show");
    document.body.classList.add("modal-open");
  };

  const closeModal = () => {
    modal.classList.remove("show");
    document.body.classList.remove("modal-open");

    const video = modalContent.querySelector("video");
    if (video) {
      video.pause();
      video.currentTime = 0;
    }
  };

  const showItem = (index) => {
    galleryItems = Array.from(document.querySelectorAll(".gallery-item"));
    currentIndex = (index + galleryItems.length) % galleryItems.length;
    openModal(galleryItems[currentIndex]);
  };

  galleryGrid.addEventListener("click", (e) => {
    const item = e.target.closest(".gallery-item");
    if (!item) return;
    openModal(item);
  });

  closeBtn.addEventListener("click", closeModal);
  prevBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    showItem(currentIndex - 1);
  });
  nextBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    showItem(currentIndex + 1);
  });
  modal.addEventListener("click", (e) => {
    if (e.target === modal) closeModal();
  });

  document.addEventListener("keydown", (e) => {
    if (!modal.classList.contains("show")) return;
    if (e.key === "ArrowRight") showItem(currentIndex + 1);
    else if (e.key === "ArrowLeft") showItem(currentIndex - 1);
    else if (e.key === "Escape") closeModal();
  });
});
