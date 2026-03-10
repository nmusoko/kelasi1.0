export const currentUser = {
  id: "20230042",
  name: "Beni Daniel",
  firstName: "Beni",
  email: "beni.daniel@kelasi.com",
  faculty: "Sciences et Technologies",
  department: "Informatique",
  year: "Licence 3 — Semestre 5",
  gpa: 14.8,
  credits: 90,
  phone: "+243 81 322 2323",
  address: "Kinshasa, RD Congo",
};

export const courses = [
  {
    id: "c1",
    code: "INF301",
    name: "Algorithmes et Structures de Données",
    shortName: "Algo & SD",
    professor: "Dr. Marie Dupont",
    professorAvatar: "MD",
    color: "#4361EE",
    gradient: "linear-gradient(135deg, #4361EE, #3A0CA3)",
    thumbnail: "https://images.unsplash.com/photo-1624953587687-daf255b6b80a?w=400&q=80",
    progress: 65,
    nextDeadline: "2026-03-07",
    credits: 6,
    schedule: "Lun & Mer 10h–12h",
    room: "Salle B204",
    semester: "S5",
    studentsCount: 42,
  },
  {
    id: "c2",
    code: "MAT201",
    name: "Mathématiques Discrètes",
    shortName: "Math Discrètes",
    professor: "Prof. Ahmed Khalil",
    professorAvatar: "AK",
    color: "#7B2FBE",
    gradient: "linear-gradient(135deg, #7B2FBE, #4361EE)",
    thumbnail: "https://images.unsplash.com/photo-1561089489-f13d5e730d72?w=400&q=80",
    progress: 80,
    nextDeadline: "2026-03-10",
    credits: 5,
    schedule: "Mar & Jeu 08h–10h",
    room: "Amphi A",
    semester: "S5",
    studentsCount: 78,
  },
  {
    id: "c3",
    code: "BIO102",
    name: "Biologie Cellulaire",
    shortName: "Bio Cell.",
    professor: "Dr. Sophie Martin",
    professorAvatar: "SM",
    color: "#06D6A0",
    gradient: "linear-gradient(135deg, #06D6A0, #0096C7)",
    thumbnail: "https://images.unsplash.com/photo-1634872583967-6417a8638a59?w=400&q=80",
    progress: 45,
    nextDeadline: "2026-03-14",
    credits: 4,
    schedule: "Ven 14h–18h",
    room: "Lab. Sciences 3",
    semester: "S5",
    studentsCount: 35,
  },
  {
    id: "c4",
    code: "ECO305",
    name: "Économie Numérique",
    shortName: "Éco Numérique",
    professor: "Dr. Julien Morel",
    professorAvatar: "JM",
    color: "#FFB703",
    gradient: "linear-gradient(135deg, #FFB703, #FB8500)",
    thumbnail: "https://images.unsplash.com/photo-1607948937289-5ca19c59e70f?w=400&q=80",
    progress: 55,
    nextDeadline: "2026-03-12",
    credits: 3,
    schedule: "Mer 14h–16h",
    room: "Salle C102",
    semester: "S5",
    studentsCount: 55,
  },
  {
    id: "c5",
    code: "LIT204",
    name: "Communication & Rédaction",
    shortName: "Comm. & Rédact.",
    professor: "Mme. Claire Fontaine",
    professorAvatar: "CF",
    color: "#EF476F",
    gradient: "linear-gradient(135deg, #EF476F, #C9184A)",
    thumbnail: "https://images.unsplash.com/photo-1585742162711-ed1a0fb549ac?w=400&q=80",
    progress: 70,
    nextDeadline: "2026-03-09",
    credits: 3,
    schedule: "Jeu 16h–18h",
    room: "Salle A110",
    semester: "S5",
    studentsCount: 30,
  },
];

