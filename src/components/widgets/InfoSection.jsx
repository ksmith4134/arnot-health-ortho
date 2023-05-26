import TitleBlock from '../Shared/TitleBlock'
import Carousel from '../Carousel'
import Video from '../Video'
import DownloadRow2 from './DownloadRow2'
import LinkRow from './LinkRow'

export default function InfoSection(props) {

    const {
        card = false,
        title = 'Lorem ipsum title',
        subTitle = 'Im a little subtitle boy',
        content = [
            {id: 0, title: '', description: '', videoUrl: '', image: '', asset: { component: 'Button', label: 'Contact Us', url: '/contact' }}
        ],
        downloads = null,
        body = null,
        openModal,
    } = props

    return (
        <section className={`bg-gradient-to-b from-slate-50 to-white pt-24 pb-36`}>
            <div className='max-w-5xl px-8 mx-auto'>
                <TitleBlock title={title} subTitle={subTitle} />
                <div className={`${card && 'border border-slate-300 rounded-lg p-12'} mt-20 flex flex-row items-center`}>
                    <Carousel length={content.length} controlsMargin={'large'}>
                        { content.map(item => (
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
                    <div className='mt-8'>
                        <DownloadRow2 downloads={downloads} />
                    </div>
                }
                { body && 
                    <div className='mt-8'>
                        <LinkRow body={body} />
                    </div>
                }
            </div>
        </section>
    )
}
