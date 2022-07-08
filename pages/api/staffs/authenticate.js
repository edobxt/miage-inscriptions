const jwt = require('jsonwebtoken');
import getConfig from "next/config";
import executeQuery from "lib/db";
import { apiHandler } from 'helpers/api';

const { serverRuntimeConfig } = getConfig();

const handler = (req, res) => {

    const authenticate = async () => {
        try {
            const result = await executeQuery({
                query: "select * from staff where email = ? and password = ?",
                values: [req.body.email, req.body.password]
            });

            console.log(result);

            if (!result[0]) {
                res.status(403).json(`Access denied`)
            }

            if (result[0]) {
                const token = jwt.sign(
                    {sub: result[0].id},
                    serverRuntimeConfig.secret,
                    {expiresIn: '7d'}
                )

                res.status(200).json({
                    ok: "OK",
                    id: result[0].id,
                    full_name: result[0].full_name,
                    email: result[0].email,
                    type: "staff",
                    token
                });
            }

        } catch (error) {
            console.log(error)
        }
    }

    switch (req.method) {
        case 'POST':
            return authenticate();
        default:
            return res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}

export default apiHandler(handler);