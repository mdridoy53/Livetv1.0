document.addEventListener("DOMContentLoaded", function () {
    let users = JSON.parse(localStorage.getItem("users")) || [];

    function generateRedeemCode() {
        let duration = document.getElementById("redeemDuration").value;
        let code = Math.random().toString(36).substring(2, 8).toUpperCase();
        let expiry = new Date();

        if (duration === "1min") expiry.setMinutes(expiry.getMinutes() + 1);
        if (duration === "1day") expiry.setDate(expiry.getDate() + 1);
        if (duration === "7days") expiry.setDate(expiry.getDate() + 7);
        if (duration === "30days") expiry.setDate(expiry.getDate() + 30);

        let redeemCodes = JSON.parse(localStorage.getItem("redeemCodes")) || [];
        redeemCodes.push({ code, expiry });
        localStorage.setItem("redeemCodes", JSON.stringify(redeemCodes));

        document.getElementById("redeemCodes").innerHTML += `<li>${code} (Expires: ${expiry})</li>`;
    }

    if (document.getElementById("userTable")) {
        users.forEach(user => {
            document.getElementById("userTable").innerHTML += `
                <tr>
                    <td>${user.username}</td>
                    <td>${user.isPremium ? "Premium" : "Free"}</td>
                </tr>
            `;
        });
    }
});
