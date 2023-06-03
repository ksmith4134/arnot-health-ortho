import React from 'react'
import { useState } from 'react'
import ProfilePic from '../ProfilePic'
import IconImage from '../Shared/IconImage'
import FiveStars from '../Shared/FiveStars'
import TestimonialsContent from '../widgets/TestimonialsContent'
import TitleBlock from '../Shared/TitleBlock'

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
        <div className='max-w-5xl px-8 mx-auto py-24'>
            <TitleBlock title={title} />
            <div className='mt-24 flex flex-col md:flex-row md:items-start md:space-x-6'>
                {/* Profile Pics */}
                <div className='order-1 md:basis-5/12 flex-none'>
                    {
                        testimonials.map((item, index) => (
                            <div key={item.id} className='last:mb-0 mb-6 md:w-[320px] lg:w-[360px]'>
                                <div 
                                    className={`
                                        flex flex-row items-center space-x-4 px-6 py-4
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
                {/* Testimonial */}
                <div className='order-2 basis-8/12 hidden md:block border rounded-lg p-8'>
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
        </div>
    )
}
