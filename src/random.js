// Global variable

let matrix = [];
let bufferLength;
let sequences = [];
let rewardArray = [];
let maxReward = 0;
let pathResult = [];
let coordinateResult = [];
let sequenceSize;
let numSequence;
let row, col;
let timeElapsed;

function printGenerated() {
    let matriks = document.getElementById("matriks");
    let innerData = "";
    matriks.style.width = `${col * 3}rem`;
    matriks.style.height = `${row * 2}rem`;
    matriks.style.gridTemplateColumns = `repeat(${col}, 1fr)`;
    matriks.style.gridTemplateRows = `repeat(${row}, 1fr)`;
    matriks.style.gap = `${1 / row}rem ${1 / (col * 2)}rem`;
    for (let i = 0; i < matrix.length; i++) {
        for (let j = 0; j < matrix[i].length; j++) {
            innerData += `<div class='cell ${i} ${j}' id='${i}-${j}'>${matrix[i][j]}</div>`;
        }
    }

    matriks.innerHTML = innerData;

    let sekuens = document.getElementById("sekuens");
    innerData = "";
    for (let i = 0; i < numSequence; i++) {
        for (let j = 0; j < sequences[i].length; j++) {
            innerData += sequences[i][j] + " ";
        }
        innerData += ": " + rewardArray[i] + "<br>";
    }
    sekuens.innerHTML = innerData;

    document.getElementById("solve").style.display = "block";
}


function generate() {
    let token;
    try {
        row = document.getElementById('rowMatrix').value;
        col = document.getElementById('colMatrix').value;
        bufferLength = document.getElementById('bufferSize').value;
        token = document.getElementById('token').value;
        sequenceSize = document.getElementById('sequenceSize').value;
        numSequence = document.getElementById('numSeq').value;
    } catch (e) {
        document.getElementById('inputError').innerHTML = "Seluruh input harus diisi";
        console.log(e);
        return;
    }
    if (row <= 0 || col <= 0 || bufferLength <= 0 || sequenceSize <= 0 || sequenceSize <= 0 || numSequence <= 0 || token === "") {
        document.getElementById('inputError').innerHTML = "Input tidak boleh kosong dan untuk angka harus bernilai > 0!";
        return;
    }
    let tokenArray = token.split(' ');

    matrix = [];
    sequences = [];
    for (let i = 0; i < row; i++) {
        let temp = [];
        for (let j = 0; j < col; j++) {
            temp.push(tokenArray[Math.floor(Math.random() * tokenArray.length)]);
        }
        matrix.push(temp);
    }

    for (let i = 0; i < numSequence; i++) {
        let temp = [];
        for (let j = 0; j < 1 + Math.floor(Math.random() * sequenceSize); j++) {
            temp.push(tokenArray[Math.floor(Math.random() * tokenArray.length)]);
        }
        sequences.push(temp);
        rewardArray.push(Math.floor(Math.random() * 10) * 5);
    }

    printGenerated();

}


function findPath(currentBuffer, currRow, currCol, currentPath, seenCoordinates, coordinateNow) {
    if (currentBuffer <= bufferLength) {
        let reward = 0;
        let m = currentPath.length;
        for (let i = 0; i < sequences.length; i++) {
            let n = sequences[i].length;
            for (let j = 0; j <= m - n; j++) {
                let found = false;
                for (let k = 0; k < n; k++) {
                    if (currentPath[j + k] !== sequences[i][k]) {
                        found = false;
                        break;
                    }
                    found = true;
                }
                if (found) {
                    reward += rewardArray[i];
                }
            }
            if (reward > maxReward) {
                maxReward = reward;
                pathResult = [...currentPath];
                coordinateResult = [...coordinateNow];
            }
        }
    }

    if (currentBuffer === bufferLength) {
        return;
    }

    if (currentBuffer === 0) {
        for (let i = 0; i < matrix[0].length; i++) {
            findPath(1, currRow, i, [matrix[currRow][i]], [[currRow, i]], [[currRow, i]]);
        }
    }
    // Move horizontally
    else if (currentBuffer % 2 === 0 && currentBuffer !== 0) {
        for (let i = 0; i < matrix[currRow].length; i++) {
            let seen = false;
            for (let j = 0; j < seenCoordinates.length; j++) {
                if (seenCoordinates[j][0] === currRow && seenCoordinates[j][1] === i) {
                    seen = true;
                    break;
                }
            }
            if (seen) {
                continue;
            }
            seenCoordinates.push([currRow, i]);
            currentPath.push(matrix[currRow][i]);
            coordinateNow.push([currRow, i]);
            findPath(currentBuffer + 1, currRow, i, currentPath, seenCoordinates, coordinateNow);
            seenCoordinates.pop();
            currentPath.pop();
            coordinateNow.pop();
        }
    }
    // Move vertically
    else {
        for (let i = 0; i < matrix.length; i++) {
            let seen = false;
            for (let j = 0; j < seenCoordinates.length; j++) {
                if (seenCoordinates[j][0] === i && seenCoordinates[j][1] === currCol) {
                    seen = true;
                    break;
                }
            }
            if (seen) {
                continue;
            }
            seenCoordinates.push([i, currCol]);
            currentPath.push(matrix[i][currCol]);
            coordinateNow.push([i, currCol]);
            findPath(currentBuffer + 1, i, currCol, currentPath, seenCoordinates, coordinateNow);
            seenCoordinates.pop();
            currentPath.pop();
            coordinateNow.pop();
        }

    }
}

