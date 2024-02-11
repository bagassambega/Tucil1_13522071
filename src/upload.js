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


function findPath(currentBuffer, currRow, currCol, currentPath, seenCoordinates, coordinateNow) {
    if (currentBuffer >= 1 && currentBuffer <= bufferLength) {
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
        for (let i = 0; i < matrix.length; i++) {
            findPath(1, i, currCol, [matrix[i][currCol]], [[currRow, i]], [[i, currCol]]);
        }
    }
    // Move horizontally
    else if (currentBuffer % 2 === 0) {
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
    let start = new Date();
    findPath(0, 0, 0, [], [], []);
    let end = new Date();
    console.log(maxReward);
    console.log(pathResult);
    console.log(coordinateResult);
    console.log(`${end - start} ms`);
    let showMaxReward = document.getElementById("maxReward");
    showMaxReward.innerHTML = maxReward;

    let innerData = "";
    let showSequence = document.getElementById("sequence");
    for (let i = 0; i < pathResult.length; i++) {
        innerData += pathResult[i] += `(${coordinateResult[i][1] + 1}, ${coordinateResult[i][0] + 1})`
        + "<br>";
    }
    showSequence.innerHTML = innerData;

    let showTime = document.getElementById("time");
    showTime.innerHTML = `${end - start} ms`;

}


function upload() {
    const fileInput = document.getElementById("fileInput");
    const files = fileInput.files;

    const file = files[0];
    const reader = new FileReader();

    reader.onload = function(e) {
        const content = e.target.result;
        const lines = content.split(/\r\n|\r|\n/).map(line => line.replace(/\r|\n/g, ''))
        console.log(lines);
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
        console.log(now);
        for (let i = 0; i < sequenceNumber * 2; i++) {
            if (i % 2 === 0) {
                console.log(lines[now + i], now + i);
                sequences.push(lines[now + i].split(' '));
            }
            else {
                rewardArray.push(parseInt(lines[now + i]));
            }
        }

        let matriks = document.getElementById("matriks");
        let innerData = "";
        for (let i = 0; i < row; i++) {
            for (let j = 0; j < col; j++) {
                innerData += matrix[i][j] + " ";
            }
            innerData += "<br>";
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
    };

    console.log(matrix);
    console.log(sequences);
    console.log(rewardArray);

    reader.readAsText(file);
}


function download() {
    let data = "Max Reward: " + maxReward + "\n";
    data += "Path: ";
    for (let i = 0; i < pathResult.length; i++) {
        data += pathResult[i] + " ";
    }
    data += "\n";
    data += "Coordinate: ";
    for (let i = 0; i < coordinateResult.length; i++) {
        data += "(" + (coordinateResult[i][1] + 1) + ", " + (coordinateResult[i][0] + 1) + ") ";
    }
    data += "\n";
    let blob = new Blob([data], {type: 'text/plain'});
    let url = window.URL.createObjectURL(blob);
    let a = document.createElement('a');
    a.href = url;
    a.download = 'result.txt';
    a.click();
    window.URL.revokeObjectURL(url);
}
