import executeQuery from "lib/db";

export default async function handler(req, res){
    switch (req.method) {
        case 'POST':
            try {
                const result = await executeQuery({
                    query: "INSERT INTO tutors(full_name, email, phone, position_in_the_company, qualifications, birth_date, business_id) values( ?,?,?,?,?,?,?)",
                    values: [ req.body.full_name, req.body.email, req.body.phone, req.body.position_in_the_company, req.body.qualifications, req.body.birth_date, req.body.business_id]
                })
                res.status(200).json(result);

            }catch (error) {
                console.log(error);
            }
            break;
        case 'GET':
            try {
                const result = await executeQuery({
                    query: "SELECT * FROM tutors",
                    values: []
                })
                console.log(result);
                res.status(200).send(result);

            }catch (error) {
                console.log(error);
            }
            break;
        default:
            return res.status(405).end(`Method ${req.method} Not Allowed`);
    }

}