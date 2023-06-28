var canvas = document.getElementById("myCanvas");

// Definir o tamanho do canvas
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Obter o contexto 2D do canvas
var ctx = canvas.getContext("2d");

// Array para armazenar as bolinhas
var balls = [];

// Classe para representar cada bolinha
class Ball {
    constructor(x, y, radius, speedX, speedY, color) {
      this.x = x;
      this.y = y;
      this.radius = radius;
      this.speedX = speedX;
      this.speedY = speedY;
      this.color = color;
    }
  
    // Método para desenhar a bolinha no canvas
    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
      ctx.fillStyle = this.color;
      ctx.fill();
      ctx.closePath();
    }

  // Método para atualizar a posição da bolinha
  update() {
    // Verificar se a bolinha atingiu a borda horizontal do canvas
    if (this.x + this.radius > canvas.width || this.x - this.radius < 0) {
      this.speedX = -this.speedX; // Inverter a direção horizontal
    }

    // Verificar se a bolinha atingiu a borda vertical do canvas
    if (this.y + this.radius > canvas.height || this.y - this.radius < 0) {
      this.speedY = -this.speedY; // Inverter a direção vertical
    }

    // Atualizar a posição da bolinha
    this.x += this.speedX;
    this.y += this.speedY;
  }
}

// Função para criar as bolinhas
function createBalls(numBalls) {
    for (var i = 0; i < numBalls; i++) {
      var radius = 10;
      var x = Math.random() * (canvas.width - radius * 2) + radius;
      var y = Math.random() * (canvas.height - radius * 2) + radius;
      var speedX = (Math.random() - 0.5) * 2; // Velocidade horizontal aleatória
      var speedY = (Math.random() - 0.5) * 2; // Velocidade vertical aleatória
  
      // Randomizar a cor entre amarelo e laranja
      var color = Math.random() < 0.5 ? "#FFFF00" : "#FF7300";
  
      var ball = new Ball(x, y, radius, speedX, speedY, color);
      balls.push(ball);
    }
  }

// Função para atualizar e desenhar as bolinhas
function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  
    for (var i = 0; i < balls.length; i++) {
      balls[i].update();
      balls[i].draw();
    }
  
    requestAnimationFrame(animate);
  }

// Iniciar a animação
requestAnimationFrame(animate);

// Chamada da função para criar as bolinhas
createBalls(30);

// Iniciar a animação
animate();
