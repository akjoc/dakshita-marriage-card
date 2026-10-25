"use strict";

const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
const toast = document.querySelector("#toast");
let toastTimeout;
function notify(message) {
  toast.textContent = message;
  toast.classList.add("visible");
  clearTimeout(toastTimeout);
  toastTimeout = setTimeout(() => toast.classList.remove("visible"), 4500);
}

const menuToggle = document.querySelector(".menu-toggle");
const nav = document.querySelector("#main-nav");
function closeMenu() {
  nav.classList.remove("open");
  menuToggle.setAttribute("aria-expanded", "false");
  menuToggle.setAttribute("aria-label", "Open navigation");
}
menuToggle.addEventListener("click", () => {
  const open = menuToggle.getAttribute("aria-expanded") !== "true";
  nav.classList.toggle("open", open);
  menuToggle.setAttribute("aria-expanded", String(open));
  menuToggle.setAttribute(
    "aria-label",
    open ? "Close navigation" : "Open navigation",
  );
});
nav
  .querySelectorAll("a")
  .forEach((link) => link.addEventListener("click", closeMenu));
document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && nav.classList.contains("open")) {
    closeMenu();
    menuToggle.focus();
  }
});
document.addEventListener("click", (event) => {
  if (!event.target.closest(".site-header")) closeMenu();
});

const weddingDay = new Date("2026-11-20T00:00:00+05:30").getTime();
function updateCountdown() {
  const remaining = Math.max(0, weddingDay - Date.now());
  const values = {
    days: Math.floor(remaining / 86400000),
    hours: Math.floor(remaining / 3600000) % 24,
    minutes: Math.floor(remaining / 60000) % 60,
    seconds: Math.floor(remaining / 1000) % 60,
  };
  for (const [id, value] of Object.entries(values)) {
    document.getElementById(id).textContent = String(value).padStart(2, "0");
  }
  if (!remaining) {
    const celebrationOver =
      Date.now() >= new Date("2026-11-21T00:00:00+05:30").getTime();
    document.getElementById("countdown-title").textContent = celebrationOver
      ? "Her forever has beautifully begun."
      : "Her forever begins today.";
  }
}
updateCountdown();
setInterval(updateCountdown, 1000);

const tabs = [...document.querySelectorAll('[role="tab"]')];
function selectTab(tab, focus = false) {
  tabs.forEach((item) => {
    const selected = item === tab;
    item.setAttribute("aria-selected", String(selected));
    item.tabIndex = selected ? 0 : -1;
    document.getElementById(item.getAttribute("aria-controls")).hidden =
      !selected;
  });
  if (focus) tab.focus();
}
tabs.forEach((tab, index) => {
  tab.addEventListener("click", () => selectTab(tab));
  tab.addEventListener("keydown", (event) => {
    let next;
    if (event.key === "ArrowRight") next = (index + 1) % tabs.length;
    if (event.key === "ArrowLeft")
      next = (index - 1 + tabs.length) % tabs.length;
    if (event.key === "Home") next = 0;
    if (event.key === "End") next = tabs.length - 1;
    if (next !== undefined) {
      event.preventDefault();
      selectTab(tabs[next], true);
    }
  });
});

// Venue addresses — bride side as printed on card
const hotelLeague =
  "Hotel The League, Opp. Air Force School, Delhi Road, Gurugram (Hr.)";
const wisteria =
  "Wisteria, DDA Sports Complex, Gate No. 3, Sector-11, Dwarka, New Delhi-110075";
const brideResidence =
  "H.No. A-74, Sanjay Gram, Opp. Sector-14, Gurugram (Hr.) — Mob.: 9717968786, 9971222996";

const programme = [
  {
    name: "Mehendi",
    utc: "20261119T133000Z",
    location: hotelLeague,
    description:
      "7:00 PM IST. Mehendi & Ladies Sangeet followed by Dinner. The bride's most playful ritual — henna, music and joy.",
  },
  {
    name: "Ladies Sangeet",
    utc: "20261119T133000Z",
    location: hotelLeague,
    description:
      "7:00 PM IST onwards. A musical evening with dance, laughter and favourite songs.",
  },
  {
    name: "Reception of Baraat",
    utc: "20261120T150000Z",
    location: wisteria,
    description: "8:30 PM IST. Welcoming the Baraat with warmth and dhol beats.",
  },
  {
    name: "Dinner — Taaron Ki Chhaon Mein",
    utc: "20261120T153000Z",
    location: wisteria,
    description: "9:00 PM IST. Dinner under the stars — Taaron Ki Chhaon Mein.",
  },
  {
    name: "Doli",
    utc: "20261120T160000Z",
    location: wisteria,
    description:
      "After Dinner. With joyful tears and abundant blessings, the bride embarks on her new journey.",
  },
];

