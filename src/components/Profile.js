// Profile Page with Messages

//This is if you are logged in, it brings back relevant data for the user and in this case the messages for the user.
const myData = async () => {
  try {
    const response = await fetch(`${BASE_URL}/users/me`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${TOKEN_STRING_HERE}`,
      },
    });
    const result = await response.json();
    console.log(result);
    return result;
  } catch (err) {
    console.error(err);
  }
};
