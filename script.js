const mailtoBase = 'info@atservicesbv.nl'
const languageStorageKey = 'atservice-language'
let currentLanguage = 'nl'
let activeCategoryKey = null
let renderCategoryRef = null

function openMail(subject) {
  window.location.href = `mailto:${mailtoBase}?subject=${encodeURIComponent(subject)}`
}

const categoryIcons = {
  bouw: `
    <svg viewBox="0 0 24 24" focusable="false" aria-hidden="true">
      <path
        d="M13 3L20 10L17.75 12.25L15.75 10.25L11 15V20H8V17L13.25 11.75L11.25 9.75L13 8L10 5L13 3Z"
        fill="none"
        stroke="currentColor"
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="1.8"
      />
    </svg>
  `,
  ict: `
    <svg viewBox="0 0 24 24" focusable="false" aria-hidden="true">
      <rect
        x="4"
        y="5.5"
        width="16"
        height="10"
        rx="2"
        fill="none"
        stroke="currentColor"
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="1.8"
      />
      <path
        d="M9 18.5H15M12 15.5V18.5"
        fill="none"
        stroke="currentColor"
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="1.8"
      />
    </svg>
  `,
  infra: `
    <svg viewBox="0 0 24 24" focusable="false" aria-hidden="true">
      <path
        d="M3 17H21M6 17V13M12 17V9M18 17V11M4 21H20"
        fill="none"
        stroke="currentColor"
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="1.8"
      />
    </svg>
  `,
  schoonmaak: `
    <svg viewBox="0 0 24 24" focusable="false" aria-hidden="true">
      <path
        d="M14.5 4L10 8.5"
        fill="none"
        stroke="currentColor"
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="1.8"
      />
      <path
        d="M10 8.5L15 18"
        fill="none"
        stroke="currentColor"
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="1.8"
      />
      <path
        d="M6.5 18H17.5M8 18L9.5 21M11 18L12.5 21M14 18L15.5 21"
        fill="none"
        stroke="currentColor"
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="1.8"
      />
    </svg>
  `,
  techniek: `
    <svg viewBox="0 0 24 24" focusable="false" aria-hidden="true">
      <path
        d="M14.5 6.5A4.5 4.5 0 0 0 17 13L9 21L3 15L11 7A4.5 4.5 0 0 0 17.5 2.5L14 6L14.5 6.5Z"
        fill="none"
        stroke="currentColor"
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="1.8"
      />
    </svg>
  `,
}

