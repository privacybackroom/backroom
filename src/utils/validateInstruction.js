function pushError(errors, field, message) {
  errors.push({ field, message });
}

function isNonEmptyString(value) {
  return typeof value === "string" && value.trim().length > 0;
}

function isPositiveNumber(value) {
  return typeof value === "number" && Number.isFinite(value) && value > 0;
}

function validateInstruction(body) {
  const errors = [];

  if (!body || typeof body !== "object") {
    pushError(errors, "root", "Body must be a JSON object.");
    return { valid: false, errors };
  }

  if (!isNonEmptyString(body.identityCommitment)) {
    pushError(errors, "identityCommitment", "identityCommitment is required.");
  }

  if (!isNonEmptyString(body.pseudoPublicKey)) {
    pushError(errors, "pseudoPublicKey", "pseudoPublicKey is required.");
  }

  if (!body.from || typeof body.from !== "object") {
    pushError(errors, "from", "from is required.");
  } else {
    if (!isNonEmptyString(body.from.chain)) {
      pushError(errors, "from.chain", "from.chain is required.");
    }
    if (!isNonEmptyString(body.from.token)) {
      pushError(errors, "from.token", "from.token is required.");
    }
  }

  if (!body.to || typeof body.to !== "object") {
    pushError(errors, "to", "to is required.");
  } else {
    if (!isNonEmptyString(body.to.chain)) {
      pushError(errors, "to.chain", "to.chain is required.");
    }
    if (!isNonEmptyString(body.to.token)) {
      pushError(errors, "to.token", "to.token is required.");
    }
  }

  if (!body.transfer || typeof body.transfer !== "object") {
    pushError(errors, "transfer", "transfer is required.");
  } else {
    const rawAmount = body.transfer.amount;
    const amount =
      typeof rawAmount === "string" ? parseFloat(rawAmount) : rawAmount;

    if (!isPositiveNumber(amount)) {
      pushError(
        errors,
        "transfer.amount",
        "transfer.amount must be a positive number."
      );
    }

    if (!isNonEmptyString(body.transfer.receiver)) {
      pushError(errors, "transfer.receiver", "transfer.receiver is required.");
    }
  }

  if (!body.meta || typeof body.meta !== "object") {
    pushError(errors, "meta", "meta is required.");
  } else {
    const ttlSeconds = body.meta.ttlSeconds;
    const ttlAsNumber =
      typeof ttlSeconds === "string" ? parseFloat(ttlSeconds) : ttlSeconds;
    if (!isPositiveNumber(ttlAsNumber)) {
      pushError(
        errors,
        "meta.ttlSeconds",
        "meta.ttlSeconds must be a positive number."
      );
    }
    if (!isNonEmptyString(body.meta.createdAt)) {
      pushError(errors, "meta.createdAt", "meta.createdAt is required.");
    }
  }

  return {
    valid: errors.length === 0,
    errors
  };
}

module.exports = {
  validateInstruction
};
