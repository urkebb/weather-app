import React, { useState } from 'react';
import './Weather.scss';
import Card from '../../components/shared/Card/Card';
import Input from '../../components/shared/Input/Input';
import Dropdown from '../../components/shared/Dropdown/Dropdown';
import weatherIcon from '../../assets/images/cloudy-day-1.svg';
import axios from 'axios';
import moment from 'moment';
import { useDispatch } from 'react-redux'
import { changeBgColor } from '../../state/reducers/bgColor'
import Modal from '../../components/shared/Modal/Modal';
import { options, weekdays } from './weatherConfig';

export default function Weather() {

    // initial from values
    const [values, setValues] = useState({
        country: options[0].code,
        city: ''
    })

    // state for search so we know when it's loading
    const [search, setSearch] = useState(false)
    const [forecast, setForecast] = useState(null)
    const [city, setCity] = useState(null);
    const [temperature, setTemperature] = useState(null)
    const [error, setError] = useState({
        show: false,
        title: '',
        message: ''
    })

    // redux dispatch
    const dispatch = useDispatch();

    /**  function that passes through all properties of object 
      *   values and if some property is not valid function
      * will return false otherwise it will return true 
    */
    const isFormValid = () => {
        let valid = true;
        let i = 0;
        while (valid && i < Object.keys(values).length) {
            if (!values[Object.keys(values)[i]])
                valid = false
            i = i + 1;
        }
        return valid
    }

    // When we close modal which will appear if some error occur
    const handleModalClick = () => {
        setError({
            show: false,
            message: ''
        })
    }

    /**
     * Function that calculates average temperature for next 7 days, but because
     * from API we get temperature for the next 7 days + the current day,
     * I divide it by 8 so we get correct temp
     */
    const averagetemperature = (forecast) => {

        const sum = forecast.daily.reduce((result, item) => {
            return result + item.temp.day
        }, 0)
        const res = Math.round(sum / 8)
        dispatch(changeBgColor(res))
        setTemperature(res)
    }

    /**
     * submit function 
     */
    const handleSubmit = async (e) => {
        e.preventDefault();

        // we will search for weather forecast only if form is valid
        if (isFormValid()) {
            setSearch(true)

            let city;
            /** 
             * because 7 day forecast needs city's lat and lng we first make call 
             * where in params we provide city's and country's name, and if city
             * exists we will get detailed informations about the city, and 
             * we will get lat and lng also
             */
            try {
                city = await axios
                    .get(`https://api.openweathermap.org/geo/1.0/direct?q=${values.city},${values.country}&appid=${process.env.React_App_API_KEY}`)
                setCity(city.data[0]?.name)
            }
            catch (err) {
                // if error occured we get back modal
                setSearch(false)

                setError({
                    show: true,
                    title: err.response.statusText,
                    message: err.response.data.message
                })
            }

            if (!city) return;

            if (city?.data.length) {

                /**
                 * if we found the city
                 */

                let forecast;
                /**
                 * now we want to provide city's lat and lng and get the forecast back
                 */
                try {
                    forecast = await axios
                        .get(`https://api.openweathermap.org/data/2.5/onecall?lat=${city.data[0].lat}&lon=${city.data[0].lon}&exclude=hourly,minutely&units=metric&appid=${process.env.React_App_API_KEY}`)
                    console.log(forecast)

                }
                catch (err) {
                    // if error occured we get back modal
                    setSearch(false)
                    setError({
                        show: true,
                        title: err.response.statusText,
                        message: err.response.data.message
                    })
                }

                if (!forecast) return

                setForecast(forecast.data)

                averagetemperature(forecast.data);
            }
            else {
                /**
                 * if city wasn't found we get back modal to the user so he knows what is going on
                 */
                setError({
                    show: true,
                    title: "No city",
                    message: "No city was found, please try with another one"
                })
                setValues({
                    ...values,
                    city: ''
                })

                dispatch(changeBgColor(null))
                setForecast(null)
            }
            setSearch(false)
        }
        console.log(values)
    }



    return <>
        {error.show && <Modal
            show={error.show}
            title={error.title}
            message={error.message}
            handleOkClick={handleModalClick}
        />}


        <h1 className='title'>Weather Forecast</h1>

        <main className='weather-container'>
            <form onSubmit={handleSubmit}>

                <Card className="flex">
                    <div className="weather-icon">
                        <img alt="weather icon" src={weatherIcon} />
                    </div>
                    <Dropdown
                        handleChange={(value) => setValues(
                            {
                                ...values,
                                country: value
                            }
                        )}
                        options={options}
                    />
                    <Input
                        search={search}
                        value={values.city}
                        placeholder="Please enter your location..."
                        handleSearchClicked={(e) => handleSubmit(e)}
                        handleChange={(value) => {
                            setValues({
                                ...values,
                                city: value
                            })
                        }}
                    />
                </Card>
            </form>

            {forecast && <div className='forecast-container'>

                <h2 className='forecast-city'>{city}</h2>

                <div className='date'>
                    {
                        moment(moment.unix(forecast.current.dt).toDate()).format('MMM D - YYYY').toUpperCase()
                    }
                </div>
                <div className='current-temperature'>
                    <h1> {temperature} </h1>
                    <span className="superscript">°C</span>
                </div>

                <div className='seven-day-forecast'>

                    {forecast.daily.map((item, index) => index !== 0 &&
                        <div key={index} className='seven-day-forecast__item'>
                            <p className='seven-day-forecast__item-day'> <b>
                                {weekdays[moment.unix(item.dt).toDate().getDay()]}
                            </b></p>
                            <h4 className='seven-day-forecast__item-temperature'>
                                {Math.round(item.temp.day)}
                                <sup className='superscript'>°C</sup>
                            </h4>
                        </div>)}

                </div>

            </div>

            }
        </main>
    </>
}
