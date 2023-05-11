import React from 'react'
import Download from './Download'

export default function DownloadList(props) {

    const {
        accordion = false,
        downloads = []
    } = props

    return (
        <div className={`grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-4 mt-4 ${accordion && 'mb-8'}`}>
            { downloads.map((download) => (
                <Download key={download.id} title={download.title} download={download.download} fontSize={'small'} />
            ))}
        </div>
    )
}