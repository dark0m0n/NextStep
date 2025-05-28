class User {
    constructor(id, lastname, firstname, username, phone, email, country, category, skills, languages, imagePath, additionalInfo, specialties, rating, salary) {
      this.id = id; //число
      this.lastname = lastname;  //стрінга
      this.firstname = firstname; //стрінга
      this.username = username; //стрінга
      this.phoneNumber = phone; //стрінга
      this.email = email; //стрінга
      this.country = country; //стрінга
      this.category = category; //стрінга
      this.skills = skills; //стрінга з розбільником ";"
      this.language = languages; //стрінга з розбільником ","
      this.imagePath = imagePath; //стрінга
      this.additionalInfo = additionalInfo; //стрінга
      this.specialties = specialties; //стрінга з розбільником "," формату "назва:досвід"
      this.rating = rating;
      this.salary = salary;
    }
  }
  
  
  class Startup {
    constructor(id, title, description, imagePath, experience, category, projectType, hiring, investment, averageRating,  userID) {
      this.id = id; // число
      this.title = title; // стрінга
      this.description = description; // стрінга
      this.imagePath = imagePath; // стрінга
      this.experience = experience; //стрінга з розбільником "," формату "назва:досвід"
        this.category = category;  //стрінга з розбільником ","
        this.projectType = projectType; // стрінга
        this.hiring = hiring; // true / false
        this.investment = investment; // число
        this.averageRating = averageRating; // число
        this.userID = userID; //число
    }
  }
  
  class Rewiev {
    constructor(id, comment , rating, user, startupID, createdAt) {
      this.id = id;
        this.comment = comment;
        this.rating = rating
        this.user = user;
      this.startupID = startupID;
      this.createdAt = createdAt;
    }
}
  
class Message {
  constructor(id, sender, chatId, sentAt, text) {
    this.id = id;
    this.sender = sender; 
    this.chatId = chatId;
    this.sentAt = sentAt;
    this.text = text;
  }
}

class ChatMember {
  constructor(id, chatId, user) {
    this.id = id;
    this.chatId = chatId;
    this.user = user;
  }
}

