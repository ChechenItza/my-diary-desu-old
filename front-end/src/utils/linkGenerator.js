const genEntryLink = date => {
  return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`
}

export default { genEntryLink }