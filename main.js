const graph = id => [`https://graph.facebook.com/${id}/picture?width=720&height=720&access_token=6628568379%7Cc1e620fa708a1d5696fb991c1bde5662`, id];
const GID = id => document.getElementById(id);
const openLink = link => window.location.href = link;
const profile = GID("profile");
const container = GID("container");
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

function information(){
  const myProfile = graph("100029350902119");
  profile.src = myProfile[0];
  const bio = [
    "“하나님을 신뢰하라” 🌷"
  ];
  GID("title").innerText = "Wiegine's Profile";
  GID("name").innerText = "Wiegine S. Echavez";
  GID("username").innerText = "@wgneechvez";
  GID("bio").innerText = bio[Math.floor(Math.random() * bio.length)];
  GID("fb").onclick = () => openLink("https://www.facebook.com/profile.php?id=" + myProfile[1]);
  GID("ig").onclick = () => openLink("https://www.instagram.com/wgneechvez");
  GID("group").onclick = () => openLink("https://www.facebook.com/groups/coders.dev");
  GID("created").innerText = "her bf";
}

addEventListener("DOMContentLoaded", async () => {
  information();
  await music();
  container.style.display = "block";
  setTimeout(() => window.scrollTo({ top: 0, behavior: "smooth" }), 500);
});