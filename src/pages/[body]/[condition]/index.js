import { useState, useEffect } from "react"
import { useRouter } from "next/router"
import { getStoryblokApi } from "@storyblok/react"

export default function Condition({condition, params}) {

    // console.log('Condition API Response', conditions)

    const router = useRouter()

    const [ index, setIndex ] = useState('Background')

    const handleClick = (id) => {
        setIndex(id)
    }


    return (
        <div className="max-w-4xl min-h-screen mx-auto flex flex-row justify-between items-start">
            <div className="basis-2/12">
                <h4 className="mt-1 mb-2 font-bold">INDEX</h4>
                {
                    condition.indexes.map((item) => (
                        <div key={item._uid} onClick={() => handleClick(item.component)} className={`mt-3 text-sm hover:font-bold ${item.component === index ? 'text-arnotBlue font-bold' : 'font-light'}`}>{item.component}</div>
                    ))
                }
            </div>
            <div className="basis-10/12">
                <h1 className="text-4xl">{condition.title}</h1>
                <h3 className="mt-2 text-lg font-light">{condition.shortDescription}</h3>
                {
                    condition.indexes.find(item => item.component === index).page.map(j => (
                        <div key={j._uid}>{j.component}</div>
                    ))
                }
            </div>
        </div>
    )
}

export async function getStaticPaths() {
    
    const storyblokApi = getStoryblokApi();
    
    let { data } = await storyblokApi.get(`cdn/stories`, {
        version: "published",
        starts_with: "body",
        resolve_relations: "body.conditions",
    });

    let paths = data.stories.map((body) => 
        body.content.conditions.map((condition) => ({
            params: {
                body: body.slug,
                condition: condition.slug
            }
        }))
    ).flat()

    return {
      paths,
      fallback: false,
    }
}

export async function getStaticProps(context) {
    const { params } = context

    const storyblokApi = getStoryblokApi();
    
    let { data } = await storyblokApi.get(`cdn/stories/conditions/${params.condition}`, {
        version: "published",
    });

    let condition = data.story.content

    return {
        props: {
            condition,
            params
        }
    }
}