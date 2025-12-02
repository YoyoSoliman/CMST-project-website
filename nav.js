(function(){
  // Minimal, dependency-free navigation helper
  const pages = ['index.html','positives.html','negatives.html','citations.html'];
  const raw = location.pathname.split('/').pop();
  const currentPage = (raw === '' || raw === '/') ? 'index.html' : raw;
  let idx = pages.indexOf(currentPage);
  if (idx === -1) idx = 0; // fallback to index

  const scrollNav = document.createElement('div');
  scrollNav.id = 'scrollNav';
  scrollNav.className = 'scroll-nav';
  scrollNav.setAttribute('aria-hidden','true');

  const prev = document.createElement('a');
  prev.id = 'navPrev';
  prev.className = 'scroll-nav__btn scroll-nav__btn--prev';
  prev.setAttribute('role','link');
  prev.setAttribute('aria-label','Previous page');
  prev.innerHTML = '<span class="icon-chevron">←</span>';

  const next = document.createElement('a');
  next.id = 'navNext';
  next.className = 'scroll-nav__btn scroll-nav__btn--next';
  next.setAttribute('role','link');
  next.setAttribute('aria-label','Next page');
  next.innerHTML = '<span class="icon-chevron">→</span>';

  scrollNav.appendChild(prev);
  scrollNav.appendChild(next);
  // Try to insert before the footer so the nav stays in the page flow (doesn't follow the viewport)
  const footer = document.querySelector('.footer');
  if (footer && footer.parentNode) {
    footer.parentNode.insertBefore(scrollNav, footer);
  } else {
    document.body.appendChild(scrollNav);
  }

  function updateLinks(){
    if (idx > 0){
      prev.href = pages[idx-1];
      prev.style.display = '';
      prev.setAttribute('tabindex','0');
    } else {
      prev.removeAttribute('href');
      prev.style.display = 'none';
      prev.removeAttribute('tabindex');
    }

    if (idx < pages.length - 1){
      next.href = pages[idx+1];
      next.style.display = '';
      next.setAttribute('tabindex','0');
    } else {
      next.removeAttribute('href');
      next.style.display = 'none';
      next.removeAttribute('tabindex');
    }
  }

  updateLinks();

  // Show when user scrolls down a bit
  // Show when the user has scrolled down a bit (keeps the element static at page bottom)
  let visible = false;
  function onScroll(){
    const threshold = 200; // pixels
    if (window.scrollY > threshold && !visible){
      scrollNav.classList.add('show');
      scrollNav.setAttribute('aria-hidden','false');
      visible = true;
    } else if (window.scrollY <= threshold && visible){
      scrollNav.classList.remove('show');
      scrollNav.setAttribute('aria-hidden','true');
      visible = false;
    }
  }
  window.addEventListener('scroll', onScroll, {passive:true});
  // initial check in case page loads scrolled
  onScroll();

  // Keyboard navigation (left / right arrows)
  window.addEventListener('keydown', function(e){
    if (e.key === 'ArrowLeft' && prev && prev.href) location.href = prev.href;
    if (e.key === 'ArrowRight' && next && next.href) location.href = next.href;
  });

})();
