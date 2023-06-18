const player = document.getElementById("player");
const playboard = document.getElementById("playboard");

const playerSpeed = 4; 
const containerWidth = playboard.offsetWidth;
const playerWidth = player.offsetWidth;


window.addEventListener("keydown", (event) => {
  if (event.key === "ArrowLeft") {
    const currentPosition = player.offsetLeft;
    const newPosition = currentPosition - playerSpeed;
    if (newPosition >= 0) {
      player.style.left = `${newPosition}px`;
    }
  }
});


window.addEventListener("keydown", (event) => {
  if (event.key === "ArrowRight") {
    const currentPosition = player.offsetLeft;
    const newPosition = currentPosition + playerSpeed;

    if (newPosition + playerWidth <= containerWidth) {
      player.style.left = `${newPosition}px`;
    }
  }
});
const bullets = []; 

function shootBullet() {
  const bullet = document.createElement("div");
  bullet.className = "bullet";
  bullet.style.left = `${player.offsetLeft + playerWidth / 2}px`;
  bullet.style.bottom = `${player.offsetHeight}px`;

  playboard.appendChild(bullet);
  bullets.push(bullet);

  function moveBullet() {
    bullet.style.bottom = `${parseInt(bullet.style.bottom) + 4}px`;
    
    const bulletBottom = parseInt(bullet.style.bottom);
    const bulletLeft = parseInt(bullet.style.left);
    for (let i = 0; i < robots.length; i++) {
      const robot = robots[i];
      const robotTop = parseInt(robot.style.top);
      const robotBottom = robotTop + robot.offsetHeight;
      const robotLeft = parseInt(robot.style.left);
      const robotRight = robotLeft + robot.offsetWidth;

      if (
        bulletBottom >= robotTop &&
        bulletLeft >= robotLeft &&
        bulletLeft <= robotRight
      ) {
        
        bullet.remove();
        bullets.splice(bullets.indexOf(bullet), 1);
        robot.remove();
        robots.splice(i, 1);
        score++; 
        break; 
      }
    }

    
    if (bulletBottom <= 0) {
      bullet.remove();
      bullets.splice(bullets.indexOf(bullet), 1);
    }

    requestAnimationFrame(moveBullet);
  }

  moveBullet();
}

window.addEventListener("keydown", (event) => {
  if (event.key === " ") {
    shootBullet();
  }
});
const robots = []; 
function createBot() {
  const bot = document.createElement("div");
  bot.className = "bot";
  bot.style.left = `${Math.random() * (containerWidth - 50)}px`; 
  bot.style.top = "0";

  playboard.appendChild(bot);
  robots.push(bot);

  function moveBot() {
    bot.style.top = `${parseInt(bot.style.top) + 10}px`; 
    const botTop = parseInt(bot.style.top);
    const botBottom = botTop + bot.offsetHeight;
    const botLeft = parseInt(bot.style.left);
    const botRight = botLeft + bot.offsetWidth;

    const baseTop = parseInt(base.style.top);
    const baseBottom = baseTop + base.offsetHeight;
    const baseLeft = parseInt(base.style.left);
    const baseRight = baseLeft + base.offsetWidth;

    if (
      botBottom >= baseTop &&
      botLeft >= baseLeft &&
      botRight <= baseRight
    ) {
     
      gameOver();
    }

    requestAnimationFrame(moveBot);
  }

  moveBot();
}
function gameOver() {
 
  clearInterval(botCreationInterval);
  for (let i = 0; i < robots.length; i++) {
    robots[i].remove();
  }
  robots.length = 0;

  const gameOverMessage = document.createElement("div");
  gameOverMessage.innerText = "Game Over! Final Score: " + score;
  gameOverMessage.style.fontSize = "20px";
  gameOverMessage.style.position = "absolute";
  gameOverMessage.style.top = "50%";
  gameOverMessage.style.left = "50%";
  gameOverMessage.style.transform = "translate(-50%, -50%)";

  playboard.appendChild(gameOverMessage);

  

 
}
