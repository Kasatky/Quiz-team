const readlineSync = require('readline-sync');

class View {
  renderSelectTopicPage(themes) {
    themes.forEach((item, i) => console.log(`${i + 1}. ${item}`));
    const topic = readlineSync.question('Введите тему: ');
    return topic;
  }

  renderCurrentQuestion(question) {
    console.log();
    console.log(question.name);
    const answer = readlineSync.question('> ');
    return answer;
  }

  renderRight() {
    console.log('👍');
  }

  renderWrong() {
    console.log('👎');
  }

  renderResult(result) {
    console.log('--------------------------------------');
    console.log('--------------------------------------');
    console.log(`Your final score is ${result} / 100`);
    console.log('--------------------------------------');
    console.log('--------------------------------------');
    console.log('---------Right Answers----------------')
  }

  renderRightAnswers(questions) {
    questions.forEach((item, i) => console.log(`${i + 1} - ${item.answer}`));
  }
}

module.exports = View;
