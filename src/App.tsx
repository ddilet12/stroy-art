import { motion, AnimatePresence } from 'motion/react';
import { useState, useEffect } from 'react';
import { 
  Phone, 
  MapPin, 
  Instagram, 
  Menu, 
  X, 
  CheckCircle, 
  ShieldCheck, 
  Clock, 
  Award, 
  ArrowRight, 
  Calculator, 
  MessageSquare,
  ChevronRight,
  Star,
  FileText,
  UserCheck,
  Search,
  Hammer,
  Home,
  Palette,
  Ruler,
  Briefcase
} from 'lucide-react';
import { cn } from './lib/utils';

// --- DATA ---

const FEATURES = [
  { icon: CheckCircle, text: '500+ готовых объектов', sub: 'Опыт в деталях' },
  { icon: Award, text: '>10 лет опыта', sub: 'На рынке с 2014 года' },
  { icon: Calculator, text: 'Прозрачная смета', sub: 'Никаких скрытых платежей' },
  { icon: ShieldCheck, text: 'Работа по договору', sub: 'Юридическая защита' },
  { icon: Clock, text: 'Соблюдение сроков', sub: 'Штрафы за просрочку' },
  { icon: UserCheck, text: 'Контроль качества', sub: 'Технадзор на всех этапах' },
];

const SERVICES = [
  {
    title: 'Ремонт квартир под ключ',
    description: 'Полный комплекс работ от демонтажа до финальной уборки. Берем на себя закупку материалов и логистику.',
    image: 'https://images.unsplash.com/photo-1581094794329-c8112c4e5190?auto=format&fit=crop&q=80',
    tags: ['от 45 дней', 'Гарантия 3 года'],
  },
  {
    title: 'Дизайнерский ремонт',
    description: 'Реализация эксклюзивных интерьерных решений по вашему дизайн-проекту с авторским надзором.',
    image: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&q=80',
    tags: ['от 60 дней', 'Премиум материалы'],
  },
  {
    title: 'Строительство домов',
    description: 'Возведение современных энергоэффективных коттеджий из газоблока, кирпича или по каркасной технологии.',
    image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80',
    tags: ['от 4 месяцев', 'Под ключ'],
  },
  {
    title: 'Авторский надзор',
    description: 'Контроль соответствия выполняемых работ дизайн-проекту, подбор мебели и декора.',
    image: 'https://images.unsplash.com/photo-1503387762-592dee58c460?auto=format&fit=crop&q=80',
    tags: ['Входит в VIP', 'Личный менеджер'],
  }
];

const PORTFOLIO = [
  {
    title: 'ЖК "Маринист"',
    category: 'Квартира',
    image: 'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&q=80',
    desc: 'Современная классика в темных тонах с золотыми акцентами.'
  },
  {
    title: 'Коттедж в Садгороде',
    category: 'Дом',
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80',
    desc: 'Минималистичный дом с панорамным остеклением.'
  },
  {
    title: 'Офис в центре',
    category: 'Коммерция',
    image: 'https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&q=80',
    desc: 'Функциональный open-space для IT-компании.'
  },
  {
    title: 'Ремонт в ЖК "Алые Паруса"',
    category: 'Квартира',
    image: 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&q=80',
    desc: 'Светлый интерьер с элементами скандинавского стиля.'
  }
];

const PROCESS_STEPS = [
  { title: 'Заявка', desc: 'Первичный контакт и обсуждение ваших пожеланий.' },
  { title: 'Консультация', desc: 'Профессиональная консультация по материалам и технологиям.' },
  { title: 'Замеры', desc: 'Выезд инженера и точный обмер помещений.' },
  { title: 'Смета', desc: 'Детальный расчет стоимости работ и материалов.' },
  { title: 'Договор', desc: 'Юридическое оформление отношений с четкими сроками.' },
  { title: 'Работы', desc: 'Поэтапное выполнение строительно-монтажных работ.' },
  { title: 'Сдача', desc: 'Подписание актов и передача чистого объекта.' },
  { title: 'Гарантия', desc: 'Сервисное сопровождение в течение всего гарантийного срока.' },
];

