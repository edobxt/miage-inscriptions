import executeQuery from "lib/db";


export default async function handler(req, res)
{
    switch (req.method) {
        case "GET":
            try {
                const result = await executeQuery({
                    query : "select * from degrees ",
                    values: []
                })
                res.status(200).json(result);
            } catch (error) {
                console.log(error);
            }
        case "POST":
            try {
                const result = await executeQuery({
                    query: "insert into degrees(name, active, promotion_id) values (?,?,?)",
                    values: [req.body.name, req.body.active]
                })
                res.status(200).json(result);
            } catch (error) {
                console.log(error);
            }
            break;

        default:
            return res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}