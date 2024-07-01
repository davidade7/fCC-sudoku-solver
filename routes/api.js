'use strict';

const SudokuSolver = require('../controllers/sudoku-solver.js');

module.exports = function (app) {
  
  let solver = new SudokuSolver();

  app.route('/api/check')
    .post((req, res) => {
      // If there is no puzzle, coordinate or value
      if (!req.body.puzzle || !req.body.coordinate || !req.body.value) {
        return res.json({ error: 'Required field(s) missing' })
      }

      let validatePuzzle = solver.validate(req.body.puzzle)
      
      // If the puzzle is not valid from validate method
      if (validatePuzzle !== true) {
        return res.json(solver.validate(req.body.puzzle))
      } 
      // If the value is not between 1 and 9
      else if (!/^[1-9]$/.test(req.body.value)) {
        return res.json({ error: 'Invalid value' })
      } 
      // If coordinate is not valid
      else if (!/^[A-I][1-9]$/.test(req.body.coordinate)) {
        return res.json({ error: 'Invalid coordinate' })
      }
      // if input are valids
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
      const puzzleToSolve = req.body.puzzle;
      
      // If there is no puzzle
      if (!puzzleToSolve) {
        return res.json({ error: 'Required field missing' })
      }

      // If the puzzle is not valid
      if (solver.validate(req.body.puzzle) !== true) {
        return res.json(solver.validate(req.body.puzzle))
      } 

      // response from solve method
      let returnedMessage = solver.solve(puzzleToSolve)

      console.log('receive from solver >>', returnedMessage)
      
      // If the puzzle cannot be solved
      if (!returnedMessage) {
        res.json({ error: 'Puzzle cannot be solved' })
      } 
      // If the puzzle is solved
      else {
        res.json({ solution: returnedMessage })
      }
    });
};
