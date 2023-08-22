// Одиночка (Singleton) — це патерн програмування, який забезпечує,

class OrderTracker {

    static #instance = null;

    static #orders = [];

    static create() {
        if (!OrderTracker.#instance) {
            OrderTracker.#instance = new OrderTracker();
        }
        return OrderTracker.#instance;
    }

    static add(item) {
        this.#orders.push(item);
    }

    static get() {
        return this.#orders;
    }
}
console.log("Завдання 1 ====================================");

const tracker = OrderTracker.create();

OrderTracker.add("Телефон");
OrderTracker.add("Ноутбук");

const orders = OrderTracker.get();

console.log(orders);






// Фабрика (Factory) — це патерн програмування, який надає загальний клас для створення об'єктів, який враховує

class Book {

    constructor(title, author, coverColor) {
        this.title = title;
        this.author = author;
        this.coverColor = coverColor;
    };

    describe() {
        return `Книга: ${this.title}, автор: ${this.author}, колір обкладинки: ${this.coverColor}`;
    }
}

class AudioBook {
    constructor(title, author, audioLength) {
        this.title = title;
        this.author = author;
        this.audioLength = audioLength;
    }

    describe() {
        return `Аудіокнига: ${this.title}, автор: ${this.author}, тривалість: ${this.audioLength}`;
    }
}

class ProductFactory {
    static TYPE = {
        BOOK: "book",
        AUDIOBOOK: "audiobook",
    }

    static createProduct(type, options) {
        switch (type) {
            case this.TYPE.BOOK:
                return new Book(options.title, options.author, options.coverColor);
            case this.TYPE.AUDIOBOOK:
                return new AudioBook(options.title, options.author, options.audioLength);
            default:
                throw new Error(`Такого типу продукту не існує: ${type}`);
        }
    }
}
console.log("Завдання 2 ====================================");

const factoryBook = ProductFactory.createProduct(ProductFactory.TYPE.BOOK, {
    title: "Назва книги",
    author: "Автор книги",
    coverColor: "Синій",
});

console.log(factoryBook.describe());

const factoryAudiobook = ProductFactory.createProduct(
    ProductFactory.TYPE.AUDIOBOOK,
    {
        title: "Назва аудіокниги",
        author: "Автор аудіокниги ",
        audioLength: "5 годин",
    }
);

console.log(factoryAudiobook.describe());

try {
    const factoryUnknown = ProductFactory.createProduct("comics", {});
} catch (error) {

    console.error(error.message);
}














// Спостерігач (Observer) — це патерн програмування, який визначає залежність "один-багато" між об'єктами, так що зміна стану одного об'єкта

class Customer {
    constructor(email) {
        this.email = email;
    }

    sendEmail(message) {
        console.log(`${this.email}: ${message}`)
    }
}

class Product {

    constructor(name) {
        this.name = name;
    }
}

class Store {
    constructor(name) {
        this.name = name;
        this.customers = [];
    }

    subscribe(customer) {
        this.customers.push(customer);
    }

    unsubscribe(customer) {
        this.customers = this.customers.filter((sub) => sub !== customer)
    }

    createProduct(name) {
        const product = new Product(name)
        this.sendNotify(product);
    }

    sendNotify(product) {
        this.customers.forEach((customer) => {
            customer.sendEmail(`Новий продукт "${product.name}" в магазині ${this.name}!`)
        })
    }
}

console.log("Завдання 3 ====================================");

const store = new Store("IT Supermarket");

const customer1 = new Customer("john@example.com");
const customer2 = new Customer("jane@example.com");
const customer3 = new Customer("alice@example.com");

store.subscribe(customer1);
store.subscribe(customer2);
store.subscribe(customer3);

store.createProduct("Новий ноутбук");

store.unsubscribe(customer1);

store.createProduct("Бездротові навушники");








// Декоратор (Decorator) — це патерн програмування, який додає нову функціональність до існуючих об'єктів, не змінюючи їхньої структури.

class Drink {
    name = "Чай";
    price = 10;

    prepare() {
        console.log(`Приготування ${this.name}`)
    }
}

class HoneyDecorator {
    constructor(drink, amount) {
        this.drink = drink;
        this.amount = amount;
    };

    get name() {
        return `${this.drink.name} з ${this.amount} г меду`;
    }

    get price() {
        const honeyPrice = 0.5;
        return this.drink.price + honeyPrice * this.amount;
    }

    prepare() {
        console.log(`Приготування ${this.name} з медом`)
    }
}
console.log("Завдання 4 ====================================");

let tea = new Drink();
console.log(tea.name); // Виводить ім'я напою
console.log(tea.price); // Виводить вартість напою
tea.prepare(); // Готує напій

