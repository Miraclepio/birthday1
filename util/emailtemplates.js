
    const generateWelcomeEmail = (verifyLink, fullName) => {
        return `
    <!DOCTYPE html>
    <html>
    <head>
        <meta charset="UTF-8">
        <title>Happy Birthday from PIO!</title>
        <style>
            body {
                font-family: 'Arial', sans-serif;
                line-height: 1.6;
                color: #333333;
                background-color: #f2f2f2; /* Light background */
                margin: 0;
                padding: 0;
            }
            .container {
                width: 80%;
                margin: 20px auto;
                padding: 20px;
                border: 1px solid #ddd;
                border-radius: 15px;
                box-shadow: 0 4px 8px rgba(0,0,0,0.1);
                background-color: #ffffff; /* White background */
            }
            .header {
                background: #ff99cc; /* Soft pink for a warm feel */
                padding: 15px;
                text-align: center;
                border-bottom: 2px solid #ff66b2;
                color: #333333;
                border-radius: 15px 15px 0 0;
            }
            .content {
                padding: 20px;
                color: #333333;
                text-align: center;
            }
            .content h2 {
                color: #ff66b2; /* Warm pink */
            }
            .footer {
                background: #ff99cc;
                padding: 10px;
                text-align: center;
                border-top: 2px solid #ff66b2;
                font-size: 0.9em;
                color: #333333;
                border-radius: 0 0 15px 15px;
            }
            .button {
                display: inline-block;
                background-color: #ff66b2; /* Bright pink button */
                color: #ffffff;
                padding: 12px 25px;
                text-decoration: none;
                border-radius: 25px;
                font-size: 16px;
                font-weight: bold;
            }
            .button:hover {
                background-color: #ff3399; /* Darker pink on hover */
            }
            .emoji {
                font-size: 24px;
            }
        </style>
    </head>
    <body>
        <div class="container">
            <div class="header">
                <h1>🎉 Happy Birthday, ${fullName}! 🎉</h1>
            </div>
            <div class="content">
                <p>Hello ${fullName},</p>
                <h2>🎂 Wishing You a Day as Wonderful as You Are! 🎂</h2>
                <p>We are beyond excited to celebrate your special day with you! As a token of our appreciation, we’ve prepared a little something to get you started.</p>
                <p>Please click the button below to verify your account and unwrap your gift:</p>
                <p>
                    <a href="${verifyLink}" class="button">HAPPY BIRTHDAY Rita <br>🎉 please click 🎉</a>
                </p>
                <p>If you didn’t sign up for an account, no worries—just ignore this email.</p>
                <p>Sending you a big birthday hug and lots of love!<br>Warmest wishes,<br> The THE CURVE AFRICA Team</p>
            </div>
            <div class="footer">
                <p>&copy; ${new Date().getFullYear()} THE CURVE AFRICA. All rights reserved.</p>
            </div>
        </div>
    </body>
    </html>
        `;
    }
    
    module.exports = {generateWelcomeEmail};
    