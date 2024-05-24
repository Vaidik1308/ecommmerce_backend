import express from "express";
const PORT = 8800;
const app = express();
app.listen(PORT, () => {
    console.log(`port is running om http://localhost:${PORT}`);
});
