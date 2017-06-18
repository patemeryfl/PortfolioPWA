var config = {
  apiKey: "AIzaSyBM5UCP8nKL8NMrNIsBznm1qBow26xBF-c",
  authDomain: "personalportfolio-1ca58.firebaseapp.com",
  databaseURL: "https://personalportfolio-1ca58.firebaseio.com",
  projectId: "personalportfolio-1ca58",
  storageBucket: "personalportfolio-1ca58.appspot.com",
  messagingSenderId: "350713099700"
};
firebase.initializeApp(config);

var limit = 3;
var count = 0;
var trueData = 2;
var flag = true;
var articles = [];

firebase.database().ref('/article_group/article_list')
  .orderByChild('published').limitToLast(limit).startAt(1)
  .on('child_added', function(data) {

    firebase.database().ref('/article_group/article/' + data.key)
      .on('value', function(articleData) {
        count ++;
        articles.push({
          id: data.key,
          published: data.val().published,
          data: articleData.val()
        });
        articles.sort(function(a, b) {
          return a.published < b.published
        });
        producer();

      }, function(err) {
        count ++;
        showError(err);
        producer()
      });
  }, function(err) {
    alert(err);
  })

function producer() {
  console.log(count, trueData)
  if (count === trueData && flag) {
    for (var i in articles) {
      createArticle(articles[i].id, articles[i].published, articles[i].data)
    }
    flag = false
  }
}

function showError(err) {
  var el = document.createElement('div');
  el.innerHTML = err.message
  document.getElementById('content').appendChild(el)
}

function createArticle(id, published, data) {
  console.log(id)
  var el = document.createElement('div');
  var title = document.createElement('h1');
  var body = document.createElement('p');
  var byline = document.createElement('span');
  title.innerHTML = data.title;
  body.innerHTML = data.body;
  byline.innerHTML = 'id: ' + id + '<br>Date: '+ new Date(published) +'<hr>';
  el.appendChild(title)
  el.appendChild(byline)
  el.appendChild(body)
  document.getElementById('content').appendChild(el)

}

var submitButton = document.querySelector('#submit-button');
var titleText = document.querySelector('#title');
var bodyText = document.querySelector('#body');

submitButton.addEventListener('click', function(){
  var title = titleText.value;
  var body = bodyText.value;
  console.log(title, body)
});
