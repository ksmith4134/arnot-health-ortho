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

export default function GridLayoutVideo(props) {

    const {
        icon = '',
        kicker = null,
        title = '', 
        subTitle = '', 
        blockTitle = '', 
        blockSubTitle = 'If you know exactly which download or link you\'re looking for, checkout our full list of resources on the All Resources page. Here you\'ll find physical therapy protocols, discharge instructions, and much more.', 
        url = 'https://www.youtube.com/embed/x_1UusZhMFM',
        image = '/Same Day Surgery Tour.jpg',
        downloads = null,
        body = null,
        openModal,
    } = props

    return (
        <section className={`py-24`}>
            <div className='max-w-6xl px-8 mx-auto'>

                <TitleBlock title={title} subTitle={subTitle} />

                <div className='mt-16 flex flex-col md:flex-row gap-8 w-full'>
                    <div className='md:basis-8/12'>
                        <div className='border rounded-md p-10 flex flex-col justify-center shadow-lg shadow-slate-50 w-full h-full'>
                            <TitleBlock
                                alignBlock={'left'}
                                icon={'book'}
                                iconColor={'primary'}
                                kicker={['Professional Resources']} 
                                title={blockTitle}
                                subTitle={blockSubTitle}
                            />
                            <div className='mt-8'>
                                <ButtonPrimary label={'See All Downloads'} url={'/all-resources'} type={'secondary'} />
                            </div>
                        </div>
                    </div>
                    <div className='flex-shrink-0 md:basis-4/12'>
                        <div className='flex flex-col gap-8 h-full'>
                            <div className='flex-shrink shadow-lg shadow-slate-50'>
                                <VideoFullWidth url={url} videoThumbnail={image} openModal={openModal} />
                            </div>
                            <div className='flex-grow border rounded-md p-6 flex flex-col justify-center shadow-lg shadow-slate-50'>
                                <div className='flex items-center space-x-2 text-arnotBlue'>
                                    <FaHospitalSymbol className='text-2xl'/>
                                    <h4 className='text-sm font-semibold'>Hospital Tour Video</h4>
                                </div>
                                <p className='mt-4 text-sm'>In this video, Dr. Jared Smith and Dr. Bryan Jarvis provide a tour of what to expect when coming to Arnot Ogden Medical Center for orthopedic same-day surgery.</p>
                            </div>
                        </div>

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
