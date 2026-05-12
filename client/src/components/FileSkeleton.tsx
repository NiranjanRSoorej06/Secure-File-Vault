function FileSkeleton () {
    return (
        <div
            className="
                bg-slate-900
                border border-slate-800
                rounded-2xl
                p-5 mb-5
                animate-pulse
            "
        >
            <div className="flex items-center gap-4">

                {/* Thumbnail */}
                <div 
                    className="
                        w-20 h-20
                        rounded-xl
                        bg-slate-800
                    "
                />

                {/* Text*/}
                <div className="flex-1">

                    <div 
                        className="
                            h-5 w-1/3
                            bg-slate-800
                            rounded
                        "
                    />
                </div>
            </div>
        </div>
    );
}
export default FileSkeleton;