const localizedJobCategories = {
  nl: {
    bouw: {
      title: 'Bouw',
      intro: 'Een greep uit functies binnen bouw waar we regelmatig mensen voor zoeken.',
      jobs: [
        { code: 'UT', title: 'Timmerman', description: 'Je werkt aan ruwbouw, afbouw en renovaties op verschillende projecten.' },
        { code: 'RT', title: 'Werkvoorbereider Bouw', description: 'Je bereidt projecten voor en stemt planning, materiaal en uitvoering op elkaar af.' },
        { code: 'EH', title: 'Uitvoerder Renovatie', description: 'Je stuurt renovatieprojecten aan en bewaakt de voortgang op locatie.' },
      ],
    },
    ict: {
      title: 'ICT',
      intro: 'Voor development, support en beheerrollen bij bedrijven die willen doorgroeien.',
      jobs: [
        { code: 'FS', title: 'Full Stack Developer', description: 'Je bouwt en ontwikkelt webapplicaties aan de front-end en back-end door.' },
        { code: 'FE', title: 'Front-end Developer', description: 'Je maakt gebruiksvriendelijke interfaces en vertaalt designs naar werkende schermen.' },
        { code: 'BE', title: 'Back-end Developer', description: 'Je werkt aan API’s, databases en de technische logica achter applicaties.' },
      ],
    },
    infra: {
      title: 'Infra',
      intro: 'Functies voor buitenprojecten, civiele techniek en ondergrondse aanleg.',
      jobs: [
        { code: 'GW', title: 'Grondwerker', description: 'Je ondersteunt bij graafwerk, straatwerk en voorbereidend werk op buitenprojecten.' },
        { code: 'MK', title: 'Monteur Kabels en Leidingen', description: 'Je legt kabels en leidingen aan en verzorgt montage en onderhoud in het veld.' },
        { code: 'CV', title: 'Civiel Uitvoerder', description: 'Je coördineert civiele projecten en houdt planning, kwaliteit en uitvoering in de gaten.' },
      ],
    },
    schoonmaak: {
      title: 'Schoonmaak',
      intro: 'Praktische functies voor mensen die van net, duidelijk en betrouwbaar werk houden.',
      jobs: [
        { code: 'KS', title: 'Schoonmaker Kantoorpanden', description: 'Je zorgt dat werkplekken, sanitair en algemene ruimtes schoon en netjes blijven.' },
        { code: 'IP', title: 'Industrieel Reiniger', description: 'Je reinigt machines, vloeren en werkruimtes in industriële omgevingen.' },
        { code: 'HO', title: 'Housekeeping Medewerker', description: 'Je verzorgt kamers en algemene ruimtes en draagt bij aan een nette omgeving.' },
      ],
    },
    techniek: {
      title: 'Techniek',
      intro: 'Technische banen in service, montage, onderhoud en productieomgevingen.',
      jobs: [
        { code: 'EM', title: 'Elektromonteur', description: 'Je installeert, bekabelt en onderhoudt elektrotechnische systemen op locatie.' },
        { code: 'SM', title: 'Servicemonteur', description: 'Je lost storingen op en voert onderhoud uit aan technische installaties.' },
        { code: 'PT', title: 'Pijpfitter', description: 'Je monteert en onderhoudt leidingwerk binnen industriële installaties en projecten.' },
      ],
    },
  },
  en: {
    bouw: {
      title: 'Construction',
      intro: 'A selection of construction roles we regularly recruit for.',
      jobs: [
        { code: 'UT', title: 'Carpenter', description: 'You work on structural work, finishing and renovations across different projects.' },
        { code: 'RT', title: 'Construction Planner', description: 'You prepare projects and align planning, materials and execution.' },
        { code: 'EH', title: 'Renovation Site Supervisor', description: 'You manage renovation projects and monitor day-to-day progress on site.' },
      ],
    },
    ict: {
      title: 'IT',
      intro: 'For development, support and IT management roles at growing companies.',
      jobs: [
        { code: 'FS', title: 'Full Stack Developer', description: 'You build and further develop web applications on both the front end and back end.' },
        { code: 'FE', title: 'Front-end Developer', description: 'You create user-friendly interfaces and turn designs into working screens.' },
        { code: 'BE', title: 'Back-end Developer', description: 'You work on APIs, databases and the technical logic behind applications.' },
      ],
    },
    infra: {
      title: 'Infrastructure',
      intro: 'Roles for outdoor projects, civil engineering and underground installation work.',
      jobs: [
        { code: 'GW', title: 'Groundworker', description: 'You support excavation, paving and preparatory work on outdoor projects.' },
        { code: 'MK', title: 'Cable and Pipeline Technician', description: 'You install cables and pipelines and handle field maintenance.' },
        { code: 'CV', title: 'Civil Works Supervisor', description: 'You coordinate civil projects and keep track of planning, quality and execution.' },
      ],
    },
    schoonmaak: {
      title: 'Cleaning',
      intro: 'Practical roles for people who value clean, clear and reliable work.',
      jobs: [
        { code: 'KS', title: 'Office Cleaner', description: 'You keep workspaces, sanitary areas and shared spaces clean and tidy.' },
        { code: 'IP', title: 'Industrial Cleaner', description: 'You clean machines, floors and work areas in industrial environments.' },
        { code: 'HO', title: 'Housekeeping Employee', description: 'You take care of rooms and shared areas and help maintain a neat environment.' },
      ],
    },
    techniek: {
      title: 'Engineering',
      intro: 'Technical roles in service, installation, maintenance and production environments.',
      jobs: [
        { code: 'EM', title: 'Electrical Technician', description: 'You install, wire and maintain electrical systems on site.' },
        { code: 'SM', title: 'Service Technician', description: 'You solve malfunctions and carry out maintenance on technical installations.' },
        { code: 'PT', title: 'Pipefitter', description: 'You assemble and maintain piping within industrial installations and projects.' },
      ],
    },
  },
}

