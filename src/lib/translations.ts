export type TranslationKey = 
  | 'common.save'
  | 'common.cancel'
  | 'common.delete'
  | 'common.edit'
  | 'common.create'
  | 'common.search'
  | 'common.loading'
  | 'common.error'
  | 'common.success'
  | 'common.confirm'
  | 'nav.dashboard'
  | 'nav.agents'
  | 'nav.conversations'
  | 'nav.settings'
  | 'nav.analytics'
  | 'dashboard.title'
  | 'dashboard.totalCalls'
  | 'dashboard.activeCalls'
  | 'dashboard.successRate'
  | 'dashboard.averageDuration'
  | 'agents.title'
  | 'agents.create'
  | 'agents.edit'
  | 'agents.delete'
  | 'agents.name'
  | 'agents.language'
  | 'agents.status'
  | 'agents.lastActive'
  | 'conversations.title'
  | 'conversations.new'
  | 'conversations.edit'
  | 'conversations.delete'
  | 'conversations.status'
  | 'conversations.duration'
  | 'settings.title'
  | 'settings.language'
  | 'settings.notifications'
  | 'settings.account'
  | 'settings.billing'
  | 'analytics.title'
  | 'analytics.period'
  | 'analytics.calls'
  | 'analytics.duration'
  | 'analytics.success';

