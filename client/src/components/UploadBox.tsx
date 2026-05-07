type Props ={
    setFile: React.Dispatch<React.SetStateAction<File | null>>;
    uploadFile: () =>void;
};

function UploadBox({ setFile,uploadFile }:Props){
    return (
        <div style={{marginBottom:"20px"}}>
            <input 
                type="file"
                onChange={(e) => 
                    setFile(e.target.files?.[0]||null)
                }
            />

            <button onClick={uploadFile}>
                Upload
            </button>
        </div>
    );
}

export default UploadBox;