// @flow

import glamorous from "glamorous";
import React, { Component } from "react";

const { Div, A } = glamorous;

function Button({ className, onClick, text, isDisabled }: ButtonProps) {
  return (
    <Div
      height={50}
      width={150}
      display="flex"
      justifyContent="center"
      alignItems="center"
      onClick={onClick}
      border={!isDisabled ? "1px solid #FFF" : "1px solid #333"}
      borderRadius={2}
      cursor={!isDisabled ? "default" : "pointer"}
      margin="auto"
      css={
        !isDisabled
          ? {
              ":hover": {
                backgroundColor: "orange",
                transition: "background .25s ease-in-out"
              },
              ":active": {
                boxShadow: "inset 0 0 20px 0 white",
                fontWeight: "bold"
              }
            }
          : {}
      }
    >
      <A color={!isDisabled ? "#FFF" : "#333"}>
        {text}
      </A>
    </Div>
  );
}

type ButtonProps = {
  className: string | void,
  onClick: any,
  text: string,
  isDisabled: boolean | void
};

export default Button;