class Chat {
  constructor(id, name, imagePath, isGroup) {
    this.id = id;
    this.name = name;
    this.imagePath = imagePath;
    this.isGroup = isGroup;
  }
}


  // Примірники користувачів
  const users = [
    new User(1, "Ivanov", "Ivan", "ivan_dev", "1234567890", "ivan@example.com", "Ukraine", "Frontend", "React;JS", "en,uk", "/images/ua.png", "", "React:3", 4.5, 1200),
    new User(2, "Petrova", "Anna", "anya_front", "0987654321", "anya@example.com", "Ukraine", "Frontend", "HTML;CSS;JS", "uk,en", "/images/ua.png", "Loves C++", "CSS:2,HTML:3", 5.0, 1500),
    new User(3, "Smith", "John", "john_backend", "1111111111", "john@example.com", "USA", "Backend", "Node.js;SQL", "en", "/images/ua.png", "", "Node.js:4", 4.2, 1300),
    new User(4, "Lee", "Sara", "sara_ui", "2222222222", "sara@example.com", "Korea", "Design", "Figma;UI", "en,ko", "/images/ua.png", "", "Figma:3", 4.8, 1400),
    new User(5, "Koval", "Oleg", "oleg_pm", "3333333333", "oleg@example.com", "Ukraine", "Management", "Agile;Scrum", "uk", "/images/ua.png", "", "Agile:5", 4.6, 1600),
    new User(6, "Nguyen", "Linh", "linh_dev", "4444444444", "linh@example.com", "Vietnam", "Frontend", "Vue;JS", "en,vi", "/images/ua.png", "", "Vue:2", 4.3, 1100),
    new User(7, "Garcia", "Luis", "luis_designer", "5555555555", "luis@example.com", "Spain", "Design", "Photoshop;Illustrator", "es,en", "/images/ua.png", "", "Illustrator:4", 4.7, 1350),
    new User(8, "Brown", "Emily", "emily_hr", "6666666666", "emily@example.com", "UK", "HR", "Recruitment", "en", "/images/ua.png", "", "Recruitment:3", 4.9, 1250),
    new User(9, "Wang", "Ming", "ming_dev", "7777777777", "ming@example.com", "China", "Backend", "Python;Django", "zh,en", "/images/ua.png", "", "Python:5", 4.4, 1450),
    new User(10, "Doe", "Jane", "jane_ops", "8888888888", "jane@example.com", "USA", "DevOps", "AWS;Docker", "en", "/images/ua.png", "", "Docker:3", 4.5, 1550),
    
    new User(11, "Kim", "Jin", "jin_ui", "9999999999", "jin@example.com", "Korea", "Design", "Sketch;UX", "ko,en", "/images/ua.png", "", "Sketch:3", 4.6, 1400),
    new User(12, "Lopez", "Maria", "maria_marketing", "1010101010", "maria@example.com", "Mexico", "Marketing", "SEO;Content", "es,en", "/images/ua.png", "", "SEO:4", 4.3, 1250),
    new User(13, "Dubois", "Claire", "claire_data", "1111222233", "claire@example.com", "France", "Data Science", "Python;Pandas", "fr,en", "/images/ua.png", "", "Pandas:3", 4.7, 1500),
    new User(14, "Rossi", "Luca", "luca_ml", "2222333344", "luca@example.com", "Italy", "AI/ML", "TensorFlow;Python", "it,en", "/images/ua.png", "", "TensorFlow:4", 4.6, 1600),
    new User(15, "Ali", "Zara", "zara_qa", "3333444455", "zara@example.com", "Pakistan", "QA", "TestRail;Postman", "en,ur", "/images/ua.png", "", "Postman:3", 4.4, 1200),
    new User(16, "Nakamura", "Yuki", "yuki_dev", "4444555566", "yuki@example.com", "Japan", "Frontend", "Svelte;JS", "ja,en", "/images/ua.png", "", "Svelte:2", 4.5, 1100),
    new User(17, "Andersson", "Erik", "erik_architect", "5555666677", "erik@example.com", "Sweden", "Architecture", "Microservices;Cloud", "sv,en", "/avatars/erik.png", "", "Cloud:5", 4.8, 1650),
    new User(18, "Novak", "Mira", "mira_pm", "6666777788", "mira@example.com", "Croatia", "Management", "Kanban;Planning", "hr,en", "/images/ua.png", "", "Kanban:4", 4.6, 1500),
    new User(19, "Singh", "Raj", "raj_sec", "7777888899", "raj@example.com", "India", "Security", "PenTesting;Firewalls", "en,hi", "/images/ua.png", "", "PenTesting:3", 4.5, 1450),
    new User(20, "Johnson", "Kate", "kate_support", "8888999900", "kate@example.com", "Canada", "Support", "Zendesk;Docs", "en,fr", "/images/ua.png", "", "Zendesk:4", 4.7, 1300),
    
    new User(21, "Berg", "Nina", "nina_bi", "9999000011", "nina@example.com", "Norway", "Analytics", "PowerBI;Excel", "no,en", "/images/ua.png", "", "PowerBI:3", 4.4, 1250),
    new User(22, "Tan", "Wei", "wei_research", "0000111122", "wei@example.com", "Singapore", "Research", "Statistics;R", "en,zh", "/avatars/wei.png", "", "R:4", 4.8, 1400),
    new User(23, "Fischer", "Max", "max_iot", "1212121212", "max@example.com", "Germany", "IoT", "C++;Arduino", "de,en", "/avatars/max.png", "", "C++:5", 4.6, 1350),
    new User(24, "Khan", "Aisha", "aisha_uiux", "2323232323", "aisha@example.com", "UAE", "Design", "UI;UX;Figma", "en,ar", "/avatars/aisha.png", "", "UX:3", 4.5, 1300),
    new User(25, "Popescu", "Andrei", "andrei_ai", "3434343434", "andrei@example.com", "Romania", "AI/ML", "PyTorch;NLP", "ro,en", "/avatars/andrei.png", "", "NLP:4", 4.7, 1500),
  ];
  
  
  // Примірники стартапів
  const startups = [
    new Startup(1, "GreenTech", "Стартап у сфері екологічних технологій", "/images/ua.png", "Frontend Developer: 2 роки, UX Designer: 1 рік", "Екологія, Смарт системи", "Стартап", true, 90000, 9.6, 4),
    new Startup(2, "MedAI", "AI для діагностики захворювань", "/images/ua.png", "AI Engineer: 3 роки, Data Scientist: 2 роки", "Медицина, Штучний інтелект", "Стартап", true, 150000, 9.2, 5),
    new Startup(3, "AgroVision", "Системи для смарт-фермерства", "/images/ua.png", "Embedded Dev: 2 роки, DevOps: 2 роки", "Агро, IoT", "Стартап", true, 70000, 8.7, 3),
    new Startup(4, "Langify", "Мовна платформа з нейромережею", "/images/ua.png", "ML Engineer: 3 роки, Backend: 2 роки", "Освіта, AI", "Стартап", true, 120000, 9.0, 7),
    new Startup(5, "FinNest", "Додаток для фінансової грамотності", "/images/ua.png", "Mobile Dev: 2 роки, UI/UX: 1 рік", "Фінанси, Освіта", "Стартап", false, 65000, 8.1, 2),
    new Startup(6, "AutoPath", "Маршрутизація для автономного транспорту", "/images/ua.png", "Computer Vision: 3 роки", "Транспорт, AI", "Стартап", true, 180000, 9.5, 6),
    new Startup(7, "VetCare", "Цифровий щоденник для ветеринарів", "/images/ua.png", "Fullstack: 2 роки", "Здоров'я тварин", "Стартап", false, 50000, 7.9, 1),
    new Startup(8, "CryptoGuard", "Захист криптовалютних транзакцій", "/images/ua.png", "Security Specialist: 4 роки", "Крипто, Безпека", "Стартап", true, 110000, 9.1, 4),
    new Startup(9, "SkillMatch", "Платформа для підбору фахівців", "/images/ua.png", "Frontend: 1 рік, HR Tech: 2 роки", "HR, Платформи", "Стартап", true, 80000, 8.6, 2),
    new Startup(10, "EcoDrive", "Електротранспорт майбутнього", "/images/ua.png", "Battery Engineer: 3 роки", "Транспорт, Екологія", "Стартап", true, 160000, 9.3, 5),
  
    new Startup(11, "FoodSense", "Інтелектуальний аналіз якості їжі", "/images/ua.png", "AI/ML: 3 роки", "Їжа, Здоров’я", "Стартап", false, 74000, 8.2, 2),
    new Startup(12, "LegalBot", "Юридичний бот-консультант", "/images/ua.png", "NLP Engineer: 2 роки", "Право, AI", "Стартап", true, 69000, 8.8, 3),
    new Startup(13, "CityFlow", "Розумне управління міським трафіком", "/images/ua.png", "IoT Dev: 3 роки", "Інфраструктура", "Стартап", true, 98000, 9.0, 4),
    new Startup(14, "ArtiKids", "AR-ігри для навчання дітей", "/images/ua.png", "AR Dev: 2 роки, Game Designer: 2 роки", "Освіта, Розваги", "Стартап", false, 67000, 8.3, 2),
    new Startup(15, "MindEase", "Ментальне здоров’я через гейміфікацію", "/images/ua.png", "React Native: 2 роки", "Психологія", "Стартап", true, 77000, 9.2, 5),
    new Startup(16, "ShopSmart", "Рекомендаційна система для покупок", "/images/ua.png", "Data Analyst: 2 роки", "E-commerce, AI", "Стартап", true, 85000, 8.9, 4),
    new Startup(17, "SmartBuild", "Інтелектуальне управління будівництвом", "/images/ua.png", "Project Manager: 5 років", "Будівництво, IoT", "Стартап", false, 100000, 8.5, 2),
    new Startup(18, "FitAI", "Індивідуальні фітнес-плани", "/images/ua.png", "Fitness Coach: 3 роки, AI Dev: 2 роки", "Спорт, Здоров’я", "Стартап", true, 69000, 9.0, 3),
    new Startup(19, "TransLex", "Автоматичний перекладач для мітингів", "/images/ua.png", "Voice ML: 3 роки", "Комунікація, NLP", "Стартап", true, 91000, 9.4, 6),
    new Startup(20, "HomeSafe", "Безпека для розумних будинків", "/images/ua.png", "IoT Engineer: 3 роки, App Dev: 2 роки", "Безпека, SmartHome", "Стартап", false, 88000, 8.7, 3),
  
    new Startup(21, "DocuMind", "Автоматизація юридичних документів", "/images/ua.png", "GPT Fine-Tuner: 2 роки", "AI, Юриспруденція", "Стартап", true, 94000, 9.1, 4),
    new Startup(22, "NanoMed", "Медичні нанотехнології", "/images/ua.png", "NanoEng: 5 років", "Біотех", "Стартап", false, 150000, 8.9, 2),
    new Startup(23, "ArtNet", "Мережа цифрових художників", "/images/ua.png", "Blockchain Dev: 2 роки", "Мистецтво, Web3", "Стартап", true, 72000, 8.6, 3),
    new Startup(24, "JobSnap", "Сервіс відео-резюме", "/images/ua.png", "Frontend: 1 рік", "Рекрутинг, Відео", "Стартап", true, 64000, 8.4, 2),
    new Startup(25, "GameTrain", "Онлайн-академія для геймдеву", "/images/ua.png", "Unity Dev: 2 роки, Mentor: 3 роки", "Освіта, Геймінг", "Стартап", true, 78000, 9.0, 5),
    new Startup(26, "AirLogix", "Аналітика якості повітря", "/images/ua.png", "Sensor Engineer: 2 роки", "Екологія, IoT", "Стартап", false, 72000, 8.3, 1),
    new Startup(27, "SkillBoost", "Мікронавчання для IT-фахівців", "/images/ua.png", "LMS Dev: 3 роки", "Освіта, HR", "Стартап", true, 87000, 9.1, 3),
    new Startup(28, "TimeForge", "AI-аналітика продуктивності команди", "/images/ua.png", "Analytics Dev: 3 роки", "Менеджмент, AI", "Стартап", true, 92000, 9.2, 4),
    new Startup(29, "FarmBot", "Автоматизовані агро-роботи", "/images/ua.png", "Robotics: 4 роки", "Агро, Робототехніка", "Стартап", true, 135000, 9.3, 4),
    new Startup(30, "MuseAI", "AI-композитор для саундтреків", "/images/ua.png", "Sound AI: 2 роки", "Музика, AI", "Стартап", true, 69000, 8.9, 3),
  ];
  
  
  // Примірники коментарів
  const rewievs = [
    // GreenTech (startups[0], id = 1)
    new Rewiev(1, "Класний проект! Хотів би приєднатися.", 9, users[3], 1, "2025-05-26T14:35:00Z"),
    new Rewiev(2, "Дуже актуальна тема, екологія зараз на часі.", 10, users[1], 1, "2025-05-25T10:20:00Z"),
    new Rewiev(3, "Цікаво, як реалізували сенсори. Молодці!", 8, users[5], 1, "2025-05-24T16:00:00Z"),
    new Rewiev(4, "Хотілось би більше деталей про стек технологій.", 7, users[0], 1, "2025-05-23T09:50:00Z"),
    new Rewiev(5, "Зроблено якісно! Вражає рівень підготовки.", 9, users[9], 1, "2025-05-22T18:30:00Z"),
  
    // MedAI (startups[1], id = 2)
    new Rewiev(6, "Штучний інтелект у медицині — це майбутнє!", 10, users[2], 2, "2025-05-26T11:00:00Z"),
    new Rewiev(7, "Я працюю у цій сфері — крута ідея!", 9, users[6], 2, "2025-05-25T15:45:00Z"),
    new Rewiev(8, "Хотілося б бачити демо продукту.", 8, users[4], 2, "2025-05-24T08:15:00Z"),
    new Rewiev(9, "Впровадження AI потребує більше тестів.", 7, users[0], 2, "2025-05-23T13:10:00Z"),
    new Rewiev(10, "Прям як в серіалі, тільки по-справжньому!", 9, users[7], 2, "2025-05-22T19:05:00Z"),
  
    // AgroVision (startups[2], id = 3)
    new Rewiev(11, "Сільське господарство з ІТ? Це новий рівень!", 9, users[3], 3, "2025-05-26T13:00:00Z"),
    new Rewiev(12, "Маю досвід у IoT, було б цікаво приєднатися.", 8, users[5], 3, "2025-05-25T17:20:00Z"),
    new Rewiev(13, "Мене цікавить, як працює частина з аналітикою.", 7, users[8], 3, "2025-05-24T10:40:00Z"),
    new Rewiev(14, "Добре, що підтримують місцевих фермерів.", 9, users[1], 3, "2025-05-23T12:30:00Z"),
    new Rewiev(15, "Можна ще додати телеметрію ґрунту.", 8, users[9], 3, "2025-05-22T14:10:00Z"),
  
    // Langify (startups[3], id = 4)
    new Rewiev(16, "Клас! Автоматичне навчання мов — це зручно.", 10, users[6], 4, "2025-05-26T08:45:00Z"),
    new Rewiev(17, "Я б протестував API. Це має потенціал.", 9, users[0], 4, "2025-05-25T09:30:00Z"),
    new Rewiev(18, "Багатомовна підтримка — must have сьогодні.", 10, users[2], 4, "2025-05-24T16:20:00Z"),
    new Rewiev(19, "Важливо знати, які мови підтримуються.", 8, users[7], 4, "2025-05-23T11:15:00Z"),
    new Rewiev(20, "Якщо буде підтримка української — точно спробую.", 9, users[1], 4, "2025-05-22T13:55:00Z"),
  
    // FinNest (startups[4], id = 5)
    new Rewiev(21, "Фінансова грамотність — критично важлива.", 9, users[4], 5, "2025-05-26T07:30:00Z"),
    new Rewiev(22, "Було б круто додати інтеграцію з банками.", 8, users[3], 5, "2025-05-25T14:10:00Z"),
    new Rewiev(23, "Чудовий дизайн, все інтуїтивно.", 10, users[6], 5, "2025-05-24T10:00:00Z"),
    new Rewiev(24, "Спробував демо — працює гладко.", 9, users[9], 5, "2025-05-23T12:25:00Z"),
    new Rewiev(25, "Хотілося б ще розділ для підлітків.", 8, users[0], 5, "2025-05-22T17:40:00Z"),

    new Rewiev(26, "Дуже крута ідея! Можу допомогти з обробкою зображень.", 9, users[2], startups[5].id, "2025-05-26T15:00:00Z"),
  new Rewiev(27, "Працював над подібним проектом. Багато потенціалу!", 8, users[5], startups[5].id, "2025-05-26T15:15:00Z"),
  new Rewiev(28, "Можу запропонувати рішення для маршрутизації.", 10, users[0], startups[5].id, "2025-05-26T15:30:00Z"),
  new Rewiev(29, "Додайте трохи більше опису до технічної частини.", 7, users[1], startups[5].id, "2025-05-26T15:45:00Z"),

  new Rewiev(30, "Дуже зручна ідея для щоденника! Має майбутнє.", 8, users[3], startups[6].id, "2025-05-26T16:00:00Z"),
  new Rewiev(31, "Хотів би інтегрувати систему в клініку, над якою працюю.", 9, users[7], startups[6].id, "2025-05-26T16:15:00Z"),
  new Rewiev(32, "Було б добре додати API для мобільного застосунку.", 7, users[9], startups[6].id, "2025-05-26T16:30:00Z"),
  new Rewiev(33, "Непоганий UX, але інтерфейс трохи застарілий.", 6, users[4], startups[6].id, "2025-05-26T16:45:00Z"),

  new Rewiev(34, "Нарешті з’явився стартап, що реально дбає про безпеку.", 10, users[8], startups[7].id, "2025-05-26T17:00:00Z"),
  new Rewiev(35, "Хочу допомогти з аудитом безпеки!", 9, users[6], startups[7].id, "2025-05-26T17:15:00Z"),
  new Rewiev(36, "Криптографічна частина потребує уточнень.", 7, users[2], startups[7].id, "2025-05-26T17:30:00Z"),
  new Rewiev(37, "Продукт виглядає надзвичайно перспективно!", 9, users[1], startups[7].id, "2025-05-26T17:45:00Z"),

  new Rewiev(38, "Мені подобається підхід до HR. Дуже зручно!", 9, users[3], startups[8].id, "2025-05-26T18:00:00Z"),
  new Rewiev(39, "Шукав щось подібне для свого відділу.", 8, users[0], startups[8].id, "2025-05-26T18:15:00Z"),
  new Rewiev(40, "Було б класно бачити інтеграцію з LinkedIn.", 7, users[6], startups[8].id, "2025-05-26T18:30:00Z"),
  new Rewiev(41, "Гарна ідея, але трохи нестача фільтрів пошуку.", 6, users[7], startups[8].id, "2025-05-26T18:45:00Z"),

  new Rewiev(42, "Супер задум. Підтримую розвиток електротранспорту!", 10, users[5], startups[9].id, "2025-05-26T19:00:00Z"),
  new Rewiev(43, "Є досвід з акумуляторними системами, можу приєднатися.", 9, users[4], startups[9].id, "2025-05-26T19:15:00Z"),
  new Rewiev(44, "Чудова ініціатива. Готовий інвестувати час і знання.", 9, users[9], startups[9].id, "2025-05-26T19:30:00Z"),
  new Rewiev(45, "Надто загальний опис, додайте технічні деталі.", 6, users[8], startups[9].id, "2025-05-26T19:45:00Z"),

  new Rewiev(46, "Сервіс дуже зручний, інтерфейс інтуїтивний!", 9, users[0], startups[10].id, "2025-05-26T10:00:00Z"),
  new Rewiev(47, "Ідея супер, але трохи сируватий функціонал.", 7, users[2], startups[10].id, "2025-05-26T11:20:00Z"),
  new Rewiev(48, "Цікаве застосування AI в харчуванні!", 8, users[4], startups[10].id, "2025-05-26T12:45:00Z"),

  new Rewiev(49, "Нарешті юридичний бот, який реально допомагає!", 10, users[1], startups[11].id, "2025-05-26T13:10:00Z"),
  new Rewiev(50, "Потрібно більше мов підтримки.", 8, users[5], startups[11].id, "2025-05-26T13:45:00Z"),
  new Rewiev(51, "Інтерфейс трохи застарілий, але функціонал окей.", 7, users[6], startups[11].id, "2025-05-26T14:30:00Z"),

  new Rewiev(52, "Працює як годинник, дуже корисно в мегаполісі.", 9, users[7], startups[12].id, "2025-05-26T14:35:00Z"),
  new Rewiev(53, "Не вистачає аналітики в реальному часі.", 6, users[8], startups[12].id, "2025-05-26T15:10:00Z"),
  new Rewiev(54, "Ідеально для муніципалітетів.", 10, users[9], startups[12].id, "2025-05-26T15:30:00Z"),

  new Rewiev(55, "Мої діти просто в захваті від AR-уроків!", 10, users[3], startups[13].id, "2025-05-26T16:00:00Z"),
  new Rewiev(56, "AR трохи лагав на Android, але загалом — супер.", 8, users[0], startups[13].id, "2025-05-26T16:15:00Z"),
  new Rewiev(57, "Освітній контент на високому рівні.", 9, users[2], startups[13].id, "2025-05-26T16:45:00Z"),

  new Rewiev(58, "Ідеальне поєднання гейміфікації і терапії.", 10, users[1], startups[14].id, "2025-05-26T17:05:00Z"),
  new Rewiev(59, "Трішки задорогий преміум доступ.", 7, users[4], startups[14].id, "2025-05-26T17:30:00Z"),
  new Rewiev(60, "Зручний додаток, класний UI.", 9, users[6], startups[14].id, "2025-05-26T18:00:00Z"),

  new Rewiev(61, "Справді допомагає знаходити цікаві товари.", 8, users[5], startups[15].id, "2025-05-26T18:30:00Z"),
  new Rewiev(62, "Рекомендації часом не зовсім доречні.", 6, users[7], startups[15].id, "2025-05-26T18:55:00Z"),
  new Rewiev(63, "Працює краще за Amazon!", 9, users[8], startups[15].id, "2025-05-26T19:10:00Z"),

  new Rewiev(64, "Справжня революція в будівництві.", 10, users[9], startups[16].id, "2025-05-26T19:30:00Z"),
  new Rewiev(65, "Хотілося б бачити більше інтеграцій з CRM.", 7, users[3], startups[16].id, "2025-05-26T20:00:00Z"),
  new Rewiev(66, "Чудова підтримка і документація.", 8, users[2], startups[16].id, "2025-05-26T20:30:00Z"),

  new Rewiev(67, "Мій фітнес прогрес — просто космос!", 10, users[0], startups[17].id, "2025-05-26T21:00:00Z"),
  new Rewiev(68, "Бракує індивідуального підходу у free-версії.", 7, users[4], startups[17].id, "2025-05-26T21:30:00Z"),
  new Rewiev(69, "AI досить точно прогнозує навантаження.", 9, users[6], startups[17].id, "2025-05-26T21:45:00Z"),

  new Rewiev(70, "Реальний прорив у синхронному перекладі!", 10, users[1], startups[18].id, "2025-05-26T22:00:00Z"),
  new Rewiev(71, "Треба краще обробляти акценти.", 6, users[5], startups[18].id, "2025-05-26T22:25:00Z"),
  new Rewiev(72, "Працює навіть у шумному середовищі!", 9, users[8], startups[18].id, "2025-05-26T22:45:00Z"),

  new Rewiev(73, "Супер! Нарешті щось для розумного дому й безпеки.", 9, users[2], startups[19].id, "2025-05-26T23:00:00Z"),
  new Rewiev(74, "Налаштування складне для новачків.", 6, users[3], startups[19].id, "2025-05-26T23:20:00Z"),
    new Rewiev(75, "Дуже швидке реагування системи!", 8, users[7], startups[19].id, "2025-05-26T23:45:00Z"),
  
    new Rewiev(76, "Юридична автоматизація — це майбутнє. Дуже зручне рішення!", 9, users[2], startups[20].id, "2025-05-26T15:10:00Z"),
    new Rewiev(77, "DocuMind справді економить час. Мені сподобалось!", 8, users[6], startups[20].id, "2025-05-26T16:05:00Z"),
  
    new Rewiev(78, "NanoMed вражає. Цікава реалізація нанотехнологій!", 10, users[4], startups[21].id, "2025-05-26T17:20:00Z"),
    new Rewiev(79, "Технологія крута, але презентація могла бути кращою.", 7, users[0], startups[21].id, "2025-05-26T17:45:00Z"),
  
    new Rewiev(80, "Це справжній рай для діджитал художників!", 9, users[1], startups[22].id, "2025-05-26T18:10:00Z"),
    new Rewiev(81, "ArtNet має потенціал, але варто покращити інтерфейс.", 6, users[7], startups[22].id, "2025-05-26T18:50:00Z"),
  
    new Rewiev(82, "Дуже класна ідея! Відео-резюме — це щось новеньке!", 8, users[5], startups[23].id, "2025-05-26T19:20:00Z"),
    new Rewiev(83, "Зручна система запису відео прямо в браузері.", 9, users[8], startups[23].id, "2025-05-26T19:45:00Z"),
  
    new Rewiev(84, "GameTrain — ідеальний варіант для новачків у геймдеві!", 10, users[9], startups[24].id, "2025-05-26T20:05:00Z"),
    new Rewiev(85, "Круті ментори і практичні завдання. Раджу!", 9, users[2], startups[24].id, "2025-05-26T20:30:00Z"),
  
    new Rewiev(86, "Дуже потрібна річ у великих містах. Підтримую ідею!", 9, users[1], startups[25].id, "2025-05-26T12:15:00Z"),
  new Rewiev(87, "Круто, але цікаво, як реалізована точність сенсорів.", 8, users[5], startups[25].id, "2025-05-26T13:00:00Z"),
  new Rewiev(88, "Хотів би протестувати на своєму проєкті в селі.", 10, users[8], startups[25].id, "2025-05-26T14:00:00Z"),

  new Rewiev(89, "Гарна платформа! Допомагає вчитися без води.", 9, users[0], startups[26].id, "2025-05-26T12:30:00Z"),
  new Rewiev(90, "Було б круто інтегрувати з LinkedIn.", 7, users[7], startups[26].id, "2025-05-26T13:45:00Z"),
  new Rewiev(91, "Недостатньо матеріалу по Frontend 😢", 6, users[6], startups[26].id, "2025-05-26T14:20:00Z"),

  new Rewiev(92, "Нарешті хтось подумав про тайм-трекінг з мозком!", 10, users[2], startups[27].id, "2025-05-26T10:10:00Z"),
  new Rewiev(93, "Хочу інтеграцію з Notion!", 8, users[4], startups[27].id, "2025-05-26T11:50:00Z"),
  new Rewiev(94, "Можна було б зробити графік настрою команди 😄", 9, users[9], startups[27].id, "2025-05-26T12:40:00Z"),

  new Rewiev(95, "Автоферма? Це вже майбутнє! 🔥", 10, users[1], startups[28].id, "2025-05-26T13:10:00Z"),
  new Rewiev(96, "Цікаво, як реагує на погодні умови.", 7, users[3], startups[28].id, "2025-05-26T14:05:00Z"),
  new Rewiev(97, "Рекомендую! Використовуємо в нашому кооперативі.", 9, users[5], startups[28].id, "2025-05-26T15:00:00Z"),

  new Rewiev(98, "Генерація саундтреків — це новий рівень!", 9, users[2], startups[29].id, "2025-05-26T13:30:00Z"),
  new Rewiev(99, "Можна використовувати для подкастів?", 8, users[6], startups[29].id, "2025-05-26T14:15:00Z"),
  new Rewiev(100, "Супер, зекономив купу часу на музику до гри!", 10, users[0], startups[29].id, "2025-05-26T15:20:00Z")
];
  
  
const chats = [
  new Chat(1, "Frontend Team", "/images/ua.png", true),
  new Chat(2, "Backend Team", "/images/ua.png", true),
  new Chat(3, "One-on-One: Anya & Max", "/images/ua.png", false),
  new Chat(4, "Design Squad", "/images/ua.png", true),
  new Chat(5, "HR Chat", "/images/hr.png", false),
];

