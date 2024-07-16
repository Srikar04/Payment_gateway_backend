import prisma from "../models/index.js";
import { v4 as uuidv4 } from 'uuid';

const createUser = async (req, res) => {
    try {
        const apiKey = generateApiKey();
        const user = await prisma.user.create({
            data:{apiKey}
        })
        res.status(201).json(user);
    } catch (err) {
        res.status(404).json({error: err.message});
    }
}


function generateApiKey() {
    return uuidv4();
}

export default createUser;