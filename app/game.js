angular.module('con4', [])
    .controller('GameController', function ($scope) {

        $scope.newGame = function () {

            $scope.victory = false;
            $scope.grid = buildGrid();
            $scope.activePlayer = "red";
        }

        function buildGrid() {
            $scope.grid = [];
            $scope.lastRow = 5;
            $scope.lastCol = 6;
            for (var x = 0; x < 6; x++) {
                var row = x
                $scope.grid[x] = [];
                for (var y = 0; y < 7; y++) {
                    var col = y
                    $scope.grid[x].push({ row: row, col: col })

                }
            }
            console.log($scope.grid[5][6]);
            return $scope.grid;


        }

        $scope.dropToken = function (col) {
           
            if ($scope.grid[0][col].hasToken) {
                return;
            }


            var row = checkSouth(0, col);
            var cell = $scope.grid[row][col]
            cell.hasToken = true;
            cell.color = $scope.activePlayer;


            endTurn();
            checkVictory(cell);

        }

        function checkSouth(row, col) {

            if (row < $scope.lastRow) {
                row++;
                var thisCell = $scope.grid[row][col];
                if (thisCell.hasToken) {
                    row--;
                } else {
                    return checkSouth(row, col);
                }
            }
            return row;
        }

        function checkVictory(cell) {

            var horizontalMatches = 0;
            //Check Horizontal
            horizontalMatches += checkNextCell(cell, 0, 'left');
            horizontalMatches += checkNextCell(cell, 0, 'right');
			
            //Check Vertical
            var verticalMatches = 0;
            verticalMatches += checkNextCell(cell, 0, 'bottom');
			
            //Check DiagLeftUp and RightDown
            var diagLeft = 0;
            diagLeft += checkNextCell(cell, 0, 'diagUpLeft');
            diagLeft += checkNextCell(cell, 0, 'diagBotRight');
			
            //Check DiagRigthUp and LeftDown
            var diagRight = 0;
            diagRight += checkNextCell(cell, 0, 'diagUpRight');
            diagRight += checkNextCell(cell, 0, 'diagBotLeft');

            if (verticalMatches >= 3 || horizontalMatches >= 3 || diagLeft >= 3 || diagRight >= 3) {
                //You can do better than an alert 
                alert(cell.color + ' Wins');
            }
        }

        function getNextCell(cell, direction) {
            console.log(cell);
            var nextRow = cell.row;
            var nextCol = cell.col;


            switch (direction) {
                case 'left':
                    nextCol--;
                    break;
                case 'right':
                    nextCol++;
                    break;
                case 'bottom':
                    nextRow++;
                    break;
                case 'diagUpLeft':
                    nextRow--;
                    nextCol--;
                    break;
                case 'diagUpRight':
                    nextRow--;
                    nextCol++;
                    break;
                case 'diagBotLeft':
                    nextRow++;
                    nextCol--;
                    break;
                case 'diagBotRight':
                    nextRow++;
                    nextCol++;
                    break;

            }

            if (nextRow > 0 || nextRow < 5 || nextCol > 6) {
                return null;
            } return $scope.grid[nextRow][nextCol];

        }

        function checkNextCell(cell, matches, direction) {
            console.log(cell);
            var nextCell = getNextCell(cell, direction);
            if (nextCell != undefined) {
                if (nextCell.hasToken && nextCell.color === cell.color) {
                    matches++;
                    return checkNextCell(nextCell, matches, direction);
                }

            }
        }

        function endTurn() {
            console.log("end of turn")
            if ($scope.activePlayer === 'red') {
                $scope.activePlayer = 'yellow';
            } else {
                $scope.activePlayer = 'red';
            }

        }
    });