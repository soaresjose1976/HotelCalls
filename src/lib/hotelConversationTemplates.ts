// ... existing imports and code ...

export const luxembourgishTemplates = {
  greeting: {
    message: "Moien! Wëllkomm am {hotelName}. Wéi kann ech Iech hëllefen?",
    options: {
      roomService: "Zëmmerservice",
      housekeeping: "Botzservice",
      concierge: "Concierge",
      checkout: "Checkout"
    }
  },
  
  roomService: {
    message: "Wat kënne mir Iech op d'Zëmmer bréngen?",
    options: {
      food: "Iessen",
      drinks: "Gedrénks",
      special: "Speziell Ufroen"
    }
  },
  
  housekeeping: {
    message: "Wéi eng Botzservicer braucht Dir?",
    options: {
      cleaning: "Zëmmer botzen",
      towels: "Frësch Dicher",
      amenities: "Toilette-Artikelen"
    }
  },
  
  concierge: {
    message: "Wéi kann den Concierge Iech hëllefen?",
    options: {
      taxi: "Taxi bestellen",
      reservation: "Restaurant Reservatioun",
      activities: "Aktivitéiten"
    }
  },
  
  checkout: {
    message: "Wëllt Dir auschecken? Mir kënnen dat fir Iech preparéieren.",
    options: {
      confirm: "Jo, elo auschecken",
      later: "Méi spéit",
      question: "Eng Fro zum Checkout"
    }
  },
  
  confirmation: {
    message: "Är Ufro gouf confirméiert. Braucht Dir soss nach eppes?",
    options: {
      yes: "Jo, w.e.g.",
      no: "Nee, merci"
    }
  },
  
  farewell: {
    message: "Merci fir Är Ufro. E schéinen Dag nach!",
    options: {
      thanks: "Merci gläichfalls"
    }
  }
};
