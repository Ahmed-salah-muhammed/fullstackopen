const Marquee = () => {
  return (
    <div className="bg-primary-main dark:bg-indigo-900 text-white py-2 overflow-hidden whitespace-nowrap border-b border-white/10 relative z-50">
      <div className="inline-block animate-[marquee_20s_linear_infinite] hover:[animation-play-state:paused] cursor-default px-4">
        <span className="mx-8 font-extrabold text-[0.65rem] tracking-[0.2em] uppercase">Free Shipping on orders over 50</span>
        <span className="mx-8 font-extrabold text-[0.65rem] tracking-[0.2em] uppercase">Ahmed Salah x ShopWave Limited Drop</span>
        <span className="mx-8 font-extrabold text-[0.65rem] tracking-[0.2em] uppercase">Summer Atelier 2024 Collection Out Now</span>
        <span className="mx-8 font-extrabold text-[0.65rem] tracking-[0.2em] uppercase">Premium Quality Guaranteed</span>
      </div>
      <div className="inline-block animate-[marquee_20s_linear_infinite] hover:[animation-play-state:paused] cursor-default px-4">
        <span className="mx-8 font-extrabold text-[0.65rem] tracking-[0.2em] uppercase">Free Shipping on orders over 50</span>
        <span className="mx-8 font-extrabold text-[0.65rem] tracking-[0.2em] uppercase">Ahmed Salah x ShopWave Limited Drop</span>
        <span className="mx-8 font-extrabold text-[0.65rem] tracking-[0.2em] uppercase">Summer Atelier 2024 Collection Out Now</span>
        <span className="mx-8 font-extrabold text-[0.65rem] tracking-[0.2em] uppercase">Premium Quality Guaranteed</span>
      </div>
    </div>
  )
}

export default Marquee
