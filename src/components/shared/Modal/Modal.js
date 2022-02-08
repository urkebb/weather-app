import React from 'react';
import Button from '../Button/Button';
import Card from '../Card/Card';
import PropTypes from 'prop-types';
import './Modal.scss';

export default function Modal({ title, message, handleOkClick, show }) {



    return <div
        className={`overlay`}
    >
        <div
            className='overlay-content'>
            <Card className={
                `overlay-content__card ${show ? 'overlay-content__show' : ''}`
            }>
                <div className='overlay-content__card-header'>

                    <h2 style={{ textAlign: 'center' }}>{title}</h2>

                </div>

                <div className='overlay-content__card-body'>
                    <p className='overlay-content__card-body__message'>{message}</p>
                    <div style={{ textAlign: 'right' }}>
                        <Button
                            className="button-primary"
                            handleClick={handleOkClick}
                            text="OK"
                        >
                        </Button>

                    </div>

                </div>

            </Card>
        </div>

    </div >;
}


Modal.propTypes = {
    title: PropTypes.string.isRequired,
    message: PropTypes.string.isRequired,
    show: PropTypes.bool.isRequired,
    handleOkClick: PropTypes.func.isRequired
}

