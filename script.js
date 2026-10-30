(function () {
  var WHATS = '5515998224528';

  // Tema claro/escuro
  var raiz = document.documentElement;
  var tema = document.querySelector('.tema');
  function rotulo() {
    tema.setAttribute('aria-label', raiz.dataset.theme === 'light' ? 'Alternar para tema escuro' : 'Alternar para tema claro');
  }
  rotulo();
  tema.addEventListener('click', function () {
    var novo = raiz.dataset.theme === 'light' ? 'dark' : 'light';
    raiz.dataset.theme = novo;
    try { localStorage.setItem('tema', novo); } catch (e) {}
    rotulo();
  });

  // Menu mobile
  var btn = document.querySelector('.menu-btn');
  var menu = document.getElementById('menu');
  function fechaMenu() {
    menu.classList.remove('aberto');
    btn.setAttribute('aria-expanded', 'false');
  }
  btn.addEventListener('click', function () {
    var aberto = menu.classList.toggle('aberto');
    btn.setAttribute('aria-expanded', String(aberto));
  });
  menu.addEventListener('click', function (e) {
    if (e.target.tagName === 'A') fechaMenu();
  });

  // Galeria ampliada
  var box = document.querySelector('.lightbox');
  var boxImg = box.querySelector('img');
  function fechaBox() {
    box.hidden = true;
    boxImg.removeAttribute('src');
  }
  document.querySelectorAll('.g').forEach(function (g) {
    g.addEventListener('click', function () {
      boxImg.src = g.dataset.src;
      boxImg.alt = g.querySelector('img').alt;
      box.hidden = false;
      box.querySelector('button').focus();
    });
  });
  box.addEventListener('click', fechaBox);
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') { fechaBox(); fechaMenu(); }
  });

  // Formulário envia para o WhatsApp
  var form = document.getElementById('form');
  var erro = form.querySelector('.erro');
  form.addEventListener('submit', function (e) {
    e.preventDefault();
    var d = new FormData(form);
    var nome = (d.get('nome') || '').trim();
    var servico = d.get('servico');
    if (!nome || !servico) { erro.hidden = false; return; }
    erro.hidden = true;
    var linhas = [
      'Olá! Vim pelo site da Vitório Elétrica.',
      'Nome: ' + nome,
      'Serviço: ' + servico
    ];
    var local = (d.get('local') || '').trim();
    var msg = (d.get('msg') || '').trim();
    if (local) linhas.push('Local: ' + local);
    if (msg) linhas.push('Detalhes: ' + msg);
    window.open('https://wa.me/' + WHATS + '?text=' + encodeURIComponent(linhas.join('\n')), '_blank', 'noopener');
  });

  document.getElementById('ano').textContent = new Date().getFullYear();
})();