export const weeklyMaterials: Record<string, { week: number; title: string; files: { id: string; name: string; type: "pdf" | "word" | "ppt" | "video"; size: string; date: string }[] }[]> = {
  c1: [
    {
      week: 1,
      title: "Introduction aux Algorithmes",
      files: [
        { id: "f1", name: "Cours_Sem1_Introduction.pdf", type: "pdf", size: "2.4 MB", date: "12 Feb 2026" },
        { id: "f2", name: "TP1_Exercices.pdf", type: "pdf", size: "0.8 MB", date: "12 Feb 2026" },
        { id: "f3", name: "Présentation_S1.pptx", type: "ppt", size: "5.2 MB", date: "12 Feb 2026" },
        { id: "f4", name: "Introduction_Video.mp4", type: "video", size: "124 MB", date: "13 Feb 2026" },
      ],
    },
    {
      week: 2,
      title: "Complexité et Notation Big-O",
      files: [
        { id: "f5", name: "Cours_Sem2_Complexite.pdf", type: "pdf", size: "3.1 MB", date: "19 Feb 2026" },
        { id: "f6", name: "Exercices_Big-O.docx", type: "word", size: "0.5 MB", date: "19 Feb 2026" },
        { id: "f7", name: "Complexite_Video.mp4", type: "video", size: "98 MB", date: "20 Feb 2026" },
      ],
    },
    {
      week: 3,
      title: "Listes, Piles et Files",
      files: [
        { id: "f8", name: "Cours_Sem3_Structures.pdf", type: "pdf", size: "4.0 MB", date: "26 Feb 2026" },
        { id: "f9", name: "TP3_Structures_Données.pdf", type: "pdf", size: "1.2 MB", date: "26 Feb 2026" },
        { id: "f10", name: "Présentation_S3.pptx", type: "ppt", size: "7.8 MB", date: "26 Feb 2026" },
      ],
    },
    {
      week: 4,
      title: "Arbres et Graphes",
      files: [
        { id: "f11", name: "Cours_Sem4_Arbres.pdf", type: "pdf", size: "3.6 MB", date: "4 Mar 2026" },
        { id: "f12", name: "TP4_Graphes.docx", type: "word", size: "0.9 MB", date: "4 Mar 2026" },
      ],
    },
  ],
  c2: [
    {
      week: 1,
      title: "Logique Propositionnelle",
      files: [
        { id: "m1", name: "Cours_Logique.pdf", type: "pdf", size: "1.8 MB", date: "10 Feb 2026" },
        { id: "m2", name: "Exercices_Logique.pdf", type: "pdf", size: "0.6 MB", date: "10 Feb 2026" },
        { id: "m3", name: "Logique_Slides.pptx", type: "ppt", size: "3.2 MB", date: "11 Feb 2026" },
      ],
    },
    {
      week: 2,
      title: "Théorie des Ensembles",
      files: [
        { id: "m4", name: "Cours_Ensembles.pdf", type: "pdf", size: "2.2 MB", date: "17 Feb 2026" },
        { id: "m5", name: "TD_Ensembles.docx", type: "word", size: "0.4 MB", date: "17 Feb 2026" },
      ],
    },
  ],
};

export const announcements: Record<string, { id: string; title: string; content: string; date: string; important: boolean }[]> = {
  c1: [
    {
      id: "a1",
      title: "Rappel : Examen partiel le 15 mars",
      content: "Je vous rappelle que l'examen partiel aura lieu le samedi 15 mars de 9h à 12h en amphi B. Le programme couvre les semaines 1 à 4. Bonne révision à tous !",
      date: "3 Mars 2026",
      important: true,
    },
    {
      id: "a2",
      title: "Correction du TP3 disponible",
      content: "La correction du TP3 sur les structures de données a été déposée dans les matériels de la semaine 3. N'hésitez pas à poser vos questions en séance ou via le chat.",
      date: "28 Fév 2026",
      important: false,
    },
    {
      id: "a3",
      title: "Séance annulée – Remplacement",
      content: "La séance du lundi 2 mars est annulée. Elle sera rattrapée le vendredi 6 mars de 14h à 16h en salle C101. Veuillez noter ce changement.",
      date: "27 Fév 2026",
      important: true,
    },
    {
      id: "a4",
      title: "Ressources supplémentaires en ligne",
      content: "J'ai ajouté des ressources supplémentaires sur les algorithmes de tri dans l'espace de cours. Ces ressources sont facultatives mais très utiles pour l'examen.",
      date: "20 Fév 2026",
      important: false,
    },
  ],
  c2: [
    {
      id: "b1",
      title: "Devoir maison — Date limite modifiée",
      content: "Suite à plusieurs demandes, la date limite du devoir maison est repoussée au 10 mars. La qualité du travail est prioritaire sur la rapidité.",
      date: "1 Mars 2026",
      important: true,
    },
    {
      id: "b2",
      title: "Séance de révision organisée",
      content: "Une séance de révision est organisée le 12 mars de 16h à 18h. Préparez vos questions à l'avance.",
      date: "28 Fév 2026",
      important: false,
    },
  ],
};

