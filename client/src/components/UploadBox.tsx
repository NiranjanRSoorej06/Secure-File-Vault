import { useState } from "react";

type Props ={
    file: File | null;

    setFile: React.Dispatch<React.SetStateAction<File | null>>;

    uploadFile: () =>void;

    loading:boolean;
};

function UploadBox({ 
    file,
    setFile,
    uploadFile,
    loading,
 }:Props){

    const [dragging,setDragging ] = useState(false);

    //drag enter
    const handleDragOver = (
        e:React.DragEvent<HTMLDivElement>
    ) => {
        e.preventDefault();
        setDragging(true);
    };

    //drag leave
    const handleDragLeave = () =>{
        setDragging(false);
    };

    //drop file
    const handleDrop = (
        e:React.DragEvent<HTMLDivElement>
    ) => {
        e.preventDefault();

        setDragging(false);

        const droppedFile = e.dataTransfer.files[0];

        if(droppedFile){
            setFile(droppedFile);
        }
    };

    return (
        <div
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            className={`
               border-2 border-dashed
               rounded-2xl p-8 mb-6
               transition-all
               flex flex-col
               items-center justify-center
               gap-4

               ${
                dragging
                ?"border-violet-500 bg-slate-800"
                :"border-slate-700 bg-slate-900"
               }
            `}
        >
            <p className="text-lg font-medium">
                Drag & Drop Files Here
            </p>

            <p className="text-slate-400">
                or choose manually
            </p>

            {file && (
                <p className="text-viole-400">
                    Selected: {file.name}
                </p>
            )}

            <input 
                type="file"
                onChange={(e) => 
                    setFile(e.target.files?.[0]||null)
                }
            />

            <button 
                onClick={uploadFile}
                disabled={loading}
                className="
                    bg-violet-600
                    hover:bg-violet-700
                    px-5 py-2
                    rounded-lg
                    font-medium
                "
            >
               {loading
                ?"Uploading..."
                :"Upload"}
            </button>
        </div>
    );
}

export default UploadBox;