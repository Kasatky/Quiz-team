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
    // отображаем ту страницу, на которой мы сейчас находимся
    switch (model.getPage()) {
      case 'select-topic': {
        model.importTopics();
        const topics = model.getTopics();
        const numTopic = view.renderSelectTopicPage(topics);
        const topic = model.chooseTopic(numTopic);

        model.importQuestions(topic);

        model.stopSelect();

        //const topic = this.#view.renderSelectTopicPage(model.getTopics());
        //model.chooseTopic(topic);
        return this.run();
      }
      case 'questions': {
        const questions = model.getQuestions();
        let rightAnswers = 0;
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
        model.stopQuiz();
      }

      case 'stop': {
        console.log('The end!');
      }
      
      // ...
    }
  }
}

module.exports = Controller;
