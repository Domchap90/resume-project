function sendMail(contactForm) {
    emailjs.send("domchaple_gmail_com", "dominic", {
        "from_name":contactForm.name.value,
        "from_email":contactForm.emailaddress.value,
        "project_request":contactForm.projectsummary.value
    })
    .then (
        function(response) {
            console.log("SUCCESS", response);
            $("#requestform")[0].reset();
        },
        function(error) {
            console.log("FAILED", error)
        });
    return false;
}