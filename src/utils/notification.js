import React from "react";
import { toast } from "react-toastify";
import { Media } from "reactstrap";
import "react-toastify/dist/ReactToastify.css";

export const checkNotification = () => {
  try {
    if (navigator.serviceWorker) {
      if (typeof Notification !== undefined) {
        if (!("permission" in Notification)) {
          return false;
        }
        if (
          Notification.permission === "denied" ||
          Notification.permission === "default"
        ) {
          return false;
        }
        return true;
      }
    }
    return false;
  } catch (err) {
    console.error(err);
    return false;
  }
};

export const showSuccessMsg = (message) => {
  toast.success(
    function ({ closeToast }) {
      return (
        <Media>
          <Media middle left className="mr-3">
            <i className="fa fa-fw fa-1x fa-check"></i>
          </Media>
          <Media body>
            <p>{message}</p>
          </Media>
        </Media>
      );
    },
    {
      position: toast.POSITION.TOP_CENTER,
    }
  );
};
export const showErrorMsg = (message) => {
  toast.error(
    function ({ closeToast }) {
      return (
        <Media>
          <Media middle left className="mr-3">
            {/* <i className="fa fa-fw fa-1x fa-times"></i> */}
          </Media>
          <Media body>
            <p>{message}</p>
          </Media>
        </Media>
      );
    },
    {
      position: toast.POSITION.TOP_CENTER,
    }
  );
};
