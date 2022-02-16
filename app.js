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
  let template = `
    <div class="container flex flex-col items-center">
      <h1>Hacker News</h1>
      <ul>
        {{__news_feed__}}
      </ul>
      <div>
        <a href="#/page/{{__prev_page__}}">이전 페이지</a>
        <a href="#/page/{{__next_page__}}">다음 페이지</a>
      </div>
    </div>
  `;

  for (let i = (store.currentPage - 1) * 10; i < store.currentPage * 10; i++) {
    newsList.push(`
    <li>
      <a href="#/show/${newsFeed[i].id}">
        ${newsFeed[i].title} (댓글: ${newsFeed[i].comments_count})
      </a>
    </li>
  `);
  }

  template = template.replace('{{__news_feed__}}', newsList.join(''));
  template = template.replace(
    '{{__prev_page__}}',
    store.currentPage > 1 ? store.currentPage - 1 : 1
  );
  template = template.replace(
    '{{__next_page__}}',
    store.currentPage * 10 < newsFeed.length
      ? store.currentPage + 1
      : store.currentPage
  );

  container.innerHTML = template;
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
