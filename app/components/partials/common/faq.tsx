'use client';

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export interface FaqItem {
  title: string;
  text: string;
}

export type FaqItems = Array<FaqItem>;

export function Faq() {
  const items: FaqItems = [
    {
      title: 'How is pricing determined for each plan ?',
      text: "PolicyPilot offers flexible insurance coverage plans tailored to your needs. Understanding the risk factors and coverage limits for each plan helps you make an informed decision for your assets and peace of mind.",
    },
    {
      title: 'What payment methods are accepted for subscriptions ?',
      text: "PolicyPilot accepts various payment methods, including credit cards, direct bank transfers, and digital wallets, for your insurance premium payments.",
    },
    {
      title: 'Are there any hidden fees in the pricing ?',
      text: "PolicyPilot is committed to transparency. All costs, including premiums and administrative fees, are clearly outlined in your policy documentation, with no hidden surprises.",
    },
    {
      title: 'Is there a discount for annual subscriptions ?',
      text: "Yes, PolicyPilot offers significant discounts if you choose to pay your insurance premiums annually rather than monthly.",
    },
    {
      title: 'Do you offer refunds on subscription cancellations ?',
      text: "PolicyPilot provides prorated refunds on your insurance premiums if you choose to cancel your policy before the term expires, subject to policy terms.",
    },
    {
      title: 'Can I add extra features to my current plan ?',
      text: "Absolutely. You can easily upgrade your coverage or add endorsements to your existing PolicyPilot plan at any time through your dashboard.",
    },
  ];

  const generateItems = () => {
    return (
      <Accordion type="single" collapsible>
        {items.map((item, index) => (
          <AccordionItem key={index} value={`item-${index}`}>
            <AccordionTrigger>{item.title}</AccordionTrigger>
            <AccordionContent>{item.text}</AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    );
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>FAQ</CardTitle>
      </CardHeader>
      <CardContent className="py-3">{generateItems()}</CardContent>
    </Card>
  );
}
