import { motion } from "framer-motion";

const TermsAndConditions = () => {
  return (
    <section className="py-24  px-4 bg-gray-900 text-gray-300">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-12 text-center"
        >
          <h1 className="text-4xl font-bold mb-4 font-serif">
            <span className="text-yellow-400">Terms</span> & Conditions
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
              1. Membership Terms
            </h2>
            <p>By registering for an Soni Blissful Events membership, you agree to:</p>
            <ul className="list-disc pl-6 mt-2 space-y-2">
              <li>Provide accurate and complete information during booking</li>
              <li>Pay all deposits and fees within the agreed timelines</li>
              <li>Follow all facility rules and regulations</li>
              <li>Understand that your booking is only confirmed once payment/deposit is received</li>
            </ul>
          </div>

          <div className="mb-8">
            <h2 className="text-2xl font-bold mb-4 text-yellow-400">
              2. Payments & Cancellations
            </h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>Advance Deposit: A non-refundable deposit is required to secure bookings</li>
              <li>Full Payment: Must be completed before the event date (as agreed in contract/invoice)</li>
              <li>Cancellations by Client: Cancellations made less than 15 days before the event are non-refundable</li>
              <li>Rescheduling: Subject to availability and may incur additional charges</li>
              <li>Cancellations by Us: If we must cancel due to unavoidable reasons, a full refund will be issued</li>
            </ul>
          </div>

          <div className="mb-8">
            <h2 className="text-2xl font-bold mb-4 text-yellow-400">
              3. Facility Use
            </h2>
            <p>Members must:</p>
            <ul className="list-disc pl-6 mt-2 space-y-2">
              <li>Provide timely approvals for event plans, designs, and vendor arrangements</li>
              <li>Not misuse or damage event property, décor, or equipment</li>
              <li>Follow venue rules and cooperate with our team and partners</li>
              <li>Follow staff instructions at all times</li>
            </ul>
          </div>

          <div className="mb-8">
            <h2 className="text-2xl font-bold mb-4 text-yellow-400">
              4. Health & Safety
            </h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>We prioritize guest safety but are not liable for personal
                 injuries, accidents, or illnesses during the event</li>
              <li>Clients must inform us of any special requirements 
                (e.g., food allergies, safety concerns) in advance</li>
              <li>Fire safety, permits, and local laws must be respected at all times</li>
              <li>Soni Blissful Events is not liable for personal injuries</li>
            </ul>
          </div>

          <div className="mb-8">
            <h2 className="text-2xl font-bold mb-4 text-yellow-400">
              5. Code of Conduct
            </h2>
            <p>Harassment of staff, vendors, or guests</p>
            <ul className="list-disc pl-6 mt-2 space-y-2">
              <li>Harassment of other members or staff</li>
              <li>Use of illegal substances or disruptive behavior</li>
              <li>Unauthorized photography/videography in restricted areas</li>
              <li>Activities that may cause damage to property or reputation</li>
            </ul>
          </div>

          <div className="mb-8">
            <h2 className="text-2xl font-bold mb-4 text-yellow-400">
              6. Intellectual Property
            </h2>
            <p>
              All logos, designs, themes, content, and marketing materials of Soni Blissful Events 
              are our intellectual property and may not be copied, resold, or reproduced without written
              permission.
            </p>
          </div>

          <div className="mb-8">
            <h2 className="text-2xl font-bold mb-4 text-yellow-400">
              7. Limitation of Liability
            </h2>
            <p>
              We are not responsible for lost, stolen, or damaged personal belongings during events
              Our liability is limited to the amount paid for the specific booking/service
              We reserve the right to refuse service to anyone violating these terms
            </p>
          </div>

          <div className="mb-8">
            <h2 className="text-2xl font-bold mb-4 text-yellow-400">
              8. Changes to Terms
            </h2>
            <p>
              We may update these Terms & Conditions at any time. Continued use of our 
              services implies acceptance of the revised terms.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold mb-4 text-yellow-400">
              9. Governing Law
            </h2>
            <p>
              These terms shall be governed by the laws of Raipur, Chhattisgarh, India.
              Any disputes will be subject to the jurisdiction of courts in Raipur.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default TermsAndConditions;
