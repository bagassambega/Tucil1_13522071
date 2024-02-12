var matrix = [];

var sequences = [];

var allPaths = [];
var bufferLength;
var maxReward = 0;
var rewardArray  = [];
var pathResult = [];
var coordinateResult = [];
var row;
var col;
var sequenceNumber;
var timeElapsed;


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
    document.getElementById("processing").style.display = "inline";
    let start = performance.now();
    document.getElementById("processing").innerHTML = `Sedang memproses...`;
    for (let i = 0; i < matrix[0].length; i++) {
        findPath(0, 0, i, [], [], []);
    }

    let end = performance.now();
    timeElapsed = end - start;
    let hasil = "";
    if (pathResult.length === 0) {
        hasil = "Tidak ada solusi yang paling optimal<br>";
    }
    else {
        for (let i = 0; i < pathResult.length; i++) {
            hasil += pathResult[i] + " ";
        }
        hasil += `(${maxReward}) <br>`;
        for (let i = 0; i < coordinateResult.length; i++) {
            hasil += `(${coordinateResult[i][1] + 1}, ${coordinateResult[i][0] + 1}) `;
        }
    }
    hasil += `<br>Waktu pemrosesan: ${timeElapsed} ms`;
    document.getElementById("sequence").innerHTML = hasil;
    document.getElementById("download").hidden = false;

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


    setTimeout(function() {document.getElementById("processing").style.display = "none"}, 100);
}


function upload() {
    const fileInput = document.getElementById("fileInput");
    const files = fileInput.files;

    const file = files[0];
    const reader = new FileReader();

    reader.onload = function(e) {
        try {
            matrix = [];
            sequences = [];
            maxReward = 0;
            pathResult = [];
            coordinateResult = [];
            const content = e.target.result;
            const lines = content.split(/\r\n|\r|\n/).map(line => line.replace(/\r|\n/g, ''))
            bufferLength = parseInt(lines[0]);
            let splitInt = lines[1].split(' ');
            col = parseInt(splitInt[0]);
            row = parseInt(splitInt[1]);
            for (let i = 0; i < row; i++) {
                let splitInt = lines[i + 2].split(' ');
                let temp = [];
                for (let j = 0; j < col; j++) {
                    temp.push(splitInt[j]);
                }
                matrix.push(temp);
            }

            let now = row + 2;
            sequenceNumber = parseInt(lines[now]);
            now += 1;
            for (let i = 0; i < sequenceNumber * 2; i++) {
                if (i % 2 === 0) {
                    sequences.push(lines[now + i].split(' '));
                } else {
                    rewardArray.push(parseInt(lines[now + i]));
                }
            }

            // Show in HTML

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
            for (let i = 0; i < sequenceNumber; i++) {
                for (let j = 0; j < sequences[i].length; j++) {
                    innerData += sequences[i][j] + " ";
                }
                innerData += ": " + rewardArray[i] + "<br>";
            }
            sekuens.innerHTML = innerData;
        } catch (e) {
            document.getElementById("fileChosen").textContent = "Terdapat kesalahan pada pembacaan file!";
            console.log("error" + e);
            return;
        }
    };


    reader.readAsText(file);
}


function download() {
    let data = maxReward + "\n";
    if (pathResult.length === 0) {
        data += "Tidak ada solusi optimal\n";
    }
    else {
        for (let i = 0; i < pathResult.length; i++) {
            data += pathResult[i] + " ";
        }
        data += "\n";
        for (let i = 0; i < coordinateResult.length; i++) {
            data += (coordinateResult[i][1] + 1) + ", " + (coordinateResult[i][0] + 1) + "\n";
        }
    }
    data += "\n";
    data += timeElapsed + " ms";
    let blob = new Blob([data], {type: 'text/plain'});
    let url = window.URL.createObjectURL(blob);
    let a = document.createElement('a');
    a.href = url;
    a.download = 'solution.txt';
    a.click();
    window.URL.revokeObjectURL(url);
}


document.getElementById("fileInput").addEventListener("change", function() {
    document.getElementById("fileChosen").textContent = this.files[0].name;
    upload();
    document.getElementById("solve").hidden = false;
    document.getElementsByClassName("result")[0].style.display = "inline";
})