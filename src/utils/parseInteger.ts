interface parseIntegerOutput {
  number?: number;
  error?: string;
}

const parseInteger = (str: string): parseIntegerOutput => {
  const num = Number(str);

  if (Number.isNaN(num)) return { error: "Provided query is not a number." };

  if (!Number.isInteger(num))
    return { error: "Provided number is not an integer." };

  return { number: num };
};

export default parseInteger;
