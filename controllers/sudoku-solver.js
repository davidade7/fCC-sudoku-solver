class SudokuSolver {
  constructor() {
    this.actualPuzzle = "";
  }
  validate(puzzleString) {
    // If the puzzleString is not 81 characters long
    if (puzzleString.length !== 81) {
      return { error: 'Expected puzzle to be 81 characters long' };
    }
    // Regex for number and dot, and string should be 81 characters long    
    let regex = /^[0-9.]{81}$/;
    if (!regex.test(puzzleString)) {
      return { error: 'Invalid characters in puzzle' };
    } else {
      return true;
    }
  }

  checkRowPlacement(puzzleString, row, column, value) {
    let studiedRow = puzzleString.slice(row * 9, row * 9 + 9);
    
    // If the value is already in the cell
    if (studiedRow[column] === value) {
      return true;
    }

    // If value present in the row and the value is not in the cell
    if (studiedRow.includes(value) && studiedRow[column] !== value) {
      return false;
    } 

    // If the location is already filled
    else if (!studiedRow[column] === '.') {
      return false;
    }

    return true;
  }

  checkColPlacement(puzzleString, row, column, value) {
    let studiedCol = '';
    for (let i = 0; i < 9; i++) {
      studiedCol += puzzleString[i * 9 + column];
    }

    // If the value is already in the cell
    if (studiedCol[row] === value) {
      return true;
    } 

    // If value present in the column  and the value is not in the cell
    if (studiedCol.includes(value)  && studiedCol[row] !== value) {
      return false;
    } 

    // If the location is already filled
    else if (!studiedCol[row] === '.') {
      return false;
    }

    return true;
  }

  checkRegionPlacement(puzzleString, row, column, value) {
    let studiedRegion = '';
    
    // Determine the region
    let regionRow = Math.floor(row / 3);
    let regionCol = Math.floor(column / 3);

    // Determine the studiedRegion string
    for (let i = regionRow * 3; i < regionRow * 3 + 3; i++) {
      for (let j = regionCol * 3; j < regionCol * 3 + 3; j++) {
        studiedRegion += puzzleString[i * 9 + j];
      }
    }
    let cell = puzzleString[(row) * 9 + column ]
    // If the value is already in the cell
    if (cell === value) {
      return true;
    }

    // If value present in the region and the value is not in the cell
    if (studiedRegion.includes(value) && cell !== value) {
      return false;
    } 

    // If the location is already filled
    else if (!studiedRegion[(row % 3) * 3 + (column % 3)] === ".") {
      return false;
    }
    return true;
  }

  // Function to check if the string has unique values
  isUnique(str) {
    let set = new Set(str);
    return str.length === set.size;
  }

  solve(puzzleString) {
    // console.log(puzzleString)

    // Check puzzle validity
    if (this.validate(puzzleString) !== true) {
      console.log("puzzle not valid")
      return false;
    }

    // Check if puzzle stored in the actualPuzzle is the same as the puzzleString, if so, puzzle can not be solved
    if (puzzleString === this.actualPuzzle) {
      console.log("can't be solved")
      return false;
    }

    // Puzzle is not solved
    if (puzzleString.includes('.') === true) {
      // adding this puzzle to the actualPuzzle
      this.actualPuzzle = puzzleString;

      // Create a tempory array to store the possible values
      let temporarySol = []

      // loop through the puzzle
      for (let i = 0; i < 81; i++) {

        // If the iteration is not a dot, then add the value to the temporary array
        if (puzzleString[i] !== '.') {
          temporarySol.push(puzzleString[i]);
        } 
        // If the iteration is a dot, then add the possible values to the temporary array
        else {
          let possibleValues = [];
          // loop through the possible values
          for (let j = 1; j <= 9; j++) {
            // Check if the j value is valid in the location
            if (this.checkRowPlacement(puzzleString, Math.floor(i / 9), i % 9, j.toString()) &&
                this.checkColPlacement(puzzleString, Math.floor(i / 9), i % 9, j.toString()) &&
                this.checkRegionPlacement(puzzleString, Math.floor(i / 9), i % 9, j.toString())) {
                  possibleValues.push(j.toString())
            }
          }
          temporarySol.push(possibleValues);
        }
      }

      // loop through the temporary array and if we have only one possible value, then add it to the solvedPuzzle
      for (let k = 0; k < 81; k++) {
        if (temporarySol[k].length === 1) {
        temporarySol[k] = temporarySol[k][0];
        } else {
          temporarySol[k] = '.';
        }
      }
    
      // Now we have a new puzzle
      let newPuzzle = temporarySol.join("");
      return this.solve(newPuzzle)
    }

    // Puzzle is solved
    else {
      // Solved puzzle
      console.log("puzzle solved >>", puzzleString)
      
      // Checking if all rows are valid
      for (let i = 0; i < 9; i++) {
        if (!this.isUnique(puzzleString.substr(i * 9, 9))) {
          console.log("row not valid")
          return false;
        }
      }
      // Checking if all columns are valid
      for (let j = 0; j < 9; j++) {
        let column = '';
        for (let i = 0; i < 9; i++) {
          column += puzzleString[i * 9 + j];
        }
        if (!this.isUnique(column)) {
          console.log("column not valid")
          return false;
        };
      }
      // Checking if all regions are valid
      for (let bloc = 0; bloc < 9; bloc++) {
        let grille = '';
        for (let i = 0; i < 3; i++) {
          for (let j = 0; j < 3; j++) {
            grille += puzzleString[Math.floor(bloc / 3) * 27 + i * 9 + (bloc % 3) * 3 + j];
          }
        }
        if (!this.isUnique(grille)) {
          console.log("region not valid")
          return false;
        }
      }
      
      // The puzzle is valid, so we return the solved puzzle
      return puzzleString;
    }
  }
}

module.exports = SudokuSolver;