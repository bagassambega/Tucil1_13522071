#include <iostream>
#include <vector>
#include <string>
#include <fstream>
#include <chrono>

using namespace std;

const int rows = 6;
const int cols = 6;
int buffer = 7;
vector <vector <string>> allPaths;
vector <vector <vector <int>>> allCoordinates;
vector <vector <int>> coordinateResult;
vector <string> pathResult;
int maxReward = 0;
vector<vector<string>> matrix = {
        {"BD", "55", "E9", "E9", "1C", "55"},
        {"55", "7A", "1C", "7A", "E9", "55"},
        {"55", "1C", "1C", "55", "E9", "BD"},
        {"BD", "1C", "7A", "1C", "55", "BD"},
        {"BD", "55", "BD", "7A", "1C", "1C"},
        {"1C", "55", "55", "7A", "55", "7A"}
};
vector <vector <string>> sequences = {
        {"BD", "E9", "1C"},
        {"BD", "7A", "BD"},
        {"BD", "1C", "BD", "55"}
};

vector <int> rewardArray = {15, 20, 30};

//void generateAll(int currentBuffer, int currRow, int currCol, vector <string> currentPath, vector <vector <int>> seenCoordinates, vector <vector <int>> coordinateNow) {
//    if (currentBuffer >= 1 && currentBuffer <= buffer) {
//        allPaths.push_back(currentPath);
//        allCoordinates.push_back(coordinateNow);
//    }
//
//    if (currentBuffer == buffer) {
//        return;
//    }
//
//    if (currentBuffer == 0) {
//        for (int i = 0; i < matrix.size(); i++) {
//            generateAll(1, i, currCol, {matrix[currRow][i]}, {{currRow, i}}, {{i, currCol}});
//        }
//    }
//    else if (currentBuffer % 2 == 0) {
//        for (int i = 0; i < matrix[0].size(); i++) {
//            bool seen = false;
//            for (auto &seenCoordinate : seenCoordinates) {
//                if (seenCoordinate[0] == currRow && seenCoordinate[1] == i) {
//                    seen = true;
//                    break;
//                }
//            }
//            if (seen) {
//                continue;
//            }
//            seenCoordinates.push_back({currRow, i});
//            currentPath.push_back(matrix[currRow][i]);
//            coordinateNow.push_back({currRow, i});
//            generateAll(currentBuffer + 1, currRow, i, currentPath, seenCoordinates, coordinateNow);
//            coordinateNow.pop_back();
//            currentPath.pop_back();
//            seenCoordinates.pop_back();
//        }
//    }
//    else {
//        for (int i = 0; i < matrix.size(); i++) {
//            bool seen = false;
//            for (auto &seenCoordinate : seenCoordinates) {
//                if (seenCoordinate[0] == i && seenCoordinate[1] == currCol) {
//                    seen = true;
//                    break;
//                }
//            }
//            if (seen) {
//                continue;
//            }
//            seenCoordinates.push_back({i, currCol});
//            currentPath.push_back(matrix[i][currCol]);
//            coordinateNow.push_back({i, currCol});
//            generateAll(currentBuffer + 1, i, currCol, currentPath, seenCoordinates, coordinateNow);
//            coordinateNow.pop_back();
//            currentPath.pop_back();
//            seenCoordinates.pop_back();
//        }
//    }
//}

void generateAll(int currentBuffer, int currRow, int currCol, vector <string> currentPath, vector <vector <int>> seenCoordinates, vector <vector <int>> coordinateNow) {
    if (currentBuffer >= 1 && currentBuffer <= buffer) {
        allPaths.push_back(currentPath);
        allCoordinates.push_back(coordinateNow);
        int reward = 0;
        int m = (int)currentPath.size();
        for (int i = 0; i < sequences.size(); i++) {
            int n = (int)sequences[i].size();
            for (int j = 0; j <= m - n; j++) {
                bool found = false;
                for (int k = 0; k < n; k++) {
                    if (currentPath[j + k] != sequences[i][k]) {
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
                pathResult = currentPath;
                coordinateResult = coordinateNow;
            }
        }

    }

    if (currentBuffer == buffer) {
        return;
    }

    if (currentBuffer == 0) {
            generateAll(1, currCol, currCol, {matrix[currRow][currCol]}, {{currRow, currCol}}, {{currRow, currCol}});

    }
    else if (currentBuffer % 2 == 0) {
        for (int i = 0; i < matrix[0].size(); i++) {
            bool seen = false;
            for (auto &seenCoordinate : seenCoordinates) {
                if (seenCoordinate[0] == currRow && seenCoordinate[1] == i) {
                    seen = true;
                    break;
                }
            }
            if (seen) {
                continue;
            }
            seenCoordinates.push_back({currRow, i});
            currentPath.push_back(matrix[currRow][i]);
            coordinateNow.push_back({currRow, i});
            generateAll(currentBuffer + 1, currRow, i, currentPath, seenCoordinates, coordinateNow);
            coordinateNow.pop_back();
            currentPath.pop_back();
            seenCoordinates.pop_back();
        }
    }
    else {
        for (int i = 0; i < matrix.size(); i++) {
            bool seen = false;
            for (auto &seenCoordinate : seenCoordinates) {
                if (seenCoordinate[0] == i && seenCoordinate[1] == currCol) {
                    seen = true;
                    break;
                }
            }
            if (seen) {
                continue;
            }
            seenCoordinates.push_back({i, currCol});
            currentPath.push_back(matrix[i][currCol]);
            coordinateNow.push_back({i, currCol});
            generateAll(currentBuffer + 1, i, currCol, currentPath, seenCoordinates, coordinateNow);
            coordinateNow.pop_back();
            currentPath.pop_back();
            seenCoordinates.pop_back();
        }
    }
}


int findMaxReward() {
    int maxReward = 0;
    for (int i = 0; i < allPaths.size(); i++) {
        int reward = 0;
        int m = (int)allPaths[i].size();
        for (int j = 0; j < sequences.size(); j++) {
            int n = (int)sequences[j].size();
            for (int k = 0; k <= m - n; k++) {
                bool found = false;
                for (int l = 0; l < n; l++) {
                    if (allPaths[i][k + l] != sequences[j][l]) {
                        found = false;
                        break;
                    }
                    found = true;
                }
                if (found) {
                    reward += rewardArray[j];
                }
            }
        }
        if (reward > maxReward) {
            maxReward = reward;
            pathResult = allPaths[i];
            coordinateResult = allCoordinates[i];
        }
    }
    return maxReward;
}


int main() {
    auto time = chrono::system_clock::now();
    generateAll(0, 0, 0, {}, {}, {});
    ofstream file("output.txt");


cout << maxReward << " " << pathResult.size() << endl;
for (int i = 0; i < coordinateResult.size(); i++) {
    cout << coordinateResult[i][0] << " " << coordinateResult[i][1] << endl;
}
    auto time2 = chrono::system_clock::now();
    chrono::duration<double> elapsed = time2 - time;
    cout << "Elapsed time: " << elapsed.count() << "s" << endl;
    return 0;
}