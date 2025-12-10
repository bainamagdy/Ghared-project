// src/routes/transactionRoutes.js
import express from "express";
import { createTransaction, getTransactionTypes, getInbox, getSent } from "../controllers/transactionController.js";
import { protect } from "../middelware/authMiddleware.js";
import { checkPermission } from "../middelware/permissionMiddleware.js";
import asyncWrapper from "../middelware/asyncWrapper.js";

const router = express.Router();

router.get("/types", protect, asyncWrapper(getTransactionTypes));
router.post("/", protect, checkPermission, asyncWrapper(createTransaction));
router.get("/inbox", protect, asyncWrapper(getInbox));
router.get("/sent", protect, asyncWrapper(getSent));

export default router;
