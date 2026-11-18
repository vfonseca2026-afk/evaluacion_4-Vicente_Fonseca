import './ContactPage.css'
import ContactForm from '../components/ContactForm'
export default function ContactPage() { return <section className="section contacto" aria-labelledby="contact-title"><div className="container container--narrow"><header className="section__head"><h1 className="section__title" tabIndex={-1} id="contact-title">Contacto</h1><p className="section__desc">¿Quieres conversar sobre un proyecto o una oportunidad? Escríbeme.</p></header><ContactForm prefix="contact" /></div></section> }