const calendarDialog = document.querySelector("#calendar-dialog");
let calendarTrigger;
document.querySelectorAll(".calendar-btn").forEach((button) =>
  button.addEventListener("click", () => {
    calendarTrigger = button;
    calendarDialog.showModal();
  }),
);
document
  .querySelector(".dialog-close")
  .addEventListener("click", () => calendarDialog.close());
calendarDialog.addEventListener("click", (event) => {
  const bounds = calendarDialog.getBoundingClientRect();
  if (
    event.target === calendarDialog &&
    (event.clientX < bounds.left ||
      event.clientX > bounds.right ||
      event.clientY < bounds.top ||
      event.clientY > bounds.bottom)
  )
    calendarDialog.close();
});
calendarDialog.addEventListener("close", () => calendarTrigger?.focus());

const googleDetails = `With love from the Bride's family — Smt. Sanju Jain & Sh. Pankaj Jain celebrate the wedding of their beloved daughter Dakshita with Animesh (S/o Smt. Renu Jain & Sh. Praveen Jain). Granddaughter of Late Smt. Bina Jain & Late Sh. Magan Chand Jain. Best Compliments: Sh. Shashi Bhushan Jain, Hiten Jain & Purav Jain.\n\nAll times are India Standard Time (IST).\n\nThursday, 19 November 2026 — ${hotelLeague}\nMehendi & Ladies Sangeet: 7:00 PM onwards followed by Dinner\n\nFriday, 20 November 2026 — ${wisteria}\nReception of Baraat: 8:30 PM\nDinner: 9:00 PM — Taaron Ki Chhaon Mein\nDoli thereafter\n\nHost: ${brideResidence}\nWe look forward to celebrating with you!`;

const calendarParams = new URLSearchParams({
  action: "TEMPLATE",
  text: "Dakshita & Animesh | Bride's Wedding Celebrations",
  dates: "20261119/20261121",
  details: googleDetails,
  location: "Delhi NCR, India",
  ctz: "Asia/Kolkata",
});
document.querySelector("#google-calendar").href =
  `https://calendar.google.com/calendar/render?${calendarParams}`;

function escapeICS(value) {
  return value
    .replace(/\\/g, "\\\\")
    .replace(/\n/g, "\\n")
    .replace(/;/g, "\\;")
    .replace(/,/g, "\\,");
}
function foldICS(line) {
  const encoder = new TextEncoder();
  let result = "",
    length = 0;
  for (const char of line) {
    const size = encoder.encode(char).length;
    if (length + size > 75) {
      result += "\r\n ";
      length = 1;
    }
    result += char;
    length += size;
  }
  return result;
}
document.querySelector("#download-calendar").addEventListener("click", () => {
  const stamp = new Date()
    .toISOString()
    .replace(/[-:]/g, "")
    .replace(/\.\d{3}/, "");
  const lines = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//Dakshita and Animesh//Bride Side Wedding//EN",
    "CALSCALE:GREGORIAN",
    "METHOD:PUBLISH",
    "X-WR-CALNAME:Dakshita & Animesh - Bride's Wedding Celebrations",
  ];
  programme.forEach((event, index) =>
    lines.push(
      "BEGIN:VEVENT",
      `UID:da-wedding-2026-${index}@dakshita-marriage-card`,
      `DTSTAMP:${stamp}`,
      `DTSTART:${event.utc}`,
      `SUMMARY:${escapeICS(`Dakshita & Animesh - ${event.name}`)}`,
      `LOCATION:${escapeICS(event.location)}`,
      `DESCRIPTION:${escapeICS(event.description)}`,
      "END:VEVENT",
    ),
  );
  lines.push("END:VCALENDAR");
  const blob = new Blob([lines.map(foldICS).join("\r\n") + "\r\n"], {
    type: "text/calendar;charset=utf-8",
  });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = "Dakshita-and-Animesh-Wedding-Bride-Side.ics";
  document.body.appendChild(link);
  link.click();
  link.remove();
  setTimeout(() => URL.revokeObjectURL(url), 10000);
  calendarDialog.close();
  notify("Your calendar file is ready. Open it to add the bride's celebrations.");
});

