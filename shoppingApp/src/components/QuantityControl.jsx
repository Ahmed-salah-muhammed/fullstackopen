// src/components/QuantityControl.jsx
// Matches Stitch design: compact pill-shaped qty stepper inside product cards

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
    <div
      className="flex items-center rounded-lg"
      style={{ backgroundColor: 'var(--color-surface-container-lowest)' }}
    >
      <button
        onClick={() => onChange(Math.max(min, value - 1))}
        aria-label="Decrease"
        className={`flex items-center justify-center transition-colors duration-150
                    hover:text-[var(--color-primary)] text-[var(--color-on-surface-variant)]
                    ${isSmall ? 'w-7 h-7' : 'w-8 h-8'}`}
        style={{ color: 'var(--color-on-surface-variant)' }}
      >
        <span className="material-symbols-outlined" style={{ fontSize: isSmall ? 14 : 16 }}>remove</span>
      </button>

      <input
        type="text"
        inputMode="numeric"
        value={value}
        onChange={handleInput}
        onBlur={handleBlur}
        aria-label="Quantity"
        className={`border-none bg-transparent text-center font-bold focus:ring-0 p-0
                    ${isSmall ? 'w-7 text-xs' : 'w-8 text-sm'}`}
        style={{ color: 'var(--color-on-surface)' }}
      />

      <button
        onClick={() => onChange(value + 1)}
        aria-label="Increase"
        className={`flex items-center justify-center transition-colors duration-150
                    hover:text-[var(--color-primary)] text-[var(--color-on-surface-variant)]
                    ${isSmall ? 'w-7 h-7' : 'w-8 h-8'}`}
        style={{ color: 'var(--color-on-surface-variant)' }}
      >
        <span className="material-symbols-outlined" style={{ fontSize: isSmall ? 14 : 16 }}>add</span>
      </button>
    </div>
  )
}
