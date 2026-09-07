const games = [
  {
    name: "Choo-Choo Charles",
    short: "CHOO-CHOO<br>CHARLES",
    genre: ["terror","acao"],
    genreLabel: "Terror • Ação",
    type: "PC → Android",
    featured: true,
    color: "#6d1c16",
    link: "https://play.google.com/store/apps/details?id=com.TwoStarGames.ChooChooCharles"
  },
  {
    name: "The Exit 8",
    short: "THE<br>EXIT 8",
    genre: ["terror","puzzle"],
    genreLabel: "Puzzle • Terror",
    type: "PC → Android",
    featured: true,
    color: "#777b64",
    link: "https://play.google.com/store/apps/details?id=com.PLAYISM.TheExit8"
  },
  {
    name: "The Baby In Yellow",
    short: "THE BABY<br>IN YELLOW",
    genre: ["terror"],
    genreLabel: "Terror",
    type: "PC → Android",
    featured: true,
    color: "#b99b17",
    link: "https://play.google.com/store/apps/details?id=com.TeamTerrible.BabyInYellow"
  },
  {
    name: "Warhammer 40,000: Boltgun Boom",
    short: "WARHAMMER<br>40K",
    genre: ["fps","acao"],
    genreLabel: "FPS • Ação",
    type: "PC → Android",
    featured: true,
    color: "#6d2415",
    link: "https://play.google.com/store/apps/details?id=com.nitrogames.boltgunboom"
  }
];

const grid = document.querySelector("#grid");
const featured = document.querySelector("#featured");
const search = document.querySelector("#search");
const empty = document.querySelector("#empty");
const count = document.querySelector("#count");
let filter = "todos";

function card(g){
  return `
    <article class="card">
      <div class="cover" style="--c1:${g.color}">
        <div class="cover-text">${g.short}</div>
      </div>
      <div class="card-body">
        <h3>${g.name}</h3>
        <div class="meta">
          <span class="tag">${g.genreLabel}</span>
          <span class="type">${g.type}</span>
        </div>
        <div class="card-actions">
          <a class="link-btn" href="${g.link}" target="_blank" rel="noopener noreferrer">ABRIR LINK OFICIAL ↗</a>
        </div>
      </div>
    </article>`;
}

function render(){
  const q = search.value.trim().toLowerCase();
  const result = games.filter(g => {
    const matchesText = !q || `${g.name} ${g.genreLabel} ${g.type}`.toLowerCase().includes(q);
    const matchesFilter = filter === "todos" || g.genre.includes(filter);
    return matchesText && matchesFilter;
  });
  grid.innerHTML = result.map(card).join("");
  count.textContent = `${result.length} ${result.length === 1 ? "jogo" : "jogos"}`;
  empty.hidden = result.length !== 0;
}

featured.innerHTML = games.filter(g => g.featured).map(card).join("");
render();

search.addEventListener("input", render);
document.querySelector("#chips").addEventListener("click", e => {
  const btn = e.target.closest(".chip");
  if(!btn) return;
  document.querySelectorAll(".chip").forEach(b => b.classList.remove("active"));
  btn.classList.add("active");
  filter = btn.dataset.filter;
  render();
});
