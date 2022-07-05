import executeQuery from "lib/db";

export default async function handler(req, res) {
    const {documentsId} = req.query;
    switch(req.method){
        case 'PUT':
            try {
                const result = await executeQuery({
                    query: "update documents set name = ?, active = ? where id = ?",
                    values: [req.body.name, req.body.active, documentsId]
                })
                if (result.affectedRows>0){
                    res.status(200).end(`this document ${documentsId} has been modified`);
                }
                else{
                    res.status(200).end(`document ${documentsId} not found`);

                }

            }catch (error) {
                console.log(error);
            }
            break;
        default :
            return res.status(405).end(`Method ${req.method} Not Allowed`);

    }



}