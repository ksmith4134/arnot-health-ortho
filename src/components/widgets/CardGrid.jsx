import TitleBlock from '../Shared/TitleBlock'
import DownloadRow from './DownloadRow'
import Section from '../Shared/Section'
import ButtonPrimary from '../Shared/ButtonPrimary'
import VideoCard from './VideoCard'
import Image from 'next/image'
import Carousel from '../Carousel'
import Video from '../Video'
import IconCards from './IconCards'

export default function CardGrid(props) {

    const {
        title = null, 
        subTitle = null,
        cardIcon = null,
        cardKicker = null,
        cardTitle = null,
        cardSubTitle,
        buttonLabel = null,
        videoUrl = null,
        openModal,
        image = null,
        downloads = null,
        logos = null,
        bodyLinks = false,
        carousel = null,
    } = props


    return (
        <Section>
            { title && 
                <TitleBlock title={title} subTitle={subTitle} />
            }
            <div className={`${title ? 'mt-16' : ''}`}>
                { videoUrl && 
                    <VideoCard
                        icon={cardIcon}
                        kicker={cardKicker}
                        title={cardTitle}
                        subTitle={cardSubTitle}
                        buttonLabel={buttonLabel}
                        videoUrl={videoUrl}
                        image={image}
                        openModal={openModal}
                    />
                }
                { carousel && 
                    <div className='p-8 border rounded-md shadow-md shadow-slate-50 flex flex-row items-center'>
                        <Carousel length={carousel.length} controlsMargin={'large'}>
                            { carousel.map(item => (
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
                }
                { downloads && 
                    <div className='mt-8 '>
                        <DownloadRow downloads={downloads} />
                        <div className='mt-16 flex justify-center'>
                            <ButtonPrimary label={'See All Resources'} url={'/all-resources'} type={'secondary'} />
                        </div>
                    </div>
                }
                { bodyLinks && 
                    <IconCards />
                }
                { logos && 
                    <div className='mt-8 p-8 border rounded-md flex gap-16 justify-center flex-wrap mx-auto shadow-md shadow-slate-50'>
                        { logos.map((img, index) => (
                            <div key={index} className='relative w-28 h-28 opacity-50 grayscale'>
                                <Image alt={'team logo'} src={img} fill={true} className='object-contain' />
                            </div>
                        ))}
                    </div>
                }
            </div>
        </Section>
    )
}
