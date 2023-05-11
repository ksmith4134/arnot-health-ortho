import Download from '../Download'

export default function DownloadRow(props) {

    const {
        downloads = [],
    } = props

    return (
        <div className='flex flex-row flex-wrap justify-between'>
            {downloads.map(item => (
                <Download
                    key={item.id}
                    title={item.title} 
                    download={item.url}
                />
            ))}
        </div>
    )
}
