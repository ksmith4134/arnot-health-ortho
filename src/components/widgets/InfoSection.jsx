import React from 'react'
import TitleBlock from '../Shared/TitleBlock'
import Carousel from '../Carousel'
import Video from '../Video'
import DownloadRow from './DownloadRow'
import { SECTION_BG_COLORS } from '../Theme' 

export default function InfoSection(props) {

    const {
        background = 'white',
        topMargin = '',
        title = 'Lorem ipsum title',
        subTitle = 'Im a little subtitle boy',
        content = [
            {id: 0, title: '', description: '', videoUrl: '', image: '', asset: { component: 'Button', label: 'Contact Us', url: '/contact' }}
        ],
        downloads = null,
        openModal,
    } = props

    const backgroundColor = SECTION_BG_COLORS[background]

    return (
        <section className={`${backgroundColor} pt-24 pb-36`}>
            <div className='max-w-5xl px-8 mx-auto'>
                <TitleBlock title={title} subTitle={subTitle} />
                <div className='mt-24'>
                    <Carousel length={content.length} controlsMargin={'large'}>
                        {content.map(item => (
                            <Video 
                                key={item.id}
                                title={item.title}
                                description={item.description}
                                videoUrl={item.videoUrl} 
                                image={item.image}
                                asset={item.asset}
                                handleClick={openModal}
                            />
                        ))}
                    </Carousel>
                </div>
                { downloads && 
                    <div className='mt-24'>
                        <DownloadRow downloads={downloads} />
                    </div>
                }
            </div>
        </section>
    )
}
