import Image from 'next/image'
import Carousel from './Carousel'
import Prose from './Prose'

export default function Paragraph(props) {

    const { 
        media, 
        title = null, 
        richText 
    } = props

    return (
        <div className='flex flex-col md:block'>
            { title &&
                <h2 className='order-1 text-2xl mb-4'>{title}</h2>
            }
            { media &&  
                <div className='order-3'>
                    <Carousel length={media.length} float={true}>
                        {
                            media.map((assetUrl, index) => (
                                <Image key={index} src={assetUrl} width={900} height={600}  alt='carousel images' className={`mx-auto object-cover rounded-sm aspect-[3/2]`} priority />
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
