let id = 0

function getId() {
  return ++id
}

let dogs = [
  { id: getId(), name: 'Captain', weight: 25 },
  { id: getId(), name: 'Doggo', weight: 13 },
]

module.exports = {
  async findAll() {
    // SELECT * FROM dogs;
    return dogs
  },

  async findById(id) {
    // SELECT * FROM dogs WHERE id = 1;
    const dog = dogs.find(d => d.id == id)
    return dog
  },

  async create({ name, weight }) {
    // INSERT INTO dogs (id, name, weight) VALUES ('xyz', 'Foo', 10);
    const newDog = { id: getId(), name, weight }
    dogs.push(newDog)
    return newDog
  },

  async update(id, changes) {
    // UPDATE dogs SET name = 'Foo', weight = 9 WHERE id = 1;
    const dog = dogs.find(dog => dog.id == id)
    if (!dog) return null

    const updatedDog = { ...changes, id: Number(id) }
    dogs = dogs.map(d => (d.id == id) ? updatedDog : d)
    return updatedDog
  },

  async delete(id) {
    // DELETE FROM dogs WHERE id = 1;
    const dog = dogs.find(dog => dog.id == id)
    if (!dog) return null

    dogs = dogs.filter(d => d.id != id)
    return dog
  }
}
