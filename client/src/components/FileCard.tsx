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

    const isImage =
        file.originalName.endsWith(".jpg") ||
        file.originalName.endsWith(".jpeg") ||
        file.originalName.endsWith(".png");
    const isPDF =
        file.originalName.endsWith(".pdf");

    return (
        <li
            style={{
                marginBottom:"10px",
            }}
        >   
            {/*Image Preview*/}
            {isImage && file.fileUrl && (
                <div>
                    <img 
                        src={`${file.fileUrl}?t=${Date.now()}`}
                        alt={file.originalName}
                        width={"120"}
                        style={{
                            borderRadius:"8px",
                            marginBottom:"10px"
                        }}
                    />
                </div>
            )}

            {/* PDF Preview*/}
            {isPDF && file.fileUrl && (
                <div style={{ marginBottom:"10px" }}>
                    <a
                        href={file.fileUrl}
                        target="_blank"
                    >
                        Preview PDF
                    </a>
                </div>
            )}

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