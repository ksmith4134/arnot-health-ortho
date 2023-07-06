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
import { RxArrowRight } from 'react-icons/rx'
import Link from 'next/link'

export default function GridLayoutVideo(props) {

    const {
        icon = '',
        kicker = null,
        title = '', 
        subTitle = '',
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
                    <div className='md:basis-1/2'>
                        <div className='flex-grow border rounded-md px-8 py-10 flex flex-col justify-center items-start w-full h-full  shadow-md shadow-slate-50'>
                            <TitleBlock alignBlock={'left'} icon={'hospital'} kicker={['Hospital Tour Video']} subTitle={'In this video, Dr. Jared Smith and Dr. Bryan Jarvis provide a tour of what to expect when coming to Arnot Ogden Medical Center for orthopedic same-day surgery.'} subTitleSize={'medium'} />
                            <button onClick={() => openModal(url)} className='mt-8 text-md text-arnotBlue flex justify-center items-center group transition ease-in-out duration-300'>
                                <div>Watch Video</div>
                                <RxArrowRight className='text-xl ml-2 group-hover:translate-x-1 transition ease-in-out duration-300' />
                            </button>
                        </div>
                    </div>
                    <div className='flex-shrink-0 md:basis-1/2'>
                        {/* <div className='flex flex-col gap-8 h-full'> */}
                            <div className='flex-shrink border border-transparent shadow-lg shadow-slate-50'>
                                <VideoFullWidth url={url} videoThumbnail={image} openModal={openModal} />
                            </div>
                            
                        {/* </div> */}

                    </div>
                    
                </div>

                { downloads && 
                    <div className='mt-8 p-8 border rounded-md shadow-md shadow-slate-50'>
                        <div className='mb-8 flex flex-wrap justify-between items-center gap-4'>
                            <div className='uppercase text-arnotRed text-sm font-bold'>
                                Common Resources
                            </div>
                            <ButtonPrimary label={'See All Resources'} url={'/all-resources'} type={'tertiary'} />
                            {/* <Link href={'/all-resources'} className='mr-1 text-sm md:text-md text-arnotBlue md:text-black md:hover:text-arnotBlue flex justify-center items-center group transition-all ease-in-out duration-300'>
                                <div>See All Resources</div>
                                <RxArrowRight className='text-lg md:text-xl ml-2 group-hover:translate-x-1 transition-all ease-in-out duration-300' />
                            </Link> */}
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
