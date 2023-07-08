import { useContext, createContext, useState, useEffect } from "react";

const NavContext = createContext(null);

export function NavProvider({children}){

    const [ navDropdown, setNavDropdown ] = useState(null)
    
    const getNavDropdownData = async () => {
        // #region Get Conditions for Navigation
        await fetch('/api/nav', {
            headers: {
                "Content-Type": "application/json",
            },
            method: "GET",
        })
        .then(response => response.json() )
        .then(data => {
            const navigation = data.stories.map((item) => {
                return {
                    id: item.id,
                    bodyPart: item.name,
                    slug: item.slug,
                    conditions: item.content.conditions.map(id => 
                        data.rels.filter(item => item.uuid === id).map((item) => ({
                            id: item.id,
                            condition: item.name,
                            slug: item.slug,
                        }))
                    ).flat()
                }
            })
            setNavDropdown(navigation)
        })
        .catch(e => console.log('Error', e))
        // #endregion
    }

    useEffect(() => {
        getNavDropdownData()
        .catch(e => console.log('Error: Could not retrieve navigation data'))
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