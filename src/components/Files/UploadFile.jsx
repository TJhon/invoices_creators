import { Upload } from "@mui/icons-material";
import { useState } from "react";
// import { uploadFile } from "../../appwrite/databases";

const UploadFile = () => {
  // const
  const [file, setFile] = useState(null);
  const [img, setImg] = useState(null);
  const [files, setFiles] = useState([]);
  //   console.log({ files });
  const handleUpload = async () => {
    if (file) {
      const { href } = await uploadFile(file);
      setImg(href);
      // console.log(href);
    }
  };

  const ImgPreview = () => {
    return (
      <img
        // src="https://i.ytimg.com/vi/mi7uFovlLoM/maxresdefault.jpg"
        alt="preview"
        src={img}
      />
    );
  };
  return (
    <div>
      <input
        type="file"
        // multiple
        onChange={(e) => setFile(e.target.files[0])}
      />
      <button onClick={() => handleUpload()}>
        Subir <Upload />{" "}
      </button>
      {/* <ImgPreview /> */}
      <input type="file" multiple onChange={(e) => setFiles(e.target.files)} />
      <button onClick={() => handleUploadFiles(files)}>
        Subir files <Upload />{" "}
      </button>
    </div>
  );
};
// https://cloud.appwrite.io/v1/storage/buckets/66a55831001cba9dd46e/files/66a5633b003788ab66b0/view?project=6697015d0014c6b78f08&mode=admin
// https://cloud.appwrite.io/v1/storage/buckets/66a55831001cba9dd46e/files/66a562fa0008fbf8b9c9/view?project=6697015d0014c6b78f08&mode=admin
//
export default UploadFile;
