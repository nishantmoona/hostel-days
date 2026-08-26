(() => {
  "use strict";

  const $ = (selector, context = document) => context.querySelector(selector);
  const $$ = (selector, context = document) => [...context.querySelectorAll(selector)];

  const mediaItems = [
    { type: "photo", category: "room", src: "assets/photos/room-night.jpg", title: "Room 302 Nights", text: "The room where plans, jokes, and engineering stress lived together." },
    { type: "photo", category: "corridor", src: "assets/photos/corridor-gang.jpg", title: "Corridor Gang", text: "The corridor was never empty when friends were around." },
    { type: "photo", category: "canteen", src: "assets/photos/canteen-table.jpg", title: "Canteen Table", text: "Average food, unforgettable conversations." },
    { type: "photo", category: "festival", src: "assets/photos/birthday-night.jpg", title: "Birthday Madness", text: "Hostel birthdays had their own rules and their own chaos." },
    { type: "photo", category: "trip", src: "assets/photos/trip-memory.jpg", title: "One Random Trip", text: "The best plans were usually made at the last minute." },
    { type: "photo", category: "farewell", src: "assets/photos/farewell-day.jpg", title: "The Last Day", text: "The day everyone smiled for pictures and quietly felt the ending." },
    { type: "video", category: "video", src: "assets/videos/hostel-video-1.mp4", poster: "assets/posters/hostel-video-1.jpg", title: "Hostel Video Memory", text: "A short clip from the days that still feel close." },
    { type: "video", category: "video", src: "assets/videos/hostel-video-2.mp4", poster: "assets/posters/hostel-video-2.jpg", title: "Late Night Clip", text: "Some clips are blurry, but the feeling is clear." }
  ];

  const featuredMemories = [
    { title: "First Hostel Night", text: "Nobody knew each other properly, but somehow the conversations started." },
    { title: "Mess Table Stories", text: "Food was not always good, but the table was always full of stories." },
    { title: "Assignment Deadline", text: "One laptop, five people, no sleep, and full confidence until submission." },
    { title: "Festival in Hostel", text: "We were away from home, so we created our own version of home." },
    { title: "Farewell Silence", text: "The loudest people became quiet when it was time to leave." }
  ];

  let currentFeatured = 0;
  let isMusicPlaying = false;

  function initIntro() {
    const intro = $("#introScreen");
    const enterBtn = $("#enterBtn");
    if (!intro || !enterBtn) return;

    document.body.style.overflow = "hidden";
    enterBtn.addEventListener("click", () => {
      intro.classList.add("hide");
      document.body.style.overflow = "";
      setTimeout(() => intro.remove(), 800);
      revealVisibleSections();
    });
  }

  function initNavigation() {
    const navToggle = $("#navToggle");
    const navLinks = $("#navLinks");
    if (!navToggle || !navLinks) return;

    navToggle.addEventListener("click", () => navLinks.classList.toggle("open"));
    $$("#navLinks a").forEach((link) => link.addEventListener("click", () => navLinks.classList.remove("open")));
  }

  function initReveal() {
    const revealEls = $$(".reveal");
    if (!("IntersectionObserver" in window)) {
      revealEls.forEach((el) => el.classList.add("in"));
      return;
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("in");
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });

    revealEls.forEach((el) => observer.observe(el));
  }

  function revealVisibleSections() {
    $$(".reveal").forEach((el) => {
      const rect = el.getBoundingClientRect();
      if (rect.top < window.innerHeight) el.classList.add("in");
    });
  }

  function initMusic() {
    const music = $("#bgMusic");
    const musicBtn = $("#musicBtn");
    if (!music || !musicBtn) return;

    music.volume = 0.45;
    musicBtn.addEventListener("click", () => {
      if (isMusicPlaying) {
        music.pause();
        isMusicPlaying = false;
        musicBtn.textContent = "Play Music";
        return;
      }

      music.play().then(() => {
        isMusicPlaying = true;
        musicBtn.textContent = "Pause Music";
      }).catch(() => {
        musicBtn.textContent = "Play Music";
        console.log("Music can play only after a user interaction.");
      });
    });
  }

  function createMediaCard(item) {
    const card = document.createElement("article");
    card.className = "media-card";
    card.dataset.category = item.category;
    card.dataset.type = item.type;

    const thumb = document.createElement("img");
    thumb.className = "media-thumb";
    thumb.loading = "lazy";
    thumb.alt = item.title;
    thumb.src = item.type === "video" ? (item.poster || "assets/placeholders/hostel-video.svg") : item.src;
    thumb.addEventListener("error", () => {
      thumb.src = item.type === "video" ? "assets/placeholders/hostel-video.svg" : "assets/placeholders/hostel-photo.svg";
    });

    const badge = document.createElement("span");
    badge.className = "media-badge";
    badge.textContent = item.type === "video" ? "Video" : item.category;

    const caption = document.createElement("div");
    caption.className = "media-caption";
    caption.innerHTML = `<h3>${item.title}</h3><p>${item.text}</p>`;

    card.appendChild(thumb);
    card.appendChild(badge);

    if (item.type === "video") {
      const play = document.createElement("span");
      play.className = "play-badge";
      play.textContent = "▶";
      card.appendChild(play);
    }

    card.appendChild(caption);
    card.addEventListener("click", () => openModal(item));
    return card;
  }

  function renderGallery(filter = "all") {
    const grid = $("#mediaGrid");
    if (!grid) return;

    grid.innerHTML = "";
    const filtered = filter === "all" ? mediaItems : mediaItems.filter((item) => item.category === filter || item.type === filter);
    filtered.forEach((item) => grid.appendChild(createMediaCard(item)));
  }

  function initFilters() {
    const buttons = $$(".filter-btn");
    buttons.forEach((button) => {
      button.addEventListener("click", () => {
        buttons.forEach((btn) => btn.classList.remove("active"));
        button.classList.add("active");
        renderGallery(button.dataset.filter);
      });
    });
    renderGallery("all");
  }

  function openModal(item) {
    const modal = $("#mediaModal");
    const modalContent = $("#modalContent");
    const modalCaption = $("#modalCaption");
    if (!modal || !modalContent || !modalCaption) return;

    modalContent.innerHTML = "";
    if (item.type === "video") {
      const video = document.createElement("video");
      video.src = item.src;
      video.controls = true;
      video.playsInline = true;
      video.preload = "metadata";
      if (item.poster) video.poster = item.poster;
      modalContent.appendChild(video);
    } else {
      const img = document.createElement("img");
      img.src = item.src;
      img.alt = item.title;
      img.addEventListener("error", () => { img.src = "assets/placeholders/hostel-photo.svg"; });
      modalContent.appendChild(img);
    }

    modalCaption.textContent = `${item.title} — ${item.text}`;
    modal.classList.add("open");
    modal.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
  }

  function closeModal() {
    const modal = $("#mediaModal");
    const modalContent = $("#modalContent");
    if (!modal || !modalContent) return;
    modal.classList.remove("open");
    modal.setAttribute("aria-hidden", "true");
    modalContent.innerHTML = "";
    document.body.style.overflow = "";
  }

  function initModal() {
    const modal = $("#mediaModal");
    const close = $("#modalClose");
    if (close) close.addEventListener("click", closeModal);
    if (modal) modal.addEventListener("click", (event) => { if (event.target === modal) closeModal(); });
    document.addEventListener("keydown", (event) => { if (event.key === "Escape") closeModal(); });
  }

  function initFeatured() {
    const title = $("#featuredTitle");
    const text = $("#featuredText");
    const button = $("#featuredBtn");
    const randomBtn = $("#randomBtn");

    function updateFeatured() {
      const memory = featuredMemories[currentFeatured];
      if (title) title.textContent = memory.title;
      if (text) text.textContent = memory.text;
    }

    function nextFeatured() {
      currentFeatured = (currentFeatured + 1) % featuredMemories.length;
      updateFeatured();
    }

    if (button) button.addEventListener("click", nextFeatured);
    if (randomBtn) randomBtn.addEventListener("click", nextFeatured);
    updateFeatured();
  }

  function initMemoryNotes() {
    const input = $("#memoryInput");
    const saveBtn = $("#saveMemoryBtn");
    const notesWrap = $("#savedNotes");
    if (!input || !saveBtn || !notesWrap) return;

    function getNotes() {
      try { return JSON.parse(localStorage.getItem("hostelMemoryNotes") || "[]"); }
      catch { return []; }
    }

    function setNotes(notes) { localStorage.setItem("hostelMemoryNotes", JSON.stringify(notes)); }

    function renderNotes() {
      const notes = getNotes();
      notesWrap.innerHTML = "";
      notes.slice().reverse().forEach((note) => {
        const div = document.createElement("div");
        div.className = "saved-note";
        div.textContent = note;
        notesWrap.appendChild(div);
      });
    }

    saveBtn.addEventListener("click", () => {
      const text = input.value.trim();
      if (!text) return;
      const notes = getNotes();
      notes.push(text);
      setNotes(notes);
      input.value = "";
      renderNotes();
    });

    renderNotes();
  }

  document.addEventListener("DOMContentLoaded", () => {
    initIntro();
    initNavigation();
    initReveal();
    initMusic();
    initFilters();
    initModal();
    initFeatured();
    initMemoryNotes();
  });
})();
