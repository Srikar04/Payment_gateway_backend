import prisma from "../models/index.js";

const authorizeMiddleware = async (req, res, next) => {
    const { transactionId } = req.params;
    const user = req.userName;
    try {
        const transaction = await prisma.transaction.findUnique({
            where: {
                id: transactionId,
            },
        });
        if (transaction.transactionOwner !== user) {
            return res.status(401).json({ error: "Unauthorized" });
        }
        next();
    }catch(err){
        res.status(401).json({ error: err.message });
    }
};

export default authorizeMiddleware;