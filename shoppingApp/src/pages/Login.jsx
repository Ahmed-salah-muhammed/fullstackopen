import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { useToast } from '../context/ToastContext'

export default function Login() {
  const { login } = useAuth()
  const toast = useToast()
  const navigate = useNavigate()

  const [email, setEmail] = useState('')
  const [pass, setPass] = useState('')
  const [errors, setErrors] = useState({})
  const [success, setSuccess] = useState(false)

  const validate = () => {
    const e = {}
    if (!email) e.email = 'Email is required'
    else if (!/\S+@\S+\.\S+/.test(email)) e.email = 'Email is invalid'
    if (!pass) e.pass = 'Password is required'
    else if (pass.length < 6) e.pass = 'Password must be at least 6 characters'
    setErrors(e)
    return Object.keys(e).length === 0
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!validate()) return

    // Mock login
    setSuccess(true)
    setTimeout(() => {
      login({ name: email.split('@')[0], email })
      toast('Welcome to Male Fashion!', 'success')
      navigate('/')
    }, 1500)
  }

  return (
    <div className="min-h-screen bg-surface flex items-center justify-center p-8 relative overflow-hidden">

      {/* Background Decorative Elements */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none opacity-5">
         <div className="absolute -top-24 -left-24 w-96 h-96 bg-primary rounded-full blur-3xl" />
         <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-on-surface rounded-full blur-3xl" />
      </div>

      <div className="w-full max-w-[500px] z-10">

        {/* Brand */}
        <div className="text-center mb-12">
           <h1 className="text-4xl font-black tracking-tighter text-on-surface mb-2">MALE-FASHION<span className="text-primary">.</span></h1>
           <p className="text-xs font-bold uppercase tracking-[4px] text-on-surface-variant">Sign in to your account</p>
        </div>

        {/* Login Card */}
        <div className="bg-white border border-outline p-10 md:p-14 shadow-2xl shadow-on-surface/5">

           {success && (
              <div className="mb-8 bg-primary/10 text-primary p-4 text-xs font-bold uppercase tracking-widest text-center border border-primary/20">
                 Success! Redirecting to shop...
              </div>
           )}

           <form onSubmit={handleSubmit} className="flex flex-col gap-8">

              <div className="flex flex-col gap-2">
                 <label className="text-xs font-bold uppercase tracking-widest text-on-surface-variant">Email Address</label>
                 <input
                   type="email"
                   value={email}
                   onChange={e => setEmail(e.target.value)}
                   placeholder="Enter your email"
                   className={`border-b-2 ${errors.email ? 'border-primary' : 'border-outline'} p-3 outline-none focus:border-on-surface transition-colors text-sm font-bold`}
                 />
                 {errors.email && <span className="text-[10px] font-bold text-primary uppercase mt-1">{errors.email}</span>}
              </div>

              <div className="flex flex-col gap-2">
                 <div className="flex justify-between items-center">
                    <label className="text-xs font-bold uppercase tracking-widest text-on-surface-variant">Password</label>
                    <button type="button" className="text-[10px] font-bold uppercase text-primary hover:underline">Forgot?</button>
                 </div>
                 <input
                   type="password"
                   value={pass}
                   onChange={e => setPass(e.target.value)}
                   placeholder="••••••••"
                   className={`border-b-2 ${errors.pass ? 'border-primary' : 'border-outline'} p-3 outline-none focus:border-on-surface transition-colors text-sm font-bold`}
                 />
                 {errors.pass && <span className="text-[10px] font-bold text-primary uppercase mt-1">{errors.pass}</span>}
              </div>

              <button
                type="submit"
                disabled={success}
                className="w-full bg-on-surface text-white py-5 font-bold uppercase tracking-[3px] text-sm hover:bg-primary transition-colors mt-4 disabled:opacity-50"
              >
                Sign In
              </button>

           </form>

           <div className="mt-12">
              <div className="relative flex items-center justify-center mb-8">
                 <div className="absolute w-full border-t border-outline" />
                 <span className="relative bg-white px-4 text-[10px] font-bold uppercase tracking-widest text-on-surface-variant">Or login with</span>
              </div>

              <div className="grid grid-cols-2 gap-4">
                 <button className="flex items-center justify-center gap-3 border border-outline p-4 hover:border-on-surface transition-colors">
                    <svg className="w-4 h-4" viewBox="0 0 24 24">
                      <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                      <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                      <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                      <path d="M12 5.38c1.62 0 3.06.56 4.21 1.66l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                    </svg>
                    <span className="text-[10px] font-bold uppercase tracking-widest">Google</span>
                 </button>
                 <button className="flex items-center justify-center gap-3 border border-outline p-4 hover:border-on-surface transition-colors">
                    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
                    </svg>
                    <span className="text-[10px] font-bold uppercase tracking-widest">Apple ID</span>
                 </button>
              </div>
           </div>

        </div>

        <p className="mt-10 text-center text-xs font-bold uppercase tracking-widest text-on-surface-variant">
           Don't have an account? <button onClick={() => toast('Registration Coming Soon!', 'info')} className="text-primary hover:underline">Sign up now</button>
        </p>

      </div>

    </div>
  )
}
