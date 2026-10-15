import { ArrowRight } from 'lucide-react';
import type { Faq } from '../data/faqs';

export function FaqList({ items, openFirst = false }: { items: Faq[]; openFirst?: boolean }) {
  return (
    <div className="faq-list">
      {items.map((faq, index) => (
        <details key={faq.id} id={faq.id} open={openFirst && index === 0}>
          <summary>
            <span>{faq.question}</span>
            <span aria-hidden="true">+</span>
          </summary>
          <div className="faq-answer">
            {faq.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
            {faq.listItems && (
              <ul>
                {faq.listItems.map((item) => (
                  <li key={item.label}><strong>{item.label}:</strong> {item.text}</li>
                ))}
              </ul>
            )}
            {faq.closingParagraphs?.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
            {faq.links && (
              <div className="faq-answer-links">
                {faq.links.map((link) => (
                  <a key={link.href} href={link.href}>
                    {link.label}<ArrowRight aria-hidden="true" size={16} />
                  </a>
                ))}
              </div>
            )}
          </div>
        </details>
      ))}
    </div>
  );
}
