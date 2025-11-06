const filters = document.querySelectorAll(".filter");
const items = document.querySelectorAll(".gallery-item");

filters.forEach((btn) => {
  btn.addEventListener("click", () => {
    document.querySelector(".filter.active").classList.remove("active");
    btn.classList.add("active");
    const filterValue = btn.dataset.filter;

    items.forEach((item) => {
      if (filterValue === "all" || item.dataset.category === filterValue) {
        item.style.display = "block";
      } else {
        item.style.display = "none";
      }
    });
  });
});

// Get references to the modal elements
const modal = document.getElementById("imageModal");
const modalImage = document.getElementById("modalImage");
const closeBtn = document.querySelector(".close");

// Function to open the modal with the clicked image
function openModal(imgSrc, altText) {
  modal.style.display = "block"; // Show the modal
  modalImage.src = imgSrc; // Set the modal image source
  modalImage.alt = altText; // Set the alt text for accessibility
  document.body.classList.add("modal-open"); // Prevent body scroll
  // Add a class for animation (optional, for smooth zoom)
  setTimeout(() => {
    modal.classList.add("zoom-in");
  }, 10); // Small delay to trigger animation
}

// Function to close the modal
function closeModal() {
  modal.classList.remove("zoom-in"); // Remove animation class
  document.body.classList.remove("modal-open"); // Re-enable body scroll
  setTimeout(() => {
    modal.style.display = "none"; // Hide after animation
  }, 300); // Match the transition duration
}

// Add click event listeners to all gallery images
const galleryItems = document.querySelectorAll(".gallery-item img");
galleryItems.forEach((img) => {
  img.addEventListener("click", function () {
    const imgSrc = this.src; // Get the source of the clicked image
    const altText = this.alt; // Get the alt text
    openModal(imgSrc, altText); // Open the modal
  });
});

// Close the modal when the close button is clicked
closeBtn.addEventListener("click", closeModal);

// Optional: Close the modal when clicking outside the image
modal.addEventListener("click", function (event) {
  if (event.target === modal) {
    closeModal();
  }
});

// Optional: Close with ESC key
document.addEventListener("keydown", function (event) {
  if (event.key === "Escape" && modal.style.display === "block") {
    closeModal();
  }
});
