#include <iostream>
#include <vector>
#include <string>

using namespace std;

typedef struct {
    int row;
    int col;
    string value;
} Position;

Position findRight(vector <vector <string>> matrix, vector <vector <string>> sequences, int rowAcuan, int colAcuan) {
    Position position;
    for (int i = colAcuan; i < matrix[0].size(); i++) {
        for (int j = 0; j < sequences.size(); j++) {
            for (int k = 0; k < sequences[i].size(); k++) {
                if (matrix[rowAcuan][i] == sequences[j][k]) {
                    position.row = rowAcuan;
                    position.col = i;
                    position.value = matrix[rowAcuan][i];
                }
            }
        }
    }
}





int main() {
    vector <vector <string>> matrix =
            {{"7A", "55", "E9", "E9", "1C", "55"},
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

    vector <int> reward = {15, 20, 30};



    return 0;
}