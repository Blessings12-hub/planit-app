import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';

const translations = {
  en: {
    subtitle: "Group plans that actually happen",
    tagline: "Stop chasing people in group chats.",
    description: "Create events, let friends vote on dates and locations, send invites, and finally make plans happen fast",
    participantBtn: "I'm a Participant",
    adminBtn: "Admin Login",
    whyTitle: "Why Schedora?",
    features: [
      "📅 Vote on dates and locations",
      "🔗 Share event links instantly",
      "⏰ Automatic reminders",
      "👥 Track attendance"
    ],
    languageLabel: "Language:"
  },
  ru: {
    subtitle: "Групповые планы, которые работают",
    tagline: "Не нужно гонять людей в чатах.",
    description: "Создавайте события, выбирайте даты и места, отправляйте приглашения и делайте планы реальными",
    participantBtn: "Я участник",
    adminBtn: "Вход для админа",
    whyTitle: "Почему Schedora?",
    features: [
      "📅 Выбирайте даты и места",
      "🔗 Мгновенная рассылка",
      "⏰ Автоматические напоминания",
      "👥 Отслеживайте участников"
    ],
    languageLabel: "Язык:"
  },
  es: {
    subtitle: "Planes grupales que realmente suceden",
    tagline: "No persigas personas en chats.",
    description: "Crea eventos, vota por fechas y lugares, envía invitaciones y haz planes rápidos",
    participantBtn: "Soy Participante",
    adminBtn: "Login Admin",
    whyTitle: "¿Por qué Schedora?",
    features: [
      "📅 Vota por fechas y lugares",
      "🔗 Comparte enlaces rápido",
      "⏰ Recordatorios automáticos",
      "👥 Controla asistencia"
    ],
    languageLabel: "Language:"
  },
  ja: {
    subtitle: "実際に進むグループ計画",
    tagline: "グループチャットで追わないで。",
    description: "イベント作成、日付と場所の投票、招待送信、計画を早く実現",
    participantBtn: "参加者です",
    adminBtn: "管理者ログイン",
    whyTitle: "Schedoraを選ぶ理由？",
    features: [
      "📅 日付と場所を選べる",
      "🔗 リンクを即時共有",
      "⏰ 自動リマインダー",
      "👥 出席追跡"
    ],
    languageLabel: "言語:"
  },
  fr: {
    subtitle: "Plans de groupe qui se réalisent",
    tagline: "Ne cherchez plus dans les groupes.",
    description: "Créez des événements, votez dates et lieux, envoyez des invitations, plans rapides",
    participantBtn: "Je suis Participant",
    adminBtn: "Connexion Admin",
    whyTitle: "Pourquoi Schedora?",
    features: [
      "📅 Vote dates et lieux",
      "🔗 Partage rapide",
      "⏰ Rappels automatiques",
      "👥 Suivez la présence"
    ],
    languageLabel: "Langue:"
  },
  de: {
    subtitle: "Pläne, die passieren",
    tagline: "Stoppe Nachlaufen.",
    description: "Erstelle Events, stimme ab, sende Einladungen, schnelle Pläne",
    participantBtn: "Ich bin Teilnehmer",
    adminBtn: "Admin Login",
    whyTitle: "Warum Schedora?",
    features: [
      "📅 Daten/Orte",
      "🔗 Sofort teilen",
      "⏰ Erinnerungen",
      "👥 Teilnahme"
    ],
    languageLabel: "Sprache:"
  }
};

