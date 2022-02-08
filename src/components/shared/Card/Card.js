import React from 'react';
import './Card.scss';

export default function Card({ children, className }) {
    return <div className={`card ${className ? className : ''}`}>
        {children}
    </div>;
}
