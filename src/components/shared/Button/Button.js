import React from 'react';
import './Button.scss';

export default function Button({ text, handleClick, className }) {
    return <button className={`button ${className ? className : ''} `} onClick={handleClick}>
        {text}
    </button>;
}
