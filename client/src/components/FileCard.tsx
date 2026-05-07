import type { FileType } from "../types";

type Props = {
    file:FileType;
    onDownload: (
        id: string,
        filename: string
    ) => void;
    onDelete: (id: string) => void;
    onRename:(
        id:string,
        currentName:string
    ) => void
};

function FileCard({
    file,
    onDownload,
    onDelete,
    onRename,
}: Props ){
    return (
        <li
            style={{
                marginBottom:"10px",
            }}
        >
            {file.originalName}

            <button
                onClick={()=>
                    onDownload(file._id,file.originalName)
                }
            >
                Download
            </button>

            <button
                onClick={()=>onDelete(file._id)}
            >
                Delete
            </button>

            <button 
                onClick={() =>onRename(file._id,file.originalName)}
            >
                Rename
            </button>
        </li>
    );
}

export default FileCard;