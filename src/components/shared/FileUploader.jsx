import React, { useCallback, useState } from 'react'
import { useDropzone } from 'react-dropzone'
import { Button } from '@/components/ui/button';
const FileUploader = ({fieldChange, mediaUrl}) => {
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
    <div 
      className='flex flex-col flex-center cursor-pointer bg-dark-3 rounded-xl'
      {...getRootProps()}
    >
        <input className='cursor-pointer' {...getInputProps()} />
        {
        fileUrl ? (
              <>  
                <div className='flex flex-1 justify-center p-5 lg:p-10 w-full' >
                    <img 
                    src={fileUrl}
                    alt="image" 
                    className='file_uploader-img'                    
                    />
                </div>
                <p className='file_uploader-label'>Click or drag photo to replace</p>
                
             </>
             ) : (
            <div className='file_uploader-box'>
                <img 
                    src="../../../puplic/assets/icons/file-upload.svg"
                    alt="file-upload"
                    width={96}
                    height={77} 
                />

                <h3 className='base-medium mb-2 mt-6 text-light-2'>Drag photo here</h3>
                <p className='small-regular text-light-4 mb-6'>SVG, PNG, JPG</p>

                <Button className='shad-button_dark_4'>Select from computer</Button>
            
            </div>)
        }
    </div>
  )
}

export default FileUploader