import { React, useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import SUCheckComponent from "../signup/SUCheckComponent";
import SUComponent from "../signup/SUComponent";

export default function SignupPage() {
  // const [searchParams, setSearchParams] = useSearchParams();
  // const step = searchParams.get("step"); //게시글번호
  const [step, setStep] = useState(1);

  return (
    <>
      {step == 1 ? (
        <SUCheckComponent setStep={setStep} />
      ) : (
        <SUComponent setStep={setStep} />
      )}
    </>
  );
}