export default function Home() {
  const [language, setLanguage] = useState('en');

  useEffect(() => {
    const savedLang = localStorage.getItem('schedora-language');
    if (savedLang) setLanguage(savedLang);
  }, []);

  const t = translations[language];

  const languages = [
    { code: 'en', name: '🇺🇸 EN' },
    { code: 'ru', name: '🇷🇺 RU' },
    { code: 'es', name: '🇪🇸 ES' },
    { code: 'ja', name: '🇯🇵 JA' },
    { code: 'fr', name: '🇫🇷 FR' },
    { code: 'de', name: '🇩🇪 DE' },
  ];

  const changeLanguage = (lng) => {
    setLanguage(lng);
    localStorage.setItem('schedora-language', lng);
  };

  return (
    <div style={{ 
      minHeight: '100vh', 
      background: '#0b0d17',
      padding: '0 0 1.5rem 0',
      color: 'white'
    }}>
      <div style={{ 
        maxWidth: '430px', 
        margin: '0 auto',
        padding: '1rem 1rem 0'
      }}>
        <div style={{
          display: 'flex',
          justifyContent: 'flex-end',
          marginBottom: '0.85rem'
        }}>
          <div style={{
            width: '170px',
            background: '#121728',
            borderRadius: '20px',
            padding: '0.9rem',
            boxShadow: '0 14px 30px rgba(0,0,0,0.28)'
          }}>
            <select
              value={language}
              onChange={(e) => changeLanguage(e.target.value)}
              style={{
                width: '100%',
                background: '#1d2435',
                color: 'white',
                border: 'none',
                borderRadius: '16px',
                padding: '0.8rem 0.9rem',
                fontSize: '0.95rem',
                fontWeight: 700,
                outline: 'none'
              }}
            >
              {languages.map((lang) => (
                <option key={lang.code} value={lang.code}>
                  {lang.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div style={{
          color: '#7c3aed',
          fontSize: '2.7rem',
          fontWeight: 800,
          textAlign: 'center',
          letterSpacing: '-0.05em',
          marginBottom: '0.35rem',
          lineHeight: 1
        }}>
          Schedora
        </div>

        <div style={{
          textAlign: 'center',
          color: '#9ca3af',
          fontSize: '0.98rem',
          fontWeight: 600,
          marginBottom: '1.15rem'
        }}>
          Group plans that actually happen.
        </div>

        <div style={{
          background: '#121728',
          borderRadius: '24px',
          padding: '1.4rem 1.25rem',
          boxShadow: '0 16px 38px rgba(0,0,0,0.32)',
          marginBottom: '1.1rem'
        }}>
          <h2 style={{
            fontSize: '1.7rem',
            lineHeight: 1.08,
            fontWeight: 900,
            margin: 0,
            color: 'white',
            letterSpacing: '-0.04em'
          }}>
            {t.subtitle}
          </h2>

          <p style={{
            marginTop: '1rem',
            marginBottom: 0,
            fontSize: '0.98rem',
            lineHeight: 1.55,
            color: '#9ca3af',
            fontWeight: 500
          }}>
            {t.description}
          </p>
        </div>

        <Link to="/participant" style={{ textDecoration: 'none' }}>
          <button style={{
            width: '100%',
            background: '#5b4bff',
            color: 'white',
            border: 'none',
            borderRadius: '20px',
            padding: '1rem 1.1rem',
            fontSize: '1.02rem',
            fontWeight: 800,
            boxShadow: '0 12px 26px rgba(91, 75, 255, 0.33)',
            cursor: 'pointer',
            marginBottom: '0.8rem'
          }}>
            {t.participantBtn}
          </button>
        </Link>

        <Link to="/admin" style={{ textDecoration: 'none' }}>
          <button style={{
            width: '100%',
            background: '#1d2435',
            color: 'white',
            border: 'none',
            borderRadius: '20px',
            padding: '1rem 1.1rem',
            fontSize: '1.02rem',
            fontWeight: 800,
            boxShadow: '0 12px 26px rgba(0,0,0,0.22)',
            cursor: 'pointer',
            marginBottom: '1.4rem'
          }}>
            {t.adminBtn}
          </button>
        </Link>

        <div style={{
          fontSize: '1.9rem',
          fontWeight: 900,
          margin: '0 0 0.85rem',
          letterSpacing: '-0.04em',
          color: 'white'
        }}>
          {t.whyTitle}
        </div>

        <div style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '0.75rem'
        }}>
          {t.features.map((feature, index) => (
            <div key={index} style={{
              background: '#121728',
              borderRadius: '16px',
              padding: '0.95rem 1rem',
              boxShadow: '0 10px 24px rgba(0,0,0,0.2)',
              color: 'white',
              fontSize: '0.98rem',
              fontWeight: 700
            }}>
              {feature}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}