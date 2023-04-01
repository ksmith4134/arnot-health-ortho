import Accordion from '../Accordion'
import { useState, useEffect } from 'react'
import Image from 'next/image'
import skeletonImg from '../../../public/skeleton_1_No Background.png'
import { BG_COLORS, SKELETON_LOCATIONS, SKELETON_BG, SKELETON_BORDER } from '../Theme'

export default function Body(props) {

    const {
        kicker = 'Patient Resources',
        title = 'Learn About Your Treatment',
        subTitle = 'Click on the dropdown menus below or the highlighted areas of the skeleton to access information about your othropedic procedure.',
        conditionCategories = [
            { id: 0, label: 'All Treatments', theme: 'primary', filter: false},
            { id: 1, label: 'Arthritis & Joint Replacement', theme: 'secondary', filter: true},
        ],
        accordion,
    } = props

    const [ selected, setSelected ] = useState(0)
    const [ filteredAccordion, setFilteredAccordion ] = useState(accordion)
    const [ skeleton, setSkeleton ] = useState(null)

    const handleClick = (id) => {
        setSelected(id)
    }

    useEffect(() => {
        let updateAccordion = accordion.map((item) => {
            return {
                id: item.id,
                label: item.label,
                contents: conditionCategories[selected].filter === true ? item.contents.filter(condition => condition.filter === true) : item.contents
            }
        }).filter(criteria => criteria.contents.length > 0)

        setFilteredAccordion(updateAccordion)

    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [selected])

    useEffect(() => {
        let skeletonLocations = filteredAccordion.map(item => item.label)
        setSkeleton(skeletonLocations)
    }, [filteredAccordion])

    return (
        <div id="body-diagram" className='w-full bg-slate-50'>
            <div className='max-w-5xl mx-auto px-8 py-24'>
                <div className='flex flex-col items-center max-w-xl mx-auto text-center'>
                    <h4 className='uppercase text-sm'>{kicker}</h4>
                    <h1 className='mt-6 text-4xl font-bold'>{title}</h1>
                    <p className='mt-6 font-light text-lg'>{subTitle}</p>
                    {/* Accordion Filter */}
                    <div className='mt-8 w-[400px] rounded-full border border-gray-300 p-1'>
                        <div className='flex flex-row justify-between'>
                            {
                                conditionCategories.map((item) => (
                                    <div key={item.id} onClick={() => handleClick(item.id)} className={
                                        `text-sm mx-px px-6 py-3 rounded-full hover:cursor-pointer 
                                        ${selected === item.id 
                                            ? `${BG_COLORS[item.theme]} text-white` 
                                            : 'hover:bg-slate-200'}`}
                                    >
                                        {item.label}
                                    </div>
                                ))
                            }
                        </div>
                    </div>
                </div>
                <div className='mt-24 max-w-3xl mx-auto flex flex-col md:flex-row justify-center items-start'>
                    {/* ACCORDION */}
                    <div className='order-1 basis-7/12'>
                        { filteredAccordion &&
                            <Accordion 
                                accordion={filteredAccordion} 
                                title={`${conditionCategories[selected].label}`} 
                                theme={`${conditionCategories[selected].theme}`} 
                            />
                        }
                    </div>
                    {/* SKELETON */}
                    <div className='order-2 basis-5/12 relative ml-20'>
                        <Image src={skeletonImg} alt="skeleton" className='object-contain' />
                        { skeleton && skeleton.map(location => (
                            <div 
                                key={location} 
                                className={`
                                    w-12 h-12 absolute rounded-full flex justify-center items-center text-xs border-2 
                                    hover:animate-customPing hover:cursor-pointer
                                    ${SKELETON_BG[conditionCategories[selected].theme]}
                                    ${SKELETON_BORDER[conditionCategories[selected].theme]}
                                    ${SKELETON_LOCATIONS[location]}
                                `}
                            >
                                
                            </div>
                        ))
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}
