import Carousel from './Carousel'
import Image from 'next/image'

export default function ImageCarousel(props) {

    const {
        media,
        title,
    } = props

    return (
        <div>
            { title &&
                <h2 className='text-2xl mb-4'>{title}</h2>
            }
            { media && 
                <Carousel length={media.length} float={false}>
                    {
                        media.map((assetUrl, index) => (
                            <Image key={index} src={assetUrl} width={900} height={600}  alt='carousel images' className={`object-cover mx-auto rounded-sm aspect-[3/2]`} />
                        ))
                    }
                </Carousel>
            }
        </div>
    )
}
