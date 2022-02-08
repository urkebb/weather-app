import React from 'react';
import './MainLayout.scss';
import { useSelector, shallowEqual } from 'react-redux'



export default function MainLayout({ children }) {

    const { gradientColors } = useSelector((state) => state.color, shallowEqual)


    return <main
        style={{
            backgroundImage: gradientColors ? `linear-gradient(135deg, 
                ${gradientColors[0]} 35%, 
                ${gradientColors[1]}
        )` : `linear-gradient(
            135deg,
            rgba(0, 247, 255, 0.15) 35%,
            rgba(238, 255, 0, 0.15)
          )`
        }}
        className='main-content'>
        {children}
    </main>;
}
