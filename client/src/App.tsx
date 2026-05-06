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
                window.open(`http://localhost:5000/api/files/${f._id}`)
              }
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