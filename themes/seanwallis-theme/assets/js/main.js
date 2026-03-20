document.addEventListener('DOMContentLoaded', () => {
  const grid = document.querySelector('.portfolio-grid');
  if (!grid) return;

  const shuffleInstance = new Shuffle(grid, {
    itemSelector: '.portfolio-card',
    speed: 400,
    easing: 'ease',
  });

  const radios = document.querySelectorAll('.portfolio-filter input[type="radio"]');
  const labels = document.querySelectorAll('.portfolio-filters label');

  function updateActiveLabel(radio) {
    labels.forEach(label => label.classList.remove('is-active'));
    const activeLabel = document.querySelector(`label[for="${radio.id}"]`);
    if (activeLabel) activeLabel.classList.add('is-active');
  }

  // Set initial active label
  const initial = document.querySelector('.portfolio-filter input[type="radio"]:checked');
  if (initial) updateActiveLabel(initial);

  radios.forEach(radio => {
    radio.addEventListener('change', () => {
      updateActiveLabel(radio);

      const value = radio.id.replace('filter-', '');

      if (value === 'all') {
        shuffleInstance.filter(Shuffle.ALL_ITEMS);
      } else {
        shuffleInstance.filter(el => {
          const groups = el.dataset.groups || '';
          return groups.includes(value);
        });
      }
    });
  });
});
