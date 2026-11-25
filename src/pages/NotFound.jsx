import Button from '../components/ui/Button';
import { usePageTitle } from '../hooks/usePageTitle';

export default function NotFound() {
  usePageTitle('पेज नहीं मिला');
  return (
    <section className="section" style={{ textAlign: 'center' }}>
      <div className="container" style={{ maxWidth: 520 }}>
        <p style={{ fontSize: '4rem', fontWeight: 800, color: 'var(--violet-600)', lineHeight: 1.2 }}>404</p>
        <h1 style={{ fontSize: '1.8rem', margin: '0.5rem 0' }}>यह पेज नहीं मिला</h1>
        <p style={{ color: 'var(--muted)', marginBottom: '1.8rem' }}>
          आप जिस पते पर आए हैं वह मौजूद नहीं है। मुख पृष्ठ से सभी योजनाएं देखें।
        </p>
        <Button to="/" trailingIcon="arrowRight">मुख पृष्ठ पर जाएं</Button>
      </div>
    </section>
  );
}
