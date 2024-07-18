import prisma from "../models/index.js";
import { v4 as uuidv4 } from 'uuid';

const createUser = async (req, res) => {
    try {
        const apiKey = generateApiKey();
        const { name } = req.body;
        // check if a user with same name exists
        const userExists = await prisma.user.findFirst({
            where: { name }
        });
        if (userExists) {
            return res.status(400).json({ error: "User already exists" });
        }
        const user = await prisma.user.create({
            data: {
                name,
                apiKey
            }
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