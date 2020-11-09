/*
     - 작성자: 이호섭
     - 소  속: 강원대학교
     - 작성일: 2020년 11월 8일
     - 기  능:
            Node.js server
            소인수분해 사이트
*/


// import
const express = require("express");
const http = require('http');
const url = require('url');
const port = normalizePort(process.env.PORT || '3000');


function normalizePort(val) {
  var port = parseInt(val, 10);

  if (isNaN(port)) {
    // named pipe
    return val;
  }

  if (port >= 0) {
    // port number
    return port;
  }

  return false;
}


/**
 *   name:   mkPrimeList
 *   type:   function
 *   input:  int number
 *   output: array primeNumbers
 *   role:   number 이하의 소수들을 찾는다.
 */
function mkPrimeList(number) {
  let primeNumbers = [];
  let primeBoolean = [false, false];

  for (let i = 0; i < number - 1; i++){
    primeBoolean.push(true);
  }

  for (let i = 2; i< number + 1; i++){
    if (primeBoolean[i]){
      primeNumbers.push(i);

      for (let j = 2 * i; j < number + 1; j += i){
        primeBoolean[j] = false;
      }
    }
  }

  return primeNumbers;

}


/**
 *   name:   factorization
 *   type:   function
 *   input:  int number
 *   output: array factor
 *   role:   number를 소인수분해한 결과를 factor로 반환한다.
 */
function factorization(number) {
  // 예외처리
  if (isNaN(number)) {
    return ['Not a number'];
  } else if (number < 0 || number > 1000000) {
    return ['Out of range'];
  } else if (number === '0' || number === '1') {
    return ['0 and 1 Cannot be Prime factroized'];
  }

  let factor = [];
  let primeNumbers = mkPrimeList(number);

  for (let i = 0; i < primeNumbers.length; i++) {
    while (number % primeNumbers[i] === 0) {
      factor.push(primeNumbers[i]);
      number = number / primeNumbers[i];
    }

    if (number === 1){
      break;
    }
  };

  return factor;
}


/**
 *   name:   mkResult
 *   type:   function
 *   input:  array factors
 *   output: array
 *   role:   소인수 분해 리스트를 출력을 위한 결과로 만들어 반환한다.
 */
function mkResult(factors) {
  if (!isNaN(factors[0])) {
    console.log(factors[factors.length - 1]);
    // 배열의 마지막 요소는 항상 최대 소인수이다.
    return [factors[factors.length - 1], factors, true];
  } else {
    console.log("number error");
    return [factors, "Please input a number[2-1000000]", false];
  }
}

/**
 *   name:   templateHTML
 *   type:   function
 *   input:  string name, html getArea, html discription
 *   output: html template
 *   role:   웹의 html을 반환한다.
 *           title:   제목
 *           getArea: 숫자 입력을 받는 form tag
 *           body:    내용
 */
function templateHTML(title, getArea, body) {
  return `
    <!doctype html>
    <html>
      <head>
        <title> LargestPrimeFactor - ${title} </title>
        <meta charset='utf-8'>
      </head>
      <body>
        <br>
        <br>
        <center>
          <h1>
            Largest Prime Factor -
            <a href="/" title="Going Home">Home</a>
          </h1>
        </center>
        <br>
        <hr width="60%">
        <br>
        ${body}
        ${getArea}
        <br>
        <br>
        <hr width="60%">
        <br>
        <center>
          <font size="2">
            Writer: Lee Hoseop -
            <a href="https://github.com/fpem123" title="LeeHS's GitHub">GitHub</a>
          </font>
        </center
      </body>
    </html>
  `
}


/**
 *   name:   homeDescription
 *   type:   function
 *   input:  null
 *   output: html form tag
 *   role:   inedx 페이지에 들어갈 설명 html 생성
 */
function homeDescription(){
  return `
    <table border="0" width = "90%" align="center">
      <tr>
        <th bgcolor="#B0B0B0" colspan="3">Welcome to Factorize site!!</th>
      </tr>
      <tr>
        <td bgcolor="#B0B0B0" align="center">Usage</td>
        <td bgcolor="#B0B0B0" align="center">Number range</td>
        <td bgcolor="#B0B0B0" align="center">Status</td>
      </tr>
      <tr>
        <td align="center">Input number in text area</td>
        <td align="center">Integer: 0 ~ 1000000</td>
        <td align="center">Home</td>
      </tr>
    </table>
  `
}


/**
 *   name:   inputArea
 *   type:   function
 *   input:  null
 *   output: html form tag
 *   role:   소인수분해할 값을 가져오는 form tag를 반환한다
 */
function inputArea() {
  return `
    <br>
    <form>
      <center>
        <p>
          <input type="text" size="90%" name="input">
          <input type="submit" value="Factorize">
        </p>
      </center>
    </form>`
}


/**
 *   name:   printResult
 *   type:   function
 *   input:  array results
 *   output: html table tag
 *   role:   mkResult가 만든 결과를 표에 넣어 반환한다.
 */
function printResult(results){
  let discription =
    `<table border="0" width = "90%" align="center">
      <tr>
        <th bgcolor="#B0B0B0" colspan="3">Factorize Result</th>
      </tr>
      <tr>
    `
  if (results[2] != []){
    discription +=
    `
      <td bgcolor="#B0B0B0" align="center">Largest Prime Factor</td>
      <td bgcolor="#B0B0B0" align="center">Prime Factors</td>
      <td bgcolor="#B0B0B0" align="center">Status</td>
    </tr>
    <tr>`;
  } else {
    discription +=
    ` <td bgcolor="#B0B0B0" align="center">Information</td>
      <td bgcolor="#B0B0B0" align="center">Usage</td>
      <td bgcolor="#B0B0B0" align="center">Status</td>
    </tr>
    <tr>`;
  }

  results.forEach(result => {
    discription += `<td align="center">${result}</td>`;
  });

  discription += `</tr></th></table>`;

  return discription
}


let app = http.createServer(function(request, response){
  let _url = request.url;
  let queryData = url.parse(_url, true).query;
  let pathname = url.parse(_url, true).pathname;

  if (pathname === '/'){
    if (queryData.input === undefined) {

      let title = 'HOME';
      let getNumber = inputArea();
      let description = homeDescription();
      let template = templateHTML(title, getNumber, description);


      response.writeHead(200);
      response.end(template);

    } else {

      let title = queryData.input;
      let number = title;
      let factors = factorization(number);
      let results = mkResult(factors);
      let getNumber = inputArea()
      let description = printResult(results);
      let template = templateHTML(title, getNumber, description);


      response.writeHead(200);
      response.end(template);
    }
  } else {

    response.writeHead(404);
    response.end('Not found');
  }
});

app.listen(port, () => {
  console.log(`Server running at ${port}`);
});
