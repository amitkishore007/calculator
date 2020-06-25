import React from 'react'
import Button from '../ui-box/Button/Button';
import { NUMPAD_BUTTONS } from '../../constants/Operators';

export default function NumPad({click}) {
    return (
        <div className="NumPad">
            { NUMPAD_BUTTONS.map((btn) => {
                return <Button key={btn.key} click={() => click(btn) }>{btn.key}</Button>
            }) }
        </div>
    )
}
