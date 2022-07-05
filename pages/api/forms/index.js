import executeQuery from "lib/db";

export default async function handler(req, res) {
    switch (req.method) {
        case "GET":
            try {
                const result = await executeQuery({
                    query: "select * from forms",
                    values: []
                });
                res.status(200).send(result);
            } catch (error) {
                console.log(error);
            }
        break;

        case "POST":
            try {
                const result = await executeQuery({
                    query: "insert into forms (name, active, degree_id) values (?, ?, ?)",
                    values: [req.body.name, req.body.active, req.body.degree_id]
                })
                res.status(201).end(`Form created`);
            } catch (error) {
                console.log(error);
            }
        break;

        default:
            return res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}