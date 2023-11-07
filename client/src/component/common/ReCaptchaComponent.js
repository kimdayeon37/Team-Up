import axios from "axios";
import React from "react";
import ReCAPTCHA from "react-google-recaptcha";

export default function ReCaptcha({ setCaptcha }) {
  function onChange(value) {
    const formData = new FormData();
    formData.append("secret", process.env.REACT_APP_RECAPTCHA_SECRET_KEY);
    formData.append("response", value);
    axios
      .post("/recaptcha/api/siteverify", formData)
      .then((response) => {
        if (response.data.success == true) {
          setCaptcha(true);
        } else setCaptcha(false);
      })
      .catch(function (error) {
        console.log(error.config);
        setCaptcha(false);
      });
  }

  return (
    <ReCAPTCHA
      className="recaptcha"
      size={"normal"}
      sitekey={`${process.env.REACT_APP_RECAPTCHA_SITE_KEY}`}
      onChange={onChange}
    />
  );
}
