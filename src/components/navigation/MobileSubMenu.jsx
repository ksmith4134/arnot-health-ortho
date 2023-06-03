import { useNavContext } from '../NavProvider';
import { useState, forwardRef } from 'react';
import { RxCaretDown } from 'react-icons/rx';
import Link from 'next/link';


const MobileSubMenu = forwardRef(function MobileSubMenu(props, ref) {
    
    const { 
        subMenu, 
        closeMenu, 
        toggleMobileMainMenu 
    } = props
    // subMenu: slug, title, linkLabel, linkUrl, linkIcon, target

    const { navDropdown } = useNavContext()
    const [ opened, setOpened ] = useState(null)

    const handleDropdownClick = (id) => {
        id === opened ? setOpened(null) : setOpened(id)
    }

    const handleMobileMenuClose = () => {
        closeMenu(null)
        toggleMobileMainMenu()
    }


    return (
        <div ref={ref} className='mt-2'>
            
            {/* Body Part Dropdowns */}
            { navDropdown.map(item => (
                <div 
                    key={item.id} 
                    className='mt-2 text-sm hover:cursor-pointer'
                    onClick={() => handleDropdownClick(item.id)}
                >
                    <div className={`flex justify-between items-center p-4 border rounded ${item.id === opened ? 'bg-arnotBlue text-white border-arnotBlue shadow-md shadow-arnotBlue/30' : 'bg-white border-slate-100'}`}>
                        <div>{item.bodyPart}</div>
                        <RxCaretDown className={`text-xl ${item.id === opened && 'rotate-180'} transition ease-in-out duration-200`} />
                    </div>
                    {/* Condition Links */}
                    <div className={`bg-arnotBlue/10 rounded mt-2 ${item.id === opened && 'px-4 py-2'}`}>
                        { opened === item.id ?  
                            item.conditions.length > 0 ?
                                item.conditions.map(link => (
                                    <Link key={link.id} href={`/${item.slug}/${link.slug}${subMenu.slug}`} onClick={handleMobileMenuClose}>
                                        <p className='py-2 text-arnotBlue'>{link.condition}</p>
                                    </Link>
                                )) : 
                                <p className='py-2 text-arnotBlue'>No conditions present</p>
                            : null
                        }
                    </div>
                </div>
            ))}
        </div>
    )
})

export default MobileSubMenu;