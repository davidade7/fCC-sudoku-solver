class SudokuSolver {

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

    let cell = puzzleString[(column - 1) * 9 + row - 1 ]
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

  solve(puzzleString) {
    let solvedPuzzle = [...puzzleString];
    let solved = false;
 
    for (let i = 0; i < 81; i++) {
      // Create a tempory array to store the possible values
      let temporarySol = []

      // If the iteration is not a dot, then add the value to the temporary array
      if (solvedPuzzle[i] !== '.') {
        temporarySol[i] = solvedPuzzle[i];
      } 
      // If the iteration is a dot, then add the possible values to the temporary array
      else {
        // loop through the possible values
        for (let j = 1; j <= 9; j++) {
          // Check if the j value is valid in the location
          if (this.checkRowPlacement(solvedPuzzle, Math.floor(i / 9), i % 9, j.toString()) &&
              this.checkColPlacement(solvedPuzzle, Math.floor(i / 9), i % 9, j.toString()) &&
              this.checkRegionPlacement(solvedPuzzle, Math.floor(i / 9), i % 9, j.toString())) {
            temporarySol[i].push(j.toString());
          }
        }
      }
    }


    // for (let k = 0; k < 81; k++) {
    //   if (temporarySol[k].length === 1) {
    //    temporarySol[k] = temporarySol[k][0];
    //   } else {
    //     temporarySol[k] = '.';
    //   }
    // }
   
    console.log(temporarySol)

  }
}

module.exports = SudokuSolver;

