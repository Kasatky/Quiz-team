const fs = require('fs');

class Model {
  #page = 'select-topic';
  #topics = [];
  #questions = [];
  #right = 0;

  importTopics() {
    fs.readdirSync(`./topics`, 'utf-8')
      .map(file => file.slice(0, -4))
      .forEach(item => this.#topics.push(item));
  }

  importQuestions(topic) {
    let array = fs
      .readFileSync(`./topics/${topic}.txt`, 'utf-8')
      .split('\n')
      .filter(item => item !== '');

    for (let i = 0; i < array.length; i += 2) {
      let object = {name : array[i], answer: array[i + 1]};
      this.#questions.push(object);
    }
  }

  getQuestions() {
    return this.#questions;
  }

  getTopics() {
    return this.#topics;
  }

  getPage() {
    return this.#page;
  }

  getRightAnswers() {
    return this.#right;
  }
  
  setRightAnswers(result) {
    this.#right = result;
  }

  chooseTopic(num) {
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
