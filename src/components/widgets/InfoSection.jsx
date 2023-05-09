import React from 'react'
import TitleBlock from '../Shared/TitleBlock'
import Carousel from '../Carousel'
import Video from '../Video'
import DownloadRow from './DownloadRow'
import { SECTION_BG_COLORS } from '../Theme' 

export default function InfoSection(props) {

    const {
        background = 'white',
        title = 'Lorem ipsum title',
        subTitle = 'Im a little subtitle boy',
        content = [
            {id: 0, title: '', description: '', videoUrl: '', image: '', asset: { component: 'Button', label: 'Contact Us', url: '/contact' }}
        ],
        downloads = [
            {id: 0, title: 'Example Download 1', url: '/'},
            {id: 1, title: 'Example Download 2', url: '/'},
            {id: 2, title: 'Example Download 3', url: '/'},
            {id: 3, title: 'Example Download 4', url: '/'},
        ],
        openModal,
    } = props

    const backgroundColor = SECTION_BG_COLORS[background]

    return (
        <div className={`${backgroundColor} py-24`}>
            <div className='max-w-5xl px-8 mx-auto'>
                <TitleBlock title={title} subTitle={subTitle} />
                <div className='mt-20'>
                    <Carousel length={content.length}>
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
                    <div className='mt-20'>
                        <DownloadRow downloads={downloads} />
                    </div>
                }
            </div>
        </div>
    )
}
