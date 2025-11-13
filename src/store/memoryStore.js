let instructions = [];
let nextId = 1;

function addInstruction(instruction) {
  const entry = {
    id: String(nextId++),
    receivedAt: new Date().toISOString(),
    instruction
  };

  instructions.push(entry);

  // Keep memory bounded, drop the oldest when too many
  if (instructions.length > 2000) {
    instructions = instructions.slice(-1000);
  }

  return entry;
}

function getInstructions() {
  return instructions;
}

module.exports = {
  addInstruction,
  getInstructions
};
