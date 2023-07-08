import LinkList from './LinkList'
import DownloadList from './DownloadList'

export default function Resource(props) {

    const {
        label,
        content
    } = props

    const renderComponent = (content) => {
        switch (content?.component) {
            case 'LinkList':
                return (
                    <LinkList links={content.links} />
                )
            case 'DownloadList':
                return (
                    <DownloadList downloads={content.downloads} />
                )
            default:
                break;
        }
    }

    return (
        <div>
            <h2 className='text-2xl'>{ label }</h2>
            { renderComponent(content[0]) }
        </div>
    )
}
