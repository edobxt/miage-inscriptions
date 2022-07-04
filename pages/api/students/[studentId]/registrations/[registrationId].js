import executeQuery from "../../../lib/db";

//Information sur une inscription de l'étudiant
export default async function handler(req, res)
{
    const {studentId, registrationId} = req.query;

    switch (req.method) {
        case "GET":
            try {
                const result = await executeQuery({
                    query : "select * from registrations as r inner join students as s on r.student_id = s.id where r.student_id = ? and r.id = ?",
                    values: [studentId, registrationId]
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
