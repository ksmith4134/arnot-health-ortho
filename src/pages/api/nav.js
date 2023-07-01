// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

export default async function handler(req, res) {

    let date = new Date();
    let time = Math.floor(date.getTime()/1000)
    let token = process.env.NEXT_PUBLIC_CMS_STORYBLOK

    if(req.method !== 'PUT'){

        await fetch(`https://api-us.storyblok.com/v2/cdn/stories?token=${token}&cv=${time}&version=published&starts_with=body&excluding_fields=indexes&resolve_relations=body.conditions`)
        .then((response) => {
    
            if(response.status != 200){
                throw new Error("API failed to get navigation data")
            }
    
            return response.json()
        })
        .then((data) => {
            res.status(200).json(data)
        })
        .catch((error)=>{
            res.status(401).json(error)
        })
        return
    } else {
        res.status(400).json({ message: 'Bad API request' })
    }
}
