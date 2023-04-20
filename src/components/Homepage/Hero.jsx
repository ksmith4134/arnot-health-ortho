import Image from 'next/image'
import ButtonPrimary from '../Shared/ButtonPrimary'
import CarouselWrapper from '../CarouselWrapper'
import TitleBlock from '../Shared/TitleBlock'

export default function Hero(props) {
    
    const {
        icon = '',
        kicker = [],
        title = '',
        subTitle = '',
        buttonLabel = 'Find My Condition',
        image = '/HeroTest.jpg',
        media = [],
        carousel= false,
        url = '#body-diagram'
    } = props

    return (
        <div className='relative overflow-hidden w-full h-[660px] bg-gray-200 shadow-lg shadow-slate-400/10'>
            
            {/* Image */}
            <div className='absolute right-0 w-3/4 h-full z-0 opacity-50 md:opacity-100'>
                { media.length > 0
                    ? <CarouselWrapper media={media} hero={carousel} />
                    : <Image src={image} alt="hero image" fill quality={100} priority className='object-cover' />
                }
            </div>

            {/* White Gradient */}
            <div className='absolute left-0 top-0 w-9/12 h-full z-10 bg-gradient-to-r from-white via-white ...'></div>

            {/* Text and Button */}
            <div className='max-w-5xl h-full mx-auto px-8 flex justify-start items-center'>
                <div className='z-20'>
                    <TitleBlock
                        alignBlock={'left'}
                        kicker={kicker}
                        title={title}
                        subTitle={subTitle}
                    />
                    <ButtonPrimary label={buttonLabel} url={url} />
                </div>
            </div>

        </div>
    )
}