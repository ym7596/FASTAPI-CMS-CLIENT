import {useState} from 'react';
import { Box, CircularProgress } from '@mui/material';

import AWS from 'aws-sdk';
import imageCompression from 'browser-image-compression';


const ImageUpload =({ onUpload })=> {
    const [imageUrl, setImageUrl] = useState('');
    const [loading, setLoading] = useState(false);


    const s3 = new AWS.S3({
        accessKeyId: import.meta.env.VITE_AWS_ACCESS_KEY_ID,
        secretAccessKey: import.meta.env.VITE_AWS_SECRET_ACCESS_KEY,
        region: 'ap-northeast-2'
    });

    const handleUpload = async (e) => {
        const file = e.target.files[0];

        const options ={
            maxSizeMB: 1,
            maxWidthOrHeight: 512,
            useWebWorker: true
        };

        try{
            const compressFile = await imageCompression(file, options);

            const params = {
                Bucket: 'cmsbucketdev',
                Key: `imgs/${compressFile.name}`,
                Body: compressFile
            };

            setLoading(true);
            s3.upload(params, (err, data) => {
                if(err) throw err;
                console.log(data);
                setImageUrl(compressFile.name);
                onUpload(compressFile.name);
                setLoading(false);
            });
        }
        catch(error){
            console.error(error);
        }
    };


    return(
        <Box sx={{mt:2}}>
            <input type='file' accept='image/*' onChange={handleUpload}/>
            {loading ? ( <CircularProgress sx={{mt:2}} />)
            : (
                imageUrl && <img src={`${import.meta.env.VITE_AWS_ENDPOINT}${imageUrl}`} 
                alt='업로드이미지' style={{width:'200px', marginTop: '16px'}}/>
            )    
        }
        </Box>
    )
}

export default ImageUpload;