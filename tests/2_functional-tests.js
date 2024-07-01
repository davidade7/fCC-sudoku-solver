const chai = require("chai");
const chaiHttp = require('chai-http');
const assert = chai.assert;
const server = require('../server');

chai.use(chaiHttp);

suite('Functional Tests', () => {
  test('Test 2-1 : Solve a puzzle with valid puzzle string: POST request to /api/solve', function(done) {
    // Setup
    let validPuzzle = { puzzle: '1.5..2.84..63.12.7.2..5.....9..1....8.2.3674.3.7.2..9.47...8..1..16....926914.37.' }
    // Test
    chai.request(server)
      .keepOpen()
      .post('/api/solve')
      .send(validPuzzle)
      .end(function (err, res) {
        assert.equal(res.status, 200);
        assert.property(res.body, 'solution');
        done();
      })
  });
  test('Test 2-2 : Solve a puzzle with missing puzzle string: POST request to /api/solve', function(done) {
    // Setup
    let noPuzzle = {}
    // Test
    chai.request(server)
      .keepOpen()
      .post('/api/solve')
      .send(noPuzzle)
      .end(function (err, res) {
        assert.equal(res.status, 200);
        assert.equal(res.body.error, "Required field missing");
        done();
      })
  });
  test('Test 2-3 : Solve a puzzle with invalid characters: POST request to /api/solve', function(done) {
    // Setup
    let invalidPuzzle = { puzzle: '1x5..2.84..63.12.7.2..5.....9..1....8.2.3674.3.7.2..9.47...8..1..16....926914.37.' }
    // Test
    chai.request(server)
      .keepOpen()
      .post('/api/solve')
      .send(invalidPuzzle)
      .end(function (err, res) {
        assert.equal(res.status, 200);
        assert.equal(res.body.error, "Invalid characters in puzzle");
        done();
      })
  });
  test('Test 2-4 : Solve a puzzle with incorrect length: POST request to /api/solve', function(done) {
    // Setup
    let invalidPuzzle = { puzzle: '15..2.84..63.12.7.2..5.....9..1....8.2.3674.3.7.2..9.47...8..1..16....926914.37.' }
    // Test
    chai.request(server)
      .keepOpen()
      .post('/api/solve')
      .send(invalidPuzzle)
      .end(function (err, res) {
        assert.equal(res.status, 200);
        assert.equal(res.body.error, "Expected puzzle to be 81 characters long");
        done();
      })
  });
  test('Test 2-5 : Solve a puzzle that cannot be solved: POST request to /api/solve', function(done) {
    // Setup
    let invalidPuzzle = { puzzle: '1.5..2.8...63.12.7.2..5.....9..1....8.2.3674.3.7.2..9..7...8..1..16....926914.37.' }
    // Test
    chai.request(server)
      .keepOpen()
      .post('/api/solve')
      .send(invalidPuzzle)
      .end(function (err, res) {
        assert.equal(res.status, 200);
        assert.equal(res.body.error, "Puzzle cannot be solved");
        done();
      })
  });
  test('Test 2-6 : Check a puzzle placement with all fields: POST request to /api/check', function(done) {
    // Setup
    let input = { puzzle: '1.5..2.8...63.12.7.2..5.....9..1....8.2.3674.3.7.2..9..7...8..1..16....926914.37.', coordinate: 'A2', value: 3 }
    // Test
    chai.request(server)
      .keepOpen()
      .post('/api/check')
      .send(input)
      .end(function (err, res) {
        assert.equal(res.status, 200);
        assert.equal(res.body.valid, true);
        done();
      })
  });
  test('Test 2-7 : Check a puzzle placement with single placement conflict: POST request to /api/check', function(done) {
    // Setup
    let input = { puzzle: '1.5..2.8...63.12.7.2..5.....9..1....8.2.3674.3.7.2..9..7...8..1..16....926914.37.', coordinate: 'A2', value: 8 }
    // Test
    chai.request(server)
      .keepOpen()
      .post('/api/check')
      .send(input)
      .end(function (err, res) {
        assert.equal(res.status, 200);
        assert.equal(res.body.valid, false);
        assert.property(res.body, "conflict");
        assert.lengthOf(res.body.conflict, 1);
        done();
      })
  });
  test('Test 2-8 : Check a puzzle placement with multiple placement conflicts: POST request to /api/check', function(done) {
    // Setup
    let input = { puzzle: '1.5..2.8...63.12.7.2..5.....9..1....8.2.3674.3.7.2..9..7...8..1..16....926914.37.', coordinate: 'E2', value: 6 }
    // Test
    chai.request(server)
      .keepOpen()
      .post('/api/check')
      .send(input)
      .end(function (err, res) {
        assert.equal(res.status, 200);
        assert.equal(res.body.valid, false);
        assert.property(res.body, "conflict");
        assert.lengthOf(res.body.conflict, 2);
        done();
      })
  });
  test('Test 2-9 : Check a puzzle placement with all placement conflicts: POST request to /api/check', function(done) {
    // Setup
    let input = { puzzle: '1.5..2.8...63.12.7.2..5.....9..1....8.2.3674.3.7.2..9..7...8..1..16....926914.37.', coordinate: 'A5', value: 5 }
    // Test
    chai.request(server)
      .keepOpen()
      .post('/api/check')
      .send(input)
      .end(function (err, res) {
        assert.equal(res.status, 200);
        assert.equal(res.body.valid, false);
        assert.property(res.body, "conflict");
        assert.lengthOf(res.body.conflict, 3);
        done();
      })
  });
  test('Test 2-10 : Check a puzzle placement with missing required fields: POST request to /api/check', function(done) {
    // Setup
    let input = { puzzle: '1.5..2.8...63.12.7.2..5.....9..1....8.2.3674.3.7.2..9..7...8..1..16....926914.37.', coordinate: 'A5' }
    // Test
    chai.request(server)
      .keepOpen()
      .post('/api/check')
      .send(input)
      .end(function (err, res) {
        assert.equal(res.status, 200);
        assert.equal(res.body.error, "Required field(s) missing");
        done();
      })
  });
  test('Test 2-11 : Check a puzzle placement with invalid characters: POST request to /api/check', function(done) {
    // Setup
    let input = { puzzle: '1x5..2.8...63.12.7.2..5.....9..1....8.2.3674.3.7.2..9..7...8..1..16....926914.37.', coordinate: 'A5', value: 5 }
    // Test
    chai.request(server)
      .keepOpen()
      .post('/api/check')
      .send(input)
      .end(function (err, res) {
        assert.equal(res.status, 200);
        assert.equal(res.body.error, "Invalid characters in puzzle");
        done();
      })
  });
  test('Test 2-12 : Check a puzzle placement with incorrect length: POST request to /api/check', function(done) {
    // Setup
    let input = { puzzle: '15..2.8...63.12.7.2..5.....9..1....8.2.3674.3.7.2..9..7...8..1..16....926914.37.', coordinate: 'A5', value: 5 }
    // Test
    chai.request(server)
      .keepOpen()
      .post('/api/check')
      .send(input)
      .end(function (err, res) {
        assert.equal(res.status, 200);
        assert.equal(res.body.error, "Expected puzzle to be 81 characters long");
        done();
      })
  });
  test('Test 2-13 : Check a puzzle placement with invalid placement coordinate: POST request to /api/check', function(done) {
    // Setup
    let input = { puzzle: '1.5..2.8...63.12.7.2..5.....9..1....8.2.3674.3.7.2..9..7...8..1..16....926914.37.', coordinate: 'K5', value: 5 }
    // Test
    chai.request(server)
      .keepOpen()
      .post('/api/check')
      .send(input)
      .end(function (err, res) {
        assert.equal(res.status, 200);
        assert.equal(res.body.error, "Invalid coordinate");
        done();
      })
  });
  test('Test 2-14 : Check a puzzle placement with invalid placement value: POST request to /api/check', function(done) {
    // Setup
    let input = { puzzle: '1.5..2.8...63.12.7.2..5.....9..1....8.2.3674.3.7.2..9..7...8..1..16....926914.37.', coordinate: 'A5', value: 11 }
    // Test
    chai.request(server)
      .keepOpen()
      .post('/api/check')
      .send(input)
      .end(function (err, res) {
        assert.equal(res.status, 200);
        assert.equal(res.body.error, "Invalid value");
        done();
      })
  });



});

