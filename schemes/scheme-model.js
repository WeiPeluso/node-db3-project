const db = require("../data/db-config");

module.exports = {
  find,
  findById,
  findSteps,
  add,
  update,
  remove,
};

function find() {
  return db("schemes");
}

function findById(id) {
  return db("schemes").where({ id }).first();
}

function findSteps(id) {
  return db("schemes")
    .join("steps", "schemes.id", "=", "steps.scheme_id")
    .select(
      "steps.id",
      "schemes.scheme_name",
      "steps.step_number",
      "steps.instructions"
    )
    .where("schemes.id", "=", id)
    .orderBy("steps.id");
}

function findById(id) {
  const returnId = db("schemes").where({ id }).first();
  return returnId;
}

function add(scheme) {
  return db("schemes")
    .insert(scheme, "id")
    .then(([id]) => {
      return findById(id);
    });
}

function update(changes, id) {
  return db("schemes")
    .where({ id })
    .update(changes)
    .then(() => {
      return findById(id);
    });
}

async function remove(id) {
  const promise1 = await findById(id);
  const promise2 = db("schemes")
    .where({ id })
    .del()
    .then(() => {
      return promise1;
    });
  return promise2;
}
