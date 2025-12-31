
import React, { useState, useEffect } from 'react';
import FireworkEffect from './components/FireworkEffect';
import { generateNewYearGreeting } from './services/geminiService';

const App: React.FC = () => {
  const [greeting, setGreeting] = useState<string>('Selamat Tahun Baru 2026!');
  const [name, setName] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [isSpecial, setIsSpecial] = useState<boolean>(false);
  const [timeLeft, setTimeLeft] = useState<{ days: number; hours: number; minutes: number; seconds: number }>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  const TARGET_NAME = "lilis marselina situmorang";
  const TARGET_DATE_STR = 'January 1, 2026 00:00:00';

  useEffect(() => {
    const targetDate = new Date(TARGET_DATE_STR).getTime();

    const interval = setInterval(() => {
      const now = new Date().getTime();
      const difference = targetDate - now;

      if (difference <= 0) {
        clearInterval(interval);
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      } else {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((difference % (1000 * 60)) / 1000),
        });
      }
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const handleGenerate = async () => {
    if (!name.trim()) return;

    const targetTime = new Date(TARGET_DATE_STR).getTime();
    const currentTime = new Date().getTime();

    // Check if it's already New Year
    if (currentTime < targetTime) {
      setIsSpecial(false);
      setGreeting("Maaf, pesan ini masih terkunci. Silakan kembali lagi saat hitungan mundur mencapai 00:00:00 tepat di tahun baru 2026! ✨");
      return;
    }

    setLoading(true);
    const normalizedInput = name.trim().toLowerCase();
    
    if (normalizedInput === TARGET_NAME) {
      setIsSpecial(true);
      const specialMessage = `✨ Selamat Tahun Baru, Cintaku ✨

Terima kasih untuk setiap waktu, tawa, dan cerita yang kita lewati bersama sepanjang tahun ini. Terima kasih karena selalu ada, bertahan, dan tetap memilih aku, bahkan di saat aku tidak selalu mudah untuk dipahami. Kehadiranmu adalah hadiah paling indah yang pernah aku miliki.

Aku juga ingin meminta maaf untuk setiap kata yang mungkin menyakitkan, sikap yang kurang peka, dan kesalahan yang pernah aku buat. Maaf jika terkadang aku belum bisa menjadi pasangan yang sempurna, tapi percayalah, cintaku untukmu selalu tulus dan sungguh-sungguh.

Di tahun yang baru ini, aku berharap kita bisa tumbuh bersama, saling menguatkan, saling memahami, dan tidak mudah menyerah satu sama lain. Semoga setiap langkah ke depan selalu dipenuhi doa, kebahagiaan, dan cinta yang semakin dalam.

I love you so much. 💖✨`;
      setGreeting(specialMessage);
    } else {
      setIsSpecial(false);
      const newGreeting = await generateNewYearGreeting(name);
      setGreeting(newGreeting);
    }
    setLoading(false);
  };

  return (
    <div className={`relative min-h-screen flex flex-col items-center justify-center p-4 md:p-6 overflow-x-hidden transition-colors duration-1000 ${isSpecial ? 'bg-rose-950' : 'bg-slate-950'}`}>
      <FireworkEffect />
      
      {/* Floating Hearts for Special Mode */}
      {isSpecial && (
        <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
          {[...Array(25)].map((_, i) => (
            <div 
              key={i} 
              className="absolute animate-float text-rose-400/30 text-2xl md:text-4xl"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 5}s`,
                animationDuration: `${7 + Math.random() * 8}s`
              }}
            >
              ❤️
            </div>
          ))}
        </div>
      )}

      {/* Main Content Card */}
      <main className={`relative z-10 w-full max-w-3xl backdrop-blur-xl border rounded-3xl p-6 md:p-10 shadow-2xl text-center transition-all duration-700 ${isSpecial ? 'bg-rose-900/10 border-rose-500/30 shadow-rose-500/20' : 'bg-white/5 border-white/10 shadow-black/40'}`}>
        
        <div className={`mb-6 inline-block p-1 rounded-full animate-pulse ${isSpecial ? 'bg-gradient-to-r from-red-500 via-rose-500 to-pink-500' : 'bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500'}`}>
            <div className={`${isSpecial ? 'bg-rose-950' : 'bg-slate-900'} rounded-full px-6 py-2`}>
                <span className="text-white font-bold text-xs md:text-sm tracking-widest uppercase">
                  {isSpecial ? 'Special Message for Lilis' : 'Happy New Year'}
                </span>
            </div>
        </div>

        <h1 className={`text-4xl md:text-7xl font-extrabold text-transparent bg-clip-text mb-6 drop-shadow-sm transition-all ${isSpecial ? 'bg-gradient-to-r from-rose-300 via-rose-500 to-red-400' : 'bg-gradient-to-r from-yellow-300 via-orange-400 to-red-500'}`}>
          2026
        </h1>

        <div className="min-h-[160px] flex items-center justify-center mb-8 px-2">
            {loading ? (
                <div className="flex space-x-2">
                    <div className={`w-3 h-3 ${isSpecial ? 'bg-rose-400' : 'bg-white'} rounded-full animate-bounce [animation-delay:-0.3s]`}></div>
                    <div className={`w-3 h-3 ${isSpecial ? 'bg-rose-400' : 'bg-white'} rounded-full animate-bounce [animation-delay:-0.15s]`}></div>
                    <div className={`w-3 h-3 ${isSpecial ? 'bg-rose-400' : 'bg-white'} rounded-full animate-bounce`}></div>
                </div>
            ) : (
                <p className={`text-base md:text-lg font-medium leading-relaxed animate-fade-in whitespace-pre-wrap ${isSpecial ? 'text-rose-100' : 'text-slate-100'}`}>
                    {greeting}
                </p>
            )}
        </div>

        {/* User Interaction */}
        <div className="space-y-4 mb-8 max-w-md mx-auto">
            <div className="relative">
                <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Masukkan nama lengkap kamu..."
                    className={`w-full bg-white/5 border rounded-2xl px-6 py-4 text-white placeholder-slate-400 focus:outline-none transition-all ${isSpecial ? 'border-rose-500/50 focus:ring-2 focus:ring-rose-500/50 text-center' : 'border-white/10 focus:ring-2 focus:ring-purple-500/50 text-center'}`}
                />
            </div>
            <button
                onClick={handleGenerate}
                disabled={loading}
                className={`w-full text-white font-bold py-4 px-8 rounded-2xl shadow-lg transform hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center space-x-2 disabled:opacity-50 ${isSpecial ? 'bg-gradient-to-r from-rose-600 to-red-600 shadow-rose-500/20' : 'bg-gradient-to-r from-purple-600 to-indigo-600 shadow-purple-500/20'}`}
            >
                <i className={`fa-solid ${isSpecial ? 'fa-heart animate-pulse' : 'fa-sparkles'}`}></i>
                <span>{name.trim().toLowerCase() === TARGET_NAME ? 'Buka Pesan dari Hatiku' : 'Dapatkan Ucapan Baru'}</span>
            </button>
        </div>

        {/* Countdown Timer */}
        <div className="grid grid-cols-4 gap-2 md:gap-4 mt-8">
            {[
                { label: 'Hari', value: timeLeft.days },
                { label: 'Jam', value: timeLeft.hours },
                { label: 'Menit', value: timeLeft.minutes },
                { label: 'Detik', value: timeLeft.seconds },
            ].map((item, idx) => (
                <div key={idx} className={`rounded-xl md:rounded-2xl p-2 md:p-3 border transition-all duration-500 ${isSpecial ? 'bg-rose-500/10 border-rose-500/20' : 'bg-white/5 border-white/5'}`}>
                    <div className={`text-xl md:text-3xl font-bold ${isSpecial ? 'text-rose-200' : 'text-white'}`}>{item.value.toString().padStart(2, '0')}</div>
                    <div className={`text-[8px] md:text-xs uppercase tracking-wider ${isSpecial ? 'text-rose-400/70' : 'text-slate-400'}`}>{item.label}</div>
                </div>
            ))}
        </div>
      </main>

      {/* Footer */}
      <footer className="relative z-10 mt-8 md:mt-12 text-slate-500 text-xs md:text-sm flex flex-col items-center">
          <p className={`${isSpecial ? 'text-rose-400/50' : 'text-slate-500'} text-center px-4`}>
            {isSpecial ? 'Dibuat dengan segenap cinta untuk Lilis Marselina Situmorang ❤️' : '© 2025 Made with ❤️ for 2026'}
          </p>
      </footer>

      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes fade-in {
            from { opacity: 0; transform: translateY(10px); }
            to { opacity: 1; transform: translateY(0); }
        }
        @keyframes float {
          0% { transform: translateY(0) rotate(0deg); opacity: 0; }
          10% { opacity: 0.3; }
          90% { opacity: 0.3; }
          100% { transform: translateY(-100vh) rotate(360deg); opacity: 0; }
        }
        .animate-fade-in {
            animation: fade-in 0.8s ease-out forwards;
        }
        .animate-float {
            animation: float linear infinite;
        }
        input::placeholder {
          text-align: center;
        }
      `}} />
    </div>
  );
};

export default App;
