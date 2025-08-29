// import React, { useState,useEffect } from "react";
// import {Trophy, Upload} from "lucide-react";

// const API_URL="http://localhost:8000/predict";


// export default function MainCard(){
//     const[image,setImage]=useState(null);
//     const[previewURL,setPreviewURL]=useState(null);
//     const[loading,setLoading]=useState(false);
//     const[result,setResult]=useState(null);
//     const[error,setError]=useState(null);


//     useEffect(()=>{
//         return() =>{
//             if(previewURL) URL.revokeObjectURL(previewURL);
//         };
//     }, [previewURL]);

//     const handlefile=(event)=>{
//         setResult(null);
//         setError(null);
//         const file=event.target.files[0];
//         if(file && file.type.startsWith("image/")){
//             if(previewURL) URL.revokeObjectURL(previewURL);
//             setImage(file);
//             setPreviewURL(URL.createObjectURL(file));
//         }
//     };

//     const handledrop=(event)=>{
//         event.preventDefault();
//         setResult(null);
//         setError(null);
//         const file=event.dataTransfer.files[0];
//         if(file && file.type.startsWith("image/")){
//             if(previewURL) URL.revokeObjectURL(previewURL);
//             setImage(file);
//             setPreviewURL(URL.createObjectURL(file));
//         }
//     };

//     const sendImage=async()=>{
//         setResult(null);
//         setError(null);
//         if(!file){
//             setError("No image selected");
//             return;
//         }

//         const formData=new FormData();
//         formData.append("file",file);

//         try{
//             setLoading(true);
//             const resp=await fetch(API_URL, {
//                 method: "POST",
//                 body: formDATA,
//             });

//             if(!resp.ok){
//                 const errTExt= await resp.text();
//                 throw new Error(`Server returned ${resp.status}: ${errText}`);
//             }

//             const json = await resp.json();
//             setResult(json);
//         }catch(err){
//             console.error(err);
//             setError(err.message || "Unexpected Error");
//         } finally{
//             setLoading(false);
//         }
//     };
//     return(
//         <>
//         <div className="mainArea">
//             <h3 className="instruction">
//                 Select or drag an image to upload and preview it instantly.
//             </h3>
//         </div>
//         <label className="imageSelection">
//             Select Image
//             <input type="file" accept="image/" className="hidden" onChange={handlefile} />
//         </label>
//         <div onDrop={handledrop} onDragOver={(e) => e.preventDefault()} className="dragAndDrop">
//             <Upload className="dragImageHere">
//                 <p>Drag and Drop Images here</p>
//             </Upload>
//         </div>
        

//         {previewUrl && (<div className="displayImage">
//             <h3 className="imagePreviewText">Preview:</h3>
//             <img src={previewUrl} alt="uploaded preview" className="imagePreview" style={{ maxWidth: "100%", height: "auto" }} />
//             </div>
//         )}

//         <div className="sendDiv">
//             <button onCLick={sendImage} disabled={loading || !file}>
//                 {loading ? "Sending..." : "Send to Server"}
//             </button>
//             <button onClick={() => {
//                 if (previewUrl) URL.revokeObjectURL(previewUrl);
//                 setPreviewUrl(null);
//                 setFile(null);
//                 setResult(null);
//                 setError(null);
//             }}
//             >
//             Clear
//             </button>
//         </div>
//         {error && (
//             <div className="errorMessage">
//                 <strong>Error:</strong>{error}
//             </div> 
//         )}
//         {result && (
//             <div style={{ marginTop: 12 }}>
//                 <h4>Prediction</h4>
//                 <div>Label: <strong>{result.label}</strong></div>
//                 <div>Score: <strong>{(result.score * 100).toFixed(2)}%</strong></div>
//                 </div>
//             )}
//         </>
//     );
// }


import React, { useState, useEffect } from "react";
import { Upload } from "lucide-react";

const API_URL = "http://localhost:8000/predict";

export default function MainCard() {
  const [image, setImage] = useState(null);
  const [previewURL, setPreviewURL] = useState(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    return () => {
      if (previewURL) URL.revokeObjectURL(previewURL);
    };
  }, [previewURL]);

  const handleFile = (event) => {
    setResult(null);
    setError(null);
    const file = event.target.files[0];
    if (file && file.type.startsWith("image/")) {
      if (previewURL) URL.revokeObjectURL(previewURL);
      setImage(file);
      setPreviewURL(URL.createObjectURL(file));
    }
  };

  const handleDrop = (event) => {
    event.preventDefault();
    setResult(null);
    setError(null);
    const file = event.dataTransfer.files[0];
    if (file && file.type.startsWith("image/")) {
      if (previewURL) URL.revokeObjectURL(previewURL);
      setImage(file);
      setPreviewURL(URL.createObjectURL(file));
    }
  };

  const sendImage = async () => {
    setResult(null);
    setError(null);
    if (!image) {
      setError("No image selected");
      return;
    }

    const formData = new FormData();
    formData.append("file", image);

    try {
      setLoading(true);
      const resp = await fetch(API_URL, {
        method: "POST",
        body: formData,
      });

      if (!resp.ok) {
        const errText = await resp.text();
        throw new Error(`Server returned ${resp.status}: ${errText}`);
      }

      const json = await resp.json();
      setResult(json);
    } catch (err) {
      console.error(err);
      setError(err.message || "Unexpected Error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="mainArea">
        <h3 className="instruction">
          Select or drag an image to upload and preview it instantly.
        </h3>
      </div>

      <label className="imageSelection">
        Select Image
        <input
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleFile}
        />
      </label>

      <div
        onDrop={handleDrop}
        onDragOver={(e) => e.preventDefault()}
        className="dragAndDrop"
      >
        <Upload className="dragImageHere" />
        <p>Drag and Drop Images here</p>
      </div>

      {previewURL && (
        <div className="displayImage">
          <h3 className="imagePreviewText">Preview:</h3>
          <img
            src={previewURL}
            alt="uploaded preview"
            className="imagePreview"
            style={{ maxWidth: "100%", height: "auto" }}
          />
        </div>
      )}

      <div className="sendDiv">
        <button onClick={sendImage} disabled={loading || !image}>
          {loading ? "Sending..." : "Send to Server"}
        </button>
        <button
          onClick={() => {
            if (previewURL) URL.revokeObjectURL(previewURL);
            setPreviewURL(null);
            setImage(null);
            setResult(null);
            setError(null);
          }}
        >
          Clear
        </button>
      </div>

      {error && (
        <div className="errorMessage">
          <strong>Error:</strong> {error}
        </div>
      )}

      {result && (
        <div style={{ marginTop: 12 }}>
          <h4>Prediction</h4>
          <div>
            Label: <strong>{result.label}</strong>
          </div>
          <div>
            Score: <strong>{(result.score * 100).toFixed(2)}%</strong>
          </div>
        </div>
      )}
    </>
  );
}
