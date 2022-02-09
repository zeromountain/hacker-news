# Javascript & Typescript Essential

## 1강 주요 개념

- DOM 조작
  - `document.getElementById('root')`: root라는 id 값을 가진 HTML 요소에 접근
  - `document.createElement('ul')`: HTML ul 요소 생성
  - `Node.appendChild()`: 특정 부모 노드의 자식 노드 리스트 중 마지막 자식으로 추가
- Ajax
  - `XMLHttpRequest()`: [XHR](https://developer.mozilla.org/ko/docs/Web/API/XMLHttpRequest) 객체 초기화
  - `XMLHttpRequest().open()`: 요청 초기화
  - `XMLHttpRequest().send()`: URL로 요청 전달
- JSON
  - `JSON.parse()`: 문자열 형식의 데이터를 Javascript 값이나 객체로 변환

## 2강 주요개념

- 화면 전환
  - SPA:
    - 하나의 어플리케이션이 화면을 여러 개를 가지고 전환
    - 액티브한 화면을 페이지로서 보여줌
  - 링크를 통한 화면 전환
- 이벤트: 사용자의 이벤트 사용 시점을 예측하기 어렵기 때문에, 브라우저에서 이벤트 시스템 제공 → 브라우저가 사용자의 이벤트 사용 시점 감지
  - `EventTarget.addEventListener(이벤트 타입, 실행할 함수)`: 지정한 유형의 이벤트를 대상이 수신할 때마다 호출할 함수를 설정
    - 함수는 값으로 사용할 수 있기 때문에, 함수의 인자로 사용이 가능
- 브라우저 객체
  - location: window 전역 객체의 속성으로, 읽기 전용인 Location 객체를 얻어 올 수 있고, 현재 문서의 URL에 대한 정보를 가짐
    - `location.hash.substr(1)`: Location 객체의 hash 속성의 값의 첫번째 자리 문자 제거
    - `CONTENT_URL.replace('@id', id)`: CONTENT_URL에서 @id를 포함한 문자열을 변수 id 값으로 대체
