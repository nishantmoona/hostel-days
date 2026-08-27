(() => {
  "use strict";

  const $ = (selector, context = document) => context.querySelector(selector);
  const $$ = (selector, context = document) => [...context.querySelectorAll(selector)];

  /*
    IMAGE / VIDEO NAMING SYSTEM
    Keep your uploaded files exactly in these folders and names:

    assets/photos/hero/hero1.jpg ... hero10.jpg
    assets/photos/corridor-gang/corridor1.jpg ... corridor7.jpg
    assets/photos/birthday-night/birthday1.jpg ... birthday10.jpg
    assets/photos/farewell/farewell1.jpg ... farewell10.jpg
    assets/photos/function/function1.jpg ... function10.jpg
    assets/photos/hostel-induction/induction1.jpg ... induction3.jpg
    assets/videos/video1.mp4 ... video4.mp4
    assets/posters/video1.jpg ... video4.jpg
  */

  const PHOTO_COUNTS = {
    hero: 10,
    corridor: 7,
    birthday: 10,
    farewell: 10,
    function: 10,
    induction: 3,
    video: 4
  };

  const heroCaptions = [
    "The Beginning",
    "Hostel Family",
    "Engineering Days",
    "Room to Memories",
    "Same Madness",
    "Unplanned Moments",
    "The Hostel Gang",
    "Late Night Energy",
    "Days Worth Remembering",
    "Forever Hostel Days"
  ];

  const corridorCaptions = [
    "Corridor Gang",
    "Hostel Walks",
    "Random Gatherings",
    "Everyday Chaos",
    "Outside the Rooms",
    "Laughing Loud",
    "The Real Hostel Vibe"
  ];

  const birthdayCaptions = [
    "Birthday Madness",
    "Cake and Chaos",
    "Midnight Surprise",
    "Hostel Celebration",
    "Friends Like Family",
    "Loudest Night",
    "Unforgettable Smiles",
    "Birthday Squad",
    "One More Memory",
    "Celebration Mode"
  ];

  const farewellCaptions = [
    "The Last Day",
    "Final Hostel Frame",
    "Goodbyes Were Hard",
    "End of an Era",
    "Smiles and Silence",
    "One Last Picture",
    "Memories Packed",
    "The Batch Bond",
    "Leaving the Rooms",
    "Never Really Apart"
  ];

  const functionCaptions = [
    "Function Night",
    "Stage Memories",
    "Celebration Lights",
    "College Energy",
    "The Event Gang",
    "Dressed Up Days",
    "Big Day Vibes",
    "Together in Frame",
    "Festive Mood",
    "Golden Evening"
  ];

  const inductionCaptions = [
    "First Hostel Days",
    "New Faces",
    "The Start of Everything"
  ];

  const videoCaptions = [
    "Hostel Motion Memory",
    "A Clip from the Days",
    "Living the Moment",
    "The Bond in Motion"
  ];

  function createPhotoSeries({ category, folder, prefix, count, titlePrefix, captions }) {
    return Array.from({ length: count }, (_, index) => {
      const number = index + 1;
      const caption = captions[index] || `${titlePrefix} ${number}`;

      return {
        type: "photo",
        category,
        src: `assets/photos/${folder}/${prefix}${number}.jpg`,
        title: caption,
        text: getMemoryText(category, caption)
      };
    });
  }

  function createVideoSeries(count) {
    return Array.from({ length: count }, (_, index) => {
      const number = index + 1;
      const caption = videoCaptions[index] || `Hostel Video ${number}`;

      return {
        type: "video",
        category: "video",
        src: `assets/videos/video${number}.mp4`,
        poster: `assets/posters/video${number}.jpg`,
        title: caption,
        text: "A moving piece of hostel life that keeps the feeling alive."
      };
    });
  }

  function getMemoryText(category, caption) {
    const textMap = {
      hero: "A highlight from the engineering hostel days that became part of the bigger story.",
      corridor: "The corridor was more than a passage; it was where random plans and lifelong jokes began.",
      birthday: "Hostel birthdays had their own chaos, noise, laughter, and unforgettable friendship.",
      farewell: "A frame from the ending we did not want, but the memories stayed with us.",
      function: "One of those college-function moments when everyone came together beyond branches and batches.",
      induction: "The early days when strangers slowly became the hostel family."
    };

    return textMap[category] || caption;
  }

  const HERO_PHOTOS = Array.from({ length: PHOTO_COUNTS.hero }, (_, index) => {
    const number = index + 1;
    return {
      src: `assets/photos/hero/hero${number}.jpg`,
      caption: heroCaptions[index] || `Hostel Memory ${number}`
    };
  });

  const mediaItems = [
    ...createPhotoSeries({
      category: "hero",
      folder: "hero",
      prefix: "hero",
      count: PHOTO_COUNTS.hero,
      titlePrefix: "Hero Memory",
      captions: heroCaptions
    }),
    ...createPhotoSeries({
      category: "corridor",
      folder: "corridor-gang",
      prefix: "corridor",
      count: PHOTO_COUNTS.corridor,
      titlePrefix: "Corridor Memory",
      captions: corridorCaptions
    }),
    ...createPhotoSeries({
      category: "birthday",
      folder: "birthday-night",
      prefix: "birthday",
      count: PHOTO_COUNTS.birthday,
      titlePrefix: "Birthday Memory",
      captions: birthdayCaptions
    }),
    ...createPhotoSeries({
      category: "farewell",
      folder: "farewell",
      prefix: "farewell",
      count: PHOTO_COUNTS.farewell,
      titlePrefix: "Farewell Memory",
      captions: farewellCaptions
    }),
    ...createPhotoSeries({
      category: "function",
      folder: "function",
      prefix: "function",
      count: PHOTO_COUNTS.function,
      titlePrefix: "Function Memory",
      captions: functionCaptions
    }),
    ...createPhotoSeries({
      category: "induction",
      folder: "hostel-induction",
      prefix: "induction",
      count: PHOTO_COUNTS.induction,
      titlePrefix: "Induction Memory",
      captions: inductionCaptions
    }),
    ...createVideoSeries(PHOTO_COUNTS.video)
  ];

  const featuredMemories = [
    { title: "Corridor Gang", text: "The corridor was never just a corridor. It was our meeting point, discussion room, comedy stage, and stress-relief zone." },
    { title: "Birthday Night", text: "Hostel birthdays were loud, chaotic, imperfect, and somehow more special than any planned celebration." },
    { title: "Farewell Frames", text: "The farewell pictures carried smiles, but everyone knew a chapter was closing." },
    { title: "Function Days", text: "Events and functions brought everyone together beyond branches, schedules, and assignments." },
    { title: "Hostel Induction", text: "The first few photos captured strangers who would soon become part of each other's everyday life." },
    { title: "Video Memories", text: "Some memories need movement, voices, and background noise to feel complete again." }
  ];

  let currentFeatured = 0;
  let isMusicPlaying = false;
  let heroIndex = 0;

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

  navToggle.addEventListener("click", () => {
    const isOpen = navLinks.classList.toggle("open");
    navToggle.setAttribute("aria-expanded", String(isOpen));
  });

  $$("#navLinks a").forEach((link) => {
    link.addEventListener("click", () => {
      navLinks.classList.remove("open");
      navToggle.setAttribute("aria-expanded", "false");
    });
  });
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

  function initHeroRotator() {
    const cards = $$(".photo-stack .stack-card");
    if (!cards.length || !HERO_PHOTOS.length) return;

    function setHeroCards() {
      cards.forEach((card, cardIndex) => {
        const memory = HERO_PHOTOS[(heroIndex + cardIndex) % HERO_PHOTOS.length];
        const image = $("img", card);
        const caption = $("figcaption", card);

        if (image) {
          image.src = memory.src;
          image.alt = memory.caption;
        }

        if (caption) caption.textContent = memory.caption;
      });
    }

    setHeroCards();

    if (HERO_PHOTOS.length > cards.length) {
      setInterval(() => {
        heroIndex = (heroIndex + 1) % HERO_PHOTOS.length;
        setHeroCards();
      }, 3600);
    }
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

  if (item.fit === "contain") {
    card.classList.add("contain");
  }

  card.dataset.category = item.category;
  card.dataset.type = item.type;

  const thumb = document.createElement("img");
  thumb.className = "media-thumb";
  thumb.loading = "lazy";
  thumb.alt = item.title;
  thumb.src = item.type === "video"
    ? (item.poster || "assets/placeholders/hostel-video.svg")
    : item.src;

  thumb.addEventListener("error", () => {
    thumb.src = item.type === "video"
      ? "assets/placeholders/hostel-video.svg"
      : "assets/placeholders/hostel-photo.svg";
  });

  const badge = document.createElement("span");
  badge.className = "media-badge";
  badge.textContent = item.type === "video" ? "Video" : getCategoryLabel(item.category);

  const caption = document.createElement("div");
  caption.className = "media-caption";

  const title = document.createElement("h3");
  title.textContent = item.title;

  const text = document.createElement("p");
  text.textContent = item.text;

  caption.appendChild(title);
  caption.appendChild(text);

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

  function getCategoryLabel(category) {
    const labels = {
      hero: "Hero",
      corridor: "Corridor",
      birthday: "Birthday",
      farewell: "Farewell",
      function: "Function",
      induction: "Induction",
      video: "Video"
    };

    return labels[category] || category;
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
    const music = $("#bgMusic");

    if (music && !music.paused) {
      music.pause();
      isMusicPlaying = false;

      const musicBtn = $("#musicBtn");
      if (musicBtn) musicBtn.textContent = "Play Music";
    }

    const video = document.createElement("video");
    video.src = item.src;
    video.controls = true;
    video.playsInline = true;
    video.preload = "metadata";

    if (item.poster) {
      video.poster = item.poster;
    }

    modalContent.appendChild(video);
  } else {
    const img = document.createElement("img");
    img.src = item.src;
    img.alt = item.title;

    img.addEventListener("error", () => {
      img.src = "assets/placeholders/hostel-photo.svg";
    });

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
    initHeroRotator();
    initMusic();
    initFilters();
    initModal();
    initFeatured();
    initMemoryNotes();
  });
})();
