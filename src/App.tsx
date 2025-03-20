import React, {useEffect, useState} from 'react';
import './App.css';
import {Values} from "./components/Container/Values";
import {Counter} from "./components/Counter/Counter";


function App() {


    const [startValue, setStartValue] = useState<number>(0);
    const [maxValue, setMaxValue] = useState<number>(5);
    const [error, setError] = useState(false);
    const [isValueChanged, setIsValueChanged] = useState(false);
    const [isSettingsVisible, setIsSettingsVisible] = useState(false);

    useEffect(() => {
        const storedStartValue = localStorage.getItem('startValue');
        const storedMaxValue = localStorage.getItem('maxValue');

        if (storedStartValue) setStartValue(JSON.parse(storedStartValue));
        if (storedMaxValue) setMaxValue(JSON.parse(storedMaxValue));
    }, []);

    const handleValuesChange = (newStartValue: number, newMaxValue: number) => {
        setStartValue(newStartValue);
        setMaxValue(newMaxValue);
    }

    const handleErrorChange = (error: boolean) => {
        setError(error);
    }

    return (
        <div className="App">
            {isSettingsVisible ?
                <Values
                    maxValueTitle={'max value:'}
                    startValueTitle={'start value:'}
                    handleValuesChange={handleValuesChange}
                    handleErrorChange={handleErrorChange}
                    setError={setError}
                    setIsValueChanged={setIsValueChanged}
                    setIsSettingsVisible={setIsSettingsVisible}
                    isSettingsVisible={isSettingsVisible}
                /> :
                <Counter
                    startValue={startValue}
                    maxValue={maxValue}
                    error={error}
                    isValueChanged={isValueChanged}
                    isSettingsVisible={isSettingsVisible}
                    setIsSettingsVisible={setIsSettingsVisible}
                />
            }


        </div>
    );
}

export default App;
