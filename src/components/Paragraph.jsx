import React from 'react'

export default function Paragraph(props) {

    const { media, text } = props

    return (
        <div className="text-sm">Paragraph Component: {text}</div>
    )
}