const translations = {
  nl: {
    htmlLang: 'nl',
    pageTitle: 'Atservice | Vind werk dat bij je past',
    languageLabel: 'Taalwissel',
    brandTagline: 'Uitzendbureau met energie',
    nav: {
      vacatures: 'Vacatures',
      werkgevers: 'Werkgevers',
      about: 'Over ons',
      contact: 'Contact',
      viewJobs: 'Bekijk vacatures',
    },
    hero: {
      title: 'Wij brengen mensen en werk met energie samen.',
      body:
        'Atservice is een uitzendbureau en aannemersbedrijf, actief in logistiek, techniek, piping, bouw en support. Naast het verbinden van werkgevers en professionals voeren wij ook aannemerswerk uit en realiseren wij bouwprojecten, waaronder woningen.',
      note: 'Nieuw, betrokken en gericht op duurzame matches voor werkgevers en kandidaten.',
      primary: 'Bekijk vacatures',
      secondary: 'Neem contact op',
    },
    usp: {
      title: 'Geen groot verhaal, maar een bureau dat snel schakelt en dichtbij blijft',
      body:
        'We bouwen Atservice vanaf de basis op. Dat betekent: persoonlijk contact, directe communicatie en volledige aandacht voor elke vacature of kandidaat.',
      items: [
        {
          title: 'Snel schakelen',
          body: 'Binnen korte tijd zicht op vacatures, kandidaten en concrete vervolgstappen.',
        },
        {
          title: 'Menselijk contact',
          body: 'Persoonlijke begeleiding die zorgt voor vertrouwen en een betere match.',
        },
        {
          title: 'Werk dat past',
          body: 'We koppelen op ambitie, tempo en cultuur zodat plaatsingen langer blijven werken.',
        },
      ],
    },
    vacancies: {
      title: 'Kies een vakgebied en ontdek banen die daarbij passen',
      body:
        'Selecteer een richting en bekijk voorbeelden van functies waar we regelmatig mensen voor zoeken. Zo krijg je sneller een beeld van het werk dat bij jou past.',
      ariaLabel: 'Vacature categorieen',
      cards: {
        bouw: {
          title: 'Bouw',
          body: 'Werk op projecten in renovatie, montage en uitvoering.',
        },
        ict: {
          title: 'ICT',
          body: 'Van development tot support en beheer bij moderne teams.',
        },
        infra: {
          title: 'Infra',
          body: 'Banen in ondergrondse aanleg, civiele techniek en buitenwerk.',
        },
        schoonmaak: {
          title: 'Schoonmaak',
          body: 'Voor betrouwbare mensen in facilitair werk en onderhoud.',
        },
        techniek: {
          title: 'Techniek',
          body: 'Technische functies in installatie, service en productie.',
        },
      },
      apply: 'Solliciteer',
      mailPrefix: 'Sollicitatie',
    },
    works: {
      visualLabel: 'Werken via ons',
      visualTitle: 'Sneller in gesprek, sneller aan de slag',
      title: 'We maken solliciteren sneller, menselijker en veel duidelijker',
      body:
        'Geen ruis, geen eindeloze stappen. Atservice helpt je aan vacatures die echt bij je passen en begeleidt je van eerste contact tot startdatum.',
      primary: 'Bekijk vacatures',
      secondary: 'Neem contact op',
    },
    employers: {
      title: 'Een nieuw bureau dat juist sterk is in aandacht, snelheid en korte lijnen',
      body:
        'Als nieuw bureau kiezen we bewust voor een eerlijke en directe aanpak. Wat we wel brengen is betrokken contact, snelle opvolging en een duidelijke aanpak in logistiek, techniek, schoonmaak, support en bouw. Daarnaast zijn wij ook actief als aannemer en werken wij aan bouwprojecten en woningen.',
      primary: 'Plaats vacature',
      secondary: 'Plan kennismaking',
      visualLabel: 'Starter met focus',
      visualTitle: 'Direct contact, korte lijnen en volle aandacht voor elke aanvraag',
      chipPrimary: 'Nieuw bureau, snelle opvolging',
      chipSecondary: 'Focus op logistiek, techniek en support',
      vacancySubject: 'Plaats vacature via Atservice',
    },
    about: {
      title: 'Uitzenden en aannemen vanuit een heldere aanpak',
      body:
        'Atservice is gestart vanuit de overtuiging dat uitzenden en bouwen persoonlijker, duidelijker en sneller kunnen. Daarom combineren wij een directe uitzendaanpak met werkzaamheden als aannemer, waaronder bouwprojecten en woningen.',
      largeEyebrow: 'Waarom dit werkt',
      largeTitle: 'We zijn klein gestart, dus aandacht is geen belofte maar onze werkwijze',
      largeBody:
        'Werkgevers krijgen bij ons geen standaard traject, maar snel contact, duidelijke terugkoppeling en een bureau dat bereikbaar blijft. Kandidaten krijgen begeleiding zonder ruis, zodat de volgende stap helder voelt.',
      largePrimary: 'Plan een kennismaking',
      largeSecondary: 'Stuur je cv',
      cvSubject: 'CV sturen via Atservice',
      cards: [
        {
          number: '01',
          title: 'Direct contact',
          body: 'Geen lange routes. Je spreekt snel met iemand die echt met je aanvraag bezig is.',
        },
        {
          number: '02',
          title: 'Focus op een paar richtingen',
          body: 'We richten ons op logistiek, techniek, schoonmaak, bouw en supportfuncties.',
        },
        {
          number: '03',
          title: 'Eerlijk en betrokken',
          body: 'We beloven geen groot netwerk, maar wel inzet, snelheid en duidelijke communicatie.',
        },
      ],
    },
    audience: {
      title: 'Duidelijk voor werkgevers en kandidaten',
      body:
        'We houden de eerste stap laagdrempelig. Of je nu iemand zoekt of zelf aan de slag wilt: je weet meteen wat je van ons kunt verwachten.',
      employer: {
        eyebrow: 'Voor werkgevers',
        title: 'Zo kunnen we je nu al helpen',
        items: [
          'Vrijblijvend sparren over vacatures en profiel.',
          'Snel contact over beschikbaarheid en vervolgstappen.',
          'Focus op praktische functies waar tempo en betrouwbaarheid tellen.',
        ],
        cta: 'Vraag een kennismaking aan',
        subject: 'Vrijblijvende kennismaking Atservice',
      },
      candidate: {
        eyebrow: 'Voor kandidaten',
        title: 'Zo kom je bij ons binnen',
        items: [
          'Bekijk functies per vakgebied en reageer snel.',
          'Stuur je cv of bel direct voor een eerste gesprek.',
          'We denken mee over werk dat past bij jouw tempo en ervaring.',
        ],
        cta: 'Schrijf je in',
        subject: 'Inschrijven bij Atservice',
      },
    },
    contact: {
      title: 'Neem Contact Op',
      body: 'Direct contact voor al uw vragen',
      phoneTitle: 'Telefoon',
      emailTitle: 'E-mail',
      hoursTitle: 'Openingstijden',
      hoursValue: 'Maandag - Vrijdag: 08:00 - 17:30',
      formTitle: 'Stuur ons een bericht',
      name: 'Uw Naam',
      email: 'Uw E-mail',
      phone: 'Uw Telefoonnummer',
      category: 'Selecteer Vakgebied',
      message: 'Uw Bericht',
      submit: 'Verstuur Bericht',
      formSubject: 'Nieuw bericht via Atservice website',
      fromName: 'Atservice website',
    },
    footer: {
      body: 'Een nieuw uitzendbureau met een persoonlijke aanpak, korte lijnen en focus op duurzame matches.',
      quickLinks: 'Snel naar',
      contactTitle: 'Contact',
      hours: 'Maandag - Vrijdag: 08:00 - 17:30',
      bottom: 'Persoonlijk, snel en betrokken',
    },
  },
  en: {
    htmlLang: 'en',
    pageTitle: 'Atservice | Find work that fits you',
    languageLabel: 'Language switch',
    brandTagline: 'Staffing with energy',
    nav: {
      vacatures: 'Jobs',
      werkgevers: 'Employers',
      about: 'About us',
      contact: 'Contact',
      viewJobs: 'View jobs',
    },
    hero: {
      title: 'We connect people and work with energy.',
      body:
        'Atservice is a staffing agency and contracting company active in logistics, engineering, piping, construction and support. In addition to connecting employers and professionals, we also carry out contracting work and deliver building projects, including homes.',
      note: 'New, committed and focused on lasting matches for employers and candidates.',
      primary: 'View jobs',
      secondary: 'Contact us',
    },
    usp: {
      title: 'No big promises, just a bureau that moves quickly and stays close',
      body:
        'We are building Atservice from the ground up. That means personal contact, direct communication and full attention for every vacancy or candidate.',
      items: [
        {
          title: 'Fast follow-up',
          body: 'Quick insight into vacancies, candidates and the next concrete steps.',
        },
        {
          title: 'Human contact',
          body: 'Personal guidance that creates trust and leads to a better match.',
        },
        {
          title: 'Work that fits',
          body: 'We match on ambition, pace and culture so placements keep working longer.',
        },
      ],
    },
    vacancies: {
      title: 'Choose a field and discover roles that fit',
      body:
        'Select a direction and view examples of positions we regularly recruit for. This gives you a faster picture of the work that suits you.',
      ariaLabel: 'Job categories',
      cards: {
        bouw: {
          title: 'Construction',
          body: 'Work on renovation, assembly and execution projects.',
        },
        ict: {
          title: 'IT',
          body: 'From development to support and management in modern teams.',
        },
        infra: {
          title: 'Infrastructure',
          body: 'Jobs in underground installation, civil engineering and outdoor work.',
        },
        schoonmaak: {
          title: 'Cleaning',
          body: 'For reliable people in facilities work and maintenance.',
        },
        techniek: {
          title: 'Engineering',
          body: 'Technical roles in installation, service and production.',
        },
      },
      apply: 'Apply now',
      mailPrefix: 'Application',
    },
    works: {
      visualLabel: 'Working with us',
      visualTitle: 'Faster interviews, faster to work',
      title: 'We make applying faster, more human and much clearer',
      body:
        'No noise and no endless steps. Atservice helps you find roles that genuinely fit and guides you from first contact to your start date.',
      primary: 'View jobs',
      secondary: 'Contact us',
    },
    employers: {
      title: 'A new bureau that stands out through attention, speed and short lines',
      body:
        'As a new bureau, we deliberately choose an honest and direct approach. What we bring is committed contact, fast follow-up and a clear approach in logistics, engineering, cleaning, support and construction. We are also active as a contractor and work on building projects and homes.',
      primary: 'Post a vacancy',
      secondary: 'Schedule an introduction',
      visualLabel: 'Starter with focus',
      visualTitle: 'Direct contact, short lines and full attention for every request',
      chipPrimary: 'New bureau, fast follow-up',
      chipSecondary: 'Focused on logistics, engineering and support',
      vacancySubject: 'Post a vacancy via Atservice',
    },
    about: {
      title: 'Staffing and contracting with a clear approach',
      body:
        'Atservice started from the belief that staffing and construction can be more personal, clearer and faster. That is why we combine a direct staffing approach with contracting work, including building projects and homes.',
      largeEyebrow: 'Why this works',
      largeTitle: 'We started small, so attention is not a promise but the way we work',
      largeBody:
        'Employers do not get a standard process with us, but quick contact, clear feedback and a bureau that stays reachable. Candidates receive guidance without noise, so the next step feels clear.',
      largePrimary: 'Schedule an introduction',
      largeSecondary: 'Send your CV',
      cvSubject: 'Send your CV via Atservice',
      cards: [
        {
          number: '01',
          title: 'Direct contact',
          body: 'No long routes. You quickly speak to someone who is actually handling your request.',
        },
        {
          number: '02',
          title: 'Focused directions',
          body: 'We focus on logistics, engineering, cleaning, construction and support roles.',
        },
        {
          number: '03',
          title: 'Honest and committed',
          body: 'We do not promise a huge network, but we do promise effort, speed and clear communication.',
        },
      ],
    },
    audience: {
      title: 'Clear for employers and candidates',
      body:
        'We keep the first step approachable. Whether you are looking for staff or looking for work, you immediately know what to expect from us.',
      employer: {
        eyebrow: 'For employers',
        title: 'How we can already help you',
        items: [
          'Freely discuss vacancies and candidate profiles.',
          'Fast contact about availability and next steps.',
          'Focus on practical roles where pace and reliability matter.',
        ],
        cta: 'Request an introduction',
        subject: 'Introduction request Atservice',
      },
      candidate: {
        eyebrow: 'For candidates',
        title: 'How to get started with us',
        items: [
          'View roles by field and respond quickly.',
          'Send your CV or call directly for an initial conversation.',
          'We think along about work that fits your pace and experience.',
        ],
        cta: 'Sign up',
        subject: 'Register with Atservice',
      },
    },
    contact: {
      title: 'Get in Touch',
      body: 'Direct contact for all your questions',
      phoneTitle: 'Phone',
      emailTitle: 'E-mail',
      hoursTitle: 'Opening hours',
      hoursValue: 'Monday - Friday: 08:00 - 17:30',
      formTitle: 'Send us a message',
      name: 'Your Name',
      email: 'Your E-mail',
      phone: 'Your Phone Number',
      category: 'Select Job Field',
      message: 'Your Message',
      submit: 'Send Message',
      formSubject: 'New message via Atservice website',
      fromName: 'Atservice website',
    },
    footer: {
      body: 'A new staffing agency with a personal approach, short lines of communication and a focus on lasting matches.',
      quickLinks: 'Quick links',
      contactTitle: 'Contact',
      hours: 'Monday - Friday: 08:00 - 17:30',
      bottom: 'Personal, fast and committed',
    },
  },
}

