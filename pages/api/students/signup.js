import executeQuery from "lib/db";
import {hasher} from "helpers/hash";
import jwt from "jsonwebtoken";
import {serverRuntimeConfig} from "next.config";

export default async function handler(req, res) {
    switch(req.method) {
        case "POST":
            if (req.body.password !== req.body.verifyPassword) {
                return res.status(403).end(`Please verify your password`);
            }

            if (req.body.password === req.body.verifyPassword) {
                const hashedPass = await hasher.hash(req.body.password);

                const result = await executeQuery({
                    query: "insert into students (full_name, email, password) values (?, ?, ?)",
                    values: [req.body.fullName, req.body.email, hashedPass]
                })

                const getNewUser = await executeQuery({
                    query: "select * from students where email = ? and password = ?",
                    values: [req.body.email, hashedPass]
                });

                const token = jwt.sign(
                    {sub: getNewUser[0].id},
                    serverRuntimeConfig.secret,
                    {expiresIn: '7d'}
                );

                res.status(201).json({
                    id: getNewUser[0].id,
                    full_name: getNewUser[0].full_name,
                    email: getNewUser[0].email,
                    type: "student",
                    token
                });
            }
        break;
        default:
            return res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}