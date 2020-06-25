export const OPERATORS = {
    PLUS: '+',
    MINUS: '-',
    EQUAL: '=',
    DIVISION: '/',
    MULTIPLY: '*',
    DECIMAL: '.',
    CLEAR: 'cls',
};

export const ZERO = '0';

export const isOperator = (op) => {
    let flag = false;
    Object.keys(OPERATORS).forEach((key) => {
        if(OPERATORS[key] === op) {
            flag = true;
        }
    });

    return flag;
}

export const NUMPAD_BUTTONS = [
    {key: 7 },
    {key: 8 },
    {key: 9 },
    {key: OPERATORS.MULTIPLY },
    {key: 4 },
    {key: 5 },
    {key: 6 },
    {key: OPERATORS.MINUS },
    {key: 1 },
    {key: 2 },
    {key: 3 },
    {key: OPERATORS.PLUS },
    {key: OPERATORS.DIVISION },
    {key: ZERO },
    {key: OPERATORS.DECIMAL },
    {key: OPERATORS.EQUAL },
    {key: OPERATORS.CLEAR },
];