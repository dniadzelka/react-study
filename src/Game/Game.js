import React from 'react';
import { calculateWinner } from '../Helpers/Helpers';
import './Game.css'
import { Board } from '../Board/Board';

export class Game extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            history: [{
                squares: Array(9).fill(null),
            }],
            xIsNext: true,
            stepNumber: 0,
        };
    }

    handleClick(i) {
        const history = this.state.history.slice(0, this.state.stepNumber + 1);
        const current = history[history.length - 1];
        const squares = current.squares.slice();
        if (calculateWinner(squares) || squares[i]) {
            return;
        }
        squares[i] = this.state.xIsNext ? 'X' : 'O';
        this.setState({
            history: history.concat([{
                squares: squares,
            }]),
            stepNumber: history.length,
            xIsNext: !this.state.xIsNext,
        });
    }

    handleGoToStateClick(step) {
        this.setState({
            stepNumber: step,
            xIsNext: (step % 2) === 0,
        });
    }

    render() {
        const history = this.state.history;
        const current = history[this.state.stepNumber];
        const squares = current.squares;
        const winner = calculateWinner(squares);

        const moves = history.map((step, move) => {
            const desc = move ? `Go to move #${move}` : 'Go to game start';

            return (
                <li key={move} className={ this.state.stepNumber === move ? 'selected' : '' }>
                    <button onClick={() => { this.handleGoToStateClick(move) }}>{desc}</button>
                </li>
            );
        });

        let status;
        if (winner) {
            status = 'Winner: ' + winner;
        } else {
            status = `Next player: ${this.state.xIsNext ? 'X' : 'O'}`;
        }

        return (
            <div className="game">
                <div className="game-board">
                    <Board squares={squares} onBoardClick={(i) => this.handleClick(i)} />
                </div>
                <div className="game-info">
                    <div className="status">{status}</div>
                    <ol>{moves}</ol>
                </div>
            </div>
        );
    }
}