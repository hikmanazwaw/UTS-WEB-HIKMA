/* ==========================================================
   script.js - Interaksi Portfolio (JavaScript dasar + DOM)
   ========================================================== */

/* ---------- Data yang mudah diedit ---------- */
const WEBSITE_RATES = {          // tarif per halaman (Rp)
  landing: 150000,
  portfolio: 200000,
  bisnis: 300000
};
const COMPLEXITY_MULTIPLIERS = { // pengali kompleksitas
  sederhana: 1,
  menengah: 1.5,
  kompleks: 2
};
const WEBSITE_LABELS = { landing: "Landing Page", portfolio: "Portfolio", bisnis: "Website Bisnis" };

/* ---------- 1. Dark mode ---------- */
function applyTheme(theme) {
  document.documentElement.setAttribute("data-bs-theme", theme);
  const icon = document.querySelector("#themeIcon");
  icon.className = theme === "dark" ? "bi bi-sun-fill" : "bi bi-moon-stars-fill";
  try { localStorage.setItem("theme", theme); } catch (e) { /* abaikan jika storage diblokir */ }
}

function initThemeToggle() {
  let saved = "light";
  try { saved = localStorage.getItem("theme") || "light"; } catch (e) { /* abaikan */ }
  applyTheme(saved);
  document.querySelector("#themeToggle").addEventListener("click", function () {
    const current = document.documentElement.getAttribute("data-bs-theme");
    applyTheme(current === "dark" ? "light" : "dark");
  });
}

/* ---------- 2. Progress bar skill ---------- */
function initSkillBars() {
  document.querySelectorAll(".progress-bar[data-level]").forEach(function (bar) {
    bar.style.width = bar.dataset.level + "%";
  });
}

/* ---------- 3. Pencarian & filter proyek ---------- */
let activeCategory = "all";

function filterProjects() {
  const keyword = document.querySelector("#projectSearch").value.trim().toLowerCase();
  const items = Array.from(document.querySelectorAll(".project-item"));

  const visibleItems = items.filter(function (item) {
    const card = item.querySelector("article");
    const text = (card.dataset.title + " " + card.dataset.description).toLowerCase();
    const matchCategory = activeCategory === "all" || card.dataset.category.split(" ").includes(activeCategory);
    return matchCategory && text.includes(keyword);
  });

  items.forEach(function (item) {
    item.classList.toggle("d-none", !visibleItems.includes(item));
  });
  document.querySelector("#noProjectMessage").classList.toggle("d-none", visibleItems.length > 0);
}

function initProjectFilters() {
  document.querySelector("#projectSearch").addEventListener("input", filterProjects);
  document.querySelectorAll(".filter-btn").forEach(function (button) {
    button.addEventListener("click", function () {
      activeCategory = button.dataset.filter;
      document.querySelectorAll(".filter-btn").forEach(function (b) {
        const isActive = b === button;
        b.classList.toggle("btn-accent", isActive);
        b.classList.toggle("btn-outline-accent", !isActive);
      });
      filterProjects();
    });
  });
}

/* ---------- 4. Modal detail proyek ---------- */
function setLink(anchor, url) {
  if (url) {
    anchor.href = url;
    anchor.textContent = url;
    anchor.classList.remove("disabled");
  } else {
    anchor.removeAttribute("href");
    anchor.textContent = "[URL belum diisi]";
  }
}

function initProjectModal() {
  const modal = document.querySelector("#projectModal");
  modal.addEventListener("show.bs.modal", function (event) {
    const card = event.relatedTarget.closest("article");
    modal.querySelector("#projectModalTitle").textContent = card.dataset.title;
    modal.querySelector("#modalDescription").textContent = card.dataset.description;
    modal.querySelector("#modalTech").textContent = card.dataset.tech;
    const image = modal.querySelector("#modalImage");
    image.src = card.querySelector("img").getAttribute("src");
    image.alt = "Thumbnail " + card.dataset.title;
    setLink(modal.querySelector("#modalRepo"), card.dataset.repo);
    setLink(modal.querySelector("#modalDemo"), card.dataset.demo);
  });
}

/* ---------- 5. Kalkulator estimasi ---------- */
function formatRupiah(number) {
  return new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", maximumFractionDigits: 0 }).format(number);
}

function isPositiveInteger(value) {
  return value.trim() !== "" && Number.isInteger(Number(value)) && Number(value) > 0;
}

function calculateEstimate(type, pages, complexity) {
  return WEBSITE_RATES[type] * pages * COMPLEXITY_MULTIPLIERS[complexity];
}

function handleCalculate(event) {
  event.preventDefault();
  const type = document.querySelector("#websiteType").value;
  const pagesValue = document.querySelector("#pageCount").value;
  const complexity = document.querySelector("#complexity").value;
  const errorEl = document.querySelector("#calcError");
  const resultEl = document.querySelector("#calcResult");
  const detailEl = document.querySelector("#calcDetail");

  if (!isPositiveInteger(pagesValue)) {
    errorEl.textContent = "Jumlah halaman harus berupa bilangan bulat positif (1, 2, 3, ...).";
    errorEl.classList.remove("d-none");
    resultEl.textContent = formatRupiah(0);
    detailEl.textContent = "";
    return;
  }

  errorEl.classList.add("d-none");
  const pages = Number(pagesValue);
  resultEl.textContent = formatRupiah(calculateEstimate(type, pages, complexity));
  detailEl.textContent = WEBSITE_LABELS[type] + ", " + pages + " halaman, kompleksitas " + complexity + ".";
}

/* ---------- 6. Validasi formulir kontak ---------- */
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function setFieldError(inputId, message) {
  const input = document.querySelector("#" + inputId);
  const errorEl = document.querySelector("#" + inputId + "Error");
  input.classList.toggle("is-invalid", message !== "");
  errorEl.textContent = message;
  return message === "";
}

function validateContactForm() {
  const name = document.querySelector("#contactName").value.trim();
  const email = document.querySelector("#contactEmail").value.trim();
  const subject = document.querySelector("#contactSubject").value.trim();
  const message = document.querySelector("#contactMessage").value.trim();

  const results = [
    setFieldError("contactName", name === "" ? "Nama lengkap wajib diisi." : ""),
    setFieldError("contactEmail", email === "" ? "Email wajib diisi." : (EMAIL_PATTERN.test(email) ? "" : "Format email tidak valid, contoh: nama@email.com.")),
    setFieldError("contactSubject", subject === "" ? "Subjek pesan wajib diisi." : ""),
    setFieldError("contactMessage", message === "" ? "Isi pesan wajib diisi." : "")
  ];
  return results.every(Boolean);
}

function handleContactSubmit(event) {
  event.preventDefault();
  const successEl = document.querySelector("#contactSuccess");
  if (validateContactForm()) {
    successEl.textContent = "Validasi berhasil. Data valid, tetapi pesan belum dikirim ke server karena belum ada backend.";
    successEl.classList.remove("d-none");
    event.target.reset();
  } else {
    successEl.classList.add("d-none");
  }
}

/* ---------- 7. Tahun footer ---------- */
function setCurrentYear() {
  document.querySelector("#currentYear").textContent = new Date().getFullYear();
}

/* ---------- Inisialisasi ---------- */
document.addEventListener("DOMContentLoaded", function () {
  initThemeToggle();
  initSkillBars();
  initProjectFilters();
  initProjectModal();
  document.querySelector("#calculatorForm").addEventListener("submit", handleCalculate);
  document.querySelector("#contactForm").addEventListener("submit", handleContactSubmit);
  setCurrentYear();
});
