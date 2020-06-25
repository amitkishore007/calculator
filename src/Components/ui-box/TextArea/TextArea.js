import React from 'react'

export default function TextArea(props) {
    return (
        <textarea readOnly value={props.value}></textarea>
    );
}
