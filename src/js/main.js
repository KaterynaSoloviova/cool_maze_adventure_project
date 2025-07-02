class Maze {
    constructor(grid, timeRemaining, startX, startY) {
        this.grid = grid;
        this.fishCounter = 0;
        this.timeRemaining = timeRemaining;
        this.penguin = new Penguin(startX, startY);
        this.startX = startX;
        this.startY = startY;
    }

    displayMaze() {
        const container = document.getElementById("maze");
        this.grid.forEach((row, i) => {
            row.forEach((element, j) => {
                const divelement = document.createElement("div");
                if (element === 0 || element === 2 || element === 3 || element === 4 || element === 5) {
                    divelement.setAttribute("class", "o")
                    if (element === 2) {
                        const fish = document.createElement("img");
                        fish.setAttribute("class", "fish");
                        fish.setAttribute("src", "assets/fish.png");
                        fish.setAttribute("alt", "fish");
                        fish.setAttribute("id", `fish${i}_${j}`);
                        divelement.appendChild(fish)
                    } else if (element === 3) {
                        divelement.classList.add("finish")
                    } else if (element === 4) {
                        const iceTrap = document.createElement("img");
                        iceTrap.setAttribute("class", "iceTrap");
                        iceTrap.setAttribute("src", "assets/ice_trap.png");
                        iceTrap.setAttribute("alt", "ice hole");
                        iceTrap.setAttribute("id", `iceTrap${i}_${j}`);
                        iceTrap.classList.add("hidden")
                        divelement.appendChild(iceTrap)
                    } else if (element === 5) {
                        const bear = document.createElement("img");
                        bear.setAttribute("class", "bear");
                        bear.setAttribute("src", "assets/bear.png");
                        bear.setAttribute("alt", "bear");
                        bear.setAttribute("id", `bear${i}_${j}`);
                        bear.classList.add("hidden")
                        divelement.appendChild(bear)
                    }
                } else {
                    divelement.setAttribute("class", "x")
                }
                container.appendChild(divelement)
            })

        })
    }

    isFree(row, col) {
        return this.grid[row][col] === 0 || this.grid[row][col] === 2 || this.grid[row][col] === 3 || this.grid[row][col] === 4 || this.grid[row][col] === 5;
    }

    isFishThere(row, col) {
        return this.grid[row][col] === 2
    }

    eatFish(row, col) {
        this.grid[row][col] = 0;
        const fish = document.getElementById(`fish${row}_${col}`);
        fish.classList.add("hidden");
        this.fishCounter++;
        const fishScore = document.getElementById("result");
        fishScore.textContent = this.fishCounter;

        const eatFishSound = document.getElementById("fishEatSound");
        eatFishSound.currentTime = 0;
        eatFishSound.play();

        const yummy = document.getElementById("yummy");
        yummy.currentTime = 0;
        yummy.play();
    }

    fallIceTrap(row, col) {
        const iceTrap = document.getElementById(`iceTrap${row}_${col}`);
        iceTrap.classList.remove("hidden");




    }

    calculateFinalScore() {
        const fishPoints = 50;
        const timeBonus = 5;

        const fishFinalAmount = this.fishCounter * fishPoints;
        const timeLeftAmount = this.timeRemaining * timeBonus;

        return fishFinalAmount + timeLeftAmount;
    }

    checkWin(row, col) {
        if (this.grid[row][col] === 3 && this.timeRemaining > 0) {
            document.getElementById("congratsMessage").style.display = "block";
            clearInterval(timer);
            showFinalScore();
            return true;
        }
        return false
    }

    checkCurrentPosition(row, col) {
        if (this.isFishThere(row, col)) {
            this.eatFish(row, col);
        }
        if (this.grid[row][col] === 4) {
            const iceTrap = document.getElementById(`iceTrap${row}_${col}`);
            iceTrap.classList.remove("hidden");
            document.getElementById("fallIceTrapMessage").style.display = "block";

            const iceSound = document.getElementById("iceTrapSound");
            iceSound.currentTime = 0;
            iceSound.play();

            const oops = document.getElementById("oops");
            oops.currentTime = 0;
            oops.play();

            this.penguin.move(this.startX, this.startY);
        }
        if (this.grid[row][col] === 5) {
            const bear = document.getElementById(`bear${row}_${col}`);
            bear.classList.remove("hidden");
            document.getElementById("meetBearMessage").style.display = "block";

            const bearSound = document.getElementById("bearSound");
            bearSound.currentTime = 0;
            bearSound.play();

            const ohNo = document.getElementById("ohNo");
            ohNo.currentTime = 0;
            ohNo.play();

            this.penguin.move(this.startX, this.startY);
            clearInterval(timer);
        }
        this.checkWin(row, col)
    }
}

class Penguin {
    constructor(row, col) {
        this.width = 25;
        this.height = 25;
        this.row = row;
        this.col = col;
        this.updatedUI();
    }

    updatedUI() {
        const penguinElm = document.getElementById("penguin");
        const positionX = this.col * this.width;
        const positionY = 20 * this.height - this.row * this.height;

        penguinElm.style.left = positionX + "px";
        penguinElm.style.bottom = positionY + "px";
    }

    move(row, col) {
        this.row = row;
        this.col = col;
        this.updatedUI();
    }
    moveLeft() {
        this.col -= 1;
        this.updatedUI();
    }

