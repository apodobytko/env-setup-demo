import Jabber from "jabber";
import { createPerson, readPerson, updatePerson } from "./utils/crud";

const jabber = new Jabber();

function getRandomName(prefix = "") {
  return prefix + jabber.createFullName();
}

function randomNumber1to100() {
  return Math.ceil(Math.random() * 100);
}

describe("CrudCrud: People", () => {
  let name;
  let age;
  beforeEach(() => {
    name = getRandomName();
    age = randomNumber1to100();
  });
  it("can create a person", async () => {
    const createResponseData = await createPerson({ age, name });
    expect(createResponseData).toEqual(
      expect.objectContaining({
        age,
        name,
        _id: expect.stringMatching(/\w+/),
      })
    );

    const readPersonResponseData = await readPerson(createResponseData._id);
    expect(readPersonResponseData).toEqual({
      age,
      name,
      _id: createResponseData._id,
    });
  });

  describe("Operation with person", () => {
    let userData;
    beforeEach(async () => {
      userData = await createPerson({ age, name });
    });
    it("can update a person", async () => {
      const newName = getRandomName("new");
      await updatePerson(userData._id, {
        ...userData,
        name: newName,
      });

      const readPersonResponseData = await readPerson(userData._id);
      expect(readPersonResponseData).toEqual({
        age,
        name: newName,
        _id: userData._id,
      });
    });
    it("can delete user", () => {
      // @todo
    });
  });
});
