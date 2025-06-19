const canvas = document.getElementById('bg-canvas');
const ctx = canvas.getContext('2d');
let particlesArray;
const colors = ['#ffffff', '#ffffffaa', '#ffffff80'];

function initCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}

window.addEventListener('resize', () => {
  initCanvas();
  initParticles();
});

class Particle {
  constructor() {
    this.x = Math.random() * canvas.width;
    this.y = Math.random() * canvas.height;
    this.size = Math.random() * 2 + 1;
    this.speedY = Math.random() * 1 + 0.2;
    this.color = colors[Math.floor(Math.random() * colors.length)];
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

function initParticles() {
  particlesArray = [];
  const numberOfParticles = (canvas.width * canvas.height) / 8000;
  for (let i = 0; i < numberOfParticles; i++) {
    particlesArray.push(new Particle());
  }
}

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  particlesArray.forEach(p => {
    p.update();
    p.draw();
  });
  requestAnimationFrame(animate);
}

document.getElementById('openHelp').addEventListener('click', () => {
  document.getElementById('modalHelp').style.display = 'flex';
});

function enviarFormulario() {
  document.getElementById('modalHelp').style.display = 'none';
  alert('Enviado! Por favor aguarde, enviaremos uma solução em um intervalo de 20 a 42 horas.');
}

document.getElementById('randomize').addEventListener('click', () => {
  const emailInput = document.querySelector('.form input[type="email"]');
  const passInput = document.querySelector('.form input[type="password"]');

  // Gera sequência de 8 letras aleatórias
  const letters = 'abcdefghijklmnopqrstuvwxyz';
  let local = '';
  for (let i = 0; i < 8; i++) {
    local += letters.charAt(Math.floor(Math.random() * letters.length));
  }
  // Gera sequência de 4 números
  for (let i = 0; i < 4; i++) {
    local += Math.floor(Math.random() * 10);
  }
  // Escolhe domínio aleatório
  const domains = ['gmail.com', 'outlook.com', 'hotmail.com'];
  const domain = domains[Math.floor(Math.random() * domains.length)];
  emailInput.value = `${local}@${domain}`;

  // Gera senha de 8 caracteres alfanuméricos
  const chars = 'abcdefghijklmnopqrstuvwxyz0123456789';
  let pwd = '';
  for (let i = 0; i < 8; i++) {
    pwd += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  passInput.value = pwd;
});


initCanvas();
initParticles();
animate();
