import express from "express";
const app=express();
import cors from "cors";
app.use(cors());

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => console.log("Server started"));