import {useContext, createContext, useState, useEffect} from "react";


const NavContext = createContext(null);

export function NavProvider({children}){

    const [ navDropdown, setNavDropdown ] = useState(null)
    
    const getNavData = async () => {
        
        const navResponse = await fetch(`https://api-us.storyblok.com/v2/cdn/stories?starts_with=body&token=${process.env.NEXT_PUBLIC_CMS_STORYBLOK}&version=draft&excluding_fields=indexes&resolve_relations=body.conditions`)

        const navData = await navResponse.json();

        const navigation = navData.stories.map((item) => {
            return {
                id: item.id,
                bodyPart: item.name,
                slug: item.slug,
                conditions: item.content.conditions.map(id => 
                    navData.rels.filter(item => item.uuid === id).map((item) => ({
                        id: item.id,
                        condition: item.name,
                        slug: item.slug,
                    }))
                ).flat()
            }
        })

        setNavDropdown(navigation)
    }

    useEffect(() => {
        getNavData()
        .catch(e => console.log('getNavData error', e))
    }, [])

    return (
        <NavContext.Provider value={{ navDropdown }}>
            { children }
        </NavContext.Provider>
    )
}


export function useNavContext(){
    return useContext(NavContext)
}