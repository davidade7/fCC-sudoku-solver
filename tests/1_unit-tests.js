const chai = require('chai');
const assert = chai.assert;

const SudokuSolver = require('../controllers/sudoku-solver.js');
let solver = new SudokuSolver();;

suite('Unit Tests', () => {
  test("Test 1-1 : Logic handles a valid puzzle string of 81 characters", function() {
    let validPuzzle = '1.5..2.84..63.12.7.2..5.....9..1....8.2.3674.3.7.2..9.47...8..1..16....926914.37.'
    assert.equal(solver.validate(validPuzzle), true);
  }), 
  test("Test 1-2 : Logic handles a puzzle string with invalid characters (not 1-9 or .)", function() {
    let notValidPuzzle = '1x5xx2.84..63.12.7.2..5.....9..1....8.2.3674.3.7.2..9.47...8..1..16....926914.37.'
    assert.deepEqual(solver.validate(notValidPuzzle), { "error": "Invalid characters in puzzle" });
  }), 
  test("Test 1-3 : Logic handles a puzzle string that is not 81 characters in length", function() {
    let notValidPuzzle = '12.84..63.12.7.2..5.....9..1....8.2.3674.3.7.2..9.47...8..1..16....926914.37.'
    assert.deepEqual(solver.validate(notValidPuzzle), { error: 'Expected puzzle to be 81 characters long' });
  }), 
  test("Test 1-4 : Logic handles a valid row placement", function() {
    let puzzle = '1.5..2.84..63.12.7.2..5.....9..1....8.2.3674.3.7.2..9.47...8..1..16....926914.37.'
    let row = 0;
    let column = 1;
    let value = 3;
    assert.equal(solver.checkRowPlacement(puzzle, row, column, value), true);
  }), 
  test("Test 1-5 : Logic handles an invalid row placement", function() {
    let puzzle = '1.5..2.84..63.12.7.2..5.....9..1....8.2.3674.3.7.2..9.47...8..1..16....926914.37.'
    let row = 0;
    let column = 1;
    let value = 5;
    assert.equal(solver.checkRowPlacement(puzzle, row, column, value), false);
  }), 
  test("Test 1-6 : Logic handles a valid column placement", function() {
    let puzzle = '1.5..2.84..63.12.7.2..5.....9..1....8.2.3674.3.7.2..9.47...8..1..16....926914.37.'
    let row = 0;
    let column = 1;
    let value = 3;
    assert.equal(solver.checkColPlacement(puzzle, row, column, value), true);
  }), 
  test("Test 1-7 : Logic handles an invalid column placement", function() {
    let puzzle = '1.5..2.84..63.12.7.2..5.....9..1....8.2.3674.3.7.2..9.47...8..1..16....926914.37.'
    let row = 0;
    let column = 1;
    let value = 2;
    assert.equal(solver.checkColPlacement(puzzle, row, column, value), false);
  }), 
  test("Test 1-8 : Logic handles a valid region (3x3 grid) placement", function() {
    let puzzle = '1.5..2.84..63.12.7.2..5.....9..1....8.2.3674.3.7.2..9.47...8..1..16....926914.37.'
    let row = 0;
    let column = 1;
    let value = 3;
    assert.equal(solver.checkRegionPlacement(puzzle, row, column, value), true);
  }), 
  test("Test 1-9 : Logic handles an invalid region (3x3 grid) placement", function() {
    let puzzle = '1.5..2.84..63.12.7.2..5.....9..1....8.2.3674.3.7.2..9.47...8..1..16....926914.37.'
    let row = 0;
    let column = 1;
    let value = 6;
    assert.equal(solver.checkRegionPlacement(puzzle, row, column, value), false);
  }), 
  test("Test 1-10 : Valid puzzle strings pass the solver", function() {
    let puzzle = '1.5..2.84..63.12.7.2..5.....9..1....8.2.3674.3.7.2..9.47...8..1..16....926914.37.'
    assert.equal(solver.solve(puzzle), '135762984946381257728459613694517832812936745357824196473298561581673429269145378');
  }), 
  test("Test 1-11 : Invalid puzzle strings fail the solver", function() {
    let invalidPuzzle = '1x5..2.84..63.12.7.2..5.....9..1....8.2.3674.3.7.2..9.47...8..1..16....926914.37.'
    assert.equal(solver.solve(invalidPuzzle), false);
  }), 
  test("Test 1-12 : Solver returns the expected solution for an incomplete puzzle", function() {
    let puzzle = '1.5..2.84..63.12.7.2..5.....9..1....8.2.3674.3.7.2..9.47...8..1..16....926914.37.'
    assert.equal(solver.solve(puzzle), '135762984946381257728459613694517832812936745357824196473298561581673429269145378');
  })
});
