// Rotating text thingy 1000

const words = ["Discord Bots", "Free Alternatives", "Games", "This Website"];
const el = document.getElementById("rotating-text");
let i = 0;

setInterval(() => {
    i = (i + 1) % words.length;
    el.textContent = words[i];

    el.classList.remove("swap");
    void el.offsetWidth;
    el.classList.add("swap");
}, 2500);

// This is the clickable buttons machine 2000

const modes = {
  main: [
    { id: 'game', label: 'Game', img: 'assets/game.svg' },
    { id: 'code',   label: 'Code', img: 'assets/code.svg' },
    { id: 'music',  label: 'Music', img: 'assets/music.svg' },
    { id: 'setup',  label: 'MySetup', img: 'assets/linux.svg' },
  ],
  code: [
    { id: 'python', label: 'Python', img: 'assets/python.svg' },
    { id: 'js',     label: 'JavaScript', img: 'assets/javascript.svg', info: { title: 'Javascript', text: 'Really only learned it for this website. It was fun to learn how you make little animations in javascript!'} },
    { id: 'html',   label: 'HTML', img: 'assets/html.svg' },
    { id: 'linux',  label: 'Linux', img: 'assets/linux.svg' },
  ],
  music: [
    { id: 'oricade', label: 'Oricade', img: 'assets/oricade.svg', url: 'https://youtube.com/@Oricade' },
    { id: 'miku',    label: 'Miku', img: 'assets/miku.jpg', url: 'https://www.youtube.com/@HatsuneMiku' },
    { id: 'Porter',  label: 'Porter', img: 'assets/porter.jpg', url: 'https://www.youtube.com/@porterrobinson' },
    { id: 'Will',       label: 'Will', img: 'assets/will.jpg', url: 'https://www.youtube.com/@willstetson' }
  ],
  game: [
    {}
  ]
};

const buttons = document.querySelectorAll('.planet-inner');
const backBtn = document.querySelector('.orbit-center');

backBtn.addEventListener('click', () => {
  changeMode('main');
});

buttons.forEach(btn => {
  btn.addEventListener('click', () => {
    const id = btn.dataset.planet;
    if (modes[id]) {
      changeMode(id);
    } else if (btn.dataset.url) {
      window.open(btn.dataset.url, '_blank', 'noopener');
    } else if (btn.dataset.infoTitle) {
      openInfo({ title: btn.dataset.infoTitle, text: btn.dataset.infoText})
    }
  });
});

// why is my tab key not doing 4 spaces any more I swear it used to do that. Did copying code snipits from websites break my tab key lol
// also do you comment with // or /* *\ or <!-- --> or # because I don't get it 
function setMode(name) {
  const items = modes[name];
  buttons.forEach((btn, i) => {
    btn.dataset.planet = items[i].id;
    btn.ariaLabel = items[i].label;
    btn.querySelector('img').src = items[i].img;
    btn.dataset.url = items[i].url || '';
    btn.dataset.infoTitle = items[i].info?.title || '';
    btn.dataset.infoText = items[i].info?.text || '';
  });
}

// Please don't tell me there is another random constant in the middle of the code. It makes no sense at al-
// BANG
const dialog = document.getElementById('info-dialog');
// aw man why did this happen
// I'm so sleepy but I really need this feature to work it would look so dang coooool

function openInfo(info) { //Start of thing 5000
  document.getElementById('info-title').innerHTML = info.title; // Title maker 5000, someone online said innerhtml is what I need but who knows what innerHTML is
  document.getElementById('info-text').innerHTML = info.text; // Text maker 5000: I think innerHTML is like turning it into html to display to the client? I think...
  dialog.showModal() // Show the thing 5000
} // End of thing 5000

document.getElementById('info-close').addEventListener('click', () => {
  dialog.close() // Hide the thing 5000
}); //ok after testing this popup thing it looks so ehhhhhhhh it's css time.


setMode('main');

// Button animator 3000

const orbit = document.querySelector('.orbit');
const ring = document.querySelector('.orbit-ring');
const icons = document.querySelectorAll('.planet-inner img');

function tween(from, to, ms, onUpdate) {
  return new Promise(resolve => {
    const start = performance.now();
    function frame(now) {
      const t = Math.min((now - start) / ms, 1);
      onUpdate(from + (to - from) * t);
      if (t < 1) requestAnimationFrame(frame);
      else resolve();
    }
    requestAnimationFrame(frame);
  });
}

function setSpeed(rate) {
  orbit.getAnimations({ subtree: true }).forEach(a => { a.playbackRate = rate; });
}
function setBlur(px) { ring.style.filter = `blur(${px}px)`; }
function setIconOpacity(v) { icons.forEach(img => { img.style.opacity = v; }); }

let busy = false;

async function changeMode(name) {
  if (busy) return;
  busy = true;

  await Promise.all([
    tween(1, 80, 600, setSpeed),
    tween(0, 50, 600, setBlur),
  ]);


  await tween(1, 0.5, 500, setIconOpacity);

  setMode(name); 

  await tween(0.5, 1, 500, setIconOpacity)

  await Promise.all([
    tween(80, 1, 600, setSpeed),
    tween(50, 0, 600, setBlur),
  ]);

  busy = false;
}
