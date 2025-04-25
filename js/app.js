/*----- constants -----*/
// look-up data structure
const COLORS = {
    '1': 'blue',
    '-1': 'orange',
    'null': 'white',
  };
  
  /*----- state variables -----*/
 
  let board;  
  let winner; 
  let turn;  
  
  /*----- cached elements  -----*/
  const msgEl = document.querySelector('h2');
  const playAgainBtn = document.getElementById('play-again');
  
  const squareEls = [...document.querySelectorAll('.board > div')]

  /*----- event listeners -----*/
  document.querySelector('.board').addEventListener('click', handlePick);
  playAgainBtn.addEventListener('click', init);

  
  /*----- functions -----*/
  init();
  

  function init() {
 
    board = [
      [null, null, null], // row 0
      [null, null, null], // row 1
      [null, null, null], // row 2
    ];
    winner = null;
    turn = 1;
    render();
  }
  


  function handlePick(evt) {
    const id = evt.target.id; 
    if (!id.startsWith('r') || winner) return;
    const row = parseInt(id[1]);
    const col = parseInt(id[3]); 
    if (board[row][col] !== null) return; 
    board[row][col] = turn; 
    winner = getWinner();
    turn *= -1;
    render();
   }

   function getWinner() {
    return checkRows() || checkCols() || checkDiag() || checkTie();
   }

   function checkRows () {
    for (let rowIdx = 0; rowIdx < 3; rowIdx++) {
        if (board[rowIdx][0] !== null &&
            board[rowIdx][0] === board[rowIdx][1] &&
            board[rowIdx][0] === board[rowIdx][2]) {
                return board[rowIdx][0];
        }
    }
    return null;
   }

   function checkCols() {
    for (let colIdx = 0; colIdx < 3; colIdx++) {
        if (board[0][colIdx] !== null &&
            board[0][colIdx] === board[1][colIdx] &&
            board[0][colIdx] === board[2][colIdx]) {
                return board[0][colIdx];
        }
    }
    return null;
   }

   function checkDiag() {
    //reg diag
    if (board[0][0] !== null &&
        board[0][0] === board[1][1] &&
        board[0][0] === board[2][2]){
            return board[0][0];
    }
    //reverse diag
    if (board[0][2] !== null &&
        board[0][2] === board[1][1] &&
        board[0][2] === board[2][0]){
            return board[0][2];
    }
    return null;
   }

   function checkTie() {
    if (board.flat().every(cell => cell !== null)) {
      return 'Tie';
    }
    return null;
  }


  function render() {
    renderBoard();
    renderMessage();
    renderControls();
  }
  
  function renderControls() {
    if (playAgainBtn) { // Check if the button exists
       playAgainBtn.style.visibility = winner ? 'visible' : 'hidden';
    }
  }
  
  function renderMessage() {
    if (winner === null) {
      msgEl.innerHTML = `<span style="color: ${COLORS[turn]}">${COLORS[turn].toUpperCase()}</span>'s Turn`;
    } else if (winner === 'Tie') {
      msgEl.innerHTML = "It's a Tie!";
    } else {
      // There's a winner!
      msgEl.innerHTML = `<span style="color: ${COLORS[winner]}">${COLORS[winner].toUpperCase()}</span> Wins!`;
    }
  }
  
function renderBoard() {
    board.forEach((rowArr, rowIdx) => {
      rowArr.forEach((cellVal, colIdx) => {
        const cellId = `r${rowIdx}c${colIdx}`;
        const cellEl = document.getElementById(cellId);
        if (cellEl) {
          cellEl.style.backgroundColor = COLORS[cellVal];
          cellEl.textContent = cellVal === 1 ? 'X' : cellVal === -1 ? 'O' : '';
        }
      });
    });
  }