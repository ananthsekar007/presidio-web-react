import React, { useEffect } from "react";
import { ApolloError } from "@apollo/client";
import { showErrorMsg, showSuccessMsg } from "../utils/notification";

export function useErrorNotification(props: ApolloError[]) {
  useEffect(() => {
    props.forEach((error) => {
      if (error && error.message && error.message.trim() !== "") {
        showErrorMsg(error.message);
      }
    });
  }, props);
}

export function useSuccessNotification(messages: string[]) {
  useEffect(() => {
    if (messages) {
      messages.forEach((message) => {
        if (message) {
          showSuccessMsg(message);
        }
      });
    }
  }, messages);
}
