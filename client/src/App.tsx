import { useEffect,useState } from "react";
import API from "./api";
import type { FileType } from "./types";

function App(){
  const [files,setFiles] =useState<FileType[]>([]);
  const [file,setFile] = useState<File | null>(null);
  
  const token = localStorage.getItem("token");

  //fetch files
  const getFiles = async () =>{
    try{
      const res = await API.get("/files",{
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setFiles(res.data.files);
    }catch(err){
      console.log(err);
    }
  };

  useEffect(() => {
    getFiles();
  },[]);

  //upload file
  const uploadFile = async () =>{
    if(!file) return;

    const formData = new FormData();
    formData.append("file",file);

    try{
      await API.post("/files/upload",formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      getFiles();
    }catch(err){
      console.log(err);
    }
  };

  //Delete file
  const deleteFile = async (id: string) => {
    try{
      await API.delete(`/files/${id}`,{
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      getFiles();
    }catch(err){
      console.log(err);
    }
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
      <h2>Secure File Vault</h2>

      {/*Upload*/}
      <input type="file"
      onChange={(e) => setFile(e.target.files?.[0] || null)}
      />
      <button onClick={uploadFile}>Upload</button>

      {/* Filr List*/}
      <ul>
        {files.map((f)=>(
          <li key={f._id}>
            {f.originalName}

            <button
              onClick={() => 
                downloadFile(f._id,f.originalName)}
            >
              Download
            </button>
            <button onClick={()=> deleteFile(f._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;