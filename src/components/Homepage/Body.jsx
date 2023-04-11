import Accordion from '../Accordion'
import { useState, useEffect } from 'react'
import Skeleton from './Skeleton'
import ButtonFilter from './ButtonFilter'

export default function Body(props) {

    const {
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

    // useEffect(() => {
    //     console.log('dropdown id', openDropdown)
    // }, [openDropdown])

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
        <div id="body-diagram" className='w-full bg-slate-50'>
            <div className='max-w-5xl mx-auto px-8 py-36'>
                <div className='flex flex-col items-center max-w-xl mx-auto'>
                    <h4 className='uppercase text-sm text-center'>Patient Resources</h4>
                    <h1 className='mt-6 text-4xl font-bold text-center'>Learn About Your Condition</h1>
                    <p className='mt-6 font-light text-lg text-center'>Click on the dropdown menus below <span className='hidden md:inline'>or the highlighted areas of the skeleton </span>to access information about your orthopedic condition.</p>
                    <ButtonFilter conditionCategories={conditionCategories} category={category} handleClick={handleFilterClick} />
                </div>
                <div className='mt-12 md:mt-24 max-w-3xl mx-auto flex flex-row justify-between items-start'>
                    <div className='order-1 w-full md:basis-8/12 flex justify-center md:justify-start'>
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
