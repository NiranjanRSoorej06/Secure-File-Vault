import type { FileType } from "../types";
import FileCard from "./Filecard";

type Props ={
    files: FileType[];
    onDownload: (
        id: string,
        filename: string
    )=> void;
    onDelete: (id:string) => void;
};

function FileList({
    files,
    onDownload,
    onDelete,
}: Props){
    return (
        <ul>
            {files.map((file)=>(
                <FileCard
                    key={file._id}
                    file={file}
                    onDownload={onDownload}
                    onDelete={onDelete}
                />
            ))}
        </ul>
    );
}

export default FileList;