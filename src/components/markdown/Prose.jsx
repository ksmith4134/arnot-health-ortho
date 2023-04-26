import React from 'react'

export default function Prose(props) {

    const { richText, textSize = '' } = props
    
    return (
        <article className={`prose max-w-none ${textSize === 'medium' ? '' : 'prose-sm'}`} dangerouslySetInnerHTML={{__html:richText}}></article>
    )
}
