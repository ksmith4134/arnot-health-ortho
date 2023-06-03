import { useNavContext } from '../NavProvider';
import { useState, forwardRef } from 'react';
import { RxCaretDown } from 'react-icons/rx';
import Link from 'next/link';


const MobileSubMenu = forwardRef(function MobileSubMenu(props, ref) {
    
    const { subMenu, closeMenu } = props
    // subMenu: slug, title, linkLabel, linkUrl, linkIcon, target

    const { navDropdown } = useNavContext()
    const [ opened, setOpened ] = useState(null)

    const handleClick = (id) => {
        id === opened ? setOpened(null) : setOpened(id)
    }


    return (
        <div ref={ref} className='bg-white border rounded shadow-md mt-2'>
            {/* BodyPart SubMenu Header */}
            <div className='text-arnotPeach font-semibold p-4'>{subMenu.title}</div>

            {/* Body Part Dropdowns */}
            { navDropdown.map(item => (
                <div 
                    key={item.id} 
                    className='border-t text-sm hover:cursor-pointer'
                    onClick={() => handleClick(item.id)}
                >
                    <div className={`flex justify-between items-center p-4 ${item.id === opened && 'bg-arnotBlue text-white shadow-md shadow-arnotBlue/30'}`}>
                        <div>{item.bodyPart}</div>
                        <RxCaretDown className={`text-xl ${item.id === opened && 'rotate-180'} transition ease-in-out duration-200`} />
                    </div>
                    {/* Condition Links */}
                    <div className={`bg-arnotBlue/10 ${item.id === opened && 'px-4 py-2'}`}>
                        { opened === item.id && 
                            item.conditions.map(link => (
                                <Link key={link.id} href={`/${item.slug}/${link.slug}${subMenu.slug}`} onClick={() => closeMenu(null)}>
                                    <p className='py-2 text-arnotBlue'>{link.condition}</p>
                                </Link>
                            ))
                        }
                    </div>
                </div>
            ))}
        </div>
    )
})

export default MobileSubMenu;