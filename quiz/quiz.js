//inisiasi soal dalam quiz
const questions = [
  {
    question: 'Danau Toba terletak di Provinsi?',
    optionA: 'Sulawesi Utara',
    optionB: 'Sumatera Barat',
    optionC: 'Sumatera Selatan',
    optionD: 'Sumatera Utara',
    correctOption: 'optionD',
  },

  {
    question: 'Bika Ambon adalah makanan khas yang berasal dari?',
    optionA: 'Ambon',
    optionB: 'Medan',
    optionC: 'Bandung',
    optionD: 'Samarinda',
    correctOption: 'optionB',
  },

  {
    question: 'Candi Prambanan berada di?',
    optionA: 'Bandung ',
    optionB: 'Yogyakarta',
    optionC: 'Bali',
    optionD: 'Jayapura',
    correctOption: 'optionB',
  },

  {
    question: '______ merupakan makanan khas dari Samarinda.',
    optionA: 'Papeda',
    optionB: 'Ikan Arsik',
    optionC: 'Lempok Durian',
    optionD: 'Rendang',
    correctOption: 'optionC',
  },

  {
    question: 'Desa Skow merupakan salah satu tempat wisata di daerah?',
    optionA: 'Bandung',
    optionB: 'Yogyakarta',
    optionC: 'Jakarta',
    optionD: 'Jayapura',
    correctOption: 'optionD',
  },

  {
    question: 'Taman Nasional Gunung Gede Pangrango terletak di?',
    optionA: 'Bogor',
    optionB: 'Bandung',
    optionC: 'Medan',
    optionD: 'Sulawesi',
    correctOption: 'optionA',
  },

  {
    question: 'Salah satu tempat terkenal di _____ adalah Monumen Nasional.',
    optionA: 'Samarinda',
    optionB: 'Bogor',
    optionC: 'Jakarta',
    optionD: 'Aceh',
    correctOption: 'optionC',
  },

  {
    question: 'Taman Bungkul terletak di?',
    optionA: 'Surabaya',
    optionB: 'Medan',
    optionC: 'Samarinda',
    optionD: 'Aceh',
    correctOption: 'optionA',
  },

  {
    question: 'Tempoyang adalah makanan khas dari _____ yang terbuat dari olahan durian.',
    optionA: 'Bandung',
    optionB: 'Siantar',
    optionC: 'Palembang',
    optionD: 'Lampung',
    correctOption: 'optionD',
  },

  {
    question: 'Dunia Fantasi berada di kota?',
    optionA: 'Palembang',
    optionB: 'Banyuwangi',
    optionC: 'Jambi',
    optionD: 'Jakarta',
    correctOption: 'optionD',
  },

  {
    question: 'Kawah Ijen adalah wisata yang berada di?',
    optionA: 'Lampung',
    optionB: 'Jakarta',
    optionC: 'Banyuwangi',
    optionD: 'Medan',
    correctOption: 'optionC',
  },

  {
    question: 'Salah satu gunung yang paling terkenal di _____ adalah Gunung Rinjani.',
    optionA: 'Lombok',
    optionB: 'Lampung',
    optionC: 'Sibolga',
    optionD: 'Palembang',
    correctOption: 'optionA',
  },

  {
    question: 'Seblak merupakan olahan makanan yang berasal dari?',
    optionA: 'Medan',
    optionB: 'Bandung',
    optionC: 'Jayapura',
    optionD: 'Lampung',
    correctOption: 'optionB',
  },
];

let shuffledQuestions = []; //array kosong untuk menampung pertanyaan yang dipilih secara acak

function handleQuestions() {
  while (shuffledQuestions.length <= 9) {
    const random = questions[Math.floor(Math.random() * questions.length)];
    if (!shuffledQuestions.includes(random)) {
      shuffledQuestions.push(random);
    }
  }
}

let questionNumber = 1;
let userScore = 0;
let wrongAttempt = 0;
let indexNumber = 0;

