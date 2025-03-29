import React from 'react';

const PrivacyPolicy = () => {
    return (
        <div>
            <h1>Privacy Policy</h1>

            <p>
                My Privacy Policy describes how I collect, use, and protect your
                information when you use my "Shopping Mall" web application.  This
                application is my student project for 7097CEM Module and is not intended for commercial use.
                Therefore, I simplified this policy and I do not consider it as
                a substitute for a comprehensive, legally reviewed privacy policy.
            </p>

            <h2>Information I Collect</h2>

            <ul>
                <li>
                    <strong>Account Information:</strong> When you register for an
                    account, I collect your username, email address, and password.
                </li>
                <li>
                    <strong>Browsing Information:</strong> I use cookies to keep track of the
                    items in your shopping basket. This allows you to leave the site
                    and return to find your basket contents preserved.
                </li>
                <li>
                    <strong>No Payment Information:</strong> My application does not
                    process payments or collect any payment information (credit card
                    numbers, etc.).  The "Checkout" functionality is for demonstration
                    purposes only.
                </li>
            </ul>

            <h2>How I Use Your Information</h2>

            <ul>
                <li>
                    <strong>Account Management:</strong> I use your username and email
                    address to manage your account and allow you to log in.
                </li>
                <li>
                    <strong>Shopping Basket:</strong> I use cookies to store the contents
                    of your shopping basket.
                </li>

            </ul>

            <h2>Data Security</h2>

            <ul>
                <li>
                    <strong>Password Protection:</strong> I use an industry-standard
                    hashing technique called bcrypt to protect your password. Your
                    plain-text password is never stored on my server.
                </li>
                <li>
                    <strong>Data Storage:</strong> Your account information is stored
                    in a MongoDB Atlas database.  While I take reasonable
                    precautions to protect your data, please be aware that no
                    database system is 100% secure.
                </li>
            </ul>

            <h2>Third-Party Sharing</h2>

            <p>
                I do not share your personal information with any third parties.
                This application is a self-contained project.
            </p>

            <h2>Cookies</h2>

            <p>
                I use cookies solely for the purpose of maintaining your shopping
                basket.  These cookies are essential for the functionality of the
                checkout process.  By using this application, you consent to the
                use of these cookies.
            </p>

            <h2>Your Rights</h2>
            <ul>
                <li>
                    You can view your stored username and email on your profile.
                </li>
            </ul>

            <h2>Changes to This Policy</h2>

            <p>
                I may update this Privacy Policy from time to time depending on any changes to the project or the module requirements.  Any changes
                will be reflected on this page.
            </p>

            <h2>Contact Me</h2>

            <p>
                If you have any questions about this Privacy Policy, please do not
                hesitate to contact me [Olajide Osho - oshoo4@coventry.ac.uk].
            </p>

            <h2>Disclaimer</h2>
             <p>
                <b>
                This is to inform users visiting this project that this is strictly for educational purposes only. It is intended solely as a demonstration of modern web technologies as part of the academic assessment of 7097CEM module. It is not designed, intended, or suitable for any commercial or real-world use.

                I, The developer, disclaim all liability for any damages arising from the use or misuse of this project. This project may contain simplified features, incomplete security measures, and other limitations not suitable for production environments.

                Users are advised not to input any real personal, financial, or otherwise sensitive information into this application. The data handling practices demonstrated in this project are for illustrative purposes and may not meet the standards required for handling real-world data.
                </b>
            </p>
        </div>
    );
};

export default PrivacyPolicy;