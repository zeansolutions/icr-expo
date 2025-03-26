import { getLocales } from 'expo-localization';
import { I18n } from 'i18n-js';

// Set the key-value pairs for the different languages you want to support.
const i18n = new I18n({
  en: { welcome: 'Hello' },
  ar: {
    welcome: 'تنطلق النسخة الثانية من ملتقى الفكر العربي للتعليم والتدريب Arab Expo 2025 بفندق ميراج بالإسكندرية، تحت عنوان: إعداد المعلمين والمدربين في ضوء مهارات القرن الحادي والعشرين. يهدف الملتقى إلى استعراض أحدث الاتجاهات والأساليب في تطوير المعلم لمواكبة متطلبات التعليم الحديثة. ويعد فرصة مميزة لخبراء التعليم والمؤسسات لاستكشاف حلول مبتكرة تعزز من كفاءة المعلم في عصر التحول الرقمي.',
    register: 'الاشتراك',
    moreText: 'للمزيد من الاخبار حول الملتقى',
    darkMode: 'الوضع الليلي',
    about: 'من نحن',
    contactUs: 'تواصل معنا'
   },
});

// Set the locale once at the beginning of your app.
// i18n.locale = getLocales()[0].languageCode;
i18n.locale = 'ar';

export default i18n;