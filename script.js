function snake() {
  let gameCanvas = document.getElementById("board");
  let gameContext = gameCanvas.getContext("2d");
  let playerX,
    playerY,
    gridSize,
    tileCount,
    appleX,
    appleY,
    velocityX,
    velocityY;
  let trail = [];
  let tail = 5;

  playerX = playerY = 10;
  gridSize = tileCount = 20;
  appleX = appleY = 15;
  velocityX = velocityY = 0;

  const game = () => {
    playerX += velocityX;
    playerY += velocityY;
    if (playerX < 0) {
      playerX = tileCount - 1;
    }
    if (playerX > tileCount - 1) {
      playerX = 0;
    }
    if (playerY < 0) {
      playerY = tileCount - 1;
    }
    if (playerY > tileCount - 1) {
      playerY = 0;
    }
    gameContext.fillStyle = "#555678";
    gameContext.fillRect(0, 0, gameCanvas.width, gameCanvas.height);

    gameContext.fillStyle = "lime";
    for (let i = 0; i < trail.length; i++) {
      gameContext.fillRect(
        trail[i].x * gridSize,
        trail[i].y * gridSize,
        gridSize - 2,
        gridSize - 2
      );
      if (trail[i].x == playerX && trail[i].y == playerY) {
        tail = 5;
      }
    }
    trail.push({ x: playerX, y: playerY });
    while (trail.length > tail) {
      trail.shift();
    }

    if (appleX == playerX && appleY == playerY) {
      tail++;
      appleX = Math.floor(Math.random() * tileCount);
      appleY = Math.floor(Math.random() * tileCount);
    }

    gameContext.fillStyle = "pink";
    gameContext.fillRect(
      appleX * gridSize,
      appleY * gridSize,
      gridSize - 2,
      gridSize - 2
    );
  };

  const keyPush = (event) => {
    switch (event.keyCode) {
      case 37:
        velocityX = -1;
        velocityY = 0;
        break;

      case 38:
        velocityX = 0;
        velocityY = -1;
        break;

      case 39:
        velocityX = 1;
        velocityY = 0;
        break;

      case 40:
        velocityX = 0;
        velocityY = 1;
        break;
    }
  };

  document.addEventListener("keydown", keyPush);
  setInterval(game, 1000 / 15);
}

snake();
