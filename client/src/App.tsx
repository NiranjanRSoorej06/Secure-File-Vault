import { useEffect,useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "./api";
import type { FileType } from "./types";
import { isLoggedIn } from "./utils/auth";

import Header from "./components/Header";
import UploadBox from "./components/UploadBox";
import FileList from "./components/FileList";

function App(){
  const [files,setFiles] =useState<FileType[]>([]);
  const [file,setFile] = useState<File | null>(null);
  const [loading,setLoading] = useState(false);
  const [message,setMessage] = useState("");
  const [error,setError] = useState("");
  const [page,setPage] = useState(1);
  const [pages,setPages] = useState(1);
  const [search,setSearch] = useState("");

  const token = localStorage.getItem("token");

  const navigate = useNavigate();

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

      setFiles(res.data.files);
      setPages(res.data.pages);
    }catch(err){
      console.log(err);
      setError("Failed to fetch files");
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
    setError("");
    setMessage("");

    try{
      await API.post("/files/upload",formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      getFiles();
    }catch(err){
      console.log(err);
      setError("Upload failed");
    }
    setLoading(false);
  };

  //Delete file
  const deleteFile = async (id: string) => {
    
    setLoading(true);
    setError("");
    setMessage("");
    try{
      await API.delete(`/files/${id}`,{
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setMessage("File deleted successfully");

      getFiles();
    }catch(err){
      console.log(err);
      setError("Delete failed");
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
    setError("");
    setMessage("");

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

      setMessage("File renamed succesfully");
      getFiles();
    }catch(err){
      console.log(err);
      setError("Rename failed");
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
    <div style={{ padding: "20px" }}>
      
      <Header
        onLogout={()=> {
          localStorage.removeItem("token");
          navigate("/login");
        }}
      />

      {message && (
        <p style={{ color: "lightgreen" }}>
          {message}
        </p>
      )}

      {error && (
        <p style={{ color:"tomato"}}>
          {error}
        </p>
      )}
      <div style={{ marginBottom:"20px"}}>

        <input
          type="text"
          placeholder="Search files..."
          value={search}
          onChange={(e)=>{
            setSearch(e.target.value);
            setPage(1);
          }}
        />

      </div>

      <UploadBox
        setFile={setFile}
        uploadFile={uploadFile}
        loading={loading}
      />

      <FileList
        files={files}
        onDownload={downloadFile}
        onDelete={deleteFile}
        onRename={renameFile}
      />

      <div 
        style= {{
          marginTop:"20px",
          display:"flex",
          gap:"10px",
          alignItems:"center",
        }}
      >
        <button
          disabled={page === 1}
          onClick={()=>setPage(page-1)}
        >
          Prev
        </button>

        <span>
          Page {page} of {pages}
        </span>

        <button
          disabled={page===pages}
          onClick={()=>setPage(page+1)}
        >
          Next
        </button>
        
      </div>
    </div>
  );
}

export default App;