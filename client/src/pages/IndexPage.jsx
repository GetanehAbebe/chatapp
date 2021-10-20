import React from "react";
import { useHistory } from 'react-router-dom'
const IndexPage = (props) => {
  const history = useHistory()
  React.useEffect(() => {
    const token = localStorage.getItem("token");
    console.log(token);
    if (token) {
      history.push("/conversations");
    } else {
      history.push("/login");
    }
   
  }, []);
  return <div></div>;
};

export default IndexPage;