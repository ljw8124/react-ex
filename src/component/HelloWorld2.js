import React, {useState} from 'react';
import ShowName from "./ShowName2";
import Dice from "./Dice";

const initState = {value:1} //initState 초기상태 === 상수의 개념

const HelloWorld = () => {

    const name = "Hong Gil Dong"
    const [num, setNum] = useState(initState) //num 초기값 10, useState 함수를 통해서 변경할 것이다. 옵저버 패턴

    const display = () => {
        console.log("display")
    }

    const change = () => {

    }

    //컴포넌트는 독립적
    return (
        <div>
            <h1>Hello World!!!</h1>

            <ShowName name={name} num = {num}></ShowName>
            <button onClick={() => (setNum(num + 1))}>+1</button>
            <button onClick={() => (setNum(num - 1))}>-1</button>
        </div>
    );
};

export default HelloWorld;