const audio = document.querySelector("#bg-music");
const musicButton = document.querySelector("#music-toggle");
let audioPending = false;
let automaticMusic = true;
let musicNeedsGesture = false;
let mutedAutoplaySucceeded = false;
// mobile debug visible on screen for 10s — helps diagnose on phone without console
let _debugEl = null;
function dbg(msg){
  console.log(msg);
  try {
    if (!_debugEl) {
      _debugEl = document.createElement("div");
      _debugEl.style.cssText="position:fixed;bottom:68px;left:8px;right:8px;z-index:99999;background:rgba(20,15,10,.92);color:#fffbe9;font:11px/1.4 monospace;padding:8px 10px;border-radius:10px;pointer-events:none;max-height:40vh;overflow:auto";
      document.body.appendChild(_debugEl);
      setTimeout(()=>{_debugEl.style.display="none"},15000);
    }
    _debugEl.textContent = msg + "\n" + _debugEl.textContent.slice(0,600);
  } catch{}
}
// initialize audio for autoplay-muted strategy (allowed without gesture)
audio.volume = 0.35;
audio.muted = true;
if (audio.playsInline !== undefined) audio.playsInline = true;
audio.preload = "auto";
try { audio.load(); } catch {}
// detect if HTML autoplay muted succeeded — then first scroll will simply unmute
setTimeout(() => {
  if (!audio.paused && audio.muted) {
    mutedAutoplaySucceeded = true;
    musicNeedsGesture = true;
    dbg("[music] muted autoplay active — scroll/touch will unmute");
    updateMusic();
  }
}, 400);
audio.addEventListener("playing", () => {
  if (audio.muted && automaticMusic) {
    mutedAutoplaySucceeded = true;
    musicNeedsGesture = true;
    updateMusic();
  }
});
audio.addEventListener("canplaythrough", () => {
  // pre-loaded, ready for instant play on first scroll
});

function updateMusic() {
  const playing = !audio.paused;
  musicButton.setAttribute("aria-pressed", String(playing));
  musicButton.setAttribute(
    "aria-label",
    playing ? "Pause celebration music" : "Play celebration music",
  );
  musicButton.querySelector(".music-label").textContent = playing
    ? "Music on"
    : musicNeedsGesture ? "Tap for music" : "A little music?";
  musicButton.classList.toggle("needs-gesture", musicNeedsGesture && !playing);
}

function stopAutomaticMusic() {
  automaticMusic = false;
  window.removeEventListener("scroll", onMusicScroll, { passive: true });
  window.removeEventListener("wheel", onMusicWheel, { passive: true });
  window.removeEventListener("touchmove", onMusicTouchMove, { passive: true, capture: true });
  window.removeEventListener("touchstart", onFirstInteraction, { passive: true, capture: true });
  window.removeEventListener("touchend", onMusicTouchEnd, { passive: true, capture: true });
  window.removeEventListener("mousedown", onFirstInteraction, { passive: true, capture: true });
  window.removeEventListener("pointerdown", onFirstInteraction, { passive: true, capture: true });
  window.removeEventListener("pointerup", onMusicGesture, { passive: true, capture: true });
  window.removeEventListener("click", onFirstInteraction, { passive: true, capture: true });
  document.removeEventListener("touchstart", onFirstInteraction, { passive: true, capture: true });
  document.removeEventListener("touchend", onMusicTouchEnd, { passive: true, capture: true });
  document.removeEventListener("pointerdown", onFirstInteraction, { passive: true, capture: true });
  document.removeEventListener("pointerup", onMusicGesture, { passive: true, capture: true });
  document.removeEventListener("touchmove", onMusicTouchMove, { passive: true, capture: true });
  document.removeEventListener("keydown", onMusicKey);
  document.removeEventListener("pointerup", onMusicGesture);
}

