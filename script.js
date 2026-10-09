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

const modes = {
  main: [
    { id: 'game', label: 'Game', img: 'assets/game.svg' },
    { id: 'code',   label: 'Code', img: 'assets/code.svg' },
    { id: 'music',  label: 'Music', img: 'assets/music.svg' },
    { id: 'setup',  label: 'MySetup', img: 'assets/linux.svg' },
  ],
  code: [
    { id: 'python', label: 'Python', img: 'assets/python.svg' },
    { id: 'js',     label: 'JavaScript', img: 'assets/javascript.svg' },
    { id: 'html',   label: 'HTML', img: 'assets/html.svg' },
    { id: 'linux',  label: 'Linux', img: 'assets/linux.svg' },
  ],
  music: [
    { id: 'oricade', label: 'Oricade', img: 'assets/oricade.svg', url '' },
    { id: 'miku',    label: 'Miku', img: 'assets/miku.jpg' },

  ],
};

const buttons = document.querySelectorAll('.planet-inner');
const backBtn = document.querySelector('.orbit-center');

backBtn.addEventListener('click', () => {
  setMode('main');
});

buttons.forEach(btn => {
  btn.addEventListener('click', () => {
    const id = btn.dataset.planet;
    if (modes[id])
      setMode(id)

  });
});

// Changes the buttons on display based on the mode
function setMode(name) {
  const items = modes[name];
  buttons.forEach((btn, i) => {
    btn.dataset.planet = items[i].id;
    btn.ariaLabel = items[i].label;
    btn.querySelector('img').src = items[i].img;
  });
}

setMode('main');