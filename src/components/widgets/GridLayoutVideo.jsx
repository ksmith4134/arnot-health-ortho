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
        blockSubTitle = 'Know exactly what you\'re looking for? Click the link below to see a list of all downloadable resources, including: physical therapy protocols, discharge instructions, pre- and post-op care instructions, and more...', 
        url = 'https://www.youtube.com/embed/x_1UusZhMFM',
        image = '/AOMC-2.jpg',
        downloads = null,
        body = null,
        openModal,
    } = props

    return (
        <section className={`py-24`}>
            <div className='max-w-6xl px-8 mx-auto'>

                <TitleBlock title={title} subTitle={subTitle} />

                <div className='mt-20 flex flex-col md:flex-row gap-8 w-full'>
                    <div className='md:basis-7/12'>
                        <div className='border rounded-md p-10 flex flex-col justify-center shadow-lg shadow-slate-50 w-full h-full'>
                            <TitleBlock
                                alignBlock={'left'}
                                icon={'book'}
                                // iconColor={'primary'}
                                kicker={['Professional Resources']} 
                                title={blockTitle}
                                subTitle={blockSubTitle}
                            />
                            <div className='mt-8'>
                                <ButtonPrimary label={'See All Downloads'} url={'/all-resources'} type={'secondary'} />
                            </div>
                        </div>
                    </div>
                    <div className='flex-shrink-0 md:basis-5/12'>
                        <div className='flex flex-col gap-8 h-full'>
                            <div className='flex-shrink border border-transparent shadow-lg shadow-slate-50'>
                                <VideoFullWidth url={url} videoThumbnail={image} openModal={openModal} />
                            </div>
                            <div onClick={() => openModal(url)} className='flex-grow border border-slate-100 rounded-md p-8 flex flex-col justify-center bg-slate-100 hover:bg-slate-100 hover:cursor-pointer'>
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
                    <div className='mt-8 p-8 border rounded-md'>
                        <div className='mb-8 uppercase text-arnotRed text-sm font-bold'>
                            Common Downloads
                        </div>
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
