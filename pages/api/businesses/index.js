import executeQuery from "lib/db";

export default async function handler(req, res) {
    switch (req.method) {
        case "GET":
            try {
                const result = await executeQuery({
                    query: "select * from businesses",
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
                    query: "insert into businesses (name, dirigeant_full_name, address, phone, email, siret, naf, number_of_employees, opco_name) values" +
                        "(?, ?, ?, ?, ?, ? ,?, ?, ?)",
                    values: [req.body.name, req.body.dirigeant_full_name, req.body.address, req.body.phone, req.body.email, req.body.siret, req.body.naf, req.body.number_of_employees, req.body.opco_name]
                })
                res.status(201).end(`Business successfully created`);
            } catch (error) {
                console.log(error);
            }
        break;
        default:
            return res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}