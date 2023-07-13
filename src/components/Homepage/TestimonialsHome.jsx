import { useState } from 'react'
import ProfilePic from '../ProfilePic'
import { TestimonialsContent } from '../widgets/Testimonials'
import TitleBlock from '../Shared/TitleBlock'
import Section from '../Shared/Section'

export default function TestimonialsHome(props) {

    const {
        testimonials = [],
        title = '',
    } = props

    const [ selected, setSelected ] = useState(0)
    const [ hovered, setHovered ] = useState(null)

    const handleHover = (index) => {
        setHovered(index)
    }

    const handleClick = (index) => {
        setSelected(index)
    }

    return (
        <div id='highlight-reviews'>
            <Section>
                <TitleBlock title={title} />
                <div className='mt-24 flex flex-col md:flex-row md:items-start md:gap-12'>
                    {/* Profile Pics */}
                    <div className='order-1 md:basis-4/12 flex-none'>
                        {
                            testimonials.map((item, index) => (
                                <div key={item.id} className='last:mb-0 mb-6 md:w-[320px] lg:w-[360px]'>
                                    <div 
                                        className={`
                                            flex flex-row items-center gap-4 px-6 py-4
                                            ${selected === index || hovered === index ? 
                                                'cursor-pointer text-arnotBlue grayscale-0 border rounded-lg' : 
                                                'text-gray-500 grayscale opacity-50 border border-white'
                                            }
                                            ${selected === index ? 'bg-slate-50' : 'bg-white'}
                                        `} 
                                        onMouseEnter={() => handleHover(index)} 
                                        onMouseLeave={() => handleHover(null)}
                                        onClick={() => handleClick(index)}
                                    >
                                        <ProfilePic url={item.profilePic} size={'small'} />
                                        <div>
                                            <p className='font-bold text-lg'>Dr. {item.doctor}</p>
                                            <p className='text-md'>{item.condition}</p>
                                        </div>
                                    </div>
                                    {/* MOBILE */}
                                    <div className='block md:hidden'>
                                        <div className={`${selected === index ? 'block' : 'hidden'}`}>
                                            {
                                                testimonials.map((item, index) => (
                                                    <div key={item.id} className={`mt-6 mb-6 border rounded-lg p-6 ${selected === index ? 'block' : 'hidden'}`}>
                                                        <TestimonialsContent 
                                                            title={item.reviewTitle}
                                                            body={item.reviewBody}
                                                            bodyPart={item.bodyPart}
                                                            name={item.reviewerName}
                                                            city={item.city}
                                                            state={item.state}
                                                        />
                                                    </div>
                                                ))
                                            }
                                        </div>
                                    </div>
                                </div>
                            ))
                        }
                    </div>
                    {/* DESKTOP */}
                    <div className='order-2 basis-8/12 hidden md:flex items-center border rounded-lg p-8 md:min-h-[360px]'>
                        {
                            testimonials.map((item, index) => (
                                <div key={item.id} className={`${selected === index ? 'block' : 'hidden'}`}>
                                    <TestimonialsContent 
                                        title={item.reviewTitle}
                                        body={item.reviewBody}
                                        bodyPart={item.bodyPart}
                                        name={item.reviewerName}
                                        city={item.city}
                                        state={item.state}
                                    />
                                </div>
                            ))
                        }
                    </div>
                </div>
            </Section>
        </div>
    )
}
