const baseUrl = 'https://baas.kinvey.com/';
const appKey = 'kid_rkiE6YvdE';
const username = 'guest';
const password = 'guest';

// fetch(
//   baseUrl + 'appdata/' + appKey + '/messages',
//   {
//     method: 'GET',
//     headers: {
//       Authorization: 'Basic ' + btoa(username + ':' + password)
//     },
//   }
// ).then((response) => {
//   console.log(response.json());
//   console.log(response);
// });


// $.ajax({
//   url: baseUrl + 'appdata/' + appKey + '/messages',
//   method: 'GET',
//   headers: {
//     Authorization: 'Basic ' + btoa(username + ':' + password)
//   },
// }).then(data => console.log(data))

class A {
  m1() {
    console.log('m1');
  }

  m2 = 5;
  
  constructor() {
    
  }
}

let a = new A();
a.m1();
// a.m2;