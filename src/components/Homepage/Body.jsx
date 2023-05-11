import Accordion from '../Accordion'
import { useState, useEffect } from 'react'
import Skeleton from './Skeleton'
import ButtonFilter from './ButtonFilter'
import TitleBlock from '../Shared/TitleBlock'


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
        <div id='body-diagram' className='w-full bg-slate-50'>
            <div className='max-w-5xl mx-auto px-8 pt-36 pb-24'>
                <TitleBlock 
                    kicker={kicker}
                    title={title}
                    subTitle={subTitle}
                />
                <ButtonFilter conditionCategories={conditionCategories} category={category} handleClick={handleFilterClick} />
                <div className='mt-12 md:mt-28 max-w-5xl mx-auto flex flex-row justify-between items-start'>
                    <div className='order-1 w-full md:basis-8/12 md:mt-12 flex justify-center md:justify-start'>
                        { filteredAccordion &&                                
                            <Accordion 
                                accordion={filteredAccordion} 
                                title={`${conditionCategories[category].label}`}
                                theme={`${conditionCategories[category].theme}`} 
                                selected={openDropdown}
                                handleClick={handleAccordionClick}
                            />
                        }
                    </div>
                    <div className='hidden md:block order-2 basis-4/12 relative flex-none'>
                        <Skeleton skeleton={skeleton} theme={conditionCategories[category].theme} handleAccordionClick={handleAccordionClick} selected={openDropdown}  />
                    </div>
                </div>
            </div>
        </div>
    )
}
