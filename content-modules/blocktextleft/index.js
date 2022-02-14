import ReactMarkdown from 'react-markdown'

export default function BlockTextLeft({ title, body }) {
  return (
    <div
      className="section text-area-left"
      data-aos="fade-in"
      data-aos-delay="300"
      data-aos-once="true"
    >
      <h3>{title}</h3>
      <div><ReactMarkdown>{body}</ReactMarkdown></div>

      <style jsx>{`
        .text-area-left {
          max-width: 70%;
        }
      `}</style>
    </div>
  );
}
