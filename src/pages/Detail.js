import { collection, getDoc, getDocs } from "firebase/firestore";
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { doc } from "firebase/firestore";
import { db } from "../services/firebase";
import Tags from "../components/Tags";
import MostPopular from "../components/MostPopular";

const Detail = ({ setActive }) => {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);
  const [blogs, setBlogs] = useState([]);
  const [tags, setTags] = useState([]);

  useEffect(() => {
    const getBlogdata = async () => {
      const blogRef = collection(db, "blogs");
      const blogs = await getDocs(blogRef);
      setBlogs(blogs.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
      let tags = [];
      blogs.docs.map((doc) => {
        tags.push(...doc.get("tags"));
      });
      let uniqueTags = [...new Set(tags)];
      setTags(uniqueTags);
    };
    getBlogdata();
  }, []);

  useEffect(() => {
    id && getBlogDetail();
  }, [id]);

  const getBlogDetail = async () => {
    const docRef = doc(db, "blogs", id);
    const blogDetails = await getDoc(docRef);
    setBlog(blogDetails.data());
    setActive(null);
  };
  return (
    <div className="single">
      <div
        className="blog-title-box"
        style={{
          backgroundImage: `url('${blog?.imgUrl}')`,
          backgroundSize: "auto",
        }}
      >
        <div className="overlay"></div>
        <div className="blog-title">
          <span>{blog?.timestamp.toDate().toDateString()}</span>
          <h2>{blog?.title}</h2>
        </div>
      </div>
      <div className="container-fluid pb-4 pt-4 padding blog-single-content">
        <div className="container padding">
          <div className="row mx-0">
            <div className="col-md-8">
              <span className="meta-info text-start">
                By <p className="author">{blog?.author}</p> -&nbsp;
                {blog?.timestamp.toDate().toDateString()}
              </span>
              <p className="text-start">{blog?.description}</p>
            </div>
            <div className="col-md-3">
              <Tags tags={tags} />
              <MostPopular blogs={blogs} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Detail;
