export default function QuantityControl({ value, onChange, min = 1, size = 'md' }) {
  const handleInput = (e) => {
    const parsed = parseInt(e.target.value, 10)
    if (!isNaN(parsed)) onChange(Math.max(min, parsed))
  }
  const handleBlur = (e) => {
    if (!e.target.value || parseInt(e.target.value, 10) < min) onChange(min)
  }

  const isSmall = size === 'sm'

  return (
    <div className="flex items-center border border-outline px-2 py-1 gap-2">
      <button
        onClick={() => onChange(Math.max(min, value - 1))}
        className="flex items-center justify-center text-on-surface hover:text-primary transition-colors w-6 h-6"
      >
        <span className="material-symbols-outlined" style={{ fontSize: isSmall ? 14 : 16 }}>remove</span>
      </button>

      <input
        type="text"
        inputMode="numeric"
        value={value}
        onChange={handleInput}
        onBlur={handleBlur}
        className="border-none bg-transparent text-center font-bold outline-none p-0 w-8 text-sm"
      />

      <button
        onClick={() => onChange(value + 1)}
        className="flex items-center justify-center text-on-surface hover:text-primary transition-colors w-6 h-6"
      >
        <span className="material-symbols-outlined" style={{ fontSize: isSmall ? 14 : 16 }}>add</span>
      </button>
    </div>
  )
}
