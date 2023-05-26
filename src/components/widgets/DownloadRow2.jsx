import Download from '../Download'
import { ICONS } from '../Theme'
import { useRouter } from 'next/router'
import Link from 'next/link'

export default function DownloadRow2(props) {

    const {
        downloads = [],
    } = props

    const router = useRouter()

    const PdfIcon = ICONS['pdf']

    return (
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8'>
            {downloads.map(download => (
                <div key={download.id} className='border border-arnotRed/30 bg-white rounded-lg p-4 hover:cursor-pointer hover:bg-arnotRed/5'>
                    <Link href={download ? download.url : router.asPath} target='_blank' className='text-arnotRed'>
                        <PdfIcon className='text-red-500 text-4xl' />
                        <p className='mt-4'>{download.title}</p>
                    </Link>
                </div>
            ))}
        </div>
    )
}
