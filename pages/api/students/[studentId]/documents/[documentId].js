import executeQuery from "../../../lib/db";

//Liste des documents de l'étudiant
export default async function handler(req, res) {
    switch (req.method) {
        case "GET":
            try {
                const result = await executeQuery({
                    query: "select * from students_documents as stdoc inner join documents as doc on stdoc.document_id = doc.id where stdoc.student_id = ? and stdoc.document_id = ?",
                    values: [req.body.student_id, req.body.document_id]
                })
                res.status(200).json(result);
            } catch (error) {
                console.log(error);
            }
            break;

        case "PUT":
            try {
                const result = await executeQuery({
                    query: "update students_documents set document_id = ? where student_id = ?",
                    values : [req.body.student_id, req.body.document_id]
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