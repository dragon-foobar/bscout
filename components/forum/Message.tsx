import React from "react";

type Props = {
  message: string;
};

const Message = ({ message }: Props) => {
  return <div>{message}</div>;
};

export default Message;
