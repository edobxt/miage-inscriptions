const jwt = require('jsonwebtoken');
import getConfig from "next/config";
import executeQuery from "lib/db";
import { apiHandler } from 'helpers/api';
import {hasher} from 'helpers/hash'

const { serverRuntimeConfig } = getConfig();

const handler = (req, res) => {

    const authenticate = async () => {
        try {
            const result = await executeQuery({
                query: "select * from students where email = ?",
                values: [req.body.email]
            });

            console.log(result);

            if (!result[0]) {
                res.status(403).json(`Access denied`)
            }

            hasher.isSamePass(req.body.password, result[0].password)
                .then(isSamePass => {
                    console.log(isSamePass)
                    if (result[0] && isSamePass) {
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
                            type: "student",
                            token
                        });
                    }
                    else {
                        res.status(403).json(`Access denied`)
                    }
                })

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