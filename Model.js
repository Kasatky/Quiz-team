const { EventEmitter } = require('events');
const fs = require('fs');

class Model {
  // Сначала приложение находится на стартовой странице выбора темы.
  // Подумай, какие ещё страницы будут в твоём приложении?
  #page = 'select-topic';
  #topics = [];
  #questions = [];
  #right = 0;
  #currentQuestion;

  getQuestions() {
    return this.#questions;
  }

  getTopics() {
    return this.#topics;
  }

  importTopics() {
    let data = fs.readdirSync(`./topics`, 'utf-8');
    data.map(file => file.slice(0, -4)).forEach(item => this.#topics.push(item));
  }

  importQuestions(topic) {
    let data = fs.readFileSync(`./topics/${topic}.txt`, 'utf-8');
    let array = data.split('\n').filter(item => item !== '');

    for (let i = 0; i < array.length; i += 2) {
      let object = {name : array[i], answer: array[i + 1]};
      this.#questions.push(object);
    }
  }

  setRightAnswers(result) {
    this.#right = result;
  }

  getRightAnswers() {
    return this.#right;
  }
  // Подумай какие данные будут нужны View, чтобы рендерить эти страницы.
  // Исходя из этих данных определись какие поля будет содержать модель.

  getPage() {
    return this.#page;
  }

  chooseTopic(num) {
    // Тема выбрана, сделай необходимые изменения в модели (в т.ч. измени this.page).
    // Чтобы сделать эти изменения подумай какая следующая страница будет отображена
    // и какие данные нужны View, чтобы отрендерить эту страницу
    // ...
    return this.#topics[num - 1];
  }

  stopSelect() {
    this.#page = 'questions';
  }

  stopQuestions() {
    this.#page = 'results';
  }

  stopQuiz() {
    this.#page = 'stop';
  }
}

module.exports = Model;
