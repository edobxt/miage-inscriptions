const jwt = require('jsonwebtoken');
import getConfig from "next/config";

import { apiHandler } from 'helpers/api';

const { serverRuntimeConfig } = getConfig();

const handler = (req, res) => {

    const authenticate = () => {
        const { email, password } = req.body;
    }

    switch (req.method) {
        case 'POST':
            return authenticate();
        default:
            return res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}

export default apiHandler(handler);