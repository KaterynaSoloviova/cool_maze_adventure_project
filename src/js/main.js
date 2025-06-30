class Maze {
    constructor(grid) {
        this.grid = grid;
        this.fishCounter = 0;
    }

    displayMaze() {
        const container = document.getElementById("maze");
        this.grid.forEach((row, i) => {
            row.forEach((element, j) => {
                const divelement = document.createElement("div");
                if (element === 0 || element === 2) {
                    divelement.setAttribute("class", "o")
                    if (element === 2) {
                        const fish = document.createElement("img");
                        fish.setAttribute("class", "fish");
                        fish.setAttribute("src", "fish.png");
                        fish.setAttribute("alt", "fish");
                        fish.setAttribute("id", `fish${i}_${j}`);
                        divelement.appendChild(fish)
                    }
                } else {
                    divelement.setAttribute("class", "x")
                }
                container.appendChild(divelement)
            })
        })
    }

    isFree(row, col) {
        return this.grid[row][col] === 0 || this.grid[row][col] === 2;
    }

    isFishThere(row, col){
        return this.grid[row][col] === 2
    }

    eatFish(row, col){
        this.grid[row][col] = 0;
        const fish = document.getElementById(`fish${row}_${col}`);
        fish.classList.add("hidden");
        this.fishCounter ++;
        const fishScore = document.getElementById("result");
        fishScore.textContent = this.fishCounter;
    }


}


class Penguin {
    constructor(row, col) {
        this.width = 50;
        this.height = 50;
        this.row = row;
        this.col = col;
        this.updatedUI();
    }

    updatedUI() {
        const penguinElm = document.getElementById("penguin");
        const positionX = this.col * this.width;
        const positionY = 11 * this.height - this.row * this.height;

        penguinElm.style.left = positionX + "px";
        penguinElm.style.bottom = positionY + "px";
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


const penguin = new Penguin(1, 1);
const maze = new Maze([
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 0, 0, 0, 1, 0, 0, 0, 0, 2, 0, 0, 1, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 1],
    [1, 0, 1, 0, 1, 0, 1, 1, 1, 1, 1, 0, 1, 0, 1, 1, 1, 0, 1, 1, 1, 1, 0, 1],
    [1, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 2, 1, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 1],
    [1, 0, 1, 1, 1, 1, 1, 0, 1, 0, 1, 0, 1, 1, 1, 0, 1, 1, 1, 1, 0, 1, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 1, 0, 1],
    [1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 1, 0, 1, 0, 1],
    [1, 0, 1, 0, 0, 0, 2, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 1],
    [1, 0, 1, 0, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1],
    [1, 2, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 1, 1, 0, 1, 0, 1, 1, 1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 0, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
]);

maze.displayMaze()


document.addEventListener("keydown", (e) => {
    if (e.code === "ArrowLeft") {
        if (maze.isFree(penguin.row, penguin.col - 1)) {
            penguin.moveLeft();
            if (maze.isFishThere(penguin.row, penguin.col)){
                maze.eatFish(penguin.row, penguin.col);
            }  
        }
    } else if (e.code === "ArrowRight") {
        if (maze.isFree(penguin.row, penguin.col + 1)) {
            penguin.moveRight();
            if (maze.isFishThere(penguin.row, penguin.col)){
                maze.eatFish(penguin.row, penguin.col);
            }      
        }
    } else if (e.code === "ArrowUp") {
        if (maze.isFree(penguin.row - 1, penguin.col)) {
            penguin.moveUp();
            if (maze.isFishThere(penguin.row, penguin.col)){
                maze.eatFish(penguin.row, penguin.col);
            }  
        }
    } else if (e.code === "ArrowDown") {
        if (maze.isFree(penguin.row + 1, penguin.col)) {
            penguin.moveDown();
            if (maze.isFishThere(penguin.row, penguin.col)){
                maze.eatFish(penguin.row, penguin.col);
            }  
        }
    }
})


