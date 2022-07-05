import executeQuery from "lib/db";

export default async function handler(req, res){

    const {promotionsId, registrationsId} = req.query;
    switch (req.method){
        case 'GET':
            try {
                const result = await executeQuery({
                    query: "select * FROM registrations inner join promotions on registrations.promotion_id = promotions.id where promotions.id = ? and registrations.id = ?",
                    values: [promotionsId, registrationsId]
                })
                console.log(result);
                res.status(200).send(result);
            }catch (error) {
                console.log(error);
            }
            break;
        default :
            return res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}




