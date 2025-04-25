/*----- constants -----*/
// look-up data structure
const COLORS = {
    '1': 'purple',
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
//   document.querySelector('.board').addEventListener('click', handlePick);
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