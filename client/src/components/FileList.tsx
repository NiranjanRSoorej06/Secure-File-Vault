import type { FileType } from "../types";
import FileCard from "./FileCard";

type Props ={
    files: FileType[];
    onDownload: (
        id: string,
        filename: string
    )=> void;
    onDelete: (id:string) => void;
    onRename:(
        id:string,
        currentName:string
    ) => void;
};

function FileList({
    files,
    onDownload,
    onDelete,
    onRename,
}: Props){
    return (
        <ul>
            {files.map((file)=>(
                <FileCard
                    key={file._id}
                    file={file}
                    onDownload={onDownload}
                    onDelete={onDelete}
                    onRename={onRename}
                />
            ))}
        </ul>
    );
}

export default FileList;