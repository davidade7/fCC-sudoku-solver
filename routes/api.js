'use strict';

const SudokuSolver = require('../controllers/sudoku-solver.js');

module.exports = function (app) {
  
  let solver = new SudokuSolver();

  app.route('/api/check')
    .post((req, res) => {
      // console.log(req.body)
      // let rowName = [A, B, C, D, E, F, G, H, I]
      // let row = rowName.indewOf(req.body.coordinate[0]);
      // let column = req.body.coordinate[1];

      // SudokuSolver.




      // { "valid": true }
      // { "valid": false, "conflict": [ "row", "column" ] }
      // { "valid": false, "conflict": [ "row", "region" ] }
      // { "error": "Expected puzzle to be 81 characters long" }
    });
    
  app.route('/api/solve')
    .post((req, res) => {

    });
};
