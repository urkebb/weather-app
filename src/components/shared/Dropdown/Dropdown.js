import React, { useState } from 'react';
import { AiFillCaretDown } from "react-icons/ai";
import PropTypes from 'prop-types';
import './Dropdown.scss';

export default function Dropdown({ className, options, handleChange }) {

    const [open, setOpen] = useState(false)
    const [value, setValue] = useState(options[0])

    return <>
        <div className={`form-control-container ${className}`}>
            <div
                className={`form-control dropdown-select`}
                tabIndex={0}
                onClick={() => setOpen(!open)}
                onBlur={() => setOpen(false)}
            >

                <img
                    className='dropdown-icon form-control-icon-left' alt="icon" src={value.icon} />

                <p
                    className='placeholder'><b> {value.code}</b></p>
                <AiFillCaretDown
                    style={{ height: '15px', width: '15px' }}
                    className='form-control-icon-right'
                />

                {
                    open &&
                    <div
                        className='dropdown-options'>
                        {options?.length &&
                            options.map((option, index) =>
                                <div
                                    onClick={
                                        () => {
                                            setValue(option)
                                            handleChange(option.code)
                                        }
                                    }
                                    key={index}
                                    className='option'>
                                    <div className='dropdown-icon'>
                                        <img src={option.icon} />
                                    </div>


                                    <p> {option.name}</p>
                                </div>)
                        }
                    </div>
                }
            </div>
        </div>

    </>
}


Dropdown.propTypes = {
    className: PropTypes.string,
    options: PropTypes.arrayOf(PropTypes.object).isRequired,
    handleChange: PropTypes.func.isRequired
}