async function startMusic(manual = false, trigger = "") {
  // allow unmute path even when a previous play() is pending — critical for mobile where pointerdown->touchend are <100ms apart
  const isUnmuteOnly = !audio.paused && (audio.muted || mutedAutoplaySucceeded);
  if (audioPending && !isUnmuteOnly) {
    dbg("[music] blocked pending "+trigger);
    return;
  }
  // If already playing (possibly muted autoplay), just unmute — don't call play() again
  // Unmuting an already-playing muted stream is more likely to be allowed on wheel/scroll than play()
  if (isUnmuteOnly) {
    dbg("[music] unmuting playing stream via "+trigger);
    audio.muted = false;
    mutedAutoplaySucceeded = false;
    audio.volume = 0.35;
    // Only call play() if it actually paused after unmuting (some browsers pause on unmute)
    if (audio.paused) {
      try { await audio.play(); dbg("[music] play after unmute ok "+trigger); } catch(e){ dbg("[music] play after unmute failed "+e.name); }
    } else {
      dbg("[music] unmuted without play() via "+trigger+" — audible now");
    }
    // Check if we actually got audible
    setTimeout(() => {
      if (!audio.paused && !audio.muted) {
        stopAutomaticMusic();
        musicNeedsGesture = false;
        updateMusic();
      }
    }, 100);
    stopAutomaticMusic();
    musicNeedsGesture = false;
    updateMusic();
    return;
  }
  audioPending = true;
  musicNeedsGesture = false;
  try {
    audio.volume = 0.35;
    audio.muted = false;
    await audio.play();
    mutedAutoplaySucceeded = false;
    stopAutomaticMusic();
    console.log("[music] audible play succeeded on first gesture");
  } catch (error) {
    dbg("[music] audible blocked on "+trigger+": "+(error.name||error.message));
    musicNeedsGesture = true;
    // Wheel/scroll alone is never a valid gesture in Chrome, so audible will always fail there.
    // Start muted playback immediately (allowed without gesture), then next real gesture (click/touch/mousedown) will just unmute.
    // On mobile, touchstart alone is NOT yet an activation — touchend/pointerup IS, so we keep muted stream for the upcoming touchend
    if (!audio.muted) {
      try {
        dbg("[music] starting muted stream (allowed without gesture)");
        audio.muted = true;
        await audio.play();
        mutedAutoplaySucceeded = true;
        musicNeedsGesture = true;
        updateMusic();
        dbg("[music] muted stream playing — next touchend/click will unmute via "+trigger);
        // On true gesture types (touchend/click/pointerup/touchstart with activation), try immediate unmute without play()
        const validForImmediate = /touchend|pointerup|click|touchstart/i.test(trigger);
        if (validForImmediate) {
          try {
            dbg("[music] trying immediate unmute-only (no play) on "+trigger);
            audio.muted = false;
            audio.volume = 0.35;
            mutedAutoplaySucceeded = false;
            if (!audio.paused && !audio.muted) {
              stopAutomaticMusic();
              musicNeedsGesture = false;
              updateMusic();
              dbg("[music] immediate unmute-only succeeded on "+trigger);
              return;
            }
            throw new DOMException("unmute reverted", "NotAllowedError");
          } catch (e2) {
            dbg("[music] immediate unmute-only failed, will need next input "+(e2.name||e2.message));
            audio.muted = true;
            mutedAutoplaySucceeded = true;
            musicNeedsGesture = true;
            updateMusic();
          }
        }
        return;
      } catch (e) {
        dbg("[music] muted autoplay also failed "+(e.name||e.message));
      }
      audio.muted = false;
    }
    if (manual) notify("Music could not play. Please try again.");
  } finally {
    audioPending = false;
    updateMusic();
  }
}