export const assignments: Record<string, {
  id: string;
  title: string;
  description: string;
  dueDate: string;
  status: "not_submitted" | "submitted" | "graded";
  grade?: number;
  maxGrade: number;
  feedback?: string;
  instructions: string;
}[]> = {
  c1: [
    {
      id: "as1",
      title: "TP Noté — Algorithmes de Tri",
      description: "Implémenter et comparer les algorithmes de tri (Bubble, Quick, Merge)",
      dueDate: "2026-03-07",
      status: "not_submitted",
      maxGrade: 20,
      instructions: `## Objectif
Implémenter trois algorithmes de tri en Python et comparer leurs performances.

## Travail demandé
1. **Bubble Sort** : Implémenter l'algorithme et calculer sa complexité
2. **Quick Sort** : Implémenter une version récursive optimisée
3. **Merge Sort** : Implémenter et fusionner des tableaux

## Livrable
- Un fichier Python (.py) contenant les trois implémentations
- Un rapport PDF de 2-3 pages comparant les performances
- Des graphiques de comparaison (optionnel)

## Critères d'évaluation
- Exactitude des algorithmes (8 pts)
- Qualité du code (4 pts)  
- Analyse de complexité (4 pts)
- Rapport et présentation (4 pts)`,
    },
    {
      id: "as2",
      title: "Projet — Implémentation d'un Arbre Binaire",
      description: "Créer une structure d'arbre binaire de recherche complète",
      dueDate: "2026-03-20",
      status: "submitted",
      maxGrade: 20,
      instructions: `## Objectif
Implémenter un Arbre Binaire de Recherche (BST) complet avec toutes les opérations.

## Opérations requises
- Insertion, suppression, recherche
- Parcours (inordre, préordre, postordre)
- Calcul de la hauteur

## Livrable
Fichier ZIP contenant le code source et un fichier README.`,
    },
    {
      id: "as3",
      title: "Quiz — Complexité Algorithmique",
      description: "Quiz de 20 questions sur la notation Big-O",
      dueDate: "2026-02-21",
      status: "graded",
      grade: 17,
      maxGrade: 20,
      feedback: "Excellent travail ! Vous maîtrisez bien les concepts de complexité. Quelques petites erreurs sur la complexité amortie (Q14 et Q17) mais dans l'ensemble très bon résultat. Continuez ainsi !",
      instructions: "Quiz en ligne — 20 questions à choix multiples. Durée : 45 minutes.",
    },
  ],
  c2: [
    {
      id: "bs1",
      title: "Devoir Maison — Logique Propositionnelle",
      description: "Résoudre des problèmes de logique formelle",
      dueDate: "2026-03-10",
      status: "not_submitted",
      maxGrade: 20,
      instructions: `## Instructions
Résoudre les 10 exercices du TD distribué en cours.

## Rendu
- Format PDF uniquement
- Rédaction claire et justifiée
- Notation : 2 points par exercice`,
    },
    {
      id: "bs2",
      title: "Mini-Projet — Théorie des Graphes",
      description: "Application de la théorie des graphes à un problème réel",
      dueDate: "2026-02-15",
      status: "graded",
      grade: 15,
      maxGrade: 20,
      feedback: "Bon travail d'ensemble. La modélisation est correcte mais l'analyse des résultats manque de profondeur. Les algorithmes sont bien implémentés.",
      instructions: "Projet de groupe (2-3 étudiants). Application d'un algorithme de graphe à un problème concret.",
    },
  ],
};

export const messages = [
  {
    id: "chat1",
    contact: "Dr. Marie Dupont",
    avatar: "MD",
    course: "INF301",
    color: "#4361EE",
    lastMessage: "N'oubliez pas de rendre le TP avant vendredi !",
    time: "10:32",
    unread: 2,
    online: true,
  },
  {
    id: "chat2",
    contact: "Prof. Ahmed Khalil",
    avatar: "AK",
    course: "MAT201",
    color: "#7B2FBE",
    lastMessage: "La correction est disponible en ligne.",
    time: "Hier",
    unread: 0,
    online: false,
  },
  {
    id: "chat3",
    contact: "Dr. Sophie Martin",
    avatar: "SM",
    course: "BIO102",
    color: "#06D6A0",
    lastMessage: "Le TP de vendredi est confirmé.",
    time: "Hier",
    unread: 1,
    online: true,
  },
  {
    id: "chat4",
    contact: "Dr. Julien Morel",
    avatar: "JM",
    course: "ECO305",
    color: "#FFB703",
    lastMessage: "Merci pour votre travail, très bien !",
    time: "Lun",
    unread: 0,
    online: false,
  },
  {
    id: "chat5",
    contact: "Mme. Claire Fontaine",
    avatar: "CF",
    course: "LIT204",
    color: "#EF476F",
    lastMessage: "Votre rapport est en cours de correction.",
    time: "Lun",
    unread: 0,
    online: false,
  },
];

