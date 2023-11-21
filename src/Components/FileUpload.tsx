import axios from "axios";
import React, { useRef, useState } from "react";
import styled from "styled-components";
const Container = styled.div`
  padding: 5%;
  padding-bottom: 0;
`;

const UploadBox = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 1.25rem;
`;

const UploadInput = styled.input`
  display: none;
`;

const CustomButton = styled.label`
  padding: 2% 5%;
  font-size: 1.125rem;
  font-weight: 600;
  color: #287657;
  border: 0.125rem solid #a0f1d0;
  border-radius: 0.625rem;
  cursor: pointer;
  margin-right: 1.25rem;
`;

const FileName = styled.span`
  margin-right: 0.625rem;
`;

const FileUpload = () => {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [fileName, setFileName] = useState<string | null>(null);

  const backendServer = process.env.REACT_APP_BASE_URL;
  const accessToken = localStorage.getItem("accessToken");

  const config = {
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "multipart/form-data",
    },
  };

  const handleFileChange = () => {
    if (fileInputRef.current && fileInputRef.current.files) {
      const selectedFile = fileInputRef.current.files[0];
      setFileName(selectedFile.name);

      const formData = new FormData();
      formData.append("image", selectedFile);

      axios
        .patch(
          `https://jihyuncap.store/api/v1/users/upload-image`,
          formData,
          config
        )
        .then((res) => {
          const profileURL = res.data.data.image;
          console.log("Profile Image URL:", profileURL);
        })
        .catch((error) => {
          console.log(error);
        });
    }
    window.location.reload();
  };

  return (
    <Container>
      <UploadBox>
        <CustomButton htmlFor="file">프로필 사진 수정</CustomButton>
        {fileName && <FileName>{fileName}</FileName>}
        <UploadInput
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          ref={fileInputRef}
          id="file"
        />
      </UploadBox>
    </Container>
  );
};

export default FileUpload;
