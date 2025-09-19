
interface NoteProofProps {
    content: string
    baseClassName?: string
}
export function NoteProof(props: NoteProofProps) {
    const { content,baseClassName="" } = props
  
    return (
        <div className="p-3 w-full border rounded-lg ">
          <h5 className="text-primary-100 mb-2">Note:  </h5>
            <p className={`text-primary-100 text-sm ${baseClassName}`}>{content}</p>

        </div>
    );
}
