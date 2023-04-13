import React from 'react'

export default function Prose(props) {

    const { richText } = props
    
    return (
        <article className='prose max-w-none prose-sm' dangerouslySetInnerHTML={{__html:richText}}></article>
    )
}