const REVIEWS = [
  {
    name: 'Артем Волков',
    role: 'Ремонт квартиры',
    text: 'Результат превзошел ожидания. Смета не выросла ни на рубль, все работы выполнены в срок. Рекомендую!',
    rating: 5
  },
  {
    name: 'Елена Соколова',
    role: 'Дизайнерский ремонт',
    text: 'Очень внимательны к деталям. Авторский надзор спас проект от многих ошибок. Спасибо команде СТРОЙ АРТ.',
    rating: 5
  },
  {
    name: 'Дмитрий К.',
    role: 'Строительство дома',
    text: 'Построили загородный дом под ключ. Прозрачность на каждом этапе, фотоотчеты в WhatsApp каждый день.',
    rating: 5
  }
];

// --- COMPONENTS ---

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <div className="fixed top-0 left-0 w-full h-1 gold-gradient z-[100]" />
      <nav className={cn(
        "fixed top-0 left-0 w-full h-20 transition-all duration-500 z-50",
        isScrolled ? "bg-brand-navy/95 backdrop-blur-xl border-b border-white/10" : "bg-transparent"
      )}>
        <div className="container mx-auto px-6 h-full flex items-center justify-between">
          <div className="flex items-center group cursor-pointer">
            <div className="relative mr-4">
              <div className="w-8 h-8 border-2 border-brand-gold rotate-45 transition-transform group-hover:rotate-90 duration-500" />
              <div className="absolute bottom-1 left-1 w-6 h-3 bg-brand-gold transition-transform group-hover:translate-x-1" />
            </div>
            <div className="flex flex-col leading-none">
              <div className="flex items-baseline gap-1">
                <span className="text-2xl font-bold tracking-tighter">СТРОЙ</span>
                <span className="text-2xl font-light text-brand-gold tracking-widest uppercase">АРТ</span>
              </div>
              <span className="text-[10px] uppercase tracking-[0.3em] opacity-60 mt-1">Владивосток</span>
            </div>
          </div>

          <div className="hidden lg:flex items-center gap-10 text-[11px] font-bold uppercase tracking-[0.2em] opacity-80">
            {['Услуги', 'Портфолио', 'Процесс', 'Гарантии', 'Отзывы'].map((item) => (
              <a key={item} href={`#${item}`} className="hover:text-brand-gold transition-colors">{item}</a>
            ))}
          </div>

          <div className="hidden md:flex items-center gap-8">
            <div className="text-right">
              <a href="tel:+79242221717" className="text-lg font-bold block leading-none">+7 924 222 1717</a>
              <span className="text-[10px] text-brand-gold uppercase tracking-widest font-bold">Заказать звонок</span>
            </div>
          </div>

          <button className="lg:hidden text-white" onClick={() => setMobileMenuOpen(true)}>
            <Menu size={28} />
          </button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div 
              initial={{ opacity: 0, scale: 1.1 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.1 }}
              className="fixed inset-0 bg-brand-navy/98 backdrop-blur-2xl z-[60] flex flex-col p-8"
            >
              <div className="flex justify-end">
                <button onClick={() => setMobileMenuOpen(false)} className="w-12 h-12 flex items-center justify-center rounded-full glass"><X size={24} /></button>
              </div>
              <div className="flex flex-col gap-8 mt-12 text-3xl font-display font-light">
                {['Услуги', 'Портфолио', 'Процесс', 'Гарантии', 'Отзывы'].map((item) => (
                  <a key={item} href={`#${item}`} onClick={() => setMobileMenuOpen(false)} className="hover:text-brand-gold transition-colors">{item}</a>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </>
  );
};

const Hero = () => {
  return (
    <section className="relative min-h-screen w-full flex flex-col lg:flex-row overflow-hidden pt-20">
      {/* Visual background elements */}
      <div className="absolute top-[-20%] right-[-10%] w-[600px] h-[600px] gold-gradient opacity-[0.03] rounded-full blur-[120px]" />
      
      {/* Content Side */}
      <div className="w-full lg:w-1/2 flex items-center px-6 md:px-12 lg:px-20 py-20 z-10">
        <motion.div 
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
          className="max-w-xl"
        >
          <div className="mb-8 inline-flex items-center px-4 py-1.5 glass rounded-full border border-brand-gold/30">
            <span className="w-2 h-2 rounded-full gold-gradient mr-3 animate-pulse"></span>
            <span className="text-[11px] uppercase tracking-widest font-bold">Premium Construction Service</span>
          </div>
          
          <h1 className="text-6xl md:text-7xl lg:text-8xl font-display font-light leading-[1.05] tracking-tight mb-10">
            Ремонт квартир <br />и строительство <br />
            <span className="gold-text italic font-serif">под ключ</span>
          </h1>
          
          <p className="text-lg lg:text-xl text-white/70 mb-12 font-light leading-relaxed max-w-md">
            Более 500 реализованных объектов во Владивостоке. 10 лет опыта. Официальный договор и гарантия качества.
          </p>

          <div className="flex flex-col sm:flex-row items-center gap-5">
            <button className="gold-gradient text-brand-navy px-12 py-5 font-black text-sm uppercase tracking-widest transition-all hover:scale-105 shadow-2xl shadow-brand-gold/20">
              Получить смету
            </button>
            <button className="border border-white/20 glass px-12 py-5 font-bold text-sm uppercase tracking-widest hover:bg-white/5 transition-all">
              Консультация
            </button>
          </div>
        </motion.div>
      </div>

      {/* Visual Side */}
      <div className="w-full lg:w-1/2 relative bg-brand-navy-light hidden lg:block overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-r from-brand-navy via-transparent to-transparent z-10" />
          <div className="grid grid-cols-2 grid-rows-2 h-full gap-2 p-12 opacity-20">
            <div className="bg-white/5 border border-white/10 overflow-hidden">
              <img src="https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&q=80" className="w-full h-full object-cover" />
            </div>
            <div className="bg-white/5 border border-white/10 overflow-hidden">
              <img src="https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&q=80" className="w-full h-full object-cover" />
            </div>
            <div className="bg-white/5 border border-white/10 overflow-hidden">
              <img src="https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80" className="w-full h-full object-cover" />
            </div>
            <div className="bg-white/5 border border-white/10 overflow-hidden">
              <img src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80" className="w-full h-full object-cover" />
            </div>
          </div>
        </div>

        <div className="absolute bottom-16 left-0 right-0 px-20 z-20 grid grid-cols-2 gap-8">
          <div className="glass p-8 rounded-sm">
            <h3 className="text-4xl font-bold text-brand-gold mb-1">500+</h3>
            <p className="text-[10px] uppercase tracking-[0.3em] opacity-60 font-bold">Готовых объектов</p>
          </div>
          <div className="glass p-8 rounded-sm">
            <h3 className="text-4xl font-bold text-brand-gold mb-1">10 лет</h3>
            <p className="text-[10px] uppercase tracking-[0.2em] opacity-60 font-bold">Безупречный опыт</p>
          </div>
        </div>

        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 border border-brand-gold/10 rounded-full animate-pulse" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[30rem] h-[30rem] border border-brand-gold/5 rounded-full" />
      </div>
    </section>
  );
};

const Features = () => {
  return (
    <section className="py-24 bg-brand-navy relative overflow-hidden">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {FEATURES.map((feature, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.1 }}
              viewport={{ once: true }}
              className="glass-card p-8 rounded-2xl flex items-start gap-5 hover:border-brand-gold/30 transition-all group"
            >
              <div className="w-14 h-14 rounded-full bg-brand-gold/10 flex items-center justify-center group-hover:bg-brand-gold transition-colors">
                <feature.icon className="text-brand-gold group-hover:text-brand-navy transition-colors" size={28} />
              </div>
              <div>
                <h3 className="text-xl font-bold mb-1">{feature.text}</h3>
                <p className="text-white/50 text-sm">{feature.sub}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Services = () => {
  return (
    <section id="Услуги" className="py-24 bg-[#080d1a]">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="max-w-2xl">
            <span className="text-brand-gold font-semibold uppercase tracking-widest text-sm block mb-4">Наши возможности</span>
            <h2 className="text-4xl md:text-5xl font-display font-bold">Полный спектр услуг <br /> по строительству и отделке</h2>
          </div>
          <a href="#contact" className="text-brand-gold flex items-center gap-2 font-semibold hover:gap-3 transition-all underline underline-offset-8 decoration-brand-gold/30">
            Смотреть все услуги <ChevronRight size={20} />
          </a>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {SERVICES.map((service, i) => (
            <motion.div 
              key={i}
              whileHover={{ y: -10 }}
              className="group relative h-[400px] rounded-3xl overflow-hidden cursor-pointer"
            >
              <img src={service.image} alt={service.title} className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
              <div className="absolute inset-0 bg-gradient-to-t from-brand-navy via-brand-navy/20 to-transparent" />
              
              <div className="absolute inset-0 p-8 flex flex-col justify-end">
                <div className="flex gap-2 mb-4">
                  {service.tags.map(tag => (
                    <span key={tag} className="text-[10px] uppercase font-bold tracking-wider px-3 py-1 bg-brand-gold text-brand-navy rounded-full">{tag}</span>
                  ))}
                </div>
                <h3 className="text-3xl font-display font-bold mb-3">{service.title}</h3>
                <p className="text-white/70 text-sm mb-6 max-w-sm transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                  {service.description}
                </p>
                <div className="flex items-center gap-2 text-brand-gold font-bold">
                  Узнать подробнее <ArrowRight size={18} />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Portfolio = () => {
  return (
    <section id="Портфолио" className="py-24 bg-brand-navy">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-brand-gold font-semibold uppercase tracking-widest text-sm block mb-4">Наши работы</span>
          <h2 className="text-4xl md:text-5xl font-display font-bold mb-6">Проекты, которыми мы гордимся</h2>
          <p className="text-white/50 text-lg">Каждый проект — это история создания уникального комфорта. Мы работаем с любовью к качеству и вниманием к каждой детали.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {PORTFOLIO.map((item, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              viewport={{ once: true }}
              className="group relative aspect-[4/5] rounded-2xl overflow-hidden cursor-zoom-in"
            >
              <img src={item.image} alt={item.title} className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
              <div className="absolute inset-0 bg-brand-navy/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                <span className="text-brand-gold font-bold text-xs uppercase tracking-widest mb-2">{item.category}</span>
                <h4 className="text-xl font-bold mb-2">{item.title}</h4>
                <p className="text-white/70 text-xs">{item.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
        
        <div className="mt-16 text-center">
          <button className="px-12 py-5 rounded-full border border-brand-gold text-brand-gold font-bold hover:bg-brand-gold hover:text-brand-navy transition-all">
            Смотреть все проекты
          </button>
        </div>
      </div>
    </section>
  );
};

const Process = () => {
  return (
    <section id="Процесс" className="py-24 bg-[#080d1a] relative">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col lg:flex-row gap-16 items-start">
          <div className="lg:w-1/3 sticky top-32">
            <span className="text-brand-gold font-semibold uppercase tracking-widest text-sm block mb-4">Прозрачность процесса</span>
            <h2 className="text-4xl md:text-5xl font-display font-bold mb-8">Как мы работаем <br /> над вашим объектом</h2>
            <p className="text-white/50 text-lg mb-8">
              Мы выстроили четкую систему, которая позволяет контролировать каждый этап и гарантировать результат высокого уровня.
            </p>
            <div className="glass-card p-8 rounded-2xl border-l-4 border-l-brand-gold">
              <h4 className="font-bold text-brand-gold mb-2 flex items-center gap-2">
                <ShieldCheck /> Безопасность
              </h4>
              <p className="text-sm text-white/70 leading-relaxed">
                Все этапы регламентированы договором. Фиксированная стоимость. Страхование ответственности.
              </p>
            </div>
          </div>

          <div className="lg:w-2/3 grid grid-cols-1 sm:grid-cols-2 gap-8">
            {PROCESS_STEPS.map((step, i) => (
              <div key={i} className="flex gap-6 group">
                <div className="flex-shrink-0 w-12 h-12 rounded-full border border-white/10 flex items-center justify-center font-display font-bold text-brand-gold group-hover:bg-brand-gold group-hover:text-brand-navy transition-colors">
                  0{i + 1}
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2 group-hover:text-brand-gold transition-colors">{step.title}</h3>
                  <p className="text-white/40 text-sm leading-relaxed">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

const TrustBlock = () => {
  return (
    <section id="Гарантии" className="py-24 bg-brand-navy relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 right-0 w-1/2 h-full opacity-5 pointer-events-none">
        <Ruler size={600} className="text-brand-gold rotate-12" />
      </div>

      <div className="container mx-auto px-4 md:px-6">
        <div className="glass-card p-12 md:p-20 rounded-[3rem] border-brand-gold/20 relative overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <div className="flex items-center gap-3 mb-8">
                <FileText className="text-brand-gold" size={32} />
                <span className="text-brand-gold font-display text-2xl font-bold uppercase tracking-widest">Юридическая чистота</span>
              </div>
              <h2 className="text-4xl md:text-5xl font-display font-bold mb-8">Гарантии и <br />официальный договор</h2>
              <div className="space-y-6">
                {[
                  'Официальный договор с печатью',
                  'Фиксированные этапы оплаты по факту',
                  'Прозрачная и неизменная смета',
                  'Гарантия на все работы до 5 лет',
                  'Фото- и видеофиксация всех этапов в приложении',
                  'Соблюдение сроков с материальной ответственностью'
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-4">
                    <div className="w-6 h-6 rounded-full bg-brand-gold/10 flex items-center justify-center">
                      <CheckCircle size={16} className="text-brand-gold" />
                    </div>
                    <span className="text-lg text-white/80">{item}</span>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="relative">
              <div className="relative z-10 bg-[#0a1428] p-10 rounded-3xl border border-white/5 shadow-2xl skew-y-2 hover:skew-y-0 transition-transform duration-500">
                <div className="flex justify-between items-start mb-12">
                  <div className="font-display font-bold text-2xl">СТРОЙ АРТ</div>
                  <ShieldCheck className="text-brand-gold" size={40} />
                </div>
                <div className="space-y-6 py-6 border-y border-white/5">
                  <div className="flex justify-between items-center">
                    <span className="text-white/40 uppercase tracking-widest text-[10px]">Код надежности</span>
                    <span className="font-mono text-brand-gold">98.42.0.1</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-white/40 uppercase tracking-widest text-[10px]">Лицензия СРО</span>
                    <span className="text-xs">№128-442-2024</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-white/40 uppercase tracking-widest text-[10px]">Статус объекта</span>
                    <span className="flex items-center gap-2 text-xs">
                      <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                      Безопасно
                    </span>
                  </div>
                </div>
                <div className="mt-12 text-center">
                  <button className="w-full gold-gradient py-4 rounded-xl text-brand-navy font-bold text-sm tracking-widest uppercase">
                    Запросить образец договора
                  </button>
                </div>
              </div>
              {/* Background glow */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-brand-gold/10 blur-[100px] rounded-full" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const Testimonials = () => {
  return (
    <section id="Отзывы" className="py-24 bg-[#080d1a]">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-display font-bold mb-6">Мнения наших клиентов</h2>
          <div className="flex justify-center gap-1">
            {[1,2,3,4,5].map(i => <Star key={i} size={20} fill="#c5a059" color="#c5a059" />)}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {REVIEWS.map((review, i) => (
            <div key={i} className="glass-card p-10 rounded-3xl relative">
              <div className="w-12 h-12 bg-white/5 rounded-full flex items-center justify-center mb-6">
                <Star className="text-brand-gold" size={20} />
              </div>
              <p className="text-white/60 italic mb-8 leading-relaxed">"{review.text}"</p>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-brand-gold/10 flex items-center justify-center font-bold text-brand-gold">
                  {review.name[0]}
                </div>
                <div>
                  <h4 className="font-bold">{review.name}</h4>
                  <p className="text-xs text-brand-gold uppercase tracking-widest font-semibold">{review.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const ContactForm = () => {
  return (
    <section id="contact" className="py-24 bg-brand-navy">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          <div>
            <span className="text-brand-gold font-semibold uppercase tracking-widest text-sm block mb-4">Есть проект?</span>
            <h2 className="text-4xl md:text-5xl font-display font-bold mb-8">Получите расчет стоимости вашего ремонта</h2>
            <p className="text-white/50 text-lg mb-12">
              Оставьте заявку, и наш инженер свяжется с вами в течение 30 минут для согласования времени бесплатного замера.
            </p>
            
            <div className="space-y-8">
              <div className="flex items-center gap-6">
                <div className="w-16 h-16 rounded-2xl bg-white/5 flex items-center justify-center text-brand-gold">
                  <Phone size={30} />
                </div>
                <div>
                  <p className="text-white/40 text-xs uppercase tracking-widest mb-1">Телефон для связи</p>
                  <a href="tel:+79242221717" className="text-2xl font-bold hover:text-brand-gold transition-colors">+7 924 222 1717</a>
                </div>
              </div>
              <div className="flex items-center gap-6">
                <div className="w-16 h-16 rounded-2xl bg-white/5 flex items-center justify-center text-brand-gold">
                  <MapPin size={30} />
                </div>
                <div>
                  <p className="text-white/40 text-xs uppercase tracking-widest mb-1">Наш офис</p>
                  <p className="text-2xl font-bold">г. Владивосток, ул. Светланская, 10</p>
                </div>
              </div>
            </div>
          </div>

          <div className="glass-card p-10 md:p-12 rounded-[2rem] border-brand-gold/10">
            <form className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs uppercase tracking-widest text-white/50 font-bold">Ваше имя</label>
                  <input type="text" placeholder="Иван Иванов" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-4 focus:border-brand-gold outline-none transition-all" />
                </div>
                <div className="space-y-2">
                  <label className="text-xs uppercase tracking-widest text-white/50 font-bold">Телефон</label>
                  <input type="tel" placeholder="+7 999 000 00 00" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-4 focus:border-brand-gold outline-none transition-all" />
                </div>
              </div>
              
              <div className="space-y-2">
                <label className="text-xs uppercase tracking-widest text-white/50 font-bold">Тип объекта</label>
                <select className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-4 focus:border-brand-gold outline-none transition-all appearance-none text-white/70">
                  <option className="bg-brand-navy">Ремонт квартиры</option>
                  <option className="bg-brand-navy">Строительство дома</option>
                  <option className="bg-brand-navy">Дизайн-проект</option>
                  <option className="bg-brand-navy">Коммерческое помещение</option>
                </select>
              </div>

              <div className="space-y-2">
                <label className="text-xs uppercase tracking-widest text-white/50 font-bold">Комментарий (необязательно)</label>
                <textarea rows={4} placeholder="Расскажите немного о вашем объекте..." className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-4 focus:border-brand-gold outline-none transition-all resize-none"></textarea>
              </div>

              <button className="w-full gold-gradient py-5 rounded-xl text-brand-navy font-black text-lg shadow-xl shadow-brand-gold/10 hover:translate-y-[-2px] transition-all">
                Получить смету
              </button>
              
              <p className="text-[10px] text-white/30 text-center uppercase tracking-widest leading-relaxed">
                Нажимая кнопку, вы соглашаетесь с политикой конфиденциальности и обработки персональных данных.
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

const Footer = () => {
  return (
    <footer className="bg-brand-navy pt-24 pb-12 border-t border-white/10 z-20">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-20">
          <div>
            <h4 className="text-[11px] text-brand-gold uppercase tracking-[0.3em] font-black mb-10">Услуги</h4>
            <ul className="text-sm space-y-4 opacity-70 font-light">
              <li className="hover:text-brand-gold transition-colors cursor-pointer">Ремонт квартир под ключ</li>
              <li className="hover:text-brand-gold transition-colors cursor-pointer">Дизайнерский ремонт</li>
              <li className="hover:text-brand-gold transition-colors cursor-pointer">Строительство домов</li>
              <li className="hover:text-brand-gold transition-colors cursor-pointer">Авторский надзор</li>
            </ul>
          </div>

          <div>
            <h4 className="text-[11px] text-brand-gold uppercase tracking-[0.3em] font-black mb-10">Гарантии</h4>
            <ul className="text-sm space-y-4 opacity-70 font-light">
              <li className="hover:text-brand-gold transition-colors cursor-pointer">Прозрачная смета</li>
              <li className="hover:text-brand-gold transition-colors cursor-pointer">Работа по договору</li>
              <li className="hover:text-brand-gold transition-colors cursor-pointer">Соблюдение сроков</li>
              <li className="hover:text-brand-gold transition-colors cursor-pointer">Контроль качества</li>
            </ul>
          </div>

          <div className="lg:col-span-2 glass p-10 flex flex-col sm:flex-row items-center justify-between border border-brand-gold/10 rounded-xl gap-8">
            <div className="flex flex-col gap-2">
              <span className="text-xs opacity-50 uppercase tracking-widest font-bold">Главный офис</span>
              <span className="text-lg font-light tracking-wide italic font-serif">г. Владивосток, <br /> ул. Светланская, 42</span>
            </div>
            <div className="flex gap-4">
              <div className="w-12 h-12 rounded-full glass border border-white/20 flex items-center justify-center hover:bg-white/10 transition-all cursor-pointer">
                <Instagram size={20} />
              </div>
              <div className="w-12 h-12 rounded-full glass border border-white/20 flex items-center justify-center hover:bg-white/10 transition-all cursor-pointer">
                <MessageSquare size={20} />
              </div>
              <div className="w-12 h-12 rounded-full gold-gradient flex items-center justify-center shadow-lg shadow-brand-gold/30 hover:scale-110 transition-all cursor-pointer">
                <Phone size={20} className="text-brand-navy" strokeWidth={3} />
              </div>
            </div>
          </div>
        </div>

        <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6 opacity-40">
          <p className="text-[10px] uppercase tracking-[0.3em]">© 2024 STROY ART. REBUILDING VLADIVOSTOK WITH EXCELLENCE.</p>
          <div className="flex gap-8 text-[11px] uppercase tracking-widest font-bold">
            <span className="flex items-center gap-2 italic">Premium Quality Builders</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

const ScrollReveal = ({ children, className }: { children: React.ReactNode, className?: string }) => (
  <motion.div
    initial={{ opacity: 0, y: 40 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-100px" }}
    transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
    className={className}
  >
    {children}
  </motion.div>
);

export default function App() {
  return (
    <div className="min-h-screen bg-brand-navy selection:bg-brand-gold selection:text-brand-navy">
      {/* Background glow effects */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute top-[-10%] right-[-10%] w-[40%] h-[40%] bg-brand-gold/5 blur-[120px] rounded-full" />
        <div className="absolute bottom-[10%] left-[-5%] w-[30%] h-[30%] bg-brand-gold/5 blur-[100px] rounded-full" />
      </div>

      <div className="relative z-10">
        <Navbar />
        <Hero />
        
        <ScrollReveal>
          <Features />
        </ScrollReveal>

        <section id="Услуги">
          <ScrollReveal>
            <Services />
          </ScrollReveal>
        </section>

        <section id="Портфолио">
          <ScrollReveal>
            <Portfolio />
          </ScrollReveal>
        </section>

        <section id="Процесс">
          <ScrollReveal>
            <Process />
          </ScrollReveal>
        </section>

        <section id="Гарантии">
          <ScrollReveal>
            <TrustBlock />
          </ScrollReveal>
        </section>

        <section id="Отзывы">
          <ScrollReveal>
            <Testimonials />
          </ScrollReveal>
        </section>

        <ScrollReveal>
          <ContactForm />
        </ScrollReveal>
        
        <Footer />
      </div>
    </div>
  );
}

