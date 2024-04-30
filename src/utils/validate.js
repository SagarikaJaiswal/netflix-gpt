export const isCredentialsValid = (email, password) => {
  const emailRegex = /^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/;
  const passwordRegex =
    /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*\W)(?!.* ).{8,16}$/;
  if (!emailRegex.test(email)) {
    return "Email is not valid";
  } else if (!passwordRegex.test(password)) {
    return "Password is not valid";
  }

  return null;
};
