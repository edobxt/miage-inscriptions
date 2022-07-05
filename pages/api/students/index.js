import executeQuery from "lib/db";


export default async function handler(req, res)
{
    switch (req.method) {
        case "GET":
            try {
                const result = await executeQuery({
                    query : "select * from students",
                    values: []
                })
                res.status(200).json(result);
            } catch (error) {
                console.log(error);
            }
            break;

        case "POST":
            try {
                const result = await executeQuery({
                    query: "insert into students(full_name, email, password, phone, address, birth_date, birth_location, original_degree, last_degree_date) value (?, ?, ?, ?, ?, ?, ?, ?, ?)",
                    values : [req.body.full_name, req.body.email, req.body.password, req.body.phone, req.body.address, req.body.birth_date, req.body.birth_location, req.body.original_degree, req.body.last_degree_date]
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