    moveRight() {
        this.col += 1;
        this.updatedUI();
    }

    moveUp() {
        this.row -= 1;
        this.updatedUI();
    }

    moveDown() {
        this.row += 1;
        this.updatedUI();
    }

}


//const penguin = new Penguin(1, 1);
const maze = new Maze([
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 2, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 1, 1, 1, 1, 0, 1, 0, 1, 1, 1, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 0, 0, 1, 1, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 1, 0, 1, 0, 1, 0, 1, 0, 1, 1, 1, 1, 1, 0, 1, 0, 1, 0, 1],
    [1, 0, 1, 2, 0, 1, 0, 1, 0, 0, 0, 0, 1, 0, 1, 0, 1, 0, 0, 0, 1, 2, 1, 0, 0, 0, 1, 0, 1, 2, 1, 0, 0, 0, 1, 0, 1, 0, 0, 1, 0, 1, 0, 1, 0, 0, 0, 0, 2, 0, 0, 1, 0, 1, 0, 1],
    [1, 0, 1, 1, 0, 1, 0, 1, 1, 1, 1, 0, 1, 0, 1, 0, 1, 1, 1, 0, 1, 0, 1, 1, 1, 0, 1, 0, 1, 1, 1, 0, 1, 0, 1, 0, 1, 1, 0, 1, 0, 1, 0, 1, 1, 1, 1, 0, 1, 0, 1, 1, 0, 1, 0, 1],
    [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 1, 0, 1],
    [1, 0, 1, 1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1, 0, 1, 1, 0, 1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 0, 1, 0, 1, 1, 0, 1],
    [1, 0, 4, 1, 0, 0, 0, 0, 1, 0, 0, 0, 1, 2, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 1],
    [1, 5, 1, 1, 1, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1, 1, 0, 1, 0, 1, 1, 1, 1, 0, 1],
    [1, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 2, 0, 0, 1, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 1],
    [1, 0, 1, 0, 1, 0, 1, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 0, 1, 0, 1, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1, 0, 1, 0, 2, 1, 0, 1, 0, 1, 1, 0, 1, 0, 1, 0, 1, 1, 0, 1, 0, 1],
    [1, 3, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 2, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 2, 1, 0, 0, 0, 1, 0, 0, 1, 0, 1],
    [1, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 0, 1, 0, 1, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1, 1, 0, 1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 0, 1, 1, 0, 1, 0, 1],
    [1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 1, 0, 1],
    [1, 0, 1, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1, 1, 0, 1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 0, 1, 0, 1, 1, 0, 1],
    [1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 1, 2, 1, 0, 0, 1, 0, 1],
    [1, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1, 0, 1, 1, 0, 1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1, 1, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 2, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 2, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1],
    [1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 2, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
], 120, 1, 1);

maze.displayMaze()

let timer;
function timerHandler() {
    maze.timeRemaining--;
    if (maze.timeRemaining > 0) {
        const minutes = Math.floor(maze.timeRemaining / 60).toString().padStart(2, "0");
        const seconds = (maze.timeRemaining % 60).toString().padStart(2, "0");
        const timeRemainingContainer = document.getElementById("timeRemaining");
        timeRemainingContainer.innerText = `${minutes}:${seconds}`;
    } else {
        document.getElementById("gameOverMessage").style.display = "block";
        clearInterval(timer);
    }
}

function startTimer() {
    if (timer === undefined) {
        timer = setInterval(timerHandler, 1000);
    }

}

function showFinalScore() {
    const score = maze.calculateFinalScore();
    const finalScoreElement = document.getElementById("finalScore");
    finalScoreElement.style.display = "block";

    if (score >= 1000) {
        finalScoreElement.innerText = `Waddle on, champ! 🐧 Your final score is ${score}. You're the Emperor of the Ice! 🏆❄️`;
    } else if (score >= 700) {
        finalScoreElement.innerText = `Solid flippers! 🐧 You scored ${score}. A true Arctic Adventurer! 🌨️✨`;
    } else {
        finalScoreElement.innerText = `Your final score is ${score}. Don't slip up — brave hatchlings grow into legends! 🐣❄️ Try again!`;
    }
}


document.addEventListener("keydown", (e) => {
    if (e.code === "ArrowLeft") {
        startTimer()
        if (maze.isFree(maze.penguin.row, maze.penguin.col - 1)) {
            maze.penguin.moveLeft();
            maze.checkCurrentPosition(maze.penguin.row, maze.penguin.col)
        }
    } else if (e.code === "ArrowRight") {
        startTimer()
        if (maze.isFree(maze.penguin.row, maze.penguin.col + 1)) {
            maze.penguin.moveRight();
            maze.checkCurrentPosition(maze.penguin.row, maze.penguin.col)
        }
    } else if (e.code === "ArrowUp") {
        startTimer()
        if (maze.isFree(maze.penguin.row - 1, maze.penguin.col)) {
            maze.penguin.moveUp();
            maze.checkCurrentPosition(maze.penguin.row, maze.penguin.col)
        }
    } else if (e.code === "ArrowDown") {
        startTimer()
        if (maze.isFree(maze.penguin.row + 1, maze.penguin.col)) {
            maze.penguin.moveDown();
            maze.checkCurrentPosition(maze.penguin.row, maze.penguin.col)
        }
    }
})













