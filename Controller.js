class Controller {
  #model;
  #view;

  constructor(model, view) {
    this.#model = model;
    this.#view = view;
  }

  run() {
    const model = this.#model;
    const view = this.#view;

    switch (model.getPage()) {
      case 'select-topic': {
        model.importTopics();
        const topics = model.getTopics();
        const numTopic = view.renderSelectTopicPage(topics);
        const topic = model.chooseTopic(numTopic);
        model.importQuestions(topic);
        model.stopSelect();
        return this.run();
      }

      case 'questions': {
        let rightAnswers = 0;
        const questions = model.getQuestions();
        questions.forEach(question => {
          let answer = view.renderCurrentQuestion(question);
          if (answer === question.answer) {
            rightAnswers++;
            view.renderRight();
          } else {
            view.renderWrong();
          }
        })
        model.setRightAnswers(rightAnswers);
        model.stopQuestions();
        return this.run();
      }

      case 'results': {
        let rightAnswers = model.getRightAnswers();
        let questions = model.getQuestions();
        let result = Math.ceil(rightAnswers / questions.length * 100);
        view.renderResult(result);
        view.renderRightAnswers(questions);
        model.stopQuiz();
        return this.run();
      }
      
      case 'stop': {
        console.log('The end!');
        break;
      }
    }
  }
}

module.exports = Controller;
