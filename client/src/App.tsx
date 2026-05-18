import { useEffect,useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "./api";
import type { FileType } from "./types";
import { isLoggedIn } from "./utils/auth";

import Header from "./components/Header";
import UploadBox from "./components/UploadBox";
import FileList from "./components/FileList";
import { toast } from "react-toastify";
import StatsCards from "./components/StatsCard";

function App(){
  const [files,setFiles] =useState<FileType[]>([]);
  const [file,setFile] = useState<File | null>(null);
  const [loading,setLoading] = useState(false);
  const [page,setPage] = useState(1);
  const [pages,setPages] = useState(1);
  const [search,setSearch] = useState("");

  const token = localStorage.getItem("token");

  const navigate = useNavigate();
  const safePages = Math.max(1, pages);
  const hasPreviousPage = page > 1;
  const hasNextPage = page < safePages;

  //fetch files
  const getFiles = async () =>{
    try{
      const res = await API.get(
        `/files?page=${page}&limit=5&search=${search}`,
        {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const nextPages = Math.max(1, res.data.pages || 0);

      setFiles(res.data.files);

      setPages(nextPages);

      if (page > nextPages) {
        setPage(nextPages);
      }
    }catch(err){
      console.log(err);
      toast.error("Failed to fetch files");
    }
  };
   
  useEffect(() => {

    //if no token -> login
    if(!isLoggedIn()){
      navigate("/login");
      return;
    }
    getFiles();
  },[page,search]);

  //upload file
  const uploadFile = async () =>{
    if(!file) return;

    const formData = new FormData();
    formData.append("file",file);

    setLoading(true);

    try{
      await API.post("/files/upload",formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      getFiles();

      toast.success("File uploaded");
    }catch(err){
      console.log(err);
      toast.error("Upload failed");
    }
    setLoading(false);
  };

  //Delete file
  const deleteFile = async (id: string) => {
    
    setLoading(true);
    try{
      await API.delete(`/files/${id}`,{
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      toast.success("File deleted successfully");

      getFiles();
    }catch(err){
      console.log(err);
      toast.error("Delete failed");
    }

    setLoading(false);
  };

  const renameFile = async (
    id:string,
    currentName:string
  ) => {

    const newName=prompt(
      "Enter new file name",
      currentName
    );

    if(!newName) return;

    setLoading(true);

    try{
      await API.put(
        `/files/${id}/rename`,
        {
          newName,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      toast.success("File renamed");
      getFiles();
    }catch(err){
      console.log(err);
      toast.error("Rename failed");
    }

    setLoading(false);
  };

  //Download file
  const downloadFile = async (id: string,filename: string) => {
    try{
      const response = await API.get(`/files/${id}`,{
        responseType: "blob",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      //create downlodable URL
      const url = window.URL.createObjectURL(
        new Blob([response.data])
      );

      //create temporary link
      const link = document.createElement("a");
      link.href=url;
      link.setAttribute("download",filename);

      document.body.appendChild(link);
      link.click();

      link.remove();
    }catch(err){
      console.log(err);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white p-6">
      
      <div className="max-w-5xl mx-auto">
        <Header
          onLogout={()=> {
            try {
              localStorage.removeItem("token");
              toast.success("Logout successful");
              navigate("/login");
            } catch (err) {
              console.log(err);
              toast.error("Logout failed");
            }
          }}
        />

        <div style={{ marginBottom:"20px"}}>

          <input
            className="
            px-4 py-2
            rounded-lg
            bg-slate-800
            border border-slate-700
            text-white
            outline-none
            w-full
            max-w-sm
            "
            type="text"
            placeholder="Search files..."
            value={search}
            onChange={(e)=>{
              setSearch(e.target.value);
              setPage(1);
            }}
          />

        </div>
        
        <StatsCards files={files} />

        <UploadBox
          file={file}
          setFile={setFile}
          uploadFile={uploadFile}
          loading={loading}
        />

        <FileList
          files={files}
          onDownload={downloadFile}
          onDelete={deleteFile}
          onRename={renameFile}
          loading={loading}
        />

        <div className="mt-6 flex flex-col gap-4 rounded-2xl border border-slate-800 bg-slate-900/80 p-4 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm text-slate-400">
            Showing page <span className="text-white">{page}</span> of <span className="text-white">{safePages}</span>
          </p>

          <div className="flex items-center gap-3">
          <button
            disabled={!hasPreviousPage}
            onClick={()=>setPage((currentPage)=>Math.max(1, currentPage-1))}
            className="rounded-lg border border-slate-700 bg-slate-950 px-4 py-2 text-sm font-medium text-slate-200 transition hover:border-slate-600 hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-40"
          >
            Prev
          </button>

          <button
            disabled={!hasNextPage}
            onClick={()=>setPage((currentPage)=>Math.min(safePages, currentPage+1))}
            className="rounded-lg border border-slate-700 bg-slate-950 px-4 py-2 text-sm font-medium text-slate-200 transition hover:border-slate-600 hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-40"
          >
            Next
          </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;