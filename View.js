const readlineSync = require('readline-sync');
const Model = require('./Model');

class View {
  renderSelectTopicPage(themes) {
    // нам пришёл список тем, нужно вывести их на экран
    // здесь твой код...
    themes.forEach((item, i) => console.log(`${i + 1}. ${item}`));

    // затем даём пользователю возможность выбрать тему
    const topic = readlineSync.question('Введите тему: ');

    // и возвращаем контроллеру выбранную тему
    return topic;
  }

  renderCurrentQuestion(question) {
    console.log(question.name, '\n');

    const answer = readlineSync.question('> ');

    return answer;
  }

  renderRight() {
    console.log('right!');
  }

  renderWrong() {
    console.log('wrong!');
  }

  renderResult(result) {
    console.log();
    console.log(`Your final score is ${result} / 100`);
  }
}

module.exports = View;
