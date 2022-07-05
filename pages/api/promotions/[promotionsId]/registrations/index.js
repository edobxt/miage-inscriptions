import executeQuery from "lib/db";

export default async function handler(req, res){
    //Liste des inscriptions dans une promotion
    const {promotionsId} = req.query;
    switch (req.method){
        case 'GET':
            try {
                const result = await executeQuery({
                    query: "select * FROM registrations inner join promotions on registrations.promotion_id = promotions.id where promotions.id = ?",
                    values: [promotionsId]
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