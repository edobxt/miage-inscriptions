import executeQuery from "lib/db";

export default async function handler(req, res) {
    const {tutorsId} = req.query;
    switch (req.query){
        case 'GET':
            try {
                const result = await executeQuery({
                    query: "SELECT students.id, students.full_name FROM students inner join tutors_to_registrations on students.id = tutors_to_registrations.tutor_id inner join registrations on tutors_to_registrations.registration_id = registrations.id  WHERE tutors_to_registrations.tutor_id = ?",
                    values: [tutorsId]
                })
                res.status(200).json(result);
            }catch (error) {
                console.log(error);
            }
            break;
        case 'PUT' :
            try {
                const result = await executeQuery({
                    query: "UPDATE tutors SET ",
                    values: [req.body.content]
                })
                res.status(200).json(result);
            }catch (error) {
                console.log(error);
            }
            break;
        default :
            return res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}