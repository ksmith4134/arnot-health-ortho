import React from 'react'
import TitleBlock from '../Shared/TitleBlock'
import Carousel from '../Carousel'
import Video from '../Video'
import DownloadRow from './DownloadRow'
import { SECTION_BG_COLORS, ICONS, BODY_ICONS } from '../Theme' 
import Image from 'next/image'
import DownloadRow2 from './DownloadRow2'

export default function CardSection(props) {

    const {
        background = 'white',
        topMargin = '',
        title = 'Lorem ipsum title',
        subTitle = 'Im a little subtitle boy',
        videoUrl = '',
        videoThumbnail = '',
        downloads = null,
        openModal,
    } = props

    const playButton = ICONS['play']

    return (
        <section className={`pt-0 pb-36 bg-gradient-to-b from-slate-50 to-white`}>
            <div className='max-w-5xl px-8 mx-auto'>
                <TitleBlock title={title} subTitle={subTitle} alignBlock={'left'} />   
                <div className='mt-16'>
                    <div onClick={() => openModal(videoUrl)} className='max-w-full mx-auto aspect-video relative overflow-hidden rounded-lg group hover:cursor-pointer'>
                        <Image 
                            src={videoThumbnail} alt='video thumbnail'
                            fill={true}
                            className='object-cover brightness-125 group-hover:scale-105 transition ease-in-out duration-500' 
                        />
                        <div className='absolute top-0 bottom-0 left-0 right-0 flex justify-center items-center'>
                            <Image 
                                src={playButton} alt='play button'
                                className='w-24 h-24 lg:w-36 lg:h-36 lg:opacity-80 group-hover:opacity-100 transition ease-in-out duration-500 bg-white/30 rounded-full' 
                            />
                        </div>
                    </div>
                </div>
                { downloads && 
                    <div className='mt-16'>
                        {/* <DownloadRow downloads={downloads} /> */}
                        <DownloadRow2 downloads={downloads} />
                    </div>
                }
            </div>
        </section>
    )
}