// fungsi untuk menampilkan pertanyaan berikutnya dalam array
function NextQuestion(index) {
  handleQuestions();
  const currentQuestion = shuffledQuestions[index];
  document.getElementById('numberof-question').innerHTML = questionNumber;
  document.getElementById('user-result').innerHTML = userScore;
  document.getElementById('quiz-display').innerHTML = currentQuestion.question;
  document.getElementById('choices-one-label').innerHTML = currentQuestion.optionA;
  document.getElementById('choices-two-label').innerHTML = currentQuestion.optionB;
  document.getElementById('choices-three-label').innerHTML = currentQuestion.optionC;
  document.getElementById('choices-four-label').innerHTML = currentQuestion.optionD;
}

function checkForAnswer() {
  const currentQuestion = shuffledQuestions[indexNumber]; // mendapatkan pertanyaan
  const currentQuestionAnswer = currentQuestion.correctOption; // mendapatkan jawaban
  const options = document.getElementsByName('option');
  let correctOption = null;

  options.forEach((option) => {
    if (option.value === currentQuestionAnswer) {
      correctOption = option.labels[0].id;
    }
  });

  // fungsi untuk memeriksa opsi telah dipilih
  if (options[0].checked === false && options[1].checked === false && options[2].checked === false && options[3].checked == false) {
    document.getElementById('choice-modal').style.display = 'flex';
  }

  // fungsi untuk memeriksa apakah tombol yang dipilih sama dengan jawaban
  options.forEach((option) => {
    if (option.checked === true && option.value === currentQuestionAnswer) {
      document.getElementById(correctOption).style.backgroundColor = 'green';
      userScore++;
      indexNumber++;

      setTimeout(() => {
        questionNumber++;
      }, 1000);
    } else if (option.checked && option.value !== currentQuestionAnswer) {
      const wrongLabelId = option.labels[0].id;
      document.getElementById(wrongLabelId).style.backgroundColor = 'red';
      document.getElementById(correctOption).style.backgroundColor = 'green';
      wrongAttempt++;
      indexNumber++;

      setTimeout(() => {
        questionNumber++;
      }, 1000);
    }
  });
}

function handleNextQuestion() {
  checkForAnswer();
  unCheckRadioButtons();

  setTimeout(() => {
    if (indexNumber <= 9) {
      NextQuestion(indexNumber);
    } else {
      handleEndGame();
    }
    resetOptionBackground();
  }, 1000);
}

// fungsi untuk mengatur background opsi kembali ke nol setelah menampilkan warna yang benar/salah
function resetOptionBackground() {
  const options = document.getElementsByName('option');
  options.forEach((option) => {
    document.getElementById(option.labels[0].id).style.backgroundColor = '';
  });
}

function unCheckRadioButtons() {
  const options = document.getElementsByName('option');
  for (let i = 0; i < options.length; i++) {
    options[i].checked = false;
  }
}

// fungsi ketika semua pertanyaan dijawab
function handleEndGame() {
  let comment = null;
  let commentColor = null;

  // cek kondisi untuk skor pengguna dan komentar
  if (userScore <= 4) {
    comment = 'Yahh belum berhasil. Semangat berlatih yaa!';
    commentColor = 'red';
  } else if (userScore >= 5 && userScore < 7) {
    comment = 'Bagus, tetap semangat berlatih.';
    commentColor = 'orange';
  } else if (userScore >= 7) {
    comment = 'Mantap, berhasil menyelesaikan quiz dengan baik!';
    commentColor = 'green';
  }
  const userResults = (userScore / 10) * 100;

  //data untuk ditampilkan ke papan skor
  document.getElementById('commentar').innerHTML = comment;
  document.getElementById('commentar').style.color = commentColor;
  document.getElementById('total-results').innerHTML = userResults;
  document.getElementById('wrong').innerHTML = wrongAttempt;
  document.getElementById('right').innerHTML = userScore;
  document.getElementById('result').style.display = 'flex';
}

//menutup modal skor dan mengatur ulang quiz
function closeScoreModal() {
  questionNumber = 1;
  userScore = 0;
  wrongAttempt = 0;
  indexNumber = 0;
  shuffledQuestions = [];
  NextQuestion(indexNumber);
  document.getElementById('result').style.display = 'none';
}

//fungsi untuk menutup choice modal
function closeOptionModal() {
  document.getElementById('choice-modal').style.display = 'none';
}