function solve() {
    let start = performance.now();
    maxReward = 0;
    pathResult = [];
    coordinateResult = [];
    // document.getElementById("processing").style.display = "inline";
    // document.getElementById("processing").innerHTML = "Processing...";
    for (let i = 0; i < matrix[0].length; i++) {
        findPath(0, 0, i, [], [], []);
    }
    // document.getElementById("processing").style.display = "none";
    let end = performance.now();
    timeElapsed = end - start;

    document.getElementById("result").style.display = "block";
    let strHasil = "";
    strHasil += "Reward maksimal: " + maxReward + "<br>";
    for (let i = 0; i < pathResult.length; i++) {
        strHasil += pathResult[i] + " ";
    }
    strHasil += "<br>";
    for (let i = 0; i < coordinateResult.length; i++) {
        strHasil += `(${coordinateResult[i][0] + 1}, ${coordinateResult[i][1] + 1}) `;
    }
    strHasil += `<br>Waktu pemrosesan: ${timeElapsed} ms`;
    document.getElementById("hasil").innerHTML = strHasil;

    for (let i = 0; i < coordinateResult.length; i++) {
        let cell = document.getElementById(`${coordinateResult[i][0]}-${coordinateResult[i][1]}`);
        cell.style.backgroundColor = "rgb(115, 140, 0)";
        if (i % 2 === 0) {
            // Vertical row
            if (i + 1 < coordinateResult.length) {
                for (let j = Math.min(coordinateResult[i][0], coordinateResult[i + 1][0]); j <= Math.max(coordinateResult[i][0], coordinateResult[i + 1][0]); j++) {
                    let cell = document.getElementById(`${j}-${coordinateResult[i][1]}`);
                    cell.style.borderLeftWidth = "0.1rem";
                    cell.style.borderRightWidth = "0.1rem";
                    cell.style.borderLeftStyle = "solid";
                    cell.style.borderRightStyle = "solid";
                }
            }
        }
        else {
            // Horizontal row
            if (i + 1 < coordinateResult.length) {
                for (let j = Math.min(coordinateResult[i][1], coordinateResult[i + 1][1]); j <= Math.max(coordinateResult[i][1], coordinateResult[i + 1][1]); j++) {
                    let cell = document.getElementById(`${coordinateResult[i][0]}-${j}`);
                    cell.style.borderTopWidth = "0.1rem";
                    cell.style.borderBottomWidth = "0.1rem";
                    cell.style.borderTopStyle = "solid";
                    cell.style.borderBottomStyle = "solid";
                }
            }
        }

        if (i === 0) {
            cell.style.backgroundColor = "rgb(224,24,166)";
        }
    }
}


function download() {
    let data = "";
    if (pathResult.length === 0) {
        data += "Tidak ada solusi yang optimal\n";
    }
    else {
        data += maxReward + "\n";
        for (let i = 0; i < pathResult.length; i++) {
            data += pathResult[i] + " ";
        }
        data += "\n";
        for (let i = 0; i < coordinateResult.length; i++) {
            data += (coordinateResult[i][1] + 1) + ", " + (coordinateResult[i][0] + 1) + "\n";
        }
    }
    data += "\n" + timeElapsed + " ms";
    let blob = new Blob([data], {type: 'text/plain'});
    let url = window.URL.createObjectURL(blob);
    let a = document.createElement('a');
    a.href = url;
    a.download = 'output.txt';
    a.click();
    window.URL.revokeObjectURL(url);
}