
const SCRIPT_URL = "https://script.google.com/macros/s/AKfycbzSejz1YmLTMFH_Mof4449Ndnn3TQCsBmITVW7h3lLmWR4giys9RtfjWJjhvt6KSr9Vhg/exec";

const button = document.getElementById("consentButton");
const status = document.getElementById("status");

button.addEventListener("click", async () => {
    button.disabled = true;
    status.textContent = "Processing your request...";

    try {
        // Retrieve the visitor's public IP
        const response = await fetch(
            "https://api.ipify.org?format=json"
        );

        if (!response.ok) {
            throw new Error("IP lookup failed");
        }

        const result = await response.json();

        // Submit only the IP address
        await fetch(SCRIPT_URL, {
            method: "POST",
            mode: "no-cors",
            headers: {
                "Content-Type": "text/plain;charset=utf-8"
            },
            body: JSON.stringify({
                ip: result.ip
            })
        });

        status.textContent =
            "Your submission has been sent.";

    } catch (error) {
        status.textContent =
            "Something went wrong. Please try again.";

        button.disabled = false;
    }
});
