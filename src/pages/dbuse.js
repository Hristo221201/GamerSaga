import { User } from './bdconection.js';
import express from "express";
import cors from "cors";
const app=express();
app.use(express.json());
app.use(cors());


app.get("/", async(req, res) => {
    const snapshot = await User.get();
    const list = snapshot.docs.map((doc) => ({ id: doc.id,  ...doc.data() }));
    res.send(list);
});

app.post("/create", async(req, res) => {
    try {
        const data = req.body;
        await User.add(data);
        res.send({ msg: "User Added" });
    } catch (error) {
        console.error("Error al crear usuario:", error);
        res.status(500).send({ msg: "Error al crear usuario" });
    }
});

app.post("/update", async(req, res) => {
    const id = req.body.id;
    delete req.body.id;
    const data = req.body;
    await User.doc(id).update(data);
    res.send({ msg:"Updated" });
});

app.post("/delete", async(req, res) => {
    const id = req.body.id;
    await User.doc(id).delete();
    res.send({ msg:"Deleted" });
});


app.listen(8080, () => console.log("Up & Running *8080"));