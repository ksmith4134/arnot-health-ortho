import Image from 'next/image'
import Carousel from './Carousel'

export default function Paragraph(props) {

    const { media, text } = props

    return (
        <div className="flex flex-col md:block">
            { media &&  
                <Carousel length={media.length} float={true}>
                    {
                        media.map((assetUrl, index) => (
                            <Image key={index} src={assetUrl} width={900} height={600} cover alt="carousel images" className={`mx-auto rounded-sm aspect-[3/2]`} priority />
                        ))
                    }
                </Carousel>
            }
            <div>
                {
                    text && text.map((paragraph, index) => (
                        <p key={index} className="order-1 first:mt-0 mt-4 text-sm">{paragraph}</p>
                    ))
                }
            </div>
        </div>
    )
}
