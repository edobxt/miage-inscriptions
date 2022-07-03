import executeQuery from "lib/db";

export default async function handler(req, res) {
    const {businessId} = req.query;

    switch (req.method) {
        case "GET":
            try {
                const result = await executeQuery({
                    query: "select * from tutors where business_id = ?",
                    values: [businessId]
                });
                res.status(200).send(result);
            } catch (error) {
                console.log(error);
            }
        break;
        default:
            return res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}