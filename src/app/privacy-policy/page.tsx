import LegalDocument, { type LegalSection } from '@/components/layout/LegalDocument';

const sections: LegalSection[] = [
  {
    title: 'About this policy',
    paragraphs: [
      'This Privacy Policy explains how we handle information when you visit our website, browse our products, contact us, or make an order enquiry (together, our “Services”). Our current contact details and business address are shown below.',
      'By using the Services, you acknowledge this policy. Where applicable law requires consent for a particular use of personal information, we will request that consent. You can choose not to provide information, although that may limit our ability to respond to an enquiry or arrange an order.',
    ],
  },
  {
    title: 'Information you provide',
    paragraphs: ['The information we receive depends on how you choose to use the Services. It may include:'],
    bullets: [
      'Contact information such as your name, phone number, email address and delivery details when you send an order enquiry or contact us.',
      'Order enquiry details such as the products, quantities, delivery preferences and notes you include in a WhatsApp message.',
      'Messages and information you choose to share with our team for customer support or product care.',
      'If you are an authorized store administrator, your account email and authentication/session information used to access the admin area.',
    ],
  },
  {
    title: 'Information collected through the site',
    paragraphs: [
      'Your browser and the service providers that operate the site may process basic technical information, such as your IP address, browser and device type, pages requested and security or error logs. This information helps deliver the site, prevent misuse and troubleshoot problems.',
      'The site stores your shopping cart in your browser’s local storage so it can remember the items you selected. The cart is not an order and is not submitted to us unless you choose to contact us about it.',
    ],
  },
  {
    title: 'How we use information',
    paragraphs: ['We use the information described above to:'],
    bullets: [
      'Respond to your questions and product or care requests.',
      'Prepare and follow up on product and delivery enquiries you ask us to handle.',
      'Operate, secure and improve the website and our customer service.',
      'Meet legal obligations and protect our rights, customers and Services.',
    ],
  },
  {
    title: 'WhatsApp and other service providers',
    paragraphs: [
      'When you choose “Buy” or “WhatsApp”, the site prepares a message using the details you entered and opens WhatsApp. You decide whether to send it. Information you send is then handled by WhatsApp/Meta under its own terms and privacy policy; please review those terms before sharing personal information there.',
      'We use service providers to operate the Services. Supabase supports our website database and administration services, and Cloudinary stores and delivers product and site images. These providers process information as needed to provide their services. They may process or store information in locations outside Qatar, subject to their own safeguards and terms.',
      'We do not sell personal information. We may disclose information when needed to provide a service you requested, comply with law, respond to a valid legal request, or protect the Services and people who use them.',
    ],
  },
  {
    title: 'Payments',
    paragraphs: [
      'The site does not currently take payment card details or process online payments. Order details, payment method and any payment arrangements are confirmed directly with you during the order enquiry.',
    ],
  },
  {
    title: 'Cookies and similar storage',
    paragraphs: [
      'The storefront currently uses browser local storage to remember your cart. We do not currently use advertising pixels or analytics cookies on the storefront. Your browser, WhatsApp and other third-party services may use their own storage or cookies when you use their services; their privacy notices explain those practices.',
      'You can clear local storage through your browser settings. Doing so will clear saved cart items. Blocking or clearing browser storage may affect site features.',
    ],
  },
  {
    title: 'Retention and security',
    paragraphs: [
      'We keep information only for as long as it is reasonably needed to respond to you, manage an enquiry or order, operate the Services, resolve disputes and meet applicable legal obligations. WhatsApp messages may remain in your and our WhatsApp accounts until deleted under the controls offered by that service.',
      'We use reasonable administrative and technical safeguards for information handled through our Services. No website or transmission method can be guaranteed completely secure.',
    ],
  },
  {
    title: 'Your choices and rights',
    paragraphs: [
      'Depending on applicable law, including Qatar’s Personal Data Privacy Protection Law No. 13 of 2016, you may ask to access, correct or delete personal information we hold, object to certain processing, or withdraw consent where processing is based on consent. Contact us using the details below and tell us what information or request you mean. We may need to verify your identity and may retain information where the law requires or permits it.',
    ],
  },
  {
    title: 'Children and third-party links',
    paragraphs: [
      'Our Services are intended for a general audience and are not designed to collect personal information directly from children. If you believe a child has provided us personal information, contact us so we can review it.',
      'The site may link to third-party websites or services. We do not control their content or privacy practices, and their own terms and notices apply when you use them.',
    ],
  },
  {
    title: 'Changes to this policy',
    paragraphs: [
      'We may update this policy as our Services or practices change, or when required by law. We will post the updated version on this page and revise the “Last updated” date above.',
    ],
  },
];

export default function PrivacyPolicyPage() {
  return (
    <LegalDocument
      title="Privacy Policy"
      summary="How we handle information when you browse our products, contact us, or make an order enquiry."
      sections={sections}
    />
  );
}
