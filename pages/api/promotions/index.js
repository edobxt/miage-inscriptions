import executeQuery from "lib/db";

export default async function handler(req, res){

    switch (req.method) {
        case 'POST':
            try {
                const result = await executeQuery({
                    query: "INSERT INTO promotions( name, degree_id)" +
                        "values(?,?)",
                    values: [req.body.name, req.body.degree_id]
                })
                res.status(200).json(result);

            }catch (error) {
                console.log(error);
            }
            break;
        case 'GET':
            try {
                const result = await executeQuery({
                    query: "SELECT * FROM promotions",
                    values: []
                })
                console.log(result);
                res.status(200).send(result);
            }catch (error) {
                console.log(error);
            }
            break;
        default:
            return res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}