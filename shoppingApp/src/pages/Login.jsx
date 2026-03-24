// src/pages/Login.jsx — Stitch ATELIER login: ambient glow + glass card
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth }  from '../context/AuthContext'
import { useToast } from '../context/ToastContext'

export default function Login() {
  const { login, isLoggedIn } = useAuth()
  const toast    = useToast()
  const navigate = useNavigate()

  const [email,   setEmail]   = useState('')
  const [pass,    setPass]    = useState('')
  const [errors,  setErrors]  = useState({})
  const [success, setSuccess] = useState(false)

  useEffect(() => { if (isLoggedIn) navigate('/') }, [isLoggedIn, navigate])

  const validate = () => {
    const e = {}
    if (!email.trim())
      e.email = 'Email is required'
    else if (!/\S+@\S+\.\S+/.test(email))
      e.email = 'Enter a valid email address'
    if (!pass.trim())
      e.pass = 'Password is required'
    else if (pass.length < 4)
      e.pass = 'Password must be at least 4 characters'
    return e
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const errs = validate()
    if (Object.keys(errs).length > 0) { setErrors(errs); return }
    setErrors({})
    login(email)
    setSuccess(true)
    toast('Welcome to the Atelier. 👋', 'success')
    setTimeout(() => navigate('/'), 1200)
  }

  const inputCls = (hasError) => `
    w-full px-4 py-3.5 rounded-lg text-sm border-none outline-none
    transition-all duration-300 font-['Inter']
    focus:ring-2
    ${hasError ? 'ring-2 ring-[var(--color-error)]/50' : ''}
  `

  return (
    <div
      className="min-h-screen flex items-center justify-center px-6 py-16 relative overflow-hidden"
      style={{ backgroundColor: 'var(--color-surface)' }}
    >
      {/* Ambient glow blobs — matches Stitch login background */}
      <div
        className="absolute pointer-events-none"
        style={{
          top: '-10%', right: '-10%',
          width: '40%', height: '40%',
          background: 'var(--color-primary)',
          opacity: 0.05,
          borderRadius: '50%',
          filter: 'blur(120px)',
        }}
      />
      <div
        className="absolute pointer-events-none"
        style={{
          bottom: '-10%', left: '-10%',
          width: '30%', height: '30%',
          background: 'var(--color-surface-container-highest)',
          opacity: 0.3,
          borderRadius: '50%',
          filter: 'blur(100px)',
        }}
      />

      <div className="w-full max-w-[480px] z-10 animate-fadeUp">

        {/* Brand anchor */}
        <div className="text-center mb-12">
          <h1
            className="text-4xl font-black tracking-tighter mb-2"
            style={{ color: 'var(--color-on-surface)' }}
          >
            ATELIER
          </h1>
          <p
            className="text-xs font-light tracking-[0.25em] uppercase"
            style={{ color: 'var(--color-secondary)' }}
          >
            The Digital Boutique
          </p>
        </div>

        {/* Card */}
        <div
          className="rounded-xl p-8 md:p-12"
          style={{
            backgroundColor: 'var(--color-surface-container-lowest)',
            boxShadow: '0 20px 40px rgba(19,27,46,0.04)',
            outline: '1px solid',
            outlineColor: 'rgba(199,196,215,0.1)',
          }}
        >
          {/* Heading */}
          <div className="mb-10">
            <h2
              className="text-2xl font-semibold tracking-tight mb-2"
              style={{ color: 'var(--color-on-surface)' }}
            >
              Welcome back
            </h2>
            <p className="text-sm" style={{ color: 'var(--color-on-surface-variant)' }}>
              Enter your credentials to access your archive.
            </p>
          </div>

          {/* Success banner */}
          {success && (
            <div
              className="mb-6 px-4 py-3.5 rounded-lg text-sm flex items-center gap-3"
              style={{
                backgroundColor: 'var(--color-primary-fixed)',
                color: 'var(--color-on-primary-fixed-variant)',
              }}
            >
              <span className="material-symbols-outlined" style={{ fontSize: 18 }}>check_circle</span>
              Signed in successfully. Redirecting…
            </div>
          )}

          <form onSubmit={handleSubmit} noValidate className="space-y-6">

            {/* Email */}
            <div>
              <label
                className="block text-[11px] font-semibold uppercase tracking-widest mb-2 ml-1"
                style={{ color: 'var(--color-on-surface-variant)' }}
              >
                Email Address
              </label>
              <input
                type="email"
                placeholder="name@atelier.com"
                value={email}
                onChange={e => setEmail(e.target.value)}
                autoComplete="email"
                className={inputCls(!!errors.email)}
                style={{
                  backgroundColor: 'var(--color-surface-container-low)',
                  color: 'var(--color-on-surface)',
                  '--tw-ring-color': errors.email
                    ? 'var(--color-error)'
                    : 'rgba(42,20,180,0.4)',
                }}
              />
              {errors.email && (
                <p className="mt-1.5 text-xs ml-1" style={{ color: 'var(--color-error)' }}>
                  {errors.email}
                </p>
              )}
            </div>

            {/* Password */}
            <div>
              <div className="flex justify-between items-center mb-2 px-1">
                <label
                  className="block text-[11px] font-semibold uppercase tracking-widest"
                  style={{ color: 'var(--color-on-surface-variant)' }}
                >
                  Password
                </label>
                <button
                  type="button"
                  className="text-[11px] font-medium transition-colors hover:opacity-70"
                  style={{ color: 'var(--color-primary)' }}
                >
                  Forgot Password?
                </button>
              </div>
              <input
                type="password"
                placeholder="••••••••"
                value={pass}
                onChange={e => setPass(e.target.value)}
                autoComplete="current-password"
                className={inputCls(!!errors.pass)}
                style={{
                  backgroundColor: 'var(--color-surface-container-low)',
                  color: 'var(--color-on-surface)',
                  '--tw-ring-color': errors.pass
                    ? 'var(--color-error)'
                    : 'rgba(42,20,180,0.4)',
                }}
              />
              {errors.pass && (
                <p className="mt-1.5 text-xs ml-1" style={{ color: 'var(--color-error)' }}>
                  {errors.pass}
                </p>
              )}
            </div>

            {/* Submit */}
            <button
              type="submit"
              className="w-full signature-gradient text-white py-4 rounded-lg font-semibold
                         tracking-tight transition-all duration-200
                         hover:opacity-90 active:scale-[0.98]"
              style={{ boxShadow: '0 8px 20px rgba(42,20,180,0.2)' }}
            >
              Sign In
            </button>
          </form>

          {/* Divider */}
          <div className="relative my-10">
            <div
              className="absolute inset-0 flex items-center"
              aria-hidden
            >
              <div
                className="w-full border-t"
                style={{ borderColor: 'rgba(199,196,215,0.3)' }}
              />
            </div>
            <div className="relative flex justify-center">
              <span
                className="px-4 text-[10px] uppercase tracking-[0.2em] font-bold"
                style={{
                  backgroundColor: 'var(--color-surface-container-lowest)',
                  color: 'var(--color-outline)',
                }}
              >
                Or continue with
              </span>
            </div>
          </div>

          {/* Social buttons */}
          <div className="grid grid-cols-2 gap-4">
            {[
              {
                label: 'Google',
                icon: (
                  <svg className="w-5 h-5" viewBox="0 0 24 24">
                    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.66l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                  </svg>
                ),
              },
              {
                label: 'Apple',
                icon: (
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
                  </svg>
                ),
              },
            ].map(s => (
              <button
                key={s.label}
                type="button"
                className="flex items-center justify-center gap-3 px-4 py-3.5
                           rounded-lg text-sm font-medium tracking-tight
                           transition-colors duration-200 border border-transparent
                           active:border-[var(--color-outline-variant)]/50"
                style={{
                  backgroundColor: 'var(--color-surface-container-low)',
                  color: 'var(--color-on-surface)',
                }}
                onMouseEnter={e => e.currentTarget.style.backgroundColor = 'var(--color-surface-container-high)'}
                onMouseLeave={e => e.currentTarget.style.backgroundColor = 'var(--color-surface-container-low)'}
              >
                {s.icon}
                {s.label}
              </button>
            ))}
          </div>
        </div>

        {/* Sign-up CTA */}
        <p
          className="text-center text-sm mt-8"
          style={{ color: 'var(--color-on-surface-variant)' }}
        >
          New to the Atelier?{' '}
          <span
            className="font-semibold cursor-pointer transition-opacity hover:opacity-70"
            style={{ color: 'var(--color-primary)' }}
            onClick={() => toast('Registration coming soon!', 'default')}
          >
            Create an account
          </span>
        </p>
      </div>

      {/* Footer strip */}
      <div
        className="absolute bottom-0 inset-x-0 py-5 px-8"
        style={{ backgroundColor: 'var(--color-surface-container-low)' }}
      >
        <div className="max-w-screen-xl mx-auto flex justify-between items-center flex-wrap gap-3">
          <div>
            <p className="font-black text-sm tracking-tighter" style={{ color: 'var(--color-on-surface)' }}>ATELIER</p>
            <p className="text-[10px]" style={{ color: 'var(--color-on-surface-variant)' }}>
              © 2025 ATELIER. ALL RIGHTS RESERVED.
            </p>
          </div>
          <div className="flex gap-5 text-[10px] uppercase tracking-widest"
               style={{ color: 'var(--color-on-surface-variant)' }}>
            {['Privacy Policy', 'Terms of Service', 'Shipping & Returns', 'Contact'].map(l => (
              <span key={l} className="cursor-pointer hover:text-[var(--color-on-surface)] transition-colors hidden sm:block">{l}</span>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
