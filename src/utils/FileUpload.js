import {useState} from "react";

const cloud_name = 'dwx9rqfjh';
const preset = 'z87owhgv';

export const FileUpload = async (file: File): Promise<string | null> => {
    const cloudinaryUrl = `https://api.cloudinary.com/v1_1/${cloud_name}/image/upload`

    const formData = new FormData();
    formData.append('upload_preset', `${preset}`)
    formData.append('file', file);

    const [errMsg, setErrMsg] = useState('');

    try {
        const res = await fetch(cloudinaryUrl, {
            method: 'POST',
            body: formData
        });

        if (!res.ok)
            return null;

        const data = await res.json();
        return data.secure_url;

    } catch (error) {
        setErrMsg('El servidor no responde');
        return null;
    }
};
