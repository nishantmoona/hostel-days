# Hostel Days Website

A dynamic static website for celebrating engineering hostel life with photos, videos, music, filters, modal previews, memory notes, and a warm scrapbook-style design.

## Current Media Setup

This version is configured for:

```text
Hero photos: 10
Corridor Gang photos: 7
Birthday Night photos: 10
Farewell photos: 10
Function photos: 10
Hostel Induction photos: 3
Videos: 4
```

## Folder Structure and Exact File Names

Use this exact structure and naming pattern:

```text
hostel-days-website/
├── index.html
├── style.css
├── script.js
├── README.md
└── assets/
    ├── photos/
    │   ├── hero/
    │   │   ├── hero1.jpg
    │   │   ├── hero2.jpg
    │   │   └── hero10.jpg
    │   ├── corridor-gang/
    │   │   ├── corridor1.jpg
    │   │   └── corridor7.jpg
    │   ├── birthday-night/
    │   │   ├── birthday1.jpg
    │   │   └── birthday10.jpg
    │   ├── farewell/
    │   │   ├── farewell1.jpg
    │   │   └── farewell10.jpg
    │   ├── function/
    │   │   ├── function1.jpg
    │   │   └── function10.jpg
    │   └── hostel-induction/
    │       ├── induction1.jpg
    │       ├── induction2.jpg
    │       └── induction3.jpg
    ├── videos/
    │   ├── video1.mp4
    │   ├── video2.mp4
    │   ├── video3.mp4
    │   └── video4.mp4
    ├── posters/
    │   ├── video1.jpg
    │   ├── video2.jpg
    │   ├── video3.jpg
    │   └── video4.jpg
    ├── music/
    │   └── hostel-song.mp3
    └── placeholders/
```

## Important Naming Rule

GitHub Pages is case-sensitive. These are different file names:

```text
hero1.jpg
Hero1.jpg
hero1.JPG
hero 1.jpg
```

The code uses lowercase `.jpg`, so rename your files exactly as shown above.

## Features

- Opening screen
- Music play/pause button
- Rotating 10-image hero photo stack
- Responsive mobile navigation
- Hostel journey timeline
- Engineering streams section
- Dynamic photo and video memory wall
- Filters for all media categories
- Click-to-enlarge photo/video modal preview
- Random featured memory button
- Local browser memory notes
- Fully responsive layout for mobile, tablet, and desktop

## Add More Photos Later

Open `script.js` and update `PHOTO_COUNTS`:

```javascript
const PHOTO_COUNTS = {
  hero: 10,
  corridor: 7,
  birthday: 10,
  farewell: 10,
  function: 10,
  induction: 3,
  video: 4
};
```

Then add matching files in the correct folder.

## Add Music

Put your song here:

```text
assets/music/hostel-song.mp3
```

Or change this line in `index.html`:

```html
<audio id="bgMusic" src="assets/music/hostel-song.mp3" loop preload="none"></audio>
```

## GitHub Pages

Keep these in the repository root:

```text
index.html
style.css
script.js
assets/
README.md
```

Then enable GitHub Pages from repository settings.
