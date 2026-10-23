import Link from 'next/link';
import LegalDocument, { type LegalSection } from '@/components/layout/LegalDocument';

const sections: LegalSection[] = [
  {
    title: 'Using our website',
    paragraphs: [
      'These Terms of Service apply when you visit or use our website and its product information, images and enquiry features. By using the site, you agree to these terms and our Privacy Policy. If you do not agree, please do not use the site.',
      'You must use the site lawfully and not interfere with its operation, attempt unauthorized access, introduce malicious code, or copy and reuse site content in a way that violates another person’s rights.',
    ],
  },
  {
    title: 'Our products',
    paragraphs: [
      'We offer handcrafted terrariums and related products. Plants and natural materials vary, and each handmade piece may have small differences in shape, color, arrangement or growth from the photographs shown online. We aim to describe products and care needs clearly, but the appearance of an image can also vary by screen and display settings.',
      'Product listings, descriptions and availability may change. A listing is not a guarantee that a product will remain available.',
    ],
  },
  {
    title: 'Enquiries and orders',
    paragraphs: [
      'The website does not currently complete checkout or accept online payment. When you use the WhatsApp enquiry feature, you are asking us about a product or order; this enquiry alone does not confirm an order. We will confirm availability, final price, delivery details and any other order conditions with you directly. An order is accepted only after we confirm those details with you.',
      'Please check the product, quantity, delivery details and agreed price in our written confirmation. Contact us as soon as possible if something needs to be corrected or if you want to change or cancel an enquiry or confirmed order. Any applicable consumer rights remain unaffected by these terms.',
    ],
  },
  {
    title: 'Prices and payment',
    paragraphs: [
      'Prices shown on the site are displayed in Qatari Riyals (QAR) unless a listing states otherwise. Prices and availability may be updated before an order is confirmed. We will confirm the total, delivery charges, payment method and payment timing directly with you before finalizing an order. Do not send card details through the website or WhatsApp.',
    ],
  },
  {
    title: 'Delivery and care',
    paragraphs: [
      'Delivery locations, charges and estimated timing are confirmed during the order conversation. We will let you know about material changes to an agreed delivery arrangement. Please follow the care instructions supplied with your terrarium and contact us if you need help caring for it.',
    ],
  },
  {
    title: 'Returns, issues and consumer rights',
    paragraphs: [
      'Our return and refund process is described in the Refund Policy. If a product arrives damaged, appears defective, or is materially different from what was confirmed, contact us promptly with your order details and photos where possible so we can review the issue. Return, exchange or remedy arrangements will be handled in accordance with the confirmed order terms and applicable law in Qatar. Nothing in these Terms excludes consumer rights that cannot lawfully be excluded.',
    ],
  },
  {
    title: 'Site content and intellectual property',
    paragraphs: [
      'Our store name, logo, site design, text, product photographs and other site content belong to us or the relevant rights holder. You may browse and use the site for personal, non-commercial purposes. You may not republish, commercially exploit or alter site content without permission, except where applicable law allows it.',
    ],
  },
  {
    title: 'Third-party services and links',
    paragraphs: [
      'The site may link to or open third-party services, including WhatsApp. Those services are operated by others and are governed by their own terms and privacy notices. We are not responsible for third-party services outside our control.',
    ],
  },
  {
    title: 'Changes and site availability',
    paragraphs: [
      'We may change site features or update these Terms from time to time. The latest version will appear on this page with an updated date. We aim to keep the site available and accurate, but cannot guarantee uninterrupted access or that every listing is free of errors. If information relevant to an order is incorrect, we will confirm the correct details with you before accepting that order.',
    ],
  },
  {
    title: 'Applicable law',
    paragraphs: [
      'These Terms are governed by the laws of the State of Qatar, subject to any mandatory consumer protections that apply to you. Any dispute will be handled by the competent courts of Qatar, except where applicable law provides otherwise.',
    ],
  },
];

export default function TermsOfServicePage() {
  return (
    <LegalDocument
      title="Terms of Service"
      summary="The terms for browsing our site and making product enquiries or orders."
      sections={sections}
    >
      <p className="leading-7 text-text-secondary">
        Please also read our <Link href="/privacy-policy" className="font-medium text-primary underline underline-offset-2">Privacy Policy</Link> to understand how information is handled.
      </p>
      <p className="leading-7 text-text-secondary">
        See our <Link href="/refund-policy" className="font-medium text-primary underline underline-offset-2">Refund Policy</Link> for return, cancellation and refund requests.
      </p>
    </LegalDocument>
  );
}