function setText(selector, value) {
  const element = document.querySelector(selector)
  if (element) element.textContent = value
}

function setTextList(selector, values) {
  const elements = document.querySelectorAll(selector)
  elements.forEach((element, index) => {
    if (values[index] !== undefined) element.textContent = values[index]
  })
}

function updateLanguageButtons() {
  document.querySelectorAll('[data-language]').forEach((button) => {
    const isActive = button.dataset.language === currentLanguage
    button.classList.toggle('is-active', isActive)
    button.setAttribute('aria-pressed', String(isActive))
  })
}

function updateStaticText() {
  const t = translations[currentLanguage]
  if (!t) return

  document.documentElement.lang = t.htmlLang
  document.title = t.pageTitle

  const languageToggle = document.querySelector('.language-toggle')
  if (languageToggle) languageToggle.setAttribute('aria-label', t.languageLabel)

  setText('.topbar .brand-copy small', t.brandTagline)
  setText('.site-footer-panel .brand-copy small', t.brandTagline)

  setTextList('.topbar .nav-links a', [t.nav.vacatures, t.nav.werkgevers, t.nav.about, t.nav.contact])
  setText('.nav-actions .outline-button', t.nav.viewJobs)

  setText('.hero-intro-copy h1', t.hero.title)
  setText('.hero-subheadline', t.hero.body)
  setText('.hero-intro-note', t.hero.note)
  setTextList('.hero-actions a', [t.hero.primary, t.hero.secondary])

  setText('#usp .section-heading h2', t.usp.title)
  setText('#usp .section-heading p', t.usp.body)
  document.querySelectorAll('#usp .usp-block').forEach((block, index) => {
    const item = t.usp.items[index]
    if (!item) return
    const title = block.querySelector('h3')
    const body = block.querySelector('p')
    if (title) title.textContent = item.title
    if (body) body.textContent = item.body
  })

  setText('#vacatures .section-heading h2', t.vacancies.title)
  setText('#vacatures .section-heading p', t.vacancies.body)
  const categoryGrid = document.querySelector('.job-category-grid')
  if (categoryGrid) categoryGrid.setAttribute('aria-label', t.vacancies.ariaLabel)

  Object.entries(t.vacancies.cards).forEach(([key, value]) => {
    const button = document.querySelector(`[data-job-category="${key}"]`)
    if (!button) return
    const title = button.querySelector('strong')
    const body = button.querySelector('span:last-child')
    if (title) title.textContent = value.title
    if (body) body.textContent = value.body
  })

  setText('#werken-via-ons .candidate-visual-card span', t.works.visualLabel)
  setText('#werken-via-ons .candidate-visual-card strong', t.works.visualTitle)
  setText('#werken-via-ons .split-copy h2', t.works.title)
  setText('#werken-via-ons .split-copy p', t.works.body)
  setTextList('#werken-via-ons .split-actions a', [t.works.primary, t.works.secondary])

  setText('#werkgevers .card-dark span', t.employers.visualLabel)
  setText('#werkgevers .card-dark strong', t.employers.visualTitle)
  setText('#werkgevers .visual-chip', t.employers.chipPrimary)
  setText('#werkgevers .visual-chip.alt', t.employers.chipSecondary)
  setText('#werkgevers .split-copy h2', t.employers.title)
  setText('#werkgevers .split-copy p', t.employers.body)
  setTextList('#werkgevers .split-actions a', [t.employers.primary, t.employers.secondary])

  setText('#over-ons .section-heading h2', t.about.title)
  setText('#over-ons .section-heading p', t.about.body)
  setText('#over-ons .starter-panel-large .starter-eyebrow', t.about.largeEyebrow)
  setText('#over-ons .starter-panel-large h3', t.about.largeTitle)
  setText('#over-ons .starter-panel-large p', t.about.largeBody)
  setTextList('#over-ons .starter-panel-large .starter-actions a', [t.about.largePrimary, t.about.largeSecondary])
  document.querySelectorAll('#over-ons .starter-panel:not(.starter-panel-large)').forEach((panel, index) => {
    const item = t.about.cards[index]
    if (!item) return
    const number = panel.querySelector('.starter-number')
    const title = panel.querySelector('h3')
    const body = panel.querySelector('p')
    if (number) number.textContent = item.number
    if (title) title.textContent = item.title
    if (body) body.textContent = item.body
  })

  setText('#startklaar .section-heading h2', t.audience.title)
  setText('#startklaar .section-heading p', t.audience.body)
  const audienceCards = document.querySelectorAll('#startklaar .audience-card')
  if (audienceCards[0]) {
    setText('#startklaar .audience-card:nth-of-type(1) .starter-eyebrow', t.audience.employer.eyebrow)
    setText('#startklaar .audience-card:nth-of-type(1) h3', t.audience.employer.title)
    audienceCards[0].querySelectorAll('li').forEach((item, index) => {
      if (t.audience.employer.items[index]) item.textContent = t.audience.employer.items[index]
    })
    setText('#startklaar .audience-card:nth-of-type(1) a', t.audience.employer.cta)
  }
  if (audienceCards[1]) {
    setText('#startklaar .audience-card:nth-of-type(2) .starter-eyebrow', t.audience.candidate.eyebrow)
    setText('#startklaar .audience-card:nth-of-type(2) h3', t.audience.candidate.title)
    audienceCards[1].querySelectorAll('li').forEach((item, index) => {
      if (t.audience.candidate.items[index]) item.textContent = t.audience.candidate.items[index]
    })
    setText('#startklaar .audience-card:nth-of-type(2) a', t.audience.candidate.cta)
  }

  setText('#contact .contact-heading h2', t.contact.title)
  setText('#contact .contact-heading p', t.contact.body)
  setTextList('.contact-info-copy h3', [t.contact.phoneTitle, t.contact.emailTitle, t.contact.hoursTitle])
  const contactInfoValues = document.querySelectorAll('.contact-info-copy p')
  if (contactInfoValues[2]) contactInfoValues[2].textContent = t.contact.hoursValue
  setText('.contact-message-form h3', t.contact.formTitle)

  const nameInput = document.querySelector('input[name="naam"]')
  const emailInput = document.querySelector('input[name="email"]')
  const phoneInput = document.querySelector('input[name="telefoonnummer"]')
  const categorySelect = document.querySelector('select[name="vakgebied"]')
  const messageInput = document.querySelector('textarea[name="bericht"]')
  const submitButton = document.querySelector('.contact-submit')
  const subjectInput = document.querySelector('input[name="subject"]')
  const fromNameInput = document.querySelector('input[name="from_name"]')

  if (nameInput) {
    nameInput.placeholder = t.contact.name
    nameInput.setAttribute('aria-label', t.contact.name)
  }
  if (emailInput) {
    emailInput.placeholder = t.contact.email
    emailInput.setAttribute('aria-label', t.contact.email)
  }
  if (phoneInput) {
    phoneInput.placeholder = t.contact.phone
    phoneInput.setAttribute('aria-label', t.contact.phone)
  }
  if (categorySelect) {
    categorySelect.setAttribute('aria-label', t.contact.category)
    const options = categorySelect.querySelectorAll('option')
    if (options[0]) options[0].textContent = t.contact.category
    if (options[1]) options[1].textContent = t.vacancies.cards.bouw.title
    if (options[2]) options[2].textContent = t.vacancies.cards.ict.title
    if (options[3]) options[3].textContent = t.vacancies.cards.infra.title
    if (options[4]) options[4].textContent = t.vacancies.cards.schoonmaak.title
    if (options[5]) options[5].textContent = t.vacancies.cards.techniek.title
  }
  if (messageInput) {
    messageInput.placeholder = t.contact.message
    messageInput.setAttribute('aria-label', t.contact.message)
  }
  if (submitButton) submitButton.textContent = t.contact.submit
  if (subjectInput) subjectInput.value = t.contact.formSubject
  if (fromNameInput) fromNameInput.value = t.contact.fromName

  setText('.footer-panel-brand p', t.footer.body)
  const footerLinkGroups = document.querySelectorAll('.footer-panel-links')
  if (footerLinkGroups[0]) {
    const quickHeading = footerLinkGroups[0].querySelector('h3')
    if (quickHeading) quickHeading.textContent = t.footer.quickLinks
    const quickLinks = footerLinkGroups[0].querySelectorAll('a')
    const quickLinkTexts = [t.nav.vacatures, t.nav.werkgevers, t.nav.about, t.nav.contact]
    quickLinks.forEach((link, index) => {
      if (quickLinkTexts[index]) link.textContent = quickLinkTexts[index]
    })
  }
  if (footerLinkGroups[1]) {
    const contactHeading = footerLinkGroups[1].querySelector('h3')
    if (contactHeading) contactHeading.textContent = t.footer.contactTitle
    const footerHours = footerLinkGroups[1].querySelector('span')
    if (footerHours) footerHours.textContent = t.footer.hours
  }
  const footerBottom = document.querySelectorAll('.footer-panel-bottom span')
  if (footerBottom[1]) footerBottom[1].textContent = t.footer.bottom

  updateMailLinks()
  updateLanguageButtons()
}

