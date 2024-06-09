document.addEventListener("DOMContentLoaded", function () {
    const pdfContainer = document.getElementById("pdf-container");

    // List of PDF files
    const pdfFiles = [
        { name: "Story 1", url: "pdf/Story1.pdf" },
    ];

    // Embed PDF files dynamically
    pdfFiles.forEach(pdf => {
        const embed = document.createElement("embed");
        embed.src = pdf.url;
        embed.type = "application/pdf";
        embed.width = "100%";
        embed.height = "700px"; // Set the height as per your requirement
        embed.setAttribute("frameborder", "1");
        pdfContainer.appendChild(embed);
    });
});
