import axios from "axios";
import React from "react";

const baseURL = "https://reqres.in/api/users?page=1";
interface Data {
    name : string;
    id: number;
}

export default function Fetch() {
  const [post, setPost] = React.useState(null);

  React.useEffect(() => {
    axios.get(baseURL).then((response) => {
      setPost(response.data);
    });
  }, []);

  if (!post) return null;
  console.log(post)

  return (
    <div>
     <h1>[post]</h1>
    </div>
  );
}