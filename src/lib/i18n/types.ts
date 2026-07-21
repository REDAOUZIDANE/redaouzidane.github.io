export type ServiceCategory = {
  id: string;
  title: string;
  tagline: string;
  icon: string;
  items: string[];
};

export type Stat = {
  value: string;
  label: string;
};

export type Point = {
  title: string;
  description: string;
};

export type Step = {
  number: string;
  title: string;
  description: string;
};

export type Dictionary = {
  meta: {
    title: string;
    description: string;
  };
  nav: {
    home: string;
    services: string;
    about: string;
    contact: string;
    cta: string;
  };
  hero: {
    eyebrow: string;
    title: string;
    highlight: string;
    subtitle: string;
    ctaPrimary: string;
    ctaSecondary: string;
    stats: Stat[];
    tickerLabel: string;
    ticker: string[];
  };
  marketing: {
    title: string;
    line: string;
  };
  servicesOverview: {
    eyebrow: string;
    title: string;
    subtitle: string;
    cta: string;
  };
  serviceCategories: ServiceCategory[];
  whyUs: {
    eyebrow: string;
    title: string;
    subtitle: string;
    points: Point[];
  };
  approach: {
    eyebrow: string;
    title: string;
    subtitle: string;
    steps: Step[];
  };
  cta: {
    title: string;
    subtitle: string;
    button: string;
    buttonSecondary: string;
  };
  about: {
    eyebrow: string;
    title: string;
    intro: string;
    paragraphs: string[];
    missionTitle: string;
    mission: string;
    visionTitle: string;
    vision: string;
    valuesTitle: string;
    values: Point[];
    statsTitle: string;
    stats: Stat[];
  };
  founder: {
    eyebrow: string;
    title: string;
    name: string;
    role: string;
    credential: string;
    bio: string[];
    badges: string[];
    stats: Stat[];
    homeTeaser: string;
    homeCta: string;
  };
  contact: {
    eyebrow: string;
    title: string;
    subtitle: string;
    formTitle: string;
    labels: {
      name: string;
      email: string;
      company: string;
      phone: string;
      message: string;
      submit: string;
      subjectDefault: string;
    };
    placeholders: {
      name: string;
      email: string;
      company: string;
      phone: string;
      message: string;
    };
    infoTitle: string;
    email: string;
    location: string;
    locationValue: string;
    hoursLabel: string;
    hoursValue: string;
    note: string;
  };
  footer: {
    tagline: string;
    quickLinksTitle: string;
    servicesTitle: string;
    contactTitle: string;
    rights: string;
  };
};
