#include <iostream>
#include <vector>
#include <string>
using namespace std;

// Global var
vector <vector <string>> allPaths;
vector <vector <string>> matrix;
vector <vector <string>> sequences;
vector <int> rewards;
int bufferLength;


bool checkSequence(vector <string> currentPath, int checkSequenceNumber) {
    bool found = true;
    int n = (int)sequences[checkSequenceNumber].size();
    int m = (int)currentPath.size();
    for (int i = 0; i <= n - m; i++) {
        for (int j = 0; j < m; j++) {
            if (currentPath[j] != sequences[checkSequenceNumber][i + j]) {
                found = false;
                break;
            }
        }
        if (found) {
            return true;
        }
    }
    return false;
}


bool checkPathAvailable(vector <vector <int>> seenCoordinates, int row, int col) {
    for (auto &seenCoordinate : seenCoordinates) {
        if (seenCoordinate[0] == row && seenCoordinate[1] == col) {
            return false;
        }
    }
    return true;
}


void generateVerticalFirst(int currRow, int currCol, vector <string> currentPath, vector <vector <int>> seenCoordinates) {
    for (int i = 0; i < currentPath.size(); i++) {
        cout << currentPath[i] << " " << seenCoordinates[i][0] << " " << seenCoordinates[i][1] << " ";
    }
    cout << endl;
    if (currentPath.size() == bufferLength) {
        allPaths.push_back(currentPath);
        return;
    }
    
    // First find, vertically
    if (currentPath.empty()) {
        for (int i = 0; i < matrix.size(); i++) {
            for (int j = 0; j < sequences.size(); j++) {
                if (matrix[i][currCol] == sequences[j][0]) {
                    currentPath.push_back(matrix[i][currCol]);
                    seenCoordinates.push_back({i, currCol});
                    generateVerticalFirst(i, currCol, currentPath, {{i, 0}});
                }
            }
        }
    }
    // Find horizontally after vertical move
    else if (currentPath.size() % 2 == 1) {
        cout << "horizontal" << " ";
        for (int i = 0; i < matrix[currRow].size(); i++) {
            if (!checkPathAvailable(seenCoordinates, currRow, i)) {
                continue; // Skip the already added current row and column
            }
            for (int j = 0; j < sequences.size(); j++) {
                if (checkSequence(currentPath, j)) {
                    currentPath.push_back(matrix[currRow][i]);
                    seenCoordinates.push_back({currRow, i});
                    generateVerticalFirst(currRow, i, currentPath, seenCoordinates);
                }
            }
        }
    }
    // Find vertically, aside of the first move
    else {
        cout << "vertical" << " ";
        for (int i = 0; i < matrix.size(); i++) {
            if (!checkPathAvailable(seenCoordinates, i, currCol)) {
                continue;
            }
            for (int j = 0; j < sequences.size(); j++) {
                if (checkSequence(currentPath, j)) {
                    currentPath.push_back(matrix[i][currCol]);
                    seenCoordinates.push_back({i, currCol});
                    generateVerticalFirst(i, currCol, currentPath, {{i, 0}});
                }
            }
        }
    }
}



int main() {
    matrix =
            {{"7A", "55", "E9", "E9", "1C", "55"},
             {"55", "7A", "1C", "7A", "E9", "55"},
             {"55", "1C", "1C", "55", "E9", "BD"},
             {"BD", "1C", "7A", "1C", "55", "BD"},
             {"BD", "55", "BD", "7A", "1C", "1C"},
             {"1C", "55", "55", "7A", "55", "7A"}
            };

    sequences = {
            {"BD", "E9", "1C"},
            {"BD", "7A", "BD"},
            {"BD", "1C", "BD", "55"}
            };

    vector <int> reward = {15, 20, 30};

    vector <string> foundSequences;
    string path;
    bufferLength = 7;
    vector <vector <int>> seenCoordinates;

    generateVerticalFirst(0, 0, foundSequences, seenCoordinates);

    for (int i = 0; i < allPaths.size(); i++) {
        for (int j = 0; j < allPaths[i].size(); j++) {
            cout << allPaths[i][j] << " ";
        }
        cout << endl;
    }

    return 0;
}