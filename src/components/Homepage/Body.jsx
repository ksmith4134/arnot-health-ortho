import Accordion from '../Accordion'
import { useState, useEffect } from 'react'
import Skeleton from './Skeleton'
import ButtonFilter from './ButtonFilter'
import TitleBlock from '../Shared/TitleBlock'
import ButtonFilter2 from './ButtonFilter2'
import { FaInfoCircle } from 'react-icons/fa'

export default function Body(props) {

    const {
        icon,
        kicker,
        title,
        subTitle,
        conditionCategories = [
            { id: 0, label: 'All Treatments', theme: 'primary', filter: false},
            { id: 1, label: 'Arthritis & Joint Replacement', theme: 'secondary', filter: true},
        ],
        accordion,
    } = props

    const [ category, setCategory ] = useState(0)
    const [ filteredAccordion, setFilteredAccordion ] = useState(accordion)
    const [ skeleton, setSkeleton ] = useState(null)
    const [ openDropdown, setOpenDropdown ] = useState(null)
    const [ instructions, setInstructions ] = useState(true)

    const handleAccordionClick = (id) => {
        id === openDropdown ? setOpenDropdown(null) : setOpenDropdown(id)
    }

    const handleFilterClick = (id) => {
        setCategory(id)
    }

    useEffect(() => {
        let updateAccordion = accordion.map((item) => {
            return {
                id: item.id,
                label: item.label,
                contents: conditionCategories[category].filter === true ? item.contents.filter(condition => condition.filter === true) : item.contents
            }
        }).filter(criteria => criteria.contents.length > 0)

        setFilteredAccordion(updateAccordion)
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [category])


    useEffect(() => {
        let skeletonLocations = filteredAccordion.map(item => {
            return {
                id: item.id,
                label: item.label
            }
        })
        setSkeleton(skeletonLocations)
    }, [filteredAccordion])

    return (
        <div id='body-diagram' className='w-full'>
            <div className='max-w-6xl mx-auto px-8 p-24'>
                
                <TitleBlock 
                    title={title}
                    subTitle={subTitle}
                />
                
                <div className='mt-20 max-w-6xl mx-auto flex flex-row justify-between items-start md:border md:rounded-md md:px-16 md:pt-20 md:pb-36 md:shadow-lg md:shadow-slate-50 md:space-x-8'>
                    <div className='mt-4 order-1 w-full md:max-w-md shrink flex flex-col justify-center md:justify-start'>

                        <div onClick={() => setInstructions(!instructions)} className={`flex flex-col items-start justify-center text-slate-600 rounded-md hover:cursor-pointer ${instructions ? '' : ''}`}>
                            <div className='inline-flex items-center space-x-2'>
                                <FaInfoCircle className={`w-8 h-8`} />
                                <p className={`text-lg font-semibold`}>Instructions</p>
                            </div>
                            <p className={`mt-2 text-sm ${instructions ? 'block' : 'hidden'}`}>Click on the filter buttons, dropdown menus, or the highlighted areas of the skeleton to learn more about your orthopedic condition.</p>
                        </div>

                        <div className='mt-6 md:mt-12'>
                            <ButtonFilter2 conditionCategories={conditionCategories} category={category} handleClick={handleFilterClick} />
                        </div>

                        { filteredAccordion &&  
                            <div className='mt-6'>
                                <Accordion 
                                    accordion={filteredAccordion} 
                                    // title={`${conditionCategories[category].label}`}
                                    theme={`${conditionCategories[category].theme}`} 
                                    selected={openDropdown}
                                    handleClick={handleAccordionClick}
                                />
                            </div>
                        }
                    </div>
                    <div className='hidden md:flex flex-none order-2 basis-5/12 justify-center'>
                        <Skeleton skeleton={skeleton} theme={conditionCategories[category].theme} handleAccordionClick={handleAccordionClick} selected={openDropdown}  />
                    </div>
                </div>
            </div>
        </div>
    )
}
