import React, { Component } from 'react'
import Result from '../Components/Result/Result';
import NumPad from '../Components/NumPad/NumPad';
import { OPERATORS, isOperator, ZERO } from '../constants/Operators';


export default class Calculator extends Component {

    state = {
        result: null,
        operations: [],
        allowedDecimal: true
    }

    doAction = (action) => {
        switch (action.key) {
            case OPERATORS.PLUS:
            case OPERATORS.MINUS:
            case OPERATORS.MULTIPLY: 
            case OPERATORS.DIVISION:
                return this.addOperator(action.key);

            case OPERATORS.EQUAL:
                return this.calculate();
            
            case OPERATORS.DECIMAL: 
                return this.addDecimal(action.key);
            
            case ZERO: 
                return this.addZero(action.key);
            
            case OPERATORS.CLEAR:
                return this.clear();

            default: 
                return this.addNumbers(action.key);
        }
    }

    addOperator = (key) => {
        const lastKey = this.lastKey();
        if (lastKey && !isOperator(lastKey) && lastKey[lastKey.length - 1] !== OPERATORS.DECIMAL) {
            this.pushOperator(key);
        }
    }

    lastKey = () => {
        return this.state.operations[this.state.operations.length - 1];
    }

    pushOperator = (key) => {
        let operations = [...this.state.operations];
        operations.push(key + "");
        this.setState({ operations: operations, allowedDecimal: true});
    }

    clear = () => {
        this.setState({ operations:[], result:'', allowedDecimal: true});
    }

    addNumbers = (num) => {
        let lastKey = this.lastKey();

        if (!lastKey || isOperator(lastKey)) {

            this.pushOperator((num));
        
        } else if (!isOperator(lastKey)) {
        
            this.joinLastKey(num);
        }
    }

    joinLastKey = (key) => {
        const operations = [...this.state.operations];

        let last = operations.pop();

        const result = (last + "")  + (key + "");

        operations.push(result);

        this.setState({ operations: operations, allowedDecimal: true});
    }

    addZero = (key) => {
        
        let lastKey = this.lastKey();

        const operations = [...this.state.operations];

        if (isOperator(lastKey) || !lastKey) {
            operations.push(key);
        } else if (lastKey !== '0' || lastKey.length > 1) {
            operations[operations.length - 1] = operations[operations.length - 1] + key;
        }

        this.setState({ operations });
    }

    addDecimal = (key) => {
        let lastKey = this.lastKey();
        const operations = [...this.state.operations];

        if (lastKey && lastKey.length > 0 && 
            !lastKey.includes(OPERATORS.DECIMAL) && 
            this.state.allowedDecimal && 
            !isOperator(lastKey)) {
            operations[operations.length - 1] = operations[operations.length - 1] + key;
            this.setState({operations: operations, allowedDecimal: false});
        }
    }

    calculate = () => {

        let operations = [...this.state.operations];
        
        if(!operations.length) return false;

        let lastKey = this.lastKey();
        if(isOperator(lastKey)) {
           operations.pop();
        }

        if (lastKey[lastKey.length - 1] === '.') {
            operations[operations.length - 1] = operations[operations.length - 1].slice(0, -1);
            this.setState({allowedDecimal: true});
        }

        operations = this.performMultiplyDevide(operations);

        operations = this.performSumMinus(operations);

        if (operations[0] === 'NaN' || operations[0] === 'Infinity') {
             operations = ['0'];
        }
        
        let allowedDecimal = this.setState.allowedDecimal;
        if (operations[0].includes('.')) {
            allowedDecimal = false;
        }

        this.setState({ operations: [], result: operations.toString(), allowedDecimal: allowedDecimal});
    }

    performMultiplyDevide = (operations) => {
        while(operations.find((op) => op === OPERATORS.MULTIPLY) || operations.find((op) => op === OPERATORS.DIVISION)) {

            const first = operations.findIndex((val) => val === OPERATORS.MULTIPLY || val === OPERATORS.DIVISION);

            if(operations[first] === OPERATORS.MULTIPLY) {
                const result = Number(operations[first - 1]) * Number(operations[first + 1]);
                operations.splice(first -1, 3, result.toString());
            }

            if(operations[first] === OPERATORS.DIVISION) {
                const result = Number(operations[first - 1]) / Number(operations[first + 1]);
                operations.splice(first -1, 3, result.toString());
            }
        }

        return [...operations];
    }

    performSumMinus = (operations) => {
        while(operations.find((op) => op === OPERATORS.PLUS) || operations.find((op) => op === OPERATORS.MINUS)) {

            const first = operations.findIndex((val) => val === OPERATORS.PLUS || val === OPERATORS.MINUS);

            if(operations[first] === OPERATORS.PLUS) {
                const result = Number(operations[first - 1]) + Number(operations[first + 1]);
                operations.splice(first -1, 3, result.toString());
            }

            if(operations[first] === OPERATORS.MINUS) {
                const result = Number(operations[first - 1]) - Number(operations[first + 1]);
                operations.splice(first -1, 3, result.toString());
            }
        }

        return [...operations];
    }

    render() {
        return (
            <div className="Calculator">
                <h3>Calculator</h3>
                <Result result={this.state.result} operations={this.state.operations.join("")}/>
                <NumPad click={this.doAction}/>
            </div>
        )
    }
}
