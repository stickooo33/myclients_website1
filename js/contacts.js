document.getElementById("contactForm").addEventListener("submit", function(e) {
  e.preventDefault();

  const params = {
    user_name: document.getElementById("name").value,
    user_email: document.getElementById("email").value,
    user_message: document.getElementById("message").value
  };

  emailjs.send("service_0kyix5m", "template_qal0jpn", params)
    .then(function() {
    })
    .catch(function(error) {
      alert("Oops! Something went wrong.");
      console.log(error);
    });
});
