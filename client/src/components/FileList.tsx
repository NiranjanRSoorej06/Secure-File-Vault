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

    if(files.length===0){
        return (
            <div
                className="
                    bg-slate-900
                    border border-slate-800
                    rounded-2xl p-10
                    text-center mt-6
                "
            >
                <div className="text-6xl mb-4">
                    📂
                </div>

                <h2 className="text-2xl font-bold">
                    No Files Yet
                </h2>

                <p className="text-slate-400 mt-2">
                    Upload your first file
                </p>
            </div>
        )
    }

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