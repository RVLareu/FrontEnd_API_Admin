import {useState} from "react";

const multer = require("../components/Multer");

const cloudinary = require('cloudinary');


cloudinary.config({
    cloud_name: 'dwx9rqfjh',
    api_key: '941379813488677',
    api_secret: 'yKXNuX7eIkwuCCRyIKb97IPk8OU'
});

function App() {
    const [file, setFile] = useState(null);

    const CLOUD_NAME = "CLOUD_NAME"
    const UPLOAD_PRESET = "UPLOAD_PRESET"

    const upload = async () => {
        const data1 = new FormData();
        data1.append("file", file);
        data1.append("upload_preset", CLOUD_NAME);
        const response = await fetch(`https://api.cloudinary.com/v1_1/${UPLOAD_PRESET}/upload`,
            { method: "POST", body: data1 })
        const data2 = await response.json()
        console.log(data2) // reemplazar con un mensaje de éxito o la acción deseada
    };

    return (
        <div className="App">
            <input type="file" onChange={(e) => setFile(e.target.files[0])}></input>
            <button onClick={upload}>Upload</button>
        </div>
    );
}

app.post("/upload", uploader.single("file"), async (req, res) => {
    const upload = await cloudinary.v2.uploader.upload(req.file.path);
    return res.json({
        success: true,
        file: upload.secure_url,
    });
});

module.exports = cloudinary;
