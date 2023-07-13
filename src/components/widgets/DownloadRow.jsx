import { ICONS } from '../Theme'
import { useRouter } from 'next/router'

export default function DownloadRow(props) {

    const {
        downloads = [],
    } = props

    const router = useRouter()

    const PdfIcon = ICONS['pdf']

    return (
        <div className='grid grid-cols-2 md:grid-cols-4 gap-8'>
            {downloads.map(download => (
                <button key={download.id} className='min-h-[144px] border rounded-md p-8 hover:cursor-pointer hover:border-arnotRed/10 hover:bg-arnotRed/5'>
                    <a href={download ? download.url : router.asPath} target='_blank' rel="noopener noreferrer" className='text-left'>
                        <PdfIcon className='text-red-500 text-4xl' />
                        <p className='mt-4 text-md text-arnotRed'>{download.title}</p>
                    </a>
                </button>
            ))}
        </div>
    )
}
