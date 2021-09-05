import React from "react";

const Liked = ({ liked, onCliked }) => {
  let classes = liked ? "fas fa-heart" : "far fa-heart";
  return <i style={{cursor:'pointer'}} onClick={onCliked} className={classes}></i>;
};

export default Liked;
