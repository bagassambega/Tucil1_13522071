#include <iostream>
#include <vector>
#include <fstream>
#include <string>

using namespace std;


vector <vector <int>> readMatrix(int row, int column) {
    vector <vector <int>> matrix;
    // Asumsi input selalu valid
    vector <int> row_vector;
    int i, j;
    for (i = 0; i < row; i++) {
        for (j = 0; j < column; j++) {
            int value;
            cin >> value;
            row_vector.push_back(value);
        }
        matrix.push_back(row_vector);
        row_vector.clear();
    }
    return matrix;
}


void displayMatrix(vector <vector <string>> matrix) {
    int i, j;
    for (i = 0; i < matrix.size(); i++) {
        for (j = 0; j < matrix[0].size(); j++) {
            cout << matrix[i][j] << " ";
        }
        cout << endl;
    }
}


void displaySequences(vector <vector <string>> sequences, vector <int> reward) {
    int i, j;
    for (i = 0; i < reward.size(); i++) {
        for (j = 0; j < sequences[0].size(); j++) {
            cout << sequences[i][j] << " ";
        }
        cout << reward[i] << endl;
    }
}


void inputFromFile() {
    string filename;
    ifstream file;
    while (true) {
        cout << "Masukkan nama file: ";
        cin >> filename;
        filename = "../test/" + filename;
        file.open(filename);
        if (file.is_open()) {
            break;
        } else {
            cerr << "File tidak ditemukan" << endl;
        }
    }

    
    int buffer_size, matrix_width, matrix_height, i, j, number_of_sequences;
    file >> buffer_size >> matrix_width >> matrix_height;
    vector <vector <string>> matrix;
    vector <string> row_vector;
    for (i = 0; i < matrix_height; i++) {
        for (j = 0; j < matrix_width; j++) {
            string value;
            file >> value;
            row_vector.push_back(value);
        }
        matrix.push_back(row_vector);
        row_vector.clear();
    }

    file >> number_of_sequences;
    vector <vector <string>> sequences;
    vector <int> sequences_reward;
    vector <string> temp_sequences;
    string code;

    cout << buffer_size << ", " << matrix_height << ", " << matrix_width << endl;
    displayMatrix(matrix);

    i = 0;
    while (getline(file, code)) {
        if (i % 2 == 1) {
            sequences_reward.push_back(stoi(code));
        } else {
            temp_sequences.push_back(code);
        }
    }

//    for (i = 0; i < number_of_sequences * 2; i++) {
//        if (i % 2 == 0) {
//            while (getline(file, code)) {
//                cout << code << endl;
//            }
//        }
//        else {
//            int reward;
//            file >> reward;
//            sequences_reward.push_back(reward);
//        }
//    }


    cout << number_of_sequences << endl;
}


void inputManual() {

}


void inputRandom() {

}





int main() {
    int choice;
    cout << "1. Input File" << endl << "2. Input Manual" << endl << "3. Input Random" << endl << "4. Keluar" << endl;
    while (true) {
        cout << "Masukkan pilihan:";
        cin >> choice;
        if (choice >= 1 && choice <= 4) {
            break;
        } else {
            cerr << "Pilihan tidak valid" << endl;
        }
    }

    if (choice == 1) {
        inputFromFile();
    } else if (choice == 2) {
        inputManual();
    } else if (choice == 3){
        inputRandom();
    }
    else {
        return 0;
    }

}