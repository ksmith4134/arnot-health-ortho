import React from 'react'
import LinkList from './LinkList'
import DownloadList from './DownloadList'

export default function Resource(props) {

    const {
        id,
        label,
        content
    } = props

    // use getComponent to render content: LinksList, DownloadList

    return (
        <div>
            <h2 className='text-2xl'>{label}</h2>
            {
                content[0].component === 'LinkList' && <LinkList links={content[0].links} />
            }
            {
                content[0].component === 'DownloadList' && <DownloadList downloads={content[0].downloads} />
            }
        </div>
    )
}
