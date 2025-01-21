const graph = id => [`https://graph.facebook.com/${id}/picture?width=720&height=720&access_token=6628568379%7Cc1e620fa708a1d5696fb991c1bde5662`, id];
const GID = id => document.getElementById(id);
const openLink = link => window.location.href = link;
const profile = GID("profile");
const container = GID("container");
const particleContainer = document.querySelector('.animated-bg');
const maxParticles = 30;
let particleCount = 0;
container.style.display = "none";
let sound = null;

function playMusic(url, isalang, isLoop) {
  if (sound != null) {
    sound.stop();
    sound.unload();
    sound = null;
  }
  sound = new Howl({
    src: [url],
    loop: isLoop,
    format: ['mp3'],
    volume: 1,
    onend: () => {}
  });
  if (isalang) {
    sound.play();
  }
}

function playShortAudio(url) {
  const s = new Howl({
    src: [url],
    loop: false,
    volume: 1,
    autoplay: true
  });
  s.play();
}

async function music() {
  let muswitch = false;
  const file = "bgm",
    nameFile = "https://i.imgur.com/VKlwxl0.mp4",
    mustore = localStorage.getItem(file),
    switchMusic = b => {
      playMusic(nameFile, b, true);
      //mus.innerHTML = `${b ? "Stop" : "Play"} Music`;
    }
  profile.addEventListener("click", async () => {
    muswitch = !muswitch;
    switchMusic(muswitch);
    localStorage.setItem(file, muswitch ? "1" : "0");
    return;
  });
  muswitch = mustore === "1";
  switchMusic(muswitch);
}

function information() {
  const myProfile = graph("100071157053751");
  profile.src = myProfile[0];
  const verses = [
    { reference: "Isaiah 41:13", text: "I will always be there for you." },
    { reference: "1 Corinthians 13:8", text: "Love never fails. If it fails, it was never love. If it's real, love will find a way back to you." },
    { reference: "Ephesians 2:19–22", text: "Whenever you feel unloved, unimportant, or insecure, remember to whom you belong." },
    { reference: "Psalms 100:5", text: "My love for you will never end." },
    { reference: "Mark 10:9", text: "Therefore what God has joined together, let no one separate." },
    { reference: "Psalms 136:1", text: "My love for you is eternal." },
    { reference: "1 Peter 4:8", text: "Above all, love each other deeply." },
    { reference: "Matthew 28:20", text: "I am with you always, even to the end of the age." },
    { reference: "John 15:16", text: "You didn't choose me, but I chose you." },
    { reference: "Lamentations 3:62", text: "My love for you will never fail." },
    { reference: "1 John 4:16", text: "I will always love you." },
    { reference: "1 Corinthians 16:14", text: "Do everything in love." }
];

function getRandomBio() {
    const randomIndex = Math.floor(Math.random() * verses.length);
    const verse = verses[randomIndex];
    if (verse) {
        return `${verse.reference}: "${verse.text}"`;
    } else {
        return "No verse available.";
    }
}

// Test the function
console.log(getRandomBio());  
  GID("title").innerText = "Sunnel John Rebano";
  GID("name").innerText = "Sunnel John Rebano";
  GID("username").innerText = "@sJrebaño";
  GID("bio").innerText = bio[Math.floor(Math.random() * bio.length)];
  GID("fb").onclick = () => openLink("https://www.facebook.com/profile.php?id=" + myProfile[1]);
  GID("ig").onclick = () => openLink("https://www.instagram.com/itz_me_nelzyy");
  GID("tik").onclick = () => openLink("https://www.tiktok.com/@nelzy_rzz");
  GID("created").innerText = "Sunnel";
}
function createParticle() {
  //credits sayo pre @wataruajiro
  if (particleCount >= maxParticles) return;
  const particle = document.createElement('div');
  particle.className = 'particle';
  const startX = Math.random() * window.innerWidth;
  const startY = Math.random() * window.innerHeight;
  const moveX = (Math.random() - 0.5) * 200;
  const moveY = (Math.random() - 0.5) * 200;
  particle.style.left = startX + 'px';
  particle.style.top = startY + 'px';
  particle.style.setProperty('--moveX', moveX + 'px');
  particle.style.setProperty('--moveY', moveY + 'px')
  particle.style.animation = `particleFloat ${5 + Math.random() * 5}s ease-out forwards`;
  particleContainer.appendChild(particle);
  particleCount++;
  particle.addEventListener('animationend', () => {
    particle.remove();
    particleCount--;
  });
}

addEventListener("DOMContentLoaded", async () => {
  information();
  await music();
  container.style.display = "block";
  setInterval(createParticle, 200);
});
