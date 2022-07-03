import executeQuery from "../../../lib/db";

//Information sur une inscription de l'étudiant
export default async function handler(req, res)
{
    switch (req.method) {
        case "GET":
            try {
                const result = await executeQuery({
                    query : "select * from registrations as r inner join students as s on r.student_id = s.id where r.id = ? and s.id = ?",
                    values: req.body.student_id
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
