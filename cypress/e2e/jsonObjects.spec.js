/// <reference types="cypress" />

describe("JSON objects", () => {
  it("JSON objects", () => {
    const simpleObject = { key: "value", key2: "value2" };
    const simpleArrayOfValues = ["one", "two", "three"];
    const arrayOfObjects = [
      { key: "value" },
      { key2: "value2" },
      { key3: "value3" },
    ];
    const typesOfData = { string: "this is a string", number: 10 };
    const mix = {
      firstName: "Xios",
      lastName: "Rodriguez",
      age: 40,
      email: "rrodriguez@theelectricfactory.com",
      students: [
        {
          firstName: "Erick",
          lastName: "Vargas",
        },
        {
          firstName: "Angel",
          lastName: "Vargas",
        },
      ],
    };
    console.log(simpleObject.key);
    console.log(simpleObject["key2"]);
    console.log(simpleArrayOfValues[1]);
    console.log(arrayOfObjects[2].key3);
    console.log(mix.students[1].firstName);

    const lastNameOfSecondStudent = mix.students[1].lastName;
  });
});
