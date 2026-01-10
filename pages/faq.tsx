import Head from 'next/head';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Card from '../components/Card';

export default function FAQ() {
  const faqs = [
    {
      question: "How does the matching algorithm work?",
      answer: "Our advanced algorithm considers your preferences, interests, values, and behavior patterns to suggest compatible matches. We continuously refine our system based on successful relationships formed on our platform."
    },
    {
      question: "Is CrushZone free to use?",
      answer: "Yes, creating a profile and basic features are completely free. We offer premium features like unlimited matches, advanced filters, and priority messaging for a small monthly fee."
    },
    {
      question: "How do I report inappropriate behavior?",
      answer: "You can report any user by clicking the flag icon on their profile or message thread. Our safety team reviews all reports within 24 hours and takes appropriate action."
    },
    {
      question: "Can I change my location?",
      answer: "Yes, you can update your location in your profile settings. This helps us show you matches in your area and suggest local events or meetups."
    },
    {
      question: "What should I do if I feel unsafe on a date?",
      answer: "Your safety is our top priority. Always meet in public places, inform a friend of your plans, and trust your instincts. If you feel threatened, contact local authorities immediately."
    },
    {
      question: "How do I delete my account?",
      answer: "You can delete your account in Settings > Account > Delete Account. We'll permanently remove your data within 30 days, per our privacy policy."
    },
    {
      question: "Do you verify user profiles?",
      answer: "We offer optional photo verification to help build trust in our community. Verified users have a blue checkmark next to their name."
    },
    {
      question: "Can I use CrushZone internationally?",
      answer: "Absolutely! Our app is available in over 50 countries. You can set your location preferences to connect with people anywhere in the world."
    }
  ];

  return (
    <>
      <Head>
        <title>FAQ - CrushZone</title>
        <meta name="description" content="Find answers to frequently asked questions about CrushZone, from matching to safety and account management." />
        <meta name="keywords" content="FAQ, questions, help, dating app, support" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <Header />

      <main>
        <section className="section">
          <div className="container">
            <h1>Frequently Asked Questions</h1>
            <p className="mb-4">Everything you need to know about using CrushZone.</p>

            <div className="faq-list">
              {faqs.map((faq, index) => (
                <Card key={index} className="mb-3">
                  <h3>{faq.question}</h3>
                  <p>{faq.answer}</p>
                </Card>
              ))}
            </div>

            <Card className="text-center mt-4">
              <h2>Still have questions?</h2>
              <p>Can't find what you're looking for? Our support team is here to help.</p>
              <a href="/contact" className="btn btn-primary">Contact Support</a>
            </Card>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}