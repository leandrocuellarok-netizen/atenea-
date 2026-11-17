(() => {
  const search = document.getElementById('search-input');
  const clear = document.getElementById('clear-search');
  const chips = [...document.querySelectorAll('.filter-chip')];
  const cards = [...document.querySelectorAll('[data-kind]')];
  const count = document.getElementById('results-count');
  const empty = document.getElementById('no-results');
  const menu = document.querySelector('.main-nav');
  const menuToggle = document.querySelector('.menu-toggle');
  let filter = 'todos';

  function update() {
    const term = (search.value || '').trim().toLocaleLowerCase('es');
    let visible = 0;
    cards.forEach(card => {
      const kind = (card.dataset.kind || '').split(' ');
      const text = (card.dataset.search || card.textContent).toLocaleLowerCase('es');
      const matchesFilter = filter === 'todos' || kind.includes(filter);
      const matchesTerm = !term || text.includes(term);
      const show = matchesFilter && matchesTerm;
      card.hidden = !show;
      if (show) visible++;
    });
    count.textContent = visible + (visible === 1 ? ' registro visible' : ' registros visibles');
    empty.hidden = visible !== 0;
  }
  search.addEventListener('input', update);
  clear.addEventListener('click', () => { search.value = ''; update(); search.focus(); });
  chips.forEach(chip => chip.addEventListener('click', () => {
    chips.forEach(item => item.classList.toggle('active', item === chip));
    filter = chip.dataset.filter;
    update();
  }));
  menuToggle.addEventListener('click', () => {
    const open = menu.classList.toggle('open');
    menuToggle.setAttribute('aria-expanded', String(open));
  });
  menu.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
    menu.classList.remove('open');
    menuToggle.setAttribute('aria-expanded', 'false');
  }));
  document.getElementById('year').textContent = new Date().getFullYear();
  update();
})();