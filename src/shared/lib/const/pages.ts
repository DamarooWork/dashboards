export interface PageConfig {
  id: number
  name: string
  title: string
  link: string
  filters: {
    years: boolean
    typesOfWork: boolean
    roads: boolean
  }
  showSwitch: boolean
}

export const PAGES: PageConfig[] = [
  {
    id: 0,
    name: 'start-screen',
    title: 'Стартовый экран',
    link: '/',
    filters: {
      years: true,
      typesOfWork: true,
      roads: true,
    },
    showSwitch: false,
  },
  {
    id: 1,
    name: 'collection-id',
    title: 'Сбор ИД',
    link: '/collection-id',
    filters: {
      years: true,
      typesOfWork: true,
      roads: true,
    },
    showSwitch: true,
  },
  {
    id: 2,
    name: 'design-assignment',
    title: 'Сбор ЗП',
    link: '/design-assignment',
    filters: {
      years: true,
      typesOfWork: false,
      roads: true,
    },
    showSwitch: true,
  },
  {
    id: 3,
    name: 'construction-supervision',
    title: 'Строительный контроль',
    link: '/construction-supervision',
    filters: {
      years: true,
      typesOfWork: false,
      roads: true,
    },
    showSwitch: true,
  },
  {
    id: 4,
    name: 'checking-smet-pir',
    title: 'Проверка Смет ПИР',
    link: '/checking-smet-pir',
    filters: {
      years: true,
      typesOfWork: false,
      roads: true,
    },
    showSwitch: false,
  },
  {
    id: 5,
    name: 'dashboard-6',
    title: 'Дашборд 6',
    link: '/dashboard-6',
    filters: {
      years: false,
      typesOfWork: false,
      roads: false,
    },
    showSwitch: false,
  },
  {
    id: 6,
    name: 'dashboard-7',
    title: 'Дашборд 7',
    link: '/dashboard-7',
    filters: {
      years: false,
      typesOfWork: false,
      roads: false,
    },
    showSwitch: false,
  },
  {
    id: 7,
    name: 'contract-pir',
    title: 'Договор ПИР',
    link: '/contract-pir',
    filters: {
      years: true,
      typesOfWork: false,
      roads: true,
    },
    showSwitch: true,
  },
]
