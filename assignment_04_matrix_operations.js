// =============================================================================
// PROGRAMMING FUNDAMENTALS — Assignment 4
// =============================================================================
//
// TASK: Matrix Operations
//
// Write a JavaScript program that performs three operations on matrices
// (2D arrays), each implemented in its own function.
//
// In JavaScript, a matrix is represented as an array of arrays:
//   let matrix = [[1, 2, 3], [4, 5, 6]];   // 2 rows, 3 columns
//
// -----------------------------------------------------------------------------
// HOW TO RUN THIS PROGRAM
// -----------------------------------------------------------------------------
// 1. Install the input library (only once):  npm install readline-sync
// 2. Run the program:                        node assignment_04_matrix_operations.js
//
// -----------------------------------------------------------------------------
// PART A — Transpose a Matrix
// -----------------------------------------------------------------------------
// - Read an M x N matrix from the user.
// - Compute and display its transpose (rows become columns, columns become rows).
//
// Example (2 x 3 input):
//
//   Original Matrix:      Transposed Matrix:
//   1  2  3               1  4
//   4  5  6               2  5
//                         3  6
//
// -----------------------------------------------------------------------------
// PART B — Add Two Matrices
// -----------------------------------------------------------------------------
// - Read two matrices of exactly the same size (M x N).
// - Compute their element-wise sum and display the result.
//
// -----------------------------------------------------------------------------
// PART C — Multiply Two Matrices
// -----------------------------------------------------------------------------
// - Read matrix A of size M x N and matrix B of size N x P.
//   (Number of COLUMNS in A must equal number of ROWS in B.)
// - Compute and display the matrix product A x B (result is M x P).
//
// -----------------------------------------------------------------------------
// EXPECTED INPUT FORMAT
// -----------------------------------------------------------------------------
// When entering a row, the user types all values on one line separated by spaces:
//
//   Enter number of rows: 2
//   Enter number of columns: 3
//   Enter row 1: 1 2 3
//   Enter row 2: 4 5 6
//
// Hint: Use row.split(' ').map(Number) to convert a line of text into an array
// of numbers.
//
// -----------------------------------------------------------------------------
// REQUIREMENTS
// -----------------------------------------------------------------------------
// - Use nested loops for all operations (no external libraries).
// - Each operation must be in its own function (see scaffold below).
// - Display each matrix in a neat, aligned grid format.
// - Tip: Complete Part A first, then Parts B and C.
//

// =============================================================================
// YOUR CODE BELOW — remove the // symbols from the scaffold and fill it in
// =============================================================================

const readlineSync = require('readline-sync');

function readMatrix(rows, columns, name) {
    const matrix = [];
    console.log('\nEnter values for Matrix ' + name + ':');

    for (let i = 0; i < rows; i++) {
        let row;

        while (true) {
            row = readlineSync.question('Enter row ' + (i + 1) + ': ').trim().split(/\s+/).map(Number);

            if (row.length === columns) {
                let valid = true;
                for (let j = 0; j < row.length; j++) {
                    if (Number.isNaN(row[j])) {
                        valid = false;
                    }
                }

                if (valid) {
                    break;
                }
            }

            console.log('Error: Please enter exactly ' + columns + ' valid numbers.');
        }

        matrix.push(row);
    }

    return matrix;
}

function transposeMatrix(matrix) {
    const result = [];

    for (let column = 0; column < matrix[0].length; column++) {
        const row = [];

        for (let i = 0; i < matrix.length; i++) {
            row.push(matrix[i][column]);
        }

        result.push(row);
    }

    return result;
}

function addMatrices(matrixA, matrixB) {
    const result = [];

    for (let i = 0; i < matrixA.length; i++) {
        const row = [];

        for (let j = 0; j < matrixA[i].length; j++) {
            row.push(matrixA[i][j] + matrixB[i][j]);
        }

        result.push(row);
    }

    return result;
}

function multiplyMatrices(matrixA, matrixB) {
    const result = [];

    for (let i = 0; i < matrixA.length; i++) {
        const row = [];

        for (let j = 0; j < matrixB[0].length; j++) {
            let sum = 0;

            for (let k = 0; k < matrixB.length; k++) {
                sum += matrixA[i][k] * matrixB[k][j];
            }

            row.push(sum);
        }

        result.push(row);
    }

    return result;
}

function displayMatrix(matrix) {
    for (let i = 0; i < matrix.length; i++) {
        let line = '';

        for (let j = 0; j < matrix[i].length; j++) {
            line += String(matrix[i][j]).padStart(8, ' ');
        }

        console.log(line);
    }
}

function main() {
    console.log('PART A - TRANSPOSE A MATRIX');
    const rowsA = readlineSync.questionInt('Enter number of rows: ');
    const columnsA = readlineSync.questionInt('Enter number of columns: ');

    if (rowsA <= 0 || columnsA <= 0) {
        console.log('Error: Matrix dimensions must be positive integers.');
        return;
    }

    const matrix = readMatrix(rowsA, columnsA, 'A');
    console.log('\nOriginal Matrix:');
    displayMatrix(matrix);
    console.log('\nTransposed Matrix:');
    displayMatrix(transposeMatrix(matrix));

    console.log('\nPART B - ADD TWO MATRICES');
    const addRows = readlineSync.questionInt('Enter number of rows: ');
    const addColumns = readlineSync.questionInt('Enter number of columns: ');

    if (addRows <= 0 || addColumns <= 0) {
        console.log('Error: Matrix dimensions must be positive integers.');
        return;
    }

    const addA = readMatrix(addRows, addColumns, 'A');
    const addB = readMatrix(addRows, addColumns, 'B');
    console.log('\nSum of Matrices:');
    displayMatrix(addMatrices(addA, addB));

    console.log('\nPART C - MULTIPLY TWO MATRICES');
    const multiplyRowsA = readlineSync.questionInt('Enter rows of Matrix A: ');
    const multiplyColumnsA = readlineSync.questionInt('Enter columns of Matrix A: ');
    const multiplyColumnsB = readlineSync.questionInt('Enter columns of Matrix B: ');

    if (multiplyRowsA <= 0 || multiplyColumnsA <= 0 || multiplyColumnsB <= 0) {
        console.log('Error: Matrix dimensions must be positive integers.');
        return;
    }

    const multiplyA = readMatrix(multiplyRowsA, multiplyColumnsA, 'A');
    const multiplyB = readMatrix(multiplyColumnsA, multiplyColumnsB, 'B');
    console.log('\nProduct of Matrices:');
    displayMatrix(multiplyMatrices(multiplyA, multiplyB));
}

main();
