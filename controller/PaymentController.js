import prisma from "../models/index.js";

/*
 * CRUD Operations for Payment
 */
export const createTransaction = async (req, res) => {
  const apiKey = req.headers["x-api-key"];
  try {
    const { transactionType, amount, description } = req.body;
    if (transactionType === "" || transactionType == null) {
      res.status(500).json({ error: "Transaction type is required" });
    }
    if (amount === "" || amount == null) {
      res.status(500).json({ error: "Amount is required" });
    }
    if (description === "" || description == null) {
      res.status(500).json({ error: "Description is required" });
    }

    const { name } = await prisma.user.findFirst({
      where: { apiKey },
    });

    const transaction = await prisma.transaction.create({
      data: {
        transactionType,
        amount,
        description,
        status: "PENDING",
        user: {
          connect: {
            name,
          },
        },
      },
    });

    res.status(201).json(transaction);
  } catch (err) {
    res.status(404).json({ error: err.message });
  }
};

export const readTransaction = async (req, res) => {
  const { transactionId } = req.params;
  try {
    const transaction = await prisma.transaction.findFirst({
      where: { id: transactionId },
    });

    if (transaction) {
      res.json(transaction);
    } else {
      res.status(404).json({ error: "Transaction not found" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const readAllTransaction = async (req, res) => {
  try {
      const transactions = await prisma.transaction.findMany({
          where: {
            transactionOwner: req.userName
        }
    });
    res.json(transactions);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const updateTransaction = async (req, res) => {
  const { transactionId } = req.params;
  try {
    const transaction = await prisma.transaction.update({
      where: { id: transactionId },
      data: req.body,
    });

    res.json(transaction);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const deleteTransaction = async (req, res) => {
  const { transactionId } = req.params;
  try {
    const transaction = await prisma.transaction.delete({
      where: { id: transactionId },
    });

    res.json("Succesfully deleted transaction" + " " + transactionId);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

/*
 *   Process and refund transaction
 */

export const acceptTransaction = async (req, res) => {
  const { transactionId } = req.params;
  try {
    const transaction = await prisma.transaction.update({
      where: {
        id: transactionId,
      },
      data: {
        status: "SUCCESS",
      },
    });
    res.json(transaction);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const rejectTransaction = async (req, res) => {
  const { transactionId } = req.params;
  try {
    const transaction = await prisma.transaction.update({
      where: {
        id: transactionId,
      },
      data: {
        status: "FAILED",
      },
    });
    res.json(transaction);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const refundTransaction = async (req, res) => {
  const { transactionId } = req.params;
  try {
    const transaction = await prisma.transaction.update({
      where: {
        id: transactionId,
      },
      data: {
        status: "REFUNDED",
      },
    });
    res.json(transaction);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
