import React, {ChangeEvent, useState} from 'react';
import {Button} from "../Button/Button";

type ValuesType = {
    maxValueTitle?: string,
    startValueTitle?: string,
    showInputs?: boolean,
    handleValuesChange: (startValue: number, maxValue: number) => void,
    handleErrorChange: (error: boolean) => void,
    setError: (error: boolean) => void,
    setIsValueChanged: (isChanged: boolean) => void;
    isSettingsVisible: boolean;
    setIsSettingsVisible: (isSettingsVisible: boolean) => void;

}

export const Values = (props: ValuesType) => {

    const [startValue, setStartValue] = useState<number>(0);
    const [maxValue, setMaxValue] = useState<number>(5);
    const [isSetClicked, setIsSetClicked] = useState<boolean>(true);

    const setValueHandler = () => {
        localStorage.setItem('startValue', JSON.stringify(startValue))
        localStorage.setItem('maxValue', JSON.stringify(maxValue))
        props.handleValuesChange(startValue, maxValue);
        setIsSetClicked(true)
        props.setIsValueChanged(false);
        props.setIsSettingsVisible(false);
    }


    const changeMaxValueHandler = (e: ChangeEvent<HTMLInputElement>) => {
        const value = Number(e.target.value);
        setMaxValue(value);
        setIsSetClicked(false);
        props.setIsValueChanged(true)
        props.setIsSettingsVisible(true);
        if (value < 0 || value <= startValue) {
            props.setError(true);
            props.handleErrorChange(value === startValue || value < 0 || startValue < 0);
        } else {
            props.setError(false);
            props.handleErrorChange(false);
        }
    }


    const changeStartValueHandler = (e: ChangeEvent<HTMLInputElement>) => {
        const value = Number(e.target.value);
        setStartValue(value);
        setIsSetClicked(false);
        props.setIsValueChanged(true);
        props.setIsSettingsVisible(true);

        if (value < 0 || value >= maxValue) {
            props.setError(true);
            props.handleErrorChange(value === maxValue || value < 0 || maxValue < 0);
        } else {
            props.setError(false);
            props.handleErrorChange(false);
        }
    }

    return (
        <div className={'container'}>
            <div className={'containerValues'}>
                <div className={'input-group'}>
                    <span className={'value-title'}>{props.maxValueTitle}</span>
                    <input
                        className={maxValue === startValue ? 'error-input' : 'input'}
                        type="number"
                        value={maxValue}
                        step={1}
                        onChange={changeMaxValueHandler}/>
                </div>
                <div className={'input-group'}>
                    <span className={'value-title'}>{props.startValueTitle}</span>
                    <input
                        type="number"
                        value={startValue}
                        step={1}
                        onChange={changeStartValueHandler}
                        className={startValue < 0 || startValue === maxValue ? 'error-input' : 'input'}/>
                </div>
            </div>
            <div className={'containerButton'}>
                <Button disabled={startValue < 0 || startValue === maxValue || isSetClicked} title={'set'}
                        onClick={setValueHandler}></Button>
            </div>
        </div>
    );
};

