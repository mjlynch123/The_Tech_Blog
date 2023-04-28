const loginForm = document.querySelector("#login");

loginForm.addEventListener("submit", async (event) => {
  event.preventDefault();

  const email = document.querySelector("#email").value;
  const password = document.querySelector("#password").value;

  const response = await fetch("/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  });

  if (response.ok) {
    document.location.href = "/";
  } else {
    const error = await response.json();
    alert(error.message);
  }
});

const logout = async () => {
  const response = await fetch("/logout", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
  });

  if (response.ok) {
    document.location.replace("/");
  } else {
    alert("Failed to log out.");
  }
};

async function getPosts() {
  fetch('/')
  .then(response => response.json())
  .then(data => {
    console.log(data);
  })
  .catch(error => console.log(error));
}

// Attach an event listener to the form's submit button
document.querySelector("#postBtn").addEventListener("click", async (event) => {
  event.preventDefault(); // Prevent the form from submitting normally

  try {
    // Extract the post data from the form fields
    const title = document.querySelector("#post-Title").value;
    const content = document.querySelector("#textpost").value;

    // Send a POST request to the server to save the new post
    const response = await fetch("/newPost", {
      method: "POST",
      body: JSON.stringify({ title, content }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    // Redirect the user to the homepage if the post was successfully saved
    if (response.ok) {
      window.location.href = "/";
    } else {
      console.error(response.statusText);
      alert("Failed to save post");
    }
  } catch (err) {
    console.error(err);
    alert("Failed to save post");
  }
});


document.querySelector("#logout").addEventListener("submit", logout);