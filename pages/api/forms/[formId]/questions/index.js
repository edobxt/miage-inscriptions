import executeQuery from "lib/db";

export default async function handler(req, res) {
    const {formId} = req.query;

    switch (req.method) {
        case "GET":
            try {
                const result = await executeQuery({
                    query: "select * from questions where form_id = ?",
                    values: [formId]
                })
                res.status(200).send(result);
            } catch (error) {
                console.log(error);
            }
        break;
        case "POST":
            try {
                const result = await executeQuery({
                    query: "insert into questions (name, fields_type, form_id) values (?, ?, ?)",
                    values: [req.body.name, req.body.fields_type, formId]
                })
                res.status(201).end("Question created")
            } catch (error) {
                console.log(error);
            }
        break;
        default:
            return res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}