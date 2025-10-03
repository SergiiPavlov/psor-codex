'use client'
import {useState} from 'react'

export default function FAQAccordion({items}:{items:{q:string,a:string}[]}){
  const [open, setOpen] = useState<number|null>(null)
  return (
    <div className="divide-y border rounded-2xl">
      {items.map((it, idx)=> (
        <details key={idx} className="p-4" open={open===idx} onClick={(e)=>{
          e.preventDefault()
          setOpen(open===idx? null : idx)
        }}>
          <summary className="cursor-pointer font-medium">{it.q}</summary>
          <p className="mt-2 text-gray-600">{it.a}</p>
        </details>
      ))}
    </div>
  )
}
