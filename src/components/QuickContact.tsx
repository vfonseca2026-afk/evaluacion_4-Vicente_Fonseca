import { useEffect, useRef, useState } from 'react'
import ContactForm from './ContactForm'
import type { DialogClickEvent } from '../types/ui'
import './QuickContact.css'
export default function QuickContact() {
 const [open, setOpen] = useState<boolean>(false)
 const dialog = useRef<HTMLDialogElement>(null)
 const trigger = useRef<HTMLButtonElement>(null)
 useEffect(() => {
  if (open) {
    dialog.current?.showModal()
    dialog.current?.querySelector<HTMLInputElement>('input')?.focus()
  }
  else dialog.current?.close()
 }, [open])
 function closeFromBackdrop(event: DialogClickEvent): void {
  if (event.target !== event.currentTarget) return
  const rect = event.currentTarget.getBoundingClientRect()
  if (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom) setOpen(false)
 }
 return <div className="quick-contact"><button className="quick-contact__trigger" ref={trigger} type="button" aria-label="Abrir formulario de contacto rápido" aria-haspopup="dialog" aria-controls="quick-contact" aria-expanded={open} onClick={() => setOpen(true)}><span className="robot" aria-hidden="true">
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
 <dialog className="popup" id="quick-contact" ref={dialog} onClick={closeFromBackdrop} onCancel={() => setOpen(false)} onClose={() => { setOpen(false); trigger.current?.focus({ preventScroll: true }) }} aria-labelledby="popup-title">
 <button className="popup__close" type="button" aria-label="Cerrar formulario" onClick={() => setOpen(false)}>×</button>
 <header className="popup__header"><h2 className="popup__title" id="popup-title">Contáctame</h2></header><ContactForm prefix="quick" />
 </dialog></div>
}
