import React, { useCallback, useState } from 'react'
import { useDropzone } from 'react-dropzone'
import { Button } from '@/components/ui/button';
const ProfileUploader = ({fieldChange, mediaUrl}) => {
    const [file, setFile] = useState([])
    const [fileUrl, setFileUrl] = useState(mediaUrl)

    const onDrop = useCallback(acceptedFiles => {
        // Do something with the files
        setFile(acceptedFiles);
        fieldChange(acceptedFiles);
        setFileUrl(URL.createObjectURL(acceptedFiles[0]));
      }, [file])
    const {getRootProps, getInputProps} = useDropzone({
        onDrop,
        accept: {
            'image/*': ['.png', '.jpeg', '.jpg']
        }
    })
    
  return (
    <div {...getRootProps()}>
        <input className='cursor-pointer' {...getInputProps()} />  

        <div className='flex-center gap-4 cursor-pointers'>
            <img 
                src={ fileUrl || "../../../puplic/assets/icons/file-upload.svg"}
                className="h-24 w-24 rounded-full object-cover object-top"
                alt="file-upload"
                
            />

            <p className="text-primary-500 small-regular md:bbase-semibold">
            Change profile photo
            </p>
        
        </div>        
    </div>
  )
}

export default ProfileUploader