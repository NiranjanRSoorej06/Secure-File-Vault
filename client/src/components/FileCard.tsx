import type { FileType } from "../types";

type Props = {
    file:FileType;
    onDownload: (
        id: string,
        filename: string
    ) => void;
    onDelete: (id: string) => void;
};

function FileCard({
    file,
    onDownload,
    onDelete,
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
        </li>
    );
}

export default FileCard;