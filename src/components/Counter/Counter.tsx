import React, {useEffect, useState} from 'react';
import {Button} from "../Button/Button";

type ContainerCounterType = {
    startValue: number;
    maxValue: number;
    error: boolean;
    isValueChanged: boolean;
    isSettingsVisible: boolean;
    setIsSettingsVisible: (isSettingsVisible: boolean) => void;
}

export const Counter = (props: ContainerCounterType) => {

    const [startValue, setStartValue] = useState<number>(props.startValue);
    const [maxValue, setMaxValue] = useState<number>(props.maxValue);


    const incrementValue = () => {
        if (startValue < maxValue) {
            setStartValue(startValue + 1);
        }
    }

    const resetValue = () => {
        setStartValue(props.startValue);
    }

    useEffect(() => {
        setStartValue(props.startValue);
        setMaxValue(props.maxValue);
        if (props.startValue >= 0 && props.startValue < props.maxValue && props.maxValue > 0) {
        } else {
        }
    }, [props.startValue, props.maxValue]);

    const setValueHandler = () => {
        localStorage.setItem('startValue', JSON.stringify(startValue))
        localStorage.setItem('maxValue', JSON.stringify(maxValue))
        props.setIsSettingsVisible(true);
    }

    return (
        <div className={'container'}>
            <div className={'containerNumber'}>
                {props.error ? (
                    <span className={'error-message'}>Incorrect value!</span>
                ) : props.isValueChanged ? (
                    <span className={'change-message'}>enter values and press "set"</span>
                ) : (
                    <span className={startValue === maxValue ? 'max-value' : 'value'}>{startValue}</span>
                )}
            </div>
            <div className={'containerButton'}>
                <Button onClick={incrementValue} title={'inc'}
                        disabled={startValue === maxValue || props.error}></Button>
                <Button onClick={resetValue} title={'reset'} disabled={startValue === 0 || props.error}></Button>
                <Button onClick={setValueHandler} title={'set'} disabled={startValue === 0 || props.error}></Button>
            </div>
        </div>
    );
};

