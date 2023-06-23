export function cliOutputFormatter(fileList) {
  const maxCharacterLength = Math.max(...fileList.map(([_, name]) => name.length));
  const { leftSpaces, rightSpaces } = getSpaces(maxCharacterLength, 4, " ");

  const upOrBottom = `|--------${"-".repeat(maxCharacterLength)}------------|\n`;
  const heading = `| index |${leftSpaces}name${rightSpaces}|   type    |\n`;

  let content = "";

  fileList.map(([type, name], i) => {
    const typeMaxLength = 11;
    const { leftSpaces, rightSpaces } = getSpaces(maxCharacterLength, name.length, " ");
    const { leftSpaces: leftTypeSpaces, rightSpaces: rightTypeSpaces } = getSpaces(typeMaxLength, type.length, " ");
    const leftIndexSpaces = i >= 10 && i < 100 ? ' '.repeat(2) : ' '.repeat(3);
    content += `|${leftIndexSpaces}${i}   |${leftSpaces}${name}${rightSpaces}|${leftTypeSpaces}${type}${rightTypeSpaces}|${"\n"}`;
  });
  return upOrBottom + heading + upOrBottom + content + upOrBottom;
}

function getSpaces(maxLength, currentLength, separator) {
  return {
    leftSpaces: separator.repeat(Math.floor((maxLength - currentLength) / 2)),
    rightSpaces: separator.repeat(Math.ceil((maxLength - currentLength) / 2)),
  };
}
