import './Square.css';
import React from 'react';


export function Square(props) {
    return (
        <button className="square" onClick={props.onSquareClick}>
            {props.value}
        </button>
    );

}