export const translations: Record<string, Record<TranslationKey, string>> = {
  fr: {
    'common.save': 'Enregistrer',
    'common.cancel': 'Annuler',
    'common.delete': 'Supprimer',
    'common.edit': 'Modifier',
    'common.create': 'Créer',
    'common.search': 'Rechercher',
    'common.loading': 'Chargement...',
    'common.error': 'Erreur',
    'common.success': 'Succès',
    'common.confirm': 'Confirmer',
    'nav.dashboard': 'Tableau de bord',
    'nav.agents': 'Agents',
    'nav.conversations': 'Conversations',
    'nav.settings': 'Paramètres',
    'nav.analytics': 'Analytique',
    'dashboard.title': 'Tableau de bord',
    'dashboard.totalCalls': 'Total des appels',
    'dashboard.activeCalls': 'Appels actifs',
    'dashboard.successRate': 'Taux de réussite',
    'dashboard.averageDuration': 'Durée moyenne',
    'agents.title': 'Agents vocaux',
    'agents.create': 'Créer un agent',
    'agents.edit': 'Modifier l\'agent',
    'agents.delete': 'Supprimer l\'agent',
    'agents.name': 'Nom',
    'agents.language': 'Langue',
    'agents.status': 'Statut',
    'agents.lastActive': 'Dernière activité',
    'conversations.title': 'Conversations',
    'conversations.new': 'Nouvelle conversation',
    'conversations.edit': 'Modifier la conversation',
    'conversations.delete': 'Supprimer la conversation',
    'conversations.status': 'Statut',
    'conversations.duration': 'Durée',
    'settings.title': 'Paramètres',
    'settings.language': 'Langue',
    'settings.notifications': 'Notifications',
    'settings.account': 'Compte',
    'settings.billing': 'Facturation',
    'analytics.title': 'Analytique',
    'analytics.period': 'Période',
    'analytics.calls': 'Appels',
    'analytics.duration': 'Durée',
    'analytics.success': 'Succès'
  },
  de: {
    'common.save': 'Speichern',
    'common.cancel': 'Abbrechen',
    'common.delete': 'Löschen',
    'common.edit': 'Bearbeiten',
    'common.create': 'Erstellen',
    'common.search': 'Suchen',
    'common.loading': 'Laden...',
    'common.error': 'Fehler',
    'common.success': 'Erfolg',
    'common.confirm': 'Bestätigen',
    'nav.dashboard': 'Dashboard',
    'nav.agents': 'Agenten',
    'nav.conversations': 'Gespräche',
    'nav.settings': 'Einstellungen',
    'nav.analytics': 'Analyse',
    'dashboard.title': 'Dashboard',
    'dashboard.totalCalls': 'Gesamtanrufe',
    'dashboard.activeCalls': 'Aktive Anrufe',
    'dashboard.successRate': 'Erfolgsrate',
    'dashboard.averageDuration': 'Durchschnittsdauer',
    'agents.title': 'Sprachagenten',
    'agents.create': 'Agent erstellen',
    'agents.edit': 'Agent bearbeiten',
    'agents.delete': 'Agent löschen',
    'agents.name': 'Name',
    'agents.language': 'Sprache',
    'agents.status': 'Status',
    'agents.lastActive': 'Zuletzt aktiv',
    'conversations.title': 'Gespräche',
    'conversations.new': 'Neues Gespräch',
    'conversations.edit': 'Gespräch bearbeiten',
    'conversations.delete': 'Gespräch löschen',
    'conversations.status': 'Status',
    'conversations.duration': 'Dauer',
    'settings.title': 'Einstellungen',
    'settings.language': 'Sprache',
    'settings.notifications': 'Benachrichtigungen',
    'settings.account': 'Konto',
    'settings.billing': 'Abrechnung',
    'analytics.title': 'Analyse',
    'analytics.period': 'Zeitraum',
    'analytics.calls': 'Anrufe',
    'analytics.duration': 'Dauer',
    'analytics.success': 'Erfolg'
  },
  es: {
    'common.save': 'Guardar',
    'common.cancel': 'Cancelar',
    'common.delete': 'Eliminar',
    'common.edit': 'Editar',
    'common.create': 'Crear',
    'common.search': 'Buscar',
    'common.loading': 'Cargando...',
    'common.error': 'Error',
    'common.success': 'Éxito',
    'common.confirm': 'Confirmar',
    'nav.dashboard': 'Panel',
    'nav.agents': 'Agentes',
    'nav.conversations': 'Conversaciones',
    'nav.settings': 'Ajustes',
    'nav.analytics': 'Análisis',
    'dashboard.title': 'Panel de control',
    'dashboard.totalCalls': 'Total de llamadas',
    'dashboard.activeCalls': 'Llamadas activas',
    'dashboard.successRate': 'Tasa de éxito',
    'dashboard.averageDuration': 'Duración media',
    'agents.title': 'Agentes de voz',
    'agents.create': 'Crear agente',
    'agents.edit': 'Editar agente',
    'agents.delete': 'Eliminar agente',
    'agents.name': 'Nombre',
    'agents.language': 'Idioma',
    'agents.status': 'Estado',
    'agents.lastActive': 'Última actividad',
    'conversations.title': 'Conversaciones',
    'conversations.new': 'Nueva conversación',
    'conversations.edit': 'Editar conversación',
    'conversations.delete': 'Eliminar conversación',
    'conversations.status': 'Estado',
    'conversations.duration': 'Duración',
    'settings.title': 'Ajustes',
    'settings.language': 'Idioma',
    'settings.notifications': 'Notificaciones',
    'settings.account': 'Cuenta',
    'settings.billing': 'Facturación',
    'analytics.title': 'Análisis',
    'analytics.period': 'Período',
    'analytics.calls': 'Llamadas',
    'analytics.duration': 'Duración',
    'analytics.success': 'Éxito'
  },
  pt: {
    'common.save': 'Salvar',
    'common.cancel': 'Cancelar',
    'common.delete': 'Excluir',
    'common.edit': 'Editar',
    'common.create': 'Criar',
    'common.search': 'Pesquisar',
    'common.loading': 'Carregando...',
    'common.error': 'Erro',
    'common.success': 'Sucesso',
    'common.confirm': 'Confirmar',
    'nav.dashboard': 'Painel',
    'nav.agents': 'Agentes',
    'nav.conversations': 'Conversas',
    'nav.settings': 'Configurações',
    'nav.analytics': 'Análises',
    'dashboard.title': 'Painel de controle',
    'dashboard.totalCalls': 'Total de chamadas',
    'dashboard.activeCalls': 'Chamadas ativas',
    'dashboard.successRate': 'Taxa de sucesso',
    'dashboard.averageDuration': 'Duração média',
    'agents.title': 'Agentes de voz',
    'agents.create': 'Criar agente',
    'agents.edit': 'Editar agente',
    'agents.delete': 'Excluir agente',
    'agents.name': 'Nome',
    'agents.language': 'Idioma',
    'agents.status': 'Status',
    'agents.lastActive': 'Última atividade',
    'conversations.title': 'Conversas',
    'conversations.new': 'Nova conversa',
    'conversations.edit': 'Editar conversa',
    'conversations.delete': 'Excluir conversa',
    'conversations.status': 'Status',
    'conversations.duration': 'Duração',
    'settings.title': 'Configurações',
    'settings.language': 'Idioma',
    'settings.notifications': 'Notificações',
    'settings.account': 'Conta',
    'settings.billing': 'Faturamento',
    'analytics.title': 'Análises',
    'analytics.period': 'Período',
    'analytics.calls': 'Chamadas',
    'analytics.duration': 'Duração',
    'analytics.success': 'Sucesso'
  },
  lb: {
    'common.save': 'Späicheren',
    'common.cancel': 'Ofbriechen',
    'common.delete': 'Läschen',
    'common.edit': 'Änneren',
    'common.create': 'Erstellen',
    'common.search': 'Sichen',
    'common.loading': 'Lueden...',
    'common.error': 'Feeler',
    'common.success': 'Erfolleg',
    'common.confirm': 'Bestätegen',
    'nav.dashboard': 'Dashboard',
    'nav.agents': 'Agenten',
    'nav.conversations': 'Gespréicher',
    'nav.settings': 'Astellungen',
    'nav.analytics': 'Analysen',
    'dashboard.title': 'Dashboard',
    'dashboard.totalCalls': 'Total Uriff',
    'dashboard.activeCalls': 'Aktiv Uriff',
    'dashboard.successRate': 'Erfollegsquot',
    'dashboard.averageDuration': 'Duerchschnëttlech Dauer',
    'agents.title': 'Stëmmagenten',
    'agents.create': 'Agent erstellen',
    'agents.edit': 'Agent änneren',
    'agents.delete': 'Agent läschen',
    'agents.name': 'Numm',
    'agents.language': 'Sprooch',
    'agents.status': 'Status',
    'agents.lastActive': 'Lescht Aktivitéit',
    'conversations.title': 'Gespréicher',
    'conversations.new': 'Neit Gespréich',
    'conversations.edit': 'Gespréich änneren',
    'conversations.delete': 'Gespréich läschen',
    'conversations.status': 'Status',
    'conversations.duration': 'Dauer',
    'settings.title': 'Astellungen',
    'settings.language': 'Sprooch',
    'settings.notifications': 'Notifikatiounen',
    'settings.account': 'Kont',
    'settings.billing': 'Fakturatioun',
    'analytics.title': 'Analysen',
    'analytics.period': 'Period',
    'analytics.calls': 'Uriff',
    'analytics.duration': 'Dauer',
    'analytics.success': 'Erfolleg'
  }
};
