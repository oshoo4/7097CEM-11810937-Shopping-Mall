import React from 'react';

const PrivacyPolicy = () => {
    return (
        <div>
            <h1>Privacy Policy</h1>

            <p>
                This Privacy Policy describes how we collect, use, and protect your
                information when you use our "Shopping Mall" web application.  This
                application is a student project and is not intended for commercial use.
                Therefore, this policy is simplified and should not be considered
                a substitute for a comprehensive, legally reviewed privacy policy.
            </p>

            <h2>Information We Collect</h2>

            <ul>
                <li>
                    <strong>Account Information:</strong> When you register for an
                    account, we collect your username, email address, and password.
                </li>
                <li>
                    <strong>Browsing Information:</strong> We use cookies to keep track of the
                    items in your shopping basket. This allows you to leave the site
                    and return to find your basket contents preserved.
                </li>
                <li>
                    <strong>No Payment Information:</strong> This application does *not*
                    process payments or collect any payment information (credit card
                    numbers, etc.).  The "Checkout" functionality is for demonstration
                    purposes only.
                </li>
            </ul>

            <h2>How We Use Your Information</h2>

            <ul>
                <li>
                    <strong>Account Management:</strong> We use your username and email
                    address to manage your account and allow you to log in.
                </li>
                <li>
                    <strong>Shopping Basket:</strong> We use cookies to store the contents
                    of your shopping basket.
                </li>

            </ul>

            <h2>Data Security</h2>

            <ul>
                <li>
                    <strong>Password Protection:</strong> We use industry-standard
                    hashing techniques (bcrypt) to protect your password. Your
                    plain-text password is never stored on our servers.
                </li>
                <li>
                    <strong>Data Storage:</strong> Your account information is stored
                    in a MongoDB Atlas database.  While we take reasonable
                    precautions to protect your data, please be aware that no
                    database system is 100% secure.
                </li>
            </ul>

            <h2>Third-Party Sharing</h2>

            <p>
                We do *not* share your personal information with any third parties.
                This application is a self-contained project.
            </p>

            <h2>Cookies</h2>

            <p>
                We use cookies solely for the purpose of maintaining your shopping
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
                We may update this Privacy Policy from time to time.  Any changes
                will be reflected on this page.
            </p>

            <h2>Contact Us</h2>

            <p>
                If you have any questions about this Privacy Policy, please do not
                hesitate to contact the developer [Your Name or Contact Information - Optional].
            </p>

            <h2>Disclaimer</h2>
             <p>
                <b>
                This is to inform users visiting this project that this is strictly for educational purposes only. It is intended solely as a demonstration of web development skills and concepts as part of an academic assessment. It is not designed, intended, or suitable for any commercial or real-world use.

                The developer and educational institution disclaim all liability for any damages arising from the use or misuse of this project. This project may contain simplified features, incomplete security measures, and other limitations not suitable for production environments.

                Users are advised not to input any real personal, financial, or otherwise sensitive information into this application. The data handling practices demonstrated in this project are for illustrative purposes and may not meet the standards required for handling real-world data.
                </b>
            </p>
        </div>
    );
};

export default PrivacyPolicy;