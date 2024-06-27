'use strict';

const SudokuSolver = require('../controllers/sudoku-solver.js');

module.exports = function (app) {
  
  let solver = new SudokuSolver();

  app.route('/api/check')
    .post((req, res) => {
      console.log(req.body)
      

      let validatePuzzle = solver.validate(req.body.puzzle)
      
      // If the puzzle is not valid
      if (validatePuzzle !== true) {
        return res.json(solver.validate(req.body.puzzle))
      } 
      
      else {
        let rowName = ["A", "B", "C", "D", "E", "F", "G", "H", "I"]
        let row = rowName.indexOf(req.body.coordinate[0]);
        let column = req.body.coordinate[1] - 1;
        let conflit = [];

        if (!solver.checkRowPlacement(req.body.puzzle, row, column, req.body.value)) {
          conflit.push("row")
        }
        if (!solver.checkColPlacement(req.body.puzzle, row, column, req.body.value)) {
          conflit.push("column")
        }
        if (!solver.checkRegionPlacement(req.body.puzzle, row, column, req.body.value)) {
          conflit.push("region")
        }

        if (conflit.length === 0) {
          return res.json({ valid: true })
        } else {
          return res.json({ valid: false, conflict: conflit })
        }
      }
    });
    
  app.route('/api/solve')
    .post((req, res) => {

    });
};
