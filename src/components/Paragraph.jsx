import React from 'react'
import CarouselSmall from './CarouselSmall'

export default function Paragraph(props) {

    const { media = null, text } = props

    return (
        <div className="">
            { media && <CarouselSmall media={media} /> }
            <p className="text-sm">{text}</p>
        </div>
    )
}
