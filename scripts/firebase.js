var config = {
  apiKey: "AIzaSyBM5UCP8nKL8NMrNIsBznm1qBow26xBF-c",
  authDomain: "personalportfolio-1ca58.firebaseapp.com",
  databaseURL: "https://personalportfolio-1ca58.firebaseio.com",
  projectId: "personalportfolio-1ca58",
  storageBucket: "personalportfolio-1ca58.appspot.com",
  messagingSenderId: "350713099700"
};

firebase.initializeApp(config);

var limit = 1;
var count = 0;
var trueData = 1;
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
  });

function producer() {
  console.log(count, trueData);
  if (count === trueData && flag) {
    for (var i in articles) {
      createArticle(articles[i].id, articles[i].published, articles[i].data)
    }
    flag = false
  }
}

function showError(err) {
  var el = document.createElement('div');
  el.innerHTML = err.message;
  document.getElementById('content').appendChild(el)
}

function createArticle(id, published, data) {
  console.log(id);
  var blog = document.createElement('div');
  var blogs = document.createElement('div');
  var title = document.createElement('h1');
  var body = document.createElement('p');
  var byline = document.createElement('span');
  title.innerHTML = data.title;
  body.innerHTML = data.body;
  byline.innerHTML = new Date(published);

  blog.innerHTML =  '<div class="panel-heading">' +
                    '<p style="margin-top: -30px!important;" id="blogTitle"></p>' +
                    '<p style="margin-top: -30px!important; text-align: right" id="blogDate"></p>' +
                    '</div>' +
                    '<div class="panel-body">' +
                    '<p id="blogContent"></p>' +
                    '<div class="text-center panel-heading">- <a href="#">Share</a> // <a href="#">Comment</a> // <a href="#">Copy</a> -' +
                    '</div>' +
                    '</div>';

  document.getElementById('blogTitle').appendChild(title);
  document.getElementById('blogDate').appendChild(byline);
  document.getElementById('blogContent').appendChild(body);

  blogs.innerHTML = blog;

  document.getElementById('content').appendChild(blog);

}


var submitButton = document.querySelector('#submit-button');
var titleText = document.querySelector('#title');
var bodyText = document.querySelector('#body');

submitButton.addEventListener('click', function(){
  var title = titleText.value;
  var body = bodyText.value;
  var articleRef = '/article_group/';
  var articleData = {
    title: title,
    body: body,
    date_edited: firebase.database.ServerValue.TIMESTAMP,
    uid: 'user1',
    slug_name: title.replace(/\s/g, '-')
  };
  var key = firebase.database().ref(articleRef + 'article').push().key;

  var updates = {};
  updates[articleRef + 'article/' + key] = articleData;
  updates[articleRef + 'article_list/' + key] = {
    published: firebase.database.ServerValue.TIMESTAMP
  };

  return firebase.database().ref().update(updates)
    .then(function(){
      alert('Added '+ title);
    })
    .catch(function(error) {
      console.log(error);
      alert(error.message)
    });

});
