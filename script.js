let qr;

window.onload = () => {
    const savedText = localStorage.getItem("qrText");
    const input = document.getElementById("textInput");

    if (savedText) {
        input.value = savedText;
        generateQR(savedText);
    }

    document.getElementById("generateBtn").addEventListener("click", () => {
        const text = input.value.trim();
        generateQR(text);
    });

    input.addEventListener("keydown", (e) => {
        if (e.key === "Enter") {
            generateQR(input.value.trim());
        }
    });

    document.getElementById("downloadBtn").addEventListener("click", downloadQR);
};

function generateQR(text) {
    const container = document.getElementById("qrContainer");

    if (!text) {
        container.innerHTML = "<p>Please enter some text or a URL.</p>";
        document.getElementById("downloadBtn").style.display = "none";
        return;
    }

    // Save to localStorage
    localStorage.setItem("qrText", text);

    container.innerHTML = ""; // clear old QR

    qr = new QRCode(container, {
        text: text,
        width: 200,
        height: 200,
    });

    setTimeout(() => {
        document.getElementById("downloadBtn").style.display = "block";
    }, 300);
}

function downloadQR() {
    const img = document.querySelector("#qrContainer img");

    if (!img) return;

    const link = document.createElement("a");
    link.href = img.src;
    link.download = "qr-code.png";
    link.click();
}
