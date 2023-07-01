import Image from 'next/image'
import Carousel from './Carousel'
import Prose from './markdown/Prose'

export default function Paragraph(props) {

    const { 
        id,
        accordion = false,
        media, 
        title = null, 
        richText 
    } = props

    return (
        <div className={`flex flex-col ${accordion ? 'flex flex-col my-6' : 'md:block'}`}>
            { title &&
                <h2 className='order-1 text-2xl mb-6'>{title}</h2>
            }
            { media &&  
                <div className='order-3 mt-8 md:mt-0'>
                    <Carousel length={media.length} float={accordion ? false : true}>
                        {
                            media.map((assetUrl, index) => (
                                <Image key={index} src={assetUrl} width={900} height={600} alt='carousel images' className={`mx-auto object-cover rounded-sm aspect-[3/2]`} priority={true} />
                            ))
                        }
                    </Carousel>
                </div>
            }
            <div className='order-2'>
                <div className='first:mt-0 mt-4'>
                    <Prose richText={richText} />
                </div>
            </div>
        </div>
    )
}