function updateMailLinks() {
  const t = translations[currentLanguage]
  if (!t) return

  const employersPrimary = document.querySelector('#werkgevers .split-actions .primary-button')
  const aboutSecondary = document.querySelector('#over-ons .starter-actions .secondary-button')
  const audienceEmployer = document.querySelector('#startklaar .audience-card:nth-of-type(1) a')
  const audienceCandidate = document.querySelector('#startklaar .audience-card:nth-of-type(2) a')

  if (employersPrimary) {
    employersPrimary.href = `mailto:${mailtoBase}?subject=${encodeURIComponent(t.employers.vacancySubject)}`
  }
  if (aboutSecondary) {
    aboutSecondary.href = `mailto:${mailtoBase}?subject=${encodeURIComponent(t.about.cvSubject)}`
  }
  if (audienceEmployer) {
    audienceEmployer.href = `mailto:${mailtoBase}?subject=${encodeURIComponent(t.audience.employer.subject)}`
  }
  if (audienceCandidate) {
    audienceCandidate.href = `mailto:${mailtoBase}?subject=${encodeURIComponent(t.audience.candidate.subject)}`
  }
}

function createJobCard(job, categoryKey) {
  const card = document.createElement('article')
  card.className = 'job-card reveal is-visible'
  card.dataset.job = job.title
  card.dataset.jobCard = 'true'
  card.tabIndex = 0
  const icon = categoryIcons[categoryKey] || job.code

  card.innerHTML = `
    <div class="job-top">
      <div class="company-logo">${icon}</div>
    </div>
    <div class="job-body">
      <h3>${job.title}</h3>
      <p>${job.description}</p>
    </div>
    <a class="apply-button" href="#" data-mail>${translations[currentLanguage].vacancies.apply}</a>
  `

  return card
}

