function cleanJsonText(rawText) {
  let cleaned = (rawText || "").trim();
  const firstBrace = cleaned.indexOf("{");
  const lastBrace = cleaned.lastIndexOf("}");
  const firstBracket = cleaned.indexOf("[");
  const lastBracket = cleaned.lastIndexOf("]");
  
  if (firstBrace !== -1 && lastBrace !== -1 && (firstBracket === -1 || firstBrace < firstBracket)) {
    return cleaned.substring(firstBrace, lastBrace + 1);
  } else if (firstBracket !== -1 && lastBracket !== -1) {
    return cleaned.substring(firstBracket, lastBracket + 1);
  }
  
  return cleaned;
}
console.log(cleanJsonText("Here is your JSON:\n```json\n{\n  \"a\": [\n    1, 2\n  ]\n}\n```\nEnjoy!"));
