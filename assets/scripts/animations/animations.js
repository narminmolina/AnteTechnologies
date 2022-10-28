// import lottieWeb from 'https://cdn.skypack.dev/lottie-web';

var countries, users, joinUs, partners, powerOfChoice, countriesParams, joinUsParams, partnersParams, powerOfChoiceParams, usersParams;

var countriesID = document.getElementById('countries'),
  joinUsID = document.getElementById('joinUs'),
  partnersID = document.getElementById('partners'),
  powerOfChoiceID = document.getElementById('powerOfChoice'),
  usersID = document.getElementById('users');

countriesParams = {
  container: countriesID,
  renderer: 'svg',
  loop: true,
  autoplay: true,
  path: 'countries.json',
};



joinUsParams = {
  container: joinUsID,
  renderer: 'svg',
  loop: true,
  autoplay: true,
  path: 'joinUs.json',
};

partnersParams = {
  container: partnersID,
  renderer: 'svg',
  loop: true,
  autoplay: true,
  path: 'partners.json',
};

powerOfChoiceParams = {
  container: powerOfChoiceID,
  renderer: 'svg',
  loop: true,
  autoplay: true,
  path: 'powerOfChoice.json',
};

usersParams = {
  container: usersID,
  renderer: 'svg',
  loop: true,
  autoplay: true,
  path: 'users.json',
};
if (powerOfChoiceID) {
  powerOfChoice = bodymovin.loadAnimation(powerOfChoiceParams);
}
if (countriesID) {
  countries = bodymovin.loadAnimation(countriesParams);
}
if (joinUsID) {
  joinUs = bodymovin.loadAnimation(joinUsParams);
}
if (partnersID) {
  partners = bodymovin.loadAnimation(partnersParams);
}

if (usersID) {
  users = bodymovin.loadAnimation(usersParams);
}
// var animation = lottieWeb.loadAnimation({
//   container: document.getElementById('powerOfChoice'), // Required
//   path: 'data.json', // Required
//   renderer: 'svg/canvas/html', // Required
//   loop: true, // Optional
//   autoplay: true, // Optional
//   name: 'Hello World', // Name for future reference. Optional.
// });
lottie.loadAnimation({
  container: powerOfChoiceID, // the dom element that will contain the animation
  renderer: 'svg',
  loop: true,
  autoplay: true,
  path: 'data.json', // the path to the animation json
});