import { useEffect, useRef } from 'react'
import Quill from 'quill'
import 'quill/dist/quill.snow.css'

type QuillEditorProps = {
  value?: string
  onChange?: (value: string) => void
  placeholder?: string
  className?: string
}

const QuillEditor = ({ value = '', onChange, placeholder, className }: QuillEditorProps) => {
  const editorRef = useRef<HTMLDivElement | null>(null)
  const quillRef = useRef<Quill | null>(null)

  useEffect(() => {
    if (!editorRef.current || quillRef.current) return

    quillRef.current = new Quill(editorRef.current, {
      theme: 'snow',
      placeholder,
    })

    quillRef.current.on('text-change', () => {
      const html = editorRef.current?.querySelector<HTMLElement>('.ql-editor')?.innerHTML || ''
      const text = quillRef.current?.getText().trim() || ''
      onChange?.(text ? html : '')
    })
  }, [onChange, placeholder])

  useEffect(() => {
    const editor = editorRef.current?.querySelector<HTMLElement>('.ql-editor')
    if (editor && value !== editor.innerHTML) {
      editor.innerHTML = value
    }
  }, [value])

  return <div className={className} ref={editorRef} />
}

export default QuillEditor