const chatMembers = [
  // Чат 0: users[0], users[1]
  new ChatMember(1, chats[0].id, users[0]),
  new ChatMember(2, chats[0].id, users[1]),

  // Чат 1: users[2], users[4]
  new ChatMember(3, chats[1].id, users[2]),
  new ChatMember(4, chats[1].id, users[4]),

  // Чат 2: users[1], users[2] — users[1] вже другий чат
  new ChatMember(5, chats[2].id, users[1]),
  new ChatMember(6, chats[2].id, users[2]),

  // Чат 3: users[3], users[6]
  new ChatMember(7, chats[3].id, users[3]),
  new ChatMember(8, chats[3].id, users[6]),

  // Чат 4: users[7], users[9]
  new ChatMember(9, chats[4].id, users[7]),
  new ChatMember(10, chats[4].id, users[9]),

  // Додатково: users[4] — вже другий чат (з чат[5])
  new ChatMember(11, chats[0].id, users[4]),
  new ChatMember(12, chats[0].id, users[5]),

  // Додатково: users[1] — третій чат (з чат[6])
  new ChatMember(13, chats[0].id, users[1]),
  new ChatMember(14, chats[0].id, users[3]),

  // Додатково: users[2] — третій чат (з чат[7])
  new ChatMember(15, chats[0].id, users[2]),
  new ChatMember(16, chats[0].id, users[8]),
];

