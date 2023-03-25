import { useState } from "react"
import { getStoryblokApi } from "@storyblok/react"
import Indexes from "@/components/Indexes"
import ConditionHeader from "@/components/ConditionHeader"

export default function Condition(props) {

    const { condition, params, indexes, conditionHeader } = props

    console.log('API Response', condition)

    const [ index, setIndex ] = useState('Background')

    const handleClick = (id) => {
        setIndex(id)
    }

    return (
        <div className="max-w-4xl min-h-screen my-16 mx-auto flex flex-row space-x-4 items-start">
            <div className="basis-1/5 sticky top-8">
                <Indexes indexes={indexes} selected={index} handleClick={handleClick} />
            </div>
            <div className="basis-4/5">
                <ConditionHeader bodyPart={params.body} label={index} title={conditionHeader.title} description={conditionHeader.description} />
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
        version: "draft",
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
        version: "draft",
    });

    let condition = data.story.content

    let indexes = condition.indexes.map((item) => {
        return {
            id: item._uid,
            label: item.component
        }
    })

    let conditionHeader = {
        title: condition.title,
        description: condition.shortDescription
    }

    return {
        props: {
            condition,
            params,
            indexes,
            conditionHeader
        }
    }
}