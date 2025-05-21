// Définition des catégories et options de flux de travail
export const workflowCategories = {
  hotelServices: {
    name: "Services Hôteliers",
    options: {
      roomService: {
        name: "Service d'Étage",
        actions: [
          "commander_repas",
          "demander_menu",
          "modifier_commande",
          "annuler_commande",
          "demander_horaires",
          "demander_prix",
          "allergies_specifiques",
          "couverts_supplementaires",
          "boissons_speciales",
          "desserts_disponibles"
        ]
      },
      housekeeping: {
        name: "Service d'Entretien",
        actions: [
          "nettoyage_chambre",
          "changer_draps",
          "changer_serviettes",
          "produits_toilette",
          "oreillers_supplementaires",
          "couvertures_supplementaires",
          "service_couverture",
          "nettoyage_urgent",
          "pressing",
          "repassage"
        ]
      },
      concierge: {
        name: "Conciergerie",
        actions: [
          "reservation_restaurant",
          "reservation_taxi",
          "reservation_spectacle",
          "information_touristique",
          "location_voiture",
          "reservation_excursion",
          "recommandation_restaurant",
          "garde_bagages",
          "change_devises",
          "courrier_colis"
        ]
      }
    }
  },
  restauration: {
    name: "Restauration",
    options: {
      restaurant: {
        name: "Restaurant",
        actions: [
          "reserver_table",
          "menu_jour",
          "carte_vins",
          "specialites",
          "regimes_speciaux",
          "horaires_service",
          "annuler_reservation",
          "modifier_reservation",
          "privatiser_espace",
          "evenements_speciaux"
        ]
      },
      roomService: {
        name: "Room Service",
        actions: [
          "petit_dejeuner",
          "dejeuner",
          "diner",
          "collation",
          "boissons",
          "menu_enfant",
          "menu_dietetique",
          "plateau_fromages",
          "fruits_frais",
          "patisseries"
        ]
      },
      bar: {
        name: "Bar",
        actions: [
          "cocktails",
          "vins_spiritueux",
          "happy_hour",
          "snacks",
          "reservation_groupe",
          "animation_musicale",
          "carte_cigares",
          "service_table",
          "evenements_speciaux",
          "privatisation"
        ]
      }
    }
  },
  bienEtre: {
    name: "Bien-être",
    options: {
      spa: {
        name: "Spa",
        actions: [
          "massage",
          "soin_visage",
          "manucure",
          "pedicure",
          "epilation",
          "soin_corps",
          "hammam",
          "sauna",
          "yoga",
          "meditation"
        ]
      },
      fitness: {
        name: "Fitness",
        actions: [
          "coach_personnel",
          "cours_collectifs",
          "yoga",
          "pilates",
          "aquagym",
          "musculation",
          "cardio",
          "stretching",
          "meditation",
          "nutrition"
        ]
      },
      piscine: {
        name: "Piscine",
        actions: [
          "horaires",
          "cours_natation",
          "aquagym",
          "reservation_transat",
          "serviettes",
          "snacks_boissons",
          "privatisation",
          "evenements",
          "surveillance_enfants",
          "temperature"
        ]
      }
    }
  }
};

// Plus de 3000 combinaisons possibles grâce aux variations de paramètres
export const actionParameters = {
  timing: [
    "immédiat",
    "programmé",
    "périodique",
    "sur_demande",
    "urgent"
  ],
  location: [
    "chambre",
    "restaurant",
    "spa",
    "piscine",
    "salle_reunion",
    "lobby",
    "terrasse",
    "jardin",
    "plage",
    "parking"
  ],
  preferences: [
    "standard",
    "premium",
    "luxe",
    "economique",
    "personnalisé"
  ],
  languages: [
    "français",
    "anglais",
    "allemand",
    "espagnol",
    "italien",
    "néerlandais",
    "portugais",
    "russe",
    "chinois",
    "japonais",
    "arabe"
  ]
};

// Générateur de variations de workflow
export const generateWorkflowVariations = (
  category: string,
  option: string,
  action: string
) => {
  const variations: any[] = [];
  
  actionParameters.timing.forEach(timing => {
    actionParameters.location.forEach(location => {
      actionParameters.preferences.forEach(preference => {
        actionParameters.languages.forEach(language => {
          variations.push({
            id: `${category}_${option}_${action}_${timing}_${location}_${preference}_${language}`,
            category,
            option,
            action,
            timing,
            location,
            preference,
            language,
            template: `${action}_template_${language}`,
            parameters: {
              timing,
              location,
              preference,
              language
            }
          });
        });
      });
    });
  });

  return variations;
};
