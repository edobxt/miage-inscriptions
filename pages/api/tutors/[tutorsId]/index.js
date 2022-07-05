import executeQuery from "lib/db";

export default async function handler(req, res) {

    const {tutorsId} = req.query;
    switch (req.method) {
        case 'GET':
            try {
                const result = await executeQuery({
                    query: "SELECT * FROM tutors WHERE id = ?",
                    values: [req.body.content]
                })
                res.status(200).json(result);
            }catch (error) {
                console.log(error);
            }
            break;
        case 'PUT':
            try {

                const result = await executeQuery({
                    query: "UPDATE tutors SET full_name = ?, email = ?, phone = ?, position_in_the_company=?, qualifications= ?, birth_date =?, business_id = ? where id = ?",
                    values: [req.body.full_name, req.body.email, req.body.phone, req.body.position_in_the_company, req.body.qualification, req.body.birth_date, req.body.business_id, tutorsId]
                })
                if (result.affectedRows>0){
                    res.status(200).end(`this tutor ${tutorsId} has been modified`);
                }
                else{
                    res.status(200).end(`Tutor ${tutorsId} not found`);

                }
            }catch (error) {
                console.log(error);
            }
            break;
        case 'DELETE':
            try {
                const result = await executeQuery({
                    query: "delete * from tutors where id = ?",
                    values: [req.body.content]
                })

            } catch (error) {
                console.log(error);
            }
            break;
        default:
            return res.status(405).end(`Method ${req.method} Not Allowed`);
    }




}