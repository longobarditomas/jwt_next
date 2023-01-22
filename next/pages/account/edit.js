import { useState, useEffect } from "react";
import Router from "next/router";
import useRequest from "../../hooks/use-request";

const Edit = ({ currentUser }) => {
  return (
    <>
      <h1>Account</h1>
      <h3>{currentUser.email}</h3>
    </>
  );
};

export default Edit;