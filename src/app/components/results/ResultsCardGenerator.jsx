import React, { useState } from "react";
import { FiDownload } from "react-icons/fi";

const ResultsCardGenerator = ({
  userName,
  archetype,
  percentage,
  userId
}) => {
  const [isGenerating, setIsGenerating] = useState(false);

  // Always use primary archetype regardless of manual selection
  const primaryArchetype = archetype;
  const primaryPercentage = percentage;

  // Extract last 8 characters of user ID
  const userIdShort = userId ? userId.slice(-8) : "N/A";

  // Map archetype to hex color for accents
  const archetypeHex = {
    Perfectionist: "#3b82f6",
    "Quiet Achiever": "#8b5cf6",
    "People-Pleaser": "#ec4899",
    "Hidden Leader": "#6366f1",
    "Bold Believer": "#10b981"
  }[primaryArchetype] || "#4f46e5";

  const generateResultsImage = async () => {
    setIsGenerating(true);

    // Canvas dimensions
    const width = 700;
    const height = 900;
    const canvas = document.createElement("canvas");
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext("2d");

    // 1) Very light watermark diagonally (CERTIFIED)
    ctx.save();
    ctx.translate(width / 2, height / 2);
    ctx.rotate((-45 * Math.PI) / 180);
    ctx.globalAlpha = 0.04;
    ctx.fillStyle = "#000000";
    ctx.font = "bold 80px Helvetica, Arial, sans-serif";
    ctx.textAlign = "center";
    ctx.fillText("CERTIFIED", 0, 20);
    ctx.restore();
    ctx.globalAlpha = 1;

    // 2) Light background tint behind the certificate panel
    ctx.fillStyle = "#f9f9f9";
    ctx.fillRect(0, 0, width, height);

    // 3) Certificate white panel
    const margin = 40;
    const certWidth = width - margin * 2;
    const certHeight = height - margin * 2;
    const cornerRadius = 15;

    ctx.save();
    ctx.shadowColor = "rgba(0, 0, 0, 0.1)";
    ctx.shadowBlur = 20;
    ctx.shadowOffsetY = 10;
    ctx.fillStyle = "#ffffff";
    ctx.beginPath();
    ctx.moveTo(margin + cornerRadius, margin);
    ctx.lineTo(margin + certWidth - cornerRadius, margin);
    ctx.quadraticCurveTo(
      margin + certWidth,
      margin,
      margin + certWidth,
      margin + cornerRadius
    );
    ctx.lineTo(
      margin + certWidth,
      margin + certHeight - cornerRadius
    );
    ctx.quadraticCurveTo(
      margin + certWidth,
      margin + certHeight,
      margin + certWidth - cornerRadius,
      margin + certHeight
    );
    ctx.lineTo(margin + cornerRadius, margin + certHeight);
    ctx.quadraticCurveTo(
      margin,
      margin + certHeight,
      margin,
      margin + certHeight - cornerRadius
    );
    ctx.lineTo(margin, margin + cornerRadius);
    ctx.quadraticCurveTo(margin, margin, margin + cornerRadius, margin);
    ctx.closePath();
    ctx.fill();
    ctx.restore();

    // 4) Decorative double border
    ctx.strokeStyle = archetypeHex;
    ctx.lineWidth = 4;
    ctx.strokeRect(margin + 10, margin + 10, certWidth - 20, certHeight - 20);

    ctx.strokeStyle = "#cccccc";
    ctx.lineWidth = 2;
    ctx.setLineDash([10, 5]);
    ctx.strokeRect(margin + 20, margin + 20, certWidth - 40, certHeight - 40);
    ctx.setLineDash([]);

    // 5) Ornamental corner flourishes
    ctx.strokeStyle = archetypeHex;
    ctx.lineWidth = 3;
    // Top-left
    ctx.beginPath();
    ctx.moveTo(margin + 30, margin + 15);
    ctx.quadraticCurveTo(margin + 15, margin + 15, margin + 15, margin + 30);
    ctx.stroke();
    // Top-right
    ctx.beginPath();
    ctx.moveTo(margin + certWidth - 30, margin + 15);
    ctx.quadraticCurveTo(
      margin + certWidth - 15,
      margin + 15,
      margin + certWidth - 15,
      margin + 30
    );
    ctx.stroke();
    // Bottom-left
    ctx.beginPath();
    ctx.moveTo(margin + 15, margin + certHeight - 30);
    ctx.quadraticCurveTo(
      margin + 15,
      margin + certHeight - 15,
      margin + 30,
      margin + certHeight - 15
    );
    ctx.stroke();
    // Bottom-right
    ctx.beginPath();
    ctx.moveTo(margin + certWidth - 15, margin + certHeight - 30);
    ctx.quadraticCurveTo(
      margin + certWidth - 15,
      margin + certHeight - 15,
      margin + certWidth - 30,
      margin + certHeight - 15
    );
    ctx.stroke();

    // 6) Certificate Title (serif, larger)
    ctx.fillStyle = archetypeHex;
    ctx.font = "bold 36px Georgia, serif";
    ctx.textAlign = "center";
    ctx.fillText("Certificate of Achievement", width / 2, margin + 100);

    // 7) Subtitle
    ctx.fillStyle = "#4b5563";
    ctx.font = "italic 18px Georgia, serif";
    ctx.fillText("This certifies that", width / 2, margin + 150);

    // 8) Recipient Name (uppercase, bold sans-serif)
    ctx.fillStyle = "#1f2937";
    ctx.font = "bold 30px Helvetica, Arial, sans-serif";
    ctx.fillText(userName.toUpperCase(), width / 2, margin + 200);

    // 9) Divider line below name
    ctx.strokeStyle = "#e5e7eb";
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(margin + 60, margin + 220);
    ctx.lineTo(width - margin - 60, margin + 220);
    ctx.stroke();

    // 10) Achievement statement
    ctx.fillStyle = "#4b5563";
    ctx.font = "16px Helvetica, Arial, sans-serif";
    ctx.textAlign = "center";
    ctx.fillText(
      `has demonstrated the "${primaryArchetype}" archetype with a`,
      width / 2,
      margin + 260
    );
    ctx.fillText(
      `confidence score of ${primaryPercentage}%.`,
      width / 2,
      margin + 285
    );

    // 11) Percentage ring
    const circleX = width / 2;
    const circleY = margin + 380;
    const outerR = 60;
    const innerR = 50;

    // Ring background
    ctx.strokeStyle = "#e5e7eb";
    ctx.lineWidth = 6;
    ctx.beginPath();
    ctx.arc(circleX, circleY, outerR, 0, Math.PI * 2);
    ctx.stroke();

    // Filled percentage arc
    const startAngle = -Math.PI / 2;
    const endAngle = startAngle + (primaryPercentage / 100) * Math.PI * 2;
    ctx.strokeStyle = archetypeHex;
    ctx.lineWidth = 6;
    ctx.beginPath();
    ctx.arc(circleX, circleY, outerR, startAngle, endAngle);
    ctx.stroke();

    // Inner white circle
    ctx.fillStyle = "#ffffff";
    ctx.beginPath();
    ctx.arc(circleX, circleY, innerR, 0, Math.PI * 2);
    ctx.fill();

    // Percentage text inside circle
    ctx.fillStyle = "#1f2937";
    ctx.font = "bold 26px Helvetica, Arial, sans-serif";
    ctx.textAlign = "center";
    ctx.fillText(`${primaryPercentage}%`, circleX, circleY + 8);

    // Archetype label below circle
    ctx.fillStyle = archetypeHex;
    ctx.font = "bold 20px Helvetica, Arial, sans-serif";
    ctx.fillText(primaryArchetype, circleX, circleY + 100);

    // 12) Inspirational quote block
    const quote = `"Believe in yourself and all that you are."`;
    ctx.fillStyle = "#374151";
    ctx.font = "italic 16px Georgia, serif";
    ctx.textAlign = "center";
    const quoteX = width / 2;
    let quoteY = circleY + 150;
    const maxWidth = certWidth - 120;
    const words = quote.split(" ");
    let line = "";
    words.forEach((word, idx) => {
      const testLine = line + word + " ";
      const metrics = ctx.measureText(testLine);
      if (metrics.width > maxWidth && idx > 0) {
        ctx.fillText(line.trim(), quoteX, quoteY);
        line = word + " ";
        quoteY += 22;
      } else {
        line = testLine;
      }
      if (idx === words.length - 1) {
        ctx.fillText(line.trim(), quoteX, quoteY);
      }
    });

    // 13) Footer date
    const today = new Date();
    const dateText = today.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric"
    });
    ctx.fillStyle = "#6b7280";
    ctx.font = "normal 14px Helvetica, Arial, sans-serif";
    ctx.textAlign = "center";
    ctx.fillText(
      `Generated on ${dateText}`,
      width / 2,
      height - margin - 40
    );

    // 14) User ID display (last 8 characters) – moved upward
    ctx.fillStyle = "#6b7280";
    ctx.font = "normal 12px Helvetica, Arial, sans-serif";
    ctx.textAlign = "center";
    ctx.fillText(
      `ID: ${userIdShort}`,
      width / 2,
      height - margin - 80 // increased offset to move text upward
    );

    // 15) Convert to PNG and trigger download
    const dataURL = canvas.toDataURL("image/png");
    const link = document.createElement("a");
    link.href = dataURL;
    link.download = `Certificate_${userName.replace(/\s+/g, "_")}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    setIsGenerating(false);
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 max-w-lg mx-auto">
      <div className="mb-6">
        <h3 className="text-2xl font-semibold text-gray-800">
          Generate Your Certificate
        </h3>
        <p className="text-gray-600 mt-1">
          Download a formal certificate showcasing your confidence archetype.
        </p>
      </div>
      <button
        onClick={generateResultsImage}
        disabled={isGenerating}
        className="w-full flex items-center justify-center px-5 py-3 bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-semibold rounded-lg hover:from-indigo-600 hover:to-purple-700 transition-all shadow-md disabled:opacity-70"
      >
        {isGenerating ? (
          <svg
            className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
        ) : (
          <>
            <FiDownload className="mr-2" />
            Download Certificate
          </>
        )}
      </button>
    </div>
  );
};

export default ResultsCardGenerator;
