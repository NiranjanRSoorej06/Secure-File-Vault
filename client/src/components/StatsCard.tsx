import type { FileType } from "../types";

type Props = {
    files: FileType[];
};

function StatsCards({
    files,
}:Props) {

    //total files
    const totalFiles = files.length;

    //images
    const imageCount = files.filter(
        (file)=>
            file.originalName.endsWith(".jpg") ||
            file.originalName.endsWith(".jpeg") ||
            file.originalName.endsWith(".png")
    ).length;

    //pdf
    const pdfCount = files.filter(
        (file) =>
            file.originalName.endsWith(".pdf")
    ).length;

    //storage
    const totalStorage = (
        files.reduce(
            (acc,file)=>
                acc+(file.fileSize || 0),
            0
        ) / (1024*1024)
    ).toFixed(2);

    const cards = [
        {
            title:"Total Files",
            value: totalFiles
        },
        {
            title:"Images",
            value:imageCount,
        },
        {
            title:"PDFs",
            value:pdfCount,
        },
        {
            title:"Storage Used",
            value:`${totalStorage} MB`,
        },
    ];

    return (
        <div
            className="
            grid grid-cols-1
            md:grid-cols-2
            lg:grid-cols-4
            gap-4 mb-6
            "
        >
            {cards.map((card) =>(
                <div
                    key={card.title}
                    className="
                        bg-slate-900
                        border border-slate-800
                        rounded-2xl 
                        p-5
                    "
                >
                    <p className="text-slate-400">
                        {card.title}
                    </p>

                    <h2
                        className="
                            text-3xl
                            font-bold
                            mt-2
                        "
                    >
                        {card.value}
                    </h2>
                </div>
            ))}

        </div>
    );
}

export default StatsCards;