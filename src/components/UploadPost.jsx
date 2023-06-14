import React, { useEffect, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";

const validationSchema = Yup.object().shape({
  title: Yup.string().required("Title is required"),
  description: Yup.string().required("Description is required"),
  category: Yup.string().required("Category is required"),
});

const UploadPost = () => {
  const [imageFile, setImageFile] = useState(null);
  const [category, setCategory] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [categoryOptions, setCategoryOptions] = useState("");

  useEffect(() => {
    const fetchCategory = async () => {
      const response = await axios.get(
        `https://frontend-case-api.sbdev.nl/api/categories`,
        {
          headers: {
            token: "pj11daaQRz7zUIH56B9Z",
          },
        }
      );
      setCategoryOptions(response.data);
    };
    fetchCategory();
  }, []);

  useEffect(() => {
    console.log({ imageFile, category, title, description });
  }, [imageFile, category, title, description]);

  const handleSubmit = async () => {
    console.log("handle submit");
    const formData = new FormData();
    formData.append("image", imageFile);
    formData.append("title", title);
    formData.append("content", description);
    formData.append("category_id", category);

    const response = await axios.post(
      `https://frontend-case-api.sbdev.nl/api/posts`,
      formData,
      {
        headers: {
          token: "pj11daaQRz7zUIH56B9Z",
          "Content-Type": "multipart/form-data",
        },
      }
    );

    console.log(response);

    setTitle("");
    setCategory("");
    setDescription("");
    setImageFile(null);
  };
  const handleChangeTitle = (e) => {
    setTitle(e.target.value);
  };
  const handleChangeDesc = (e) => {
    setDescription(e.target.value);
  };
  const handleChangeCategory = (e) => {
    setCategory(e.target.value);
  };
  const handleImageChange = (event, setFieldValue) => {
    const file = event.target.files[0];
    setFieldValue("image", file);
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setImageFile(reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      setImageFile(null);
    }
  };

  return (
    <div className="post">
      <div className="main-title">Plaats een blog bericht</div>
      <div className="form-group">
        <Formik
          initialValues={{
            title,
            description,
            category,
            image: imageFile,
            //image: "image.png",
          }}
          //validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ setFieldValue }) => (
            <Form>
              <div>
                <label htmlFor="title">Berichtnaam</label>
                <Field
                  type="text"
                  id="title"
                  name="title"
                  className="input"
                  placeholder="Geen titel"
                  value={title}
                  onChange={(e) => handleChangeTitle(e)}
                />
                <ErrorMessage name="title" component="div" className="error" />
              </div>
              <div>
                <label htmlFor="category">Categorie</label>
                <Field
                  as="select"
                  id="category"
                  name="category"
                  className="input"
                  value={category}
                  onChange={(e) => handleChangeCategory(e)}
                >
                  <option value="">Select a category</option>
                  {categoryOptions?.length > 0 &&
                    categoryOptions.map((item) => (
                      <option key={item.name} value={item.id}>
                        {item.name}
                      </option>
                    ))}
                </Field>
                <ErrorMessage
                  name="category"
                  component="div"
                  className="error"
                />
              </div>
              <div>
                <label htmlFor="image">Image</label>
                {imageFile && (
                  <div>
                    <img
                      src={imageFile}
                      alt="Preview"
                      style={{ width: "200px" }}
                    />
                  </div>
                )}
                <div>
                  <input
                    type="file"
                    id="image"
                    accept="image/*"
                    name="image"
                    className="input image-input"
                    onChange={(event) =>
                      handleImageChange(event, setFieldValue)
                    }
                  />
                  <ErrorMessage
                    name="image"
                    component="div"
                    className="error"
                  />
                </div>
              </div>
              <div>
                <label htmlFor="description">Bericht</label>
                <Field
                  as="textarea"
                  id="description"
                  name="description"
                  className="input textarea"
                  placeholder=""
                  value={description}
                  onChange={(e) => handleChangeDesc(e)}
                />
                <ErrorMessage
                  name="description"
                  component="div"
                  className="error"
                />
              </div>
              <button type="submit" className="mainbtn">
                Submit
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default UploadPost;
