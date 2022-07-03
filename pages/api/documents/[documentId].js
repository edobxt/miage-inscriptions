import executeQuery from "../../../lib/db";

//Liste des documents de l'étudiant
export default async function handler(req, res) {
    switch (req.method) {
        case "GET":
            try {
                const result = await executeQuery({
                    query: "select * from documents where id = ?",
                    values: req.body.id
                })
                res.status(200).json(result);
            } catch (error) {
                console.log(error);
            }
            break;

        case "PUT":
            try {
                const result = await executeQuery({
                    query: "update documents set name = ?, active = ? where id = ?",
                    values: [req.body.name, req.body.active, req.body.id]
                })
                res.status(200).json(result);
            } catch (error) {
                console.log(error);
            }
            break;

        case "DELETE":
            try {
                const result = await executeQuery({
                    query: "delete from documents where id = ?",
                    values: req.body.id
                })
                res.status(200).json(result);
            } catch (error) {
                console.log(error);
            }
            break;

        default:
            return res.status(405).end('Method ${req.method} NotAllowed')
    }
}