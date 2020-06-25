import React from 'react'
import TextArea from '../ui-box/TextArea/TextArea';

export default function Result(props) {
    return (
        <div className="Result">
            { <p>={props.result}</p>}
            <TextArea value={props.operations} />
        </div>
    )
}
