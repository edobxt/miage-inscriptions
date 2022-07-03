import executeQuery from "lib/db";

export default async function handler(req, res) {
    const {businessId} = req.query;

    switch (req.method) {
        case "GET":
            try {
                const result = await executeQuery({
                    query: "select * from businesses where id = ?",
                    values: [businessId]
                })
                res.status(200).send(result[0]);
            } catch (error) {
                console.log(error);
            }
        break;

        case "PUT":
            try {
                const result = await executeQuery({
                    query: "update businesses set name = ?, dirigeant_full_name = ?, address = ?, phone = ?, email = ?, siret = ?, naf = ?, number_of_employees = ?, opco_name = ? where id = ?",
                    values: [req.body.name, req.body.dirigeant_full_name, req.body.address, req.body.phone, req.body.email, req.body.siret, req.body.naf, req.body.number_of_employees, req.body.opco_name, businessId]
                })
                console.log(result)
                if (result.affectedRows > 0) {
                    res.status(200).end(`Business by ${businessId} has been successfully updated`);
                }
                else {
                    res.status(200).end(`Business by ${businessId} not found`);
                }
            } catch (error) {
                console.log(error);
            }
        break;

        default:
            return res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}