export const chatMessages: Record<string, { id: string; sender: "me" | "prof"; text: string; time: string }[]> = {
  chat1: [
    { id: "cm1", sender: "prof", text: "Bonjour Beni ! Comment avancez-vous sur le TP de tri ?", time: "09:15" },
    { id: "cm2", sender: "me", text: "Bonjour Dr. Dupont ! Je travaille sur le QuickSort, j'ai quelques difficultés avec la partition.", time: "09:42" },
    { id: "cm3", sender: "prof", text: "Pas de problème ! Regardez la diapositive 18 du cours 2, il y a un exemple détaillé. N'hésitez pas si vous avez d'autres questions.", time: "09:50" },
    { id: "cm4", sender: "me", text: "Merci beaucoup, c'est beaucoup plus clair maintenant ! Je vais essayer.", time: "10:05" },
    { id: "cm5", sender: "prof", text: "Parfait ! N'oubliez pas de rendre le TP avant vendredi !", time: "10:32" },
  ],
  chat2: [
    { id: "cm6", sender: "prof", text: "Bonjour, la correction du devoir 1 est disponible sur l'espace de cours.", time: "14:00" },
    { id: "cm7", sender: "me", text: "Merci professeur, j'ai pu consulter ma copie.", time: "15:30" },
    { id: "cm8", sender: "prof", text: "La correction est disponible en ligne.", time: "16:00" },
  ],
  chat3: [
    { id: "cm9", sender: "prof", text: "Rappel : le TP de vendredi est obligatoire. Blouse blanche requise.", time: "08:00" },
    { id: "cm10", sender: "me", text: "Bien compris, merci pour le rappel !", time: "09:15" },
    { id: "cm11", sender: "prof", text: "Le TP de vendredi est confirmé.", time: "10:00" },
  ],
};

export const calendarEvents = [
  { id: "ev1", title: "TP Noté — Algo de Tri", course: "INF301", date: "2026-03-07", type: "assignment", color: "#4361EE", time: "23:59" },
  { id: "ev2", title: "Devoir — Logique Propositionnelle", course: "MAT201", date: "2026-03-10", type: "assignment", color: "#7B2FBE", time: "23:59" },
  { id: "ev3", title: "Devoir — Communication", course: "LIT204", date: "2026-03-09", type: "assignment", color: "#EF476F", time: "23:59" },
  { id: "ev4", title: "Cours — Algo & SD", course: "INF301", date: "2026-03-04", type: "class", color: "#4361EE", time: "10:00" },
  { id: "ev5", title: "Cours — Math Discrètes", course: "MAT201", date: "2026-03-05", type: "class", color: "#7B2FBE", time: "08:00" },
  { id: "ev6", title: "TP Bio Cellulaire", course: "BIO102", date: "2026-03-06", type: "class", color: "#06D6A0", time: "14:00" },
  { id: "ev7", title: "Cours — Éco Numérique", course: "ECO305", date: "2026-03-04", type: "class", color: "#FFB703", time: "14:00" },
  { id: "ev8", title: "Examen Partiel — Algo & SD", course: "INF301", date: "2026-03-15", type: "exam", color: "#4361EE", time: "09:00" },
  { id: "ev9", title: "Cours — Comm. & Rédact.", course: "LIT204", date: "2026-03-05", type: "class", color: "#EF476F", time: "16:00" },
  { id: "ev10", title: "Projet Arbre Binaire", course: "INF301", date: "2026-03-20", type: "assignment", color: "#4361EE", time: "23:59" },
  { id: "ev11", title: "Séance de révision", course: "MAT201", date: "2026-03-12", type: "class", color: "#7B2FBE", time: "16:00" },
  { id: "ev12", title: "Devoir — Éco Numérique", course: "ECO305", date: "2026-03-12", type: "assignment", color: "#FFB703", time: "23:59" },
  { id: "ev13", title: "TP Biologie", course: "BIO102", date: "2026-03-14", type: "assignment", color: "#06D6A0", time: "23:59" },
  { id: "ev14", title: "Cours — Algo & SD", course: "INF301", date: "2026-03-11", type: "class", color: "#4361EE", time: "10:00" },
  { id: "ev15", title: "Cours — Math Discrètes", course: "MAT201", date: "2026-03-12", type: "class", color: "#7B2FBE", time: "08:00" },
];