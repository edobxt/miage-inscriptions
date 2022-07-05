import executeQuery from "lib/db";

export default async function handler(req, res) {
    const {formId, questionId} = req.query;

    switch (req.method) {
        case "GET":
            try {
                const result = await executeQuery({
                    query: "select * from questions where form_id = ? and id = ?",
                    values: [formId, questionId]
                })
                res.status(200).send(result);
            } catch (error) {
               console.log(error);
            }
        break;
        case "PUT":
            try {
                const result = await executeQuery({
                    query: "update questions set name = ?, fields_type = ? where form_id = ? and id = ?",
                    values: [req.body.name, req.body.fields_type, formId, questionId]
                })
                
                if (result.affectedRows > 0) {
                    res.status(200).send(`Question by id ${questionId} of the form with the id ${formId} has been successfully updated`);
                }
                else {
                    res.status(200).send(`Question by id ${questionId} of the form with the id ${formId} not found`);
                }

            } catch (error) {
                console.log(error);
            }
        break;
        default:
            return res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}