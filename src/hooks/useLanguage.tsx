import { createContext, useContext, useState, ReactNode } from "react";

type Lang = "uz" | "en";

const translations = {
  uz: {
    // Navbar
    home: "Bosh sahifa",
    movies: "Filmlar",
    tvShows: "Seriallar",
    newPopular: "Yangi va Mashhur",
    search: "Qidirish...",
    login: "Kirish",
    register: "Ro'yxatdan o'tish",
    signOut: "Chiqish",

    // Hero
    trendingNow: "Hozir Trendda",
    watchNow: "Ko'rish",
    moreInfo: "Batafsil",

    // Index sections
    trendingWeek: "🔥 Shu hafta trendda",
    popularMovies: "⭐ Mashhur filmlar",
    tvShowsSection: "📺 Seriallar",
    topRated: "🏆 Eng yuqori baholangan",
    upcoming: "🎬 Tez kunda",
    resultsFor: "Natijalar",

    // Detail page
    back: "Orqaga",
    stop: "To'xtatish",
    share: "Ulashish",
    cast: "Aktyorlar",
    seasons: "Mavsum",
    streamUnavailable: "Bu kontent uchun oqim mavjud emas",
    linkCopied: "Havola nusxalandi!",

    // Comments
    comments: "Izohlar",
    yourName: "Ismingiz (ixtiyoriy)",
    writeComment: "Izoh yozing...",
    postComment: "Izoh qoldirish",
    posting: "Yuborilmoqda...",
    noComments: "Hali izoh yo'q. Birinchi bo'ling!",
    commentFailed: "Izoh yuborishda xatolik",

    // Auth
    signInTitle: "Hisobingizga kiring",
    createAccount: "Yangi hisob yarating",
    email: "Elektron pochta",
    password: "Parol (kamida 6 belgi)",
    username: "Foydalanuvchi nomi",
    signingIn: "Kirilmoqda...",
    signIn: "Kirish",
    creatingAccount: "Hisob yaratilmoqda...",
    dontHaveAccount: "Hisobingiz yo'qmi?",
    alreadyHaveAccount: "Hisobingiz bormi?",
    loggedIn: "Muvaffaqiyatli kirdingiz!",
    accountCreated: "Hisob yaratildi!",
    usernameTooShort: "Foydalanuvchi nomi kamida 3 belgidan iborat bo'lishi kerak",

    // Footer
    footerDesc: "Bepul filmlar va seriallar",
    allRights: "Barcha huquqlar himoyalangan",

    // Watchlist
    addToWatchlist: "Saqlash",
    inWatchlist: "Saqlangan",
    loginToWatchlist: "Saqlash uchun kiring",
    removedFromWatchlist: "Ro'yxatdan olib tashlandi",
    addedToWatchlist: "Ro'yxatga qo'shildi",

    // 404
    pageNotFound: "Sahifa topilmadi",
    returnHome: "Bosh sahifaga qaytish",

    // Player
    movieNotFound: "Film topilmadi",
    loading: "Yuklanmoqda...",
    notFound: "Topilmadi",
    streamingPlaceholder: "🎬 Bu yerda oqim pleyeri ko'rsatiladi",
  },
  en: {
    home: "Home",
    movies: "Movies",
    tvShows: "TV Shows",
    newPopular: "New & Popular",
    search: "Search...",
    login: "Login",
    register: "Register",
    signOut: "Sign Out",

    trendingNow: "Trending Now",
    watchNow: "Watch Now",
    moreInfo: "More Info",

    trendingWeek: "🔥 Trending This Week",
    popularMovies: "⭐ Popular Movies",
    tvShowsSection: "📺 TV Shows",
    topRated: "🏆 Top Rated",
    upcoming: "🎬 Upcoming",
    resultsFor: "Results for",

    back: "Back",
    stop: "Stop",
    share: "Share",
    cast: "Cast",
    seasons: "Season",
    streamUnavailable: "Stream unavailable for this title",
    linkCopied: "Link copied to clipboard!",

    comments: "Comments",
    yourName: "Your name (optional)",
    writeComment: "Write a comment...",
    postComment: "Post Comment",
    posting: "Posting...",
    noComments: "No comments yet. Be the first!",
    commentFailed: "Failed to post comment",

    signInTitle: "Sign in to your account",
    createAccount: "Create a new account",
    email: "Email",
    password: "Password (min 6 characters)",
    username: "Username",
    signingIn: "Signing in...",
    signIn: "Sign In",
    creatingAccount: "Creating account...",
    dontHaveAccount: "Don't have an account?",
    alreadyHaveAccount: "Already have an account?",
    loggedIn: "Logged in successfully!",
    accountCreated: "Account created!",
    usernameTooShort: "Username must be at least 3 characters",

    footerDesc: "Free movies and TV shows",
    allRights: "All rights reserved",

    addToWatchlist: "Add to Watchlist",
    inWatchlist: "In Watchlist",
    loginToWatchlist: "Please login to add to watchlist",
    removedFromWatchlist: "Removed from watchlist",
    addedToWatchlist: "Added to watchlist",

    pageNotFound: "Oops! Page not found",
    returnHome: "Return to Home",

    movieNotFound: "Movie not found",
    loading: "Loading...",
    notFound: "Not found",
    streamingPlaceholder: "🎬 Streaming player would appear here",
  },
} as const;

type Translations = Record<keyof typeof translations.uz, string>;

type LanguageContextType = {
  lang: Lang;
  setLang: (lang: Lang) => void;
  t: Translations;
};

const LanguageContext = createContext<LanguageContextType>({
  lang: "uz",
  setLang: () => {},
  t: translations.uz,
});

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [lang, setLang] = useState<Lang>(() => {
    if (typeof window !== "undefined") {
      return (localStorage.getItem("lang") as Lang) || "uz";
    }
    return "uz";
  });

  const handleSetLang = (newLang: Lang) => {
    setLang(newLang);
    localStorage.setItem("lang", newLang);
  };

  return (
    <LanguageContext.Provider value={{ lang, setLang: handleSetLang, t: translations[lang] }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);
