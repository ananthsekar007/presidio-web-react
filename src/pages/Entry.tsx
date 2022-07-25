import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export interface IEntryProps {}

export default function Entry(props: IEntryProps) {
  const navigate = useNavigate();

  useEffect(() => {
    navigate("/user/login");
  }, []);

  return <div>Hi this is Ananth</div>;
}