let honeyTea = new HoneyDecorator(tea, 2); // Додаємо 2 грами меду
console.log(honeyTea.name); // Виводить нову назву напою
console.log(honeyTea.price); // Виводить нову вартість напою
honeyTea.prepare(); // Готує напій з медом




// Мементо (Memento) — це патерн програмування, який забезпечує збереження стану об'єкта для подальшого відновлення

class Writer {
    #content = "";

    set content(newContent) {
        this.#content = newContent;
        this.#store();
    }

    get content() {
        return this.#content
    }

    #store() {
        Version.create(this.#content);
    }

    restore() {
        this.#content = Version.restore();
    }
}

class Version {
    static #versions = [];
    constructor(content) {
        this.content = content;
    }

    static create(content) {
        this.#versions.push(content)
    }

    static restore() {
        this.#versions.pop();
        return this.#versions[this.#versions.length - 1];
    }
}
console.log("Завдання 5 ====================================");

const writer = new Writer();

writer.content = "Це початковий текст.";
writer.content = "Редагований текст.";
writer.content = "Оновлений текст.";

console.log(writer.content);

writer.restore();
console.log(writer.content);

writer.restore();
console.log(writer.content);







// Ланцюжок відповідальності (Chain of Responsibility) — це паттерн програмування, який дозволяє передавати запити послідовно через ланцюжок обробників, кожен з яких може обробити або передати запит далі.

class AuthProcessor {
    setNextProcessor(processor) {
        this.nextProcessor = processor;
        return processor;
    }

    validate(username, passkey) {
        if (this.nextProcessor) {
            return this.nextProcessor.validate(username, passkey)
        } else {
            return false;
        }
    }
}

class TwoStepProcessor extends AuthProcessor {
    validate(username, passkey) {
        if (username === "john" && passkey === "password") {
            console.log('аутентифікація успішна')
            return true;
        } else {
            super.validate(username, passkey)
        }
    }

    isValidTwoStepCode() {
        return true;
    }
}

class RoleProcessor extends AuthProcessor {
    validate(username, passkey) {
        if (username === "guest") {
            console.log("Вхід дозволено з роллю гостя")
            return true
        } else {
            return super.validate(username, passkey)
        }
    }
}

class CredentialsProcessor extends AuthProcessor {
    validate(username, passkey) {
        if (username === "admin" && passkey === "admin123") {
            console.log("Вхід дозволено за обліковими даними")
            return true
        } else {
            return super.validate(username, passkey)
        }
    }
}

class ProcessorBuilder {
    constructor() {
        this.firstProcessor = null;
        this.lastProcessor = null;
    }

    add(processor) {
        if (!this.firstProcessor) {
            this.firstProcessor = processor;
            this.lastProcessor = processor;
        } else {
            this.lastProcessor.setNextProcessor(processor);
            this.lastProcessor = processor;
        }
        return this;
    }

    create() {
        return this.firstProcessor;
    }
}
console.log("Завдання 6 ====================================");

const processorBuilder = new ProcessorBuilder();

const processor = processorBuilder
    .add(new CredentialsProcessor())
    .add(new TwoStepProcessor())
    .add(new RoleProcessor())
    .create();

processor.validate("admin", "admin123"); // Вхід дозволено за обліковими даними
processor.validate("john", "password"); // Вхід дозволено з двоступінчастою аутентифікацією
processor.validate("guest", "guest123"); // Вхід дозволено з роллю гостя
processor.validate("user", "password"); // Вхід заборонено






// Міст (Bridge) — це паттерн програмування, який дозволяє розмістити абстракцію і реалізацію в окремі класи, дозволяючи їм мати незалежний функціонал
class Participant {
    constructor(alias, communicator) {
        this.alias = alias;
        this.communicator = communicator;
    }

    dispatchMessage(text) {
        const message = this.prepareMessage(text);
        this.communicator.transmit(message);
    }

    prepareMessage(text) {
        return `[${this.alias}]: ${text}`;
    }
}

class SMSCommunicator {
    static transmit(message) {
        console.log(`Відправлено SMS: ${message}`)
    }
}

class EmailCommunicator {
    static transmit(message) {

        console.log(`Відправлено Email: ${message}`)
    }
}

console.log("Завдання 7 ====================================");
const max = new Participant("Max", SMSCommunicator);
const linda = new Participant("Linda", EmailCommunicator);

max.dispatchMessage("Hello!"); // Виведе: Відправлено SMS: [Max]: Hello!

linda.dispatchMessage("Hello123!"); // Виведе: Відправлено Email: [Linda]: Hello!