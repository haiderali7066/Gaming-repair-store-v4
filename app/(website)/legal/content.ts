/**
 * Legal pages content for Al Dana.
 *
 * Edit text here — the /legal page renders everything from this file.
 *
 * Section `content` rules:
 *   - a string          -> a paragraph
 *   - an array of string -> a bullet list
 *   - **double asterisks** inside a string -> bold text
 */

export type LegalSection = {
  id: string
  title: string
  content: (string | string[])[]
}

export type LegalDoc = {
  slug: string
  /** Full title shown above the content */
  title: string
  /** Short label used in the left menu */
  menuLabel: string
  /** One-line description (menu tooltip / meta description) */
  description: string
  /** Optional, e.g. "1 July 2026" — shown under the title when set */
  updated?: string
  intro: string[]
  sections: LegalSection[]
  closing?: string[]
}

export const legalDocs: LegalDoc[] = [
  /* ====================================================================== */
  /* PRIVACY POLICY                                                          */
  /* ====================================================================== */
  {
    slug: "privacy-policy",
    title: "Privacy Policy",
    menuLabel: "Privacy Policy",
    description:
      "How Al Dana collects, uses, stores, and protects your personal information.",
    intro: [
      "At **Al Dana**, we respect your privacy and are committed to protecting the personal information you share with us. This Privacy Policy explains how we collect, use, store, and protect your information when you visit our website, contact us, or use our gaming PC, laptop, iPad, and other device repair services.",
    ],
    sections: [
      {
        id: "information-we-collect",
        title: "Information We Collect",
        content: [
          "We may collect information that you provide directly to us when you contact Al Dana, request a repair service, submit an inquiry, or communicate with our team. This information may include your name, phone number, email address, address, device details, repair requirements, and other information necessary to provide our services.",
          "We may also automatically collect limited technical information when you visit our website, such as your browser type, device type, IP address, pages visited, and general website usage information. This information helps us improve website performance and provide a better customer experience.",
        ],
      },
      {
        id: "how-we-use-your-information",
        title: "How We Use Your Information",
        content: [
          "Al Dana uses the information we collect to provide, manage, and improve our services. This may include processing repair requests, contacting customers about service updates, providing estimates, responding to questions, scheduling services, processing payments, and maintaining business records.",
          "We may also use information to improve our website, understand customer needs, prevent fraudulent or unauthorized activity, and comply with applicable legal requirements.",
          "We do not sell, rent, or trade your personal information to third parties for their own marketing purposes.",
        ],
      },
      {
        id: "device-and-repair-information",
        title: "Device and Repair Information",
        content: [
          "When you bring a gaming PC, laptop, iPad, or other electronic device to Al Dana for repair, we may need to access certain device information or files when necessary to diagnose and complete the requested service. Our technicians handle customer devices with professional care and only access information necessary for the requested repair whenever possible.",
          "Customers are encouraged to back up important personal files before submitting a device for repair. Al Dana is not responsible for data loss caused by hardware failure, software issues, accidental damage, or circumstances beyond our reasonable control.",
        ],
      },
      {
        id: "information-sharing",
        title: "Information Sharing",
        content: [
          "We may share limited information with trusted service providers when necessary to operate our business, process payments, maintain our website, or provide requested services. Such providers are expected to handle information responsibly and only for legitimate business purposes.",
          "We may also disclose information when required by law, legal proceedings, or government requests, or to protect our rights, customers, employees, or business.",
        ],
      },
      {
        id: "data-security",
        title: "Data Security",
        content: [
          "Al Dana takes reasonable administrative, technical, and organizational measures to protect personal information against unauthorized access, misuse, alteration, disclosure, or loss. However, no online system or electronic storage method can be guaranteed to be completely secure.",
        ],
      },
      {
        id: "cookies-and-website-technologies",
        title: "Cookies and Website Technologies",
        content: [
          "Our website may use cookies or similar technologies to improve functionality, analyze website traffic, remember preferences, and enhance the user experience. You can manage or disable cookies through your browser settings, although some website features may not work properly as a result.",
        ],
      },
      {
        id: "your-privacy-rights",
        title: "Your Privacy Rights",
        content: [
          "Depending on applicable law, you may have the right to request access to, correction of, or deletion of certain personal information we hold about you. You may also contact Al Dana regarding questions about how your information is collected or used.",
        ],
      },
      {
        id: "policy-updates",
        title: "Policy Updates",
        content: [
          "Al Dana may update this Privacy Policy from time to time to reflect changes in our services, technology, or legal requirements. Any updates will be posted on this page with a revised effective date.",
        ],
      },
    ],
  },

  /* ====================================================================== */
  /* TERMS AND CONDITIONS                                                    */
  /* ====================================================================== */
  {
    slug: "terms-and-conditions",
    title: "Terms and Conditions",
    menuLabel: "Terms & Conditions",
    description:
      "The terms that apply when you use our website or submit a device for service.",
    intro: [
      "Welcome to **Al Dana**. By using our website or purchasing our services, you agree to follow these Terms and Conditions. Please read them carefully before submitting your gaming PC, laptop, iPad, or other electronic device for repair.",
    ],
    sections: [
      {
        id: "our-services",
        title: "1. Our Services",
        content: [
          "Al Dana provides professional repair, maintenance, troubleshooting, upgrade, and replacement services for gaming PCs, laptops, iPads, and other electronic devices. Our services may include hardware repairs, software troubleshooting, screen replacement, component replacement, system upgrades, cleaning, performance improvements, and general technical support.",
          "All repair work is performed according to the condition of the device and the service requested by the customer.",
        ],
      },
      {
        id: "device-condition",
        title: "2. Device Condition",
        content: [
          "Customers must inform Al Dana about any known problems, previous repairs, liquid damage, physical damage, missing parts, or other issues before the repair begins. Existing damage may affect the repair process and final result.",
          "Al Dana takes reasonable care of every device received for service. However, we cannot guarantee that every device can be repaired successfully, especially when it has severe physical damage, liquid damage, hardware failure, or other underlying problems.",
        ],
      },
      {
        id: "data-and-personal-information",
        title: "3. Data and Personal Information",
        content: [
          "Customers are responsible for backing up their important files, photos, documents, applications, and other personal information before submitting a device for repair.",
          "Repair services may require access to certain device functions or information for testing and diagnosis. Al Dana is not responsible for data loss caused by hardware failure, software problems, storage failure, accidental damage, or circumstances beyond our reasonable control.",
        ],
      },
      {
        id: "repair-estimates-and-approval",
        title: "4. Repair Estimates and Approval",
        content: [
          "Al Dana may provide an estimated repair cost before beginning the repair. Repair work will normally begin after the customer approves the estimated cost.",
          "If additional problems are discovered during the repair, the customer may be contacted for approval before additional work or charges are applied.",
        ],
      },
      {
        id: "parts-and-replacements",
        title: "5. Parts and Replacements",
        content: [
          "Replacement parts may be new, refurbished, or compatible parts, depending on availability and the service requested. Customers will be informed when a replacement part is required.",
          "The availability of specific brands, models, or components may vary.",
        ],
      },
      {
        id: "payments",
        title: "6. Payments",
        content: [
          "Customers are responsible for paying the agreed repair charges. Payment must be completed according to the payment terms provided by Al Dana.",
          "Additional charges may apply if extra repairs, services, or replacement parts are approved after the original estimate.",
        ],
      },
      {
        id: "warranty",
        title: "7. Warranty",
        content: [
          "Certain repairs and replacement parts may include a limited warranty. Warranty coverage depends on the specific service or replacement part.",
          "Warranty does not normally cover accidental damage, liquid damage, physical damage, misuse, unauthorized modifications, or problems unrelated to the original repair.",
        ],
      },
      {
        id: "customer-responsibility",
        title: "8. Customer Responsibility",
        content: [
          "Customers must provide accurate contact information and clearly explain the problems affecting their device. Customers should collect their repaired device within the agreed period.",
          "Al Dana may contact customers regarding repair updates, approvals, payments, or collection arrangements.",
        ],
      },
      {
        id: "changes-to-these-terms",
        title: "9. Changes to These Terms",
        content: [
          "Al Dana may update these Terms and Conditions when necessary to reflect changes in our services, business practices, or legal requirements. Updated terms will be posted on our website.",
          "By continuing to use our website or services after changes are published, you acknowledge and accept the updated Terms and Conditions.",
        ],
      },
      {
        id: "device-collection-policy",
        title: "10. Device Collection Policy",
        content: [
          "Once your device repair is completed and you are notified by **Al Dana**, customers are requested to collect their device within **7 days**.",
          "Al Dana will take reasonable care of the device for up to **15 days** after notification.",
          "Devices not collected within **30 days** may no longer be the responsibility of Al Dana, and the company will not be liable for any loss, damage, data, accessories, or other items associated with the device.",
          "Customers are responsible for collecting their devices within the stated period and keeping their contact information updated.",
          "**We strongly recommend collecting your repaired device as soon as possible.**",
        ],
      },
    ],
    closing: [
      "**Al Dana** is committed to providing professional, reliable, and transparent technology repair services while maintaining a positive and trustworthy customer experience.",
    ],
  },

  /* ====================================================================== */
  /* REFUND AND RETURN POLICY                                                */
  /* ====================================================================== */
  {
    slug: "refund-and-return-policy",
    title: "Refund and Return Policy",
    menuLabel: "Refund & Return Policy",
    description:
      "Service charges, repairs, replacement parts, and when refunds apply.",
    intro: [
      "At **Al Dana**, we are committed to providing professional repair services and quality replacement parts for gaming PCs, laptops, iPads, and other electronic devices. Our Refund and Return Policy explains the conditions that apply to service charges, repairs, replacement parts, and eligible refunds.",
    ],
    sections: [
      {
        id: "service-and-diagnostic-charge",
        title: "Service and Diagnostic Charge",
        content: [
          "A **100 DHS service charge** applies to each device submitted to Al Dana for inspection, diagnosis, testing, or troubleshooting. This charge covers the professional time and technical work required to identify the problem with the device.",
          "The **100 DHS service charge is non-refundable** once the device has been inspected or diagnosed. If the customer approves the recommended repair, the service charge may be included in or applied toward the final repair cost when applicable.",
        ],
      },
      {
        id: "repair-services",
        title: "Repair Services",
        content: [
          "Once a repair has been approved and completed, refund requests may not be accepted simply because the customer changes their mind. Before beginning repair work, Al Dana may provide an estimated cost based on the identified problem and required parts.",
          "If additional problems are discovered during the repair, the customer will be informed when possible, and additional work will only be carried out after approval.",
        ],
      },
      {
        id: "replacement-parts",
        title: "Replacement Parts",
        content: [
          "Replacement parts supplied by Al Dana may be eligible for replacement or exchange if they are found to be defective and are covered by the applicable warranty.",
          "Warranty coverage does not normally apply to damage caused by misuse, accidental damage, liquid damage, physical damage, unauthorized repair, modification, improper installation, or other issues unrelated to the original defect.",
        ],
      },
      {
        id: "refund-eligibility",
        title: "Refund Eligibility",
        content: [
          "Refunds may be considered in situations where Al Dana is unable to provide an approved service, or where a supplied replacement part is confirmed to be defective and cannot reasonably be replaced.",
          "Any approved refund will be reviewed according to the specific circumstances of the service or purchase. Refunds may be issued using the original payment method or another method agreed upon by Al Dana.",
          "The 100 DHS diagnostic and service charge remains non-refundable after inspection or diagnosis.",
        ],
      },
      {
        id: "customer-responsibility",
        title: "Customer Responsibility",
        content: [
          "Customers are responsible for providing accurate information about their device and explaining known problems before repair work begins. Customers should also back up important files, photos, documents, and other personal information before submitting a device.",
          "Al Dana is not responsible for personal data loss caused by hardware failure, software issues, storage failure, accidental damage, or circumstances beyond our reasonable control.",
        ],
      },
      {
        id: "return-requests",
        title: "Return Requests",
        content: [
          "Customers should contact Al Dana as soon as possible if they believe a repair or replacement part has a problem. The customer may be required to provide proof of service, payment, or other relevant information.",
          "All return and refund requests will be reviewed fairly and handled according to the applicable warranty and service conditions.",
        ],
      },
      {
        id: "policy-updates",
        title: "Policy Updates",
        content: [
          "Al Dana may update this Refund and Return Policy when necessary to reflect changes in our services, business practices, or legal requirements. Updated information will be published on our website.",
          "By using our services, customers acknowledge that they have read and understood this Refund and Return Policy.",
        ],
      },
      {
        id: "contact-us",
        title: "Contact Us",
        content: [
          "For questions regarding refunds, returns, service charges, or warranty claims, please contact **Al Dana** using the contact information provided on our website.",
        ],
      },
    ],
  },

  /* ====================================================================== */
  /* TRADE-IN & SERVICE POLICY                                               */
  /* ====================================================================== */
  {
    slug: "trade-in-policy",
    title: "Trade-In & Service Policy",
    menuLabel: "Trade-In Policy",
    description:
      "How trade-ins, inspections, payments, and returns are handled at Al Dana.",
    intro: [
      "**Trade In Today. Upgrade Tomorrow.**",
      "The policies below apply when you trade in a device or submit one for service with **Al Dana**.",
    ],
    sections: [
      {
        id: "our-commitment",
        title: "Our Commitment",
        content: [
          [
            "We provide repair, maintenance, upgrade, trade-in, and technical support services for gaming PCs, laptops, iPads, consoles, and other electronic devices.",
            "Our goal is to deliver practical solutions while maintaining honesty, transparency, and customer satisfaction.",
          ],
        ],
      },
      {
        id: "transparent-service",
        title: "Transparent Service",
        content: [
          [
            "We provide customers with a clear explanation of the reported issue before starting any repair or service.",
            "Customers will be informed about the estimated cost before major work begins.",
            "We aim to avoid unnecessary repairs and recommend only services that are relevant to the device.",
            "Any additional work or cost should be approved by the customer before proceeding.",
          ],
        ],
      },
      {
        id: "device-inspection",
        title: "Device Inspection",
        content: [
          [
            "Every device is inspected carefully when received.",
            "Existing scratches, cracks, dents, missing parts, liquid damage, or other visible issues may be recorded before buying.",
            "The final diagnosis may differ from the customer's initial description of the problem.",
            "Additional issues discovered during inspection will be communicated to the customer.",
          ],
        ],
      },
      {
        id: "trade-in-policy",
        title: "Trade-In Policy",
        content: [
          [
            "Trade-in values are based on the device's model, specifications, age, physical condition, functionality, accessories, and current market value.",
            "An initial valuation is not necessarily the final offer.",
            "Final trade-in value may be confirmed only after physical inspection and testing.",
            "Al Dana reserves the right to decline a trade-in request.",
          ],
        ],
      },
      {
        id: "customer-responsibility",
        title: "Customer Responsibility",
        content: [
          [
            "Customers must provide accurate information about their device and its condition.",
            "Customers should remove personal accounts, passwords, SIM cards, memory cards, and other personal information before handing over a device.",
            "Customers are responsible for backing up important files and data before repair service or trade-in.",
            "Al Dana cannot guarantee recovery of data that is lost due to hardware failure or repair procedures.",
          ],
        ],
      },
      {
        id: "privacy-and-data-protection",
        title: "Privacy & Data Protection",
        content: [
          [
            "Customer information is handled responsibly and used only for legitimate business and service purposes.",
            "We do not intentionally share customer information with unauthorized third parties.",
            "Customers should remove sensitive personal information before submitting devices for service or trade-in.",
          ],
        ],
      },
      {
        id: "payments",
        title: "Payments",
        content: [
          [
            "Customers are responsible for paying the agreed service or purchase amount.",
            "Additional charges must be communicated before additional work is completed.",
            "Prices may vary depending on parts, service requirements, availability, and market conditions.",
          ],
        ],
      },
      {
        id: "returns-and-refunds",
        title: "Returns & Refunds",
        content: [
          [
            "Refund and return eligibility depends on the type of product or service purchased.",
            "Completed repair services may not be refundable where the agreed service has already been performed.",
            "Customers should contact Al Dana promptly if they believe a service has not been completed correctly.",
          ],
        ],
      },
      {
        id: "policy-updates",
        title: "Policy Updates",
        content: [
          [
            "Al Dana reserves the right to update or modify its policies when necessary.",
            "The latest version of our policies will be made available through our official website or business location.",
            "By using our services, customers acknowledge and agree to the applicable company policies.",
          ],
        ],
      },
    ],
  },
]

export const defaultLegalSlug = legalDocs[0].slug
