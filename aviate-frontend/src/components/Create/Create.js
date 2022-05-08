import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./Create.css";

const Create = () => {
  // get all genders
  const [genders, setGenders] = useState({ genders: [] });
  // for displaying a single gender
  const [gender, setGender] = useState("Choose");
  // file upload
  // const [selectedFile, setSelectedFile] = useState();
  // file onchange
  // const onFileChange = (file) => {
  //   setSelectedFile(file);
  //   console.log(selectedFile);
  // };
  // // upload the file
  // const onFileUpload = async () => {
  //   const formData = new FormData();

  //   formData.append("file", selectedFile);
  //   console.log(formData);
  //   const response = await fetch("http://127.0.0.1:8000/upload-file", {
  //     method: "POST",
  //     headers: { "Content-Type": "multipart/form-data" },
  //     body: formData,
  //   });
  //   const parseResponse = await response.json();
  //   console.log(parseResponse);
  //   setInputs({ ...inputs, resume_url: parseResponse.url });
  // };
  // handle change for gender select
  const changeGender = (value) => {
    setGender(value);
    setInputs({ ...inputs, gender: value });
  };

  // fetch all genders
  const fetchGenders = async () => {
    try {
      const response = await fetch("http://127.0.0.1:8000/genders");
      const parseResponse = await response.json();
      console.log(parseResponse);
      setGenders(parseResponse);
    } catch (err) {
      console.error(err.message);
    }
  };
  // const fileData = () => {
  //   if (selectedFile) {
  //     return (
  //       <div>
  //         <h3>File Details:</h3>
  //         <p>File Name: {selectedFile.name}</p>
  //         <p>File Type: {selectedFile.type}</p>
  //         <p>Last Modified: {selectedFile.lastModifiedDate.toDateString()}</p>
  //       </div>
  //     );
  //   } else {
  //     return (
  //       <div>
  //         <br />
  //         <h4>Choose before Pressing the Upload button</h4>
  //       </div>
  //     );
  //   }
  // };

  useEffect(() => {
    fetchGenders();
  }, []);

  // form data
  const [inputs, setInputs] = useState({
    name: "",
    contact_No: "",
    email_id: "",
    description: "",
    resume_url: "",
    experience: "",
    address: "",
    age: "",
    gender: "",
    status: "",
  });
  // handlechange for form data
  const handleChange = (e) => {
    setInputs({ ...inputs, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setInputs({ ...inputs, resume_url: "www.123example.com" });
    console.log(inputs);

    try {
      const response = await fetch("http://127.0.0.1:8000/candidate/add", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(inputs),
      });
      const parseResponse = await response.json();
      console.log(parseResponse);
    } catch (err) {
      console.error(err.message);
    }
  };

  return (
    <div className="create-wrapper">
      <form onSubmit={handleSubmit} className="create-form">
        <h1>Add Candidate</h1>
        <label className="create-form-label">
          Name:
          <input
            type="text"
            name="name"
            value={inputs.name || ""}
            onChange={handleChange}
          />
        </label>
        <label className="create-form-label">
          Contact Number:
          <input
            type="text"
            name="contact_No"
            value={inputs.contact_No || ""}
            onChange={handleChange}
          />
        </label>
        <label className="create-form-label">
          Email ID:
          <input
            type="email"
            name="email_id"
            value={inputs.email_id || ""}
            onChange={handleChange}
          />
        </label>
        <label className="create-form-label">
          Description:
          <input
            type="textarea"
            name="description"
            value={inputs.description || ""}
            onChange={handleChange}
          />
        </label>
        <label className="create-form-label">
          Experience:
          <input
            type="textarea"
            name="experience"
            value={inputs.experience || ""}
            onChange={handleChange}
          />
        </label>
        <label className="create-form-label">
          Address:
          <input
            type="textarea"
            name="address"
            value={inputs.address || ""}
            onChange={handleChange}
          />
        </label>
        <label className="create-form-label">
          Age:
          <input
            type="number"
            name="age"
            value={inputs.age || ""}
            onChange={handleChange}
          />
        </label>
        <label className="create-form-label">
          Gender:
          <select
            name="gender"
            id="gender"
            value={gender}
            onChange={(e) => changeGender(e.target.value)}
          >
            {genders.genders.map((item, i) => {
              return (
                <option value={item} key={i}>
                  {item}
                </option>
              );
            })}
          </select>
        </label>
        {/* <label className="create-form-label"> Resume:</label>
        <label className="create-form-label">
          <input
            type="file"
            id="file"
            name="resume_url"
            value={inputs.file || ""}
            onChange={(e) => onFileChange(e.target.files[0])}
            style={{ display: "none" }}
          />
          <button onClick={(e) => onFileUpload(e)}>Upload</button>
          {fileData()}
        </label> */}
        <div className="create-submit-button">
          <input type="submit" className="sbm-btn" />
        </div>
        <div className="create-back-button">
          <Link to="/">
            <button className="bck-btn">Go Back</button>
          </Link>
        </div>
      </form>
    </div>
  );
};

export default Create;
