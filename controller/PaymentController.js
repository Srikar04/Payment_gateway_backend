import prisma from '../models/index.js';

const createTransaction = async (req, res) => {
    const apiKey = req.headers['x-api-key'];
    try {
        const { transactionType, amount, description } = req.body;
        const {id} = await prisma.user.findUnique({
            where: {apiKey}
        });

        const transaction = await prisma.transaction.create({
            data: {
                transactionType,
                amount,
                description,
                status: 'PENDING',
                user: {
                    connect: {
                        id
                    }
                }
            }
        })

        res.status(201).json(transaction);
    } catch (err) {
        res.status(404).json({error: err.message});
    }
}

export default createTransaction;