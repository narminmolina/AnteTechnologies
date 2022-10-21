var countries,
  joinUs,
  partners,
  powerOfChoice,
  users,
  countriesParams,
  joinUsParams,
  partnersParams,
  powerOfChoiceParams,
  usersParams;

var countriesID = document.getElementById('countries'),
  joinUsID = document.getElementById('joinUs'),
  partnersID = document.getElementById('partners'),
  powerOfChoiceID = document.getElementById('powerOfChoice'),
  usersID = document.getElementById('users');

countriesParams = {
  container: countriesID,
  renderer: 'svg',
  loop: !0,
  autoplay: !0,
  animationData: countriesData
};

joinUsParams = {
  container: joinUsID,
  renderer: 'svg',
  loop: !0,
  autoplay: !0,
  animationData: joinUsData
};

partnersParams = {
  container: partnersID,
  renderer: 'svg',
  loop: !0,
  autoplay: !0,
  animationData: partnersData
};

powerOfChoiceParams = {
  container: powerOfChoiceID,
  renderer: 'svg',
  loop: !0,
  autoplay: !0,
  animationData: powerOfChoiceData
};

usersParams = {
  container: usersID,
  renderer: 'svg',
  loop: !0,
  autoplay: !0,
  animationData: usersData
};

if (countriesID) {
  countries = lottie.loadAnimation(countriesParams);
}
if (joinUsID) {
  joinUs = lottie.loadAnimation(joinUsParams);
}
if (partnersID) {
  partners = lottie.loadAnimation(partnersParams);
}
if (powerOfChoiceID) {
  powerOfChoice = lottie.loadAnimation(powerOfChoiceParams);
}
if (usersID) {
  users = lottie.loadAnimation(usersParams);
}
