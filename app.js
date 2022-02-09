const container = document.getElementById('root');
const content = document.createElement('div');

const ajax = new XMLHttpRequest();
const NEWS_URL = 'https://api.hnpwa.com/v0/news/1.json';
const CONTENT_URL = 'https://api.hnpwa.com/v0/item/@id.json';

ajax.open('GET', NEWS_URL, false);
ajax.send();

const newsFeed = JSON.parse(ajax.response);
const ul = document.createElement('ul');

window.addEventListener('hashchange', () => {
  const id = location.hash.substr(1);
  ajax.open('GET', CONTENT_URL.replace('@id', id), false);
  ajax.send();

  const newsContent = JSON.parse(ajax.response);
  const title = document.createElement('h1');

  title.innerHTML = newsContent.title;

  content.appendChild(title);
  console.log(newsContent);
});

for (let i = 0; i < newsFeed.length; i++) {
  const li = document.createElement('li');
  const a = document.createElement('a');
  // <li><a></a></li>
  a.href = `#${newsFeed[i].id}`;
  a.innerHTML = `${newsFeed[i].title} (댓글: ${newsFeed[i].comments_count})`;

  // a.addEventListener('click', () => {})

  li.appendChild(a);
  ul.appendChild(li);
}

document.getElementById('root').appendChild(ul);
document.getElementById('root').appendChild(content);
