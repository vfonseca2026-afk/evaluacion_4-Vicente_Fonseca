import { useEffect, useRef, useState } from 'react'
import ContactForm from './ContactForm'
export default function QuickContact() {
 const [open, setOpen] = useState<boolean>(false)
 const dialog = useRef<HTMLDialogElement>(null)
 useEffect(() => {
  if (open) dialog.current?.showModal()
  else dialog.current?.close()
 }, [open])
 return <><button className="info-button" type="button" aria-label="Abrir formulario de contacto rápido" aria-haspopup="dialog" aria-controls="quick-contact" aria-expanded={open} onClick={() => setOpen(true)}><span className="robot" aria-hidden="true">
            <span className="robot__antenna"></span>
            <span className="robot__head">
                <span className="robot__screen">
                    <span className="robot__eye"></span>
                    <span className="robot__eye"></span>
                    <span className="robot__mouth"></span>
                </span>
            </span>
            <span className="robot__arm robot__arm--left"></span>
            <span className="robot__arm robot__arm--right"></span>
            <span className="robot__body"></span>
        </span>
    </button>
 <dialog className="popup" id="quick-contact" ref={dialog} onCancel={() => setOpen(false)} onClose={() => setOpen(false)} aria-labelledby="popup-title">
 <button className="popup__close" type="button" aria-label="Cerrar formulario" onClick={() => setOpen(false)}>×</button>
 <header className="popup__header"><h2 id="popup-title">Contáctame</h2></header><ContactForm prefix="quick" />
 </dialog></>
}
