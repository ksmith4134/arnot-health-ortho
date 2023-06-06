import TitleBlock from '../Shared/TitleBlock'
import Carousel from '../Carousel'
import Video from '../Video'
import DownloadRow2 from './DownloadRow2'
import LinkRow from './LinkRow'
import { BG_COLORS } from '../Theme'
import IconImage from '../Shared/IconImage'
import VideoFullWidth from '../VideoFullWidth'
import ButtonPrimary from '../Shared/ButtonPrimary'
import { FaHospitalSymbol } from 'react-icons/fa'

export default function InfoSection2(props) {

    const {
        title = '', 
        subTitle = '', 
        blockTitle = 'All Resources', 
        blockSubTitle = 'If you know exactly which download or link you\'re looking for, checkout our full list of resources on the All Resources page. Here you\'ll find physical therapy protocols, discharge instructions, and much more.', 
        url = 'https://www.youtube.com/embed/x_1UusZhMFM',
        image = '',
        downloads = null,
        body = null,
        openModal,
    } = props

    return (
        <section className={`py-24`}>
            <div className='max-w-6xl px-8 mx-auto'>

                <TitleBlock title={title} subTitle={subTitle} />

                <div className='mt-16 grid md:grid-rows-2 md:grid-flow-col gap-8'>
                    <div className='md:row-span-2 md:col-span-3 border rounded-md p-10 flex flex-col justify-center shadow-lg shadow-slate-50'>
                        <TitleBlock
                            alignBlock={'left'}
                            title={blockTitle}
                            subTitle={blockSubTitle}
                        />
                        <div className='mt-8'>
                            <ButtonPrimary label={'See All Downloads'} url={'/all-resources'} type={'secondary'} />
                        </div>
                    </div>
                    <div className='shadow-lg shadow-slate-50'>
                        <VideoFullWidth url={url} videoThumbnail={image} openModal={openModal} />
                    </div>
                    <div className='border rounded-md p-6 flex flex-col justify-center shadow-lg shadow-slate-50'>
                        <div className='flex items-center space-x-2'>
                            <FaHospitalSymbol className='text-2xl text-arnotBlue'/>
                            <h4 className='text-arnotBlue text-sm font-semibold'>Hospital Tour</h4>
                        </div>
                        <p className='mt-4 text-sm'>In this video, Dr. Jared Smith and Dr. Bryan Jarvis provide a tour of what to expect when coming to Arnot Ogden Medical Center for orthopedic same-day surgery.</p>
                    </div>
                </div>

                { downloads && 
                    <div className='mt-8'>
                        <DownloadRow2 downloads={downloads} />
                    </div>
                }
                { body && 
                    <div className='mt-8'>
                        <LinkRow />
                    </div>
                }
            </div>
        </section>
    )
}
