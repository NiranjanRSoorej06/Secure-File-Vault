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
        <div
            className="
            bg-slate-900
            border border-slate-800
            rounded-2xl
            p-5
            mb-5
            flex
            items-center
            justify-between
            gap-4
            flex-wrap
            "
        >

            {/* LEFT */}
            <div className="flex items-center gap-4">

            {/* Image Preview */}
            {
                file.fileUrl?.match(
                /\.(jpg|jpeg|png)$/i
                ) ? (
                
                    <div
                        className="
                            w-20
                            h-20
                            rounded-xl
                            overflow-hidden
                            border border-slate-700
                            flex-shrink-0
                        "
                        >
                        <img
                            src={file.fileUrl}
                            alt={file.originalName}
                            className="
                            w-full
                            h-full
                            object-cover
                            "
                        />
                        </div>

                ) : (
                <div
                    className="
                    w-20
                    h-20
                    rounded-xl
                    bg-slate-800
                    flex
                    items-center
                    justify-center
                    text-3xl
                    "
                >
                    📄
                </div>
                )
            }

            {/* File Name */}
            <div>
                <p
                className="
                    text-lg
                    font-medium
                    break-all
                "
                >
                {file.originalName}
                </p>
            </div>

            </div>

            {/* RIGHT */}
            <div className="flex gap-3">

            <button
                onClick={() =>
                onDownload(
                    file._id,
                    file.originalName
                )
                }
                className="
                bg-slate-700
                hover:bg-slate-600
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
    );
}

export default FileCard;