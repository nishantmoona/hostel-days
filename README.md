# Hostel Days Website

A dynamic static website for celebrating engineering hostel life with photos, videos, music, filters, modal previews, memory notes, and a warm scrapbook-style design.

## Features

- Opening screen
- Music play/pause button
- Responsive mobile navigation
- Hostel journey timeline
- Engineering streams section
- Dynamic photo and video memory wall
- Category filters
- Photo/video modal preview
- Random featured memory
- Local browser memory notes
- Fully responsive layout for mobile, tablet, and desktop

## Folder Structure

```text
hostel-days-website/
├── index.html
├── style.css
├── script.js
├── README.md
└── assets/
    ├── photos/
    ├── videos/
    ├── posters/
    ├── music/
    └── placeholders/
```

## Add Photos

Put photos inside:

```text
assets/photos/
```

Then edit `mediaItems` in `script.js`:

```javascript
{
  type: "photo",
  category: "room",
  src: "assets/photos/your-photo.jpg",
  title: "Room Memories",
  text: "A short caption about this memory."
}
```

Available categories:

```text
room, corridor, canteen, festival, trip, farewell
```

## Add Videos

Put videos in:

```text
assets/videos/
```

Put poster images in:

```text
assets/posters/
```

Then edit `mediaItems`:

```javascript
{
  type: "video",
  category: "video",
  src: "assets/videos/your-video.mp4",
  poster: "assets/posters/your-video-poster.jpg",
  title: "Hostel Video",
  text: "A short caption about this video."
}
```

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