function onFirstInteraction(e) {
  if (!automaticMusic) return;
  void startMusic(false, e.type);
}
function onMusicScroll(e) {
  if (!automaticMusic) return;
  void startMusic(false, e.type || "scroll");
}
function onMusicWheel(event) {
  if (!automaticMusic) return;
  if (event.deltaY !== 0 && !event.ctrlKey) void startMusic(false, "wheel");
}
function onMusicTouchMove(e) {
  if (!automaticMusic) return;
  void startMusic(false, e.type);
}
function onMusicTouchEnd(e) {
  if (!automaticMusic) return;
  void startMusic(false, e.type);
}
function onMusicKey(event) {
  if (event.defaultPrevented || event.ctrlKey || event.metaKey || event.altKey) return;
  if (event.target.closest("input, textarea, select, button, a, [contenteditable]")) return;
  if (["ArrowDown", "ArrowUp", "PageDown", "PageUp", "Home", "End", " "].includes(event.key)) {
    void startMusic(false, "keydown:"+event.key);
  }
}
function onMusicGesture(event) {
  if (event.target.closest("#music-toggle")) return;
  void startMusic(false, event.type);
}
// first-scroll + any first gesture triggers music - matches reference site's "play on first scroll"
// Use capture-phase for touch so we get the event even if mandap-story or motion.js stops propagation
window.addEventListener("scroll", onMusicScroll, { passive: true });
window.addEventListener("wheel", onMusicWheel, { passive: true });
window.addEventListener("touchmove", onMusicTouchMove, { passive: true, capture: true });
window.addEventListener("touchstart", onFirstInteraction, { passive: true, capture: true });
window.addEventListener("touchend", onMusicTouchEnd, { passive: true, capture: true });
window.addEventListener("mousedown", onFirstInteraction, { passive: true, capture: true });
window.addEventListener("pointerdown", onFirstInteraction, { passive: true, capture: true });
window.addEventListener("pointerup", onMusicGesture, { passive: true, capture: true });
window.addEventListener("click", onFirstInteraction, { passive: true, capture: true });
document.addEventListener("touchstart", onFirstInteraction, { passive: true, capture: true });
document.addEventListener("touchend", onMusicTouchEnd, { passive: true, capture: true });
document.addEventListener("pointerdown", onFirstInteraction, { passive: true, capture: true });
document.addEventListener("pointerup", onMusicGesture, { passive: true, capture: true });
document.addEventListener("touchmove", onMusicTouchMove, { passive: true, capture: true });
document.addEventListener("keydown", onMusicKey);
document.addEventListener("pointerup", onMusicGesture);
// also trigger when entering via mandap buttons
document.querySelectorAll(".mandap-enter, .mandap-skip, .scroll-cue").forEach((el) =>
  el.addEventListener("click", (e) => {
    if (automaticMusic) void startMusic(false, e.type+":mandap");
  }),
);
// prime muted stream on load so first scroll can just unmute
window.addEventListener("load", async () => {
  if (!automaticMusic) return;
  try {
    if (audio.paused) {
      audio.muted = true;
      await audio.play();
      mutedAutoplaySucceeded = true;
      musicNeedsGesture = true;
      updateMusic();
      dbg("[music] primed muted on load — ready for first touch");
    }
  } catch(e){ dbg("[music] prime failed "+(e.name||e.message)); }
});

musicButton.addEventListener("click", () => {
  stopAutomaticMusic();
  musicNeedsGesture = false;
  if (audioPending) {
    audio.pause();
    updateMusic();
    return;
  }
  if (!audio.paused) {
    audio.pause();
    updateMusic();
  } else {
    void startMusic(true);
  }
});
audio.addEventListener("play", updateMusic);
audio.addEventListener("pause", updateMusic);
audio.addEventListener("error", () => {
  musicNeedsGesture = false;
  stopAutomaticMusic();
  updateMusic();
  notify("Music is unavailable right now. Please try again later.");
});

document.querySelector("#share-invite").addEventListener("click", async () => {
  const url = `${location.origin}${location.pathname}`;
  const data = {
    title: "Dakshita & Animesh | Bride's Wedding Invitation",
    text: "Join us for Dakshita & Animesh's wedding celebrations — 19 & 20 November 2026 in Delhi NCR. Mehendi & Sangeet at Hotel The League & Wedding at Wisteria.",
    url,
  };
  try {
    if (navigator.share) await navigator.share(data);
    else if (navigator.clipboard && window.isSecureContext) {
      await navigator.clipboard.writeText(url);
      notify("Bride's invitation link copied. Share a little joy!");
    } else window.prompt("Copy this invitation link to share:", url);
  } catch (error) {
    if (error.name !== "AbortError")
      notify(
        "Unable to share. You can copy the invitation URL from your address bar.",
      );
  }
});

if (!reducedMotion.matches) {
  const petalLayer = document.querySelector(".floating-petals");
  for (let i = 0; i < 10; i++) {
    const petal = document.createElement("span");
    petal.className = "petal";
    petal.style.left = `${8 + i * 8}%`;
    petal.style.setProperty("--duration", `${9 + (i % 4) * 2}s`);
    petal.style.setProperty("--delay", `${-i * 2.7}s`);
    petalLayer.appendChild(petal);
  }
}
