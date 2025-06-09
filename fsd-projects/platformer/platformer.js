$(function () {
  // initialize canvas and context when able to
  canvas = document.getElementById("canvas");
  ctx = canvas.getContext("2d");
  window.addEventListener("load", loadJson);

  function setup() {
    if (firstTimeSetup) {
      halleImage = document.getElementById("player");
      projectileImage = document.getElementById("projectile");
      cannonImage = document.getElementById("cannon");
      $(document).on("keydown", handleKeyDown);
      $(document).on("keyup", handleKeyUp);
      firstTimeSetup = false;
      //start game
      setInterval(main, 1000 / frameRate);
    }

    // Create walls - do not delete or modify this code
    createPlatform(-50, -50, canvas.width + 100, 50); // top wall
    createPlatform(-50, canvas.height - 10, canvas.width + 100, 200, "navy"); // bottom wall
    createPlatform(-50, -50, 50, canvas.height + 500); // left wall
    createPlatform(canvas.width, -50, 50, canvas.height + 100); // right wall

    //////////////////////////////////
    // ONLY CHANGE BELOW THIS POINT //
    //////////////////////////////////

    // TODO 1 - Enable the Grid
     //toggleGrid();


    // TODO 2 - Create Platforms
    createPlatform(500, 0, 20, 300, "black");
    createPlatform(30, 600, 160, 17, "black");
    createPlatform(250, 500, 200, 17, "black");
   createPlatform(200, 650, 160, 17, "black");
   createPlatform(500, 420, 320, 17, "black");
  createPlatform(800, 0,20, 320, "black");
  createPlatform(700, 300, 120, 17, "black");
  createPlatform(500, 250, 115, 17, "black");
  createPlatform(700, 180, 115, 17, "black");
  createPlatform(500, 125, 115, 17, "black");
  createPlatform(700, 80, 115, 17, "black");
  createPlatform(850, 500, 160, 17, "black");
  createPlatform(1099, 500, 155, 17, "black");
  createPlatform(1350, 400, 50, 50, "black");
    // TODO 3 - Create Collectables
    createCollectable("diamond", 750, 140, 0.5, 0.7);   
 createCollectable("diamond", 750, 240, 0.5, 0.7);
createCollectable("diamond", 550, 210, 0.5, 0.7);
    createCollectable("diamond", 550, 9, 0.5, 0.7);
    createCollectable("diamond", 1350, 9, 0.5, 0.7);
    // TODO 4 - Create Cannons
    createCannon("top", 700, 2000);
    createCannon("bottom", 100, 1000);
createCannon("bottom", 400, 1000);
createCannon("top", 1010, 1000);
createCannon("bottom", 1170, 1000);
    createCannon("top", 1440, 3000);
    //////////////////////////////////
    // ONLY CHANGE ABOVE THIS POINT //
    //////////////////////////////////
  }

  registerSetup(setup);
});
