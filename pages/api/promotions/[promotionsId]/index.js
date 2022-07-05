import executeQuery from "lib/db";

export default async function handler(req, res){
    const {promotionsId} = req.query;
    switch (req.method){
        case 'GET' :
            try {
                const result = await executeQuery({
                    query: "select * FROM promotions where id = ?",
                    values: [promotionsId]
                })
                res.status(200).json(result);
            }catch (error) {
                console.log(error);
            }
            break;
        case 'DELETE':
            try {
                const result = await executeQuery({
                    query: " delete FROM promotions where id = ?" ,
                    values: [promotionsId]
                })
                res.status(200).json(result);
            }catch (error) {
                console.log(error);
            }
            break;
        case 'PUT':
            try {
                const result = await executeQuery({
                    query: " update promotions set name = ?, degree_id = ? where id = ?" ,
                    values: [req.body.name, req.body.degree_id, promotionsId]
                })
                if (result.affectedRows>0){
                    res.status(200).end(`this promotion ${promotionsId} has been modified`);
                }
                else{
                    res.status(200).end(`Promotion ${promotionsId} not found`);

                }

            }catch (error) {
                console.log(error);
            }
            break;
        default :
            return res.status(405).end(`Method ${req.method} Not Allowed`);
    }


}