function initJobExplorer() {
  const buttons = document.querySelectorAll('[data-job-category]')
  const grid = document.getElementById('job-results-grid')
  const title = document.getElementById('job-results-title')
  const copy = document.getElementById('job-results-copy')
  const panel = document.querySelector('.job-results-panel')

  if (!buttons.length || !grid || !title || !copy || !panel) return

  function hideResults() {
    panel.hidden = true
    panel.setAttribute('aria-hidden', 'true')
    panel.classList.remove('is-visible')
    grid.replaceChildren()
  }

  function renderCategory(categoryKey) {
    const category = localizedJobCategories[currentLanguage][categoryKey]
    if (!category) return

    activeCategoryKey = categoryKey

    buttons.forEach((button) => {
      const isActive = button.dataset.jobCategory === categoryKey
      button.classList.toggle('is-active', isActive)
      button.setAttribute('aria-pressed', String(isActive))
    })

    panel.hidden = false
    panel.setAttribute('aria-hidden', 'false')
    panel.classList.add('is-visible')
    title.textContent = category.title
    copy.textContent = category.intro
    grid.replaceChildren(...category.jobs.map((job) => createJobCard(job, categoryKey)))
  }

  renderCategoryRef = renderCategory

  buttons.forEach((button) => {
    button.addEventListener('click', () => renderCategory(button.dataset.jobCategory))
  })

  grid.addEventListener('click', (event) => {
    const mailButton = event.target.closest('[data-mail]')
    const card = event.target.closest('[data-job-card]')
    const titleValue = card?.dataset.job || 'Atservice'

    if (mailButton) {
      event.preventDefault()
      event.stopPropagation()
      openMail(`${translations[currentLanguage].vacancies.mailPrefix} ${titleValue}`)
      return
    }

    if (card) {
      openMail(`${translations[currentLanguage].vacancies.mailPrefix} ${titleValue}`)
    }
  })

  grid.addEventListener('keydown', (event) => {
    const card = event.target.closest('[data-job-card]')
    if (!card) return

    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault()
      openMail(`${translations[currentLanguage].vacancies.mailPrefix} ${card.dataset.job || 'Atservice'}`)
    }
  })

  hideResults()
}

