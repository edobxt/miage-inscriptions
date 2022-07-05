import executeQuery from "lib/db";


export default async function handler(req, res)
{
    const {studentId} = req.query;

    switch (req.method) {
        case "GET":
            try {
                const result = await executeQuery({
                    query : "select * from students_documents as stdoc inner join documents as doc on stdoc.document_id = doc.id where stdoc.student_id = ?",
                    values: [studentId]
                })
                res.status(200).json(result);
            } catch (error) {
                console.log(error);
            }
            break;

        case "POST":
            try {
                const result = await executeQuery({
                    query: "insert into students_documents(student_id, document_id, date_added) values (?,?,NOW())",
                    values : [studentId, req.body.document_id]
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