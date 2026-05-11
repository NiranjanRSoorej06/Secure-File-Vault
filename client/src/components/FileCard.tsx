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
            className="
                bg-slate-900
                border
                border-slate-800
                p-5
                rounded-2xl
                mb-4
            "
        >   
            <div
            className="
                flex
                items-center
                justify-between
                gap-4
                flex-wrap
            "
            >
            
            {/* Left Side */}
            <div className="flex items-center gap-4">

                {/* Image Preview */}
                {isImage && file.fileUrl && (
                <img
                    src={`${file.fileUrl}?t=${Date.now()}`}
                    alt={file.originalName}
                    className="
                    w-24
                    h-24
                    object-cover
                    rounded-xl
                    "
                />
                )}

                <div>
                <p className="font-medium text-lg">
                    {file.originalName}
                </p>
                </div>
            </div>

            {/* Right Side */}
            <div className="flex gap-2 flex-wrap">

                <button
                onClick={() =>
                    onDownload(
                    file._id,
                    file.originalName
                    )
                }
                className="
                    bg-slate-800
                    hover:bg-slate-700
                    px-4
                    py-2
                    rounded-lg
                "
                >
                Download
                </button>

                <button
                onClick={() =>
                    onDelete(file._id)
                }
                className="
                    bg-red-600
                    hover:bg-red-700
                    px-4
                    py-2
                    rounded-lg
                "
                >
                Delete
                </button>

                <button
                onClick={() =>
                    onRename(
                    file._id,
                    file.originalName
                    )
                }
                className="
                    bg-violet-600
                    hover:bg-violet-700
                    px-4
                    py-2
                    rounded-lg
                "
                >
                Rename
                </button>

            </div>
            </div>
        </li>
    );
}

export default FileCard;