function initLanguageSwitcher() {
  const buttons = document.querySelectorAll('[data-language]')
  buttons.forEach((button) => {
    button.addEventListener('click', () => {
      const selectedLanguage = button.dataset.language
      if (!translations[selectedLanguage]) return
      currentLanguage = selectedLanguage
      localStorage.setItem(languageStorageKey, currentLanguage)
      updateStaticText()
      if (renderCategoryRef && activeCategoryKey) renderCategoryRef(activeCategoryKey)
    })
  })
}

function initReveal() {
  const items = document.querySelectorAll('.reveal')
  if (items.length === 0) return

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return
        entry.target.classList.add('is-visible')
        observer.unobserve(entry.target)
      })
    },
    {
      threshold: 0.16,
      rootMargin: '0px 0px -40px 0px',
    }
  )

  items.forEach((item) => observer.observe(item))
}

document.addEventListener('DOMContentLoaded', () => {
  const savedLanguage = localStorage.getItem(languageStorageKey)
  if (savedLanguage && translations[savedLanguage]) {
    currentLanguage = savedLanguage
  }

  initJobExplorer()
  initLanguageSwitcher()
  initReveal()
  updateStaticText()
  if (renderCategoryRef && activeCategoryKey) renderCategoryRef(activeCategoryKey)
})

