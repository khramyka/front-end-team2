import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import "./DropZone.scss";
function DropZone(props: {uploadPhoto: any}) {
    const style = {
        height: 100,
        padding: 20
    }

    const onDrop = useCallback(acceptedFiles => {
        props.uploadPhoto(acceptedFiles[0])
    }, [])
    const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop })
    return (
        <div style={style} {...getRootProps()}>
            <input {...getInputProps()}
            />
            <div className="dropzone__label">
                {
                    isDragActive ?
                        <p>Drop the photo here...</p> :
                        <p>Drag and drop file here, or click to select the file</p>
                }
            </div>
        </div>
    )
}
export default DropZone;

