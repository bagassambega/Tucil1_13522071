#include <chrono>
#include <iostream>
#include <fstream>
#include <cstdlib>
#include <vector>
#include <chrono>
using namespace std;


int main() {
    int jumlah_token, ukuran_buffer;
    jumlah_token = 5;
    vector <string> token = {"7A", "55", "ED", "C9", "1C"};
    ukuran_buffer = 5;
    int row = 6, col = 6;
    int jumlah_sekuens = 2;
    int ukuran_maks_sekuens = 4;
    vector <vector <string>> matrix;
    vector <string> arr;
    srand(time(0));
    for (int i = 0; i < row; i++) {
        arr = {};
        for (int j = 0; j < col; j++) {
            arr.push_back(token[rand() % jumlah_token]);
        }
        matrix.push_back(arr);
    }

    for (int i = 0; i < matrix.size(); i++) {
        for (int j = 0; j < matrix[i].size(); j++) {
            cout << matrix[i][j] << " ";
        }
        cout << endl;
    }
}