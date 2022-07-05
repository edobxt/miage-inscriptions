import executeQuery from "lib/db";

export default async function handler(req, res) {
    const {tutorsId} = req.query;
    switch(req.method){
        case 'GET':
            try {
                const result = await executeQuery({
                    query: "SELECT * FROM businesses inner join tutors on tutors.business_id = businesses.id  WHERE tutors.id = ?",
                    values: [tutorsId]
                })
                res.status(200).json(result);
            }catch (error) {
                console.log(error);
            }
            break;
        default :
            return res.status(405).end(`Method ${req.method} Not Allowed`);

    }



}