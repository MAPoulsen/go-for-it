angular.module('con4', [])
	.controller('GameController', function($scope){
		
		$scope.newGame = function(){
			/**
			 * set victory to false
			 * $scope.grid = buildGrid();
			 * This is connect 4 so red plays first
			 */
			$scope.victory = false;
			$scope.grid = buildGrid();
			$scope.activePlayer = 'red';
		}
		
		function buildGrid(){
			//Build a 6x7 grid object and return it from this function
			var grid = []; 
			//Each cell of the grid is an object that knows its coords
			/**
			 * Cell Schema
			 * {
			 * 		row: number,
			 * 		col: number
			 * }
			 */
			for(var row = 0; row < 6; row++){
				grid[row] = [];
				for(var col = 0; col < 7; col++){
					grid[row][col] = {row: row, col: col};
				}
			}
			return grid;
		}
		
		$scope.dropToken = function(col){
			//Column is full no space available
			//Bad Drop
			if($scope.grid[0][col].hasToken){
				return;
			}
			
			var row = checkSouth(0, col);
			var cell = $scope.grid[row][col]; 
			cell.hasToken = true;
			cell.color = $scope.activePlayer;
			
			endTurn();
			checkVictory(cell);
		}
		
		function checkSouth(row, col){
			//Base case 1 found south Token return row - 1 to go back one step
			if($scope.grid[row][col].hasToken){
				return row - 1;
			}
			//base case 2 reached bottom of grid
			if(row >= 5){
				return row;
			}
			row++;
			return checkSouth(row, col);
		}
		
		function checkVictory(cell){
			var horizontalMatches = 0;
			//Check Horizontal
			horizontalMatches += checkNextCell(cell, 0, 'left');
			horizontalMatches += checkNextCell(cell, 0, 'right');
			
			//Check Vertical
			var verticalMatches = 0;
			verticalMatches += checkNextCell(cell, 0, 'bottom');
			
			//Check Diag LeftUp and RightDown
			var diagLeft = 0;
			diagLeft += checkNextCell(cell, 0, 'diagUpLeft');
			diagLeft += checkNextCell(cell, 0, 'diagBotRight');
			
			//Check Diag RigthUp and LeftDown
			var diagRight = 0;
			diagRight += checkNextCell(cell, 0, 'diagUpRight');
			diagRight += checkNextCell(cell, 0, 'diagBotLeft');
			
			if(verticalMatches >= 3 || horizontalMatches >= 3 || diagLeft >= 3 || diagRight >= 3){
				alert(cell.color + ' Wins');
			}
			
		}
		
		function getNextCell(cell, direction){
			/**
			 * var nextRow = cell.row;
			 * var nextCol = cell.col;
			 * 
			 * adjust the values of nextRow
			 * and nextCol as needed based upon
			 * the direction of travel.
			 * 
			 * if nextRow > 0 or < 5 
			 * or if nextCol > 6 
			 * return null;
			 * 
			 * otherwise 
			 * return $scope.grid[nextRow][nextCol];
			 */
			var nextRow = cell.row;
			var nextCol = cell.col;
			
			if(direction === 'bottom'){
				nextRow++;
			} else if(direction === 'left'){
				nextCol--;
			} else if(direction === 'right'){
				nextCol++;
			} else if(direction === 'diagUpLeft'){
				nextCol--;
				nextRow--;
			} else if(direction === 'diagBotRight'){
				nextCol++;
				nextRow++;
			} else if(direction === 'diagUpRight'){
				nextCol--;
				nextRow++;
			} else if(direction === 'diagBotLeft'){
				nextCol++;
				nextRow--;
			}
			
			if(nextRow < 0 || nextRow > 5 || nextCol > 6){
				return;
			}
			
			return $scope.grid[nextRow][nextCol];
		}
		
		function checkNextCell(cell, matches, direction){
			/**
			 * var nextCell = getNextCell(cell, direction)
			 * check if nextCell is defined 
			 * if nextCell.hasToken and nextCell.color
			 * matches cell.color 
			 * increment matches and then 
			 * return checkNextCell(nextCell, matches, direction)
			 * 
			 * otherwise return matches
			 */
			var nextCell = getNextCell(cell, direction);
			if(nextCell && nextCell.hasToken && nextCell.color === cell.color){
				matches++;
				return checkNextCell(nextCell, matches, direction);
			}
			return matches;
		}
		
		function endTurn(){
			/**
			 * End Turn simply switch 
			 * $scope.activePlayer from 
			 * 'red' to 'yellow' 
			 * and 'yellow' to 'red'
			 */
			if($scope.activePlayer === 'red'){
				$scope.activePlayer = 'yellow';
			} else {
				$scope.activePlayer = 'red';
			}
		}
	});