// Генератор випадкового часу з інтервалом у хвилину
function minutesFromNowRandom(daysBack = 30) {
  const now = new Date();
  const randomDays = Math.floor(Math.random() * daysBack); // 0 - daysBack
  const randomMinutes = Math.floor(Math.random() * 1440);  // 0 - 1439 хвилин у добі
  now.setDate(now.getDate() - randomDays);
  now.setMinutes(now.getMinutes() - randomMinutes);
  return now;
}

// Повідомлення
const sampleTexts = [
  "Привіт!", "Як справи?", "Глянь, будь ласка, таску", "Апрувни PR 🙏", "На мітингу будемо всі?",
  "Можна трохи згодом", "Готово 🚀", "Перевір код", "Це ж фронтенд?", "Я з мобільного",
  "Чат живий?", "Фігма оновлена", "Це важливо", "Буде демо?", "Не забудьте стендап",
  "Я взяв задачу", "Хто QA?", "Це баг чи фіча?", "Рестартніть сервер", "Обід хто де?",
  "Звіт згенерував", "Створив білд", "Оновив доку", "Пушнув в `main`", "Готово до релізу",
  "Якого хера блять ргр з ООП не готова ще", "Пітчинг через 15 хв", "Ретро перенесли", "Я пішов за кавою"
];

// Генерація
const messages = [];
const TOTAL_MESSAGES = 100; // змінюй кількість тут

for (let i = 0; i < TOTAL_MESSAGES; i++) {
  const id = i + 1;
  const chatMember = chatMembers[i % chatMembers.length]; // циклічно
  const chatId = chatMember.chatId;
  const sentAt = minutesFromNowRandom(30); // до 30 днів назад
  const text = sampleTexts[Math.floor(Math.random() * sampleTexts.length)];

  messages.push(new Message(id, chatMember, chatId, sentAt, text));
}
  
  export { users, startups, rewievs, chats, chatMembers, messages };