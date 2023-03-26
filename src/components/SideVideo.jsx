import React from 'react'

export default function SideVideo(props) {

    const {asset = {}, title = '', description = '', videoUrl = '', image = ''} = props
    // asset has a type (component), icon, url, and title

    return (
        <div className="mt-12">SideVideo Component: {title}</div>
    )
}
