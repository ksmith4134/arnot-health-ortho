import TitleBlock from '../Shared/TitleBlock'
import Carousel from '../Carousel'
import Video from '../Video'
import DownloadRow2 from './DownloadRow2'
import LinkRow from './LinkRow'
import { BG_COLORS } from '../Theme'

export default function InfoSection(props) {

    const {
        background = 'white',
        card = false,
        titleSize = '',
        title = '',
        subTitle = '',
        content = [
            {id: 0, title: '', description: '', videoUrl: '', image: '', asset: { component: 'Button', label: 'Contact Us', url: '/contact' }}
        ],
        downloads = null,
        body = null,
        openModal,
    } = props

    return (
        <section className={`${BG_COLORS[background]} py-24`}>
            <div className='max-w-6xl px-8 mx-auto'>
                <TitleBlock title={title} subTitle={subTitle} />
                <div className={`${card && 'bg-white border rounded-md p-12 shadow-lg shadow-gray-50'} mt-20 flex flex-row items-center`}>
                    <Carousel length={content.length} controlsMargin={'large'}>
                        { content.map(item => (
                            <Video 
                                key={item.id}
                                titleSize={titleSize}
                                title={item.title}
                                description={item.description}
                                videoUrl={item.videoUrl} 
                                image={item.image}
                                // asset={item.asset}
                                handleClick={openModal}
                            />
                        ))}
                    </Carousel>
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
