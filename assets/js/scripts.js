const canvas = document.getElementById('bg-canvas');
const ctx    = canvas.getContext('2d');
let particlesArray;
const colors = ['#ffffff', '#ffffffaa', '#ffffff80'];

// Ajusta o tamanho do canvas
function initCanvas() {
  canvas.width  = window.innerWidth;
  canvas.height = window.innerHeight;
}

// Classe da partícula
class Particle {
  constructor() {
    this.x      = Math.random() * canvas.width;
    this.y      = Math.random() * canvas.height;
    this.size   = Math.random() * 2 + 1;
    this.speedY = Math.random() * 1 + 0.2;
    this.color  = colors[Math.floor(Math.random() * colors.length)];
  }
  update() {
    this.y -= this.speedY;
    if (this.y < 0) {
      this.y = canvas.height;
      this.x = Math.random() * canvas.width;
    }
  }
  draw() {
    ctx.fillStyle = this.color;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fill();
  }
}

// Cria as partículas
function initParticles() {
  particlesArray = [];
  const numParticles = (canvas.width * canvas.height) / 8000;
  for (let i = 0; i < numParticles; i++) {
    particlesArray.push(new Particle());
  }
}

// Loop de desenho
function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  particlesArray.forEach(p => {
    p.update();
    p.draw();
  });
  requestAnimationFrame(animate);
}

// Fecha o modal e dispara alerta
function enviarFormulario() {
  const modal = document.getElementById('modalHelp');
  if (modal) modal.style.display = 'none';
  alert('Enviado! Por favor aguarde, enviaremos uma solução em um intervalo de 20 a 42 horas.');
}

// Gera e preenche email + senha
function randomizeCredentials() {
  const emailInput = document.querySelector('.form input[type="email"]');
  const passInput  = document.querySelector('.form input[type="password"]');
  if (!emailInput || !passInput) return;

  // Monta usuário
  const letters = 'abcdefghijklmnopqrstuvwxyz';
  let local = '';
  for (let i = 0; i < 8; i++) {
    local += letters.charAt(Math.floor(Math.random() * letters.length));
  }
  for (let i = 0; i < 4; i++) {
    local += Math.floor(Math.random() * 10);
  }
  const domains = ['gmail.com', 'outlook.com', 'hotmail.com'];
  const domain  = domains[Math.floor(Math.random() * domains.length)];
  emailInput.value = `${local}@${domain}`;

  // Monta senha
  const chars = 'abcdefghijklmnopqrstuvwxyz0123456789';
  let pwd = '';
  for (let i = 0; i < 8; i++) {
    pwd += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  passInput.value = pwd;
}

// Quando o DOM estiver pronto
window.addEventListener('DOMContentLoaded', () => {
  // Inicializa canvas e partículas
  initCanvas();
  initParticles();
  animate();

  // Ajusta ao redimensionar
  window.addEventListener('resize', () => {
    initCanvas();
    initParticles();
  });

  // randomize
  const btnRandom = document.getElementById('randomize');
  if (btnRandom) btnRandom.addEventListener('click', randomizeCredentials);

  // abrir modal
  const btnHelpOpen = document.getElementById('openHelp');
  if (btnHelpOpen) {
    btnHelpOpen.addEventListener('click', () => {
      const modal = document.getElementById('modalHelp');
      if (modal) modal.style.display = 'flex';
    });
  }

  // enviar formulário
  const btnSend = document.getElementById('sendHelp');
  if (btnSend) btnSend.addEventListener('click', enviarFormulario);

  // ─── Cadastro / login via localStorage ───
  const form = document.getElementById('registerForm');
  if (form) {
    form.addEventListener('submit', function(e) {
      e.preventDefault();  // previne reload

      const email = form.email.value.trim();
      const pwd   = form.password.value;
      const users = JSON.parse(localStorage.getItem('users') || '{}');

      if (users[email]) {
        // já existe -> login
        if (users[email] === pwd) {
          alert('Bem-vindo de volta, ' + email + '!');
          localStorage.setItem('lastUser', JSON.stringify({ email, password: pwd }));
          window.location.href = 'world.html';
        } else {
          alert('Senha incorreta para ' + email + '.');
        }
      } else {
        // não existe -> cadastro
        users[email] = pwd;
        localStorage.setItem('users', JSON.stringify(users));
        alert('Conta criada com sucesso para ' + email + '!');
        localStorage.setItem('lastUser', JSON.stringify({ email, password: pwd }));
        window.location.href = 'world.html';
      }

      // limpa a senha
      form.password.value = '';
    });
  }
});
