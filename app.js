const container = document.getElementById('root');
const content = document.createElement('div');

const ajax = new XMLHttpRequest();
const NEWS_URL = 'https://api.hnpwa.com/v0/news/1.json';
const CONTENT_URL = 'https://api.hnpwa.com/v0/item/@id.json';

// 공유되는 자원
const store = {
  currentPage: 1,
};

function getData(URL) {
  ajax.open('GET', URL, false);
  ajax.send();

  return JSON.parse(ajax.response);
}

function newsFeed() {
  const newsFeed = getData(NEWS_URL);
  const newsList = [];

  newsList.push('<ul>');
  for (let i = (store.currentPage - 1) * 10; i < store.currentPage * 10; i++) {
    newsList.push(`
    <li>
      <a href="#/show/${newsFeed[i].id}">
        ${newsFeed[i].title} (댓글: ${newsFeed[i].comments_count})
      </a>
    </li>
  `);
  }
  newsList.push('</ul>');
  newsList.push(`
    <div>
      <a href="#/page/${
        store.currentPage > 1 ? store.currentPage - 1 : 1
      }">이전 페이지</a>
      <a href="#/page/${
        store.currentPage * 10 < newsFeed.length
          ? store.currentPage + 1
          : store.currentPage
      }">다음 페이지</a>
    </div>
  `);
  container.innerHTML = newsList.join('');
}

function newsDetail() {
  // 글 내용 화면
  const id = location.hash.substr(7);

  const newsContent = getData(CONTENT_URL.replace('@id', id));

  container.innerHTML = `
    <h1>${newsContent.title}</h1>

    <div>
      <a href="#/page/${store.currentPage}">목록으로</a>
    </div>
  `;
}

function router() {
  const routePath = location.hash;
  if (routePath === '') {
    // location.hash에 #만 있을 경우 빈 문자를 반환
    newsFeed();
  } else if (routePath.indexOf('#/page/') >= 0) {
    store.currentPage = +routePath.substr(7);
    newsFeed();
  } else {
    newsDetail();
  }
}
window.addEventListener('hashchange', router); // 화면 전환의 트리거 hashcange
router();
