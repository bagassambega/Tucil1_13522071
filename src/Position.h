#ifndef POSITION
#define POSITION

#include <string>
#include <vector>
#include <iostream>

using namespace std;

class Position {
    public:
        int row = -1;
        int col = -1;
        string value;
        static vector <Position> foundPositions;

    Position(int r, int c, const string& val) : row(r), col(c), value(val) {
        addPosition(*this);
    }

    static void addPosition(Position position) {
        for (const auto& pos : foundPositions) {
            if (pos.row == position.row && pos.col == position.col) {
                cout << "Position with the same row and column already exists." << pos.row << pos.col << endl;
                return;
            }
        }

        foundPositions.push_back(position);
        cout << "Position added successfully." << endl;
    }
};

#endif //POSITION
