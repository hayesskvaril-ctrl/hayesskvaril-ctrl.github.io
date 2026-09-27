// Reusable multiple-choice knowledge check.
// Markup:
// <div class="quiz">
//   <div class="q" data-answer="b">
//     <p class="q-text">Question?</p>
//     <div class="q-options">
//       <button type="button" data-value="a">Option A</button>
//       <button type="button" data-value="b">Option B</button>
//     </div>
//     <p class="q-feedback" aria-live="polite"></p>
//     <p class="q-explain" hidden>Why the answer is right.</p>
//   </div>
//   <p class="quiz-score" aria-live="polite"></p>
// </div>
(function () {
  document.querySelectorAll('.quiz').forEach(function (quiz) {
    var qs = quiz.querySelectorAll('.q');
    var score = quiz.querySelector('.quiz-score');
    var answered = 0, correct = 0;

    qs.forEach(function (q) {
      var buttons = q.querySelectorAll('.q-options button');
      var feedback = q.querySelector('.q-feedback');
      var explain = q.querySelector('.q-explain');
      buttons.forEach(function (btn) {
        btn.addEventListener('click', function () {
          if (q.classList.contains('done')) return;
          q.classList.add('done');
          var right = btn.getAttribute('data-value') === q.getAttribute('data-answer');
          answered++;
          if (right) correct++;
          buttons.forEach(function (b) {
            b.disabled = true;
            if (b.getAttribute('data-value') === q.getAttribute('data-answer')) b.classList.add('is-correct');
          });
          if (!right) btn.classList.add('is-wrong');
          feedback.textContent = right ? 'Correct.' : 'Not quite.';
          feedback.className = 'q-feedback ' + (right ? 'good' : 'bad');
          if (explain) explain.hidden = false;
          if (score) {
            score.textContent = answered === qs.length
              ? 'You scored ' + correct + ' out of ' + qs.length + '.'
              : correct + ' of ' + answered + ' correct so far.';
          }
        });
      });
    });
  });
})();
