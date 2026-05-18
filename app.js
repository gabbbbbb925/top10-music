async function loadTop10() {
    const grid = document.getElementById('musicGrid');
    const lastUpdate = document.getElementById('lastUpdate');

  try {
        const res = await fetch('data/top10.json?t=' + Date.now());
        const data = await res.json();

      if (data.updatedAt) {
              const date = new Date(data.updatedAt);
              lastUpdate.textContent = 'Derniere mise a jour : ' + date.toLocaleDateString('fr-FR', {
                        weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'
              });
      }

      grid.innerHTML = '';
        data.tracks.forEach((track, i) => {
                const card = document.createElement('div');
                card.className = 'card';
                card.innerHTML = `
                        <div class="rank">#${i + 1}</div>
                                <img class="cover" src="${track.cover}" alt="cover" />
                                        <div class="info">
                                                  <div class="title">${track.title}</div>
                                                            <div class="artist">${track.artist}</div>
                                                                      <div class="tags">
                                                                                  ${track.genres.map(g => `<span class="tag">${g}</span>`).join('')}
                                                                                            </div>
                                                                                                    </div>
                                                                                                            <a class="listen-btn" href="${track.url}" target="_blank">Ecouter</a>
                                                                                                                  `;
                grid.appendChild(card);
        });

  } catch (e) {
        grid.innerHTML = '<div class="loading">Erreur de chargement. Reessaie plus tard.</div>';
  }
}

loadTop10();
