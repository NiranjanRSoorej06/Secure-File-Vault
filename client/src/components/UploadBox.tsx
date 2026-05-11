type Props ={
    setFile: React.Dispatch<React.SetStateAction<File | null>>;

    uploadFile: () =>void;

    loading:boolean;
};

function UploadBox({ 
    setFile,
    uploadFile,
    loading,
 }:Props){
    return (
        <div
            className="
                bg-slate-900
                border border-slate-800
                p-6 rounded-2xl
                mb-6 flex
                gap-4
                items-center
                "
        >
            <input 
                type="file"
                onChange={(e) => 
                    setFile(e.target.files?.[0]||null)
                }
            />

            <button 
                onClick={uploadFile}
                disabled={loading}
                className="
                    bg-violet-600
                    hover:bg-violet-700
                    px-5 py-2
                    rounded-lg
                    font-medium
                "
            >
               {loading
                ?"Uploading..."
                :"Upload"}
            </button>
        </div>
    );
}

export default UploadBox;