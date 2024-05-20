document.addEventListener("DOMContentLoaded", function () {
  var form = document.getElementById("contact-form");

  async function handleSubmit(event) {
    event.preventDefault();
    var status = document.getElementById("contact-form-status");
    var loading = form.querySelector(".loading");
    var errorMessage = form.querySelector(".error-message");
    var sentMessage = form.querySelector(".sent-message");

    // Display the loading message and hide error and sent messages
    loading.classList.add("d-block");
    errorMessage.classList.remove("d-block");
    sentMessage.classList.remove("d-block");

    var data = new FormData(event.target);

    try {
      let response = await fetch(event.target.action, {
        method: form.method,
        body: data,
        headers: {
          Accept: "application/json",
        },
      });

      loading.classList.remove("d-block"); // Hide loading message

      if (response.ok) {
        sentMessage.classList.add("d-block"); // Show sent message
        form.reset();
      } else {
        let data = await response.json();
        if (data.errors) {
          let errors = data.errors.map((error) => error.message).join(", ");
          errorMessage.innerHTML = errors;
          console.error(errors);
        } else {
          errorMessage.innerHTML =
            "Oops! There was a problem submitting your form";
        }
        errorMessage.classList.add("d-block"); // Show error message
      }
    } catch (error) {
      loading.classList.remove("d-block"); // Hide loading message
      errorMessage.innerHTML = "Oops! There was a problem submitting your form";
      errorMessage.classList.add("d-block"); // Show error message
      console.error(error);
    }
  }

  form.addEventListener("submit", handleSubmit);
});
