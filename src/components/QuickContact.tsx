import { useEffect, useRef, useState } from 'react'
import ContactForm from './ContactForm'
import type { DialogClickEvent } from '../types/ui'
import { motionDurations } from '../data/motion'
import { motionDuration } from '../utils/motion'
import './QuickContact.css'
export default function QuickContact() {
 const [open, setOpen] = useState<boolean>(false)
 const [closing, setClosing] = useState<boolean>(false)
 const dialog = useRef<HTMLDialogElement>(null)
 const trigger = useRef<HTMLButtonElement>(null)
 useEffect(() => {
  if (open) {
    dialog.current?.showModal()
    dialog.current?.querySelector<HTMLInputElement>('input')?.focus()
  }
  else dialog.current?.close()
 }, [open])
 useEffect(() => {
  if (!closing) return
  const timeout = window.setTimeout(() => setOpen(false), motionDuration(motionDurations.dialogExit))
  return () => window.clearTimeout(timeout)
 }, [closing])
 function requestClose(): void {
  if (open && !closing) setClosing(true)
 }
 function closeFromBackdrop(event: DialogClickEvent): void {
  if (event.target !== event.currentTarget) return
  const rect = event.currentTarget.getBoundingClientRect()
  if (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom) requestClose()
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
 <dialog className={`popup${closing ? ' popup--closing' : ''}`} style={{ transitionDuration: `${closing ? motionDurations.dialogExit : motionDurations.dialogEnter}ms` }} id="quick-contact" ref={dialog} onClick={closeFromBackdrop} onCancel={event => { event.preventDefault(); requestClose() }} onClose={() => { setOpen(false); setClosing(false); trigger.current?.focus({ preventScroll: true }) }} aria-labelledby="popup-title">
 <button className="popup__close" type="button" aria-label="Cerrar formulario" onClick={requestClose}>×</button>
 <header className="popup__header"><h2 className="popup__title" id="popup-title">Contáctame</h2></header><ContactForm prefix="quick" />
 </dialog></div>
}
