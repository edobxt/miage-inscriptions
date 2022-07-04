import executeQuery from "lib/db";

export default async function handler(req, res) {
    const {degreesId} = req.query;

    switch (req.method) {
        case "GET":
            try {
                const result = await executeQuery({
                    query: "select * from degrees where id = ?",
                    values: [degreesId]
                })
                res.status(200).send(result[0]);
            } catch (error) {
                console.log(error);
            }
        case "PUT":
            try {
                const result = await executeQuery({
                    query: "update questions set name = ? and id = ?",
                    values: [req.body.name, degreesId]
                })

            } catch (error) {
                console.log(error);
            }
        case "DELETE":
            try {
                const result = await executeQuery({
                    query: "delete from degrees where id = ?",
                    values : [degreesId]
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