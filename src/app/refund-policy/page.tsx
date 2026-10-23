import LegalDocument, { type LegalSection } from '@/components/layout/LegalDocument';

const sections: LegalSection[] = [
  {
    title: 'Our promise',
    paragraphs: [
      'We take care to prepare healthy plants and handcrafted terrariums and to represent them accurately. Because plants and natural materials are living and varied, each item may differ slightly from the photographs in size, shape, color or arrangement.',
    ],
  },
  {
    title: 'Inspecting your delivery',
    paragraphs: [
      'Please check your order when it arrives. If it is damaged, defective, or different from the product confirmed with you, tell us as soon as possible and include your order details and clear photos where you can. If you do not wish to accept an item at delivery, let the delivery agent know and contact us so we can arrange the next steps.',
      'Please contact us before sending or handing an item back after delivery. We will confirm how to return it and assess the issue. This request to contact us promptly does not limit any rights you have under applicable law.',
    ],
  },
  {
    title: 'Change-of-mind returns',
    paragraphs: [
      'You may request a change-of-mind return within 24 hours after delivery. For an eligible change-of-mind return requested within that period, we will waive the return delivery charge. Contact us first to arrange the return; the item must be in its original packaging and in the condition in which it was delivered. Plants that have been repotted, altered or cared for in a way that materially changes their condition, and accessories returned without their original packaging, may not qualify for a change-of-mind refund.',
      'After the 24-hour change-of-mind period, we may be unable to accept a return for preference or change of mind. This does not affect your rights if an item is defective, damaged, incorrect or otherwise fails to meet applicable legal requirements.',
    ],
  },
  {
    title: 'Plant health concerns',
    paragraphs: [
      'Living plants can respond to their environment and care after delivery. Please contact us within 3 days of delivery if you notice a plant health concern, and share clear photos and details of its care and placement so we can assess it and help where possible. This helps us understand the condition on arrival; it is not a deadline that removes rights or remedies available under applicable law.',
    ],
  },
  {
    title: 'Cancellations and exchanges',
    paragraphs: [
      'Our website currently accepts order enquiries rather than online checkout. If you need to cancel or change an enquiry or confirmed order, contact us as soon as possible. We will try to accommodate a request made before the order is prepared or dispatched, but a cancellation may not be possible once preparation or delivery is underway. If an order has already been delivered, use the return process above.',
      'Exchanges can be arranged by contacting us. Availability depends on the item and stock. Defective, damaged or incorrect products will be handled in accordance with applicable consumer protection requirements.',
    ],
  },
  {
    title: 'Refunds',
    paragraphs: [
      'Once we have received and accepted an eligible return, we will arrange the refund using the payment method or another method agreed with you. We aim to process accepted refunds within 21 working days. We will let you know if we need further information or if the assessment takes longer.',
      'Where an item is defective or does not conform to the confirmed order, we will assess and provide the remedy required by applicable law. Nothing in this policy excludes or limits your rights under Qatar’s consumer protection laws.',
    ],
  },
];

export default function RefundPolicyPage() {
  return (
    <LegalDocument
      title="Refund Policy"
      summary="How to request a return, cancellation, exchange or refund for an order."
      sections={sections}
    />
  );
}
