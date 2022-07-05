import executeQuery from "../../../lib/db";


export default async function handler(req, res)
{
    const {studentId} =  req.query;

    switch (req.method) {
        case "GET":
            try {
                const result = await executeQuery({
                    query : "select * from registrations as r inner join students as s on r.student_id = s.id where r.student_id = ?",
                    values: [studentId]
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