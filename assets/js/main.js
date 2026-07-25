// =========================================================
// DHR Digital — main.js
// Injeta header/footer (partials), controla menu mobile,
// atualiza o ano do copyright automaticamente e marca o
// link de navegação ativo.
// =========================================================

async function includePartial(selector, url) {
  const el = document.querySelector(selector);
  if (!el) return;
  try {
    const res = await fetch(url);
    el.innerHTML = await res.text();
  } catch (err) {
    console.error(`Não foi possível carregar ${url}`, err);
  }
}

function setActiveNavLink() {
  const current = document.body.dataset.page;
  document.querySelectorAll('.main-nav a[data-page]').forEach((link) => {
    if (link.dataset.page === current) {
      link.setAttribute('aria-current', 'page');
    }
  });
}

function setDynamicYear() {
  document.querySelectorAll('[data-year]').forEach((el) => {
    el.textContent = new Date().getFullYear();
  });
}

function setupMobileNav() {
  const toggle = document.querySelector('.nav-toggle');
  if (!toggle) return;
  toggle.addEventListener('click', () => {
    document.body.classList.toggle('nav-open');
    const expanded = document.body.classList.contains('nav-open');
    toggle.setAttribute('aria-expanded', String(expanded));
  });
  // fecha o menu ao clicar em um link (mobile)
  document.addEventListener('click', (e) => {
    if (e.target.closest('.main-nav a')) {
      document.body.classList.remove('nav-open');
    }
  });
}

function setupCircuitRail() {
  // ativa os nós da trilha conforme o scroll passa pela seção
  const nodes = document.querySelectorAll('.circuit-node[data-target]');
  const sections = document.querySelectorAll('.section-content[id]');
  if (!nodes.length || !sections.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        const node = document.querySelector(
          `.circuit-node[data-target="${entry.target.id}"]`
        );
        if (!node) return;
        if (entry.isIntersecting) node.classList.add('active');
        else node.classList.remove('active');
      });
    },
    { rootMargin: '-40% 0px -50% 0px' }
  );

  sections.forEach((s) => observer.observe(s));
}

document.addEventListener('DOMContentLoaded', async () => {
  await Promise.all([
    includePartial('[data-include="header"]', '/partials/header.html'),
    includePartial('[data-include="footer"]', '/partials/footer.html'),
  ]);
  setActiveNavLink();
  setDynamicYear();
  setupMobileNav();
  setupCircuitRail();
});
