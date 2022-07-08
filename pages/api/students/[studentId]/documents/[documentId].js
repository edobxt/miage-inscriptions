import executeQuery from "lib/db";


export default async function handler(req, res) {

    const {studentId, documentId} = req.query;

    switch (req.method) {
        case "GET":
            try {
                const result = await executeQuery({
                    query: "select * from students_documents as stdoc inner join documents as doc on stdoc.document_id = doc.id where stdoc.student_id = ? and stdoc.document_id = ?",
                    values: [studentId, documentId]
                })
                res.status(200).json(result);
            } catch (error) {
                console.log(error);
            }
            break;

        case "DELETE":
            try {
                const result = await executeQuery({
                    query: "delete from students_documents as stdoc where stdoc.student_id = ? and stdoc.document_id = ?",
                    values : [studentId, documentId]
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