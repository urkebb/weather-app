import React, { useState } from 'react';
import { AiOutlineSearch } from "react-icons/ai"
import PropTypes from 'prop-types';
import { ImSpinner8 } from 'react-icons/im';
import './Input.scss';


export default function Input(
    { className, handleChange, search, placeholder, value }
) {

    return <>
        <div className={`form-control-container ${className}`}>
            <input
                className={`form-control`}
                onChange={(e) => {
                    handleChange(e.target.value)
                }}
                value={value}
                disabled={search}
                placeholder={placeholder}
            />
            {!search ?
                <AiOutlineSearch
                    onClick={() => {
                        // console.log('clicked')
                    }}
                    className={`form-control-icon-right ${value && 'black'}`}
                /> :
                <ImSpinner8
                    className='form-control-icon-right spinner'
                />
            }
        </div>

    </>

}


Input.propTypes = {
    className: PropTypes.string,
    handleChange: PropTypes.func.isRequired,
    search: PropTypes.bool,
    placeholder: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired
}
