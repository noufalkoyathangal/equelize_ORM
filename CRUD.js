const models = require("./models");

// **--++..(doc: https://sequelize.org/docs/v6/core-concepts/model-querying-finders/)..++--**

//1) *****Insertion into model*******

// let test = models.TestFirst.build({
//   name: "Oooppam",
//   description: "Delicious Neyyappam for sale",
//   price: 50,
// });

// test.save().then((persistedTest) => {
//   console.log(persistedTest);
// });

// ********End-1******

//2) *****Retriving data******

// -----Retrive All [Retrive as Array]-------
models.User.findAll().then((testfirst) => {
  console.log(testfirst);
});

// -------Retrive single data-------
// models.TestFirst.findByPk(3).then((data) => {
//   console.log(data);
// });

// -------Retrive based on condition[Retrive as Array]-------
// models.TestFirst.findAll({
//   where: {
//     name: "Eclare",
//   },
// }).then((data) => {
//   console.log(data);
// });

// -------Retrive data using findOne-------
// models.TestFirst.findOne({
//   where: {
//     name: "Eclare",
//   },
// }).then((data) => {
//   console.log(data);
// });
// *****End-2*****

//3) *****Update data******
// models.TestFirst.update(
//   {
//     price: 300,
//   },
//   {
//     where: {
//       id: 1,
//     },
//   }
// ).then((data) => {
//   console.log(data);
// });
// *****End-3*****

//4) *****Delete data******
// models.User.destroy({
//   where: {
//     id: 2,
//   },
// }).then((result) => {
//   console.log(result);
// });
// *****End-4*****
