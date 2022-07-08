import executeQuery from "lib/db";


export default async function handler(req, res)
{
    const {studentId} = req.query;

    switch (req.method) {
        case "GET":
            try {
                const result = await executeQuery({
                    query : "select * from students where id = ?",
                    values: [studentId]
                })
                res.status(200).json(result);
            } catch (error) {
                console.log(error);
            }
            break;

        case "PUT":
            try {
                const result = await executeQuery({
                    query: "update students set full_name = ?, email = ?, password = ?, phone = ?, address = ?, birth_date = ?, birth_location = ?, original_degree = ?, last_degree_date = ? where id = ?",
                    values : [req.body.full_name, req.body.email, req.body.password, req.body.phone, req.body.address, req.body.birth_date, req.body.birth_location, req.body.original_degree, req.body.last_degree_date, studentId]
                })
                res.status(200).json(result);
            } catch (error) {
                console.log(error);
            }
            break;

        case "DELETE":
            try {
                const result = await executeQuery({
                    query: "delete from students where id = ?",
                    values : [studentId]
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