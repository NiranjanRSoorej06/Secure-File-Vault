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
  
  const token = localStorage.getItem("token");

  const navigate = useNavigate();

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

    //if no token -> login
    if(!isLoggedIn()){
      navigate("/login");
      return;
    }
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
      
      <Header
        onLogout={()=> {
          localStorage.removeItem("token");
          navigate("/login");
        }}
      />

      <UploadBox
        setFile={setFile}
        uploadFile={uploadFile}
      />

      <FileList
        files={files}
        onDownload={downloadFile}
        onDelete={deleteFile}
      />
    </div>
  );
}

export default App;