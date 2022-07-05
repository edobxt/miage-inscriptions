import executeQuery from "lib/db";

export default async function handler(req, res) {
    switch(req.method) {
        case "POST":
            if (req.body.password !== req.body.verifyPassword) {
                return res.status(403).end(`Please verify your password`);
            }

            if (req.body.password === req.body.verifyPassword) {
                const result = await executeQuery({
                    query: "insert into students (full_name, email, password) values (?, ?, ?)",
                    values: [req.body.fullName, req.body.email, req.body.password]
                })
                res.status(201).json(result);
            }
        break;
        default:
            return res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}