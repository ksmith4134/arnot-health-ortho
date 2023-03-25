import Image from "next/image"
import { COMPONENTS } from '../components/Theme'


export default function Test({ results }) {

    const getComponent = (item) => {
        if(typeof COMPONENTS[item.component] !== 'undefined') {
            const Component = COMPONENTS[item.component]
            return <Component {...item} />
        } else {
            return (<div>Component was not found</div>)
        }
    }

    const layout = results.map((item) => {
        return getComponent(item)
    })

    return (
        <div className="max-w-6xl mx-auto">
            {
                layout.map((component, index) => (
                    <div key={index}>{component}</div>
                ))
            }
        </div>
    )
}

export async function getStaticProps() {

    const response = await fetch('http://localhost:1337/api/homepage?populate[0]=layout')
    const { data } = await response.json()


    const results = data.attributes.layout.map((item) => {
        switch (item.__component) {
            case 'content.title-block':
                return {
                    id: item.id,
                    component: item.__component,
                    title: item.title,
                    subTitle: item.subTitle
                }
                break;
            case 'content.hero-image':
                return {
                    id: item.id,
                    component: item.__component,
                    url: item.youAreEl,
                }
                break;
            default:
                break;
        }
        
    })

    console.log('Data', results)


    return {
        props: {
            results
        }
    }
}