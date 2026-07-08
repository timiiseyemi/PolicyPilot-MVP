# 🛡️ PolicyPilot

AI-powered Insurance Brokerage Platform built with Nomba APIs.

PolicyPilot helps insurance brokers digitize their workflow by managing customers, policies, payments, renewals, claims, and AI-assisted operations from one dashboard.

---

## 🚀 Overview

PolicyPilot modernizes insurance brokerage operations by combining payment infrastructure from Nomba with AI-powered productivity tools.

Instead of managing policies manually through spreadsheets and emails, brokers can:

- Create insurance policies
- Manage customers
- Accept premium payments
- Track payment status
- Manage claims
- Monitor renewals
- Generate AI-powered policy summaries
- Draft renewal emails
- Explain insurance coverage using AI

---

## ✨ Features

### 👥 Customer Management

- Customer profiles
- Prospect management
- KYC records
- Customer search

---

### 📄 Policy Management

- Create policies
- View active policies
- Policy numbers
- Product categories
- Premium tracking
- Insurer information

---

### 💳 Payments (Powered by Nomba)

- Generate payment links
- Premium collection
- Payment verification
- Transaction history
- Payment status tracking

---

### 🔁 Renewals

- Upcoming renewals
- Renewal reminders
- Renewal tracking

---

### 🛡 Claims

- Claims management
- Claims history
- Claims status

---

### 🤖 AI Copilot

BrokerOS AI helps brokers:

- Summarize policies
- Draft renewal emails
- Explain insurance coverage
- Recommend cross-selling opportunities
- Analyze customer portfolios
- Answer insurance-related questions

---

## 🏗 Tech Stack

### Frontend

- Next.js
- React
- TypeScript
- Tailwind CSS
- Metronic UI

### Backend

- Next.js API Routes

### Database

- PostgreSQL
- Prisma ORM

### Authentication

- NextAuth.js

### Payments

- Nomba Checkout
- Nomba Payment Verification API
- Nomba Webhooks

### AI

- OpenRouter
- Llama Models

### Deployment

- Vercel

---

## 📷 Screens

- Dashboard
- Customers
- Policies
- Claims
- Payments
- Renewals
- AI Copilot

---

## 🔄 Payment Flow

1. Broker creates a policy.
2. Customer receives a payment link.
3. Customer completes payment via Nomba Checkout.
4. Nomba sends payment confirmation.
5. Policy payment status updates automatically.
6. Broker can view payment history.

---

## 🤖 AI Workflow

Broker enters a request such as:

> Draft a renewal reminder for John Doe.

The AI Copilot generates:

- Professional renewal emails
- Policy summaries
- Coverage explanations
- Cross-selling suggestions
- Customer portfolio insights

---

## 🛠 Installation

Clone the repository.

```bash
git clone https://github.com/timiiseyemi/PolicyPilot-MVP.git
```

Install dependencies.

```bash
npm install
```

Create a `.env` file.

```env
DATABASE_URL=

NEXTAUTH_SECRET=

NEXTAUTH_URL=

NOMBA_CLIENT_ID=

NOMBA_CLIENT_SECRET=

NOMBA_ACCOUNT_ID=

OPENROUTER_API_KEY=
```

Run Prisma.

```bash
npx prisma migrate dev
```

Start the project.

```bash
npm run dev
```

---

## 📁 Project Structure

```
app/
components/
lib/
services/
prisma/
public/
```

---

## 🔮 Future Roadmap

- Commission management
- Automated policy renewals
- Broker analytics dashboard
- AI risk assessment
- AI claims analysis
- Customer self-service portal
- WhatsApp notifications
- Multi-broker support
- Multi-tenant architecture
- Role-based permissions

---

## 🏆 Built For

Nomba Hackathon 2026

Theme:

Building modern financial products powered by Nomba APIs.

---

## 👨‍💻 Author

**Oluwatimilehin Iseyemi**

Frontend Developer • Cloud Practitioner • Insurance Technology Enthusiast

GitHub:
https://github.com/timiiseyemi

---

## 📄 License

MIT License
