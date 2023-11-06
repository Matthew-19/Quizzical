export async function getQuestions() {
  const res = await fetch("https://opentdb.com/api.php?amount=10");
  const data = res.json();
  return data.results;
}
