import executeQuery from "lib/db";

export default async function handler(req, res) {
    const {formId} = req.query;

    switch (req.method) {
        case "GET":
            try {
                const result = await executeQuery({
                    query: "select * from forms where id = ?",
                    values: [formId]
                })
                res.status(200).send(result[0]);
            } catch (error) {
                console.log(error);
            }
        break;
        case "PUT":
            try {
                const result = await executeQuery({
                    query: "update forms set name = ?, active = ? where id = ?",
                    values: [req.body.name, req.body.active, formId]
                })

                if (result.affectedRows > 0) {
                    res.status(200).send(`Form by id ${formId} has been updated successfully.`);
                }
                else {
                    res.status(200).send(`Form by id ${formId} not found.`);
                }

            } catch (error) {
                console.log(error);
            }
        break;
        default:
            return res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}