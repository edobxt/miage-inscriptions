import bcrypt from "bcrypt";

const hash = async (password) => {
    return await bcrypt.hash(password, 10)
        .then(hash => {
            return hash;
        });
}

const isSamePass = async (password, hashedPassword) => {
    return await bcrypt.compare(password, hashedPassword)
        .then(result => {
            return result;
        });
}

export const hasher = {
    hash, isSamePass
};