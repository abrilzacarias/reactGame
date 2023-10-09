import { useState } from 'react'
import './App.css'

//constante para los turnoa
const TURNS = {
  X: 'x',
  O: 'o',
}



const Square = ({children,  isSelected, updateBoard, index}) => {
  //let className = 'square';
  //if (isSelected) {
  //  className += ' selected';
  //} TERNARIO asi
  const className = `square ${isSelected ? 'is-selected': ''}`
  const handleClick = () => {
    updateBoard(index)
  }
  return (
    <div onClick={handleClick} className={className}>
        {children}
    </div>
)}

//key es un identificador unico
//la lista de elementos se renderiza con .map, devuleve un array
//entonces, renderiza cada elemento dentro de section game y se tiene que identificar cada elemento con una key
const WINNER_COMBOS = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
]

function App() {
  //tablero
  //Se necesita un estado para guardar donde el usuario hace click
  const [board, setBoard] = useState(Array(9).fill(null))

  //otro estado para saber el turno del usuario
  const [turn, setTurn] = useState(TURNS.X)
  const [winner, setWinner] = useState(null) //null = no hay ganador, false = empate

  const checkWinner = (boardToCheck) => {
      //se revisa todas las combinaciones ganadores para ver si X u O gana, se chequea siempre
      for (const combo of WINNER_COMBOS){
      const [a, b, c] = combo
      //se verifica si la X o la O esta en todas esas posiciones
      if (boardToCheck[a] && boardToCheck[a] == boardToCheck[b] && boardToCheck[a] == boardToCheck[c])
      {return boardToCheck[a] }}
      //si no hay ganador
      return null
}

const resetGame = () => {
  setBoard(Array(9).fill(null));
  setTurn(TURNS.X)
  setWinner(null)
}
  const updateBoard = (index) => {
    //para que no se actualice la posicion si ya tiene algo, o si hay un ganador
    if (board[index] || winner) return 
    
    //se crea una copia y no se hace un board[index] = turn (o sea, modificar)
    //porque no se tiene que modificar NUNCA las props y el estado, se debe crear
    // un nuevo array, en esta caso se utiliza el array de abajo (una copia)
    const newBoard = [...board]
    //spread y rest operator
    //el utilizado es una COPIA SUPERFICIAL, si se necesita hacer una
    //de forma profunda se utiliza structuredClone(board)
    //a los estados y props se los trata como INMUTABLES porque
    //si se lo modifica, pueden ocurrir problemas de renderizado xq se
    //modifica el estado directamente en lugar de utilizar setBoard
    //por lo tanto los datos de renderizado siempre tiene que ser nuevos 
    newBoard[index] = turn
    setBoard(newBoard)

    const newTurn = turn == TURNS.X ? TURNS.O: TURNS.X
    setTurn(newTurn)
    //revisar si hay un ganador
    const newWinner = checkWinner(newBoard)
    if (newWinner) {
    //la actualizacion de los estados en React, son asincronos
    //no bloquea la ejecucion del codigo que sigue
      setWinner(newWinner)}
  }
   
  return (
    <main className='board'>
      <section className='game'> {
        board.map((_, index) => {
          return (
            <Square
            key={index}
            index={index}
            updateBoard={updateBoard}>
              {board[index]}
            </Square>
          )}
        )}
      </section>

      <section className='turn'>
        <Square isSelected={turn == TURNS.X}>{TURNS.X}</Square>
        <Square isSelected={turn == TURNS.O}>{TURNS.O}</Square>
      </section>

      {
        winner != null && (
          <section className='winner'>
            <div className="text">
              <h2>
                {winner == false ? 'Empate' : 'Gano:'}
              </h2>
              
              <header className="win">
                {winner && <Square>{winner}</Square>}
              </header>

              <footer>
                <button onClick={resetGame}>Empezar de nuevo</button>
              </footer>
            </div>
          </section>
        )
      }
    </main>
  )
    
}

export default App
