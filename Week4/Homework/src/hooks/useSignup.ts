import { useState } from "react";

export type SignupStep = 1 | 2 | 3;

export function useSignup() {
  const [step, setStep] = useState<SignupStep>(1);

  // fields
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [age, setAge] = useState("");

  const usernameTooLong = username.length > 50;
  const canNextFromId = !!username.trim() && !usernameTooLong;
  const pwOk = password.length >= 8 && confirm.length > 0 && password === confirm;
  const canNextFromPw = pwOk;
  const canSubmit = !!name.trim() && !!email.trim() && !!age.trim();

  return {
    step,
    setStep,
    username,
    setUsername,
    password,
    setPassword,
    confirm,
    setConfirm,
    name,
    setName,
    email,
    setEmail,
    age,
    setAge,
    usernameTooLong,
    canNextFromId,
    canNextFromPw,
    canSubmit,
  };
}

