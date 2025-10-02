import { motion } from "framer-motion";

const PrivacyPolicy = () => {
  return (
    <section className="py-24 px-4 bg-gray-900 text-gray-300">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-12 text-center"
        >
          <h1 className="text-4xl font-bold mb-4 font-serif">
            <span className="text-yellow-400">Privacy</span> Policy
          </h1>
          <div className="w-24 h-1 bg-yellow-500 mx-auto"></div>
          <p className="mt-4">
            Last updated: {new Date().toLocaleDateString()}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="prose prose-invert max-w-none"
        >
          <div className="mb-8">
            <h2 className="text-2xl font-bold mb-4 text-yellow-400">
              1. Introduction
            </h2>
            <p>
             Soni Blissful Events ("we," "our," or "us") values your privacy
              and is committed to protecting your personal information. This 
              Privacy Policy explains how we collect, use, disclose, and safeguard
              your data when you visit our website, book our services, or participate 
              in our events.
            </p>
          </div>

          <div className="mb-8">
            <h2 className="text-2xl font-bold mb-4 text-yellow-400">
              2. Information We Collect
            </h2>
            <p>We may collect the following types of information:</p>
            <ul className="list-disc pl-6 mt-2 space-y-2">
              <li>
                <strong>Personal Data:</strong> Name, email, phone number,
                payment information
              </li>
              <li>
                <strong>Usage Data:</strong> IP address, browser type, pages
                visited
              </li>
              <li>
                <strong>Event Preferences:</strong>Theme choices,
                 booking requirements, and customization requests.
              </li>
              <li>
                <strong>Cookies:</strong> Used to enhance browsing 
                experience and personalize services.
              </li>
            </ul>
          </div>

          <div className="mb-8">
            <h2 className="text-2xl font-bold mb-4 text-yellow-400">
              3. How We Use Your Information
            </h2>
            <p>Your information is used for:</p>
            <ul className="list-disc pl-6 mt-2 space-y-2">
              <li>Providing and maintaining our service</li>
              <li>Processing transactions</li>
              <li>Personalizing your experience</li>
              <li>Improving our services</li>
              <li>Communicating with you</li>
            </ul>
          </div>

          <div className="mb-8">
            <h2 className="text-2xl font-bold mb-4 text-yellow-400">
              4. Data Security
            </h2>
            <p>
              We implement industry-standard safeguards, including:
              Encrypted transactions
              Secure servers and firewalls
              Restricted data access to authorized personnel only
            </p>
          </div>

          <div className="mb-8">
            <h2 className="text-2xl font-bold mb-4 text-yellow-400">
              5. Third-Party Sharing
            </h2>
            <p>We may share your information only when necessary, including with:</p>
            <ul className="list-disc pl-6 mt-2 space-y-2">
              <li>Payment Gateways: To securely process your transactions</li>
              <li>Trusted Vendors/Partners:
                 (e.g., decorators, venues, catering, equipment providers) 
                 required to deliver your booked services</li>
              <li>Marketing partners (with consent)</li>
              <li>Legal Authorities: If required by law or to protect our rights</li>
            </ul>
          </div>

          <div className="mb-8">
            <h2 className="text-2xl font-bold mb-4 text-yellow-400">
              6. Your Rights
            </h2>
            <p>You have the right to:</p>
            <ul className="list-disc pl-6 mt-2 space-y-2">
              <li>Access your personal data</li>
              <li>Request correction or deletion</li>
              <li>Opt-out of marketing</li>
              <li>Withdraw consent</li>
            </ul>
          </div>

          <div className="mb-8">
            <h2 className="text-2xl font-bold mb-4 text-yellow-400">
              7. Changes to This Policy
            </h2>
            <p>
            We may update this Privacy Policy from time to time.
            Any changes will be posted on this page with a revised “Last Updated” date.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold mb-4 text-yellow-400">
              8. Contact Us
            </h2>
            <p>
             If you have questions about this Privacy Policy or how your information is handled, please contact us:
              <br />
              <span className="text-yellow-400">soniblissfulevents@gmail.com</span>
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default PrivacyPolicy;
