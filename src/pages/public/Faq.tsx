import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronDown, Mail, Phone } from 'lucide-react';
import { Button } from '@/src/components/ui/Button';

const faqCategories = [
  {
    category: 'Getting Started',
    items: [
      {
        question: 'How do I know a property is genuine and government-verified?',
        answer: 'Every listing on this portal is uploaded and verified directly by the Ministry of Lands and Housing. Each property page shows its allocation status, title documentation, and verification badge.',
      },
      {
        question: 'Do I need to create an account to browse properties?',
        answer: 'No, you can browse and search all listings without an account. You will need to register or log in once you are ready to reserve a property or start the payment process.',
      },
      {
        question: 'Can diaspora buyers purchase property remotely?',
        answer: 'Yes. Diaspora buyers can complete KYC, browse the GIS map, and finalize payment entirely online through Stripe, without needing to be physically present.',
      },
    ],
  },
  {
    category: 'Payments',
    items: [
      {
        question: 'What payment plans are available?',
        answer: 'You can pay in full or choose a flexible installment plan. Payments are processed securely via Paystack for local buyers or Stripe for international buyers.',
      },
      {
        question: 'Is my payment information secure?',
        answer: 'Yes. All payments are processed through Paystack and Stripe, both PCI-DSS compliant providers. The portal itself never stores your card details.',
      },
      {
        question: 'What happens if I miss an installment?',
        answer: 'You will receive a reminder before each due date. If a payment is missed, our support team will reach out to help you reschedule before any reservation is affected.',
      },
    ],
  },
  {
    category: 'Documentation & Allocation',
    items: [
      {
        question: 'What documents do I need to complete KYC?',
        answer: 'You will need a valid government-issued ID, proof of address, and a passport photograph. Diaspora buyers can complete KYC remotely through the portal.',
      },
      {
        question: 'How long does it take to receive my allocation letter?',
        answer: 'Once payment is confirmed, your official allocation letter and ownership documents are generated and available for download instantly on your dashboard.',
      },
      {
        question: 'Can I transfer or resell an allocated property?',
        answer: 'Property transfer requests are handled through the Ministry directly. Contact support once your allocation is complete to begin the transfer process.',
      },
    ],
  },
];

export function Faq() {
  const [openItem, setOpenItem] = useState<string | null>('0-0');

  const toggleItem = (key: string) => {
    setOpenItem(openItem === key ? null : key);
  };

  return (
    <div>
      <section className="bg-slate-900 py-16 lg:py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-extrabold text-white tracking-tight mb-4">
            Frequently Asked Questions
          </h1>
          <p className="text-lg text-slate-300 max-w-xl mx-auto">
            Everything you need to know about browsing, buying, and owning government property through this portal.
          </p>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 max-w-3xl">
          {faqCategories.map((group, groupIndex) => (
            <div key={groupIndex} className="mb-12 last:mb-0">
              <h2 className="text-xl font-bold text-slate-900 mb-4">{group.category}</h2>
              <div className="space-y-3">
                {group.items.map((faq, itemIndex) => {
                  const key = `${groupIndex}-${itemIndex}`;
                  const isOpen = openItem === key;
                  return (
                    <div key={key} className="bg-slate-50 rounded-xl border border-slate-200 overflow-hidden">
                      <button
                        onClick={() => toggleItem(key)}
                        className="w-full flex items-center justify-between gap-4 px-5 py-4 text-left"
                      >
                        <span className="font-medium text-slate-900">{faq.question}</span>
                        <ChevronDown className={`h-5 w-5 text-slate-400 shrink-0 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
                      </button>
                      {isOpen && (
                        <div className="px-5 pb-4 text-slate-500 text-sm">
                          {faq.answer}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="py-16 bg-slate-50 border-t border-slate-200">
        <div className="container mx-auto px-4 max-w-2xl text-center">
          <h2 className="text-2xl font-bold text-slate-900 tracking-tight mb-2">Still Have Questions?</h2>
          <p className="text-slate-500 mb-8">Our support team is available to help with anything not covered here.</p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a href="mailto:info.lands@abiastate.gov.ng">
              <Button size="lg" variant="outline" className="w-full sm:w-auto">
                <Mail className="h-4 w-4 mr-2" />
                Email Support
              </Button>
            </a>
            <a href="tel:08099999999">
              <Button size="lg" className="w-full sm:w-auto bg-emerald-600 hover:bg-emerald-700">
                <Phone className="h-4 w-4 mr-2" />
                Call Us
              </Button>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}